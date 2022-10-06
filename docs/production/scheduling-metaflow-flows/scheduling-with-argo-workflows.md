# Scheduling Metaflow Flows with Argo Workflows

[Argo Workflows](https://argoproj.github.io/workflows) is a Kubernetes-native workflow orchestrator - you can [read Argo Workflows documentation to learn all about it](https://argoproj.github.io/argo-workflows/core-concepts/). If you just want to get your flow in production, this document contains everything you need to know.

In Metaflow's point of view, the main benefits of Argo Workflows are the following:

- Argo Workflows orchestrates workflows expressed as directed acyclic graphs. This means that we can map Metaflow flows to the corresponding Argo Workflows Workflow Template fully automatically. This gives you much more detail about what gets executed and how, in contrast to treating Metaflow scripts as black boxes.
- Argo Workflows comes with tooling that is required for running workflows in production. You can benefit from battle-hardened solutions provided by the Kubernetes community for alerting, monitoring, and scheduling. By using Argo Workflows your Metaflow flows can integrate seamlessly with the wider Kubernetes offerings.

When running on Argo Workflows, Metaflow code works exactly as it does locally: No changes are required in the code. All data artifacts produced by steps run on Argo Workflows are available using the [Client API](../../metaflow/client.md). All tasks are run on Kubernetes respecting the resources decorator, as if the `@kubernetes` decorator was added to all stpes, as explained in [Executing Tasks Remotely](/scaling/remote-tasks/introduction#safeguard-flags).

This document describes the basics of Argo Workflows scheduling. If your project involves multiple people, multiple workflows, or it is becoming business-critical, check out the section around [coordinating larger Metaflow projects](../coordinating-larger-metaflow-projects.md).

## Pushing a flow to production

Let's use [the flow from the section about parameters](../../metaflow/basics#how-to-define-parameters-for-flows) as an example:

```python
from metaflow import FlowSpec, Parameter, step

class ParameterFlow(FlowSpec):
    alpha = Parameter('alpha',
                      help='Learning rate',
                      default=0.01)

    @step
    def start(self):
        print('alpha is %f' % self.alpha)
        self.next(self.end)

    @step
    def end(self):
        print('alpha is still %f' % self.alpha)

if __name__ == '__main__':
    ParameterFlow()
```

Save this script to a file `parameter_flow.py`. To deploy a version to Argo Workflows, simply run

```bash
python parameter_flow.py --with retry argo-workflows create
```

This command takes a snapshot of your code in the working directory, as well as the version of Metaflow used and exports the whole package to Argo Workflows for scheduling.

It is highly recommended that you [enable retries](../../scaling/failures#retrying-tasks-with-the-retry-decorator) when deploying to Argo Workflows, which you can do easily with --with retry as shown above. However, make sure that all your steps are safe to retry before you do this. If some of your steps interact with external services in ways that can't tolerate automatic retries, decorate them with retry with times set to zero \(times=0\) as described in [How to Prevent Retries](../../scaling/failures#how-to-prevent-retries).

The command will export your workflow to  Argo Workflows as a _workflow template_. You can also search for the _workflow template_ by name within the Argo Workflows UI. 

![](/assets/argo-ui.png)

You can click on _Submit new workflow_ to submit your generated _Workflow Template_ for execution

![](/assets/argo-ui-0.png)

Metaflow automatically maps Parameters of your flow to corresponding parameters on Argo Workflows.

![](/assets/argo-ui-1.png)

After you click _Submit_, Argo Workflow starts running the flow:

![](/assets/argo-ui-2.png)

In this case, the run should succeed without problems. If there were errors, you could reproduce them locally as explained in [Debugging with Metaflow](../../metaflow/debugging#reproducing-production-issues-locally).

You can trigger the workflow through command line as well:

```bash
python parameter_flow.py argo-workflows trigger --alpha 0.5
```

If you run `argo-workflows create` again, it will create a new version of your flow on Argo Workflows. The newest version becomes the production version automatically. If you want to test on Argo Workflows without interfering with a production flow, you can change the name of your class, e.g. from ParameterFlow to ParameterFlowStaging, and `argo-workflows create` the flow under a new name or use the [@project](../coordinating-larger-metaflow-projects.md/#projects-on-aws-step-functions--argo-workflows) decorator.

Note that `argo-workflows create` creates a new isolated [production namespace](../../scaling/tagging#production-namespaces) for your production flow. Please read [Organizing Results](../../scaling/tagging) to learn all about namespace behavior.


### Limiting the number of concurrent tasks

By default, Metaflow configures Argo Workflows to execute at most 100 tasks concurrently within a foreach step. This should ensure that most workflows finish quickly without overwhelming your Kubernetes cluster, the execution backend.

If your workflow includes a large foreach and you need results faster, you can increase the default with the `--max-workers` option. For instance, `argo-workflows create --max-workers 500` allows 500 tasks to be executed concurrently for every foreach step.

This option is similar to [`run --max-workers`](/scaling/remote-tasks/introduction#safeguard-flags) that is used to limit concurrency outside Argo Workflows.

### Deploy-time parameters

You can customize Argo Workflows deployments through Parameters that are evaluated at the deploy time, i.e. when `argo-workflows create` is executed.

For instance, you can change the default value of a Parameter based on who deployed the workflow or what Git branch the deployment was executed in. Crucially, the function in Parameter is evaluated only once during `argo-workflows create` and not during the execution of the flow.

You can run the flow locally as usual. The function inside Parameter is called only once when the execution starts.

```python
from metaflow import FlowSpec, Parameter, step, JSONType
from datetime import datetime
import json

def deployment_info(context):
    return json.dumps({'who': context.user_name,
                       'when': datetime.now().isoformat()})

class DeploymentInfoFlow(FlowSpec):
    info = Parameter('deployment_info',
                     type=JSONType,
                     default=deployment_info)

    @step
    def start(self):
        print('This flow was deployed at %s by %s'\
              % (self.info['when'], self.info['who']))
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    DeploymentInfoFlow()
```

When `argo-workflows create` is called, `deployment_info` is evaluated which captures your user name and the time of deployment. This information remains constant on Argo Workflows, although the user may override the default value.

The `context` object is passed to any function defined in Parameter. It contains various fields related to the flow being deployed. By relying on the values passed in context, you can create generic deploy-time functions that can be reused by multiple flows.

## Scheduling a flow

By default, a flow on Argo Workflows does not run automatically. You need to set up a trigger to launch the flow when an event occurs.

Metaflow provides built-in support for triggering Metaflow flows through time-based \(cron\) triggers. Use a time-based trigger if you want to trigger the workflow at a certain time.

Time-based triggers are implemented at the FlowSpec-level using the `@schedule` decorator. This flow is triggered hourly:

```python
from metaflow import FlowSpec, schedule, step
from datetime import datetime

@schedule(hourly=True)
class HourlyFlow(FlowSpec):

    @step
    def start(self):
        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print('time is %s' % now)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    HourlyFlow()
```

You can define the schedule with `@schedule` in one of the following ways:

- `@schedule(weekly=True)` runs the workflow on Sundays at midnight.
- `@schedule(daily=True)` runs the workflow every day at midnight.
- `@schedule(hourly=True)` runs the workflow every hour.
- `@schedule(cron='0 10 * * ? *')` runs the workflow at the given [Cron](http://en.wikipedia.org/wiki/cron) schedule, in this case at 10am UTC every day.
