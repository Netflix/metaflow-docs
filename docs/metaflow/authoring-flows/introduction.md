import ReactPlayer from 'react-player'

# Authoring Flows Incrementally

Every non-trivial piece of software is built incrementally, one piece at a time.

With Metaflow, you might start with a simple stub, perhaps just a step to load data,
and then gradually add more `@step`s, say, for data transformation, model training,
and beyond, testing the flow at each iteration. To enable a smooth development
experience, these iterations should run quickly, with minimal waiting - much
like the familiar workflow in a notebook, where you build results one cell at a time.

## The `spin` command

:::info New Feature
The `spin` command was introduced in Metaflow
2.19. [Read the announcement blog post for motivation](https://netflixtechblog.medium.com/b2d5b95c63eb).
:::

While you can certainly `run` a flow from start to end at each iteration -
similar to the "Run All" mode in notebooks - this can take a while. You
can use [`resume`](/metaflow/debugging#how-to-use-the-resume-command) to run a part of
a flow, reusing past results, but even this might be
overkill when you are focused on developing a particular `@step` and you just
want to test it with appropriate input data.

Metaflow provides a `spin` command to address this use case: rapid, iterative
development and testing of a single step. Watch this one minute video
to see it in action:

<ReactPlayer controls url="https://youtu.be/3RNMM-lthm0" />
<br/>

As shown in the video, you can use `spin` to author flows incrementally following
this pattern:

1. Develop a stub of a flow - at the minimum, add `start` and `end` steps.
2. Use `run` to run the flow to produce an initial set of inputs.
3. Edit any step, `somestep`.
4. Use `python myflow.py spin somestep` to test the changes quickly using
   the input artifacts from the latest run (or any earlier run).
5. Once `somestep` seems to work, add a next step and repeate the process from (2)
   until the flow is complete.

### The properties of `spin`

As `spin` is meant for rapid testing of an individual step, it doesn't track
metadata or persist artifacts by default. Hence you won't see the `spin` iterations
on the Metaflow UI, and you can't access artifacts globally using
[the Client API](/metaflow/client). Instead, you can eyeball logs on the console and
optionally [access the output artifacts locally](/metaflow/authoring-flows/spin-input-output).
Once the step seems to work, just `run` the flow as usual to take a snapshot of all
metadata and artifacts.

Currently `spin` doesn't support
[executing tasks remotely](/scaling/remote-tasks/requesting-resources) but you can use
`@pypi` and `@conda` for [dependency management](scaling/dependencies) as usual. Also,
`spin` comes in handy in [visualizing results with `@card`](/metaflow/visualizing-results/effortless-task-inspection-with-default-cards#developing-cards-quickly-with-spin).

You may use `spin` programmatically using [the `Runner` API](/metaflow/managing-flows/runner),
as described in the section about using [`spin` for unit testing](/metaflow/authoring-flows/spin-input-output#using-spin-for-unit-testing). 

### Testing a step with past results

:::note
You may need to upgrade your metadata service to allow `spin` to find past results
efficiently. The command will show a message about this if an upgrade is needed.
:::

By default, `spin` executes the given step with artifacts originating from the latest
run in [the current namespace](/scaling/tagging). Hence you can just `spin somestep` 
without having to worry about the input artifacts changing abruptly.

Optionally, you may spin a step using artifacts from any past run. Simply provide
the full pathspec of a task as an argument for `spin`, like here:
```
python myflow.py spin 32455/train/355
```
In this case, `spin` will re-execute the `train` step in `myflow.py` using the same
inputs that were provided for the given task `32455/train/355`.

:::tip
You can use `spin` to test a step quickly with different inputs, since it can replay
any past results. For example, if you have several previous runs with varying datasets
or sample sizes, you can `spin` the step against each one to see how it behaves with
diverse inputs.
:::


