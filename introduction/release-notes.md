# Release Notes

Read below how Metaflow has improved over time.

We take backwards compatibility very seriously. In the vast majority of cases, you can upgrade Metaflow without expecting changes in your existing code. In the rare cases when breaking changes are absolutely necessary, usually, due to bug fixes, you can take a look at minor breaking changes below before you upgrade.

## 2.2.12 \(May 28th, 2021\)

The Metaflow 2.2.12 release is a minor patch release.

* [Features](https://github.com/Netflix/metaflow/releases/tag/2.2.12#2.2.12_features)
  * [Add capability to override AWS Step Functions state machine name while deploying flows to AWS Step Functions](https://github.com/Netflix/metaflow/releases/tag/2.2.12#532)
  * [Introduce heartbeats for Metaflow flows](https://github.com/Netflix/metaflow/releases/tag/2.2.12#333)
* [Bug Fixes](https://github.com/Netflix/metaflow/releases/tag/2.2.12#2.2.12_bugs)
  * [Handle regression with `Click >=8.0.x`](https://github.com/Netflix/metaflow/releases/tag/2.2.12#526)

### Features

#### [Add capability to override AWS Step Functions state machine name while deploying flows to AWS Step Functions](https://github.com/Netflix/metaflow/releases/tag/2.2.12#532)

Prior to this release, the State Machines created by Metaflow while deploying flows to AWS Step Functions had the same name as that of the flow. With this release, Metaflow users can now override the name of the State Machine created by passing in a `--name` argument : `python flow.py step-functions --name foo create` or `python flow.py step-functions --name foo trigger`.

#### [Introduce heartbeats for Metaflow flows](https://github.com/Netflix/metaflow/releases/tag/2.2.12#333)

Metaflow now registers heartbeats at the run level and the task level for all flow executions \(with the exception of flows running on AWS Step Functions where only task-level heartbeats are captured\). This provides the necessary metadata to ascertain if a run/task has been lost. Subsequent releases of Metaflow will expose this information through the client.

### Bug Fixes

#### [Handle regression with `Click >=8.0.x`](https://github.com/Netflix/metaflow/releases/tag/2.2.12#526)

The latest release of Click \(8.0.0\) broke certain idempotency assumptions in Metaflow which PR [\#526](https://github.com/Netflix/metaflow/pull/526) addresses.

## 2.2.11 \(Apr 30th, 2021\)

The Metaflow 2.2.11 release is a minor patch release.

* Bug Fixes
  * Fix regression that broke compatibility with Python 2.7

### Bug Fixes

#### Fix regression that broke compatibility with Python 2.7

`shlex.quote`, introduced in \#493, is not compatible with Python 2.7. `pipes.quote` is now used for Python 2.7.

## 2.2.10 \(Apr 22nd, 2021\)

The Metaflow 2.2.10 release is a minor patch release.

* Features
  * AWS Logs Group, Region and Stream are now available in metadata for tasks executed on AWS Batch
  * Execution logs are now available for all tasks in Metaflow universe
* Bug Fixes
  * Fix regression with `ping/` endpoint for Metadata service
  * [Fix the behaviour of `--namespace=` CLI args when executing a flow](https://gitter.im/metaflow_org/community?at=605decca68921b62f48a4190)

### Features

#### AWS Logs Group, Region and Stream are now available in metadata for tasks executed on AWS Batch

For tasks that execute on AWS Batch, Metaflow now records the location where the AWS Batch instance writes the container logs in AWS Logs. This can be handy in locating the logs through the client API -

```text
Step('Flow/42/a').task.metadata_dict['aws-batch-awslogs-group']
Step('Flow/42/a').task.metadata_dict['aws-batch-awslogs-region']
Step('Flow/42/a').task.metadata_dict['aws-batch-awslogs-stream']
```

#### Execution logs are now available for all tasks in Metaflow universe

All Metaflow runtime/task logs are now published via a sidecar process to the datastore. The user-visible logs on the console are streamed directly from the datastore. For Metaflow's integrations with the cloud \(AWS at the moment\), the compute tasks logs \(AWS Batch\) are directly written by Metaflow into the datastore \(Amazon S3\) independent of where the flow is launched from \(User's laptop or AWS Step Functions\). This has multiple benefits

* Metaflow no longer relies on AWS Cloud Watch for fetching the AWS Batch execution logs to the console - AWS Cloud Watch has rather low global API limits which have caused multiple issues in the past for our users
* Logs for AWS Step Functions executions are now also available in Amazon S3 and can be easily fetched by simply doing `python flow.py logs 42/start` or `Step('Flow/42/start').task.stdout`. 

### Bug Fixes

#### Fix regression with `ping/` endpoint for Metadata service

Fix a regression introduced in `v2.2.9` where the endpoint responsible for ascertaining the version of the deployed Metadata service was erroneously moved to `ping/` from `ping` 

#### [Fix the behaviour of `--namespace=` CLI args when executing a flow](https://gitter.im/metaflow_org/community?at=605decca68921b62f48a4190)

`python flow.py run --namespace=` now correctly makes the global namespace visible within the flow execution. 

## 2.2.9 \(Apr 19th, 2021\)

The Metaflow 2.2.9 release is a minor patch release.

* Bug Fixes
  * [Remove pinned pylint dependency](https://gitter.im/metaflow_org/community?at=60622af8940f1d555e277c12)
  * [Improve handling of `/` in image parameter for batch](https://gitter.im/metaflow_org/community?at=5f80e21d02e81701b0106c6d)
  * List custom FlowSpec parameters in the intended order

### Bugs

#### [Remove pinned pylint dependency](https://gitter.im/metaflow_org/community?at=60622af8940f1d555e277c12)

Pylint dependency was unpinned and made floating. See PR [\#462](https://github.com/Netflix/metaflow/pull/462).

#### [Improve handling of `/` in image parameter for batch](https://gitter.im/metaflow_org/community?at=5f80e21d02e81701b0106c6d)

You are now able to specify docker images of the form `foo/bar/baz:tag` in the batch decorator. See PR [\#466](https://github.com/Netflix/metaflow/pull/466).

#### List custom FlowSpec parameters in the intended order

The order in which parameters are specified by the user in the FlowSpec is now preserved when displaying them with `--help`. See PR [\#456](https://github.com/Netflix/metaflow/pull/456).

## 2.2.8 \(Mar 15th, 2021\)

The Metaflow 2.2.8 release is a minor patch release.

* Bug Fixes
  * [Fix `@environment` behavior for conflicting attribute values](https://gitter.im/metaflow_org/community?at=604a2bfb44f5a454a46cc7f8)
  * [Fix `environment is not callable` error when using `@environment`](https://gitter.im/metaflow_org/community?at=6048a07d823b6654d296d62d)

### Bugs

#### [Fix `@environment` behavior for conflicting attribute values](https://gitter.im/metaflow_org/community?at=604a2bfb44f5a454a46cc7f8)

Metaflow was incorrectly handling environment variables passed through the `@environment` decorator in some specific instances. When `@environment` decorator is specified over multiple steps, the actual environment that's available to any step is the union of attributes of all the `@environment` decorators; which is incorrect behavior. For example, in the following workflow -

```text
from metaflow import FlowSpec, step, batch, environment
import os
class LinearFlow(FlowSpec):
    @environment(vars={'var':os.getenv('var_1')})
    @step
    def start(self):
        print(os.getenv('var'))
        self.next(self.a)
    @environment(vars={'var':os.getenv('var_2')})
    @step
    def a(self):
        print(os.getenv('var'))
        self.next(self.end)
    @step
    def end(self):
        pass
if __name__ == '__main__':
    LinearFlow()
```

```text
var_1=foo var_2=bar python flow.py run
```

will result in

```text
Metaflow 2.2.7.post10+gitb7d4c48 executing LinearFlow for user:savin
Validating your flow...
    The graph looks good!
Running pylint...
    Pylint is happy!
2021-03-12 20:46:04.161 Workflow starting (run-id 6810):
2021-03-12 20:46:04.614 [6810/start/86638 (pid 10997)] Task is starting.
2021-03-12 20:46:06.783 [6810/start/86638 (pid 10997)] foo
2021-03-12 20:46:07.815 [6810/start/86638 (pid 10997)] Task finished successfully.
2021-03-12 20:46:08.390 [6810/a/86639 (pid 11003)] Task is starting.
2021-03-12 20:46:10.649 [6810/a/86639 (pid 11003)] foo
2021-03-12 20:46:11.550 [6810/a/86639 (pid 11003)] Task finished successfully.
2021-03-12 20:46:12.145 [6810/end/86640 (pid 11009)] Task is starting.
2021-03-12 20:46:15.382 [6810/end/86640 (pid 11009)] Task finished successfully.
2021-03-12 20:46:15.563 Done!
```

Note the output for the step `a` which should have been `bar`. PR [\#452](https://github.com/Netflix/metaflow/pull/452) fixes the issue.

#### [Fix `environment is not callable` error when using `@environment`](https://gitter.im/metaflow_org/community?at=6048a07d823b6654d296d62d)

Using `@environment` would often result in an error from `pylint` - `E1102: environment is not callable (not-callable)`. Users were getting around this issue by launching their flows with `--no-pylint`. PR [\#451](https://github.com/Netflix/metaflow/pull/451) fixes this issue.

## 2.2.7 \(Feb 8th, 2021\)

The Metaflow 2.2.7 release is a minor patch release.

* [Bug Fixes](https://github.com/Netflix/metaflow/releases#2.2.7_bugs)
  * [Handle for-eaches properly for AWS Step Functions workflows running on AWS Fargate](https://gitter.im/metaflow_org/community?at=601f56d955359c58bf28ef1a)

### Bugs

#### [Handle for-eaches properly for AWS Step Functions workflows running on AWS Fargate](https://gitter.im/metaflow_org/community?at=601f56d955359c58bf28ef1a)

Workflows orchestrated by AWS Step Functions were failing to properly execute `for-each` steps on AWS Fargate. The culprit was lack of access to instance metadata for ECS. Metaflow instantiates a connection to Amazon DynamoDB to keep track of `for-each` cardinality. This connection requires knowledge of the region that the job executes in and is made available via [instance metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) on EC2; which unfortunately is not available on ECS \(for AWS Fargate\). This fix introduces the necessary checks for inferring the region correctly for tasks executing on AWS Fargate. Note that after the recent changes to [Amazon S3's consistency model](https://aws.amazon.com/blogs/aws/amazon-s3-update-strong-read-after-write-consistency/), the Amazon DynamoDB dependency is no longer needed and will be done away in a subsequent release. PR: [\#436](https://github.com/Netflix/metaflow/pull/436)

## 2.2.6 \(Jan 26th, 2021\)

The Metaflow 2.2.6 release is a minor patch release.

* Features
  * Support AWS Fargate as compute backend for Metaflow tasks launched on AWS Batch
  * Support `shared_memory`, `max_swap`, `swappiness` attributes for Metaflow tasks launched on AWS Batch
  * Support wider very-wide workflows on top of AWS Step Functions
* Bug Fixes
  * Assign tags to `Run` objects generated through AWS Step Functions executions
  * Pipe all workflow set-up logs to `stderr`
  * Handle null assignment to `IncludeFile` properly

### Features

#### Support AWS Fargate as compute backend for Metaflow tasks launched on AWS Batch

At [AWS re:invent 2020, AWS announced support for AWS Fargate](https://aws.amazon.com/blogs/aws/new-fully-serverless-batch-computing-with-aws-batch-support-for-aws-fargate/) as a compute backend \(in addition to EC2\) for AWS Batch. With this feature, Metaflow users can now submit their Metaflow jobs to AWS Batch Job Queues which are connected to AWS Fargate Compute Environments as well. By setting the environment variable - `METAFLOW_ECS_FARGATE_EXECUTION_ROLE`, users can configure the ecsTaskExecutionRole for the AWS Batch container and AWS Fargate agent.

#### Support `shared_memory`, `max_swap`, `swappiness` attributes for Metaflow tasks launched on AWS Batch

The `@batch` decorator now supports `shared_memory`, `max_swap`, `swappiness` attributes for Metaflow tasks launched on AWS Batch to provide a greater degree of control for memory management.

#### Support wider very-wide workflows on top of AWS Step Functions

The tag `metaflow_version:` and `runtime:` is now available for all packaged executions and remote executions as well. This ensures that every run logged by Metaflow will have `metaflow_version` and `runtime` system tags available. 

### Bug Fixes

#### Assign tags to `Run` objects generated through AWS Step Functions executions

`Run` objects generated by flows executed on top of AWS Step Functions were missing the tags assigned to the flow; even though the tags were correctly persisted to tasks. This release fixes and brings inline the tagging behavior as observed with local flow executions.

#### Pipe all workflow set-up logs to `stderr`

Execution set-up logs for `@conda` and `IncludeFile` were being piped to `stdout` which made manipulating the output of commands like `python flow.py step-functions create --only-json` a bit difficult. This release moves the workflow set-up logs to `stderr`. 

#### Handle null assignment to `IncludeFile` properly

A workflow executed without a required `IncludeFile` parameter would fail when the parameter was referenced inside the flow. This release fixes the issue by assigning a null value to the parameter in such cases.

## 2.2.5 \(Nov 11th, 2020\)

The Metaflow 2.2.5 release is a minor patch release.

* Features
  * Log `metaflow_version:` and `runtime:` tag for all executions
* Bug Fixes
  * Handle inconsistently cased file system issue when creating @conda environments on macOS for linux-64

### Features

#### Log `metaflow_version:` and `runtime:` tag for all executions

The tag `metaflow_version:` and `runtime:` is now available for all packaged executions and remote executions as well. This ensures that every run logged by Metaflow will have `metaflow_version` and `runtime` system tags available.

### Bug Fixes

#### Handle inconsistently cased file system issue when creating @conda environments on macOS for linux-64

Conda fails to correctly set up environments for linux-64 packages on macOS at times due to inconsistently cased filesystems. Environment creation is needed to collect the necessary metadata for correctly setting up the conda environment on AWS Batch. This fix simply ignores the error-checks that conda throws while setting up the environments on macOS when the intended destination is AWS Batch.

## 2.2.4 \(Oct 28th, 2020\)

The Metaflow 2.2.4 release is a minor patch release.

* Features
  * Metaflow is now compliant with AWS GovCloud & AWS CN regions
* Bug Fixes
  * Address a bug with overriding the default value for [IncludeFile](https://docs.metaflow.org/metaflow/data#data-in-local-files)
  * Port AWS region check for AWS DynamoDb from `curl` to `requests`

### Features

#### Metaflow is now compliant with AWS GovCloud & AWS CN regions

AWS GovCloud & AWS CN users can now enjoy all the features of Metaflow within their region partition with no change on their end. PR: \#364

### Bug Fixes

#### Address a bug with overriding the default value for [IncludeFile](https://docs.metaflow.org/metaflow/data#data-in-local-files)

Metaflow v2.1.0 introduced a bug in [IncludeFile functionality](https://docs.metaflow.org/metaflow/data#data-in-local-files) which prevented users from overriding the default value specified.

#### Port AWS region check for AWS DynamoDb from `curl` to `requests`

Metaflow's AWS Step Functions' integration relies on AWS DynamoDb to manage [foreach](https://docs.metaflow.org/metaflow/basics#foreach) constructs. Metaflow was leveraging `curl` at runtime to detect the region for AWS DynamoDb. Some docker images don't have `curl` installed by default; moving to `requests` \(a metaflow dependency\) fixes the issue.

## 2.2.3 \(Sept 8th, 2020\)

The Metaflow 2.2.3 release is a minor patch release.

* [Bug Fixes](release-notes.md#bug-fixes)
  * Fix issue [\#305](https://github.com/Netflix/metaflow/issues/305) : Default 'help' for parameters was not handled properly.
  * Pin the conda library versions for Metaflow default dependencies based on the Python version.
  * Add conda bin path to the PATH environment variable during Metaflow step execution.
  * Fix a typo in metaflow/debug.py

### Bug Fixes

#### Fix issue [\#305](https://github.com/Netflix/metaflow/issues/305) : Default 'help' for parameters was not handled properly

Fix the issue where default `help` for parameters was not handled properly. Issue [\#305](https://github.com/Netflix/metaflow/issues/305): flow fails because `IncludeFile`'s default value for the `help` argument is None. PR: [\#318](https://github.com/Netflix/metaflow/pull/318)

#### Pin the conda library versions for Metaflow default dependencies based on the Python version

The previously pinned library version does not work with python 3.8. Now we have two sets of different version combinations which should work for python 2.7, 3.5, 3.6, 3.7, and 3.8. PR: [\#308](https://github.com/Netflix/metaflow/pull/308)

#### Add conda bin path to the PATH environment variable during Metaflow step execution

Previously the executable installed in conda environment was not visible inside Metaflow steps. Fixing this issue by appending conda bin path to the PATH environment variable. PR: [\#307](https://github.com/Netflix/metaflow/pull/307)

PRs:  [\#307](https://github.com/Netflix/metaflow/pull/307), [\#308](https://github.com/Netflix/metaflow/pull/308), [\#310](https://github.com/Netflix/metaflow/pull/310), [\#314](https://github.com/Netflix/metaflow/pull/314), [\#317](https://github.com/Netflix/metaflow/pull/317), [\#318](https://github.com/Netflix/metaflow/pull/318)

## 2.2.2 \(Aug 20th, 2020\)

The Metaflow 2.2.2 release is a minor patch release.

* [Bug Fixes](release-notes.md#bug-fixes)
  * Fix a regression introduced in 2.2.1 related to Conda environments
  * Clarify Pandas requirements for Tutorial Episode 04
  * Fix an issue with the metadata service

### Bug Fixes

#### Fix a regression with Conda

Metaflow 2.2.1 included a commit which was merged too early and broke the use of Conda. This release reverses this patch.

#### Clarify Pandas version needed for Episode 04

Recent versions of Pandas are not backward compatible with the one used in the tutorial; a small comment was added to warn of this fact.

#### Fix an issue with the metadata service

In some cases, the metadata service would not properly create runs or tasks.

PRs [\#296](https://github.com/Netflix/metaflow/pull/296), [\#297](https://github.com/Netflix/metaflow/pull/297), [\#298](https://github.com/Netflix/metaflow/pull/298)

## 2.2.1 \(Aug 17th, 2020\)

The Metaflow 2.2.1 release is a minor patch release.

* [Features](release-notes.md#features)
  * Add `include` parameter to `merge_artifacts`.
* [Bug Fixes](release-notes.md#bug-fixes)
  * Fix a regression introduced in 2.1 related to S3 datatools
  * Fix an issue where Conda execution would fail if the Conda environment was not writeable
  * Fix the behavior of uploading artifacts to the S3 datastore in case of retries

### Features

#### Add `include` parameter for `merge_artifacts`

You can now specify the artifacts to be merged explicitly by the `merge_artifacts` method as opposed to just specifying the ones that should _not_ be merged.

### Bug Fixes

#### Fix a regression with datatools

Fixes the regression described in [\#285](https://github.com/Netflix/metaflow/issues/285).

#### Fix an issue with Conda in certain environments

In some cases, Conda is installed system wide and the user cannot write to its installation directory. This was causing issues when trying to use the Conda environment. Fixes [\#179](https://github.com/Netflix/metaflow/issues/179).

#### Fix an issue with the S3 datastore in case of retries

Retries were not properly handled when uploading artifacts to the S3 datastore. This fix addresses this issue.

PRs [\#282](https://github.com/Netflix/metaflow/pull/282), [\#286](https://github.com/Netflix/metaflow/pull/286), [\#287](https://github.com/Netflix/metaflow/pull/287), [\#288](https://github.com/Netflix/metaflow/pull/288), [\#289](https://github.com/Netflix/metaflow/pull/289), [\#290](https://github.com/Netflix/metaflow/pull/290), [\#291](https://github.com/Netflix/metaflow/pull/291)

## 2.2.0 \(Aug 4th, 2020\)

The Metaflow 2.2.0 release is a minor release and introduces [Metaflow's support for R lang](https://docs.metaflow.org/v/r/).

* [Features](release-notes.md#features-1)
  * Support for R lang.

### Features

#### Support for R lang.

This release provides an [idiomatic API to access Metaflow in R lang](https://docs.metaflow.org/v/r/). It piggybacks on the Pythonic implementation as the backend providing most of the functionality previously accessible to the Python community. With this release, R users can structure their code as a metaflow flow. Metaflow will [snapshot the code, data, and dependencies](https://docs.metaflow.org/v/r/metaflow/basics#the-structure-of-metaflow-code) automatically in a content-addressed datastore allowing for [resuming of workflows](https://docs.metaflow.org/v/r/metaflow/debugging#how-to-debug-failed-flows), [reproducing past results, and inspecting anything about the workflow](https://docs.metaflow.org/v/r/metaflow/client) e.g. in a notebook or RStudio IDE. Additionally, without any changes to their workflows, users can now [execute code on AWS Batch and interact with Amazon S3 seamlessly](https://docs.metaflow.org/v/r/metaflow/scaling).

PR [\#263](https://github.com/Netflix/metaflow/pull/263) and PR [\#214](https://github.com/Netflix/metaflow/pull/214) 

## 2.1.1 \(Jul 30th, 2020\)

The Metaflow 2.1.1 release is a minor patch release.

* [Bug Fixes](release-notes.md#bug-fixes)
  * Handle race condition for `/step` endpoint of metadata service.

### Bug Fixes

#### Handle race condition for `/step` endpoint of metadata service.

The `foreach` step in AWS Step Functions launches multiple AWS Batch tasks, each of which tries to register the step metadata if it already doesn't exist. This can result in a race condition and cause the task to fail. This patch properly handles the 409 response from the service.

PR [\#258](https://github.com/Netflix/metaflow/pull/258) & PR [\#260](https://github.com/Netflix/metaflow/pull/260)

## 2.1.0 \(Jul 29th, 2020\)

The Metaflow 2.1.0 release is a minor release and introduces [Metaflow's integration with AWS Step Functions](https://docs.metaflow.org/going-to-production-with-metaflow/scheduling-metaflow-flows).

* [Features](release-notes.md#features)
  * Add capability to schedule Metaflow flows with AWS Step Functions.
* [Improvements](release-notes.md#improvements)
  * Fix log indenting in Metaflow.
  * Throw exception properly if fetching code package from Amazon S3 on AWS Batch fails.
  * Remove millisecond information from timestamps returned by Metaflow client.
  * Handle CloudWatchLogs resource creation delay gracefully.

### Features

#### Add capability to schedule Metaflow flows with AWS Step Functions.

Netflix uses an [internal DAG scheduler](https://medium.com/@NetflixTechBlog/unbundling-data-science-workflows-with-metaflow-and-aws-step-functions-d454780c6280) to orchestrate most machine learning and ETL pipelines in production. Metaflow users at Netflix can seamlessly deploy and schedule their flows to this scheduler. Now, with this release, we are introducing a similar integration with [AWS Step Functions](https://aws.amazon.com/step-functions/) where Metaflow users can [easily deploy & schedule their flows](https://docs.metaflow.org/going-to-production-with-metaflow/scheduling-metaflow-flows) by simply executing

```text
python myflow.py step-functions create
```

which will create an AWS Step Functions state machine for them. With this feature, Metaflow users can now enjoy all the features of Metaflow along with a highly available, scalable, maintenance-free production scheduler without any changes in their existing code.

We are also introducing a new decorator - [`@schedule`](https://docs.metaflow.org/going-to-production-with-metaflow/scheduling-metaflow-flows#scheduling-a-flow), which allows Metaflow users to instrument time-based triggers via [Amazon EventBridge](https://aws.amazon.com/eventbridge/) for their flows deployed on AWS Step Functions.

With this integration, Metaflow users can [inspect](https://docs.metaflow.org/metaflow/client) their flows deployed on AWS Step Functions as before and [debug and reproduce](https://docs.metaflow.org/metaflow/debugging#reproducing-production-issues-locally) results from AWS Step Functions on their local laptop or within a notebook.

[Documentation](https://docs.metaflow.org/going-to-production-with-metaflow/scheduling-metaflow-flows)  
[Launch Blog Post](https://medium.com/@NetflixTechBlog/unbundling-data-science-workflows-with-metaflow-and-aws-step-functions-d454780c6280)

PR [\#211](https://github.com/Netflix/metaflow/pull/211) addresses Issue [\#2](https://github.com/Netflix/metaflow/issues/2).

### Improvements

#### Fix log indenting in Metaflow.

Metaflow was inadvertently removing leading whitespace from user-visible logs on the console. Now Metaflow presents user-visible logs with the correct formatting.

PR [\#244](https://github.com/Netflix/metaflow/pull/244) fixed issue [\#223](https://github.com/Netflix/metaflow/issues/223).

#### Throw exception properly if fetching code package from Amazon S3 on AWS Batch fails.

Due to malformed permissions, AWS Batch might not be able to fetch the code package from Amazon S3 for user code execution. In such scenarios, it wasn't apparent to the user, where the code package was being pulled from, making triaging any permission issue a bit difficult. Now, the Amazon S3 file location is part of the exception stack trace.

PR [\#243](https://github.com/Netflix/metaflow/pull/243) fixed issue [\#232](https://github.com/Netflix/metaflow/issues/232).

#### Remove millisecond information from timestamps returned by Metaflow client.

Metaflow uses `time` to store the `created_at` and `finished_at` information for the `Run` object returned by Metaflow client. `time` unfortunately does not support the [`%f` directive](https://docs.python.org/3/library/time.html#time.strftime), making it difficult to parse these fields by `datetime` or `time`. Since Metaflow doesn't expose timings at millisecond grain, this PR drops the `%f` directive.

PR [\#227](https://github.com/Netflix/metaflow/pull/227) fixed issue [\#224](https://github.com/Netflix/metaflow/issues/224).

#### Handle CloudWatchLogs resource creation delay gracefully.

When launching jobs on AWS Batch, the CloudWatchLogStream might not be immediately created \(and may never be created if say we fail to pull the docker image for any reason whatsoever\). Metaflow will now simply retry again next time.

PR [\#209](https://github.com/Netflix/metaflow/pull/209).

## 2.0.5 \(Apr 30th, 2020\)

The Metaflow 2.0.5 release is a minor patch release.

* \*\*\*\*[**Improvements**](release-notes.md#2-0-5-improvements)\*\*\*\*
  * Fix logging of prefixes in `datatools.S3._read_many_files`. 
  * Increase retry count for AWS Batch logs streaming. 
  * Upper-bound `pylint` version to `< 2.5.0` for compatibility issues.

The Metaflow 2.0.5 release is a minor patch release.

### Improvements <a id="2-0-5-improvements"></a>

#### Fix logging of prefixes in datatools.S3.\_read\_many\_files

Avoid a cryptic error message when `datatools.S3._read_many_files` is unsuccessful by converting `prefixes` from a generator to a list.

#### Increase retry count for AWS Batch logs streaming.

Modify the retry behavior for log fetching on AWS Batch by adding jitters to exponential backoffs as well as reset the retry counter for every successful request.

Additionally, fail the Metaflow task when we fail to stream the task logs back to the user's terminal even if AWS Batch task succeeds.

#### Upper-bound pylint version to &lt; 2.5.0.

`pylint` version `2.5.0` would mark Metaflow's `self.next()` syntax as an error. As a result, `python helloworld.py run` would fail at the pylint check step unless we run with `--no-pylint`. This version upper-bound is supposed to automatically downgrade `pylint` during `metaflow` installation if `pylint==2.5.0` has been installed.

## 2.0.4 \(Apr 28th, 2020\)

The Metaflow 2.0.4 release is a minor patch release.

* \*\*\*\*[**Improvements**](https://docs.metaflow.org/introduction/release-notes#2-0-4-improvements)\*\*\*\*
  * Expose `retry_count` in [`Current`](https://docs.metaflow.org/metaflow/tagging#accessing-current-ids-in-a-flow)
  * Mute superfluous `ThrottleExceptions` in AWS Batch job logs
* \*\*\*\*[**Bug Fixes**](https://docs.metaflow.org/introduction/release-notes#2-0-4-bug-fixes)
  * Set proper thresholds for retrying `DescribeJobs` API for AWS Batch
  * Explicitly override `PYTHONNOUSERSITE` for `conda` environments
  * Preempt AWS Batch job log collection when the job fails to get into a `RUNNING` state

### Improvements <a id="2-0-4-improvements"></a>

#### Expose `retry_count` in `Current`

You can now use the [`current`](https://docs.metaflow.org/metaflow/tagging#accessing-current-ids-in-a-flow) singleton to access the `retry_count` of your task. The first attempt of the task will have `retry_count` as 0 and subsequent retries will increment the `retry_count`. As an example:

```python
@retry
@step
def my_step(self):
    from metaflow import current
    print("retry_count: %s" % current.retry_count)
    self.next(self.a)
```

#### Mute superfluous `ThrottleExceptions` in AWS Batch job logs

The AWS Logs API for `get_log_events` has a global hard limit on 10 requests per sec. While we have retry logic in place to respect this limit, some of the `ThrottleExceptions` usually end up in the job logs causing confusion to the end-user. This release addresses this issue \(also documented in \#184\).

### Bug Fixes <a id="2-0-4-bug-fixes"></a>

#### Set proper thresholds for retrying `DescribeJobs` API for AWS Batch

The AWS Batch API for `describe_jobs` throws `ThrottleExceptions` when managing a flow with a very wide `for-each` step. This release adds retry behavior with backoffs to add proper resiliency \(addresses \#138\).

#### Explicitly override `PYTHONNOUSERSITE` for `conda` environments

In certain user environments, to properly isolate `conda` environments, we have to explicitly override `PYTHONNOUSERSITE` rather than simply relying on `python -s` \(addresses \#178\).

#### Preempt AWS Batch job log collection when the job fails to get into a `RUNNING` state

Fixes a bug where if the AWS Batch job crashes before entering the `RUNNING` state \(often due to incorrect IAM perms\), the previous log collection behavior would fail to print the correct error message making it harder to debug the issue \(addresses \#185\).

## 2.0.3 \(Mar 6th, 2020\)

The Metaflow 2.0.3 release is a minor patch release.

* \*\*\*\*[**Improvements**](release-notes.md#improvements)\*\*\*\*
  * Parameter listing
  * Ability to specify S3 endpoint
  * Usability improvements
* \*\*\*\*[**Performance**](release-notes.md#performance)\*\*\*\*
  * Conda
* [**Bug Fixes**](release-notes.md#bug-fixes)\*\*\*\*
  * Executing on AWS Batch

### Improvements

#### Parameter listing

You can now use the `current` singleton \(documented [here](https://docs.metaflow.org/metaflow/tagging#accessing-current-ids-in-a-flow)\) to access the names of the parameters passed into your flow. As an example:

```python
for var in current.parameter_names:
    print("Parameter %s has value %s" % (var, getattr(self, var))
```

This addresses [\#137](https://github.com/Netflix/metaflow/issues/137).

#### Usability improvements

A few issues were addressed to improve the usability of Metaflow. In particular, `show` now properly respects indentation making the description of steps and flows more readable. This addresses [\#92](https://github.com/Netflix/metaflow/issues/92). Superfluous print messages were also suppressed when executing on AWS batch with the local metadata provider \([\#152](https://github.com/Netflix/metaflow/pull/152)\).

### Performance

#### Conda

A smaller, newer and standalone Conda installer is now used resulting in faster and more reliable Conda bootstrapping \([\#123](https://github.com/Netflix/metaflow/pull/123)\).

### Bug Fixes

#### Executing on AWS Batch

We now check for the command line `--datastore-root` prior to using the environment variable `METAFLOW_DATASTORE_SYSROOT_S3` when determining the S3 root \([\#134](https://github.com/Netflix/metaflow/pull/134)\). This release also fixes an issue where using the local Metadata provider with AWS batch resulted in incorrect directory structure in the `.metaflow` directory \([\#141](https://github.com/Netflix/metaflow/pull/141)\).

## 2.0.2 \(Feb 11th, 2020\)

Bug Fixes

* [Pin](https://github.com/Netflix/metaflow/pull/107) click to v7.0 or greater
* [Add](https://github.com/Netflix/metaflow/pull/118) checks to conda-package metadata to guard against .conda packages

## 2.0.1 \(Dec 16th, 2019\)

Enhancements

* [Introduce](https://github.com/Netflix/metaflow/pull/53) `metaflow configure [import|export]` for importing/exporting Metaflow configurations.
* [Revamp](https://github.com/Netflix/metaflow/pull/59) `metaflow configure aws` command to address usability [concerns](https://github.com/Netflix/metaflow/issues/44).
* [Handle](https://github.com/Netflix/metaflow/pull/56) keyboard interrupts for Batch jobs [more gracefully for large fan-outs](https://github.com/Netflix/metaflow/issues/54).

Bug Fixes

* [Fix](https://github.com/Netflix/metaflow/pull/62) a docker registry parsing bug in AWS Batch.
* Fix various typos in Metaflow tutorials.

## 2.0.0 \(Dec 3rd, 2019\)

#### **Hello World!** 

* First Open Source Release.
* Read the [blogpost](https://medium.com/@NetflixTechBlog/open-sourcing-metaflow-a-human-centric-framework-for-data-science-fa72e04a5d9) announcing the release

## Releases pre-2.0.0 were internal to Netflix 



