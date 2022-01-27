# Terraform Deployment

Metaflow ships with a [Terraform template](https://github.com/outerbounds/terraform-aws-metaflow) that automates the deployment of all the AWS resources needed to enable cloud-scaling in Metaflow.

The major components of the template are:

* **Amazon S3** - A dedicated private bucket and all appropriate permissions to serve as a centralized storage backend.
* **AWS Batch** - A dedicated AWS Batch Compute Environment and Job Queue to extend Metaflow's compute capabilities to the cloud.
* **Amazon CloudWatch** - Configuration to store and manage AWS Batch job execution logs.
* **AWS Step Functions** - A dedicated role to allow scheduling Metaflow flows on AWS Step Functions.
* **Amazon Event Bridge** - A dedicated role to allow time-based triggers for Metaflow flows configures on AWS Step Functions.
* **Amazon DynamoDB** - A dedicated Amazon DynamoDB table for tracking certain step executions on AWS Step Functions.
* **Amazon Sagemaker** - An Amazon Sagemaker Notebook instance for interfacing with Metaflow flows.
* **AWS Fargate and Amazon Relational Database Service** - A Metadata service running on AWS Fargate with a PostGres DB on Amazon Relational Database Service to log flow execution metadata.
* **Amazon API Gateway** -  A dedicated TLS termination point and an optional point of basic API authentication via key to provide secure, encrypted access to metadata service.
* **Amazon VPC Networking** - A VPC with (2) customizable subnets and Internet connectivity.
* **AWS Identity and Access Management** - Dedicated roles obeying "principle of least privilege" access to resources such as AWS Batch and Amazon Sagemaker Notebook instances.
* **AWS Lambda** _-_ An AWS Lambda function that automates any migrations needed for the Metadata service.

To deploy the template, just follow the instructions listed [here](https://github.com/outerbounds/metaflow-tools/blob/master/aws/terraform/README.md).
