
# Flow Decorators

These decorators are set at the flow level, i.e. above the `class` definition. In contrast to step decorators, they _can't_ be attached on the command line using `--with`.

Example:

```python

@conda_base(libraries={'pandas': '1.0.0'})
@schedule(weekly=True)
@project(name='myproject')
class MyFlow(FlowSpec):
    ...
```

## Index

 - [`@conda_base`](/api/flow-decorators/conda_base) - set libraries used by all steps.
 - [`@project`](/api/flow-decorators/project) - create isolated namespaces around flows.
 - [`@schedule`](/api/flow-decorators/schedule) - define when to run flows in production.
 - [`@trigger`](/api/flow-decorators/trigger) - trigger a deployed flow when an event occurs.
 - [`@trigger_on_finish`](/api/flow-decorators/trigger_on_finish) - trigger a deployed flow when another flow finishes.
