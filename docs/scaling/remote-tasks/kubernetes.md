# Using Kubernetes

Here are some useful tips and tricks related to running Metaflow on Kubernetes. See our engineering resources for additional information about [setting up and operating Kubernetes for Metaflow](https://outerbounds.com/docs/engineering-welcome/).

## What value of `@timeout` should I set?

Metaflow sets a default timeout of 5 days so that you tasks don't get stuck infinitely while running on Kubernetes. For more details on how to use `@timeout` please read [this.](../failures.md#timing-out-with-timeout-decorator)

## How much `@resources` can I request?

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

## Accessing Kubernetes logs

As a convenience feature, you can also see the logs of any past step as follows:

```bash
$ python bigsum.py logs 15/end
```

## Disk space

You can request higher disk space for pods by using the `disk` attribute of `@kubernetes`.
