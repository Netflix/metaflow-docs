
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

When you add `--with kubernetes` (for Kubernetes) or `--with batch` (for AWS Batch) on the
command line ([depending on your deployment](/getting-started/infrastructure)), Metaflow
runs the flow on the chosen compute backend.

Every step gets allocated a modest amount of resources by default - around 1 CPU core and 4GB of
RAM. If your step needs more CPU cores, memory, disk, or [more GPUs (or other hardware
accelerators)](gpu-compute), annotate your resource requirements with the
[`@resources`](/api/step-decorators/resources) decorator.

Another benefit of `@resources` is that it allows you to move smoothly between local
development and the cloud. The decorator doesn't have an effect for local runs, but when
combined with `--with kubernetes` or `--with batch`, you can use the flow to handle bigger
models or more data without changing anything in the code. Note that
[production deployments](/production/introduction) always run in the cloud, respecting
`@resources` requirements.

:::note
Note that `@kubernetes` can target any Kubernetes cluster, including on-premise clusters.
For brevity, we use the term *the cloud* to refer to all compute backends.
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

## Moving between compute environments

Metaflow makes it easy to mix and match compute environments. You can move from
local prototyping to cloud execution easily, but also [mix different cloud 
compute backends](https://outerbounds.com/blog/metaflow-on-all-major-clouds/) fluidly.

### Mixing local and remote compute

The `resources` decorator is an annotation that signals how much resources are required
by a step. By itself, it does not force the step to be executed on any particular
platform. This is convenient as you can make the choice later, executing the same flow
on different environments without changes.

For instance, we can take the above example and replace `@resources` with `@batch`
(or `@kubernetes`):

```python
from metaflow import FlowSpec, step, resources

class BigSum(FlowSpec):

    @batch(memory=60000, cpu=1)
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

In contrast to `@resources`, the `@batch` decorator (and `@kubernetes`) forces
the step to be executed remotely. Run the flow without `--with` option:

```
$ python BigSum.py run
```

![](/assets/cloud-and-local.png)

You will see that the `start` step gets executed on AWS Batch but the `end` step,
which does not need special resources, is executed locally.

:::tip
Mixing local and remote steps can speed up development cycles,
as you can execute some  steps locally with minimal overhead, even
accessing local files, while executing only demanding steps in the cloud.
Metaflow takes care of moving data between the environments automatically.
:::

### Mixing cloud environments

You can mix and match `@resources`, `@batch`, and `@kubernetes` freely, which makes
it possible to create advanced workflows that leverage multiple compute environments
from workstations and on-prem data centers to the public cloud. Just [set up
your Metaflow stack](/getting-started/infrastructure) to support all the environments you want to use.

As a hypothetical example, consider this flow that mixes local compute, on-prem
compute, and various forms of cloud compute:

```python
import random
from metaflow import FlowSpec, step, resources, kubernetes, card

class HybridCloudFlow(FlowSpec):

    @step
    def start(self):
        self.countries = ['US', 'BR', 'IT']
        self.shards = {country: open(f'{country}.data').read()
                       for country in self.countries}
        self.next(self.prepare_data, foreach='countries')

    @kubernetes(memory=16000)
    @step
    def prepare_data(self):
        print('processing a shard of data', self.shards[self.input])
        self.next(self.train)

    @batch(gpu=2, queue='gpu-queue')
    @step
    def train(self):
        print('training model...')
        self.score = random.randint(0, 10)
        self.country = self.input
        self.next(self.join)

    @batch(memory=16000, queue='cpu-queue')    
    @step
    def join(self, inputs):
        self.best = max(inputs, key=lambda x: x.score).country
        self.next(self.end)

    @step
    def end(self):
        print(self.best, 'produced best results')

if __name__ == '__main__':
    HybridCloudFlow()
```

Here's an illustration of the flow:

![](/assets/hybrid_cloud.png)

1. `start` executes locally, loading local files for processing. Data is separated
   in three shards, one for each country.

2. `prepare_data` leverages an on-prem Kubernetes cluster to preprocess data, say, due
   to data privacy reasons.

3. `train` uses [cloud GPUs](gpu-compute) to train a model per country in parallel.

4. `join` loads the models in a high-memory cloud instance, evaluates them, and
   chooses the best performing country.

5. `end` fetches the results back to the local laptop.

Metaflow takes care of [packaging code](/scaling/dependencies) automatically, it
removes the need to move data manually, and it tracks all metadata consistently, across
the environments.

