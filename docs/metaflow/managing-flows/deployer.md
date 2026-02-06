
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
# wait for the run object to be available, timeout None means wait forever
run_obj = triggered_run.wait_for_run(timeout=None)
print('Run started', run_obj)
```

### Terminating a triggered run

You may terminate a triggered run at any time by calling
```python
triggered_run.terminate()
```


## Accessing Previously Deployed Flows

You can retrieve an existing `deployed_flow` object using the 
`from_deployment` method instead of creating a new deployment. This allows 
you to work with flows that were previously deployed without having to call 
create() again.

Once you have the deployed_flow object, you can use its trigger() method to 
create a `triggered_run` object and execute the flow. This approach is 
particularly useful when you need to reference and run existing deployments 
rather than creating fresh ones.

```py
from metaflow import Deployer

deployer = Deployer('helloflow.py')
deployed_flow = deployer.argo_workflows().create()

# save this for later use...
identifier = deployed_flow.name
```

```py
from metaflow import DeployedFlow

# use the identifier saved above..
deployed_flow = DeployedFlow.from_deployment(identifier=identifier)
triggered_run = deployed_flow.trigger()
```

:::note
The `from_deployment` method is only available for argo-workflows at the moment.
:::

## Listing deployed flows

You can list all deployed flows using the `list_deployed_flows` class method. This is useful for discovering existing deployments, performing cleanup operations, etc.

```py
from metaflow import DeployedFlow

# List all deployed flows
for df in DeployedFlow.list_deployed_flows():
    print(f"Found deployment: {df.name}")
```

You can also filter by flow name to find all deployments of a specific flow by passing in the `flow_name` parameter.

### Example: Cleaning up old deployments

A common use case is to clean up deployments that haven't been used recently. Here's an example that deletes templates that haven't run in the last 90 days:

```py
from datetime import datetime, timedelta
from metaflow import Flow, DeployedFlow, namespace

# Delete templates that haven't run in the last 90 days
cutoff_date = datetime.now() - timedelta(days=90)

for df in DeployedFlow.list_deployed_flows():
    try:
        namespace(None)
        argo_runs = Flow(df.flow_name).runs("runtime:argo-workflows")
        latest_run = next(argo_runs, None)

        if latest_run and latest_run.created_at >= cutoff_date:
            print(f"Keeping recent template: {df.name} (last run: {latest_run.created_at})")
        else:
            reason = "no Argo runs" if not latest_run else f"last run: {latest_run.created_at}"
            print(f"Deleting old template: {df.name} ({reason})")
            df.delete()

    except Exception as e:
        print(f"Error processing {df.name}: {e}")
```

:::note
The `list_deployed_flows` method is only available for argo-workflows at the moment.
:::

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

