# Deployment Guide

This document outlines how to deploy AWS resources for Metaflow's AWS integrations and configure your Metaflow installation to interact with these resources. After you have deployed the server-side on AWS, you need to [provide the corresponding configuration ](../../overview/configuring-metaflow.md)to all the users of Metaflow.

## Deploying AWS resources

We provide two alternative approaches for deploying Metaflow on AWS. The first one is the easiest approach if you are not opinionated about your AWS setup. Choose the second manual approach if you want more flexibility.

#### The simple approach: Deploy with CloudFormation

Deploying and configuring AWS resources can be non-trivial. To address that, we have an [AWS CloudFormation template](aws-cloudformation-deployment.md) that completely automates the entire process of standing up all AWS resources needed by Metaflow. 

{% page-ref page="aws-cloudformation-deployment.md" %}

#### The flexible approach: Manual deployment

We also understand that at times, for various organizational reasons, you might not be comfortable deploying an external CloudFormation template within your AWS account. To that end, we have also listed steps that can help you set up all the AWS resources needed [manually via the AWS console](manual-deployment.md). 

{% page-ref page="manual-deployment.md" %}

#### Other approaches

We have an [open GitHub issue for Terraform support](https://github.com/Netflix/metaflow/issues/38) if you are interested in contributing.

 

