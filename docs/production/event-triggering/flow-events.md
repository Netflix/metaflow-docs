
# Triggering Flows Based on Other Flows

Besides triggering flows based on external events, you can trigger a flow when
another flow completes. Metaflow provides a special decorator to support the
pattern, [`@trigger_on_finish`](/api/flow-decorators/trigger_on_finish), which
allows you to build arbitrarily complex systems of interconnected flows.

Here, the completion of `FirstFlow` triggers a run of `SecondFlow`:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer playsinline playing controls muted loop url='/assets/et-flows.mp4' width='100%' height='100%'/>

Let's demonstrate the case with two simple flows:

```python
from metaflow import FlowSpec, step

class FirstFlow(FlowSpec):

    @step
    def start(self):
        print("This is the first flow")
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    FirstFlow()
```

and 

```python
from metaflow import FlowSpec, step, trigger_on_finish

@trigger_on_finish(flow='FirstFlow')
class SecondFlow(FlowSpec):

    @step
    def start(self):
        print("This is the second flow")
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    SecondFlow()
```

Deploy both the flows on Argo Workflows:
```
python firstflow.py argo-workflows create
python secondflow.py argo-workflows create
```

Since we didn't specify a trigger or `@schedule` for `FirstFlow`, we must start it manually:
```
python firstflow.py argo-workflows trigger
```

After `FirstFlow` completes, you should see `SecondFlow` starting automatically.

:::warning

You can create infinite loops with `@trigger_on_finish`. For instance, if you
specify `@trigger_on_finish(flow='SecondFlow')` for `FirstFlow` above, the
flows will trigger each other infinitely, consuming resources on the cluster.
If this happens, you can open the Argo Workflows UI and delete the workflow.

:::

### Triggering based on multiple flows

You can also depend on multiple flows completing before starting a flow. Simply define a list of flows:
```python
@trigger_on_finish(flows=['FirstFlow', 'AnotherFlow'])
```
all of the flows need to complete within a configured time windows for the flow to trigger.

## Passing data across flows

Consider an extension of `ModelRefreshFlow` that was featured
[on the previous
page](/production/event-triggering/external-events#passing-parameters-in-events).
This time, we want to use the newly trained model to run inference for the
latest data. This requires passing the model object from `TrainingFlow` to
`InferenceFlow`:

<ReactPlayer playsinline playing controls muted loop url='/assets/et-combo.mp4' width='100%' height='100%'/>

Whenever a flow is triggered by an event, information about the event is made
available through
[the `MetaflowTrigger`object](/api/client#metaflowtrigger)
that is accessible at `current.trigger`. See the
API documentation for [`MetaflowEvent` for all available event-related
metadata](/api/client#metaflowevent).

When using `@trigger_on_finish`, you can access information about the triggering
runs through
[`current.trigger.run`](/api/current#trigger-and-trigger_on_finish) or
[`current.trigger.runs`](/api/current#trigger-and-trigger_on_finish) in
the case of multiple flows, which return one or more
[`Run` objects](/metaflow/client#properties-related-to-runs). Use the
`Run` object to access artifacts as you do when
[using the Client API directly](/metaflow/client).

In this example, we access the `model` artifact created in `ModelRefreshFlow`:

```python
from metaflow import FlowSpec, step, trigger_on_finish, current

@trigger_on_finish(flow='ModelRefreshFlow')
class InferenceFlow(FlowSpec):

    @step
    def start(self):
        print("Triggering run", current.trigger.run)
        self.model = current.trigger.run.data.model
        print('Model', self.model)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    InferenceFlow()
```

## Testing flow triggering locally

You may have noticed one issue with `InferenceFlow` above. If you `run` it
locally, it will fail as `current.trigger` is not defined. Obviously, it would
be convenient to be able to test the flow before deploying to Argo Workflows.

During development, you can manually assign the triggering run on the command line:

```
python inferenceflow.py --trigger ModelRefreshFlow/233 run
```

This will run the flow as if it was triggered by a run `ModelRefreshFlow/233`.
This allows you to quickly iterate on the flow locally, testing it with
different upstream data providers.

:::note
In order for the trigger to succeed, the run `ModelRefreshFlow/233` must be an actual run that exists.
Metaflow will raise an error if a nonexistent run is specified.
:::


