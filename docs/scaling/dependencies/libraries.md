
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

### Bleeding edge versions of the decorators

The default `@pypi` and `@conda` decorators provide basic functionality
that covers typical use cases. If you want to use more advanced features
that are not included in the default decorators yet, you can use
[Netflix's Metaflow extensions](https://github.com/Netflix/metaflow-nflx-extensions).
These decorators are fully compatible with the built-in
`@pypi` and `@conda` but provide several additional features:

 - Named environments which enables you easy environment saving and sharing.
 - A more full-fledged `environment` command allowing you to resolve environments
   using external `requirements.txt` or `environment.yml` files as well as
   inspect and rehydrate environments used in any previously run step.
 - More extensive package support: You can mix and match Conda and Pypi packages, more
   types of Pypi packages, etc.).
 - It is generally more efficient with caching and resolving and provides options
   for faster performance.

To use, simply install [this package](https://pypi.org/project/metaflow-netflixext/).
Documentation can be found
[here](https://github.com/Netflix/metaflow-nflx-extensions/blob/main/docs/conda.md).
Let us know on the [Metaflow community Slack](http://slack.outerbounds.co) if you
find these additional features useful!

## `@pypi` in action

This example demonstrates typical use of `@pypi` (or `@conda`). Save the flow as `fractalflow.py`:

```python
from metaflow import FlowSpec, card, pypi, step, current
from metaflow.cards import Image

class FractalFlow(FlowSpec):

    @step
    def start(self):
        self.next(self.plot)

    @pypi(python='3.9.13',
          packages={'pyfracgen': '0.0.11',
                    'matplotlib': '3.8.0'})
    @card(type='blank')
    @step
    def plot(self):
        # pylint: disable=import-error,no-member
        import pyfracgen as pf
        from matplotlib import pyplot as plt

        string = "AAAAAABBBBBB"
        xbound = (2.5, 3.4)
        ybound = (3.4, 4.0)
        res = pf.lyapunov(
            string, xbound, ybound, width=4, height=3,
            dpi=300, ninit=2000, niter=2000
        )
        pf.images.markus_lyapunov_image(res, plt.cm.bone, plt.cm.bone_r, gammas=(8, 1))
        current.card.append(Image.from_matplotlib(plt.gcf()))
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    FractalFlow()
```

Note the following details in the flow:

- We use the `@pypi` decorator to make two additional libraries, `pyfracgen` and `matplotlib`,
  as well as their transitive dependencies available in the `plot` step.
- The `@pypi` decorator requires that we specify the explicit versions of packages we want
  to import. This ensures that the code executes predictably even when the packages change
  over time.
- We specify the Python version. Some packages containing non-Python code don't work with
  all Python versions, so fixing the Python version ensures reproducibility. Your colleague
  may use a different version than what you have installed locally.
- We `import` the packages inside the `plot` step and not at the top of the file. The packages
  are only available in this step, so importing at the top level wouldn't work.
- The `pylint` checker may get confused about packages that are not installed system-wide.
  The `# pylint: ` comment addresses the false alerts.

All these points apply to the `@conda` decorator as well.

Execute the flow as follows:
```bash
$ python fractalflow.py --environment=pypi run
```
The `--environment=pypi` option which ensures that every step gets its own isolated environment.
This option is required whenever you use `@pypi` or `@conda` decorators.

:::tip
Note that the `--environment` option comes right after the Python file name, not after `run`
or other commands.
:::

When you execute the flow for the first time, the environments need to be resolved which can
take several minutes (see [Internals](/scaling/dependencies/libraries) for more details).
Subsequent runs will start much faster as cached environments will be available.

This short clip shows a run in action, showing also a resulting card:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer playing controls muted loop url='/assets/fractalflow.mp4' width='100%' height='100%'/>

## `@conda` in action

The `@conda` decorator works similarly to `@pypi`. It supports the same `python` and `packages`
arguments. For backwards compatibility, `libraries` works as an alias for `packages`.

```python
from metaflow import FlowSpec, step, conda, card

class ScikitFlow(FlowSpec):

    @conda(python='3.9.13',
           packages={'scikit-learn': '1.3.1'})
    @card
    @step
    def start(self):
        # pylint: disable=import-error,no-member
        from sklearn.datasets import load_iris
        self.data = load_iris()
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    ScikitFlow()
```
Save the flow as `scikitflow.py` as run it as follows:
```bash
$ python scikitflow.py --environment=conda run
```

:::tip
You can search all available public Conda packages at [anaconda.org](https://anaconda.org)
:::

:::tip
By default, all conda packages are searched in the default channel i.e. [conda-forge](https://conda-forge.org/feedstock-outputs/). However, some packages may exist in other channels.

To specify a custom channel for a particular package, use the following syntax: `{channel_name}::{package_name}`.

Example: The package `pytorch` exists in the `pytorch` channel. Thus, the dependency will be specified as follows:
```
@conda(
    python='3.9.13',
    packages={'pytorch::pytorch': '2.1.2'}
)
```
:::

## Using the same packages in all steps

Sometimes you may want to use the same set of packages in all steps. Repeating the same
`@conda` or `@pypi` line for every step would be redundant.

In this case, you can use the `@conda_base` and `@pypi_base` decorators that are defined
at the class level, indicating that all steps should use the same environment.

```python
from metaflow import FlowSpec, step, conda_base

@conda_base(python='3.9.13',
            packages={'scikit-learn': '1.3.1'})
class AllScikitFlow(FlowSpec):

    @step
    def start(self):
        # pylint: disable=import-error,no-member
        from sklearn.datasets import load_iris
        self.data = load_iris()
        self.next(self.end)

    @step
    def end(self):
        print(self.data)

if __name__ == '__main__':
    AllScikitFlow()
```
Save the flow as `allscikitflow.py` as run it as follows:
```bash
$ python allscikitflow.py --environment=conda run
```
Note that we access a `scikit` object stored in `self.data` in the `end` step. When accessing
package-specific objects through artifacts, a matching package must be available in every step
using the artifact. This is the case by default when using the class-level decorators.
If you tried to do the same in the original `scikitflow.py`, it would fail due to a missing package
in the `end` step.

## Libraries in remote tasks

A major benefit of `@pypi` and `@conda` is that they allow you to define libraries that will be
automatically made available when [you execute tasks remotely](/scaling/remote-tasks/introduction)
on `@kubernetes` or on `@batch`. You don't need to do anything special to make this happen.

If you have `@kubernetes` or `@batch` [configured to work with
Metaflow](/getting-started/infrastructure), you can try:

```bash
$ python fractalflow.py --environment=pypi run --with kubernetes
```
or `--with batch` correspondingly. Everything should work exactly the same as with
local runs.

## Libraries in production deployments

Another major benefit of `@pypi` and `@conda` is that the environments they create a guaranteed
to be stable when [deployed to production](/production/introduction).

For instance, if you deployed `FractalFlow` in production on Argo Workflows like this:

```bash
$ python fractalflow.py --environment=pypi argo-workflows create
```

all production runs would be guaranteed to always use exactly the same environment, even
if new versions of the packages get released or even if old packages get removed. This
is very desirable for production runs that should be maximally stable and predictable.

## Disabling environments

When using `--environment=conda` or `--environment=pypi` all steps are executed in
isolated environments. As a result, the steps don't have access to packages that are
installed system-wide. This is desirable, as it makes the flow more reproducible as it
doesn't depend on packages that may exist just in your environment.

However, sometimes a need may arise to be able to access a system-wide package in one
step, while using isolated environments in other steps. For instance, you may use
[a custom Docker image](/scaling/dependencies/containers) in conjuction with `@pypi`
or `@conda`, accessing packages directly from the image in a step.

To make this possible, you can set `@conda(disabled=True)` or `@pypi(disabled=True)` at
the step level. A step with PyPI/Conda disabled behaves as if the flow runs without
`--environment`.

To demonstrate this, consider this flow, `peekabooflow.py`, that prints out the path
of the Python interpreter used in each step:

```python
import sys
from metaflow import FlowSpec, step, conda_base, conda

@conda_base(python='3.9.13')
class PeekabooFlow(FlowSpec):

    @step
    def start(self):
        print(sys.executable)
        self.next(self.peekaboo)

    @conda(disabled=True)
    @step
    def peekaboo(self):
        print(sys.executable)
        self.next(self.end)

    @step
    def end(self):
        print(sys.executable)

if __name__ == '__main__':
    PeekabooFlow()
```
Run the flow as usual:
```bash
$ python peekabooflow.py --environment=conda run
```
Notice how the path is the same in the `start` and `end` steps but different in the
`peekaboo` step which uses a system-wide Python installation.