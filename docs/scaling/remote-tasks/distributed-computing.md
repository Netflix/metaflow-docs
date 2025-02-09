
# Distributed Computing

Metaflow's [`foreach` construct](/metaflow/basics#foreach) allows you to run tasks concurrently.
In the case `foreach`, tasks execute independently. This pattern works well when the workload
is [*embarrassingly parallel*](https://en.wikipedia.org/wiki/Embarrassingly_parallel), that is,
tasks don't communicate with each other and they don't have to execute simultaneously.

There are other workloads, such as distributed training of large models, which require
tasks to interact with each other. Metaflow provides another mechanism, the `@parallel` decorator,
which orchestrates such inter-dependent tasks. In effect, the decorator launches
an ephemeral compute cluster on the fly, as a part of a Metaflow flow, benefiting from
Metaflow features like [dependency management](/scaling/dependencies),
[versioning](/scaling/tagging), and [production deployments](/production/introduction).

Typically, this pattern is used through one of the framework-specific decorators like `@torchrun`
or `@deepspeed`, described below, which make it easy to use a particular framework for distributed
training. If you need low-level access to the cluster, e.g. to use it with a framework that doesn't
have a corresponding high-level decorator yet, see documentation for low-level access at the
end of this page.

:::info
To use distributed computing, follow [set up instructions
here](https://outerbounds.com/engineering/operations/distributed-computing/). If you need
help getting started, contact [Metaflow Slack](http://slack.metaflow.org).
:::

## High-level decorators

The easiest way to get started is to use one of the high-level decorators - [see an overview 
in this blog post](https://outerbounds.com/blog/distributed-training-with-metaflow/):

| Decorator Implementation | UX | Description | PyPi Release | Example | 
| :---: | --- | --- |  :---: |  :---: | 
| [`@torchrun`](https://github.com/outerbounds/metaflow-torchrun) | Use `current.torch.run` to submit your `torch.distributed` program. No need to log into each node, call the code once in `@step`.  | A [`torchrun`](https://pytorch.org/docs/stable/elastic/run.html) command that runs `@step` function code on each node. [Torch distributed](https://pytorch.org/tutorials/beginner/dist_overview.html) is used under the hood to handle communication between nodes. | [`metaflow-torchrun`](https://pypi.org/project/metaflow-torchrun/) |  [MinGPT](https://github.com/outerbounds/metaflow-torchrun/blob/main/examples/min-gpt/flow.py) |
| [`@deepspeed`](https://github.com/outerbounds/metaflow-deepspeed) | Exposes `current.deepspeed.run` <br/> Requires OpenSSH and OpenMPI installed in the Metaflow task container. | Form MPI cluster with passwordless SSH configured at task runtime (to reduce the risk of leaking private keys).  Submit the Deepspeed program and run. | [`metaflow-deepspeed`](https://pypi.org/project/metaflow-deepspeed/) | [Bert](https://github.com/outerbounds/metaflow-deepspeed/tree/main/examples/bert) & [Dolly](https://github.com/outerbounds/metaflow-deepspeed/tree/main/examples/dolly) |
| [`@metaflow_ray`](https://github.com/outerbounds/metaflow-ray/tree/main) |  Write a Ray program locally or call script from `@step` function, `@metaflow_ray` takes care of forming the Ray cluster. | Forms a [Ray cluster](https://docs.ray.io/en/latest/cluster/getting-started.html) dynamically. Runs the `@step` function code on the control task as Ray’s “head node”. | [`metaflow-ray`](https://pypi.org/project/metaflow-ray/) | [GPT-J](https://github.com/outerbounds/metaflow-ray/tree/main/examples/ray-fine-tuning-gpt-j) & [Distributed XGBoost](https://github.com/outerbounds/metaflow-ray/tree/main/examples/train) |
| [`@tensorflow`](https://github.com/outerbounds/metaflow-tensorflow/tree/main) | Put TensorFlow code in a distributed strategy scope, and call it from step function. | Run the `@step` function code on each node. This means the user picks the appropriate [strategy](https://www.tensorflow.org/guide/distributed_training#types_of_strategies) in their code. | [`metaflow-tensorflow`](https://pypi.org/project/metaflow-tensorflow/) |  [Keras Distributed](https://github.com/outerbounds/metaflow-tensorflow/tree/main/examples/multi-node) |
| [`@mpi`](https://github.com/outerbounds/metaflow-mpi) |  Exposes `current.mpi.cc`, `current.mpi.broadcast_file`, `current.mpi.run`, `current.mpi.exec`. Cluster SSH config is handled automatically inside the decorator. Requires OpenSSH and an MPI implementation are installed in the Metaflow task container. It was tested against OpenMPI, which you can find a sample Dockerfile for [here](https://github.com/outerbounds/metaflow-mpi/blob/main/examples/Dockerfile). | Forms an MPI cluster with passwordless SSH configured at task runtime. Users can submit a `mpi4py` program or compile, broadcast, and submit a C program. | [`metaflow-mpi`](https://pypi.org/project/metaflow-mpi/) | [Libgrape](https://github.com/outerbounds/metaflow-mpi/tree/main/examples/libgrape-ldbc-graph-benchmark) |

:::info
Note that these decorators are not included in the `metaflow` package but they are implemented as Metaflow
Extensions. You need to install them separately in your development environment, but they will get
packaged automatically by Metaflow, so you don't need to include them in Docker images
or `@conda`/`@pypi`. Also note that the extensions are not part of [the stable Metaflow API](/api), so
they are subject to change.
:::

:::tip
When running demanding training workload, it is advisable to use [the `@checkpoint`
decorator](/scaling/checkpoint/introduction) to ensure that no progress is lost even if a
task hits a spurious failure.
:::

## Low-level access

Under the hood, Metaflow guarantees that you get a desired kind and number of compute nodes running
simultaneously, so that they are able to communicate and coordinate amongst each other.

You can use this compute cluster to implement any distributed computing algorithms of your own.
To illustrate this, consider a simple example that sets up a cluster of tasks that communicate
with each other over [MPI](https://en.wikipedia.org/wiki/Message_Passing_Interface).
Technically, MPI is not required - you could communicate with any protocol you want - but MPI is
a popular choice.

### MPI example

Let’s create a simple Hello World MPI program based on
[this example](https://github.com/outerbounds/metaflow-mpi/tree/main/examples/python-hello).
The program identifies the main node (`rank == 0`) that sends a message to
all workers nodes which they receive and print out. We use
[mpi4py](https://mpi4py.readthedocs.io/en/stable/) as a Python wrapper for the MPI protocol.

First, let's create an MPI script, `mpi_hello.py`:
```python
import mpi4py
from mpi4py import MPI

if __name__ == "__main__":

    comm = MPI.COMM_WORLD
    rank = comm.Get_rank()
    size = comm.Get_size()

    if rank == 0:
        print(f"Cluster has {size} processes")
        for i in range(1, size):
            msg = "Main node says hi! 👋"
            comm.send(msg, dest=i)
    else:
        msg = comm.recv()
        print(f"👷 Worker node {rank} received message: {msg}")
```

Next, let's create a flow that launches a cluster of four nodes, thanks
to `num_parallel=4`, and runs the MPI script we defined above in the cluster,
launching two worker processes on each node.

```python
from metaflow import FlowSpec, step, batch, mpi, current

N_CPU = 2
N_NODES = 4

class MPI4PyFlow(FlowSpec):

    @step
    def start(self):
        self.next(self.multinode, num_parallel=N_NODES)

    @batch(image="eddieob/mpi-base:1", cpu=N_CPU)
    @mpi
    @step
    def multinode(self):
        current.mpi.exec(
            args=["-n", str(N_CPU * N_NODES), "--allow-run-as-root"],
            program="python mpi_hello.py",
        )
        self.next(self.join)

    @step
    def join(self, inputs):
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    MPI4PyFlow()
```

To run the flow, make sure your AWS Batch environment is
[configured to support multinode
jobs](https://outerbounds.com/engineering/operations/distributed-computing/). Then, install
the `MPI` extension for Metaflow
```
pip install metaflow-mpi
```
and run the flow with
```
python mpiflow.py run
```

The example uses an image, `eddieob/mpi-base`, defined in
[this Dockerfile](https://github.com/outerbounds/metaflow-mpi/blob/main/examples/Dockerfile). The image
includes MPI and `ssh` for communication. Note that Metaflow packages `mpi_hello.py` automatically,
so it doesn't have to be included in the image.

