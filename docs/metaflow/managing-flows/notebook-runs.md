
# Running in a Notebook

To execute a flow defined in a cell, just add [a `NBRunner` one-liner](/api/runner#nbrunner)
on the last line of the same cell:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer playing controls muted playsinline loop url='/assets/nbrun1.mp4' width='100%' height='100%'/>

Once the flow finishes successfully, it will return [a `Run` object](/api/client#run) which you can use
to [inspect the results](/metaflow/client).

:::note
Notebook execution requires that

- The whole flow is defined in a single cell, including all `import` statements that the flow requires.

- The `NBRunner` call must be the last line of the cell.

- The cell shouldn't include the `if __name__ == '__main__'` block at the end which is needed
  by command line execution.
:::

## Passing Parameters 

You can set values for [`Parameters` of a flow](/metaflow/basics#how-to-define-parameters-for-flows) by
passing them as keyword arguments in `nbrun`:

<ReactPlayer playing controls muted playsinline loop url='/assets/nbrun-params.mp4' width='100%' height='100%'/>

Importantly, the parameter values may be variables defined in other cells, like `myalpha` in the video above.

## Running flows remotely

A major benefit of Metaflow is that it gives you easy access to [scalable compute
resources](/scaling/remote-tasks/introduction). To run a flow in the cloud instead of the notebook instance,
just [request cloud resources](/scaling/remote-tasks/requesting-resources).

You can pass any command-line options to `NBRunner` as keyword arguments. Note any `--with` options
are aliased as `decospecs`, as `with` is a reserved keyword in Python. For instance,
`NBRunner(MyFlow, decospecs=['kubernetes']` would be equal to `run --with kubernetes`, running the
flow remotely in a Kubernetes cluster:

<ReactPlayer playing controls muted playsinline loop url='/assets/nbrun-k8s.mp4' width='100%' height='100%'/>

:::tip

With Metaflow, you can use powerful compute resources, like [GPUs and other
accelerators](/scaling/remote-tasks/gpu-compute), to run a cell and easily get the results
back in the notebook.
:::

## Non-blocking runs

The `NBRunner(FlowName).nbrun()` one-liner is convenient for running a flow, waiting for it to complete, and
returning its results. However, especially with long-running runs, you may want to start a run in the
background, monitoring its progress and outputs live while the run is executing.

You can do this with `NBRunner.async_run()` which leverages [the non-blocking
Runner API](/metaflow/managing-flows/runner#non-blocking-api):

<ReactPlayer playing controls muted playsinline loop url='/assets/nbrun-async.mp4' width='100%' height='100%'/>

The key constructs that come in handy with non-blocking runs are:

 - `await runner.async_run()` which starts a run and returns [an `ExecutingRun` object].

 - `async for _, line in running.stream_log('stdout')` allows you to stream logs line by line.

 - `running.status` returns the current status of the run.

 - `await running.wait()` blocks until the run completes.

 - `runner.cleanup()` deletes any any temporary files that were created during execution.

Note that it is possible to instantiate multiple `NBRunner` objects in separate cells and manage many concurrent
runs with the above API. For more information, see documentation for
[the non-blocking runner API](/metaflow/managing-flows/runner#non-blocking-api).

:::note
Remember to call `runner.cleanup()` when you are done with a non-blocking run to remove temporary files.
:::

## Changing the working directory

By default, flows execute in a temporary directory. If you use a local configuration which saves Metaflow artifacts
in the current working directory, or you access local files using relative paths, you may want to set the working directory to a specific location. Define it with the `base_dir` keyword argument in `NBRunner`:

<ReactPlayer playing controls muted playsinline loop url='/assets/nbrun-basedir1.mp4' width='100%' height='100%'/>

