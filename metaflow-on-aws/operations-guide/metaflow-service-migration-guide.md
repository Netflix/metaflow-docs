# Metaflow Service Migration Guide

## Metaflow 2.1.+

In Metaflow 2.1.0, we introduced a new AWS service integration with AWS Step Functions. Now, users of Metaflow can easily deploy their flows to AWS Step Functions. If this is a functionality that you would like to use, depending on if/when you deployed the [metaflow service](https://app.gitbook.com/@hawkins/s/metaflow-admin/~/drafts/-MDQ9c_b9eEtHKMgoQni/metaflow-on-aws/metaflow-on-aws#metadata), you might have to take some actions to upgrade your service. If while trying to [schedule your flows](www.google.com) on AWS Step Functions via :

```text
python myflow.py step-functions create
```

you ran into the following error :

![](../../.gitbook/assets/screenshot-2020-07-29-at-8.27.22-am.png)

then you would need to upgrade the deployed version of your metaflow service. This upgrade requires migration of the backing RDS instance.

In this situation, the administrator should decide if and when they want to run the migration, which will incur some downtime - up to a few minutes. As a best practice, it is advisable to take a backup of the database prior to the migration which allows you to roll back the migration in case something goes wrong.

{% hint style="info" %}
We highly recommend [taking a backup of your RDS instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html) before attempting this upgrade. This will allow you to restore the service from the backup in case there are any issues with the migration.
{% endhint %}

{% hint style="info" %}
This migration will result in a short downtime of the metaflow service. Metaflow users can guard against this downtime by using the [@retry](https://docs.metaflow.org/metaflow/failures) decorator in their flows.
{% endhint %}

To make this database migration easy, metaflow service comes with a built-in migration service. When you deploy or restart the [latest version of the metaflow service image](https://hub.docker.com/repository/docker/netflixoss/metaflow_metadata_service), the migration service will detect the schema version of the backing database, and launch the latest version of the metaflow service that is compatible with the database schema. The migration service provides hooks to upgrade the database schema to the latest version so that you can upgrade the metaflow service to the latest version.

There are two paths to upgrading your service, depending on how you first deployed the service - using our [AWS CloudFormation template](metaflow-service-migration-guide.md#aws-cloudformation-deployment) or [manually through the AWS console](metaflow-service-migration-guide.md#manual-deployment).

In addition to migrating the service, if you intend to use AWS Step Functions, you would need to update a few IAM roles and set up an Amazon DynamoDB table. The instructions below will walk you through those as well.

### AWS CloudFormation Deployment

If you originally deployed the AWS resources needed for Metaflow using our [AWS CloudFormation template](../deployment-guide/aws-cloudformation-deployment.md), then you can use AWS CloudFormation to spin up the necessary resources for this service migration. The latest version of the AWS CloudFormation template pulls the [latest version of the metaflow service image](https://hub.docker.com/repository/docker/netflixoss/metaflow_metadata_service) which comes bundled with a migration service as well as an AWS Lambda function which you can execute manually to trigger the database migration.

{% hint style="info" %}
We highly recommend [taking a backup of your RDS instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html) before attempting this upgrade. This will allow you to restore the service from the backup in case there are any issues with the migration
{% endhint %}

1. Open the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation) and choose the stack corresponding to your existing deployment.
2. Choose _Update_ and choose _Replace current template_ under _Prerequisite - Prepare template._ 
3. Choose _Upload a template file_ under _Specify template_.
4. Choose _Choose file_ and upload [this template](https://github.com/Netflix/metaflow-tools/blob/master/aws/cloudformation/metaflow-cfn-template.yml). You will have to copy the template to your laptop before you can upload it. Choose _Next._
5. Select your parameters for your deployment under _Parameters_ and choose _Next._
6. Feel free to tag your stack in whatever way best fits your organization. When finished, choose _Next._
7. The _Change set preview_ will log all the changes that this update to your CloudFormation stack will cause. If you were not already on the latest version, you will notice that there are a few additions that this update will result in - 
   1. _StepFunctionsRole -_ IAM role for AWS Step Functions
   2. _EventBridgeRole -_ IAM role for Amazon EventBridge
   3. _StepFunctionsStateDDB -_ Amazon DynamoDB table
   4. _ExecuteDBMigration_ - AWS Lamdba function for upgrading the RDS schema
   5. Updates to _BatchS3TaskRole_ and _ECSFargateService_ to allow for migration and AWS Step Functions integration.
8. Choose _I acknowledge that AWS CloudFormation might create IAM resources_ and choose _Update stack._
9. Wait for the stack to finish updating itself. This might take ~10 minutes.
10. Once the stack has updated, you would notice a new key _MigrationFunctionName_ which points to the AWS Lambda function that will upgrade your database schema. Note the name of this function.
11. Using either the [AWS Lambda console](https://console.aws.amazon.com/lambda) or AWS CLI, trigger the lambda function - 
    1. AWS Lambda console
       1. Choose the function that you just deployed in Step 10.
       2. In the dropdown for _Select a test event_, choose _Configure test events._
       3. In the resulting dialog, give a name to your event in _Event name_. The actual contents don't matter in this case. Choose _Create._
       4. Make sure you have [taken a backup of your RDS instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html) before proceeding with the next step.
       5. Choose _Test._
       6. Check the execution result. In the resulting JSON blob, you should see `upgrade-result` set to `upgrade success` and `is_up_to_date` in `final-status` set to `true`. Congratulations! You have upgraded your database schema successfully. You can skip Step 7. and now let's upgrade the version of the metaflow service.
       7. If you saw a failure, [restore your RDS instance using the backup](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html) that you had generated before. Please [get in touch](../../overview/getting-in-touch.md) with us so that we can figure out what went wrong.
    2. AWS CLI
       1. Make sure you have appropriate credentials to execute the AWS Lambda function on your laptop.
       2. Make sure you have taken a backup of your RDS instance before proceeding with the next step.
       3. Execute the command `aws lambda invoke --function-name <lambda-function-name> output.log` 
       4. Check the execution result. In the resulting JSON blob, you should see `upgrade-result` set to `upgrade success` and `is_up_to_date` in `final-status` set to `true`. Congratulations! You have upgraded your database schema successfully. You can skip Step 5. and now let's upgrade the version of the metaflow service.
       5. If you saw a failure, [restore your RDS instance using the backup](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html) that you had generated before. Please [get in touch](../../overview/getting-in-touch.md) with us so that we can figure out what went wrong.
12. Open the [Amazon ECS console](https://console.aws.amazon.com/ecs) and navigate to your AWS Fargate cluster in _Clusters_ tab.
13. Under the _Tasks_ tab, choose _Stop All._ This will stop all your tasks causing your service to reboot.
14. Once the tasks have rebooted and entered the _RUNNING_ state, choose any task and select the public IP. Curl this public IP on port 8080 with the _version_ endpoint. curl xxx.xxx.xxx.xxx:8080/version. The response will be the version of your metaflow service and it should be &gt;= 2.0.2. Congratulations! You have successfully upgraded the service!
15. Because you used the latest [CloudFormation template](https://github.com/Netflix/metaflow-tools/blob/master/aws/cloudformation/metaflow-cfn-template.yml), all the necessary IAM roles and permissions for AWS Step Functions for scheduling Metaflow flows are already configured for you. You can now [configure your Metaflow installation](../../overview/configuring-metaflow.md) with these additional resources.

In case of any issues, please [get in touch](../../overview/getting-in-touch.md) with us. 

### Manual Deployment

If you originally deployed the AWS resources needed for Metaflow manually, then there are a few steps you would need to take for this service migration. You would also need to manually set up the IAM roles and permissions to be able to schedule Metaflow flows on AWS Step Functions.

#### Upgrading Metaflow Service manually

The metaflow service repository has a [migration tool](https://github.com/Netflix/metaflow-service/blob/master/migration_tools.py) that will perform the update on your behalf once you have upgraded your metaflow service [to use the latest version of the docker image](https://hub.docker.com/repository/docker/netflixoss/metaflow_metadata_service).

{% hint style="info" %}
We highly recommend [taking a backup of your RDS instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html) before attempting this upgrade. This will allow you to restore the service from the backup in case there are any issues with the migration
{% endhint %}

1. Open the [Amazon ECS console](https://console.aws.amazon.com/ecs) and navigate to your AWS Fargate cluster in _Clusters_ tab.
2. Resize your cluster to 1 task \(if you have more than 1 task, otherwise move to Step 4.\) by choosing your service under _Services_ and choosing _Update._
3. Choose _Number of task_ to 1, choose _Next step, Next step, Next step, Update service._
4. After the service has updated, under the _Tasks_ tab, choose _Stop All._ This will stop all your tasks causing your service to reboot. Once the service has rebooted, your tasks will fetch the latest image of the service from docker hub and launch the migration service on port 8082. Note the public IP of this task.
   1. Please note that this will only happen if you were using the latest tag \(or no tag\) for the image in the ECS Task Definition. See Step 6.4.2. 
   2. If you had pinned the version of the image, you would need to update the task definition to pull the latest version and then stop all your tasks.
5. Open the [EC2 console](https://console.aws.amazon.com/ec2/) and from the navigation bar, select the region to use.
6. Choose _Security Groups_ under _Resources_ and choose the security group that you created for the AWS Fargate cluster [previously](../deployment-guide/manual-deployment.md#create-security-groups).
7. For _Inbound rules_, 
   1. Choose _Add rule_ and select _Custom TCP_ for _Type._
   2. Use _8082_ for _Port range._ This is needed for the migration service to work.
   3. Select _Anywhere_ for _Source type._
8. Now we are ready to migrate the service.
9. Clone [this file](https://github.com/Netflix/metaflow-service/blob/master/migration_tools.py) in your local workstation and name it _migration\_tools.py._
10. Using the IP in Step 2. run `python3 migration_tools.py db-status --base-url http://xxx.xxx.xxx.xxx:8082`
11. If you need to upgrade your database schema, the flag `is_up_to_date` will be set to `False` in the response. If you need to upgrade the database schema, before proceeding to the next step, make sure you have [taken a backup of your database](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html).
12. To upgrade your database schema, execute `python3 migration_tools.py upgrade --base-url http://xxx.xxx.xxx.xxx:8082`
13. You should see a response `upgrade successful`. If you see an error, [restore your RDS instance using the backup](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html) that you had generated before. Please [get in touch](../../overview/getting-in-touch.md) with us so that we can figure out what went wrong.
14. You can verify that the upgrade succeeded by executing `python3 migration_tools.py db-status --base-url http://xxx.xxx.xxx.xxx:8082`
15. This time the flag `is_up_to_date` should be set to `True`
16. Next we will upgrade the metaflow service. Open the [Amazon ECS console](https://console.aws.amazon.com/ecs) and navigate to your AWS Fargate cluster in _Clusters_ tab.
17. Under the _Tasks_ tab, choose _Stop All._ This will stop all your tasks causing your service to reboot.
18. Once the tasks have rebooted and entered the _RUNNING_ state, choose any task and select the public IP. Curl this public IP on port 8080 with the _version_ endpoint. curl xxx.xxx.xxx.xxx:8080/version. The response will be the version of your metaflow service and it should be &gt;= 2.0.2. Congratulations! You have successfully upgraded the service! This IP \(http://xxx.xxx.xxx.xxx:8080\) is your new METAFLOW\_SERVICE\_URL when you reconfigure the service after setting up IAM roles for AWS Step Functions in the next section if you are not using a load balancer or an API gateway \(in which case the original address of the load balancer/API gateway is still your METAFLOW\_SERVICE\_URL\). If you originally had more than 1 task \(Step 2.\), follow the next step to resize your cluster back up, otherwise, you can move to the next section.
19. Resize your cluster back to the original number of tasks by choosing your service under _Services_ and choosing _Update._
20. Choose _Number of task_ to a number you want, choose _Next step, Next step, Next step, Update service._ If you are running multiple tasks, most likely you have an API Gateway/Load Balancer in front of these tasks in which case the original address of the load balancer/API gateway is your METAFLOW\_SERVICE\_URL.

#### Setting up IAM roles for scheduling Metaflow flows on AWS Step Functions

1. Follow the steps listed [here](../deployment-guide/manual-deployment.md#scheduling) for setting up an IAM role for [AWS Step Functions](../deployment-guide/manual-deployment.md#create-an-iam-role-for-aws-step-functions), [Amazon EventBridge](../deployment-guide/manual-deployment.md#create-an-iam-role-for-amazon-eventbridge) and an [Amazon DynamoDB table](../deployment-guide/manual-deployment.md#create-an-amazon-dynamodb-table).
2. Modify the IAM role of AWS Batch so that your AWS Batch instance can access Amazin DynamoDB table. Follow the instructions listed [here](../deployment-guide/manual-deployment.md#create-an-iam-role-for-aws-batch). More specifically Step 5.2. Within the [IAM console](https://console.aws.amazon.com/iam), you can edit your existing role and add the new Amazon DynamoDB policy specified in the [Step 5.2](../deployment-guide/manual-deployment.md#create-an-iam-role-for-aws-batch).
3. That's it! You can now [configure your Metaflow installation](../../overview/configuring-metaflow.md) with these additional resources.



