# Release Notes

Read below how Metaflow has improved over time.

We take backwards compatibility very seriously. In the vast majority of cases, you can upgrade Metaflow without expecting changes in your existing code. In the rare cases when breaking changes are absolutely necessary, usually, due to bug fixes, you can take a look at minor breaking changes below before you upgrade.

## 2.2.0 \(Aug 4th, 2020\)

The Metaflow 2.2.0 release is the first R release and introduces [Metaflow's support for R lang](https://docs.metaflow.org/v/r/).

* [Features](https://github.com/Netflix/metaflow/releases/tag/2.2.0#2.2.0_features)
  * Support for R lang.

### Features

#### Support for R lang.

This release provides an [idiomatic API to access Metaflow in R lang](https://docs.metaflow.org/v/r/). It piggybacks on the Pythonic implementation as the backend providing most of the functionality previously accessible to the Python community. With this release, R users can structure their code as a metaflow flow. Metaflow will [snapshot the code, data, and dependencies](https://docs.metaflow.org/v/r/metaflow/basics#the-structure-of-metaflow-code) automatically in a content-addressed datastore allowing for [resuming of workflows](https://docs.metaflow.org/v/r/metaflow/debugging#how-to-debug-failed-flows), [reproducing past results, and inspecting anything about the workflow](https://docs.metaflow.org/v/r/metaflow/client) e.g. in a notebook or RStudio IDE. Additionally, without any changes to their workflows, users can now [execute code on AWS Batch and interact with Amazon S3 seamlessly](https://docs.metaflow.org/v/r/metaflow/scaling).

PR [\#263](https://github.com/Netflix/metaflow/pull/263) and PR [\#214](https://github.com/Netflix/metaflow/pull/214) 

