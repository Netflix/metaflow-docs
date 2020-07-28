# Metaflow on AWS

Traditionally, there has been a tension between local \(e.g. on a laptop\) and remote \(e.g. on a cluster or a cloud\) development and execution: Developing on a laptop is fast, whereas iterating with a remote cluster is slower. A laptop is a severely resource-constrained environment whereas a cluster can have virtually unlimited resources. Worse, simple local scripts may need to be translated to a new paradigm that is understood by a cluster.

Metaflow tries to combine the best of both worlds. Most importantly, we support the same idiomatic Python scripts both locally and remotely. No changes in code or libraries needed. However, Metaflow doesn't try to abstract away the fact that code is executed remotely. We believe that this is crucial in making troubleshooting easier.

Metaflow makes it easy to move back and forth between the local and remote modes of execution. You can even use a hybrid of the two approaches in a single workflow. This means that you can develop and test your Metaflow code similarly to any local Python script - simply and easily. When you need to [process larger amounts of data](https://docs.metaflow.org/metaflow/scaling), or you want to deploy your workflow to production, you can do it with a single line of code or a single command.

When you set up a cloud-based object store as the datastore, Metaflow snapshots all data and code in the cloud automatically. This means that you can [inspect](https://docs.metaflow.org/metaflow/client), [resume](https://docs.metaflow.org/metaflow/debugging#how-to-use-the-resume-command), and restore any previous Metaflow execution without having to worry that the fruits of your hard work get lost.

## Amazon Web Services

While technically Metaflow could work with any cloud provider, currently Metaflow supports only [Amazon Web Services](https://aws.amazon.com) as the remote backend, thanks to Netflix's decade-long experience with AWS.

The following table summarizes the integration between Metaflow and AWS:

| Service | Local | AWS |
| :--- | :--- | :--- |
| **Datastore** | Local Directory | [Amazon S3](https://aws.amazon.com/s3/) |
| **Compute** | Local Process | [AWS Batch](https://aws.amazon.com/batch/) |
| **Metadata** | Local Directory | [AWS Fargate](https://aws.amazon.com/fargate/) + [Amazon RDS](https://aws.amazon.com/rds) |
| **Notebooks** | Local Notebook | [Amazon Sagemaker Notebooks](https://aws.amazon.com/sagemaker/) |
| **Scheduling** | - | [AWS Step Functions](https://aws.amazon.com/step-functions/) + [Amazon EventBridge](https://aws.amazon.com/eventbridge/) |
| **Large-scale ML** | - | [Sagemaker Models](https://aws.amazon.com/sagemaker/)\* |
| **Hosting** | - | \* |

\(\*\) [available later](https://docs.metaflow.org/introduction/roadmap)

* **Datastore** is the storage backend for all code and [data artifacts](https://docs.metaflow.org/metaflow/basics#linear).
* **Compute** is the [compute backend for Metaflow tasks](https://docs.metaflow.org/metaflow/scaling).
* **Metadata** refers to the backend that powers the [Metaflow Client API](https://docs.metaflow.org/metaflow/client).
* **Notebooks** allow you to to [inspect results of Metaflow runs]().
* **Scheduling** allows you to execute Metaflow workflows automatically without human intervention. This is typical for production workflows.
* **Large-scale ML** is useful for training large-scale models.
* **Hosting** allows you to deploy results of Metaflow runs as a microservice, so the results can be consumed by other application programmatically.

### Using Metaflow with AWS

When you `pip install metaflow`for the first time, you start in the local mode. Artifacts and metadata are stored in a local directory and computation is performed with local processes. This mode is perfectly fine for personal use but if your use case involves more people and/or data, we recommend that you configure Metaflow to use AWS.

Even after Metaflow has been configured to use AWS, users can still choose to use local tools, e.g. for rapid prototyping. The easy back-and-forth between local and remote is a key value proposition of Metaflow. However, we recommend that you enable **metadata** and **datastore** to use AWS by default, which makes sure that all data stays persistent and everyone in the organization can benefit from the results of workflows.

Netflix uses this setup internally. To make the experience smoother, Netflix's data scientists are provided with a \(shared\) EC2 instance where they can develop and test Metaflow code with minimal latency between their development environment and S3. Note that many IDEs such as [VSCode](https://code.visualstudio.com/) or [PyCharm](https://www.jetbrains.com/pycharm/) support execution on a remote instance natively.

## Next Steps

If your organization doesn't have an AWS account already, we provide a hosted sandbox environment where you can test Metaflow using your own code and data, to get a feel of the benefits of AWS. Read more in the section about [Metaflow Sandbox](https://docs.metaflow.org/metaflow-on-aws/metaflow-sandbox).

If your organization has an AWS account already, see our [deployment guide](deployment-guide/) for detailed instructions on how to configure your account for Metaflow.

{% page-ref page="deployment-guide/" %}

If you are already using Metaflow in your AWS account, and want to get started with how to manage various AWS resources, take a look at our [operations guide](operations-guide.md).

{% page-ref page="operations-guide.md" %}

