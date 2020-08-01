# Debugging with Metaflow

Metaflow wants to make debugging failed flows as painless as possible.

Debugging issues during development is a normal part of the development process. You should be able to develop and debug your Metaflow scripts similar to how you develop any Python scripts locally.

Debugging a failure can either happen **after** a failed execution or **during** execution. In the first case, Metaflow provides two mechanisms:

* the [ability to resume a flow](debugging.md#how-to-debug-failed-flows), re-executing all successful steps and only re-executing from the failed step. This allows you to fix the problem in the failed step, resume the flow and make progress.
* the [ability to inspect the data](debugging.md#inspecting-data-with-a-notebook) produced by each step in a flow to be able to determine what went wrong.

In the second case, Metaflow is also compatible \(at least when executing locally\) with [debuggers](debugging.md#debugging-your-flow-code) which allow you to set breakpoints inside your step code. You will then be able to inspect and modify state and step through your code line-by-line to determine where the problem is.

## How to debug failed flows

The process of debugging failed flows is similar both for development-time and production-time issues:

1. Identify the step that failed. The failed step is reported as the last line of the error report where it is easy to spot.
2. Identify the run id of the failed run. On the console output, each line is prefixed with an identifier like `2/start/21426`. Here, `2` is the run id, `start` is the step name, and `21426` is the task id.
3. Reproduce the failed run with `resume` as [described below](debugging.md#how-to-use-the-resume-command). Confirm that the error message you get locally matches to the original error message.
4. Identify the failed logic inside the failed step. You can do this by adding `print` statements in the step until `resume` reveals enough information. Alternatively, you can reproduce the faulty logic in a notebook using input data artifacts for the step, as described below in the section about [notebooks](debugging.md#inspecting-data-with-a-notebook).
5. Confirm that the fix works with `resume`. Return to 4 if the error has not been fixed.
6. When the step works locally, rerun the whole flow from `start` to `end` and confirm that the fix works as intended.

### How to use the `resume` command

The `resume` command allows you to resume execution of a past run at a failed step. Resuming makes it easy to quickly reproduce the failure and iterate on the step code until a fix has been found.

Here is how it works. First, save the snippet below :

```python
from metaflow import FlowSpec, step

class DebugFlow(FlowSpec):

    @step
    def start(self):
        self.next(self.a, self.b)

    @step
    def a(self):
        self.x = 1
        self.next(self.join)

    @step
    def b(self):
        self.x = int('2fail')
        self.next(self.join)

    @step
    def join(self, inputs):
        print('a is %s' % inputs.a.x)
        print('b is %s' % inputs.b.x)
        print('total is %d' % sum(input.x for input in inputs))
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    DebugFlow()
```

Run the script with:

```bash
python debug.py run
```

The run should fail. The output should look like:

```python
...
2018-01-27 22:59:40.313 [3/b/21638 (pid 13720)] File "debug.py", line 17, in b
2018-01-27 22:59:40.313 [3/b/21638 (pid 13720)] self.x = int('2fail')
2018-01-27 22:59:40.314 [3/b/21638 (pid 13720)] ValueError: invalid literal for int() with base 10: '2fail'
2018-01-27 22:59:40.314 [3/b/21638 (pid 13720)]
2018-01-27 22:59:40.361 [3/a/21637 (pid 13719)] Task finished successfully.
2018-01-27 22:59:40.362 [3/b/21638 (pid 13720)] Task failed.
2018-01-27 22:59:40.362 Workflow failed.
    Step failure:
    Step b (task-id 21638) failed.
```

This shows that the step `b` of the run `3` failed. In your case, the run id could be different.

The `resume` command runs the flow similar to `run`. However, in contrast to `run` resuming reuses results of every successful step instead of actually running them.

Try it with

```bash
python debug.py resume
```

Metaflow remembers the run number of the last local run, which in this case is `3`, so you should see `resume` reusing results of the run above. Since we have not changed anything yet, you should see the above error again but with an incremented run number.

You can also resume a specific run using the CLI option `--origin-run-id` if you don't like the default value selected by Metaflow. To get the same behavior as above, you can also do:

```bash
python debug.py resume --origin-run-id 3
```

If you'd like programmatic access to the `--origin-run-id` selected for the `resume` \(either implicitly selected by Metaflow as last `run` invocation, or explicitly declared by the user via the CLI\), you can use the `current` singleton. Read more [here](tagging.md#accessing-current-ids-in-a-flow).

Next, fix the error by replacing `int('2fail')` in `debug.py` with `int('2')`. Try again after the fix. This time, you should see the flow completing successfully.

Resuming uses the flow and step names to decide what results can be reused. This means that the results of previously successful steps will get reused even if you change their step code. You can add new steps and alter code of failed steps safely with `resume`

#### Resuming from an arbitrary step

By default, `resume` resumes from the step that failed, like `b` above. Sometimes fixing the failed step requires re-execution of some steps that precede it.

You can choose the step to resume from by specifying the step name on the command line:

```bash
python debug.py resume start
```

This would resume execution from the step `start`. If you specify a step that comes after the step that failed, execution resumes from the failed step - you can't skip over steps.

#### Resume and parameters

If your flow has [`Parameters`](basics.md#how-to-define-parameters-for-flows), you can't change their values when resuming. Changing parameter values could change the results of any steps, including those that `resume` skips over, which could result to unexpected behavior in subsequent steps.

The `resume` command reuses the parameter values that you set with `run` originally.

## **Reproducing production issues locally**

This section shows you how to reproduce a failed Metaflow run on AWS Step Functions locally. This is how a failed run on AWS Step Functions UI looks like -

![](https://lh4.googleusercontent.com/7a7yW4JMApMn8_X4DZsnoT2EOIK_RR0YTwkhJrEDq9jUJDHuVZv6BLgRJ-XtHrkP9MAM28ofrYMVK7W-f9pIRXTbuay3VWvR73FuDvW_OI4BprDheWViGd3XLD-ArMUgwu-Flok_)

![](https://lh4.googleusercontent.com/SxMRHj9suoBFMQwx4FJP-zywTzCUrePSRMAYhxVOreXxwEJe-eL3WciP3TxVyNkNrrSEmKo1bbBkS762rEtJ4SVJj8MaJubTdmnBsjkONi5NT4BUSXcnqwL47KXQaQaEwSpzroeT)

Notice the execution ID of `5ca85f96-8508-409d-a5f5-b567db1040c5`. When running on AWS Step Functions, Metaflow uses the AWS Step Functions execution ID \(prefixed with `sfn-`\) as the run id.

The graph visualization shows that step `b` failed, as expected. First, you should inspect the logs of the failed step to get an idea of why it failed. You can access AWS Batch step logs in the AWS Step Functions UI by looking for the `JobId` in the `Error` blob that can be accessed by clicking on the `Exception` pane on the right side of the UI. You can use this `JobId` in the AWS Batch console to check the job logs. This `JobId` is also the metaflow task ID for the step.

Next, we want to reproduce the above error locally. We do this by resuming the specific AWS Step Functions run that failed:

```bash
python debug.py resume --origin-run-id sfn-5ca85f96-8508-409d-a5f5-b567db1040c5
```

This will reuse the results of the `start` and `a` step from the AWS Step Functions run. It will try to rerun the step `b` locally, which fails with the same error as it does in production.

You can fix the error locally as above. In the case of this simple flow, you can run the whole flow locally to confirm that the fix works. After validating the results, you would deploy a new version to production with `step-functions create`.

However, this might not be a feasible approach for complex production flow. For instance, the flow might process large amounts of data that can not be handled in your local instance. We have better approaches for staging flows for production:

### **Staging flows for production**

The easiest approach to test a demanding flow is to run it with AWS Batch. This works even with resume:

```bash
python debug.py resume --origin-run-id sfn-5ca85f96-8508-409d-a5f5-b567db1040c5 --with batch
```

This will resume your flow and run every step on AWS Batch. When you are ready to test a fixed flow end-to-end, just run it as follows:

```bash
python debug.py run --with batch
```

Alternatively, you can change the name of the flow temporarily, e.g. from DebugFlow to DebugFlowStaging. Then you can run `step-functions create` with the new name, which will create a separate staging flow on AWS Step Functions.

You can test the staging flow freely without interfering with the production flow. Once the staging flow runs successfully, you can confidently deploy a new version to production.

## Inspecting data with a notebook

The above example demonstrates a trivial error. In the real life, errors can be much trickier to debug. In the case of machine learning, a flow may fail because of an unexpected distribution of input data, although nothing is wrong with the code per se.

Being able to inspect data produced by every step is a powerful feature of Metaflow which can help in situations like this.

This clip \(no audio\) demonstrates inspecting values in a flow:

{% embed url="https://share.getcloudapp.com/X6uDx9KB" caption="" %}

In the above clip, you will see:

1. In the flow from the [tutorials](../getting-started/tutorials/) \([Episode 1](../getting-started/tutorials/season-1-the-local-experience/episode01.md)\), the `genre_movies` step calculates an artifact `movies`. We are going to demonstrate how this artifact can be inspected after the flow has executed;
2. In a Jupyter notebook, you can list all the flows and select the latest run of the Episode 1 flow;
3. Further, you can select the `genre_movies` step from this flow and inspect its value. As you can see, the value computed at that step is fully available via the [Client API](client.md) and this works for any completed step even steps that completed successfully in a failed run.

For more details about the notebook API, see the [Client API](client.md).

## Debugging your Flow code using an IDE

If anything fails in your code, Metaflow prints out the normal Python stack trace showing the line of code that caused the error. Typically, this error message provides enough information so you can fix the code using your favorite editor.

Alternatively, you can use a built-in debugger available in many modern IDEs. Since Metaflow uses subprocesses to launch steps, the IDE may need some additional configuration to handle this properly. We detail the configuration for two popular IDEs here. Other IDEs may also work similarly - let us know and we can add information about your favorite tool.

### Debugging with PyCharm

The following steps will allow you to debug your Flow within PyCharm:

1. In the "Run" menu, select "Edit Configurations..."
2. Create a new configuration with the following items:
   1. Set the "Script path" field to point to the absolute path of your Flow script
   2. Set the "Parameters" field to "run"
   3. Set the "Working directory" field to the directory containing your Flow script
3. You can now set your breakpoints as usual in your Flow code and select "Debug" from the "Run" menu.

Note that since Metaflow may launch multiple steps in parallel, you may actually hit multiple breakpoints at the same time; you will be able to switch between those breakpoints using the drop down menu \(it will say "MainThread"\). You can also restrict Metaflow to only execute one step at a time by adding "--max-workers 1" to the "Parameters" field.

### Debugging with VSCode

You can debug with the Python plugin for VSCode.

1. You will need a "launch.json" file in your ".vscode" directory:
   1. Select "Open Configurations" from the "Debug" menu.
   2. If you have never created a launch.json file, select "Python File" when it asks.
2. Create a configuration that looks like this:

```javascript
{
    "name": "Helloworld",
    "type": "python",
    "request": "launch",
    "program": "<absolute path to program script>",
    "args": [
        "run"
    ],
    "env": {
        "USERNAME": "<your username>"
    },
    "subProcess": true,
    "console": "integratedTerminal"
}
```

You can now set breakpoints and then select "Start Debugging" from the "Debug" menu. Note that since Metaflow may launch multiple steps in parallel, you may actually hit multiple breakpoints at the same time; you will be able to switch between those breakpoints by selecting the proper function stack in the "Call Stack" window. You can also restrict Metaflow to only execute one step at a time by adding the values "--max-workers" and "1" to the "args" array in the configuration.

### Combining debugging with resume

You can naturally combine the techniques described in this section with the "resume" command described previously. Instead of passing "run" as the program argument, simply pass "resume".

### Compatibility with Conda decorator

The above instructions work even if you use [`@conda` decorators](dependencies.md#managing-dependencies-with-conda-decorator) in your code; you need, however, to ensure that the `conda` binary is available in your `PATH`. The easiest way to do this is to set the `PATH` environment variable to properly include the path to the `conda` binary if it is in a non-standard location. In VSCode, you can simply add this value in the env section of launch.json and in PyCharm, the UI allows you to set environment variables.

