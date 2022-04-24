# Advanced, Shareable Cards with Card Templates

The built-in [_Card Components_](easy-custom-reports-with-card-components) allow you to create a visual report with a few lines of Python code. This is by far the easiest way to output visualizations using Metaflow’s default visual style and layout.

This section describes a more advanced concept of _Card Templates_ which are more flexible than [_Default Cards_](effortless-task-inspection-with-default-cards) and Card Components but they require more upfront effort to create. However, using an existing Card Template is very easy, as shown below. They are a good match for use cases such as

- Using off-the-shelf Javascript libraries to create advanced visualizations.
- Creating fully customized reports with any visual style and layout.
- Creating a project-specific card template.
- Sharing generally useful card templates publicly.

For instance, if your project involves extracting features from video, you can create a card template that shows metadata, frames from the video, and a sample of features in a predefined format. Everyone working on the project can use the same card template to make it easy to catalogue and compare various approaches.

## Using a Card Template

A _Card Template_ is a normal Python package, hosted in a Git repository of its own, optionally published to a private or public package repository. By convention, public Card Templates have a `metaflow-card` prefix, so you can easily [find public card templates on PyPi](https://pypi.org/search/?q=metaflow-card-&o=).

Let’s test a public template, [metaflow-card-html](https://github.com/outerbounds/metaflow-card-html), which simply converts HTML stored in an artifact to a card. First, install the template using `pip`:

`pip install metaflow-card-html`

Now we can use the card in any flow by adding a decorator, `@card(type=’html’)`. The type attribute refers to the template name. Let’s test it:

```python
from metaflow import FlowSpec, step, card

class HtmlCardFlow(FlowSpec):

    @card(type='html')
    @step
    def start(self):
        self.html = """
        <html>
          <body style='color: blue'>
            Hello World!
          </body>
        </html>
        """
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    HtmlCardFlow
```

Note that this a just a simple example what a custom template can do. Other custom templates don't require writing HTML by hand. Save the flow in `htmlcardflow.py`. Then, you can run it

`python htmlcardflow.py run`

and view the card

`python htmlcardflow.py card view start`

You should see a blank page with a blue “Hello World!” text.

![](</assets/card-docs-html_(2).png>)

A particularly useful feature of card templates is that they work in any compute environment, such as [AWS Batch](../scaling-out-and-up/effortless-scaling-with-aws-batch.md) or [Kubernetes](../scaling-out-and-up/effortless-scaling-with-kubernetes.md). For instance, if you have AWS Batch set up, you can run the flow as follows:

`python htmlcardflow.py run –with batch`

The card will get produced without you having to worry about installing anything on the remote instances! You can [deploy flows to production](../../going-to-production-with-metaflow/scheduling-metaflow-flows/) with custom templates too:

`python htmlcardflow.py step-functions create`

Now, every time a production run executes, cards will get produced exactly as during prototyping. Behind the scenes, Metaflow takes care of packaging any card templates whenever you execute code remotely.

## Developing a Card Template

If you want to develop a card template of your own, it is useful to have a mental model of how cards work under the hood:

![](</assets/card-docs-template_(1).png>)

The blue box is a Metaflow task executing a step from the user’s flow. It is decorated with a `@card` decorator that has a `type` attribute referring to your custom template, e.g. `mycard`. The task executes before the card template. After the task has finished, a new subprocess is started that executes a card template. This ensures that even if the template fails for any reason, it won’t crash the task.

The card template is given the Task ID of the task that the card corresponds to. Using this Task ID, the template can use [the Client API](../client) to query any information about the task, its parent run, and any past runs. Using this information, the template needs to output a single stand-alone HTML file - the actual card. Note that the HTML file can’t depend on any other local files. In particular, you must include any images as [Data URIs](https://css-tricks.com/data-uris/) in the file itself.

The template itself is a Python class, derived from _MetaflowCard_, which needs to implement one method, _render_, which is given [a Task object from the Client API](../client). This is the complete implementation of the `@card(type='html')` which we used above:

```python
from metaflow.cards import MetaflowCard

class HTMLCard(MetaflowCard):

    type = 'html'

    def __init__(self, options={"artifact":"html"}, **kwargs):
        self._attr_nm = options.get("artifact", "html")

    def render(self, task):
        if self._attr_nm in task:
            return str(task[self._attr_nm].data)

CARDS = [HTMLCard]
```

The example above used the default `self.html` artifact to pass HTML code to the template. You can choose another artifact by specifying an artifact name in the _options_ dictionary that is passed to the template: `@card(type='html', options={'artifact': 'other_html')`.

The _render_ method needs to return a self-contained HTML as a string. This template has it easy, since all it has to do is to return the user-defined artifact. Other templates can do much more complex processing to produce a suitable HTML page.

To implement and publish a template of your own, take a look at the [metaflow-card-html](https://github.com/outerbounds/metaflow-card-html/) repository which shows how to structure the package, as well as step-by-step instructions on how to create one of your own. If you create a Card Template that other people might benefit from, let our [Slack community](http://slack.outerbounds.co) know about it!

#### Managing Dependencies in Card Templates.

Card templates may rely on 3rd party libraries for their functionality, say, to produce advanced visualizations. To make sure the card can be rendered in remote environments that might not have all dependencies already installed, Metaflow takes care of packaging any files included directly in the template itself. However, it can’t handle 3rd party dependencies automatically. Hence, to make sure your template works without friction, you need to pay attention to its dependencies.

Here are recommended strategies for handling 3rd party library dependencies in card templates:

1. You can rely on Javascript libraries to move functionality to the frontend side. For instance, instead of producing visualizations in Python, you can produce them in Javascript. Take a look at [metaflow-card-uplot-timeseries](https://github.com/outerbounds/metaflow-card-uplot-timeseries) template to see how to use a Javascript library in your template.
2. You can include small Python libraries in the template package itself, aka _vendor_ them.

If these approaches don’t work, you can instruct users to include the dependencies of the template in their [@conda libraries](../dependencies). For templates shared privately, you may also rely on dependencies included in a Docker image shared by all users and `@batch` executions.
