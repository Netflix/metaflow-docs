# Composing Flows with Custom Decorators

:::info
This is a new feature in Metaflow 2.16. Make sure you have a recent enough version of
Metaflow to use this feature.
:::

It is common for projects to include functionality that can be reused across multiple
steps and flows. For example, you might define shared, project-specific patterns for

 - Accessing data,
 - Running ETL,
 - Tracking data and model lineage,
 - Performing feature engineering and transformations,
 - Training and evaluating a model,
 - Accessing an external service, e.g. an LLM endpoint through a model router.

You can handle cases like these by developing a shared library that encapsulates
the logic and importing it in your steps. Metaflow will [package the
library](/scaling/dependencies/project-structure) automatically for remote execution,
ensuring the logic works seamlessly from local development to production deployments.

This section introduces a powerful Metaflow feature: **custom decorators and mutators**.
While importing and using a shared library in a step is straightforward, encapsulating
common logic in a decorator offers several key advantages:

- **Clean [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)**:
  Keep shared logic out of step code, improving readability and maintainability.

- **Clarity and consistency**: Applying a decorator makes the use of common patterns
  explicit and uniform.

- **Flexibility**: Easily enable, disable, or switch between behaviors without
  touching step logic - great for implementing pluggable logic.

- **Correctness by default**: Use mutators to apply the right patterns to all relevant steps automatically,
  so e.g. a centralized platform team can establish paved paths for all.

- **Reusable and portable**: Distribute decorators as installable packages, whether private or public.
  Metaflow packages them for remote execution automatically, even if they live outside 
  [your project directory structure](/scaling/dependencies/project-structure).


:::note
Custom decorators and mutators let you develop, share, and reuse components across
flows - without modifying Metaflow’s core behavior. If you're looking to build a deeper infrastructure
integration, such as support for a new [production
orchestrator](/production/scheduling-metaflow-flows/introduction), you need to use
[the Metaflow Extension mechanism](https://github.com/Netflix/metaflow-extensions-template) instead.
For guidance, reach out on [Metaflow Slack](http://slack.outerbounds.co).
:::

## Overview

The following walkthrough illustrates the features. For technical details and examples, refer
to feature-specific pages below.

### Custom decorators

**Custom decorators** allow you to lift common logic to custom step- and flow-level decorators
which behave similarly to decorators provided by Metaflow. You can add logic to be executed before,
after, and instead of the user-defined step code. [Read more about custom decorators](#).

![](/assets/custom-decos-1.png)

### Mutators

**Mutators** allow you to add and remove decorators (including custom ones),
[`Config`s](/metaflow/configuring-flows/introduction) and
[`Parameter`s](metaflow/basics#how-to-define-parameters-for-flows)
in flows programmatically. [Read more about mutators](#).

![](/assets/custom-decos-2.png)

:::note
Currently you are not able to alter  the flow structure - add and remove steps - through a mutator,
but this feature is on the roadmap.
:::

### The `BaseFlow` pattern

**The `BaseFlow` pattern** allows you apply mutators, `Config`s, and `Parameter`s automatically
to all flows derived from the `BaseFlow`. This allows you to templatize flows according to your
project’s best practices, ensuring that all relevant decorators are applied automatically -
without requiring users to remember to add them manually. [Read more about the `BaseFlow` pattern](#).

![](/assets/custom-decos-3.png)