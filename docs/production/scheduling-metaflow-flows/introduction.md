# Scheduling Metaflow Flows

While the `run` command is convenient during development, you can't keep executing it manually in production. An old-school solution would be to use a time-based scheduler like [Cron](https://en.wikipedia.org/wiki/Cron) to execute the command automatically at a set schedule, but this approach has a number of serious downsides:

What if the server running cron fails? If the scheduled command fails, how do you know it has failed? How do you see its error logs? Does the Cron server have enough capacity to handle another command? And most importantly, how should you orchestrate schedules of multiple commands so that their mutual dependencies are handled correctly?

Metaflow currently integrates with [Argo Workflows](../scheduling-metaflow-flows/scheduling-with-argo-workflows.md) ([a modern, Kubernetes-native workflow orchestrator](https://argoproj.github.io/workflows)), [AWS Step Functions](../scheduling-metaflow-flows/scheduling-with-aws-step-functions.md) ([a managed general-purpose orchestrator](https://aws.amazon.com/step-functions/)), and [Apache Airflow](../scheduling-metaflow-flows/scheduling-with-airflow.md) ([a widely-known open-source orchestrator](https://airflow.apache.org/)) which can answer these questions.

Learn more about how to deploy your Metaflow flows to these orchestrators in the following subsections:

- [Scheduling with Argo Workflows](../scheduling-metaflow-flows/scheduling-with-argo-workflows)
- [Scheduling with AWS Step Functions](../scheduling-metaflow-flows/scheduling-with-aws-step-functions)
- [Scheduling with Airflow](../scheduling-metaflow-flows/scheduling-with-airflow)
