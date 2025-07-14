
# Applying Decorators with Mutators

The previous pages showed how to create various kinds of custom decorators.
**Mutators** operate at a higher level: they let you programmatically *control
which decorators and parameters are applied to your flow*.

For instance, you can use mutators to

 - Apply stacks of decorators automatically, e.g. `@retry` and `@fallback`.

 - Create template flows that apply the right decorators automatically,
   maybe [based on configs](/metaflow/configuring-flows/introduction).

 - As a foundational element of [the `BaseFlow` pattern](/metaflow/composing-flows/baseflow)
   which lets you define shared, domain-specific tooling for all flows in your project, ensuring
   that everyone follows the same path consistently.

Mutators look like decorators but instead of being functions annotated with `@user_step_decorator`,
they are defined as classes derived from `FlowMutator` or `StepMutator`, using [the `Mutator` API](#).

:::info
Unlike decorators, mutators are applied at deploy time, before a run or deployment begins.
As a result, they cannot modify the flow during execution.
:::

## Defining a flow mutator

A flow mutator can manipulate parameters of the flow and decorators attached to its steps through
a `MutableFlow` object, passed to the mutator's `mutate` method.

The following example defines a `@robust_flow` mutator which applies
[Metaflow's built-in `@retry` decorator](/scaling/failures#retrying-tasks-with-the-retry-decorator)
and [the custom `@fallback` decorator](/metaflow/composing-flows/advanced-custom-decorators#replacing-the-user-code)
to all steps of the flow.

```python
from metaflow import FlowMutator
from fallback import fallback

class robust_flow(FlowMutator):
    def init(self, *args, **kwargs):
        self.disable_fallback = bool(kwargs.get("disable_fallback"))
        self.fallback_attributes = {}
        fallback_indicator = kwargs.get("fallback_indicator")
        if fallback_indicator:
            self.fallback_attributes["indicator"] = fallback_indicator

    def mutate(self, mutable_flow):
        for step_name, step in mutable_flow.steps:
            step.add_decorator("retry", duplicates=step.IGNORE)
            if not self.disable_fallback:
                step.add_decorator(
                    fallback,
                    deco_kwargs=self.fallback_attributes,
                    duplicates=step.IGNORE,
                )

```

Note the following details:
 
 - A flow-level mutator is defined in a class derived from `FlowMutator`.
 - You can capture and process attributes in the `init` method - not the Python's default `__init__` constructor.
 - Use the `mutate` method to mutate the flow through the `mutable_flow` handle.
 - When using mutators to add decorators, consider whether they should **override** or **defer to** the
   same decorators added by the user. This behavior is controlled by the `duplicates` argument, which is
   explained in detail in the next section.

You can test the mutator with our previously defined `FailFlow`:

```python
import math
from metaflow import FlowSpec, step

from robust_flow import robust_flow

@robust_flow(fallback_indicator='failed')
class FailFlow(FlowSpec):

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

Execute the flow without specifying any `--with` options. Thanks to the decorators added by `@robust_flow`, the
run will behave exactly the same as if it was run with:

```
python failflow.py run --with retry --with fallback.fallback:indicator=failed
```

### How to handle duplicate decorators

What should happen if you run the above flow, decorated with `@robust_flow(fallback_indicator='failed')`, as follows:
```
python failflow.py run --with fallback.fallback:indicator=step_failed
```
Should the `indicator` be `failed` - as defined in the mutator attributes - or `indicator=step_failed` as defined
on the command line?

The choice depends on the policy you want to implement: Sometimes the mutator should override the user's choice,
sometimes the opposite. You can control the behavior through the `duplicates` attribute which one of the 
three options:

 - `IGNORE` - the decorator added by the mutator is ignored if a user-defined decorator exists.
 - `OVERRIDE` - the decorator added by the mutator overrides a user-defined decorator.
 - `ERROR` - adding duplicate decorators raises an error.

You can test the effect of the options with `@robust_flow` above. You can see the artifacts produced with
```
python failflow.py dump RUN_ID/start
```

## Introspecting a flow and applying configs

Let's walk through a more advanced mutator that shows how you can
utilize [`Config`s](/metaflow/configuring-flows/introduction) and flow introspection in mutators. We
develop a flow [linter](https://en.wikipedia.org/wiki/Lint_(software)) that ensures that `@resources`
defined in a flow adhere to limits set in a config.

First, let's define a configuration that specified limits for compute resources, `limits.json`:
```javascript
{
   "cpu": 2,
   "memory": 16000,
   "disk": 10000
}
```

This mutator reads the limits through a `Config`, `mutable_flow.limits`, 
iterates through all decorators of each step using `step.decorator_specs`, finds the ones
where resource limits apply, and enforces the limits by overwriting offending decorators.

```python
from metaflow import FlowMutator, config_expr, current

class flow_linter(FlowMutator):
    def mutate(self, mutable_flow):
        limits = mutable_flow.limits
        for step_name, step in mutable_flow.steps:
            for deco_name, _module, _args, attributes in step.decorator_specs:
                if deco_name in ("kubernetes", "batch", "resources"):
                    for key, limit in limits.items():
                        val = attributes.get(key)
                        if val and float(val) > limit:
                            print(
                                f"⚠️  Step[{step_name}] @{deco_name}({key}={val}) "
                                f"is higher than the limit of {limit} - fixed"
                            )
                            attributes[key] = limit
                            step.add_decorator(
                                deco_name,
                                deco_kwargs=attributes,
                                duplicates=step.OVERRIDE,
                            )
```

Try it with this flow:

```python
from metaflow import FlowSpec, step, resources, Config

from flow_linter import flow_linter

@flow_linter
class HungryFlow(FlowSpec):

    limits = Config('limits', default='limits.json')

    @resources(cpu=16)
    @step
    def start(self):
        print(self._graph_info)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    HungryFlow()
```

Run the flow e.g. as
```
python hungryflow.py run --with resources:memory=64000
```
and notice the warnings.

## Applying multiple decorators with a step mutator

Imagine you’ve built a custom decorator that depends on third-party libraries. You could
use Metaflow’s built-in dependency management, e.g. [a `@pypi`
decorator](/scaling/dependencies/libraries), to install those libraries. However, this
requires users to remember to apply **both** your custom decorator **and** the appropriate 
`@pypi` decorator, which is error-prone.

A better solution is to create a step mutator that adds the decorators automatically. As an example,
let's create a custom data access decorator that fetches a dataset, preprocesses it, and returns a
dataframe to the user step - making sure that all necessary dependencies are installed automatically.

We can define a step mutator `@dataset` and a decorator `@process_dataset` in the same module, as they
are tightly coupled:

```python
from metaflow import StepMutator, config_expr, current, user_step_decorator

DEPS = {"duckdb": "1.3.2", "pyarrow": "20.0.0"}

@user_step_decorator
def process_dataset(step_name, flow, inputs=None, attr=None):
    import duckdb

    sql = f"""SELECT * FROM '{attr["url"]}'"""
    fltr = attr.get("filter")
    if fltr:
        sql += f"WHERE {fltr}"
    con = duckdb.connect()
    print("🔄 Preparing data")
    flow.table = con.execute(sql).fetch_arrow_table()
    print("✅ Data prepared")
    yield
    del flow.table

class dataset(StepMutator):
    def init(self, *args, **kwargs):
        self.url = kwargs["url"]
        self.filter = kwargs.get("filter")

    def mutate(self, mutable_step):
        mutable_step.add_decorator(
            "pypi", deco_kwargs={"packages": DEPS}, duplicates=mutable_step.ERROR
        )
        mutable_step.add_decorator(
            process_dataset,
            deco_kwargs={"filter": self.filter, "url": self.url},
            duplicates=mutable_step.ERROR,
        )
```

From the user’s perspective, the step mutator `@dataset` behaves like a regular decorator. Its
role is to capture attributes such as `url` and `filter`, and automatically apply two additional
decorators — `@pypi` and `@process_dataset` — to the step where it is used.

After this, the `@process_dataset` decorator can `import duckdb` knowing that the library is
available. Note that we use [the temporary artifact
pattern](/metaflow/composing-flows/custom-decorators#exposing-an-api-to-the-user-code) to expose
an Arrow table, `flow.df`, to the user code, but we don't persist it as an artifact.

Let's try `@dataset` in a flow. To demonstrate another useful pattern, we load attributes from a 
config file, `dataset.json` which can look like this:
```javascript
{
   "url": "https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2020-01.parquet",
   "filter": "tip_amount > fare_amount"
}
```

..and pass them to the `@dataset` mutator:

```python
from metaflow import FlowSpec, step, resources, Config

from dataset import dataset

class DatasetFlow(FlowSpec):

    data_config = Config('dataset', default='dataset.json')

    @dataset(url=data_config.url, filter=data_config.filter)
    @step
    def start(self):
        print(self.table)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    DatasetFlow()
```

Note that you can apply step mutators with `--with`, similar to decorators:
```
python datasetflow.py --environment=pypi run --with 'dataset.dataset:url=SOME_URL'
```

The internals of `@dataset` are fully encapsulated - users don’t need to worry about 
installing `duckdb` or `pyarrow` themselves, or even know that `duckdb` is used.



