# Deployment Guide

This document outlines how to deploy AWS resources for Metaflow's AWS integrations and configure your Metaflow installation to interact with these resources.

## Configuring Metaflow

Metaflow comes bundled with [first-class support for various services on AWS](../metaflow-on-aws.md). You can [install](https://docs.metaflow.org/getting-started/install) Metaflow directly from [PyPI](https://pypi.org/project/metaflow/) and [conda-forge](https://anaconda.org/conda-forge/metaflow). To configure Metaflow's AWS service integrations on your workstation, you can simply type:

```text
metaflow configure aws
```

This will launch an interactive workflow and prompt you for various resource parameters like Amazon S3 Bucket \(for storage\), AWS Batch Job Queue \(for compute\), etc. The precise set of parameters that this workflow will ask for depends on the capabilities that you want to enable. For example, you can choose to use Amazon S3 as your storage backend, without any need to configure AWS Batch for compute, if you intend to execute all your workloads locally.

### Named Profiles

The `configure` command supports named profiles. You can create multiple configurations, each of them pointing to a different set of AWS resources by using the `--profile` flag. For example, the following command creates a named profile `my-profile` :

```text
metaflow configure aws --profile my-profile
```

You can enable this profile by simply exporting `METAFLOW_PROFILE=my-profile` to your environment.

## Deploying AWS resources

We understand that deploying and configuring AWS resources can often be non-trivial. To address that, we have an [AWS CloudFormation template](aws-cloudformation-deployment.md) that completely automates the entire process of standing up all AWS resources needed by Metaflow. 

{% page-ref page="aws-cloudformation-deployment.md" %}

We also understand that at times, for various organizational reasons, you might not be comfortable deploying an external CloudFormation template within your AWS account. To that end, we have also listed steps that can help you set up all the AWS resources needed [manually via the AWS console](manual-deployment.md). 

{% page-ref page="manual-deployment.md" %}

We have an [open GitHub issue for Terraform support](https://github.com/Netflix/metaflow/issues/38) if you are interested in contributing.

 

