# Deploying to AWS

Metaflow comes bundled with [first class support for various services on AWS](metaflow-on-aws.md#amazon-web-services). This guide gives a walk-through of how to configure Metaflow in your own AWS account. 

To get Metaflow up and running in your AWS account, configuration needs to be instrumented for :

| Service | AWS |
| :--- | :--- |
| **Datastore** | [S3](https://aws.amazon.com/s3/) |
| **Compute** | [Batch](https://aws.amazon.com/batch/) |
| **Metadata** | [Metaflow Metadata Service](https://github.com/Netflix/metaflow-service) / [RDS](https://aws.amazon.com/rds/) |

You can mix and match these services, Metaflow places no requirements that all of these be stood up. Currently, the only limitation Metaflow places is that S3 as Datastore be configured if you intend to use AWS Batch as your Compute service. The following sections walk you through how to stand up these services and configure Metaflow to use them as well as a [CloudFormation template](deploy-to-aws.md#cloudformation-template) to automate this process:

## Datastore: S3

Metaflow stores all data artifacts, code packages and library dependencies in [S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html). Minimally, you need to [create at least one S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) to store these objects. 

### [Configuration parameters](https://github.com/Netflix/metaflow/blob/master/metaflow/metaflow_config.py)

#### `METAFLOW_DATASTORE_SYSROOT_S3` \[Required\]

S3 bucket and prefix used by Metaflow to store data artifacts and code packages.

#### `METAFLOW_DATATOOLS_S3ROOT` \[Optional\]

S3 bucket and prefix used by metaflow.S3 to store data objects. Defaults to `$METAFLOW_DATASTORE_SYSROOT_S3/data`.

#### `METAFLOW_CONDA_PACKAGE_S3ROOT` \[Optional\]

S3 bucket and prefix used by Metaflow to store conda packages. Defaults to `$METAFLOW_DATASTORE_SYSROOT_S3/conda`.

#### `METAFLOW_S3_ENDPOINT_URL` \[Optional\]

Allows you to specify the `endpoint_url` parameter for Boto \(see [here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html#boto3.session.Session.client)\).

## Compute: Batch

To orchestrate compute on [Batch](https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html), you need to minimally create [a Compute Environment](https://docs.aws.amazon.com/batch/latest/userguide/create-compute-environment.html), [a Job Queue](https://docs.aws.amazon.com/batch/latest/userguide/create-job-queue.html) and [an IAM role](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#create_task_iam_policy_and_role) that allows the Batch container to access [your S3 bucket](deploy-to-aws.md#datastore-s3) \(`ListBucket`, `PutObject`, `GetObject`, `DeleteObject`\) as well as any other AWS services your user code might interface with \(e.g, allowing `PassRole` privileges to sagemaker services\).

### [Configuration parameters](https://github.com/Netflix/metaflow/blob/master/metaflow/metaflow_config.py)

#### `METAFLOW_BATCH_JOB_QUEUE` \[Required\]

Batch job queue for Metaflow to place jobs on.

#### `METAFLOW_ECS_S3_ACCESS_IAM_ROLE` \[Required\]

IAM role allowing Batch ECS tasks to access S3 and other AWS services.

#### `METAFLOW_BATCH_CONTAINER_IMAGE` \[Optional\]

Default Docker container image to execute Batch tasks on. Defaults to [Python image](https://hub.docker.com/_/python/) corresponding to the `major.minor` version of the Python interpreter running the flow.

#### `METAFLOW_BATCH_CONTAINER_REGISTRY` \[Optional\]

Default Docker container registry to pull container images from. Defaults to [docker hub](https://hub.docker.com/).

## Metadata: Metaflow Service

The [metaflow service](http://github.com/netflix/metaflow-service) is a simple [aiohttp](https://aiohttp.readthedocs.io/en/stable/) service on top of an RDS instance. To set it up, follow these steps:

### Create VPC

![1. Launch VPC Wizard.](https://lh6.googleusercontent.com/jcUMyAC8SDn6wxiJ5NXNzL8S-HEQ0P48b3gzzxRmrFJ4Jx_AmgAKtiqttHFSuaFmVPZ8dG_QHySNlEK9yJi_0VvJEufFzI4Hr9guKfddPLwDpN9tnbrpioAMc181rThtOY3MYVwQ)

![2. Create a VPC with Single Public Subnet. Note the ID for subsequent steps.](https://lh5.googleusercontent.com/v0fpwwpnvSsKJcqt8k9Fm64bRylIf1pNKKRYXqhw9IOw7dWoVK-Hi7d3qvglSEau8rdmKVwh32ca1jbGaVifxFE_-Lx8x-DadDLIXjABNp2cAX75PSVj8U0pxDV9SaPDTVahfR1A)

![3. Go to Subnets and create a second Subnet.](https://lh3.googleusercontent.com/xPx6xGU6fcd3b98TTitCj10WSTNlYD0_cfD_eeZCABveaWaqrWjZAq66jfW9ncDKhMPonDv8pItGoROWq2fHQ108GPxx_aRbE8zERRk15j4lEeiLlcKvVHa8-OQ0xfKQSqAyobYn)

![4. Add to the Route Table](https://lh5.googleusercontent.com/Txv6RweUwTlZwX3fUdbhn_JgmPPDRDSFQTFHzdfQFpMGrG3IZOE4sKGCa-hDwmFN3X6F0wfXpo2p1kmmzk6H0USVEOZaO6-t3Vx4hhuXQ264MX-6C4wjBdFH3vNz0T7UbWAwpi3s)

### Create Security Groups

Select EC2 from services

Navigate to Security Groups from left pane

![](../.gitbook/assets/screen-shot-2020-04-06-at-10.42.53-am.png)

Select vpc that was created in the previous step from drop down

**Create ECS Security Group**

This security group will allow inbound api access to metadata service

Add rule to make port 8080 accessible

![](../.gitbook/assets/screen-shot-2020-04-06-at-2.51.58-pm.png)

Record ecs security group id for use in next step

**Create RDS security group**

Create another security group within same vpc. This group will be used to allow postgres access from ECS \(i.e. allow the metadata service to read from the DB\)

Add rule to make port 5432 accessible \(type postgres\) and attach to ECS security group

![](../.gitbook/assets/screen-shot-2020-04-06-at-3.15.29-pm.png)

### Create RDS

Note: Currently we only support Postgres as the backend DB



![1. Create DB Subnet Group](https://lh6.googleusercontent.com/15Cq-B-nixgUc9s3gs1ue5IJKGMJoaBlT6tlCBq88LOHkaOQ2FprYzXBgzgviHIw12-DgPwrAShNJMTTgayFpVM0xInFrIGks5xz-APdpKlrgRquBJRjKcRvYGdGmokK4cKq2YB5)

![2. Create RDS instance](https://lh5.googleusercontent.com/gAaTCnTzpryGhMnj3-JGnmHtoDa77limKTkBPmqUgoN-odrc4VPkiiGyYnHiN6wU0jn0cZRtqR_G7cAkAVcTbT9TWsS5ZSkO16R1IxvyIMr22LGuZQcEusmH3n3g7OsSRkeHo6-H)

![](https://lh6.googleusercontent.com/v__yk3IeFxdiZmzvCyTgbn9QoPKv0AP-7hjiauMPFq9VD38fXCSgWLFxsuNB340pyJ-ji4V5Koywf3gjDIo67Q7lOUEHZZLjaCcKjQMlWX_tQT1jmNpeD0HhClsLvFNnVI3pw7V7)

![](https://lh3.googleusercontent.com/O6qTrI7LAG5FyiPrl4pbQ1Xq18RMmTLP-E8d1hNVDm4PQhe7x6o4HYDwEJgUX4homOOxnNn6DHAkH1UtjvJwM8mslHMf4SmKlQvPVIpp34wvWXRxVxS-0dCOUDl_U6wuWCxhf2Bu)

![](https://lh5.googleusercontent.com/cMaCoBmHIchDHXidmkw8mUvlOfBG5tuwHpv71hq5ozmf4EuRL95lXLkJIPdXLPuDSka1dcM6BFInhjY3qc32Na1ZYDteuXBkJd1abzvpKfDYfCD-Ee-8NjZDZCIXbyAewpPVOsO_)

under "Additional connectivity configuration" add the security group that was previously created \(ECS -&gt; 5432\)

![](../.gitbook/assets/screen-shot-2020-04-06-at-3.43.55-pm.png)

Finally under "Additional Configuration" at the bottom of the page. Configure the initial database name. By default the Metadata Service expects the db name to be "metaflow". Although this is configurable via environment variables.

![](../.gitbook/assets/screen-shot-2020-04-06-at-3.43.12-pm.png)

### Create ECS Service Cluster

![1. Set up a cluster using Fargate](https://lh6.googleusercontent.com/L9ldq4TsC1kyfDHlNCpv7NOqX6i1QDz118AX2thKqtKnKd3oKuaLMiiavNL41B4HzHRPtMDoH8hcQogWS4ZzCyOymtSoAVjovgNKn0F6Ocp3qfzeTDRdZ8oQJsJ59kajeMsPlwVk)

![](https://lh4.googleusercontent.com/AaqphD-QYapo3vHn96ZC3iHwOYLBXtWxyM7MDuuoqjEtVMsIiUoyI68rN8lsnHHNcsf9IU8yXJ3L_QdmpxCGuK987r411dP6zPfvpoXZgrgl3AGOJTx0ItXyIUnYdRGWGhudMbEf)

### Set up ECS Task Definition

![1. Use Fargate template for Task definition](https://lh5.googleusercontent.com/Ab-pnS9MTXqMbyp12QuZPyzic4_fYzZm-YlBQ7uZCcN9BiXiylTMHPhzBeMfRkGPm6iXyxfQx4efqNIgG6KdtRbNrPTQx5QIgmd0xf2M1gIMhjXl8kiDKQfTE5FYwkoBTMHpzoUA)

![](https://lh3.googleusercontent.com/UdyNLGbPsE710D9PHaWUSvkxfEXb1SbDxv5V9O4BrnSeWsTihCALvj_JHEiAN2MCuPq9c_TznlMYuHrwxAQrENfBAbd6GSQ0tVEneorK6Vi965PhNpGbQZlemqpFJfkVi5dNo4BG)





![](https://lh6.googleusercontent.com/Ol78Io994kZnr358VGo8RjOWV7j4e2z1m_ZarRNTRS5OPNIJ9Zgbk1rpWGKRD8fHmHw9Ud8ZhKuc5K_RE-dxy49q9_auWy59fnEef-qkKsyKcBxwTjC_yT51edxWpqtP2tMbUG8A)

![2. Note the environment variables needed.](https://lh4.googleusercontent.com/SRf3NxB1FDRJKf1TnJHvrynWLBkAxvGxG4ksw9zY08YYYl-098IDTnnoimWMoapmPq-l5gNrVdbCevHBKTbtoJtz_E03Lj_ke0zvhaIgZjmyTtj_FnaM4wr0lkpAo3Tusj0MrDgQ)

![](https://lh5.googleusercontent.com/loTHbqB0DK1erIzLbtdBWPbozuXhhi5axxjxZ0c6aa_vF5uZ43tK0OfpooPeqWNITcJV_VMdFvoURQlSJhf1uEE9GmMDT--H9jpeZaX2let7BbM_07-Vpr11GUWGGBsquef6WAkC)

### Create Metaflow Service

![1. Navigate to ECS in console, select Create from Services tab and select Task Definition created previously.](https://lh5.googleusercontent.com/e9JFgTVPn01LX0aJu2zOX_5n5kOJYbslflbclXOYOCHm5r5eWEkkz6CtZifq4GWM8hj7xfZ1N_Vo2HfJTEf1Th8j1yBuwLEUl_QFYf_gCOmOvNUtSpL2nl5VsHtZruBmj0tA5J3G)

Note: Be sure to select security group created in previous step \([0.0.0.0/0](http://0.0.0.0/0) -&gt; 8080\)

![2. Select VPC created previously and add both the Subnets created previously as well. Optionally configure a LoadBalancer if needed.](https://lh3.googleusercontent.com/2wP2xZWDwjN26UTBSvSt6wmuKrZFiher7K0JDWC1T5iSARDJ5i-zxkNNqva2I2dv8PTxJJr_C2rvhygsZNddkYZVjVG_ulFMLctekgayVv55HWVOSW_7VyVqrt19AW5QRxpXhrl7)

![3. Choose Autoscaling if needed.](https://lh5.googleusercontent.com/mGnapAbbB6FLlBzFtQfZ3N7m6OE3ylVuNXQIQqeBeoSDW0X0FmuDocw2Oyzzp9VvKxpLJwSdsj07Wr-p2IE6MAEZeXM43UXrBsowVJzRjao3uXCWidgXzoeYbeZuFH8Y2Y8jUWES)

![4. Review and Confirm.](https://lh3.googleusercontent.com/Hi_KPq9kQO9tLVKFtfEP_GpUCl2Ar3xhAylnmtttdbi_B-RBf_nJoPjo1k1g3CAAfckpwnJXn8Qyu9VsVhFWXVho6Ect2eC5rICbwIFfWhYVruUpH-lI-HihUiEJeEyiF_bGyEZa)

![](https://lh4.googleusercontent.com/qfD3CaYtlaDafUTTd_U9WuwCbYPwsA8A6YBw_hbXDexvxkEbS-Qwi_3mwRn5CrplVPScy0oFUbcGCMgOMGirYS7C_2SOiclB5KiSjeIJnPnUcv9OKJFSnaUftI2sUj81MI05CyLO)

### [Configuration parameters](https://github.com/Netflix/metaflow/blob/master/metaflow/metaflow_config.py)

#### `METAFLOW_SERVICE_URL` \[Required\]

URL to the Metaflow service.

## CloudFormation Template

We understand that setting up these services manually and getting all the permissions right can be complicated at times; that is why we bundle in a [CloudFormation template](https://github.com/Netflix/metaflow-tools/tree/master/aws/cloudformation) to automate setting up these services on AWS. This template can be used both within [CloudFormation](https://aws.amazon.com/cloudformation/) as well as [ServiceCatalog](https://aws.amazon.com/servicecatalog/) for provisioning resources.

## Configuring Metaflow

Metaflow can be configured via CLI :

```bash
metaflow configure aws
```

Additionally, any of the specified configuration parameters can be overridden by specifying them as environment variables.

