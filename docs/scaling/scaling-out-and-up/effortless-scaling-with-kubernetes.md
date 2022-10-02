# Effortless Scaling with Kubernetes

Metaflow provides a set of easy-to-use tools that help you to make your code _scale up_ (by running your code on a larger machine) or _scale out_ (by allowing you to trivially parallelize your code over an arbitrarily large number of machines) using Kubernetes.

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

This example creates a huge 80000x80000 random matrix, `big_matrix`. The matrix requires about 80000^2 \* 8 bytes = 48GB of memory. 

If you attempt to run this on your local machine, it is likely that the following will happen:

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

This fails quickly due to a `MemoryError` on most laptops as we are unable to allocate 48GB of memory. 

The `resources` decorator suggests resource requirements for a step. The `memory` argument specifies the amount of RAM in megabytes and `cpu` the number of CPU cores requested. It does not produce the resources magically, which is why the run above failed.


The `resources` decorator gains all its power in collaboration with Kubernetes. Note that for this section, you will need to have Metaflow working in an AWS cloud environment \(either having [deployed it yourself](../../metaflow-on-aws/deploy-to-aws.md) or running in the [Metaflow sandbox](../../metaflow-on-aws/metaflow-sandbox.md)\)

With the following command, you instruct Metaflow to run all your steps on Kubernetes:

```bash
$ python BigSum.py run --with kubernetes
```

The `--with kubernetes` option instructs Metaflow to run all tasks as separate Kubernetes pods, instead of using a local process for each task. It has the same effect as adding `@kubernetes` decorator to all steps in the code.

This time the run should succeed thanks to the large enough instance. Note that in this case the `resources` decorator is used as a prescription for the size of the box that Kubernetes should run the job on; please be sure that this resource requirement can be met.

You should see an output like this:

```bash
The sum is 3200003911.795288.
Computing it took 4497ms.
```

In addition to `cpu` and `memory` you can specify `disk=D` to request D MB of disk space for the instance.

### Using Kubernetes selectively with `@kubernetes` decorator

A close relative of the `resources` decorator is `kubernetes`. It takes exactly the same keyword arguments as `resources` but instead of being a mere suggestion, it forces the step to be run on Kubernetes.

The main benefit of `kubernetes` is that you can selectively run some steps locally and some on Kubernetes. In the example above, try replacing `resources` with `kubernetes` and run it as follows:

```bash
$ python BigSum.py run
```

You will see that the `start` step gets executed on a large Kubernetes pod but the `end` step, which does not need special resources, is executed locally without the additional latency of launching a Kubernetes pod. Executing a [`foreach`](../basics.md#foreach) step launches parallel Kubernetes pods with the specified resources for the step.

### Parallelization over multiple cores

When running locally, branches in your flow are executed in parallel as separate processes which the operating system can allocate to separate CPU cores. This means that your flow can utilize multiple cores without you having to do anything special besides defining branches in the flow.

When running `--with kubernetes`, branches are mapped to separate Kubernetes pods that are executed in parallel. All this makes sense for basic use cases. What if you want to utilize multiple cores on a Kubernetes pod?

Metaflow provides a utility function called `parallel_map` as an answer. This function is almost equivalent to `Pool().map` in the Python's built-in [multiprocessing](https://docs.python.org/2/library/multiprocessing.html#multiprocessing.pool.multiprocessing.Pool.map) library. The main differences are the following:

* `parallel_map` supports lambdas and any other callables of Python.
* `parallel_map` does not suffer from bugs present in `multiprocessing`.
* `parallel_map` can handle larger amounts of data.

Besides the Kubernetes use case, `parallel_map` may be appropriate for simple operations that might be too cumbersome to implement as separate steps.

Here is an extension of our previous example that implements a multi-core `sum()` by partitioning the matrix by row:

```python
from metaflow import FlowSpec, step, batch, parallel_map

class BigSum(FlowSpec):

    @kubernetes(memory=60000, cpu=8)
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

Note that we use `cpu=8` to request eight CPU cores from Kubernetes, so our `parallel_map` can benefit from optimal parallelism.

Disappointingly, in this case the parallel `sum` is not faster than the original simple implementation due to the overhead of launching separate processes in `parallel_map`. A less trivial operation might see a much larger performance boost.

### Kubernetes tips and tricks

Here are some useful tips and tricks related to running Metaflow on Kubernetes.

#### **What value of `@timeout` should I set?**

Metaflow sets a default timeout of 5 days so that you tasks don't get stuck infinitely while running on Kubernetes. For more details on how to use `@timeout` please read [this.](../failures.md#timing-out-with-timeout-decorator)

#### **How much `@resources` can I request?**

Here are the current defaults for different resource types:

* `cpu`: 1
* `memory`: 4096 \(4GB\)
* `disk`: 10240 \(10GB\)

When setting `@resources`, keep in mind the configuration of your Kubernetes cluster. Your pod will be stuck in a unschedulable state if Kubernetes is unable to provision the requested resources. Additionally, as a good measure, don't request more resources than what your workflow actually needs. On the other hand, never optimize resources prematurely.

You can place your Kubernetes pod in a specific namespace by using the `namespace` argument. By default, all pods execute on a vanilla [python docker image](https://hub.docker.com/_/python/) corresponding to the version of Python interpreter used to launch the flow and can be overridden using the `image` argument.

You can also specify the resource requirements on command line as well:

```bash
$ python BigSum.py run --with kubernetes:cpu=4,memory=10000,namespace=foo,image=ubuntu:latest
```

#### **Safeguard flags**

It is almost too easy to launch Kubernetes pods with Metaflow. Consider a foreach loop defined as follows:

```python
self.params = range(1000)
self.next(self.fanned_out, foreach='params')
```

When run with `--with kubernetes`, this code would launch 1000 parallel pods which may turn out to be quite expensive.

To safeguard against inadvertent launching of many parallel pods, the `run` and `resume` commands have a flag `--max-num-splits` which fails the task if it attempts to launch more than 100 splits by default. Use the flag to increase the limit if you actually need more tasks.

```bash
$ python myflow.py run --max-num-splits 200
```

Another flag, `--max-workers`, limits the number of tasks run in parallel. Even if a foreach launched 100 splits, `--max-workers` would make only 16 \(by default\) of them run in parallel at any point in time. If you want more parallelism, increase the value of `--max-workers`.

```bash
$ python myflow.py run --max-workers 32
```

If you interrupt a Metaflow run, any pods launched by the run get killed by Metaflow automatically. Even if something went wrong during the final cleanup, the tasks will finish and die eventually, at the latest when they hit the maximum time allowed for a pod.

#### **Accessing Kubernetes logs**

As a convenience feature, you can also see the logs of any past step as follows:

```bash
$ python bigsum.py logs 15/end
```

## Big Data

The previous sections focused on CPU and memory-bound steps. Loading and processing big data is often an IO-bound operation, which requires a different approach.

Read [Loading and Storing Data](../data.md) for more details about how to build efficient data pipelines in Metaflow.

### Disk space

You can request higher disk space for pods by using the `disk` attribute of `@kubernetes`.

### Large data artifacts

Metaflow uses Python's default object serialization format, [Pickle](https://docs.python.org/3/library/pickle.html), to persist data artifacts.

Unfortunately Python was not able to pickle objects larger than 2GB prior to Python 3.5. If you need to store large data artifacts, such as a large data frame, using a recent version of Python 3 is highly recommended.

In the rare cases where Metaflow's built-in serialization does not work for you, you can use [Metaflow S3 client](../data.md#data-outside-tables-metaflow-s3) to persist arbitrary data in S3.

