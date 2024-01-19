
# Updating Cards During Task Execution

:::info
[Updating, dynamic cards were introduced in Metaflow
2.11](https://outerbounds.com/blog/metaflow-dynamic-cards/). Make sure you have a recent
enough version of Metaflow to use this feature.
:::

All the cards presented this far have been created after a task has completed. Sometimes
you want see results _during task execution_, for instance, to monitor progress
of a long-running task like model training or a demanding data processing job.

To support real-time use cases like this, cards allow you to update the state
of certain components - currently `Markdown`, `VegaChart`, and `ProgressBar` -
on the fly. In addition, you can `append` new components in a card while a
task is running, e.g. to show results as they are being produced.

Let's start with a simple example.

## Monitoring progress with `ProgressBar`

Let's create a `ProgressBar` and a text field using `Markdown`. We will then
`update`  their contents while a task is executing:

```python
from metaflow import step, FlowSpec, current, card
from metaflow.cards import Markdown, ProgressBar

class ClockFlow(FlowSpec):
    @card(type="blank", refresh_interval=1)
    @step
    def start(self):
        from datetime import datetime
        import time

        m = Markdown("# Clock is starting 🕒")
        p = ProgressBar(max=30, label="Seconds passed")
        current.card.append(m)
        current.card.append(p)
        current.card.refresh()
        for i in range(31):
            t = datetime.now().strftime("%H:%M:%S")
            m.update(f"# Time is {t}")
            p.update(i)
            current.card.refresh()
            print(t)
            time.sleep(1)
        m.update("# ⏰ ring ring!")
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    ClockFlow()
```
This simple example shows the main elements of any updating card:

 1. Start by adding desired components in a card with `append`.
 2. Periodically while a task executing, call the `update` method of each
    component you want to update with fresh content. Or, you can add new
    components with `append`.
 3. To schedule a card to be refreshed, call `refresh`.

The last point is important: Cards update only when you call `refresh` explicitly,
and always at the end when the task finishes.

:::info
Updating cards are not designed to stream data to the UI in milliseconds. Instead,
they allow you to refresh the card state every few seconds, but there is no
guarantee how long it will take before the refreshed card receives the latest data.
In particular, if you call `refresh` too often (e.g. inside a `for` loop), some
updates may get ignored. Design your applications to call `refresh` only every few
seconds or less frequently.
:::

To see this card live, start a local card viewer (or use Metaflow UI):
```
python clockflow.py card server --poll-interval 1
```

To highlight liveness of cards, this card updates every second,
as defined in `@card(refresh_interval=1)` which makes the card update
every second, and `--poll-interval 1` which makes the viewer to poll updates
every second. If you have a task that runs for hours, you don't need to set
these attributes as cards update every 3-5 seconds by default.

You can run the flow as usual:
```
python clockflow.py run
```
The card viewer should show you a progress bar and a timer that update in real time:

![](/assets/clockflow.gif)

:::tip
Use the Metaflow UI and the Local Card Viewer to see live updates frequently. The
`card view` CLI command and the `get_cards` API see only delayed snapshots of cards.
:::

Note that you can have many concurrent `ProgressBar`s in a single card. You can find
an example of this and many more in [the Dynamic Card
gallery](https://github.com/outerbounds/dynamic-card-examples/). 

## Populating a card on the fly

Besides being able to monitor how a long-running task is progressing, it is useful
to be able to see what is being produced by it. You can do this by adding more elements
in a card on the fly, like in this example that adds 10 photos in a card over 10 seconds:

```python
import time
from metaflow import FlowSpec, Parameter, step, card, current
from metaflow.cards import Image

class LiveResultsFlow(FlowSpec):

    @card(type='blank', refresh_interval=1)
    @step
    def start(self):
        import requests
        for i in range(10):
            img = requests.get("https://picsum.photos/400/100")
            current.card.append(Image(img.content))
            current.card.refresh()
            time.sleep(1)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    LiveResultsFlow()
```

When you run the flow, you should see a card that updates live:

![](/assets/liveresultsflow.gif)

:::note
Images, as well as all other content, are embedded in the card itself
so it is a good idea the keep their total size under 10MB or so.
:::

## Updating charts on the fly

Live charts are the bread and butter of observability. It is easy to create
one with cards: Just [add a
`VegaChart`](easy-custom-reports-with-card-components#charting-with-vegachart),
update its source data on the fly, and call `update` with the updated specification.
Here is an example:

```python
from metaflow import step, FlowSpec, current, card
from metaflow.cards import VegaChart
from datetime import datetime
import random
import time
import math

vega_spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {"values": []},
    "mark": "line",
    "encoding": {
        "x": {"field": "time", "type": "temporal"},
        "y": {"field": "value", "type": "quantitative"},
    },
}

class SimpleChartFlow(FlowSpec):
    @card(type="blank", refresh_interval=1)
    @step
    def start(self):
        data = vega_spec["data"]["values"]
        chart = VegaChart(vega_spec)
        current.card.append(chart)
        for i in range(30):
            val = math.sin(i * 0.1) + random.random() * 0.1 - 0.05
            data.append({"time": datetime.now().isoformat(), "value": val})
            chart.update(vega_spec)
            current.card.refresh()
            time.sleep(1)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    SimpleChartFlow()
```

:::note
Remember to provide the full dataset in every
chart update, like the `data` list above, not only the latest datapoints.
:::

When you run the flow, you should see an updating chart like this:

![](/assets/simplechart.gif)

Find many more examples of updating charts in [the Dynamic Card
gallery](https://github.com/outerbounds/dynamic-card-examples/). 
