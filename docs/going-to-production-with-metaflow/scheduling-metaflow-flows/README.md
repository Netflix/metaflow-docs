# Scheduling Metaflow Flows

A key feature of Metaflow is to make it easy to take machine learning pipelines from prototyping to production. This sentence and a number of other Metaflow documents use the word production casually. What do we actually mean by it?

For Machine Learning Infrastructure, production has a simple and unexciting meaning: In production, the flow should run without any human intervention. If your flow produced valid results during development, we want it to produce equally valid results in production - just without anyone managing it manually.

Eventually, something will fail in production, and human intervention is needed. In these cases, we want to minimize the amount of human intervention and the time spent on debugging.

If your flow is built with Metaflow best practices, making it run automatically in production should not be a big deal.

By this definition, you can not run your flow with

```bash
python helloworld.py run
```

in production as it requires someone to type the command manually. A classic solution is to have cron or another similar time-based scheduler to run the command automatically at a set schedule.

It is not easy to use cron as a production scheduler. What if the instance running cron fails? If the scheduled command fails, how do I know it has failed? How do you see its error logs? Does my cron instance have enough capacity to handle another command? And most importantly, how do I orchestrate schedules of multiple commands so that their mutual dependencies are handled correctly?

Metaflow currently integrates with [Argo Workflows](../scheduling-metaflow-flows/scheduling-with-argo-workflows.md) (a [Kubernetes-native workflow orchestrator](https://argoproj.github.io/workflows)) and [AWS Step Functions](../scheduling-metaflow-flows/scheduling-with-aws-step-functions.md) (a [managed general-purpose orchestrator](https://aws.amazon.com/step-functions/)), that can answer these questions.

Learn more about how to deploy your Metaflow flows to these orchestrators in the following subsections:

- [Scheduling with Argo Workflows](../scheduling-metaflow-flows/scheduling-with-argo-workflows.md)
- [Scheduling with AWS Step Functions](../scheduling-metaflow-flows/scheduling-with-aws-step-functions.md)
