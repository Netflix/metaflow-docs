# Dealing with Failures

Failures are a natural, expected part of data science workflows. Here are some typical reasons why you can expect your workflow to fail:

1. **Misbehaving code:** no code is perfect. Your code may fail to handle edge cases or libraries behave differently than what you expected.
2. **Unanticipated issues with data:** data is harder than science. Data is how Metaflow workflows interact with the chaotic, high entropy, outside world. It is practically impossible to anticipate all possible ways the input data can be broken.
3. **Platform issues:** the best infrastructure is invisible. Unfortunately every now and then platforms that Metaflow relies on, or Metaflow itself, make their existence painfully obvious by failing in creative ways.

Metaflow provides straightforward tools for you to handle all these scenarios. If you are in a hurry, see [a quick summary of the tools](failures.md#summary).

## Retrying Tasks with the `retry` Decorator

Retrying a failed task is the simplest way to try to handle errors. It is a particularly effective strategy with platform issues which are typically transient in nature.

You can enable retries for a step simply by adding `retry` decorator in the step, like here:

```R
library(metaflow)

start <- function(self){
    n <- rbinom(n=1, size=1, prob=0.5)
    if (n == 0){
        stop("Bad Luck!") 
    } else{
        print("Lucky you!")
    }
}

end <- function(self){
    print("Phew!")
}

metaflow("RetryFlow") %>%
    step(step="start", 
         decorator("retry"),
         r_function=start, 
         next_step="end") %>%
    step(step="end", 
         r_function=end) %>% 
    run()
```

When you run this flow, you will see that sometimes it succeeds without a hitch but sometimes the `start` step raises an exception and it needs to be retried. By default, `retry` retries the step three times. Thanks to `retry`, this workflow will almost always succeed.

```R
2020-06-19 15:48:16.653 [181/start/1076 (pid 54076)] Task is starting.
2020-06-19 15:48:22.441 [181/start/1076 (pid 54076)] Evaluation error: Bad Luck!.
2020-06-19 15:48:23.408 [181/start/1076 (pid 54076)] Task failed.
2020-06-19 15:48:23.602 [181/start/1076 (pid 54106)] Task is starting (retry).
2020-06-19 15:48:29.434 [181/start/1076 (pid 54106)] Evaluation error: Bad Luck!.
2020-06-19 15:48:30.665 [181/start/1076 (pid 54106)] Task failed.
2020-06-19 15:48:30.902 [181/start/1076 (pid 54139)] Task is starting (retry).
2020-06-19 15:48:34.704 [181/start/1076 (pid 54139)] [1] "Lucky you!"
2020-06-19 15:48:38.545 [181/start/1076 (pid 54139)] Task finished successfully.
```

It is highly recommended that you use `retry` every time you run your flow on the [cloud](../metaflow-on-aws/metaflow-on-aws.md). Instead of annotating every step with a retry decorator, you can also automatically add a retry decorator to all steps that do not have one as follows:

```R
Rscript retryflow.R run --with retry
```

### How to Prevent Retries
If retries are such a good idea, why not enable them by default for all steps? First, retries only help with transient errors, like sporadic platform issues. If the input data or your code is broken, retrying will not help anything. Secondly, not all steps can be retried safely.

Imagine a hypothetical step like this:

```R
withdraw_money_from_account <- function(self){
    library(httr)
    r <- POST('bank.com/account/123/withdraw', 
                body=list(amount = 1000))
}
```

If you run this code with:

```R
Rscript moneyflow.R run --with retry
```

you may end up withdrawing up to $4000 instead of the intended $1000. To make sure no one will accidentally retry a step with _destructive side-effects_ like this, you should add `times=0` in the step code:

```R
metaflow("MoneyFlow") %>%
    ...
    step(step="withdraw", 
         decorator("retry", times=0),
         r_function=withdraw_money_from_account, 
         next_step="end") %>%
    ...
```

Now the code can be safely rerun, even using `--with retry`. All other steps will be retried as usual.

Most data science workflows do not have to worry about this. As long as your step only reads and writes Metaflow artifacts and/or performs only read-only operations with external systems \(e.g. performs only `SELECT` queries, no `INSERT`s etc.\), your step is [idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning) and it can be retried without concern.

### Maximizing Safety

By default, `retry` will retry the step for three times before giving up. It waits for 2 minutes between retries on the [cloud](../metaflow-on-aws/metaflow-on-aws.md). This means that if your code fails fast, any transient platform issues need to get resolved in less than 10 minutes or the whole run will fail. Typically 10 minutes is more than enough but sometimes you want both a belt and suspenders.

If you have a sensitive production workflow which should not fail easily, there are four things you can do:

1. You can increase the number of retries to `times=4`, which is the maximum number of retries currently.
2. You can make the time between retries arbitrarily long, e.g. `times=4, minutes_between_retries=20.` This will give the task over an hour to succeed.
3. You can use `catch`, described below, as a way to continue even after all retries have failed.
4. You can use `timeout`, also described below, to make sure your code will not get stuck.

You can use any combination of these four techniques, or all of them together, to build rock-solid workflows.

### Results of Retries

If the same code is executed multiple times by `retry`, are there going to be duplicate artifacts? No, Metaflow manages retries so that only artifacts from the last retry are visible. If you use [the Client API ](client.md)to inspect results, you don't have to do anything special to deal with retries that may have happened. Each task will have only one set of results. Correspondingly, the logs returned by `task` show the output of the last attempt only.

If you want to know if a task was retried, you can retrieve retry timestamps from `Task` metadata:

```R
library(metaflow)

task <- task_client$new("RetryFlow/181/start/1076")
print(task$metadata_dict$attempt)
```

## Catching Exceptions with the `catch` Decorator

As mentioned above, `retry` is an appropriate tool for dealing with transient issues. What about issues that are not transient? Metaflow has another decorator, `catch` that catches any exceptions that occur during the step and then continues execution of subsequent steps.

The main upside of `catch` is that it can make your workflows extremely robust: it will handle all error scenarios from faulty code and faulty data to platform issues. The main downside is that your code needs to be modified so that it can tolerate faulty steps.

Let's consider issues caused by your code versus everything surrounding it separately.

### Exceptions Raised by Your Code

By default, Metaflow stops execution of the flow when a step fails. It can't know what to do with failed steps automatically.

You may know that some steps are error-prone. For instance, this can happen with a step inside a foreach loop that iterates over unknown data, such as the results of a query or a parameter matrix. In this case, it may be desirable to let some tasks fail without crashing the whole flow.

Consider this example that is structured like a hyperparameter search:

```R
library(metaflow)

start <- function(self){
    self$params <- c(-1, 2, 3) 
}

sanity_check <- function(self){
    print(self$input)
    if (self$input < 0) {
        stop("input cannot be negative")
    }
}

join <- function(self, inputs){
    for (input in inputs){
        if (!is.null(input$compute_failed)){
           print(paste0("Exception happened for param: ", input$input))
           print("Exception message:")
           print(input$compute_failed)
        }
    }
}

metaflow("CatchFlow") %>%
    step(step = "start",
         r_function = start,
         next_step = "sanity_check",
         foreach = "params") %>%
    step(step = "sanity_check", 
         decorator("catch", var="compute_failed", print_exception=FALSE),
         r_function = sanity_check, 
         next_step = "join") %>%
    step(step = "join", 
         r_function = join, 
         next_step = "end",
         join = TRUE) %>%
    step(step = "end") %>%
    run()
```

As you can guess, the above flow raises an error. Normally, this would crash the whole flow. However, in this example the `catch` decorator catches the exception and stores it in an instance variable called `compute_failed`, and lets the execution continue. The next step, `join`, contains logic to handle the exception.

The `var` argument is optional. The exception is not stored unless you specify it. You can also specify `print_exception=False` to prevent the `catch` decorator from printing out the caught exception on stdout.

### Platform Exceptions

Platform issues happen outside of your code, for example, when you are not able to request a big AWS instance for an AWS Batch step. In this case so you can't handle them with a `tryCatch` block in your R script.

```R
library(metaflow)

start <- function(self){
    print("this runs on batch") 
}

end <- function(self){
    if (!is.null(self$start_failed)){
        print("The previous step failed to start")
    } else {
        print("Phew!")
    }
}

metaflow("PlatformExceptionFlow") %>%
    step(step="start", 
         decorator("batch", cpu=96),
         decorator("retry", times=3),
         decorator("catch", var="start_failed")
         r_function=start, 
         next_step="end") %>%
    step(step="end", 
         r_function=end) %>% 
    run()
```

Note that we use both `retry` and `catch` above. `retry` attempts to run the step three times, hoping that the issue is transient. The hope is futile. The task kills itself every time.

After all retries are exhausted, `catch` takes over and records an exception in `start_failed`, notifying that all attempts to run `start` failed. Now it is up to the subsequent steps, `end` in this case, to deal with the scenario that `start` produced no results whatsoever. They can choose an alternative code path using the variable assigned by `catch`, `start_failed` in this example.

## Summary

Here is a quick summary of failure handling in Metaflow:

* Use `retry` to deal with transient platform issues. You can do this easily on the command line with the `--with retry` option.
* Use `retry` **with** `catch` for extra robustness if you have modified your code to deal with faulty steps which are handled by `catch`.
* Use `catch` **without** `retry` to handle steps [that can't be retried safely](failures.md#how-to-prevent-retries). It is a good idea to use `times=0` for `retry` in this case.
