
# Using AWS Batch

Here are some useful tips and tricks related to running Metaflow on AWS Batch. See our
engineering resources for additional information about [setting up and operating AWS
Batch for Metaflow](https://outerbounds.com/docs/engineering-welcome/).

## What value of `@timeout` should I set?

Metaflow sets a default timeout of 5 days so that you tasks don't get stuck infinitely
while running on AWS Batch. For more details on how to use `@timeout` please read
[this.](../failures.md#timing-out-with-the-timeout-decorator)

## How much `@resources` can I request?

Here are the current defaults for different resource types:

* `cpu`: 1
* `memory`: 4000 \(4GB\)

When setting `@resources`, keep in mind the configuration of your AWS Batch Compute
Environment. Your job will be stuck in a `RUNNABLE` state if AWS is unable to provision
the requested resources. Additionally, as a good measure, don't request more resources
than what your workflow actually needs. On the other hand, never optimize resources
prematurely.

You can place your AWS Batch task in a specific queue by using the `queue` argument. By
default, all tasks execute on a vanilla [python docker
image](https://hub.docker.com/_/python/) corresponding to the version of Python
interpreter used to launch the flow and can be overridden using the `image` argument.

You can also specify the resource requirements on command line as well:

```bash
$ python BigSum.py run --with batch:cpu=4,memory=10000,queue=default,image=ubuntu:latest
```

## My job is stuck in `RUNNABLE` state. What do I do?

Consult [this
article](https://docs.aws.amazon.com/batch/latest/userguide/troubleshooting.html#job_stuck_in_runnable).

## Listing and killing AWS Batch tasks

If you interrupt a Metaflow run, any AWS Batch tasks launched by the run get killed by
Metaflow automatically. Even if something went wrong during the final cleanup, the tasks
will finish and die eventually, at the latest when they hit the maximum time allowed for
an AWS Batch task.

If you want to make sure you have no AWS Batch tasks running, or you want to manage them
manually, you can use the `batch list` and `batch kill` commands.

You can easily see what AWS Batch tasks were launched by your latest run with

```bash
$ python myflow.py batch list
```

You can kill the tasks started by the latest run with

```bash
$ python myflow.py batch kill
```

If you have started multiple runs, you can make sure there are no orphaned tasks still
running with

```bash
$ python myflow.py batch list --my-runs
```

You can kill the tasks started by the latest run with

```bash
$ python myflow.py batch kill --my-runs
```

If you see multiple runs running, you can cherry-pick a specific job, e.g. 456, to be
killed as follows

```bash
$ python myflow.py batch kill --run-id 456
```

If you are working with another person, you can see and kill their tasks related to this
flow with

```bash
$ python myflow.py batch kill --user willsmith
```

Note that all the above commands only affect the flow defined in your script. You can
work on many flows in parallel and be confident that `kill` kills tasks only related to
the flow you called `kill` with. 

## Accessing AWS Batch logs

As a convenience feature, you can also see the logs of any past step as follows:

```bash
$ python bigsum.py logs 15/end
```


## Disk space

You can request higher disk space on AWS Batch instances by using an unmanaged Compute
Environment with a custom AMI.