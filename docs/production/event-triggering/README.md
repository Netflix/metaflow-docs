
# Connecting Flows via Events

Real-world production systems are not islands. They are often tightly connected
to their surrounding environment, reacting to changes in real time. Using
the *event triggering* pattern described in this section, you can make Metaflow
flows start automatically based on external events. Or, you can connect
multiple flows together, via events, to build arbitrarily complex systems by
using workflows as building blocks.

Event triggering is an alternative to time-based scheduling using
[the `@schedule` decorator](/production/scheduling-metaflow-flows/scheduling-with-argo-workflows#scheduling-a-flow).
Instead of flows starting at a specific date and time, they are triggered when
a particular *event* is sent to a production orchestrator. This diagram
illustrates the concept:

![](/assets/events-overview.png)

1. External systems like data warehouses, ETL pipelines, or microservices can create special *events*
which trigger executions of flows deployed [on a production orchestrator](/production/scheduling-metaflow-flows/introduction).

2. Deployed flows can also trigger other flows automatically. In this case, `SecondFlow` is configured
to start automatically when `FirstFlow` finishes.

Events define a clear interface between workflows, which can be developed and
operated independently, allowing multiple people to collaborate without
friction when building and operating a larger system. For more context about
event triggering,
[see the announcement blog post](https://outerbounds.com/blog/metaflow-event-triggering/).

Get started with event triggering by reading the next three sections. The fourth
section is relevant for more advanced use cases that leverage [the `@project`
decorator](/production/coordinating-larger-metaflow-projects) to deploy
multiple concurrent variants of event-triggered flows. 

 1. [Triggering flows based on external events](/production/event-triggering/external-events)
 2. [Triggering flows based on other flows](/production/event-triggering/flow-events)
 3. [Inspecting events](/production/event-triggering/inspect-events)
 4. [Deploying variants of event-triggered flows](/production/event-triggering/project-events)

:::info

As of today, event triggering is only supported on
[Argo Workflows](/production/scheduling-metaflow-flows/scheduling-with-argo-workflows).
Let us know on [Metaflow community Slack](http://slack.outerbounds.co) if you would
like to see other production orchestrators supported as well.

:::
