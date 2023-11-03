# Using GPUs

Metaflow allows access to GPUs on your local workstation, [AWS Batch](/scaling/remote-tasks/aws-batch), or [Kubernetes](/scaling/remote-tasks/kubernetes) cluster with the change of a few characters in your Python code or Metaflow run command. By changing parameters in either of these ways, Metaflow tasks can run on:
- Single GPUs
- Single instances with many GPUs
- Many instances with single GPUs (see: [Running Multi-node Tasks](./multi-node.md))
- Many instances with many GPUs (see: [Running Multi-node Tasks](./multi-node.md))

This page provides a collection of tips for how to do the above, and how to configure your GPU environments to use other Metaflow features that make these workflows more robust and portable. 

## Requesting GPUs in Metaflow steps
Whether running in a local workstation or [executing tasks remotely](https://docs.metaflow.org/scaling/remote-tasks/introduction), when requesting resources with Metaflow, you can use the `@resources` decorator to change properties of the compute environment like the amount of memory and number of CPUs and GPUs (the purpose of this page) contributing to the task. 

Consider this flow, where the start step calls the `my_gpu_routine` function on 1 GPU.
```python
# generic_gpu_routine.py
from metaflow import FlowSpec, step, resources

class GPUFlow(FlowSpec):

    @resources(memory=32000, cpu=4, gpu=1)
    @step
    def start(self):
        from my_script import my_gpu_routine
        my_gpu_routine()
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    GPUFlow()
```

## Preparing compute environments for GPU scheduling
In order to enable the end user experience shown above, the Metaflow admin needs to set up their cluster to run GPU jobs.

### AWS Batch

This section assumes that you have a basic familiarity with deploying Metaflow. If you have never done this or want a refresher, please see [this guide to deploying Metaflow](https://outerbounds.com/engineering/welcome/) or directly inspect [this repository](https://github.com/outerbounds/metaflow-tools/) that shows various ways to deploy Metaflow.

To use GPUs in your Metaflow tasks that run on AWS Batch, you need to run the flow in a [Job Queue](https://docs.aws.amazon.com/batch/latest/userguide/job_queues.html) that is attached to a [Compute Environment](https://docs.aws.amazon.com/batch/latest/userguide/compute_environments.html) with GPU instances.

To set this up, you can either modify the allowable instances in a [Metaflow AWS deployment template](https://github.com/outerbounds/metaflow-tools/tree/master/aws) or manually modify an existing deployment from the AWS console. The steps are:

1. Create a compute environment with GPU-enabled EC2 instances.
2. Attach the compute environment to a new Job Queue - for example named `my-gpu-queue`. 
3. Run a flow with a GPU task in the `my-gpu-queue` job queue by
    - setting the `METAFLOW_BATCH_JOB_QUEUE` environment variable, or
    - setting the `METAFLOW_BATCH_JOB_QUEUE` value in your Metaflow config, or 
    - (most explicit) setting the `queue` parameter in the `@batch` decorator.

:::note
It is a good practice to separate the job queues that you run GPU tasks on from those that do not require GPUs.

This makes it easier to track GPU workflows, which can be costly, independent of other workflows. 
:::


Here is a sample workflow showing how to declare the Batch queue in the most explicit way:
```python
# gpu_flow_on_aws_batch.py
from metaflow import FlowSpec, step, batch

class GPUBatchFlow(FlowSpec):

    @batch(memory=32000, cpu=4, gpu=1, queue=”my-gpu-queue”)
    @step
    def start(self):
        from my_script import my_gpu_routine
        my_gpu_routine()
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    GPUBatchFlow()
```

### Kubernetes
Metaflow compute tasks can run on any Kubernetes cluster. You can use this section to help set up GPU nodes in your Kubernetes cluster, but it is not intended to be a complete guide. It is meant to help you:
1. understand GPU requirements in a Kubernetes cluster and how they relate to how Metaflow users declare a task needs GPUs, and
2. find resources to guide decisions around configuring nodes in Kubernetes clusters for GPU use. 

#### Device plugins for scheduling GPU pods
Metaflow tasks that run with Kubernetes as a compute backend are run as Pods. To access GPUs, Kubernetes Pods need to be configured in a special way that allows them to access specific GPU hardware features. 

If you are a Metaflow workflow developer or data scientist, you can skip ahead to the [next section](#what-resources-can-i-declare-in-metaflow-steps) of this page, unless you want to understand what happens behind the scenes. 

If you are the administrator of the Kubernetes cluster powering Metaflow tasks and are looking to enable GPU tasks, the [Kubernetes documentation on Scheduling GPUs](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/) is a good place to start. The guide explains how to install [Kubernetes Device Plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/) so your cluster exposes a custom schedulable resource such as `amd.com/gpu` or `nvidia.com/gpu`, which Metaflow’s Kubernetes resources integration is already configured to call when a user specifies a decorator like `@kubernetes(..., gpu=1, ...)`. 

The rest of this section points to additional resources for specific Kubernetes cluster providers. Each of them makes some use of the [NVIDIA Device Plugin implementation](https://github.com/NVIDIA/k8s-device-plugin), which is also suggested for Kubernetes GPU admins. 

#### Amazon Web Services EKS
Amazon has prepared the [EKS-optimized accelerated Amazon Linux AMIs](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html#gpu-ami). Read the linked guide to install the hardware dependencies and choose the AMI you want to run on your GPU node group. You will need to make the suggested modifications to the [Kubernetes cluster deployed as part of your Metaflow AWS deployment](https://github.com/outerbounds/terraform-aws-metaflow/blob/master/examples/eks_argo/eks.tf).

#### Google Cloud Platform GKE
Read GCP’s guide about [GPUs on GKE](https://cloud.google.com/kubernetes-engine/docs/concepts/gpus). You will need to make the suggested modifications to the [Kubernetes cluster deployed as part of your Metaflow GCP deployment](https://github.com/outerbounds/metaflow-tools/blob/master/gcp/terraform/infra/kubernetes.tf).

#### Microsoft Azure AKS
Read Azure’s guide about [GPUs on AKS](https://learn.microsoft.com/en-us/azure/aks/gpu-cluster). You will need to make the suggested modifications to the [Kubernetes cluster deployed as part of your Metaflow Azure deployment](https://github.com/outerbounds/metaflow-tools/blob/master/azure/terraform/infra/kubernetes.tf).

### What resources can I declare in Metaflow steps?
A potential for end-users to waste time emerges if the workflow developer does not understand what resources their Metaflow steps can declare. 
For example, you can run into problems like AWS Batch jobs being stuck in a `RUNNABLE` or `STARTING` state or Kubernetes jobs being stuck in `PENDING` state for unclear reasons if you are not aware of what machines are available in your Metaflow deployment compute environment. 

Alleviating such issues requires communication between the person who maintains the Metaflow deployment and the person who builds and runs workflows. 
Of course, these may be the same person 🦄 on smaller projects. 

Here is a suggested recipe you can iterate on with respect to this dynamic:
1. Workflow developer estimates the resources (number of CPUs, number of GPUs, amount of system RAM, etc.) needed for a single GPU task.
2. Based on the estimate in 1, someone identifies what type and how many GPUs are needed on each compute node (e.g., 4 NVIDIA A10s).
3. Based on 2, someone decides which compute instances (EC2 instances, on-premise data center VMs, etc.) to attach to a Kubernetes Node Group or AWS Batch Job Queue. 
4. The resources in the compute environments set up in step 3 determine what an end user can write in decorators like `@resources`, `@batch`, and `@kubernetes` and have their job get scheduled.

#### Common Issues

**Issue**: My `@batch` task has been stuck in `RUNNABLE` forever.  
**Check**: Does the Batch job queue you are trying to run the Metaflow task in have a compute environment with EC2 instances with the resources requested? For example, if your job queue is connected to a single compute environment that only has `p3.2xlarge` as a GPU instance, and a user requests 2 GPUs, that job will never get scheduled because `p3.2xlarge` only have 1 GPU per instance.

**Issue**: My `@batch` task has been stuck in `STARTING` forever.  
**Check**: Are the resources requested in your Metaflow code/command sufficient? Especially when using custom GPU images, you might need to increase the requested memory to pull the container image into your compute environment.

**Issue**: My `@kubernetes` task has been stuck in `PENDING` forever.  
**Check**: Are the resources requested in your Metaflow code/command sufficient? Especially when using custom GPU images, you might need to increase the requested memory to pull the container image into your compute environment.

## Preparing Python environments to run on GPUs

There are a variety of ways Metaflow allows you to [specify and version dependencies](/scaling/dependencies).
This section shares some observations and examples to get you started with each.

### Conda
When using `@conda` or `@conda_base` to run GPU Metaflow tasks, you will want to remember that you can declare Conda channels.  
Often, you will want to request packages from specific channels like the following flow outline demonstrates:
```python
from metaflow import FlowSpec, step, conda_base

@conda_base(
    libraries={
        "huggingface::transformers": "4.33.3",
        "huggingface::datasets": "2.14.5",
        "conda-forge::accelerate": "0.23.0",
        "pytorch::pytorch": "2.0.1",
        "pytorch::pytorch-cuda": "11.8",
        ...
    },
    python="3.9"
)
class CondaGPUDependencyFlow(FlowSpec):
    
    @step
    def start(self):
        ...
```

Remember that if you run workflows from a machine with a different operating system than where remote tasks run, for example launching Metaflow runs that have remote `@kubernetes` tasks from a Mac, some available dependencies and versions may not be the same for each operating system. In this case,
- you can go to the [conda-forge website](https://conda-forge.org/feedstock-outputs/) and find which package versions are available across each platform, and 
- it might help to you to use `@conda` localized to Metaflow steps, instead of `@conda_base` applied to all flow steps.

### Docker
If you make your own GPU image, we suggest building from the standard images released by a trusted GPU or framework provider. 

#### Example: Official PyTorch Images
See more tags on the [PyTorch DockerHub Registry](https://hub.docker.com/r/pytorch/pytorch).

```Dockerfile
FROM pytorch/pytorch:2.0.1-cuda11.7-cudnn8-runtime
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
...
```

#### Example: Official TensorFlow Images
See more tags on the [TensorFlow DockerHub Registry](https://hub.docker.com/r/tensorflow/tensorflow).

```Dockerfile
FROM tensorflow/tensorflow:latest-gpu
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
...
```

#### Example: AWS Deep Learning Containers (DLCs)
AWS maintains a [registry of Docker images for deep learning](https://github.com/aws/deep-learning-containers/blob/master/available_images.md), many of which have CPU and GPU versions. These can be helpful guides if your team decides to craft images for deep learning tasks to run on Metaflow.