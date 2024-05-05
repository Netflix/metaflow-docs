# Using Kubernetes

Here are some useful tips and tricks related to running Metaflow on Kubernetes. See our
engineering resources for additional information about [setting up and operating
Kubernetes for Metaflow](https://outerbounds.com/docs/engineering-welcome/).

## What value of `@timeout` should I set?

Metaflow sets a default timeout of 5 days so that you tasks don't get stuck infinitely
while running on Kubernetes. For more details on how to use `@timeout` please read
[this.](../failures.md#timing-out-with-the-timeout-decorator)

## How much `@resources` can I request?

Here are the current defaults for different resource types:

* `cpu`: 1
* `memory`: 4096 \(4GB\)
* `disk`: 10240 \(10GB\)

When setting `@resources`, keep in mind the configuration of your Kubernetes cluster.
Your pod will be stuck in an unschedulable state if Kubernetes is unable to provision
the requested resources. Additionally, as a good measure, don't request more resources
than what your workflow actually needs. On the other hand, never optimize resources
prematurely.

You can place your Kubernetes pod in a specific namespace by using the `namespace`
argument. By default, all pods execute on a vanilla [python docker
image](https://hub.docker.com/_/python/) corresponding to the version of Python
interpreter used to launch the flow and can be overridden using the `image` argument.

You can also specify the resource requirements on command line as well:

```bash
$ python BigSum.py run --with kubernetes:cpu=4,memory=10000,namespace=foo,image=ubuntu:latest
```

## How to configure GPUs for Kubernetes?

Metaflow compute tasks can run on any Kubernetes cluster. For starters, take a
look at the [Kubernetes documentation on Scheduling
GPUs](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/). The guide explains how to
install [Kubernetes Device
Plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/)
so your cluster exposes a custom schedulable resource such as `amd.com/gpu` or `nvidia.com/gpu`,
which Metaflow’s Kubernetes resources integration is already configured to call when a user
specifies a decorator like `@kubernetes(gpu=1)`. 

For additional information, take a look at cloud-specific documentation:

- **Amazon Web Services EKS**
Amazon has prepared the [EKS-optimized accelerated Amazon Linux AMIs](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html#gpu-ami). Read the linked guide to install the hardware dependencies and choose the AMI you want to run on your GPU node group. You will need to make the suggested modifications to the [Kubernetes cluster deployed as part of your Metaflow AWS deployment](https://github.com/outerbounds/terraform-aws-metaflow/blob/master/examples/eks_argo/eks.tf).

- **Google Cloud Platform GKE**
Read GCP’s guide about [GPUs on GKE](https://cloud.google.com/kubernetes-engine/docs/concepts/gpus). You will need to make the suggested modifications to the [Kubernetes cluster deployed as part of your Metaflow GCP deployment](https://github.com/outerbounds/metaflow-tools/blob/master/gcp/terraform/infra/kubernetes.tf).

- **Microsoft Azure AKS**
Read Azure’s guide about [GPUs on AKS](https://learn.microsoft.com/en-us/azure/aks/gpu-cluster). You will need to make the suggested modifications to the [Kubernetes cluster deployed as part of your Metaflow Azure deployment](https://github.com/outerbounds/metaflow-tools/blob/master/azure/terraform/infra/kubernetes.tf).

Reach out to [Metaflow Slack channel](http://chat.metaflow.org) if you need help setting up a cluster.

## A `@kubernetes` task has been stuck in `PENDING` forever. What should I do?

Are the resources requested in your Metaflow code/command sufficient? Especially when
using custom GPU images, you might need to increase the requested memory to pull the
container image into your compute environment.

## Accessing Kubernetes logs

As a convenience feature, you can also see the logs of any past step as follows:

```bash
$ python bigsum.py logs 15/end
```

## Disk space

You can request higher disk space for pods by using the `disk` attribute of
`@kubernetes`.
