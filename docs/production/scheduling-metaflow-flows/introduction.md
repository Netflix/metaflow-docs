# Scheduling Metaflow Flows

While the `run` command is convenient during development, you can't keep executing it
manually in production. An old-school solution would be to use a time-based scheduler
like [Cron](https://en.wikipedia.org/wiki/Cron) to execute the command automatically at
a set schedule, but this approach has a number of serious downsides:

What if the server running cron fails? If the scheduled command fails, how do you know
it has failed? How do you see its error logs? Does the Cron server have enough capacity
to handle another command? And most importantly, how should you orchestrate schedules of
multiple commands so that their mutual dependencies are handled correctly?

Metaflow currently integrates with a number of production orchestrators which can answer
these questions:

- [Argo Workflows](https://argoproj.github.io/workflows) - a modern,
Kubernetes-native workflow orchestrator,
- [AWS Step Functions](https://aws.amazon.com/step-functions/) - a managed general-purpose orchestrator,
- [Apache Airflow](https://airflow.apache.org/) - a
widely-known orchestrator focused on data engineering,
- [Kubeflow](https://www.kubeflow.org/) - an open-source
ML/AI platform on Kubernetes.

### Which production orchestrator to use?

If you do not have existing orchestration infrastructure, **Argo Workflows** is a solid choice if you are ready to [deploy Metaflow on Kubernetes](/getting-started/infrastructure). **AWS Step Functions** is an easy-to-adopt alternative that runs natively on AWS, though with a more limited feature set.

The **Airflow** and **Kubeflow** integrations are useful if these orchestrators are
already deployed in your environment and you want to benefit from Metaflow’s developer experience without introducing a new orchestrator. While the feature set is more
limited, these integrations let you get started with Metaflow without requiring
migrations.

Learn more about how to deploy your Metaflow flows to these orchestrators in the
following subsections:

- [Scheduling with Argo
  Workflows](../scheduling-metaflow-flows/scheduling-with-argo-workflows)
- [Scheduling with AWS Step
  Functions](../scheduling-metaflow-flows/scheduling-with-aws-step-functions)
- [Scheduling with Airflow](../scheduling-metaflow-flows/scheduling-with-airflow)
- [Scheduling with Kubeflow](../scheduling-metaflow-flows/scheduling-with-kubeflow)

:::tip
Note that you can [manage production deployments programmatically](/metaflow/managing-flows/deployer)
through [the `Deployer` API](/api/deployer).
:::