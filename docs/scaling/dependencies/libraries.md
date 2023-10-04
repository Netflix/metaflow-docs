
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

This page applies to both `@pypi` and `@conda`.

`TODO`