
# Triggering Flows Based on External Events

You can configure flows [deployed on Argo Workflows]
(/production/scheduling-metaflow-flows/scheduling-with-argo-workflows) start
automatically when an event occurs in an external system. For instance, you
could start a flow whenever new data is available in a data warehouse:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer playing controls muted loop url='/assets/et-basic-event.mp4' width='100%' height='100%'/>

All you have to do is to add [a decorator, `@trigger`]
(/api/flow-decorators/trigger), with a desired event name above the flow:

```python
from metaflow import FlowSpec, step, trigger

@trigger(event='data_updated')
class FreshDataFlow(FlowSpec):

    @step
    def start(self):
        # load data from the data warehouse
        print('processing fresh data!')
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    FreshDataFlow()
```

You can develop and test the flow locally as usual: `@trigger` doesn't have any
effect on local runs. To test triggering, deploy the flow to Argo Workflows:

```
python freshdata.py argo-workflows create
```

The output should state something along the lines of
```
What will trigger execution of the workflow:
    This workflow triggers automatically when the upstream
    data_updated event is/are published.
```
indicating that the deployment has been linked to the desired event. 

### Defining events

In the above example, we used `data_updated` as the name of the event that triggers the flow. You
can choose the name freely. By using different names, you can make flows react to different events.

If you are familiar with streaming systems like Kafka or queues like AWS SQS, you can think of the
event name as *a topic* in these systems.

### Depending on multiple events

You can require that multiple events must be present before the flow gets
triggered. Simply define a list of events: ```python
@trigger(events=['data_updated', 'phase_of_the_moon'])
```
all the events need to be occur within a configured time window for the flow to trigger.

## Creating events

In order to trigger the flow deployed with `@trigger`, we need an event.
Metaflow comes with a utility class, `ArgoEvent`, which makes it easy to create
suitable events from any environment. You can call it as a part of your ETL
pipeline running outside Metaflow, in a microservice, or in a notebook -
wherever and whenever you want to trigger a Metaflow execution.

```python
from metaflow.integrations import ArgoEvent

ArgoEvent(name="data_updated").publish()
```

This line will create an event that will trigger **all flows** deployed on Argo Workflows that are
waiting for the event `data_updated`.

Note that `publish()` only publishes an event and returns immediately. It does not guarantee that
a run will start -- it's possible that no flow is waiting for the particular event. Correspondingly,
if you call `ArgoEvent` many times, you can trigger arbitrarily many runs of connected flows.

:::info

Before calling `ArgoEvent` make sure that you have a valid Metaflow
configuration and a connection to the Kubernetes cluster set up in the
environment where you call `.publish()`. If you call it from systems outside
Metaflow, make sure that these prerequisites are met.

:::

### Advanced case: Publishing events inside a flow

It is not common to publish events inside a Metaflow flow, since
[the `@trigger_on_finish` decorator]
(/production/event-triggering/flow-events) takes care of flow-to-flow
triggering conveniently. Should you have a more advanced use case that requires
publishing events inside a flow, it is recommended that you use the
`ArgoEvent.safe_publish` method:

```python
from metaflow.integrations import ArgoEvent

ArgoEvent(name="data_updated").safe_publish()
```

The only difference to `publish()` is that events won't be created during local
runs. This means that you can include `safe_publish()` in your code safely and
develop and test it locally as usual, knowing that you won't be causing
unintended side-effects in surrounding systems that may depend on the event.

## Passing parameters in events

Besides simply starting runs through events, you can change their behavior on
the fly by letting the event [define `Parameters` of the flow]
(/metaflow/basics#how-to-define-parameters-for-flows).

Consider this typical machine learning system that implements a continuously refreshing model:

<ReactPlayer playing controls muted loop url='/assets/et-model.mp4' width='100%' height='100%'/>

1. An event is created whenever new data is available in the data warehouse.
2. The event contains information about the latest data available in the warehouse.
3. Using the information, a model is refreshed with a training set containing the
last N days of data.

The corresponding flow could look like this, ignoring details of data loading and the actual
training:

```python
from metaflow import FlowSpec, step, trigger, Parameter
from datetime import datetime, timedelta

@trigger(event="data_updated")
class ModelRefreshFlow(FlowSpec):
    latest = Parameter("latest", default="2023-05-01")
    window = Parameter("window", default=3)

    def load_data(self):
        # replace this with an actual data loader
        SQL = f"select * from data where time > to_date('{self.start_date}')"
        print("loading data since %s" % self.start_date)
        return [1, 2, 3]

    def train_model(self, df):
        # replace this with actual model training
        return df

    @step
    def start(self):
        self.latest_date = datetime.fromisoformat(self.latest)
        self.start_date = self.latest_date - timedelta(days=self.window)
        self.next(self.train)

    @step
    def train(self):
        df = self.load_data()
        self.model = self.train_model(df)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    ModelRefreshFlow()
```

To pass in parameters, we can simply define them in the `payload` of `ArgoEvent`:
```python
from metaflow.integrations import ArgoEvent
from datetime import datetime

ArgoEvent(name="data_updated").publish(payload={'latest': datetime.now().isoformat()})
```

### Mapping parameter names

Above, the payload field matches the parameter name `latest` exactly. In certain situations you may want
to define manually how parameters get their values. For instance, a common event may be used to trigger
various kinds of flows and it may be hard to coordinate parameter names across all consumers of the event.

In this situation, you can remap payload fields to parameter names through the `parameters` argument:
```python
@trigger(event={'name':'some_event', 'parameters': {'window': 'how_many_days'}})
```
Here, we define that `Parameter('window')` gets its value from the event payload field `how_many_days`.
Note that you need to remap all `parameters` that you want to assign through the event. Default assignments
are disabled when `parameters` is specified, which allows you to stay in full control of parameter mappings.

Parameter mapping comes in handy when multiple events are present:
```python
@trigger(events=[{'name':'one_event', 'parameters': {'window': 'how_many_days'}},
                 {'name':'another_event', 'parameters': {'latest': 'timestamp'}}])
```
In this case, `window` gets its value through the event `one_event` and `latest` through `another_event`.

