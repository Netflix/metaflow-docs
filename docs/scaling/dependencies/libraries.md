
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

### Alternative `@pypi` and `@conda` decorators

As an alternative to the built-in `@pypi` and `@conda`, you can also use
the decorators that are used at [Netflix](https://github.com/Netflix/metaflow-nflx-extensions).
They are fully compatible with the built-in decorators but provide several additional
features:
 - Named environments which enables you easy environment saving and sharing.
 - A more full-fledged `environment` command allowing you to resolve environments
   using external `requirements.txt` or `environment.yml` files as well as
   inspect and rehydrate environments used in any previously run step.
 - More extensive package support (mix and match Conda and Pypi packages, more
   types of Pypi packages, etc.).
 - It is generally more efficient with caching and resolving and provides options
   for faster performance.

To use, simply install [this package](https://pypi.org/project/metaflow-netflixext/).
Documentation can be found
[here](https://github.com/Netflix/metaflow-nflx-extensions/blob/main/docs/conda.md).

Let us know on the [Metaflow community Slack](http://slack.outerbounds.co) if you
find these additional features useful!
