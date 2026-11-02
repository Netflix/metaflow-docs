# Dealing with Failures

Failures are a natural, expected part of data science workflows. Here are some typical
reasons why you can expect your workflow to fail:

1. **Misbehaving code:** no code is perfect. Your code may fail to handle edge cases or
   libraries behave differently than what you expected.
2. **Unanticipated issues with data:** data is harder than science. Data is how Metaflow
   workflows interact with the chaotic, high entropy, outside world. It is practically
   impossible to anticipate all possible ways the input data can be broken.
3. **Platform issues:** the best infrastructure is invisible. Unfortunately, every now
   and then platforms that Metaflow relies on, or Metaflow itself, make their existence
   painfully obvious by failing in creative ways.

Metaflow provides straightforward tools for you to handle all these scenarios. If you
are in a hurry, see [a quick summary of the tools](failures.md#summary).

## Retrying Tasks with the `retry` Decorator

Retrying a failed task is the simplest way to try to handle errors. It is a particularly
effective strategy with platform issues which are typically transient in nature.

You can enable retries for a step simply by adding `retry` decorator in the step, like
here:

```python
from metaflow import FlowSpec, step, retry

class RetryFlow(FlowSpec):

    @retry
    @step
    def start(self):
        import time
        if int(time.time()) % 2 == 0:
            raise Exception("Bad luck!")
        else:
            print("Lucky you!")
        self.next(self.end)

    @step
    def end(self):
        print("Phew!")

if __name__ == '__main__':
    RetryFlow()
```

When you run this flow you will see that sometimes it succeeds without a hitch, but
sometimes the `start` step raises an exception and needs to be retried. By default,
`retry` retries the step three times. Thanks to `retry`, this workflow will almost
always succeed.

It is recommended that you use `retry` every time you [run tasks
remotely](/scaling/remote-tasks/requesting-resources). Instead of annotating every step with a
retry decorator, you can also automatically add a retry decorator to all steps that do
not have one as follows:

```python
python RetryFlow.py run --with retry
```

:::tip
The `@retry` decorator restarts a task after a failure. If you want to avoid losing progress
made within a task, take a look at [the `@checkpoint` decorator](/scaling/checkpoint/introduction)
that allows you to save and load progress easily.
:::

### How to Prevent Retries

If retries are such a good idea, why not enable them by default for all steps? First,
retries only help with transient errors, like sporadic platform issues. If the input
data or your code is broken, retrying will not help anything. Secondly, not all steps
can be retried safely.

Imagine a hypothetical step like this:

```python
@step
def withdraw_money_from_account(self):
    requests.post('bank.com/account/123/withdraw', data={'amount': 1000})
```

If you run this code with:

```bash
python MoneyFlow.py run --with retry
```

you may end up withdrawing up to $4000 instead of the intended $1000. To make sure no
one will accidentally retry a step with _destructive side effects_ like this, you should
add `times=0` in the code:

```python
@retry(times=0)
@step
def withdraw_money_from_account(self):
    requests.post('bank.com/account/123/withdraw', data={'amount': 1000})
```

Now the code can be safely rerun, even using `--with retry`. All other steps will be
retried as usual.

Most data science workflows do not have to worry about this. As long as your step only
reads and writes Metaflow artifacts and/or performs only read-only operations with
external systems \(e.g. performs only `SELECT` queries, no `INSERT`s etc.\), your step
is [idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning) and
can be retried without concern.

### Maximizing Safety

By default, `retry` will retry the step for three times before giving up. It waits for 2
minutes between retries for [remote tasks](/scaling/remote-tasks/requesting-resources). This
means that if your code fails fast, any transient platform issues need to get resolved
in less than 10 minutes or the whole run will fail. 10 minutes is typically more than
enough, but sometimes you want both a belt and suspenders.

If you have a sensitive production workflow which should not fail easily, there are four
things you can do:

1. You can increase the number of retries to `times=4`, which is the maximum number of
   retries currently.
2. You can make the time between retries arbitrarily long, e.g. `times=4,
   minutes_between_retries=20.` This will give the task over an hour to succeed.
3. You can use `catch`, described below, as a way to continue even after all retries
   have failed.
4. You can use `timeout`, also described below, to make sure your code will not get
   stuck.

You can use any combination of these four techniques, or all of them together, to build
rock-solid workflows.

### Results of Retries

If the same code is executed multiple times by `retry`, are there going to be duplicate
artifacts? No, Metaflow manages retries so that only artifacts from the last retry are
visible. If you use [the Client API ](/metaflow/client.md)to inspect results, you don't
have to do anything special to deal with retries that may have happened. Each task will
have only one set of results. Correspondingly, the logs returned by `task` show the
output of the last attempt only.

If you want to know if a task was retried, you can retrieve retry timestamps from `Task`
metadata:

```python
from metaflow import Run, namespace

namespace(None)
task = Run('RetryFlow/10')['start'].task
attempts = [m for m in task.metadata if m.type == 'attempt']
```

## Catching Exceptions with the `catch` Decorator

As mentioned above, `retry` is an appropriate tool for dealing with transient issues.
What about issues that are not transient? Metaflow has another decorator, `catch` that
catches any exceptions that occur during the step and then continues execution of
subsequent steps.

The main upside of `catch` is that it can make your workflows extremely robust: it will
handle all error scenarios from faulty code and faulty data to platform issues. The main
downside is that your code needs to be modified so that it can tolerate faulty steps.

Let's consider issues caused by your code versus everything surrounding it separately.

### Exceptions Raised by Your Code

By default, Metaflow stops execution of the flow when a step fails. It can't know what
to do with failed steps automatically.

You may know that some steps are error-prone. For instance, this can happen with a step
inside a foreach loop that iterates over unknown data, such as the results of a query or
a parameter matrix. In this case, it may be desirable to let some tasks fail without
crashing the whole flow.

Consider this example that is structured like a hyperparameter search:

```python
from metaflow import FlowSpec, catch, step

class CatchFlow(FlowSpec):

    @step
    def start(self):
        self.params = range(3)
        self.next(self.compute, foreach='params')

    @catch(var='compute_failed')
    @step
    def compute(self):
        self.div = self.input
        self.x = 5 / self.div
        self.next(self.join)

    @step
    def join(self, inputs):
        for input in inputs:
            if input.compute_failed:
                print('compute failed for parameter: %d' % input.div)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    CatchFlow()
```

As you can guess, the above flow raises an error. Normally, this would crash the whole
flow. However, in this example the `catch` decorator catches the exception and stores it
in an instance variable called `compute_failed`, and lets the execution continue. The
next step, `join`, contains logic to handle the exception.

The `var` argument is optional. The exception is not stored unless you specify it. You
can also specify `print_exception=False` to prevent the `catch` decorator from printing
out the caught exception on stdout.

### Platform Exceptions

You could have dealt with the above error by wrapping the whole step in a `try ...
except` block. In effect, this is how `catch` deals with errors raised in the user code.

In contrast, platform issues happen outside of your code, so you can't handle them with
a `try ... except` block.

Let's simulate a platform issue like these with the following flow that kills itself
without giving Python a chance to recover:

```python
from metaflow import FlowSpec, step, retry, catch

class SuicidalFlow(FlowSpec):

    @catch(var='start_failed')
    @retry
    @step
    def start(self):
        import os, signal
        # kill this process with the KILL signal
        os.kill(os.getpid(), signal.SIGKILL)
        self.next(self.end)

    @step
    def end(self):
        if self.start_failed is not None:
            print("It seems 'start' did not survive.")

if __name__ == '__main__':
    SuicidalFlow()
```

Note that we use both `retry` and `catch` above. `retry` attempts to run the step three
times, hoping that the issue is transient. The hope is futile. The task kills itself
every time.

After all retries are exhausted, `catch` takes over and records an exception in
`start_failed`, notifying that all attempts to run `start` failed. Now it is up to the
subsequent steps, `end` in this case, to deal with the scenario that `start` produced no
results whatsoever. They can choose an alternative code path using the variable assigned
by `catch`, `start_failed` in this example.

## Timing out with the `timeout` Decorator

By default, there is no timeout for steps. If you cause an infinite loop accidentally or
query an external service that hangs, the step will block the flow forever. This is
undesirable especially in production runs that should not require human intervention.

Metaflow provides a `timeout` decorator to address this issue:

```python
from metaflow import FlowSpec, timeout, step
import time

class TimeoutFlow(FlowSpec):

    @timeout(seconds=5)
    @step
    def start(self):
        for i in range(100):
            print(i)
            time.sleep(1)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    TimeoutFlow()
```

Here, the `start` step times out after five seconds. Besides `seconds`, you can specify
`minutes` and/or `hours` as the timeout value. Note that all values specified are
cumulative so specifying 10 seconds and 5 minutes will result in a timeout of 5 minutes
and 10 seconds.

The above example raises an exception if the step does not finish in the given time
period. This is a good pattern if the timeout is a genuine error condition.

In some cases you can handle a timeout in subsequent steps. Similar to `SuicidalFlow`
above, you can use the `catch` decorator to catch the timeout exception:

```python
from metaflow import FlowSpec, timeout, step, catch
import time

class CatchTimeoutFlow(FlowSpec):

    @catch(print_exception=False, var='timeout')
    @timeout(seconds=5)
    @step
    def start(self):
        for i in range(100):
            print(i)
            time.sleep(1)
        self.next(self.end)

    @step
    def end(self):
        if self.timeout:
            print('the previous step timed out')
        else:
            print('all ok!')

if __name__ == '__main__':
    CatchTimeoutFlow()
```

This example handles a timeout in `start` gracefully without showing any exceptions.

## Exit hooks: Executing a function upon success or failure

:::info
This is a new feature in Metaflow 2.16. Exit hooks work with local runs and when
[deployed on Argo Workflows](/production/scheduling-metaflow-flows/scheduling-with-argo-workflows).
:::

Exit hooks let you define a special function that runs at the end of a flow, regardless
of whether the flow succeeds or fails. Unlike the end step, which is skipped if the flow
fails, exit hooks always run. This makes them suitable for tasks like sending notifications
or cleaning up resources. However, since they run outside of steps, they cannot be used to
produce artifacts.

You can attach one or more exit hook functions to a flow using the `@exit_hook` decorator. For example:

```python
from metaflow import step, FlowSpec, Parameter, exit_hook, Run

def success_print():
    print("✅ Flow completed successfully!")

def failure_print(run):
    if run:
        print(f"💥 Run {run.pathspec} failed. Failed tasks:")
        for step in run:
            for task in step:
                if not task.successful:
                    print(f"  →  {task.pathspec}")
    else:
        print(f"💥 Run failed during initialization")

@exit_hook(on_error=[failure_print], on_success=[success_print])
class ExitHookFlow(FlowSpec):
    should_fail = Parameter(name="should-fail", default=False)

    @step
    def start(self):
        print("Starting 👋")
        print("Should fail?", self.should_fail)
        if self.should_fail:
            raise Exception("failing as expected")
        self.next(self.end)

    @step
    def end(self):
        print("Done! 🏁")

if __name__ == "__main__":
    ExitHookFlow()
```

Note that when deployed on Argo Workflows, exit hook functions execute as separate
containers (pods), so they will execute even if steps fail e.g. due to out of memory condition.

### Custom dependencies in exit hooks

Since exit hook functions are not steps, you can't use `@pypi` or `@conda` to manage
their dependencies.
Instead, you can provide a custom image in `options={'image': ...}` like here:
```
@exit_hook(on_error=[failure_print], options={"image": URL_TO_AN_IMAGE})
```

## Resuming work inside a retried task

When `@retry` retries a task, the task starts again from the beginning. That is fine
for short steps, but if a step loops over many slow items, such as calling an external
API for each record, a failure near the end of the loop means redoing all the work
that already succeeded.

You can avoid this by checkpointing each finished item while the loop runs, and
skipping those items when the task is retried. Artifacts are only saved when a task
finishes, so they can't be used for this. Instead, write each result to S3 with
[the `S3` client](data.md#data-in-s3-metaflows3) under a prefix that is unique
to the task, `current.pathspec`. Retries of the same task share the same pathspec,
so a retry can see what the earlier attempts stored.

Here is a small decorator that implements the pattern:

```python
import pickle
from functools import wraps

from metaflow import FlowSpec, step, retry, current, S3


class resumable_processing:
    """
    Process the items in the artifact `process` one by one, saving each
    result to S3 so that a retried task skips items that are already done.
    The results end up in the artifact `results`, in the original order.
    """

    def __init__(self, process="items", results="output"):
        self.process = process
        self.results = results

    def __call__(self, f):
        @wraps(f)
        def func(flow):
            prefix = "resumable-processing/%s/" % current.pathspec
            inputs = getattr(flow, self.process)

            # count items that earlier attempts of this task finished
            with S3(run=flow) as s3:
                done = sum(1 for _ in s3.list_recursive([prefix]))

            index = done

            def append_item(obj):
                nonlocal index
                with S3(run=flow) as s3:
                    s3.put("%s%012d" % (prefix, index), pickle.dumps(obj))
                index += 1

            # expose the remaining items and the checkpoint function
            flow.iter_items = iter(inputs[done:])
            flow.append_item = append_item
            f(flow)
            # don't persist these helpers as artifacts
            del flow.iter_items
            del flow.append_item

            # collect all results, including those from earlier attempts
            with S3(run=flow) as s3:
                objs = s3.get_recursive([prefix])
                out = [pickle.loads(obj.blob) for obj in sorted(objs, key=lambda o: o.key)]
            if len(out) != len(inputs):
                raise Exception(
                    "Expected %d results but found %d" % (len(inputs), len(out))
                )
            setattr(flow, self.results, out)

        return func


class ResumingFlow(FlowSpec):
    @step
    def start(self):
        self.items = list(range(10))
        self.next(self.process)

    @retry(times=2)
    @resumable_processing(process="items", results="output")
    @step
    def process(self):
        for item in self.iter_items:
            # simulate a failure halfway through the first attempt
            if item == 5 and current.retry_count == 0:
                raise Exception("Failed while processing item %d" % item)
            print("processing item", item)
            self.append_item(item * 10)
        self.next(self.end)

    @step
    def end(self):
        print("results", self.output)


if __name__ == "__main__":
    ResumingFlow()
```

The first attempt of `process` handles items 0 to 4 and then fails. The retry
finds the five stored results, starts from item 5, and `end` prints all ten
results. Note that `resumable_processing` has to be placed between `@retry` and
`@step`.

A few things to keep in mind:

* The step must process items in a fixed order, and the input list must be the
  same on every attempt. Items are matched to stored results by position.
* Call `append_item` only after an item is fully processed. An item that fails
  midway is processed again on the next attempt, so processing should be safe to
  repeat for a single item.
* The checkpoints are tied to one task. If you start a new run, or use
  `resume`, the task gets a new pathspec and processing starts from scratch.
* The example needs a datastore that supports the `S3` client, i.e. `--datastore=s3`.
  On other clouds, you can implement the same idea with the corresponding storage
  client.

## Summary

Here is a quick summary of failure handling in Metaflow:

* Use `retry` to deal with transient platform issues. You can do this easily on the
  command line with the `--with retry` option.
* Use `retry` **with** `catch` for extra robustness if you have modified your code to
  deal with faulty steps which are handled by `catch`.
* Use `catch` **without** `retry` to handle steps [that can't be retried
  safely](failures.md#how-to-prevent-retries). It is a good idea to use `times=0` for
  `retry` in this case.
* Use `timeout` with any of the above if your code can get stuck.
* Checkpoint progress to S3 inside a step if a retry should continue where the
  previous attempt left off, instead of starting over.
* Use `@exit_hook` to execute custom functions upon success or failure.

