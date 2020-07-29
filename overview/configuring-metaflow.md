# Configuring Metaflow

The client-side of Metaflow, the Metaflow library, needs to be aware of the surrounding services. This is accomplished with a central, user-specific configuration file \(or several\) which are stored in the user's home directory at `~/.metaflowconfig/`. As of today, Metaflow supports shared mode configuration only for AWS, so we use AWS as an example below.

To configure Metaflow's AWS service integrations in a development environment, you can simply type:

```text
metaflow configure aws
```

This will launch an interactive workflow and prompt you for various resource parameters like Amazon S3 Bucket \(for storage\), AWS Batch Job Queue \(for compute\), etc. The precise set of parameters that this workflow will ask for depends on the capabilities that you want to enable. For example, you can choose to use Amazon S3 as your storage backend, without any need to configure AWS Batch for compute, if you intend to execute all your workloads locally. 

All the specified parameters are stored as a JSON file and read before any Metaflow execution - 

```python
{
    "METAFLOW_BATCH_CONTAINER_REGISTRY": "...",
    "METAFLOW_BATCH_JOB_QUEUE": "...",
    "METAFLOW_DATASTORE_SYSROOT_S3": "...",
    "METAFLOW_ECS_S3_ACCESS_IAM_ROLE": "...",
    "METAFLOW_EVENTS_SFN_ACCESS_IAM_ROLE": "...",
    "METAFLOW_SERVICE_URL": "...",
    "METAFLOW_SFN_IAM_ROLE": "...",
    "...": "..."
}
```

You can override any of the parameters by exporting them to your environment -

```text
METAFLOW_JOB_QUEUE_NAME=my-queue python myflow.py run --with batch
```

This will execute all steps of your flow in the `my-queue` AWS Batch job queue irrespective of what was configured in the JSON file.

### Named Profiles

The `configure` command supports named profiles. You can create multiple configurations, each of them pointing to a different set of AWS resources by using the `--profile` flag. For example, the following command creates a named profile `my-profile` :

```text
metaflow configure aws --profile my-profile
```

You can enable this profile by simply exporting `METAFLOW_PROFILE=my-profile` to your environment.

