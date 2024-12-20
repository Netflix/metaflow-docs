
# Deploying Flows Programmatically

Besides running flows via an API, you can deploy flows to
[one of the production orchestrators supported by Metaflow](/production/scheduling-metaflow-flows/introduction)
programmatically. For instance, you can use this feature to create a deployment script running
as [a part of your CI/CD system](https://outerbounds.com/blog/continuous-delivery-of-ml-ai/),
e.g. on GitHub Actions, to deploy a flow to production automatically after a pull request
has been approved.

:::tip
For a practical example of `Deployer` in action, see
[the `sweep` example in Config-Driven
Experimentation](/metaflow/configuring-flows/config-driven-experimentation#sweep-orchestrating-and-observing-experiments-at-scale).
:::

## Deploying to production with the `Deployer` API

Deployments are handled through [the `Deployer` API](/api/deployer) which follows closely the
command line interface used to push flows to production orchestrators like
[Argo Workflows](/production/scheduling-metaflow-flows/scheduling-with-argo-workflows) and
[Step Functions](/production/scheduling-metaflow-flows/scheduling-with-aws-step-functions).

This diagram outlines the deployment process and the objects involved:

![](/assets/deployer-flow.png)

1. Instantiate a `Deployer` class pointing at the flow file you want to deploy:

```python
from metaflow import Deployer
deployer = Deployer('helloflow.py')
```

2. Choose an orchestrator - here Argo Workflows - and call `create()` to deploy the flow

```python
deployed_flow = deployer.argo_workflows().create()
```

The flow is now scheduled for execution! If you had annotated the flow
with [a `@schedule` decorator](/api/flow-decorators/schedule), it would
run automatically at the desired time.
Had you annotated it with [`@trigger`](/api/flow-decorators/trigger),
or [`@trigger_on_finish`](/api/flow-decorators/trigger_on_finish), it would
run automatically when the specified event arrives.

## Triggering a flow explicitly

You can trigger a deployed flow explicitly by calling `trigger()`
```python
triggered_run = deployed_flow.trigger()
```
You can specify any [`Parameters`](/metaflow/basics#how-to-define-parameters-for-flows)
in `trigger`, e.g.
```python
triggered_run = deployed_flow.trigger(alpha=5, algorithm='cubic')
```
Triggering returns a `TriggeredRun` object, representing a run that is
about to get scheduled by the orchestrator. Only when the `start`
step starts executing, a corresponding [`Run` object](/metaflow/client)
becomes accessible. This may take a while, for instance, if a new
cloud instance needs to start to execute the task:

```python
import time
while triggered_run.run is None:
    print(f'Waiting for the run to start')
    time.sleep(1)
print('Run started', triggered_run.run)
```

### Terminating a triggered run

You may terminate a triggered run at any time by calling
```python
triggered_run.terminate()
```

## Orchestrator-specific methods

Besides the common methods highlighted above, each orchestrator exposes
additional methods for managing deployments and triggered runs. For details,
see [the API documentation for `Deployer`](/api/deployer).


:::note
Currently, `Deployer` doesn't support deployments to Apache Airflow, as Airflow
doesn't expose an API for deployments. Instead, you should
[copy the resulting Airflow dag](/production/scheduling-metaflow-flows/scheduling-with-airflow#pushing-a-flow-to-production)
manually to your Airflow server.
:::

