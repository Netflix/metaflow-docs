# Release Notes

Read below how Metaflow has improved over time.

We take backwards compatibility very seriously. In the vast majority of cases, you can upgrade Metaflow without expecting changes in your existing code. In the rare cases when breaking changes are absolutely necessary, usually, due to bug fixes, you can take a look at minor breaking changes below before you upgrade.

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

