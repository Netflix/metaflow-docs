
# Requesting Compute Resources

You can run any Metaflow flow in the cloud simply by adding an option on the command line:

<Tabs>
<TabItem value="k8s" label="Kubernetes">

```batch
$ python hello.py run --with kubernetes
```

</TabItem>

<TabItem value="batch" label="AWS Batch">

```k8s
$ python hello.py run --with batch
```

</TabItem>
</Tabs>

When you add `--with kubernetes` (for Kubernetes) or `--with batch` (for AWS Batch) on the command line
([depending on your deployment](/getting-started/infrastructure)), Metaflow runs the flow on the chosen
compute backend.

Every step gets allocated a modest amount of resources by default - around 1 CPU core and 4GB of RAM. If your step
needs more CPU cores, memory, disk, or [more GPUs (or other hardware accelerators)](gpu-compute), annotate your
resource requirements with the [`@resources`](/api/step-decorators/resources) decorator.

Another benefit of `@resources` is that it allows you to move smoothly between local development and the cloud.
The decorator doesn't have an effect for local runs, but when combined with `--with kubernetes`
or `--with batch`, you can use the flow to handle bigger models or more data without changing
anything in the code. Note that [production deployments](/production/introduction) always run in the cloud,
respecting `@resources` requirements.

:::note
Note that `@kubernetes` can target any Kubernetes cluster, including on-premise clusters. For brevity,
we use the term *the cloud* to refer to all compute backends.
:::

## Example

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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="k8s" label="Kubernetes">

```batch
$ python BigSum.py run --with kubernetes
```

</TabItem>

<TabItem value="batch" label="AWS Batch">

```k8s
$ python BigSum.py run --with batch
```

</TabItem>
</Tabs>

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
