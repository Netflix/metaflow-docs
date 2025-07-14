
# The BaseFlow Pattern

The previous sections introduced custom decorators and mutators, which let
you compose flows from reusable components. Production-grade ML and AI projects
often consist of many such components for data access and transformation,
quality checks, model training and inference, and publishing results - 
amongst other needs.

It’s beneficial to let end users focus on developing and iterating on
domain-specific logic, while minimizing visible boilerplate and project
scaffolding. This is where *the BaseFlow pattern* helps: It provides a
common foundation that bundles all necessary components, making them
readily available to the user.

## Defining a base flow

A BaseFlow is a class that inherits from `FlowSpec` and serves as a
foundation for other flows in a project. It can define shared components
such as flow mutators, `Config`s, `Parameter`s, and helper methods, but not steps
themselves. Individual flows in the project then inherit from `BaseFlow`,
automatically gaining access to the common functionality and ensuring consistency
across flows.

A common feature of the BaseFlow pattern is a common configuration file that governs
all top-level concerns of the project. For the following example, we can define a
`project.toml`:

```toml
name = 'myproject'

# run the flow hourly
schedule = "0 * * * *"

[limits]
cpu = 2
memory = 16000
disk = 10000
```

We use the config to set up a base flow:

```python
import tomllib

from metaflow import Config, FlowSpec, project, config_expr, schedule

from flow_linter import flow_linter

def parse_limits(x):
    return tomllib.loads(x)['limits']

@flow_linter
@project(name=config_expr('project.name'))
@schedule(cron=config_expr('project.schedule'))
class BaseFlow(FlowSpec):

    project_config = Config('project', default='project.toml', parser=tomllib.loads)
    limits = Config('limits', default='project.toml', parser=parse_limits)

    def number_of_rows(self):
        return len(self.table)
```

Note the following details:

 - We read `project.toml` as a `Config`, so all its values are available for all derived flows.

 - We ensure that all flows use `@flow_linter` which [we
   defined previously](/metaflow/composing-flows/mutators#introspecting-a-flow-and-applying-configs),
   and use the project config to read `limits` for it.

 - We use the config to parametrize `@project` and `@schedule`.

 - We define a helper method, `number_of_rows`, which [comes in
   handy with `@dataset`](/metaflow/composing-flows/mutators#applying-multiple-decorators-with-a-step-mutator).

Another common pattern is to include metadata, [such as Git
information](/metaflow/configuring-flows/custom-parsers#including-default-configs-in-flows), in flows
automatically. Depending on your needs, your `BaseFlow` can grow arbitrarily feature-rich. 

## Using a base flow

Here is an example flow that uses the `BaseFlow` defined above:

```python
from baseflow import BaseFlow
from metaflow import step, Config, current, resources

from dataset import dataset

class ComposedFlow(BaseFlow):

    data_config = Config('dataset', default='dataset.json')

    @resources(cpu=2)
    @dataset(url=data_config.url)
    @step
    def start(self):
        print(f"Project {current.project_name}")
        print("Number of rows:", self.number_of_rows())
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    ComposedFlow()
```

Thanks to `BaseFlow`, derived flows remain clean and minimal, despite including rich functionality under the hood, such as `@project`, `@schedule`, and `@flow_linter`. Shared helper methods also make it easy to equip all derived flows with common utilities, like `number_of_rows` in the example above.

Real-world projects often involve enough complexity and nuance that a single common foundation
can't cover every need. Instead of aiming for perfect, all-encompassing abstractions in `BaseFlow`,
it's better to allow derived flows to customize behavior as needed - such as with flow-specific
`data_config` in the example above.


