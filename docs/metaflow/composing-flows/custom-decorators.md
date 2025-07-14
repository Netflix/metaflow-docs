
# Custom Decorators

:::note
You can find [all decorator examples in this repository](https://github.com/outerbounds/custom-decorator-examples).
:::

Custom decorators let you:

- Run code **before** the user-defined step,

- Run code **after** the user-defined step,

- Run code **on failure** of the user-defined step,

- **Replace** the user-defined step with custom logic,

Notably, in any of the above cases, you can read, write, or delete **artifacts** to
maintain state within and across steps, as well as to process inputs and outputs from your decorator.
This page describes the basic usage of custom decorators covering the before and after cases. The next
page, [Advanced Custom Decorators](/metaflow/composing-flows/advanced-custom-decorators), covers the
last two patterns.

## Defining a custom decorator

A custom step decorator is a Python generator function, annotated with `@user_step_decorator`:

```python
import time
from metaflow import user_step_decorator, current

@user_step_decorator
def my_profile(step_name, flow, inputs=None, attributes=None):
    start = time.time()
    yield
    duration = 1000 * (time.time() - start)
    print(f"⏰ Task [{current.pathspec}] completed in {duration:.1f}ms")
```

The function is passed four arguments:

 - `step_name` - the step that is being decorated. 
 - `flow` - a `FlowSpec` object, corresponding to `self` in steps - used to access artifacts.
 - `inputs` - a list of `inputs` if the decorated function is [a join step](/metaflow/basics#branch).
 - `attributes` - a dictionary of keyword arguments passed to the decorator.

Any code before `yield` is executed before the user-defined step code. Code after it is executed
after the user's code has executed successfully. As an example, the `@my_profile` decorator above
measures and prints the execution time of the user code in milliseconds. Save it to a file, `myprofile.py`.

## Using a custom decorator

You can use the decorator in any Metaflow flow simply by importing it
```
from myprofile import my_profile
```
and by annotating steps with `@my_profile`. Alternatively, you can attach the decorator automatically
to all steps by executing a flow with
```
python myflow.py run --with myprofile.my_profile
```
You can test the above with this flow:
```python
import time
from metaflow import FlowSpec, step

from myprofiler import my_profile

class WaiterFlow(FlowSpec):

    @step
    def start(self):
        self.waiters = list(range(5))
        self.next(self.wait, foreach='waiters')

    @my_profile
    @step
    def wait(self):
        self.duration = self.input / 10
        print(f"💤 Sleeping for {self.duration}s")
        time.sleep(self.duration)
        self.next(self.join)

    @step
    def join(self, inputs):
        self.total = sum(inp.duration for inp in inputs)
        print(f"Slept {self.total}s in total")
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    WaiterFlow()
```
Save it as `waiterflow.py` and run it as usual:
```
python waiterflow.py run
```
You can also test
```
python waiterflow.py run --with myprofiler.my_profile
```

### Using custom decorators when executing tasks remotely

Custom decorators don't require special treatment when [executing tasks in
the cloud](/scaling/remote-tasks/introduction) or when [deploying flows to production](/production/introduction) -
they will get [packaged automatically by Metaflow](/scaling/dependencies#unpacking-a-metaflow-project). You don't
even need to `import` the decorators if you add them with `--with`. Try it:

```
python waiterflow.py run --with myprofiler.my_profile --with kubernetes
```
or equally `--with batch`. Notably, the decorators don't have to exist in the same [directory
hierarchy as your flow code](/scaling/dependencies/project-structure), nor you have to include them with `@pypi`.

If your custom decorator is part of a Python package with multiple modules, Metaflow will automatically package the entire package. This allows you to implement advanced decorators as well-structured Python packages, which can be distributed internally via your internal package repository or published to PyPI. If your decorator requires third-party dependencies, you can include them using a bundled `@pypi` decorator, as shown in [this example](#).

## Configuring decorators and managing state

Your decorators may want to manage state across steps, or you may want to produce results that can be accessed
after a run has completed. You can do this via artifacts. 

In the example below, save it to `statsprofiler.py`, we aggregate timings from all tasks in an artifact,
`timings`. Note that we use `hasattr` to see if the artifact exists already, and we check the presence of
`inputs` to merge timings in a join step:

```python
import time
from metaflow import user_step_decorator
from collections import defaultdict

@user_step_decorator
def stats_profile(step_name, flow, inputs=None, attributes=None):
    start = time.time()
    yield
    duration = int(1000 * (time.time() - start))

    if not hasattr(flow, "timings"):
        flow.timings = defaultdict(list)
    if inputs:
        for inp in inputs:
            for step, timings in inp.timings.items():
                flow.timings[step].extend(timings)
    flow.timings[step_name].append(duration)
    if step_name == "end" and not attributes.get("silent"):
        print_results(flow.timings)

def print_results(all_timings):
    print("📊 Step timings")
    print(f"{'Step':<20}{'P10 (ms)':<15}{'Median (ms)':<15}{'P90 (ms)':<15}")
    for step, timings in all_timings.items():
        timings.sort()
        n = len(timings)
        p10 = timings[int(n * 0.1)]
        median = timings[n // 2]
        p90 = timings[int(n * 0.9)]
        print(f"{step:<20}{p10:<15}{median:<15}{p90:<15}")
```

You can also configure the decorator behavior through `attributes`. Here, you can set
```python
@stats_profile(silent=True)
```
to suppress outputting of results. Or, on the command line:
```
python waiterflow.py run --with statsprofiler.stats_profile:silent=1
```
You can then use [the Client API](/metaflow/client) as usual to
access the results in the `timings` artifact.

![](/assets/statsprofiler.png)

## Exposing an API to the user code

A custom decorator can expose an API to user code via a temporary artifact. This allows you to maintain state using arbitrarily complex Python objects - such as instances of custom classes - that may not be easily serializable or retrievable as stable artifacts through the Client API.

This example, `traceprofiler.py`, exposes [a Python context manager](https://realpython.com/python-with-statement/)
through `self.trace` which the user code can use to collect timings of arbitrary sections of code. 

```python
import time
from metaflow import user_step_decorator
from collections import defaultdict

@user_step_decorator
def trace_profile(step_name, flow, inputs=None, attributes=None):
    flow.trace = TraceCollector
    yield
    del flow.trace
    flow.timings = TraceCollector.timings
    for name, timings in TraceCollector.timings.items():
        print(f"Trace: {name} - Total: {int(timings)}ms")

class TraceCollector(object):

    timings = defaultdict(int)

    def __init__(self, name):
        self.name = name

    def __enter__(self):
        self.start = time.time()

    def __exit__(self, type, value, traceback):
        self.timings[self.name] += 1000 * (time.time() - self.start)
```

It wouldn't make sense to store the context manager class, `TraceCollector`, as an artifact so we delete
it (`del flow.trace`) after the user code has finished and only store a dictionary of results as an artifact.
The following flow demonstrates the `with self.trace` in action:

```python
import time
from metaflow import FlowSpec, step

from traceprofiler import trace_profile

class TracingFlow(FlowSpec):

    @trace_profile
    @step
    def start(self):
        for i in range(10):
            with self.trace('database access'):
                time.sleep(0.1)
        with self.trace('process data'):
            time.sleep(0.5)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    TracingFlow()
```
