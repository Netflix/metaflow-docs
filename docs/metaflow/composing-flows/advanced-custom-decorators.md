
# Advanced Custom Decorators

In addition to running logic before and after user code (as shown on
[the previous page](/metaflow/composing-flows/custom-decorators)), a decorator can
override the `@step` code entirely, executing alternative logic in its place.
Or, a decorator can take action if the user code fails.

## Catching failures in the user code

A decorator can catch failures in the user code by wrapping `yield` in a `try`-`except` block. The
following example shows the pattern in action, capturing any exceptions in the user code, and asking ChatGPT for
advice how to fix it. Save the module to `ai_debug.py`:

```python
import os
import inspect
import traceback

from metaflow import user_step_decorator

PROMPT = """
I have a Metaflow step that is defined as follows:

{source}

It raised the following exception:

{stack_trace}

Provide suggestions how to fix it.
"""

@user_step_decorator
def ai_debug(step_name, flow, inputs=None, attributes=None):
    source = inspect.getsource(getattr(flow, step_name))
    try:
        yield
    except:
        print("❌ Step failed:")
        stack_trace = traceback.format_exc()
        prompt_gpt(PROMPT.format(source=source, stack_trace=stack_trace))
        raise

def prompt_gpt(prompt):
    import requests
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    if OPENAI_API_KEY:
        print("🧠 Asking AI for help..")
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "gpt-4",
            "messages": [{"role": "user", "content": prompt}]
        }
        response = requests.post(url, headers=headers, json=data)
        resp = response.json()["choices"][0]["message"]["content"]
        print(f"🧠💡 AI suggestion:\n\n{resp}")
    else:
        print("Specify OPENAI_API_KEY for debugging help")
```

You can test the decorator e.g. with this flow:

```python
import math
from metaflow import FlowSpec, step

from ai_debug import ai_debug

class FailFlow(FlowSpec):

    @ai_debug
    @step
    def start(self):
        x = 3
        for i in range(5):
            math.sqrt(x - i)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    FailFlow()
```

Set your OpenAI API key in an environment variable `OPENAI_API_KEY` and run the flow. The results are impressive:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer controls muted playsinline url='/assets/ai_debug.mp4' width='100%' height='100%'/>

## Skipping the user code

A decorator can decide to skip execution of the user code by yielding an empty dictionary, i.e. `yield {}`. Even when
skipping the user code a task is started - to execute the custom decorator - but the task is finished right after the
decorator finishes.

The following example leverages the feature to implement a `@memoize` decorator that reuses past results, skipping
redundant recomputation:

```python
import os
from metaflow import Flow, user_step_decorator, current

@user_step_decorator
def memoize(step_name, flow, inputs=None, attributes=None):
    artifact = attributes['artifact']
    reset = attributes.get('reset')
    if reset and getattr(flow, reset, False):
        print("⚙️ memoized results disabled - running the step")
        yield
    else:
        try:
            run = Flow(current.flow_name).latest_successful_run
            previous_value = run[step_name].task[artifact].data
        except:
            print("⚙️ previous results not found - running the step")
            yield
        else:
            print(f"✅ reusing results from a previous run {run.id}")
            setattr(flow, artifact, previous_value)
            yield {}
```

Note that `Flow` adheres to [Metaflow namespaces](/scaling/tagging), so `@memoize` can be used safely by many
concurrent users and production runs, without intermixing results.

The following flow utilizes `@memoize` to skip downloading of data and recomputation of taxi fares in the
`compute_fare` step:

```python
from metaflow import FlowSpec, step, Parameter, pypi

from memoize import memoize

URL = 'https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2020-01.parquet'

class ComputeTotalFare(FlowSpec):

    reset = Parameter('reset', default=False, is_flag=True)
    url = Parameter('url', default=URL)

    @step
    def start(self):
        self.next(self.compute_fare)

    @memoize(artifact='total_fare', reset='reset')
    @pypi(packages={'duckdb': '1.3.2'})
    @step
    def compute_fare(self):
        import duckdb
        SQL = f"SELECT SUM(fare_amount) AS total_fare FROM '{self.url}'"
        self.total_fare = duckdb.query(SQL).fetchone()[0]
        self.next(self.end)

    @step
    def end(self):
        print(f"Total taxi fares: ${self.total_fare}")

if __name__ == '__main__':
    ComputeTotalFare()
```

You can use the `--reset` flag to force recomputation of results.

## Replacing the user code

A decorator may decide to execute another function instead of the step function defined in the flow - just
`yield` a callable that takes a `FlowSpec` object (`self` in steps) as an argument. 

The following example implements a `@fallback` decorator that first attempts to run the user code and if it
fails - `current.retry_count > 0` - it executes a fallback function instead of re-executing the user code.

```python
from metaflow import user_step_decorator, current

@user_step_decorator
def fallback(step_name, flow, inputs=None, attributes=None):
    def _fallback_step(self):
        print("🛟 step failed: executing a fallback")
        var = attributes.get('indicator')
        if var:
            setattr(self, var, True)

    if current.retry_count == 0:
        yield
    else:
        yield _fallback_step
```

If you pass an attribute `indicator` to the decorator, it stores a corresponding artifact indicating that the
step failed. You can test the decorator with the `FailFlow` above. Note that you need to apply [the `@retry`
decorator](/scaling/failures#retrying-tasks-with-the-retry-decorator) to enable retries:

```
python failflow.py run --with retry --with fallback.fallback:indicator=failed
```

:::info
The fallback function cannot modify the flow’s control logic - it cannot change the target of
a `self.next` call. The overall flow structure remains unchanged, even when a fallback
function is used.
:::



