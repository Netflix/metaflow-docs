
# Executing Tasks Remotely

There are two ways to handle larger amounts of data and compute:

1. _Scale up_ by running your code on a larger machine with more memory, CPU cores, and
   GPUs, or
2. _Scale out_ by using more machines in parallel.

As described below, Metaflow supports the former through the `@resources` decorator and
the latter through [foreach](/metaflow/basics#foreach) when flows are run on Kubernetes
or AWS Batch.

Everything described on this page applies to all compute platforms supported by
Metaflow. The data scientist can write their flows using foreaches and the `@resource`
decorator knowing that the code will execute on any supported platforms. For additional
tips and tricks related to specific systems, see [Using AWS Batch](aws-batch) and [Using
Kubernetes](kubernetes).

## Requesting resources with `resources` decorator

Consider the following example:

```python
from metaflow import FlowSpec, step, resources

class BigSum(FlowSpec):

    @resources(memory=60000, cpu=1)
    @step
    def start(self):
        import numpy
        import time
        big_matrix = numpy.random.ranf((80000, 80000))
        t = time.time()
        self.sum = numpy.sum(big_matrix)
        self.took = time.time() - t
        self.next(self.end)

    @step
    def end(self):
        print("The sum is %f." % self.sum)
        print("Computing it took %dms." % (self.took * 1000))

if __name__ == '__main__':
    BigSum()
```

This example creates a huge 80000x80000 random matrix, `big_matrix`. The matrix requires
about 80000^2 \* 8 bytes = 48GB of memory. 

If you attempt to run this on your local machine, it is likely that the following will
happen:

```bash
$ python BigSum.py run

2019-11-29 02:43:39.689 [5/start/21975 (pid 83812)] File "BugSum.py", line 11, in start
2018-11-29 02:43:39.689 [5/start/21975 (pid 83812)] big_matrix = numpy.random.ranf((80000, 80000))
2018-11-29 02:43:39.689 [5/start/21975 (pid 83812)] File "mtrand.pyx", line 856, in mtrand.RandomState.random_sample
2018-11-29 02:43:39.689 [5/start/21975 (pid 83812)] File "mtrand.pyx", line 167, in mtrand.cont0_array
2018-11-29 02:43:39.689 [5/start/21975 (pid 83812)] MemoryError
2018-11-29 02:43:39.689 [5/start/21975 (pid 83812)]
2018-11-29 02:43:39.844 [5/start/21975 (pid 83812)] Task failed.
2018-11-29 02:43:39.844 Workflow failed.
    Step failure:
    Step start (task-id 21975) failed.
```

This fails quickly due to a `MemoryError` on most laptops as we are unable to allocate
48GB of memory. 

The `@resources` decorator suggests resource requirements for a step. The `memory`
argument specifies the amount of RAM in megabytes and `cpu` the number of CPU cores
requested. It does not produce the resources magically, which is why the run above
failed. The `@resources` decorator takes effect only when combined with another
decorator that describes what compute platform, like Kubernetes or AWS Batch, to use.

Let's use the `--with` option to attach a desired decorator to all steps on the command
line. Choose one of the commands in the tabs below corresponding to whichever you use-
Kubernetes or AWS Batch. This assumes that you have [configured one of these systems
work with Metaflow](/getting-started/infrastructure).

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

<Tabs> <TabItem value="k8s" label="Kubernetes">

```batch
$ python BigSum.py run --with kubernetes
```

</TabItem>

<TabItem value="batch" label="AWS Batch">

```k8s
$ python BigSum.py run --with batch
```

</TabItem> </Tabs>

The `--with batch` or `--with kubernetes` option instructs Metaflow to run all tasks as
separate jobs on the chosen compute platform, instead of using a local process for each
task. It has the same effect as adding the decorator above all steps in the source code.

This time the run should succeed thanks to the large enough instance, assuming a large
enough instance is available in your compute environment. In this case the `resources`
decorator is used as a prescription for the size of the instance that the job should run
on. Make sure that this resource requirement can be met. If a large enough instance is
not available, the task won't start executing.

You should see an output like this:

```bash
The sum is 3200003911.795288.
Computing it took 4497ms.
```

In addition to `cpu` and `memory` you can specify `gpu=N` to request N GPUs for the
instance.

### Running only specific steps remotely

The `resources` decorator is an annotation that signals how much resources are required
by a step. By itself, it does not force the step to be executed on any particular
platform. This is convenient as you can make the choice later, executing the same flow
on different environments without changes.

Sometimes it is useful to make sure that a step always executes on a certain compute
platform, maybe using a platform-specific configuration. You can achieve this by adding
either `@batch` or `@kubernetes` above steps that should be executed remotely. The
decorators accept the same keyword arguments as `@resources` as well as
platform-specific arguments that you can find listed in [the API
reference](/api/step-decorators).

For instance, in the example above, replace `@resources` with `@batch` or `@kubernetes`
and run it as follows:

```bash
$ python BigSum.py run
```

You will see that the `start` step gets executed on a remote instance but the `end`
step, which does not need special resources, is executed locally. You could even mix
decorators so that some steps execute on `@kubernetes`, some on `@batch`, and some
locally.

### Parallelization over multiple cores

When running locally, tasks are executed as separate processes. The operating system
takes care of allocating them to separate CPU cores, so they will actually execute in
parallel assuming that enough CPU cores are available. Hence, your flow can utilize
multiple cores without you having to do anything special besides defining branches in
the flow.

When running remotely on `@batch` or `@kubernetes`, branches are mapped to separate jobs
that are executed in parallel, allowing you to *scale horizontally* to any number of
parallel tasks. In addition, you may take advantage of multiple CPU cores inside a task.
This may happen automatically if you use a modern ML library like PyTorch or Scikit
Learn, or you may parallelize functions explicitly, as explained below.

#### Parallel map

Metaflow provides a utility function called `parallel_map` that helps take advantage of
multiple CPU cores. This function is almost equivalent to `Pool().map` in the Python's
built-in
[multiprocessing](https://docs.python.org/2/library/multiprocessing.html#multiprocessing.pool.multiprocessing.Pool.map)
library. The main differences are the following:

* `parallel_map` supports lambdas and any other callables of Python.
* `parallel_map` does not suffer from bugs present in `multiprocessing`.
* `parallel_map` can handle larger amounts of data.

You may also use `parallel_map` to parallelize simple operations that might be too
cumbersome to implement as separate steps.

Here is an extension of our previous example that implements a multicore `sum()` by
partitioning the matrix by row:

```python
from metaflow import FlowSpec, step, batch, parallel_map

class BigSum(FlowSpec):

    @resources(memory=60000, cpu=8)
    @step
    def start(self):
        import numpy
        import time
        big_matrix = numpy.random.ranf((80000, 80000))
        t = time.time()
        parts = parallel_map(lambda i: big_matrix[i:i+10000].sum(),
                             range(0, 80000, 10000))
        self.sum = sum(parts)
        self.took = time.time() - t
        self.next(self.end)

    @step
    def end(self):
        print("The sum is %f." % self.sum)
        print("Computing it took %dms." % (self.took * 1000))

if __name__ == '__main__':
    BigSum()
```

Note that we use `cpu=8` to request enough CPU cores, so our `parallel_map` can benefit
from optimal parallelism. Disappointingly, in this case the parallel `sum` is not faster
than the original simple implementation due to the overhead of launching separate
processes in `parallel_map`. A less trivial operation might see a much larger
performance boost.

## **Safeguard flags**

It is almost too easy to execute tasks remotely using Metaflow. Consider a foreach loop
defined as follows:

```python
self.params = range(1000)
self.next(self.fanned_out, foreach='params')
```

When run with `--with batch` or `--with kubernetes`, this code would launch up to 1000
parallel instances which may turn out to be quite expensive.

To safeguard against inadvertent launching of many parallel jobs, the `run` and `resume`
commands have a flag `--max-num-splits` which fails the task if it attempts to launch
more than 100 splits by default. Use the flag to increase the limit if you actually need
more tasks.

```bash
$ python myflow.py run --max-num-splits 200
```

Another flag, `--max-workers`, limits the number of tasks run in parallel. Even if a
foreach launched 100 splits, `--max-workers` would make only 16 \(by default\) of them
run in parallel at any point in time. If you want more parallelism, increase the value
of `--max-workers`.

```bash
$ python myflow.py run --max-workers 32
```

## Big Data

Thus far, we have focused on CPU and memory-bound steps. Loading and processing big data
is often an IO-bound operation which requires a different approach. Read [Loading and
Storing Data](/scaling/data) for more details about how to build efficient data
pipelines in Metaflow.