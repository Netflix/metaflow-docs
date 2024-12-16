
# Configuring Flows

:::info
This is a new feature in Metaflow 2.13. Make sure you have a recent enough version of
Metaflow to use this feature.
:::

At this point, you have learned how you can [pass data through a flow with
artifacts](/metaflow/basics#artifacts) and how you can [parametrize a run
with `Parameters`](/metaflow/basics#how-to-define-parameters-for-flows). These are
the main constructs that allow you to control the behavior of
[a run](/metaflow/client#object-hierarchy) while it executes.

What if you want to configure the behavior of the flow itself before it
has started executing? For instance, you may want to

 - Configure its [`@resource` requirements](/scaling/remote-tasks/requesting-resources)
   separately for development and production.

 - Adjust [the `@schedule`](/production/scheduling-metaflow-flows/introduction) or
   [event-`@trigger`'ing behavior](/production/event-triggering) through a deployment config.

 - Provide [a configurable template flow](/metaflow/configuring-flows/config-driven-experimentation)
   that can perform different actions without altering the code - just change a config file.

### Introducing `Config`

For *flow-level* use cases like this which require altering the behavior of the flow at the high level,
its decorators in particular,
Metaflow supports an object called `Config`. It complements artifacts and `Parameters` by allowing
you to configure nearly everything about a flow before it starts executing:

![](/assets/config-scope.png)

Use these questions during development to determine which construct to choose:

 1. Do you want to alter the behavior of [a production deployment](/production/introduction)
    through a config file, disabling run-level changes ⟶ use `Config`.

 2. Do you need to configure the behavior of Metaflow decorators ⟶ use `Config`.

 3. Do you need to pass information to a run on the CLI, on an orchestrator UI,
    or [through an event
    payload](/production/event-triggering/external-events#passing-parameters-in-events)
    ⟶ use `Parameter`.

 4. For all other cases, use artifacts.

Many advanced flows end up using all the three constructs - they are fully composable. Also,
every `Config` and `Parameter` becomes a read-only artifact, allowing you
to access both [the results and configuration of a run](/metaflow/client#accessing-data) consistently.
This ensures full visibility into how a run was configured and what occurred during its execution.

As with most features in Metaflow, `Config`s are simple and seamlessly handle basic cases. They also
enable a surprising range of advanced use cases, as demonstrated in the following sections. Next,
learn more about

- [Common configuration patterns](basic-configuration).

- [Supports various formats of configuration files](parsing-configs).

- [Parsing and generating configs on the fly](custom-parsers).

- [Advanced, config-driven experimentation](config-driven-experimentation).

