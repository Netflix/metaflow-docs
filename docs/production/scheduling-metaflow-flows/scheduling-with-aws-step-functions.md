# Scheduling Metaflow Flows with AWS Step Functions

[AWS Step Functions](https://aws.amazon.com/step-functions/) is a general-purpose
workflow orchestrator - you can [read AWS Step Functions documentation to learn all
about it](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html). If you
just want to get your flow in production, this document contains everything you need to
know.

In Metaflow's point of view, the main benefits of AWS Step Functions are the following:

- AWS Step Functions orchestrates workflows expressed as state machines, which are a
  superset of directed graphs. This means that we can map Metaflow flows to
  corresponding AWS Step Functions state machines fully automatically. This gives you
  much more detail about what gets executed and how, in contrast to treating Metaflow
  scripts as black boxes.
- AWS Step Functions comes with tooling that is required for running workflows in
  production. You can benefit from battle-hardened solutions provided by AWS for
  alerting, monitoring, and scheduling. By using AWS Step Functions your Metaflow flows
  can integrate seamlessly with the wider AWS offerings.

When running on AWS Step Functions, Metaflow code works exactly as it does locally: No
changes are required in the code. All data artifacts produced by steps run on AWS Step
Functions are available using the [Client API](../../metaflow/client). All tasks are run
on AWS Batch respecting the `@resources` decorator, as if the `@batch` decorator was
added to all steps, as explained in [Executing Remote
Tasks](/scaling/remote-tasks/requesting-resources).

This document describes the basics of AWS Step Functions scheduling. If your project
involves multiple people, multiple workflows, or it is becoming business-critical, check
out the section around [coordinating larger Metaflow
projects](../coordinating-larger-metaflow-projects.md).

## Pushing a flow to production

Let's use [the flow from the section about
parameters](../../metaflow/basics#how-to-define-parameters-for-flows) as an example:

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

Save this script to a file `parameter_flow.py`. To deploy a version to AWS Step
Functions, simply run

```bash
python parameter_flow.py --with retry step-functions create
```

This command takes a snapshot of your code in the working directory, as well as the
version of Metaflow used and exports the whole package to AWS Step Functions for
scheduling.

It is highly recommended that you [enable
retries](../../scaling/failures#retrying-tasks-with-the-retry-decorator) when deploying
to AWS Step Functions, which you can do easily with --with retry as shown above.
However, make sure that all your steps are safe to retry before you do this. If some of
your steps interact with external services in ways that can't tolerate automatic
retries, decorate them with retry with times set to zero \(times=0\) as described in
[How to Prevent Retries](../../scaling/failures#how-to-prevent-retries).

The command will export your workflow to AWS Step Functions. You can also search for the
flow by name within the AWS Step Functions UI. You should see a visualization of the
exported flow, like here:

![](/assets/image2.png)

![](/assets/image5.png)

You can click the orange Start Execution button to execute the flow on AWS Step
Functions. It pops up a dialog asking for an input. You can specify your parameters as
an escaped JSON string with `Parameters` as the key - \*\*\*\*

```bash
{
    "Parameters" : "{\"alpha\": 0.5}"
}
```

Metaflow automatically maps Parameters of your flow to corresponding parameters on AWS
Step Functions.

After you click Start Execution on the Input dialog, AWS Step Functions starts running
the flow:

![](/assets/image6.png)

In this case, the run should succeed without problems. If there were errors, you could
reproduce them locally as explained in [Debugging with
Metaflow](../../metaflow/debugging#reproducing-production-issues-locally).

You can trigger the workflow through command line as well:

```bash
python parameter_flow.py step-functions trigger --alpha 0.5
```

If you run `step-functions create` again, it will create a new version of your flow on
AWS Step Functions. The newest version becomes the production version automatically
\(due to the consistency guarantees provided by AWS Step Functions, it might be a couple
of seconds before this happens\). If you want to test on AWS Step Functions without
interfering with a production flow, you can change the name of your class, e.g. from
ParameterFlow to ParameterFlowStaging, and `step-functions create` the flow under a new
name or use the
[@project](../coordinating-larger-metaflow-projects.md/#projects-on-aws-step-functions--argo-workflows)
decorator.

Note that `step-functions create` creates a new isolated [production
namespace](../../scaling/tagging#production-namespaces) for your production flow. Please
read [Organizing Results](../../scaling/tagging) to learn all about namespace behavior.

In case your flow doesn't accept any parameters, and you would like to execute it from
within the AWS Step Functions UI, you would need to pass in the following in the input
dialog box:

```bash
{
    "Parameters" : "{}"
}
```

### Limiting the number of concurrent tasks

By default, Metaflow configures AWS Step Functions to execute at most 100 tasks
concurrently within a foreach step. This should ensure that most workflows finish
quickly without overwhelming your AWS Batch queue, the execution backend.

If your workflow includes a large foreach and you need results faster, you can increase
the default with the `--max-workers` option. For instance, `step-functions create
--max-workers 500` allows 500 tasks to be executed concurrently for every foreach step.

This option is similar to [`run
--max-workers`](/scaling/remote-tasks/controlling-parallelism) that is used to
limit concurrency outside AWS Step Functions.

### Deploy-time parameters

You can customize AWS Step Functions deployments through Parameters that are evaluated
at the deployment time, i.e. when `step-functions create` is executed.

For instance, you can change the default value of a Parameter based on who deployed the
workflow or what Git branch the deployment was executed in. Crucially, the function in
Parameter is evaluated only once during `step-functions create` and not during the
execution of the flow.

You can run the flow locally as usual. The function inside Parameter is called only once
when the execution starts.

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

When `step-functions create` is called, `deployment_info` is evaluated which captures
your username and the time of deployment. This information remains constant on AWS Step
Functions, although the user may override the default value.

The `context` object is passed to any function defined in Parameter. It contains various
fields related to the flow being deployed. By relying on the values passed in context,
you can create generic deploy-time functions that can be reused by multiple flows.

## Scheduling a flow

By default, a flow on AWS Step Functions does not run automatically. You need to set up
a trigger to launch the flow when an event occurs.

On Step Functions, Metaflow provides built-in support for triggering Metaflow
flows through time-based \(cron\) triggers, which, as the name implies,
triggers the workflow at a certain time. As of today, [event-based triggering]
(/production/event-triggering) is not supported on Step Functions.

Time-based triggers are implemented at the FlowSpec-level using the `@schedule`
decorator. This flow is triggered hourly:

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
- `@schedule(cron='0 10 * * ? *')` runs the workflow at the given
  [Cron](http://en.wikipedia.org/wiki/cron) schedule, in this case at 10am UTC every
  day. You can use the rules defined
  [here](https://docs.aws.amazon.com/eventbridge/latest/userguide/scheduled-events.html)
  to define the schedule for the cron option.

## Reproducing failed production runs

Let's use [`DebugFlow` from the debugging
section](/metaflow/debugging#how-to-use-the-resume-command) as an example. The flow
contains a bug in the step `b`. When you run it, the failed run will look like this on
the AWS Step Functions UI:

![](/assets/image1.png)

![](</assets/image3_(1).png>)

Notice the execution ID of `5ca85f96-8508-409d-a5f5-b567db1040c5`. When running on AWS
Step Functions, Metaflow uses the AWS Step Functions execution ID (prefixed with `sfn-`)
as the run id.

The graph visualization shows that step `b` failed, as expected. First, you should
inspect the logs of the failed step to get an idea of why it failed. You can access AWS
Batch step logs in the AWS Step Functions UI by looking for the `JobId` in the `Error`
blob that can be accessed by clicking on the `Exception` pane on the right side of the
UI. You can use this `JobId` in the AWS Batch console to check the job logs. This
`JobId` is also the metaflow task ID for the step.

Next, we want to reproduce the above error locally. We do this by resuming the specific
AWS Step Functions run that failed:

```bash
python debug.py resume --origin-run-id sfn-5ca85f96-8508-409d-a5f5-b567db1040c5
```

This will reuse the results of the `start` and `a` step from the AWS Step Functions run.
It will try to rerun the step `b` locally, which fails with the same error as it does in
production.

You can fix the error locally as above. In the case of this simple flow, you can run the
whole flow locally to confirm that the fix works. After validating the results, you
would deploy a new version to production with `step-functions create`.

However, this might not be a feasible approach for complex production flow. For
instance, the flow might process large amounts of data that can not be handled in your
local instance. We have better approaches for staging flows for production:

### Staging flows for production

The easiest approach to test a demanding flow is to run it with AWS Batch. This works
even with resume:

```bash
python debug.py resume --origin-run-id sfn-5ca85f96-8508-409d-a5f5-b567db1040c5 --with batch
```

This will resume your flow and run every step on AWS Batch. When you are ready to test a
fixed flow end-to-end, just run it as follows:

```bash
python debug.py run --with batch
```

Alternatively, you can change the name of the flow temporarily, e.g. from DebugFlow to
DebugFlowStaging. Then you can run `step-functions create` with the new name, which will
create a separate staging flow on AWS Step Functions. You can also use the
[`@project`](/production/coordinating-larger-metaflow-projects.md#the-project-decorator)
decorator.

You can test the staging flow freely without interfering with the production flow. Once
the staging flow runs successfully, you can confidently deploy a new version to
production.
