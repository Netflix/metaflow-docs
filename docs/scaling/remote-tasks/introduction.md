
# Computing at Scale

Metaflow makes it easy to run compute in the cloud. Instead of prescribing one paradigm for all
compute needs, Metaflow allows you to mix and match various patterns of scalable compute,
keeping simple things simple while making advanced use cases possible.

When your needs are modest, you can
run Metaflow as any Python code, such as a notebook or a local script. When you need more
compute power, say to train a model on GPUs or to handle a large dataframe, you can get the
job done by adding a line code. Or, you can execute even thousands of such tasks in parallel
or train a large model, such as an LLM, over many GPUs.

When your needs grow, you can even [mix and match various compute
environments](/scaling/remote-tasks/requesting-resources#mixing-cloud-environments) to
create advanced workflows that operate across local, on-premise data centers, and
various public clouds.

Below, we provide an overview of the patterns of compute that Metaflow supports with pointers
for more details. Importantly, you can mix and match these patterns freely, even in a single
flow.

:::note
To enable the cloud computing capabilities of Metaflow - `@batch` and `@kubernetes` - you need to
[deploy a Metaflow stack](/getting-started/infrastructure) first. To test these concepts
before deploying, [try the Metaflow Sandbox](https://outerbounds.com/sandbox/).
:::

```mdx-code-block
import ReactPlayer from 'react-player';
```

## Rapid development with local execution

When you run a flow without special decorators, e.g.
[run `LinearFlow` by typing `python linear.py run`](/metaflow/basics#linear),
the flow runs locally on your computer like any Python script or a notebook.

<ReactPlayer playing controls muted loop url='/assets/compute1.mp4' width='100%' height='100%'/>

This allows you to develop and test code rapidly without having to rely on any infrastructure
outside your workstation.

Running your code as a flow can provide an immediate performance benefit: If your flow has
[branches](/metaflow/basics#branch) or [foreaches](/metaflow/basics#foreach), 
Metaflow leverages multiple CPU cores to speed up compute by running parallel tasks as separate
processes. In addition to Metaflow parallelizing tasks, you can speed up compute by using
optimized Python libraries such as [PyTorch](https://pytorch.org/) to leverage GPUs or a library
like
[XGBoost](https://xgboost.readthedocs.io/en/stable/) that can utilize multiple CPU cores.

### Parallelizing Python over multiple CPU cores

If you need to execute a medium amount of compute - too much to handle in sequential Python
code but not enough to warrant parallel tasks using `foreach` - [Metaflow provides a helper function,
`parallel_map`](multicore) that parallelizes execution of a Python function over multiple CPU cores.
For instance, you can use `parallel_map` to process a list of 10M items in batches of 1M items 
in parallel.

## Requesting compute `@resources`

If your job requires more resources than what is available on your workstation, e.g. more
memory or more GPUs, Metaflow makes it easy to run the task remotely on a cloud instance:
[Simply annotate the step with the `@resources` decorator](requesting-resources).

<ReactPlayer playing controls muted loop url='/assets/compute2.mp4' width='100%' height='100%'/>

In this case, Metaflow executes the task remotely in the cloud using [one of the supported compute
backends](/getting-started/infrastructure), AWS Batch or Kubernetes.

This is often the easiest way
to scale up compute to handle larger datasets or models. It is like getting a bigger computer with
a line of code. While larger cloud instances cost more, they are only needed for as long as a
`@step` executes, so this approach can be cost-effective as well. This manner of scaling is called
[*vertical scaling*](https://en.wikipedia.org/wiki/Scalability#Vertical_or_scale_up).

### Requesting GPUs and other hardware accelerators

ML/AI workloads often require hardware acceleration such as GPUs. Learn more on [a dedicated
page about hardware-accelerated compute](gpu-compute).

## Executing steps in parallel

If you want to execute two or more `@step`s in parallel, [make them `branch`](/metaflow/basics#branch).

<ReactPlayer playing controls muted loop url='/assets/compute3.mp4' width='100%' height='100%'/>

When you run a flow with branches locally, each `@step` is run in a process of its own, taking
advantage of multiple CPU cores in your workstation to speed up processing. When you [execute the
flow (or some of its steps) remotely](requesting-resources), each `@step` is
run in a separate container, allowing you to run even thousands of steps in parallel.

Branches come in handy in two scenarios:

1. You have separate operations that can be executed independently.

2. You want to allocate separate `@resources` (or other decorators) for different sets of data, e.g.
   to build a small model with CPUs and a large one with GPUs. Just create branches, each with their
   own set of decorators.

## Running many tasks in parallel with `foreach`

A very common scenario in ML, AI, and data processing is to run the same operation, e.g. data
transformation or model training, for each shard of data or a set of parameters.

<ReactPlayer playing controls muted loop url='/assets/compute4.mp4' width='100%' height='100%'/>

Metaflow's [`foreach`](/metaflow/basics#foreach) is similar to
[Python's built-in `map` function](https://realpython.com/python-map-function/) which allows
you to apply a function - or in the case of Metaflow, a `@step` - to all elements in a list.

The difference to `branch` is that `foreach` applies **the same operation** to all elements,
utilizing [*data parallelism*](https://en.wikipedia.org/wiki/Data_parallelism), whereas `branch`
applies **a different operation** to each, utilizing
[*task parallelism*](https://en.wikipedia.org/wiki/Task_parallelism).

The superpower of Metaflow is that you can [run these tasks in parallel](requesting-resources),
processing even thousands of items concurrently in the cloud. Hence you can use foreaches to
process large datasets, train many models, or run hyperparameter searches in parallel, that is,
execute any [*embarrassingly parallel*](https://en.wikipedia.org/wiki/Embarrassingly_parallel)
operations that can benefit from
[*horizontal scaling*](https://en.wikipedia.org/wiki/Scalability#Horizontal_or_scale_out).

### Options for controlling parallelism

Note that regardless of the size of your list to `foreach` over, you can control the number
of tasks actually run in parallel with [the `--max-workers` flag](#). Also you will want to
[increase `--max-num-splits` when you list is long](#).

## Distributed computing with ephemeral compute clusters

The most advanced pattern of compute that Metaflow supports is distributed computing. In
this case, Metaflow sets up a cluster of instances on the fly which can communicate with
each other, e.g. to train a Large Language Model (LLM) over many GPU instances.

<ReactPlayer playing controls muted loop url='/assets/compute5.mp4' width='100%' height='100%'/>

While there are many other ways to set up such clusters, a major benefit of Metaflow is
that you can *embed an ephemeral cluster* as a part of a larger workflow, instead of having
to maintain the cluster separately. Learn more on [a dedicated page about distributed
computing](distributed-computing).
