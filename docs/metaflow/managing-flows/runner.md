
# Running Flows Programmatically

The Runner API allows you to start and manage Metaflow runs and other operations programmatically,
for instance, to run flows in a script. 

The `Runner` class exposes a blocking API, which waits for operations
to complete, as well as a non-blocking (asynchronous) APIs, prefixed with `async` which execute
operations in the background. This document provides an overview of common patterns. For
detailed API documentation, see  [the Runner API reference](/api/runner).

:::tip
The `Runner` API orchestrates flows locally, equivalent to local runs started
on the command line. To trigger runs in production, orchestrated by a production
scheduler, take a look at [event triggering](/production/event-triggering).
:::

:::tip
For a practical example of `Runner` in action, see
[the `benchmark` example in Config-Driven
Experimentation](/metaflow/configuring-flows/config-driven-experimentation#benchmark-a-templatized-flow-with-pluggable-modules).
:::

---

To execute the examples below, save this flow in `slowflow.py`:
```python
import time
from metaflow import FlowSpec, Parameter, step

class SlowFlow(FlowSpec):

    secs = Parameter('seconds', default=3)

    @step
    def start(self):
        for i in range(self.secs):
            print(f"{i} seconds passed")
            time.sleep(1)
        self.next(self.end)

    @step
    def end(self):
        pass
    
if __name__ == '__main__':
    SlowFlow()
```

## Blocking runs 

Here's a simple example that runs the above flow and waits for it to complete:

```python
from metaflow import Runner
with Runner('slowflow.py').run() as running:
    print(f'{running.run} finished')
```

You can access the results of the run through [the Client API](/metaflow/client), accessible through
[the `Run` object](/api/client#run) that you can find in the `ExecutingRun.run` attribute.

:::info
`Runner` is best used as a context manager so it can clean up any temporary files created during
execution automatically. Otherwise you should call `runner.cleanup()` once
you are done with the object to make sure no temporary files are left behind.
:::

All methods that start a run return [an `ExecutingRun` object](/api/runner#executingrun)
which contains [the `Run` started](/api/client#run) as well as metadata about the corresponding
subprocess such as its `status`, and output in `stdout` and `stderr`:

```python
from metaflow import Runner

SECONDS = 5

with Runner('slowflow.py', show_output=False).run(seconds=SECONDS) as running:
    if running.status == 'failed':
        print(f'❌ {running.run} failed:')
    elif running.status == 'successful':
        print(f'✅ {running.run} succeeded:')
    print(f'-- stdout --\n{running.stdout}')
    print(f'-- stderr --\n{running.stderr}')

    print(f'⏰ The flow waited for {running.run.data.secs} seconds')
```

Note that we set `show_output=False` to hide the output of the run while it executes.

### Passing parameters

You can pass parameters to the run through the keyword arguments in `run`, such as `seconds` above.
Note that the parameter values are type-checked automatically, ensuring that the types match with
the actual types expected by each `Parameter`.

## Setting options

You can set top-level options directly in the `Runner` constructor. The names map to the corresponding
command-line options with flags like `--no-pylint` mapping to a corresponding boolean, `pylint=False`. As
a special case, the option `--with` maps to `decospecs`, as `with` is a reserved keyword in Python.

For instance, you can [run a flow remotely in the cloud](/scaling/remote-tasks/requesting-resources) as follows

```python
from metaflow import Runner
with Runner('slowflow.py', pylint=False, decospecs=['kubernetes', 'retry']).run() as running:
    print(f'{running.run} completed on Kubernetes!')
```
which is equivalent to running
```
python slowflow.py --no-pylint --with kubernetes --with retry run
```
on the command line. Also, you can pass options to the `run` command, such as `max_workers` or `tags`:

```python
from metaflow import Runner
with Runner('slowflow.py').run(max_workers=1, tags=['myrun', 'another_tag']) as running:
    print(f'{running.run} has tags {running.run.user_tags}')
```


## Non-blocking API

The non-blocking Runner API leverages [Python's asynchronous APIs](https://docs.python.org/3/library/asyncio.html) to
manage operations running in the background. This allows you to inspect and interact with runs and other operations
while they are executing, and handle many concurrent operations.

The API is nearly equivalent to the blocking API, except you must `await` all asynchronous operations. For instance,
you can run a flow, check its status once a second, and access its outputs as follows:

```python
import asyncio
from metaflow import Runner

async def main():
    with await Runner('slowflow.py').async_run() as running:
        while running.status == 'running':
            print(f"Run status is {running.status}")
            await asyncio.sleep(1)
        print(f'{running.run} finished')

asyncio.run(main())
```

You can accomplish the above also using the `wait()` method which waits for a run to complete:

```python
import asyncio
from metaflow import Runner

async def main():
    with await Runner('slowflow.py').async_run() as running:
        await running.wait()
        print(f'{running.run} finished')

asyncio.run(main())
```

### Streaming logs

Use the `stream_log` asynchronous iterator to stream logs in real-time. This snippet prints
logs from `stdout` line by line until the run completes:

```python
import asyncio
from metaflow import Runner

async def main():
    with await Runner('slowflow.py').async_run() as running:
        async for _, line in running.stream_log('stdout'):
            print(f'OUT: {line}')
        print(f'{running.run} finished')

asyncio.run(main())
```

If you want to perform other operations while ingesting logs periodically, you can pull lines
from the iterator without a `for` loop. This snippet outputs one line at a time from `stdout`
until the run finishes, and then flushes any remaining logs to the output leveraging the
`position` argument of `stream_log` which allows streaming to continue from a known location:

```python
import asyncio
from metaflow import Runner

async def main():
    with await Runner('slowflow.py', quiet=True).async_run(seconds=7) as running:
        stdout = aiter(running.stream_log('stdout'))
        while running.status == 'running':
            out_pos, out_line = await anext(stdout)
            print(f'STILL RUNNING: {out_line}')
            await asyncio.sleep(1)
        # output remaining lines, if any
        async for _, out_line in running.stream_log('stdout', position=out_pos):
            print(out_line)
        print(f'{running.run} finished')

asyncio.run(main())
```

### Managing concurrent runs

A key benefit of the asynchronous API is that it allows multiple operations to run at the same time.
For example, you can execute many runs in parallel, each with its own set of parameters.

This snippet demonstrates the pattern: It starts five concurrent runs, each with a different value of
the `seconds` parameter, and shows the values one by one as the runs complete.

```python
import asyncio
from metaflow import Runner

async def main():
    # start five concurrent runs
    runs = [await Runner('slowflow.py').async_run(seconds=i, tags=['manyruns']) for i in range(5)]
    while runs:
        print(f'{len(runs)} runs are still running')
        still_running = []
        for running in runs:
            if running.status == 'running':
                still_running.append(running)
            else:
                print(f'{running.run} ran for {running.run.data.secs} seconds')
        runs = still_running
        await asyncio.sleep(1)

asyncio.run(main())
```

You can observe the five runs executing in parallel in the Metaflow UI:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer playing controls muted playsinline loop url='/assets/async_runs.mp4' width='100%' height='100%'/>

## Programmatic `resume`

Besides managing runs, [you can `resume` past executions](/metaflow/debugging#how-to-use-the-resume-command),
either in a blocking or non-blocking manner.

This snippet finds the oldest run of `SlowFlow` and resumes it using a blocking call:

```python
from metaflow import Runner, Flow
old_id = list(Flow('SlowFlow'))[-1].id
print(f'Resuming the first run of SlowFlow, {old_id}')
with Runner('slowflow.py').resume(origin_run_id=old_id) as running:
    print(f"Resumed run {running.run} completed")
```

This snippet does the same using the asynchronous API:

```python
import asyncio
from metaflow import Runner, Flow

async def main():
    old_id = list(Flow('SlowFlow'))[-1].id
    print(f'Resuming the first run of SlowFlow, {old_id}')
    with await Runner('slowflow.py').async_resume(origin_run_id=old_id) as running:
        await running.wait()
        print(f"Resumed run {running.run} completed")

asyncio.run(main())
```
