
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

 - [Deploy flows programmatically](deployer) in a CI/CD system like
   GitHub Actions.

 - Create a UI for executing and inspecting Metaflow runs locally with
   [the asynchronous runner API](runner#non-blocking-api).

In cases like this [the Runner API](/api/runner) allows you to run flows and perform other actions
locally, similar to running the flow manually on the command line. Once you are happy with the
results, you can deploy the flow to production with [the Deployer API](/api/deployer).