# Metaflow on AWS \(OLD\)

Traditionally, there has been a tension between local \(e.g. on a laptop\) and remote \(e.g. on a cluster or a cloud\) development and execution: Developing on a laptop is fast, whereas iterating with a remote cluster is slower. A laptop is a severely resource constrained environment whereas a cluster can have virtually unlimited resources. Worse, simple local scripts may need to be translated to a new paradigm that is understood by a cluster.

Metaflow tries to combine the best of the both worlds. Most importantly, we support the same idiomatic Python scripts both locally and remotely. No changes in code or libraries needed. However, Metaflow doesn't try to abstract away the fact that code is executed remotely. We believe that this is crucial in making troubleshooting easier.

Metaflow makes it easy to move back and forth between the local and remote modes of execution. You can even use a hybrid of the two approaches in a single workflow. This means that you can develop and test your Metaflow code similarly to any local Python script - simply and easily. When you need to [process larger amounts of data](), or you want to deploy your workflow to production, you can do it with a single line of code or a single command.

When you set up a cloud-based object store as the datastore, Metaflow snapshots all data and code in the cloud automatically. This means that you can [inspect](), [resume](), and restore any previous Metaflow execution without having to worry that the fruits of your hard work get lost.

## Amazon Web Services

While technically Metaflow could work with any cloud provider, currently Metaflow supports only [Amazon Web Services](https://aws.amazon.com) as the remote backend, thanks to Netflix's decade-long experience with AWS.

The following table summarizes the integration between Metaflow and AWS:

| Service | Local | AWS |
| :--- | :--- | :--- |
| **Metadata** | Local Directory | [Metaflow Metadata Service](https://github.com/Netflix/metaflow-service) / [RDS](https://aws.amazon.com/rds/) |
| **Datastore** | Local Directory | [S3](https://aws.amazon.com/s3/) |
| **Compute** | Local Process | [Batch](https://aws.amazon.com/batch/) |
| **Notebooks** | Local Notebook | [Sagemaker Notebook](https://aws.amazon.com/sagemaker/) |
| **Scheduling** | - | [Step Functions](https://aws.amazon.com/step-functions/)\* |
| **Large-scale ML** | - | [Sagemaker Models](https://aws.amazon.com/sagemaker/)\* |
| **Hosting** | - | \* |

\(\*\) [available later]()

* **Metadata** refers to the backend that powers the [Metaflow Client API]().
* **Datastore** is the storage backend for all code and [data artifacts]().
* **Compute** is the [compute backend for Metaflow tasks]().
* **Notebooks** allow you to to [inspect results of Metaflow runs]().
* **Scheduling** allows you to execute Metaflow workflows automatically without human intervention. This is typical for production workflows.
* **Large-scale ML** is useful for training large-scale models.
* **Hosting** allows you to deploy results of Metaflow runs as a microservice, so the results can be consumed by other application programmatically.

## Using Metaflow with AWS

When you `pip install metaflow`for the first time, you start in the local mode. Artifacts and metadata are stored in a local directory and computation is performed with local processes. This mode is perfectly fine for personal use but if your use case involves more people and/or data, we recommend that you configure Metaflow to use AWS.

Even after Metaflow has been configured to use AWS, users can still choose to use local tools, e.g. for rapid prototyping. The easy back-and-forth between local and remote is a key value proposition of Metaflow. However, we recommend that you enable **metadata** and **datastore** to use AWS by default \(configure`METAFLOW_DEFAULT_METADATA=service` and `METAFLOW_DEFAULT_DATASTORE=s3`\), which makes sure that all data stays persistent and everyone in the organization can benefit from the results of workflows.

Netflix uses this setup internally. To make the experience smoother, Netflix's data scientists are provided with a \(shared\) EC2 instance where they can develop and test Metaflow code with minimal latency between their development environment and S3. Note that many IDEs such as [VSCode](https://code.visualstudio.com/) or [PyCharm](https://www.jetbrains.com/pycharm/) support execution on a remote instance natively.

## Next Steps

If your organization doesn't have an AWS account already, we provide a hosted sandbox environment where you can test Metaflow using your own code and data, to get a feel of the benefits of AWS. Read more in the section about [Metaflow Sandbox]().

If you organization has an AWS account already, see [Deploying to AWS](deploy-to-aws.md) for detailed instructions on how to configure your account for Metaflow.

