# Release Notes

Read below how Metaflow has improved over time.

We take backwards compatibility very seriously. In the vast majority of cases you can upgrade Metaflow without expecting changes in your existing code. In the rare cases when breaking changes are absolutely necessary, usually due to bug fixes, you can take a look at minor breaking changes below before you upgrade.

## 2.0.3 \(Mar 6th, 2020\)

The Metaflow 2.0.3 release is a minor patch release.

* [Improvements](release-notes.md#improvements)
  * Parameter listing
  * Ability to specify S3 endpoint
  * Usability improvements
* [Performance](release-notes.md#performance)
  * Conda
* [Bug Fixes](release-notes.md#bug-fixes)
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



