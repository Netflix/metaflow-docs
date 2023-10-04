
# Managing Libraries

Whereas the previous page covered [packaging of your own Python modules and
packages](/scaling/dependencies/project-structure), this page covers handling
of 3rd party dependencies that are published as installable Python packages.

Metaflow supports installation of external packages from two Python package
repositories: [PyPI](https://pypi.org/) and [Conda](https://conda-forge.org/),
using `@pypi` and `@conda` decorators. If you wonder why we need two
decorators and when to use which, see
[Conda vs. PyPI](/scaling/dependencies/conda-vs-pypi). To learn why you
should use the decorators and not install packages 
manually, see [Packaging Internals](/scaling/dependencies/internals).

## The `@pypi` and `@conda` decorators

The `@pypi` and `@conda` decorators allow you to make arbitrary packages
available to Metaflow steps, as if you were installing them manually with
`pip install` or `conda install`. This functionality works in conjuction
with [local code packaging](/scaling/dependencies/project-structure), so
steps can execute in safely isolated, remote-execution friendly environments
that contain all dependencies they need.

Crucially, when using `@pypi` or `@conda` steps can **only** access packages
that are explicitly included either in the code package or specified in the
decorator. System-wide packages are not available by design, making sure that
all dependencies are explicitly specified and managed, ensuring
reproducibility and stability of the flow.

All examples below work interchangeably with `@pypi` and `@conda`. The
examples include both `@pypi` lines as well as `@conda` lines commented out,
so you can easily test both the decorators. In a real-life setting, you
would [use either `@conda` or `@pypi`](/scaling/dependencies/conda-vs-pypi).

### An experimental `@pypi` decorator

As an alternative to the built-in `@pypi` and `@conda`, you can also take
a look at [an experimental `@pypi` decorator provided by
Netflix](https://github.com/Netflix/metaflow-nflx-extensions). It works
similarly as the decorators documented here, but it includes a number of 
additional features:

 - Named environments that you can instantiate outside steps.
 - Support for mixing PyPI and Conda packages in an environment.
 - More extensive caching.

Let us know on the [Metaflow community Slack](http://slack.outerbounds.co) if you
are curious to test these features!



