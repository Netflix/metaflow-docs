# @batch

<!-- WARNING: THIS FILE WAS AUTOGENERATED! DO NOT EDIT! Instead, edit the notebook w/the location & name as this file. -->

The `@batch` decorator sends a step for execution on the [AWS Batch](https://aws.amazon.com/batch/) compute layer. For more information, see [Executing Tasks Remotely](/scaling/remote-tasks/introduction).

Note that while `@batch` doesn't allow mounting arbitrary disk volumes on the fly, you can create in-memory filesystems easily with `tmpfs` options. For more details, see [using `metaflow.S3` for in-memory processing](/scaling/data#using-metaflows3-for-in-memory-processing).


<DocSection type="decorator" name="batch" module="metaflow" show_import="True" heading_level="3" link="https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/aws/batch/batch_decorator.py#L34">
<SigArgSection>
<SigArg name="..." />
</SigArgSection>
<Description summary="Specifies that this step should execute on [AWS Batch](https://aws.amazon.com/batch/)." />
<ParamSection name="Parameters">
	<Parameter name="cpu" type="int, default: 1" desc="Number of CPUs required for this step. If `@resources` is\nalso present, the maximum value from all decorators is used." />
	<Parameter name="gpu" type="int, default: 0" desc="Number of GPUs required for this step. If `@resources` is\nalso present, the maximum value from all decorators is used." />
	<Parameter name="memory" type="int, default: 4096" desc="Memory size (in MB) required for this step. If\n`@resources` is also present, the maximum value from all decorators is\nused." />
	<Parameter name="image" type="str, optional" desc="Docker image to use when launching on AWS Batch. If not specified, and\nMETAFLOW_BATCH_CONTAINER_IMAGE is specified, that image is used. If\nnot, a default Docker image mapping to the current version of Python is used." />
	<Parameter name="queue" type="str, default: METAFLOW_BATCH_JOB_QUEUE" desc="AWS Batch Job Queue to submit the job to." />
	<Parameter name="iam_role" type="str, default: METAFLOW_ECS_S3_ACCESS_IAM_ROLE" desc="AWS IAM role that AWS Batch container uses to access AWS cloud resources." />
	<Parameter name="execution_role" type="str, default: METAFLOW_ECS_FARGATE_EXECUTION_ROLE" desc="AWS IAM role that AWS Batch can use [to trigger AWS Fargate tasks]\n(https://docs.aws.amazon.com/batch/latest/userguide/execution-IAM-role.html)." />
	<Parameter name="shared_memory" type="int, optional" desc="The value for the size (in MiB) of the /dev/shm volume for this step.\nThis parameter maps to the `--shm-size` option in Docker." />
	<Parameter name="max_swap" type="int, optional" desc="The total amount of swap memory (in MiB) a container can use for this\nstep. This parameter is translated to the `--memory-swap` option in\nDocker where the value is the sum of the container memory plus the\n`max_swap` value." />
	<Parameter name="swappiness" type="int, optional" desc="This allows you to tune memory swappiness behavior for this step.\nA swappiness value of 0 causes swapping not to happen unless absolutely\nnecessary. A swappiness value of 100 causes pages to be swapped very\naggressively. Accepted values are whole numbers between 0 and 100." />
	<Parameter name="use_tmpfs: bool, default: False" desc="This enables an explicit tmpfs mount for this step." />
	<Parameter name="tmpfs_tempdir: bool, default: True" desc="sets METAFLOW_TEMPDIR to tmpfs_path if set for this step." />
	<Parameter name="tmpfs_size: int, optional" desc="The value for the size (in MiB) of the tmpfs mount for this step.\nThis parameter maps to the `--tmpfs` option in Docker. Defaults to 50% of the\nmemory allocated for this step." />
	<Parameter name="tmpfs_path: string, optional" desc="Path to tmpfs mount for this step. Defaults to /metaflow_temp." />
	<Parameter name="inferentia" type="int, default: 0" desc="Number of Inferentia chips required for this step." />
	<Parameter name="efa: int, default: 0" desc="Number of elastic fabric adapter network devices to attach to container" />
</ParamSection>
</DocSection>
