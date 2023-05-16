
# Inspecting Events

Events provide an additional layer of observability in production systems. By following a trail of events, you can inspect
what was triggered, when, and by whom.

## Accessing events through Client API

You can inspect the event(s) with the Client API that exposes [the `MetaflowTrigger` object](#) for every event-triggered run.
For instance, we can inspect the event that triggered a production run `ModelRefreshFlow/argo-modelrefreshflow-rlpgc`:

```python
from metaflow import namespace, Run
namespace(None)
Run('ModelRefreshFlow/argo-modelrefreshflow-rlpgc').trigger.event
```
Remember that `namespace(None)` sets [the global namespace](/scaling/tagging#global-namespace) which is required to inspect production runs e.g. in a notebook. This will print out metadata about the event:
```
MetaflowEvent(name='data_updated',
			  id='ca75a1a4-91de-40c2-944c-0b39436c721e',
			  timestamp=datetime.datetime(2023, 5, 15, 19, 50, 43),
			  type='event')
```

Find a description of all fields in [the related API documentation](#).

### Following a trail of runs

When flows are connected with `@trigger_on_finish`, you can use `MetaflowTrigger` to follow a chain of triggered runs.
Consider this chain of flows:
```
ETLFlow → TrainingFlow → PredictionFlow
```
We can walk backwards from the latest run of `PredictionFlow` back to the triggering run of `ETLFlow`:
```python
etl_run = Flow('PredictionFlow').latest_run.trigger.run.trigger.run
```

## Events in the Metaflow UI

If you have deployed [the Metaflow GUI](https://netflixtechblog.com/open-sourcing-a-monitoring-gui-for-metaflow-75ff465f0d60), you can view metadata about triggers right
in the UI. The circles with arrows inside indicate event-triggered runs:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer playing controls muted loop url='/assets/mfgui-event.mp4' width='100%' height='100%'/>