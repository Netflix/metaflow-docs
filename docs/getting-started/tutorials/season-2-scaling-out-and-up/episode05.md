# Episode 5: Hello AWS

## Look Mom, We're in the Cloud.

This flow is a simple linear workflow that verifies your cloud configuration. The `start` and `end` steps will run locally, while the `hello` step will [run remotely](/scaling/remote-tasks/introduction). After [configuring Metaflow](/getting-started/infrastructure) to run in the cloud, data and metadata about your runs will be stored remotely. This means you can use the client to access information about any flow from anywhere.

You can find the tutorial code on [GitHub](https://github.com/Netflix/metaflow/tree/master/metaflow/tutorials/05-helloaws)

**Showcasing:**

- [AWS Batch](/scaling/remote-tasks/aws-batch) and the [`@batch`](/scaling/remote-tasks/introduction) decorator.
- Using the [Client API ](../../../metaflow/client)to access data artifacts generated remotely in a local notebook.
- [`@retry`](../../../scaling/failures#retrying-tasks-with-retry-decorator)decorator.

**Before playing this episode:**

1. `python -m pip install notebook`
2. This tutorial requires access to compute and storage resources in the cloud, which can be configured by
   1. Following the instructions [here](https://outerbounds.com/docs/engineering-welcome/) or
   2. Requesting [a sandbox](https://outerbounds.com/docs/sandbox/).
**To play this episode:**

1. `cd metaflow-tutorials`
2. `python 05-helloaws/helloaws.py run`
3. `jupyter-notebook 05-helloaws/helloaws.ipynb`
4. Open _**helloaws.ipynb**_ in your remote Sagemaker notebook

<TutorialsLink link="../../tutorials"/>
