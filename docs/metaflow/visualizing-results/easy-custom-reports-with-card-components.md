# Easy Custom Reports with Card Components

_Default Cards_ are useful during development when you need to quickly inspect artifacts produced by a task or visualize the overall structure of the flow. As your project progresses, you may want to create a custom card that highlights information specific to your project.

The easiest way to create a custom card is to use built-in components: _Images_, _Tables_, _Artifacts_, and _Markdown_ text. You can construct a report with these components in Python without having to worry about HTML or styling in CSS. Rest assured that if components ever show their limits, you have an option to customize reports even further using [_Card Templates_](advanced-shareable-cards-with-card-templates).

Let’s start with a simple example:

```python
from metaflow import FlowSpec, step, card, Parameter, current
from metaflow.cards import Markdown

class GuessCardFlow(FlowSpec):

    number = Parameter('number', default=3)

    @card(type='blank')
    @step
    def start(self):
        current.card.append(Markdown("# Guess my number"))
        if self.number > 5:
            current.card.append(Markdown("My number is **smaller** ⬇️"))
        elif self.number < 5:
            current.card.append(Markdown("My number is **larger** ⬆️"))
        else:
            current.card.append(Markdown("## Correct! 🎉"))
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    GuessCardFlow()
```

Notice how in the `@card` decorator we specify `type=’blank’.` Instead of the _Default Card_, we want an empty card with no content by default. The `blank` card provides a nice empty canvas for custom components.

The `current.card.append` call adds a component in the card. Each component occupies a row in the card, so you don’t have to worry about the layout. If you run `GuessCardFlow`, you will see a card like below. The exact content depends on the value of the number parameter.

![](/assets/card-docs-guess.png)

Currently, the following components are provided:

- **`Markdown`** - output a block of text formatted as [Markdown](https://www.markdownguide.org).
- **`Table` ** - a table of rows and columns. Each cell may include other components.
- **`Image` ** - an image, constructed from bytes.
- **`Artifact` ** - pretty-print any Python object.

The API reference documents [the card components in detail](/api/cards#card-components).

The following example demonstrates all the components in action:

```python
from metaflow import FlowSpec, step, current, card
from metaflow.cards import Markdown, Artifact, Image, Table
import requests

ROOT = 'https://upload.wikimedia.org/wikipedia/commons/'
IMAGES = {
    'Mammals': {
        'cat': 'b/b9/CyprusShorthair.jpg',
        'bandicoot': '8/8b/Perameles_gunni.jpg',
        'dog': '5/5d/Akbash_Dog_male_2016.jpg'
    },
    'Birds': {
        'penguin': 'b/bf/Spheniscus_humboldti_20070116.jpg'
    }
}

class ComponentDemoFlow(FlowSpec):

    @card(type='blank')
    @step
    def start(self):
        for section, animals in IMAGES.items():
            current.card.append(Markdown('## %s' % section))
            rows = []
            for label, url in animals.items():
                resp = requests.get(ROOT + url,
                                    headers={'user-agent': 'metaflow-example'})
                rows.append([Markdown('Animal: **%s**' % label),
                             Artifact(resp.headers),
                             Image(resp.content)])
            current.card.append(Table(rows))
        self.next(self.end)

    @step
    def end(self):
       pass

if __name__ == '__main__':
    ComponentDemoFlow()
```

The resulting card will look like this:

![](/assets/card-docs-components.png)

Notice how the `Artifact` component automatically truncates a large dictionary in the middle column, so you can use it to safely output even huge objects. It is also worth knowing that the `Image` component stores the image in the resulting HTML file itself, so you can view the card without an internet connection or even if the original image becomes unavailable.

## Showing Plots

A data scientist may care more about showing data visualizations rather than photos of cats. Technically there isn’t a huge difference: You can use any existing visualization library in Python to produce plots, save the resulting image in a file or an in-memory object, and provide the contents of the file (bytes) to the `Image` component.

For convenience, the `Image` component provides a utility method, `Image.from_matplotlib`, that extracts bytes from a [Matplotlib](https://matplotlib.org) figure automatically. Here’s an example that uses the [@conda decorator](/scaling/dependencies) to make sure that Matplotlib is available. If you have Matplotlib and Numpy already installed in your environment, you can run the example without `@conda_base`.

```python
from metaflow import FlowSpec, step, current, card, conda_base
from metaflow.cards import Image

@conda_base(python='3.8.1',
            libraries={'numpy':'1.20.3', 'matplotlib':'3.4.2'})
class PlotDemoFlow(FlowSpec):

    @card(type='blank')
    @step
    def start(self):
        import matplotlib.pyplot as plt
        import numpy
        fig = plt.figure()
        x = numpy.random.normal(0, 0.1, 100000)
        y = numpy.random.normal(0, 0.1, 100000)
        plt.scatter(x, y, s=0.1, color=(0.2, 0.2, 1.0, 0.2))
        current.card.append(Image.from_matplotlib(fig))
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    PlotDemoFlow()
```

The resulting card will look like this:

![](/assets/card-docs-plot.png)

Note that you can click the image in the card to see a larger version of it.

## Multiple Cards In a Step

You may want to produce multiple separate cards in a step. Maybe one card shows high-level business metrics that are suitable for wide distribution, while another shows technical details for debugging purposes.

When multiple cards are present, calling `current.card.append` is ambiguous: As such, it doesn’t know which of the many cards the component should be added to. Metaflow will show a warning if you try to do this, but it won’t crash the flow - nothing card-related should ever cause the flow to crash.

Use the id keyword argument in the `@card` decorator to uniquely identify each card. Then, you can refer to a specific card with the `current.card[card_id].append` notation. Here’s an example:

```python
from metaflow import FlowSpec, step, current, card
from metaflow.cards import Markdown

class ManyCardsFlow(FlowSpec):

    @card(type='blank', id='first')
    @card(type='blank', id='second')
    @step
    def start(self):
        current.card['first'].append(
            Markdown('# I am the first card'))
        current.card['second'].append(
            Markdown('# I am the second card'))
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    ManyCardsFlow()
```

When a task has multiple cards, the “`card view`” command will list all cards that are viewable for the task. You must specify which exact card you want to view:

- If you have specified an `id` for the card, use the `–id` option to view a card corresponding to the given `id`. For instance, “`card view –id first`” to see the card corresponding to `@card(id=’first’)`.
- Each card has a unique hash value which is shown by “`card view`” and “`card list`”. You can execute e.g. “`card view –hash 23b4e`” to see a card corresponding to the given hash.

## Comparing Data Across Runs

In many cases, you may want to produce a single card that characterizes the results of the whole flow. A natural way to do this is to assign a card to the `end` step that has access to all results produced by a run.

Besides accessing all results of a single run, you may want to access results across multiple runs and produce a card that compares the latest data to past results. Thanks to the fact that Metaflow persists and versions all results, this can be done easily: Just use [the Client API](../client) to access past results.

The following example demonstrates how you can create a card that accesses all data produced by a flow at the `end` step, as well as compares results across historical runs.

```python
from metaflow import FlowSpec, step, current, card, conda_base, Flow, Parameter
from metaflow.cards import Image, Table, Artifact
from itertools import islice

@conda_base(python='3.8.1',
            libraries={'numpy':'1.20.3', 'matplotlib':'3.4.2'})
class CompareRunsFlow(FlowSpec):

    alpha = Parameter('alpha', default=0.1)

    @step
    def start(self):
        import numpy as np
        self.x = np.linspace(-1, 2, 100)
        self.y = self.alpha * np.exp(self.x)
        self.next(self.end)

    @card(type='blank')
    @step
    def end(self):
        self.compare_runs()

    def compare_runs(self):
        import matplotlib.pyplot as plt
        rows = []
        fig = plt.figure()
        for run in islice(Flow('CompareRunsFlow'), 3):
            data = run['start'].task.data
            rows.append(list(map(Artifact, (run.id,
                                            run.created_at,
                                            data.alpha))))
            plt.plot(data.x, data.y, label=run.id)
        plt.legend()
        current.card.append(Table(rows,\
            headers=['Run ID', 'Created', 'Alpha']))
        current.card.append(Image.from_matplotlib(fig))

if __name__ == '__main__':
    CompareRunsFlow()
```

To see the comparison in action, run the flow at least three times with varying values of the `–alpha` parameter. Note the following features of the flow:

- The flow-level card is produced by a separate helper function, `compare_runs`. It is a good idea to separate code that produces a complex card in its own function or even in a separate module. The `current.card.append` call is available globally when a task is executing, so there is no need to restrict card creation in a `@step` function.
- The “`islice(Flow('CompareRunsFlow'), 3)`” expression is used to access the latest three runs of the flow, including the currently executing one. Thanks to the [namespacing](/scaling/tagging) functionality of Metaflow, the expression returns the latest three runs executed by you personally, i.e. in your usernamespace, when you run the flow locally. In contrast, if [deployed to a production environment](../../production/coordinating-larger-metaflow-projects), it returns the latest three production runs. This way, you can cleanly manage multiple versions of the project, some in development and some in production, and keep the results separate.
- You can use any off-the-shelf libraries, like Matplotlib here, to compare, visualize, and analyze results. You can develop your own helper libraries or [Card Templates](advanced-shareable-cards-with-card-templates) which standardize the analyses and reporting that are relevant for your projects.

The resulting card will look something like below. It shows the latest three runs of the flow, the parameter supplied for each run, and a visualization that allows you to compare the runs.

![](/assets/card-docs-compare.png)
