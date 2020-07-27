# Episode 5: Hello AWS

## Look Mom, We're in the Cloud.

This flow is a simple linear workflow that verifies your AWS configuration. The `start` and `end` steps will run locally, while the `hello` step will run remotely on AWS batch. After [configuring Metaflow](../../../metaflow-on-aws/metaflow-on-aws.md) to run on AWS, data and metadata about your runs will be stored remotely. This means you can use the client to access information about any flow from anywhere.

You can find the tutorial code on [GitHub](https://github.com/Netflix/metaflow/tree/master/metaflow/tutorials/05-helloaws)

**Showcasing:**

* [AWS Batch](../../../metaflow-on-aws/metaflow-on-aws.md) and the [`@batch`](../../../metaflow/scaling.md#using-aws-batch-selectively-with-batch-decorator) decorator.
* Using the [Client API ](../../../metaflow/client.md)to access data artifacts generated remotely in a local notebook.
* [`@retry`](../../../metaflow/failures.md#retrying-tasks-with-retry-decorator)decorator.

**Before playing this episode:**

1. `python -m pip install notebook`
2. This tutorial requires access to compute and storage resources on AWS, which can be configured by 
   1. Following the instructions at [https://docs.metaflow.org/metaflow-on-aws/deploy-to-aws](https://docs.metaflow.org/metaflow-on-aws/deploy-to-aws) or 
   2. Requesting a sandbox at [https://docs.metaflow.org/metaflow-on-aws/metaflow-sandbox](https://docs.metaflow.org/metaflow-on-aws/metaflow-sandbox)

**To play this episode:**

1. `cd metaflow-tutorials`
2. `python 05-helloaws/helloaws.py run`
3. `jupyter-notebook 05-helloaws/helloaws.ipynb`
4. Open _**helloaws.ipynb**_ in your remote Sagemaker notebook

{% page-ref page="../" %}

