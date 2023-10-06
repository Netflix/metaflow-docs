
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

When you execute the flow for the first time, the environments need to be resolved which can
take several minutes (see [Internals](/scaling/dependencies/libraries) for more details).
Subsequent runs will start much faster as cached environments will be available.

This short clip shows a run in action, showing also a resulting card:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer playing controls muted loop url='/assets/fractalflow.mp4' width='100%' height='100%'/>

