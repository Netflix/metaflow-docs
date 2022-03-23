import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Scheduling Metaflow Flows

A key feature of Metaflow is to make it easy to take machine learning pipelines from prototyping to production. This sentence and a number of other Metaflow documents use the word production casually. What do we actually mean by it?

For Machine Learning Infrastructure, production has a simple and unexciting meaning: In production, the flow should run without any human intervention. If your flow produced valid results during development, we want it to produce equally valid results in production - just without anyone managing it manually.

Eventually, something will fail in production, and human intervention is needed. In these cases, we want to minimize the amount of human intervention and the time spent on debugging.

If your flow is built with Metaflow best practices, making it run automatically in production should not be a big deal.

By this definition, you can not run your flow with

```bash
Rscript helloworld.R run
```

in production as it requires someone to type the command manually. A classic solution is to have cron or another similar time-based scheduler to run the command automatically at a set schedule.

It is not easy to use cron as a production scheduler. What if the instance running cron fails? If the scheduled command fails, how do I know it has failed? How do you see its error logs? Does my cron instance have enough capacity to handle another command? And most importantly, how do I orchestrate schedules of multiple commands so that their mutual dependencies are handled correctly?

## Why AWS Step Functions?

[AWS Step Functions](https://aws.amazon.com/step-functions/) is a general-purpose workflow orchestrator that can answer these questions. If you are curious, you can [read AWS Step Functions documentation to learn all about it](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html). If you just want to get your flow in production, this document contains everything you need to know.

In the Metaflow's point of view, the main benefits of AWS Step Functions are the following:

- AWS Step Functions orchestrates workflows expressed as state machines, which are a superset of directed graphs. This means that we can map Metaflow flows to corresponding AWS Step Functions state machines fully automatically. This gives you much more detail about what gets executed and how, in contrast to treating Metaflow scripts as black boxes.
- AWS Step Functions comes with tooling that is required for running workflows in production. You can benefit from battle-hardened solutions provided by AWS for alerting, monitoring, and scheduling. By using AWS Step Functions your Metaflow flows can integrate seamlessly with the wider AWS offerings.

When running on AWS Step Functions, Metaflow code works exactly as it does locally: No changes are required in the code. All data artifacts produced by steps run on AWS Step Functions are available using the [Client API](../metaflow/client.md). All tasks are run on AWS Batch respecting the resources decorator, as explained in [Scaling Out and Up](../metaflow/scaling.md).

This document describes the basics of AWS Step Functions scheduling. If your project involves multiple people, multiple workflows, or it is becoming business-critical, we will soon introduce a new feature around coordinating larger Metaflow projects.

## Pushing a flow to production

Let's use [the flow from the section about parameters](../metaflow/basics.md#how-to-define-parameters-for-flows) as an example:

<Tabs>
<TabItem label="R" value="R">

```python
library(metaflow)

start <- function(self){
    print(paste("alpha is", self$alpha))
}

end <- function(self){
    print(paste("alpha still is", self$alpha))
}

metaflow("ParameterFlow") %>%
    parameter("alpha",
              help="learning rate",
              default = 0.1) %>%
    step(step="start",
         r_function=start,
         next_step="end") %>%
    step(step="end",
         r_function=end) %>%
    run()
```

</TabItem>
<TabItem label="RStudio" value="RStudio">

```python
...
   step(step="end",
         r_function=end) %>%
   run(step_functions = "create")
```

</TabItem>
</Tabs>

Save this script to a file `parameter_flow.R`. To deploy a version to AWS Step Functions, simply source the `RStudio` version of the code or in a terminal run

```bash
Rscript parameter_flow.R --with retry step-functions create
```

This command takes a snapshot of your code in the working directory, as well as the version of Metaflow used, and exports the whole package to AWS Step Functions for scheduling.

It is highly recommended that you [enable retries](../metaflow/failures.md#retrying-tasks-with-the-retry-decorator) when deploying to AWS Step Functions, which you can do easily with --with retry as shown above. However, make sure that all your steps are safe to retry before you do this. If some of your steps interact with external services in ways that can't tolerate automatic retries, decorate them with retry with times set to zero \(times=0\) as described in [How to Prevent Retries](../metaflow/failures.md#how-to-prevent-retries).

The command will export your workflow to AWS Step Functions. You can also search for the flow by name within the AWS Step Functions UI. You should see a visualization of the exported flow, like here:

![](/assets/image2.png)

![](/assets/image5.png)

You can click the orange Start Execution button to execute the flow on AWS Step Functions. It pops up a dialog asking for an input. You can specify your parameters as an escaped JSON string with Parameters as the key - _\*\*_

```bash
{
    "Parameters" : "{\"alpha\": 0.5}"
}
```

Metaflow automatically maps Parameters of your flow to corresponding parameters on AWS Step Functions.

After you click Start Execution on the Input dialog, AWS Step Functions starts running the flow:

![](/assets/image6.png)

In this case, the run should succeed without problems. If there were errors, you could reproduce them locally as explained in [Debugging with Metaflow](../metaflow/debugging.md).

**You can trigger the workflow through command line as well:**

<Tabs>
<TabItem label="Bash" value="Bash">

```bash
Rscript parameter_flow.R step-functions trigger --alpha 0.5
```

</TabItem>
<TabItem label="RStudio" value="RStudio">

```python
...
   step(step="end",
         r_function=end) %>%
   run(step-functions="trigger",
       alpha=0.5)
```

</TabItem>
</Tabs>

If you run `step-functions create` again, it will create a new version of your flow on AWS Step Functions. The newest version becomes the production version automatically \(due to the consistency guarantees provided by AWS Step Functions, it might be a couple of seconds before this happens\). If you want to test on AWS Step Functions without interfering with a production flow, you can change the name of your class, e.g. from ParameterFlow to ParameterFlowStaging, and `step-functions create` the flow under a new name.

Note that step-functions create creates a new isolated [production namespace](../metaflow/tagging.md#tags-as-namespaces) for your production flow. Please read [Organizing Results](../metaflow/tagging.md) to learn all about namespace behavior.

### Limiting the number of concurrent tasks

By default, Metaflow configures AWS Step Functions to execute at most 100 tasks concurrently within a foreach step. This should ensure that most workflows finish quickly without overwhelming your AWS Batch queue, the execution backend.

If your workflow includes a large foreach and you need results faster, you can increase the default with the `--max-workers` option. For instance, `step-functions create --max-workers 500` allows 500 tasks to be executed concurrently for every foreach step.

This option is similar to [`run --max-workers`](../metaflow/scaling.md#safeguard-flags) that is used to limit concurrency outside AWS Step Functions.

## Scheduling a flow

By default, a flow on AWS Step Functions does not run automatically. You need to set up a trigger to launch the flow when an event occurs.

Metaflow provides built-in support for triggering Metaflow flows through time-based \(cron\) triggers. Use a time-based trigger if you want to trigger the workflow at a certain time.

Time-based triggers are implemented at the FlowSpec-level using the `schedule` decorator. This flow is triggered hourly:

```python
library(metaflow)

start <- function(self){
    print(Sys.time())
}

end <- function(self){
    print("Scheduled successfully")
}

metaflow("ScheduledFlow",
    decorator("schedule", hourly=TRUE)) %>%
    step(step="start",
         r_function=start,
         next_step="end") %>%
    step(step="end",
         r_function=end) %>%
    run()
```

You can define the schedule with `decorator` in one of the following ways:

- `decorator("schedule", weekly=True)` runs the workflow on Sundays at midnight.
- `decorator("schedule", daily=True)` runs the workflow every day at midnight.
- `decorator("schedule", hourly=True)` runs the workflow every hour.
- `decorator("schedule", cron='0 10 * * ? *')` runs the workflow at the given [Cron](http://en.wikipedia.org/wiki/cron) schedule, in this case at 10am UTC every day. You can use the rules defined [here](https://docs.aws.amazon.com/eventbridge/latest/userguide/scheduled-events.html) to define the schedule for the cron option.
