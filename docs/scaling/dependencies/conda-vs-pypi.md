
# Conda vs. PyPI

[The Python package ecosystem can
feel overly complex and
confusing](https://packaging.python.org/en/latest/overview/) at
times. On top of this, modern ML libraries like PyTorch consists of
millions of lines of code, requiring carefully compiled components
that match GPU drivers. In general, managing dependencies of a
production-grade ML project is a hairy problem, which Metaflow 
makes more manageable.

Let's start by outlining the two major components of the package ecosystem:

1. **A package repository** - a collection of prepackaged software,
   carefully curated and maintained by the open-source community and
   companies contributing to it. Python has two major repositories,
   [PyPI](https://pypi.org/) and [Conda](https://conda-forge.org/).

2. **A package manager** - a tool that downloads packages from a
   repository and installs them locally. The tools are often specific
   to a repository. For instance, `pip`, `poetry` and `pipenv` work
   with PyPI and `mamba` and `conda` with Conda.

Much confusion arises from the fact that there are many *package managers*,
and new ones pop up periodically, but the package repositories are
much fewer and much more stable. This figure illustrates the concepts:

![package ecosystem](/assets/repositories.png)

Metaflow works with both the *repositories* through [the
`@pypi` and `@conda`](/scaling/dependencies/libraries) decorators.
Importantly, when using these decorators, you don't need to use
*package managers* manually as Metaflow acts as a package manager by itself.

## Virtual environments

[*Virtual environments*](https://docs.python.org/3/library/venv.html)
are a concept closely related to package managers. In
 short, often it is not desirable to install all packages in the same
 environment, which can lead to dependency conflicts and other problems.
 Instead, you can create isolated sets of packages, each living in their own
 environment.

Some package managers like `pip` don't manage virtual environments but they rely
on another tool, such as `venv` or `pyenv`, to do the job. Others like
 `poetry` and `mamba` handle virtual environments natively, allowing you to
 create and delete environments as needed.

When using `@pypi` and `@conda` in Metaflow, you don't have to worry about
virtual environments. The decorators will automatically create an isolated
environment for every Metaflow step, removing the need to manage environments
manually.

## Which repository to use?

Why does Python have two repositories in the first place? The crucial difference
between the repositories is that Conda is not specific to Python: It can handle
any libraries and packages, even those written in low-level languages like C or
C++. This is particularly important for ML and AI workloads that depend on
high-performance libraries.

In contrast, PyPI is the defacto main repository for pure Python packages. It can
also handle non-Python dependencies but with more limitations compared to Conda.

Hence the choice is often simple:
 
 - If you can find packages you need at [PyPI](https://pypi.org) and
   you can `pip install` them without trouble,
   `@pypi` is a safe bet.

 - If your needs are more complex, possibly including non-Python binaries
   such as [MPI](https://anaconda.org/conda-forge/openmpi-mpifort), go with
   `@conda`.

Both the decorators support private packages published in private software
repositories, in case you want to access internally published libraries in
Metaflow.

Behind the scenes, Metaflow does much more than just wrapping CLI commands
such as `pip install` or `conda install`, which wouldn't be sufficient to
guarantee reproducible, reliable exeuction environments. To learn more,
see [Packaging Internals](/scaling/dependencies/internals).

:::note
It is rarely necessary to install both PyPI and Conda packages in the same
environment. This is not supported by the built-in `@pypi` and `@conda` decorators
currently. Should you come across this requirement, you can try [an experimental `@pypi`
decorator by Netflix](https://github.com/Netflix/metaflow-nflx-extensions)
which supports this feature.
:::