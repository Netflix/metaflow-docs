# Tutorials

This set of tutorials provides a hands-on introduction to Metaflow R. The basic concepts are introduced in practice, and you can find out more details about the functionality showcased in these tutorials in [Basics of Metaflow](../../metaflow/basics.md) and the following sections.

## Pull tutorials

Metaflow R comes packaged with the tutorials, so getting started is easy. You can pull a copy of the tutorials to your current directory by running the following command in R:

```r
metaflow::pull_tutorials()
```

This creates a directory _**tutorials**_ in your current working directory with a subdirectory for each tutorial.

Each tutorial has a brief description and instructions that you can view using the links below.

## [Season 1: The Local Experience.](season-1-the-local-experience/)

* [**Episode 0: Metaflow says Hi!**](season-1-the-local-experience/episode00.md)
* [**Episode 1: Let's build you a movie playlist.**](season-1-the-local-experience/episode01.md)
* [**Episode 2: Is this Data Science?**](season-1-the-local-experience/episode02.md)
* [**Episode 3: Follow the Money.**](season-1-the-local-experience/episode03.md)

## [Season 2: Scaling Out and Up](season-2-scaling-out-and-up/).

* [**Episode 4: Look Mom, We're in the Cloud.**](season-2-scaling-out-and-up/episode05.md)
* [**Episode 5: Computing in the Cloud.**](season-2-scaling-out-and-up/episode06.md)
* [**Episode 6: Way up here.**](season-2-scaling-out-and-up/episode07.md)

## What's next?

* Explore fault tolerant flows with [`catch`](../../metaflow/failures.md#catching-exceptions-with-the-catch-decorator), [`retry`](../../metaflow/failures.md#retrying-tasks-with-the-retry-decorator)decorators.
* Debug failed runs with [resume](../../metaflow/debugging.md#how-to-use-the-resume-command).
* Explore results across experiments with the [Client API](../../metaflow/client.md).
* See how to organize results and collaborate with [namespaces](../../metaflow/tagging.md#namespaces) and [tags](../../metaflow/tagging.md#tagging).

