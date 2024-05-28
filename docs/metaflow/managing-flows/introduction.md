
# Managing Flows in Notebooks and Scripts

:::info
This is a new feature in Metaflow 2.12. Make sure you have a recent enough version of
Metaflow to use this feature.
:::

Besides executing flows on the command line, Metaflow provides an API for starting
runs and other operations programmatically. This feature comes in handy when you want
to, for instance

 - Develop and [execute flows in a notebook](notebook-runs).

 - Create your own wrapper scripts to [launchs flows programmatically](runner).

 - Create a UI for executing and inspecting Metaflow runs locally with
   [the asynchronous runner API](runner#non-blocking-api).

 - Run tests and [deploy flows to production in CI/CD
   systems](https://outerbounds.com/blog/continuous-delivery-of-ml-ai/) like GitHub Actions.

In cases like this [the Runner API](/api/runner) allows you to run flows and perform other actions
locally, similar to running the flow manually on the command line. After you have [deployed
a flow in production](/production/introduction), you can use the command line or
[event-triggering](/production/event-triggering) to execute flows in the production environment.