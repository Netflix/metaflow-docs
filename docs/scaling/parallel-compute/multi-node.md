# Running Multi-node Tasks

The `@parallel` decorator is like the [foreach](https://docs.metaflow.org/metaflow/basics#foreach) in that it allows Metaflow users to launch multiple runtime tasks based on the same step function process end users write. The primary difference is that `@parallel` enables inter-process communication (IPC) between tasks, often referred to as “multi-node computation” in HPC and deep learning contexts. 

This basic difference is simple to visualize. First consider the embarassingly parallel `foreach`:
```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer playing controls muted loop url='/assets/foreach-job.mp4' width='100%' height='100%'/>

<br/>

And now note the difference with the `num_parallel` case:
<ReactPlayer playing controls muted loop url='/assets/parallel-job.mp4' width='100%' height='100%'/>

IPC is needed in cases that require computers on different machines pooling their resources to complete one job, such as a multi-node process that where each worker does some computing and then results are synced in an [all reduce](https://mpitutorial.com/tutorials/mpi-reduce-and-allreduce/). This computation pattern primarily appears in distributed AI training and numerical simulations in traditional HPC contexts. To support these use cases, the `@parallel` decorator provides a Metaflow API to launch `num_parallel` tasks that can communicate directly with each other. 

The main reason to use Metaflow and the `@parallel` decorator for this style of compute is that the implementation works with standard tools in the distributed computing ecosystem like Ray and PyTorch distributed, and is additive with the typical benefits of Metaflow, for example, packaging code and dependencies across worker nodes and seamlessly moving between compute providers. 

To implement the idea, Metaflow has a decorator called `@parallel` that automatically forms a set of [gang-scheduled](https://en.wikipedia.org/wiki/Gang_scheduling) tasks that can coordinate on a single job defined or called in the `@step` function. 

### Unbounded foreach
The unbounded foreach is the fundamental mechanism that underlies the `@parallel` implementation and enables gang-scheduled Metaflow tasks. It provides context to other Metaflow decorators that need to be aware of the multi-node setting. 

### The parallel decorator
The `@parallel` decorator and its subclasses are the user-facing APIs in multi-node Metaflow scenarios.  

To illustrate, let’s see how to run a Hello World MPI program using Metaflow in two steps based on [this example](https://github.com/outerbounds/metaflow-mpi/tree/main/examples/python-hello).
1. Define a multi-node MPI program. In this example, we highlight [mpi4py](https://mpi4py.readthedocs.io/en/stable/), first defining the MPI script independent of Metaflow.
2. Use the [metaflow-mpi plugin](https://github.com/outerbounds/metaflow-mpi) to expose the `current.mpi.exec` function, which is used in our Metaflow step to call the MPI script. This means we can run the same MPI program we typically run on a static HPC cluster with all the regular [benefits of Metaflow](https://docs.metaflow.org/introduction/why-metaflow), integrating this same piece of user code into a software system designed to help lift the code into a production context.

:::note
[MPI](https://en.wikipedia.org/wiki/Message_Passing_Interface) is a standard protocol for message passing in the HPC and deep learning community.
:::

#### Step 1: Define a multi-node MPI program
```python
#mpi_hello_world.py

import mpi4py
from mpi4py import MPI
N_CPU = 4
N_NODES = 4

if __name__ == "__main__":

    comm = MPI.COMM_WORLD
    rank = comm.Get_rank()
    size = comm.Get_size()
    print(f"Rank {rank} process of {size} processes.")

    for i in range(N_CPU * N_NODES):
        if rank == 0:
            msg = "Message from control task."
            comm.send(msg, dest=i)
        elif rank == i:
            s = comm.recv()
            print("rank %d: %s" % (rank, s))
```

#### Step 2: Call the multi-node MPI program in your Metaflow code 

```python
# flow.py
from metaflow import FlowSpec, step, batch, mpi, current

N_CPU = 4
N_NODES = 4
MEMORY = 16000

class MPI4PyFlow(FlowSpec):

    @step
    def start(self):
        self.next(self.multinode, num_parallel=N_NODES)

    @batch(cpu=N_CPU, memory=MEMORY)
    @mpi
    @step
    def multinode(self):
        # matches mpiexec command
        current.mpi.exec(
            args=["-n", str(N_CPU * N_NODES), "--allow-run-as-root"],
            program="python mpi_hello_world.py",
        )
        # others: 
            # current.mpi.run: matches mpirun command
            # current.mpi.cc: matches mpicc command
            # current.mpi.broadcast_file: sends file from control to all others, such as a compiled binary.
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

### User-facing abstractions
The MPI decorator shown above is one of several existing Metaflow plugins demonstrating how to extend the `@parallel` functionality. You can look into the repositories in the decorator implementation column of this table to see the pattern you can follow to modify or implement your own decorator for any multi-node computing framework. 

:::note
If preferred, you can also use the `@parallel` decorator itself and manually configure any other setup needed for your use case as part of the Metaflow user code. 
:::

| Decorator Implementation | UX | Description | PyPi Release | Example | 
| :---: | :---: | :---: |  :---: |  :---: | 
| [`@torchrun`](https://github.com/outerbounds/metaflow-torchrun) | Use `current.torch.run` to submit your `torch.distributed` program. No need to log into each node, call the code once in `@step`.  | A [`torchrun`](https://pytorch.org/docs/stable/elastic/run.html) command that runs `@step` function code on each node. [Torch distributed](https://pytorch.org/tutorials/beginner/dist_overview.html) is used under the hood to handle communication between nodes. | [`metaflow-torchrun`](https://pypi.org/project/metaflow-torchrun/) |  [MinGPT](https://github.com/outerbounds/metaflow-torchrun/blob/main/examples/min-gpt/flow.py) |
| [`@tensorflow`](https://github.com/outerbounds/metaflow-tensorflow/tree/main) | Put TensorFlow code in a distributed strategy scope, and call it from step function. | Run the `@step` function code on each node. This means the user picks the appropriate [strategy](https://www.tensorflow.org/guide/distributed_training#types_of_strategies) in their code. | [`metaflow-tensorflow`](https://pypi.org/project/metaflow-tensorflow/) |  [Keras Distributed](https://github.com/outerbounds/metaflow-tensorflow/tree/main/examples/multi-node) |
| [`@metaflow_ray`](https://github.com/outerbounds/metaflow-ray/tree/main) |  Write a Ray program locally or call script from `@step` function, `@metaflow_ray` takes care of forming the Ray cluster. | Forms a [Ray cluster](https://docs.ray.io/en/latest/cluster/getting-started.html) dynamically. Runs the `@step` function code on the control task as Ray’s “head node”. | [`metaflow-ray`](https://pypi.org/project/metaflow-ray/) | [GPT-J](https://github.com/outerbounds/metaflow-ray/tree/main/examples/ray-fine-tuning-gpt-j) & [Distributed XGBoost](https://github.com/outerbounds/metaflow-ray/tree/main/examples/train) |
| [`@mpi`](https://github.com/outerbounds/metaflow-mpi) |  Exposes `current.mpi.cc`, `current.mpi.broadcast_file`, `current.mpi.run`, `current.mpi.exec`. Cluster SSH config is handled automatically inside the decorator. Requires OpenSSH and an MPI implementation are installed in the Metaflow task container. It was tested against OpenMPI, which you can find a sample Dockerfile for [here](https://github.com/outerbounds/metaflow-mpi/blob/main/examples/Dockerfile). | Forms an MPI cluster with passwordless SSH configured at task runtime. Users can submit a `mpi4py` program or compile, broadcast, and submit a C program. | [`metaflow-mpi`](https://pypi.org/project/metaflow-mpi/) | [Libgrape](https://github.com/outerbounds/metaflow-mpi/tree/main/examples/libgrape-ldbc-graph-benchmark) |
| [`@deepspeed`](https://github.com/outerbounds/metaflow-deepspeed) | Exposes `current.deepspeed.run` <br/> Requires OpenSSH and OpenMPI installed in the Metaflow task container. | Form MPI cluster with passwordless SSH configured at task runtime (to reduce the risk of leaking private keys).  Submit the Deepspeed program and run. | [`metaflow-deepspeed`](https://pypi.org/project/metaflow-deepspeed/) | [Bert](https://github.com/outerbounds/metaflow-deepspeed/tree/main/examples/bert) & [Dolly](https://github.com/outerbounds/metaflow-deepspeed/tree/main/examples/dolly) |

## Compute environment considerations

Depending on the distributed computing frameworks and job types you want to use, there are various network adapters and HPC services that you may want to install into the Metaflow deployment. 

### AWS Batch
This section will guide you through creating a new AWS Batch compute environment for your multi-node jobs. In general, it is a good practice to separate these environments from the environments that run other jobs in your Metaflow deployment, due to the drastically different resource requirements. 

The steps are:
1. [Optional, recommended for Metaflow admins] Read the [AWS Batch Multi-node documentation](https://docs.aws.amazon.com/batch/latest/userguide/multi-node-parallel-jobs.html)
2. Set up a security group for passwordless SSH
3. Create a new Batch compute environment
    - Attach the security group from step 1
    - Attach the desired EC2 instances
    - [Optional] Configure a cluster placement group in one availability zone

#### Security Group for Passwordless SSH
Multi-node frameworks based on MPI require passwordless SSH. This means extra configuration in your AWS Batch compute environment is required. To enable MPI, go to the EC2 section of the AWS console and create a security group that you can then attach to your Batch compute environment where you plan to run multi-node jobs. Make sure you are in the same AWS region, and follow these steps in your AWS console to make the EC2 security group:
- Choose `Add rule`
- For `Type`, choose `All traffic`
- For `Source type`, choose `Custom` and paste the security group ID
- Choose `Add rule`
- For `Type`, choose `SSH`
- For `Source type`, choose `Anywhere-IPv4`
- Choose `Save rules`

When creating a new Batch compute environment for your multi-node jobs, attach this security group, which will require the compute environment to be in the same VPC as the security group. 

#### EC2 instances and GPU considerations
When you pick the instance types you want in your AWS Batch compute environment, you will need to select the desired type of EC2 instances. Many use cases, such as distributed training, call for GPU instances, so you will need to select from the [GPU-enabled EC2 instance menu](https://docs.aws.amazon.com/dlami/latest/devguide/gpu.html).

[Optional] Advanced use cases may also call for AWS HPC features like attaching [Elastic Fabric Adapter (EFA)](https://aws.amazon.com/hpc/efa/) network interfaces to the instances. This requires special handling at this stage - selecting the right instances and AMI configuration - which is beyond the scope of this document. Please refer to the AWS documentation and [reach out to the Outerbounds team](http://slack.outerbounds.co/) if you need help.

#### Configure a Cluster Placement Group
[Optional, highly recommended] Create a cluster placement group for your Batch compute environment in a single Availability Zone and associate it with your compute resources. See the [AWS documentation](https://docs.aws.amazon.com/batch/latest/userguide/multi-node-parallel-jobs.html#mnp-ce). 

The reason to do this is that latency between nodes is much faster when all worker nodes are in the same AWS Availability Zone, which will not necessarily happen without a Cluster Placement Group.

#### Intranode communication with shared memory
AWS Batch has a parameter called `shared_memory` that allows multiple processors on the same compute node to communicate using a memory (RAM) portion that is shared. _This feature works independently of the multi-node setting_, but can have additive benefits. This value can be tuned to your applications, and this [AWS blog](https://aws.amazon.com/blogs/compute/using-shared-memory-for-low-latency-intra-node-communication-in-aws-batch/) suggests a reasonable starting value of 4096 MB for most cases. In Metaflow, you can set this value like any other argument to the batch decorator:

```python
from metaflow import FlowSpec, step, resources

class SharedMemory(FlowSpec):

    @step
    def start(self):
        self.next(self.train, num_parallel=2)

   @parallel
   @batch(cpu=4, gpu=1, shared_memory=4096)
   @step
    def train(self):
        ...
        self.next(self.join)

    @step
    def join(self, inputs):
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    SharedMemory()
```

### Kubernetes
Multi-node support for Metaflow tasks run on Kubernetes clusters is a work-in-progress. Please reach us on [Slack](http://slack.outerbounds.co/) to access the latest experimental implementation and/or co-develop it with the Outerbounds team.