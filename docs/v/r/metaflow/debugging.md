import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Debugging with Metaflow

Metaflow wants to make debugging failed flows as painless as possible.

Debugging issues during development is a normal part of the development process. You
should be able to develop and debug your Metaflow scripts similar to how you develop any
R scripts locally.

Debugging a failure can either happen **after** a failed execution or **during**
execution. In the first case, Metaflow provides two mechanisms:

- the [ability to resume a flow](debugging.md#how-to-use-the-resume-command),
  re-executing all successful steps and only re-executing from the failed step. This
  allows you to fix the problem in the failed step, resume the flow and make progress.
- the [ability to inspect the data](client.md) produced by each step in a flow to be
  able to determine what went wrong.

## How to debug failed flows

The process of debugging failed flows is similar both for development-time and
production-time issues:

1. Identify the step that failed. The failed step is reported as the last line of the
   error report where it is easy to spot.
2. Identify the run id of the failed run. On the console output, each line is prefixed
   with an identifier like `2/start/21426`. Here, `2` is the run id, `start` is the step
   name, and `21426` is the task id.
3. Reproduce the failed run with `resume` as [described
   below](debugging.md#how-to-use-the-resume-command). Confirm that the error message
   you get locally matches to the original error message.
4. Identify the failed logic inside the failed step. You can do this by adding `print`
   statements in the step until `resume` reveals enough information. Alternatively, you
   can reproduce the faulty logic in R studio or jupyter notebook using input data
   artifacts for the step, as described below in the section about [RStudio and Jupyter
   Notebook](#inspecting-data-with-rstudio-ide-or-jupyter-notebook).
5. Confirm that the fix works with `resume`. Return to 4 if the error has not been
   fixed.
6. When the step works locally, rerun the whole flow from `start` to `end` and confirm
   that the fix works as intended.

### How to use the `resume` command

The `resume` command allows you to resume execution of a past run at a failed step.
Resuming makes it easy to quickly reproduce the failure and iterate on the step code
until a fix has been found.

Here is how it works. First, save the snippet below :

```r title="debugflow.R"
library(metaflow)

a <- function(self){
    self$var <- 1
}

b <- function(self){
    self$var <- tofail("cannot find function tofail")
}

join <- function(self, inputs){
    print(paste("var in step a is", inputs$a$var))
    print(paste("var in step b is", inputs$b$var))
}

metaflow("DebugFlow") %>%
    step(step = "start",
         next_step = c("a", "b")) %>%
    step(step = "a",
         r_function=a,
         next_step="join") %>%
    step(step="b",
         r_function=b,
         next_step="join") %>%
    step(step="join",
         r_function=join,
         next_step="end",
         join=TRUE) %>%
    step(step="end") %>%
    run()
```

Run the script with:

<Tabs> <TabItem label="Terminal" value="Terminal">

```bash
Rscript debugflow.R run
```

</TabItem> <TabItem label="RStudio" value="RStudio">

```
# Execute in RStudio as is
```

</TabItem> </Tabs>

The run should fail. The output should look like:

```r
...
2020-06-19 13:23:22.264 [153/a/1002 (pid 44264)] Task is starting.
2020-06-19 13:23:22.980 [153/b/1003 (pid 44272)] Task is starting.
2020-06-19 13:23:30.488 [153/a/1002 (pid 44264)] Task finished successfully.
2020-06-19 13:23:31.813 [153/b/1003 (pid 44272)] Evaluation error: could not find function "tofail".
2020-06-19 13:23:33.211 [153/b/1003 (pid 44272)] Task failed.
2020-06-19 13:23:33.211 Workflow failed.
```

This shows that the step `b` of the run `153` failed. In your case, the run id could be
different.

The `resume` command runs the flow similar to `run`. However, in contrast to `run`
resuming reuses results of every successful step instead of actually running them.

Try it with

<Tabs> <TabItem label="Terminal" value="Terminal">

```bash
Rscript debugflow.R resume
```

</TabItem> <TabItem label="RStudio" value="RStudio">

```
# Replace run() in debugflow.R with
# run(resume = TRUE)
# and execute in RStudio
```

</TabItem> </Tabs>

Metaflow remembers the run number of the last local run, which in this case is `153`, so
you should see `resume` reusing results of the run above. Since we have not changed
anything yet, you should see the above error again but with an incremented run number.

You can also resume a specific run using the CLI option `--origin-run-id` if you don't
like the default value selected by Metaflow. To get the same behavior as above, you can
also do:

<Tabs> <TabItem label="Terminal" value="Terminal">

```bash
Rscript debugflow.R resume --origin-run-id 153
```

</TabItem> <TabItem label="RStudio" value="RStudio">

```
# Replace run() in debugflow.R with
# run(resume = TRUE, origin_run_id = "153")
# and execute in RStudio
```

</TabItem> </Tabs>

If you'd like programmatic access to the `origin-run-id` selected for the `resume`
\(either implicitly selected by Metaflow as last `run` invocation, or explicitly
declared by the user via the CLI\), you can use the `current` object. Read more
[here](tagging.md#accessing-current-ids-in-a-flow).

Next, fix the error by replacing `tofail("cannot find function tofail")` in
`debugflow.R` with `"any message"`. Try again after the fix. This time, you should see
the flow completing successfully.

```r
2020-06-19 14:09:06.015 Gathering required information to resume run (this may take a bit of time)...
2020-06-19 14:09:22.177 Workflow starting (run-id 154):
2020-06-19 14:09:22.865 [154/start/1045] Cloning results of a previously run task 153/start/1001
2020-06-19 14:09:27.797 [154/a/1046] Cloning results of a previously run task 153/a/1002
2020-06-19 14:09:28.789 [154/b/1047 (pid 48073)] Task is starting.
2020-06-19 14:09:37.263 [154/b/1047 (pid 48073)] Task finished successfully.
2020-06-19 14:09:38.784 [154/join/1048 (pid 48130)] Task is starting.
2020-06-19 14:09:44.621 [154/join/1048 (pid 48130)] [1] "var in step a is 1"
2020-06-19 14:09:44.811 [154/join/1048 (pid 48130)] [1] "var in step b is any message"
2020-06-19 14:09:49.704 [154/join/1048 (pid 48130)] Task finished successfully.
2020-06-19 14:09:50.798 [154/end/1049 (pid 48156)] Task is starting.
2020-06-19 14:10:00.518 [154/end/1049 (pid 48156)] Task finished successfully.
2020-06-19 14:10:00.893 Done!
```

Resuming uses the flow and step names to decide what results can be reused. This means
that the results of previously successful steps will get reused even if you change their
step code. You can add new steps and alter code of failed steps safely with `resume`

#### Resuming from an arbitrary step

By default, `resume` resumes from the step that failed, like `b` above. Sometimes fixing
the failed step requires re-execution of some steps that precede it.

You can choose the step to resume from by specifying the step name on the command line:

<Tabs> <TabItem label="Terminal" value="Terminal">

```bash
Rscript debugflow.R resume start
```

</TabItem> <TabItem label="RStudio" value="RStudio">

```
# Replace run() in debugflow.R with
# run(resume = "start")
# and execute in RStudio
```

</TabItem> </Tabs>

This would resume execution from the step `start`. If you specify a step that comes
after the step that failed, execution resumes from the failed step - you can't skip over
steps.

#### Resume and parameters

If your flow has [`Parameters`](basics.md#how-to-define-parameters-for-flows), you can't
change their values when resuming. Changing parameter values could change the results of
any steps, including those that `resume` skips over, which could result to unexpected
behavior in subsequent steps.

The `resume` command reuses the parameter values that you set with `run` originally.

## Reproducing Production Issues Locally

This section shows you how to reproduce a failed Metaflow run on AWS Step Functions
locally. This is how a failed run on AWS Step Functions UI looks like -

![](/assets/image1.png)

![](</assets/image3_(1).png>)

Notice the execution ID of `5ca85f96-8508-409d-a5f5-b567db1040c5`. When running on AWS
Step Functions, Metaflow uses the AWS Step Functions execution ID \(prefixed with
`sfn-`\) as the run id.

The graph visualization shows that step `b` failed, as expected. First, you should
inspect the logs of the failed step to get an idea of why it failed. You can access AWS
Batch step logs in the AWS Step Functions UI by looking for the `JobId` in the `Error`
blob that can be accessed by clicking on the `Exception` pane on the right side of the
UI. You can use this `JobId` in the AWS Batch console to check the job logs. This
`JobId` is also the metaflow task ID for the step.

Next, we want to reproduce the above error locally. We do this by resuming the specific
AWS Step Functions run that failed:

<Tabs> <TabItem label="Bash" value="Bash">

```bash
Rscript debug.R resume --origin-run-id sfn-5ca85f96-8508-409d-a5f5-b567db1040c5
```

</TabItem> <TabItem label="RStudio" value="RStudio">

```r
   ...
   step(step="end",
        ...)
   run(resume=TRUE,
       origin_run_id="sfn-5ca85f96-8508-409d-a5f5-b567db1040c5")
```

</TabItem> </Tabs>

This will reuse the results of the `start` and `a` step from the AWS Step Functions run.
It will try to rerun the step `b` locally, which fails with the same error as it does in
production.

You can fix the error locally as above. In the case of this simple flow, you can run the
whole flow locally to confirm that the fix works. After validating the results, you
would deploy a new version to production with `step-functions create`.

However, this might not be a feasible approach for complex production flow. For
instance, the flow might process large amounts of data that can not be handled in your
local instance. We have better approaches for staging flows for production:

### Staging flows for production

The easiest approach to test a demanding flow is to run it with AWS Batch. This works
even with resume:

```bash
Rscript debug.R resume --origin-run-id sfn-5ca85f96-8508-409d-a5f5-b567db1040c5 --with batch
```

This will resume your flow and run every step on AWS Batch. When you are ready to test a
fixed flow end-to-end, just run it as follows:

```bash
Rscript debug.R run --with batch
```

Alternatively, you can change the name of the flow temporarily, e.g. from DebugFlow to
DebugFlowStaging. Then you can run `step-functions create` with the new name, which will
create a separate staging flow on AWS Step Functions.

You can test the staging flow freely without interfering with the production flow. Once
the staging flow runs successfully, you can confidently deploy a new version to
production.

## Inspecting data with RStudio IDE or Jupyter Notebook

The above example demonstrates a trivial error. In the real life, errors can be much
trickier to debug. In the case of machine learning, a flow may fail because of an
unexpected distribution of input data, although nothing is wrong with the code per se.

Being able to inspect data produced by every step is a powerful feature of Metaflow
which can help in situations like this.

You can use the [Metaflow client](client.md) in an RStudio IDE or a Jupyter Notebook to
fetch artifacts produced each step, and run sanity checks or further debug the issue.
