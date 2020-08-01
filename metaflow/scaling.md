# Scaling Out and Up

From a usability point of view, it is hard to beat the convenience of writing and running a straightforward script in the comfort of your favorite IDE and a local terminal. Since one of the core values of Metaflow is usability, we encourage you to start with this easy approach and not worry about scalability until it becomes an issue.

Instead of providing magical abstractions or a new paradigm for scalability, Metaflow provides a set of easy-to-use tools that help you to make your code scalable depending on your specific needs.

The scalability tools fall into three categories:

**Performance Optimization**: You can improve performance of your code by utilizing off-the-shelf, high-performance libraries such as [XGboost](https://github.com/dmlc/xgboost) or [Tensorflow](https://tensorflow.org). Sometimes, it is appropriate to implement a custom algorithm in a high-performance language such as C++ which can be called from your Metaflow steps. Or, as a happy medium between low-performance but productive Python and a fast but tedious C++, you may be able to use a compiler such as [Numba](https://numba.pydata.org) to speed up your code.

**Scaling Up**: One should not underestimate the horsepower of modern large server type machine. It is sometimes worth considering running on a larger machine prior to trying anything else.

**Scaling Out**: Metaflow also integrates with Batch from AWS allowing you to parallelize your steps over an arbitrarily large number of Batch jobs, giving you access to virtually unlimited amount of computing power.

It is hard to be prescriptive about which of the three categories is most suitable for your problem. Often, the answer is a combination of the three. In general, start with the approach that is the easiest to implement and keep iterating until the performance is satisfactory.

This section focuses specifically on using Batch to scale up and out: you can use Batch to request a larger instance to run your step as well as use it to parallelize your steps over multiple instances. This section requires you to have Metaflow working with AWS. See the [AWS section](../metaflow-on-aws/metaflow-on-aws.md) for more information on either setting up Metaflow in your [own AWS environment](../metaflow-on-aws/deploy-to-aws.md) or using the [provided sandbox](../metaflow-on-aws/metaflow-sandbox.md).

This section presents the tools available in Metaflow for scaling up and out.

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

## Using AWS Batch

The `resources` decorator gains all its power in collaboration with Batch execution. Note that for this section, you will need to have Metaflow working in an AWS cloud environment \(either having [deployed it yourself](../metaflow-on-aws/deploy-to-aws.md) or running in the [Metaflow sandbox](../metaflow-on-aws/metaflow-sandbox.md)\)

With the following command, you instruct Metaflow to run all your steps on AWS Batch:

```bash
$ python BigSum.py run --with batch
```

The `--with batch` option instructs Metaflow to run all tasks as separate AWS Batch jobs, instead of using a local process for each task. It has the same effect as adding `@batch` decorator to all steps in the code.

This time the run should succeed thanks to the large enough instance. Note that in this case the `resources` decorator is used as a prescription for the size of the box that Batch should run the job on; please be sure that this resource requirement can be met. See [here](scaling.md#my-job-is-stuck-in-runnable-state-what-do-i-do) on what can happen if this is not the case.

You should see an output like this:

```bash
The sum is 3200003911.795288.
Computing it took 4497ms.
```

In addition to `cpu` and `memory` you can specify `gpu=N` to request N GPUs for the instance.

### Using AWS Batch selectively with `@batch` decorator

A close relative of the `resources` decorator is `batch`. It takes exactly the same keyword arguments as `resources` but instead of being a mere suggestion, it forces the step to be run on AWS Batch.

The main benefit of `batch` is that you can selectively run some steps locally and some on AWS Batch. In the example above, try replacing `resources` with `batch` and run it as follows:

```bash
$ python BigSum.py run
```

You will see that the `start` step gets executed on a large AWS Batch instance but the `end` step, which does not need special resources, is executed locally without the additional latency of launching a AWS Batch job. Executing a [`foreach`](basics.md#foreach) step launches parallel AWS Batch jobs with the specified resources for the step.

### Parallelization over multiple cores[¶](http://manuals.test.netflix.net/view/mli/mkdocs/master/scaling/#parallelization-over-multiple-cores)

When running locally, branches in your flow are executed in parallel as separate processes which the operating system can allocate to separate CPU cores. This means that your flow can utilize multiple cores without you having to do anything special besides defining branches in the flow.

When running `--with batch`, branches are mapped to separate AWS Batch jobs that are executed in parallel. All this makes sense for basic use cases. What if you want to utilize multiple cores on an AWS Batch instance?

Metaflow provides a utility function called `parallel_map` as an answer. This function is almost equivalent to `Pool().map` in the Python's built-in [multiprocessing](https://docs.python.org/2/library/multiprocessing.html#multiprocessing.pool.multiprocessing.Pool.map) library. The main differences are the following:

* `parallel_map` supports lambdas and any other callables of Python.
* `parallel_map` does not suffer from bugs present in `multiprocessing`.
* `parallel_map` can handle larger amounts of data.

Besides the AWS Batch use case, `parallel_map` may be appropriate for simple operations that might be too cumbersome to implement as separate steps.

Here is an extension of our previous example that implements a multi-core `sum()` by partitioning the matrix by row:

```python
from metaflow import FlowSpec, step, batch, parallel_map

class BigSum(FlowSpec):

    @batch(memory=60000, cpu=8)
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

Note that we use `cpu=8` to request eight CPU cores from AWS Batch, so our `parallel_map` can benefit from optimal parallelism.

Disappointingly, in this case the parallel `sum` is not faster than the original simple implementation due to the overhead of launching separate processes in `parallel_map`. A less trivial operation might see a much larger performance boost.

### AWS Batch tips and tricks

Here are some useful tips and tricks related to running Metaflow on AWS Batch.

#### **What value of `@timeout` should I set?**

Metaflow sets a default timeout of 5 days so that you tasks don't get stuck infinitely while running on AWS Batch. For more details on how to use `@timeout` please read [this.](failures.md#timing-out-with-timeout-decorator)

#### **How much `@resources` can I request?**

Here are the current defaults for different resource types:

* `cpu`: 1
* `memory`: 4000 \(4GB\)

When setting `@resources`, keep in mind the configuration of your AWS Batch Compute Environment. Your job will be stuck in a `RUNNABLE` state if AWS is unable to provision the requested resources. Additionally, as a good measure, don't request more resources than what your workflow actually needs. On the other hand, never optimize resources prematurely.

You can place your AWS Batch task in a specific queue by using the `queue` argument. By default, all tasks execute on a vanilla [python docker image](https://hub.docker.com/_/python/) corresponding to the version of Python interpreter used to launch the flow and can be overridden using the `image` argument.

You can also specify the resource requirements on command line as well:

```bash
$ python BigSum.py run --with batch:cpu=4,memory=10000,queue=default,image=ubuntu:latest
```

#### My job is stuck in `RUNNABLE` state. What do I do?

Consult [this article](https://docs.aws.amazon.com/batch/latest/userguide/troubleshooting.html#job_stuck_in_runnable).

#### **Listing and killing AWS Batch tasks**

If you interrupt a Metaflow run, any AWS Batch tasks launched by the run get killed by Metaflow automatically. Even if something went wrong during the final cleanup, the tasks will finish and die eventually, at the latest when they hit the maximum time allowed for an AWS Batch task.

If you want to make sure you have no AWS Batch tasks running, or you want to manage them manually, you can use the `batch list` and `batch kill` commands. These commands are disabled in the [Metaflow AWS Sandbox](../metaflow-on-aws/metaflow-sandbox.md).

You can easily see what AWS Batch tasks were launched by your latest run with

```bash
$ python myflow.py batch list
```

You can kill the tasks started by the latest run with

```bash
$ python myflow.py batch kill
```

If you have started multiple runs, you can make sure there are no orphaned tasks still running with

```bash
$ python myflow.py batch list --my-runs
```

You can kill the tasks started by the latest run with

```bash
$ python myflow.py batch kill --my-runs
```

If you see multiple runs running, you can cherry-pick a specific job, e.g. 456, to be killed as follows

```bash
$ python myflow.py batch kill --run-id 456
```

If you are working with another person, you can see and kill their tasks related to this flow with

```bash
$ python myflow.py batch kill --user willsmith
```

Note that all the above commands only affect the flow defined in your script. You can work on many flows in parallel and be confident that `kill` kills tasks only related to the flow you called `kill` with.

#### **Safeguard flags**

It is almost too easy to launch AWS Batch jobs with Metaflow. Consider a foreach loop defined as follows:

```python
self.params = range(1000)
self.next(self.fanned_out, foreach='params')
```

When run with `--with batch`, this code would launch 1000 parallel Batch instances which may turn out to be quite expensive.

To safeguard against inadvertent launching of many parallel Batch jobs, the `run` and `resume` commands have a flag `--max-num-splits` which fails the task if it attempts to launch more than 100 splits by default. Use the flag to increase the limit if you actually need more tasks.

```bash
$ python myflow.py run --max-num-splits 200
```

Another flag, `--max-workers`, limits the number of tasks run in parallel. Even if a foreach launched 100 splits, `--max-workers` would make only 16 \(by default\) of them run in parallel at any point in time. If you want more parallelism, increase the value of `--max-workers`.

```bash
$ python myflow.py run --max-workers 32
```

#### **Accessing AWS Batch logs**

As a convenience feature, you can also see the logs of any past step as follows:

```bash
$ python bigsum.py logs 15/end
```

## Big Data

The previous sections focused on CPU and memory-bound steps. Loading and processing big data is often an IO-bound operation, which requires a different approach.

Read [Loading and Storing Data](data.md) for more details about how to build efficient data pipelines in Metaflow.

### Disk space

You can request higher disk space on AWS Batch instances by using an unmanaged Compute Environment with a custom AMI.

### Large data artifacts

Metaflow uses Python's default object serialization format, [Pickle](https://docs.python.org/3/library/pickle.html), to persist data artifacts.

Unfortunately Python was not able to pickle objects larger than 2GB prior to Python 3.5. If you need to store large data artifacts, such as a large data frame, using a recent version of Python 3 is highly recommended.

In the rare cases where Metaflow's built-in serialization does not work for you, you can use [Metaflow S3 client](data.md#data-outside-tables-metaflow-s3) to persist arbitrary data in S3.

