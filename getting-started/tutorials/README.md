# Tutorials

This set of tutorials provides a hands-on introduction to Metaflow. The basic concepts are introduced in practice, and you can find out more details about the functionality showcased in these tutorials in [Basics of Metaflow](../../metaflow/basics.md) and the following sections.

## Setting up.

Metaflow comes packaged with the tutorials, so getting started is easy. You can make copies of all the tutorials in your current directory using the metaflow command line interface:

```text
metaflow tutorials pull
```

This creates a directory _**metaflow-tutorials**_ in your current working directory with a subdirectory for each tutorial.

Each tutorial has a brief description and instructions that you can view using the links below. Alternatively, you can use the command line interface to list available tutorials or get info about a specific one:

```text
metaflow tutorials list
metaflow tutorials info 00-helloworld
```

## [Season 1: The Local Experience.](season-1-the-local-experience/)

* \*\*\*\*[**Episode 0: Metaflow says Hi!**](season-1-the-local-experience/episode00.md)\*\*\*\*
* \*\*\*\*[**Episode 1: Let's build you a movie playlist.**](season-1-the-local-experience/episode01.md)
* \*\*\*\*[**Episode 2: Is this Data Science?**](season-1-the-local-experience/episode02.md)
* \*\*\*\*[**Episode 3: Follow the Money.**](season-1-the-local-experience/episode03.md)
* \*\*\*\*[**Episode 4: The Final Showdown.**](season-1-the-local-experience/episode04.md)

## [Season 2: Scaling Out and Up](season-2-scaling-out-and-up/).

* \*\*\*\*[**Episode 5: Look Mom, We're in the Cloud.**](season-2-scaling-out-and-up/episode05.md)
* \*\*\*\*[**Episode 6: Computing in the Cloud.**](season-2-scaling-out-and-up/episode06.md)\*\*\*\*
* \*\*\*\*[**Episode 7: Way up here.**](season-2-scaling-out-and-up/episode07.md)\*\*\*\*

## What's next?

* Explore fault tolerant flows with [`@catch`](../../metaflow/failures.md#catching-exceptions-with-catch-decorator), [`@retry`](../../metaflow/failures.md#retrying-tasks-with-retry-decorator), [`@timeout`](../../metaflow/failures.md#timing-out-with-timeout-decorator) decorators.
* Try a library like [Tensorflow](https://www.tensorflow.org/) with [`@conda`](../../metaflow/dependencies.md) and [`@batch`](../../metaflow/scaling.md#using-aws-batch-selectively-with-batch-decorator)
* Debug failed runs with [resume](../../metaflow/debugging.md#how-to-use-the-resume-command).
* Access large data fast with [metaflow.S3](../../metaflow/data.md#data-in-s-3-metaflow-s3).
* Explore results across experiments with the [Client API](../../metaflow/client.md).
* See how to organize results and collaborate with [namespaces](../../metaflow/tagging.md#namespaces) and [tags](../../metaflow/tagging.md#tagging).

