
# Event Triggering

## Chaining flows with `trigger_on_finish`

Here's an example of a flow that trains a model that is saved in artifact `self.model`.

```python
class TrainingFlow(FlowSpec):

    @step
    def start(self):
        self.model = {'x': 1}
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    TrainingFlow()
```

Once `TrainingFlow` finishes and a fresh model is available, a `PredictionFlow` is triggered downstream using the `@trigger_on_finish` decorator:

```python
@trigger_on_finish(flow='TrainingFlow')
class PredictionFlow(FlowSpec):

    @step
    def start(self):
        print("Triggering Run object", current.trigger.run)
        print("Triggering event name", current.trigger.event.name)
        print("Triggering timestamp", current.trigger.event.timestamp)
        self.model = current.trigger.data.model
        print('Model value', self.model['x'])
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    Predictionlow()
```

`PredictionFlow` can access all artifacts created by `TrainingFlow`, including `model`, through `current.trigger.data`
expression, which accesses the artifact through the triggering `Run` object, stored in `current.trigger.run`.

### Testing `trigger_on_finish` Locally

You can test `PredictionFlow` locally by simulating triggering on the command line. You can run
the flow locally as follows:
```
python predictionflow.py --trigger TrainingFlow/34 run
```
this will run the flow as if it was triggered by a run `TrainingFlow/34`, which is made available through the
`current.trigger` object.

If you don't specify `--trigger`, the `current.trigger` object is set to `None`.

### Inspecting triggering runs using the Client API

You can inspect triggered runs usings the Client API. The `Run` object exposes the same `trigger` information as
`current.trigger`, as follows:

```
from metaflow import Flow
prediction_run = Flow('PredictionFlow').latest_run
traininig_run = prediction_run.trigger.run
```

Note that you can use this construct to follow a chain of triggered runs. Imagine `TrainingFlow` was triggered by `ETLFlow`, which is a grandparent run of `PredictionFlow`. You can access it as follows:

```
from metaflow import Flow
etl_run = Flow('PredictionFlow').latest_run.trigger.run.trigger.run
```

## Flows triggered by multiple runs

Imagine `PredictionFlow` was triggered by two flows, `TrainingFlow` and `DataFlow`. In this case, you need to
disambiguate which data you want to access:

```python
@trigger_on_finish(flows=['TrainingFlow', 'DataFlow'])
class PredictionFlow(FlowSpec):

    @step
    def start(self):
        print("Triggering TrainingFlow's Run object", current.trigger['TrainingFlow'])
        print("Triggering DataFlow's Run object", current.trigger['DataFlow'])
        print("Triggering event name", current.trigger.events[0].name)
        print("Triggering timestamp", current.trigger.events[0].timestamp)
        self.model = current.trigger['TrainingFlow'].data.model
        print('Model value', self.model['x'])
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    Predictionlow()
```


### Testing `trigger_on_finish` with multiple runs locally

You can specify multiple `--trigger`'s.

```
python predictionflow.py --trigger TrainingFlow/34 --trigger DataFlow/12 run
```

## Flow triggered by an external event

```python
@trigger_on(events=["first", "second"])
class DataFlow(FlowSpec):

    @step
    def start(self):
        print("Triggering 'first' event timestamp", current.trigger['first'].timestamp)
        print("Triggering 'second' event timestamp", current.trigger['second'].timestamp)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    Predictionlow()
```

### Inspecting external events

```
from metaflow import Flow
data_run = Flow('DataFlow').latest_run
print(data_run.trigger['first'].timestamp)
```

### Testing `trigger_on` locally

If events have no payload (no parameters specified), you can simply use event names:

```
python dataflow.py --trigger first --trigger second run
```

If they have payload, you can specify full JSON objects:
```
python dataflow.py --trigger '{"name": "first", "fields": {"x": 1}}' --trigger second run
```

## Configuring triggering behavior

The [eventing backend](#) you have configured may support various options that adjust the behavior of events. You
can supply these backend-specific options through the `options` keyword argument:

```python
@trigger_on(events=["first", "second"], options={'reset': 5})
class DataFlow(FlowSpec):

    @step
    def start(self):
        print("Triggering 'first' event timestamp", current.trigger['first'].timestamp)
        print("Triggering 'second' event timestamp", current.trigger['second'].timestamp)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    Predictionlow()
```

In this example, the `reset` option adjusts the time window for active events. This option is supported by
`Argo Workflows`. An error is raised during deployment if the option is not recognized by your currently configured
backend.


## API docs for `MetaflowTrigger`

You can access `MetaflowTrigger` either through the `Run.trigger` property or via `current.trigger` in an active run.


```python
class MetaflowTrigger:

    @property
    def event():
        """
        Returns a `MetaflowEvent` object corresponding to the triggering event. If multiple events
        triggered the run, returns None - use `events` instead.
        """

    @property
    def events():
        """
        Returns a list of `MetaflowEvent` objects correspondings to all the triggering events.
        """

    @property
    def data():
        """
        A shorthand for `trigger.run.data`, except lazy-loads only the artifacts accessed instead of
        loading all of them as `run.data` does.
        """

    @property
    def run():
        """
        If the triggering event is a Metaflow run, returns the corresponding `Run` object. `None` if
        the event is not a `Run` or multiple events are present.
        """

    @property
    def runs():
        """
        If the triggering events correspond to Metaflow runs, returns a list of `Run` objects.
        Otherwise returns `None`.
        """

    @property
    def type():
        """
        Return trigger type: `RUN`, `MANY-RUNS` (and), `ONE-OF-RUNS` (or), `EVENT`, `MANY-EVENTS` (and),
        `ONE-OF-EVENTS` (or).
        """

    def __getitem__(self, key):
        """
        If triggering events are runs, `key` corresponds to the flow name of the triggering run.
        Returns a triggering `Run` object corresponding to the key. If triggering events are not
        runs, `key` corresponds to the event name and a `MetaflowEvent` object is returned.
        """

class MetaflowEvent:

    @property
    def name():
        """event name"""

    @property
    def timestamp():
        """event creation timestamp"""

    @property
    def type():
        """event type"""
