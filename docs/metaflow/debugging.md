import ReactPlayer from 'react-player'

# Debugging Flows

Metaflow wants to make debugging failed flows as painless as possible.

Debugging issues during development is a normal part of the development process. You
should be able to develop and debug your Metaflow scripts similar to how you develop any
Python scripts locally.

Debugging a failure can either happen **after** a failed execution or **during**
execution. In the first case, Metaflow provides two mechanisms:

- the [ability to resume a flow](debugging#how-to-debug-failed-flows), re-executing all
  successful steps and only re-executing from the failed step. This allows you to fix
  the problem in the failed step, resume the flow and make progress.
- the [ability to inspect the data](debugging#inspecting-data-with-a-notebook) produced
  by each step in a flow to be able to determine what went wrong.

In the second case, Metaflow is also compatible (at least when executing locally) with
[debuggers](#debugging-your-flow-code-using-an-ide) which allow you to set breakpoints
inside your step code. You will then be able to inspect and modify state and step
through your code line-by-line to determine where the problem is.

## How to debug failed flows

The process of debugging failed flows is similar both for development-time and
production-time issues:

1. Identify the step that failed. The failed step is reported as the last line of the
   error report where it is easy to spot.
2. Identify the run id of the failed run. On the console output, each line is prefixed
   with an identifier like `2/start/21426`. Here, `2` is the run id, `start` is the step
   name, and `21426` is the task id.
3. Reproduce the failed run with `resume` as [described
   below](debugging#how-to-use-the-resume-command). Confirm that the error message you
   get locally matches to the original error message.
4. Identify the failed logic inside the failed step. You can do this by adding `print`
   statements in the step until `resume` reveals enough information. Alternatively, you
   can reproduce the faulty logic in a notebook using input data artifacts for the step,
   as described below in the section about
   [notebooks](debugging#inspecting-data-with-a-notebook).
5. Confirm that the fix works with `resume`. Return to 4 if the error has not been
   fixed.
6. When the step works locally, rerun the whole flow from `start` to `end` and confirm
   that the fix works as intended.

### How to use the `resume` command

The `resume` command allows you to resume execution of a past run at a failed step.
Resuming makes it easy to quickly reproduce the failure and iterate on the step code
until a fix has been found.

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

This shows that the step `b` of the run `3` failed. In your case, the run id could be
different.

The `resume` command runs the flow similar to `run`. However, in contrast to `run`
resuming reuses results of every successful step instead of actually running them.

Try it with

```bash
python debug.py resume
```

Metaflow remembers the run number of the last local run, which in this case is `3`, so
you should see `resume` reusing results of the run above. Since we have not changed
anything yet, you should see the above error again but with an incremented run number.

You can also resume a specific run using the CLI option `--origin-run-id` if you don't
like the default value selected by Metaflow. To get the same behavior as above, you can
also do:

```bash
python debug.py resume --origin-run-id 3
```

If you'd like programmatic access to the `--origin-run-id` selected for the `resume`
(either implicitly selected by Metaflow as last `run` invocation, or explicitly declared
by the user via the CLI), you can use the `current` singleton. Read more
[here](/scaling/tagging#accessing-current-ids-in-a-flow).

Next, fix the error by replacing `int('2fail')` in `debug.py` with `int('2')`. Try again
after the fix. This time, you should see the flow completing successfully.

Resuming uses the flow and step names to decide what results can be reused. This means
that the results of previously successful steps will get reused even if you change their
step code. You can add new steps and alter code of failed steps safely with `resume`

### Resuming from an arbitrary step

By default, `resume` resumes from the step that failed, like `b` above. Sometimes fixing
the failed step requires re-execution of some steps that precede it.

You can choose the step to resume from by specifying the step name on the command line:

```bash
python debug.py resume start
```

This would resume execution from the step `start`. If you specify a step that comes
after the step that failed, execution resumes from the failed step - you can't skip over
steps.

### Resume and parameters and configs

If your flow has [`Parameters`](basics#how-to-define-parameters-for-flows), you can't
change their values when resuming. Changing parameter values could change the results of
any steps, including those that `resume` skips over, which could result to unexpected
behavior in subsequent steps.

The `resume` command reuses the parameter values that you set with `run` originally. The
same logic applies for [`Configs`](/metaflow/configuring-flows/introduction) - when
resuming, the configs included in the original run are used instead of the latest files.

This helps reproduce issues in the original run, even if you don't remember
(or have access to) the original configs used.

:::info
Note that changes in config files are not applied in `resume`d runs. Original
configs assigned to the run specified by `--origin-run-id` are used instead.
:::

### Reproducing production issues locally

The `resume` command can come in handy when debugging failed production runs too. This
works exactly the same way as described above: Just specify a production run ID as the
`--origin-run-id`. Crucially, the resumed producation run executes in your own
namespace, so it doesn't affect other production runs directly, making it safe to debug,
test, and iterate on issues locally.

Here's a high-level recipe:

 1. You deploy a flow to [a production workflow orchestrator](/production/introduction)
    supported by Metaflow.
 2. A production run fails. Note its run ID, `R`.
 3. To debug the issue, you resume the failed run locally with `resume --origin-run-id
    R`.
 4. You can repeat (3) until the issue has been fixed.
 5. Once the issue has been fixed, you deploy the fixed version to production and
    restart the production run.

To apply the above recipe on your orchestrator of choice, see the following sections:

 - [Resuming with Argo
   Workflows](/production/scheduling-metaflow-flows/scheduling-with-argo-workflows#reproducing-failed-production-runs)
 - [Resuming with AWS Step
   Functions](/production/scheduling-metaflow-flows/scheduling-with-aws-step-functions#reproducing-failed-production-runs)
 - [Resuming with Apache
   Airflow](/production/scheduling-metaflow-flows/scheduling-with-airflow#reproducing-failed-production-runs)

## Inspecting data with a notebook

The above example demonstrates a trivial error. In the real life, errors can be much
trickier to debug. In the case of machine learning, a flow may fail because of an
unexpected distribution of input data, although nothing is wrong with the code per se.

Being able to inspect data produced by every step is a powerful feature of Metaflow
which can help in situations like this.

This clip (no audio) demonstrates inspecting values in a flow:

<div style={{position: "relative", width: "100%", height: 500}}>
<iframe src="https://cdn.iframe.ly/3Ffh7OX" style={{top: 0, left: 0, width: "100%", 
height: "100%", position: "absolute", border: 0}} allowfullscreen="" scrolling="no"
allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe>
</div>

In the above clip, you will see:

1. In the flow from the [tutorials](../getting-started/tutorials/) ([Episode
   1](../getting-started/tutorials/season-1-the-local-experience/episode01)), the
   `genre_movies` step calculates an artifact `movies`. We are going to demonstrate how
   this artifact can be inspected after the flow has executed;
2. In a Jupyter notebook, you can list all the flows and select the latest run of the
   Episode 1 flow;
3. Further, you can select the `genre_movies` step from this flow and inspect its value.
   As you can see, the value computed at that step is fully available via the [Client
   API](client) and this works for any completed step even steps that completed
   successfully in a failed run.

For more details about the notebook API, see the [Client API](client).

## Debugging your Flow code using an IDE

If anything fails in your code, Metaflow prints out the normal Python stack trace
showing the line of code that caused the error. Typically, this error message provides
enough information so that you can fix the code using your favorite editor.

Alternatively, you can use a built-in debugger available in many modern IDEs. Since
Metaflow uses subprocesses to launch steps, the IDE may need some additional
configuration to handle this properly. We detail the configuration for two popular IDEs
here. Other IDEs may also work similarly - let us know and we can add information about
your favorite tool.

### Debugging with PyCharm

The following steps will allow you to debug your Flow within PyCharm:

1. In the "Run" menu, select "Edit Configurations..."
2. Create a new configuration with the following items:
   1. Set the "Script path" field to point to the absolute path of your Flow script
   2. Set the "Parameters" field to "run"
   3. Set the "Working directory" field to the directory containing your Flow script
3. You can now set your breakpoints as usual in your Flow code and select "Debug" from
   the "Run" menu.

Note that since Metaflow may launch multiple steps in parallel, you may actually hit
multiple breakpoints at the same time; you will be able to switch between those
breakpoints using the dropdown menu (it will say "MainThread"). You can also restrict
Metaflow to only execute one step at a time by adding "--max-workers 1" to the
"Parameters" field.

### Debugging with VSCode

You can enable debugging of a Flow in VSCode by adjusting your project's configuration
in `.vscode/launch.json`.

Here is a recording of the end-to-end setup process:

<ReactPlayer controls url="https://www.youtube.com/watch?v=xWGxDeojqeM" />

The configuration file as illustrated in the recording is provided below. Make sure you
are extra careful to update the json structure appropriately if you already have
existing settings.

```javascript
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Metaflow Debug",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "args": [
                "run"
            ],
            "env": {
                "USERNAME": "hamel"
            },
            "subProcess": true,
            "console": "integratedTerminal"
        }
    ]
}
```

You can now set breakpoints and then select "Start Debugging" from the "Debug" menu or
command pallete as illustrated in the recording. Note that since Metaflow may launch
multiple steps in parallel, you may actually hit multiple breakpoints at the same time;
you will be able to switch between those breakpoints by selecting the proper function
stack in the "Call Stack" window. You can also restrict Metaflow to only execute one
step at a time by adding the values "--max-workers" and "1" to the "args" array in the
configuration.

### Combining debugging with resume

You can naturally combine the techniques described in this section with the "resume"
command described previously. Instead of passing "run" as the program argument, simply
pass "resume".

### Compatibility with Conda decorator

The above instructions work even if you use [`@conda`
decorators](/scaling/dependencies#managing-dependencies-with-conda-decorator) in your
code; you need, however, to ensure that the `conda` binary is available in your `PATH`.
The easiest way to do this is to set the `PATH` environment variable to properly include
the path to the `conda` binary if it is in a non-standard location. In VSCode, you can
simply add this value in the env section of launch.json and in PyCharm, the UI allows
you to set environment variables.
