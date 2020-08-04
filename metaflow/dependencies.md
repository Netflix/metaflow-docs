# Managing External Libraries

What if your step code wants to import an external library? When you run Metaflow code locally, it behaves as any other Python code, so all libraries available to your Python interpreter can be imported in steps.

However, a core benefit of Metaflow is that the same code can be run in different environments without modifications. Clearly this promise does not hold if a step code depends on locally installed libraries. The topic of providing isolated and encapsulated execution environments is a surprisingly complex one. We recommend the following approaches for handling external libraries, in order of preference:

1. If your code needs an additional Python module, for instance, a library module that you wrote by yourself, you can place the file in the same directory with your flow file. When Metaflow packages your code for remote execution, any `.py` files in the directory are included in the distribution automatically. In this case, you can simply `import mymodule` in the step code. This works even with packages with multiple files which can be included as subdirectories.
2. If you need a custom package that is too complex to include in the flow directory, one approach is to install it on the fly in your step code:

   ```text
   os.system('pip install my_package') 
   import my_package
   ```

   This approach is, however, not encouraged for multiple reasons:

   1. It makes the results harder to reproduce since the version of `my_package` may change;
   2. `pip install`ing packages on the fly is brittle, especially if performed in tasks running in parallel.

   Instead, to define external dependencies for a step, you can instead use the `@conda` decorator which uses [conda](https://docs.conda.io/en/latest/) behind the scenes.

## Managing dependencies with `@conda` decorator

Reproducibility is a core value of Machine Learning Infrastructure. It is hard to collaborate on data science projects effectively without being able to reproduce past results reliably. Metaflow tries to solve several questions related to reproducible research, principle amongst them, dependency management: how can you, the data scientist, specify libraries that your code needs so that the results are reproducible?

Note that reproducibility and dependency management are related but separate topics. We could solve either one individually. A classic `os.system(‘pip install pandas’)` is an example of dependency management without reproducibility \(what if the version of `pandas` changes?\). On the other hand, we could make code perfectly reproducible by forbidding external libraries - reproducibility without dependency management.

Metaflow aims at solving both the questions at once: how can we handle dependencies so that the results are reproducible? Specifically, it addresses the following three issues:

1. How to make external dependencies available locally during development?
2. How to execute code remotely on AWS Batch with external dependencies?
3. How to ensure that anyone can reproduce past results even months later?

Metaflow provides an execution environment context, `--environment=conda`, which runs every step in a separate environment that only contains dependencies that are explicitly listed as requirements for that step. The solution relies on [Conda](https://conda.io/docs/), a language-agnostic open-source package manager by the authors of Numpy.

For instance:

```python
@conda(libraries={"pandas": "0.22.0"})
def fit_model(self):
    ...
```

The above code snippet will execute the `fit_model` step in an automatically created conda environment that contains only specific pinned versions of `Python`, `Pandas`, and `Metaflow`\(and its dependencies `boto3`, `click` and `requests`\). No unspecified libraries outside of the standard Python library would be available. This isolates your code from any external factors, such as automatically upgrading libraries.

Internally, Metaflow handles automatic dependency resolution, cross-platform support, environment snapshotting and caching in S3 \(if enabled\). We require that all dependencies are pinned to a specific version. This avoids any ambiguity about the version used and helps make deployments fully immutable; in other words, once you deploy a version in production, nothing will inadvertently change its behavior without explicit action.

### Local Execution

Let's look at the [LinearFlow](basics.md#linear) from before:

```python
from metaflow import FlowSpec, step

class LinearFlow(FlowSpec):

    @step
    def start(self):
        self.my_var = 'hello world'
        self.next(self.a)

    @step
    def a(self):
        print('the data artifact is: %s' % self.my_var)
        self.next(self.end)

    @step
    def end(self):
        print('the data artifact is still: %s' % self.my_var)

if __name__ == '__main__':
    LinearFlow()
```

You can execute this flow in a conda environment by executing:

```bash
$ python LinearFlow.py --environment=conda run
```

Metaflow will bootstrap a dedicated conda environment for each of the steps of the workflow, executing each of them in that isolated environment, resulting in an output like this -

```bash
2019-11-27 20:04:27.579 Bootstrapping conda environment...(this could take a few minutes)
2019-11-27 20:05:13.623 Workflow starting (run-id 164):
2019-11-27 20:05:14.273 [164/start/4222215 (pid 14011)] Task is starting.
2019-11-27 20:05:16.426 [164/start/4222215 (pid 14011)] Task finished successfully.
2019-11-27 20:05:17.246 [164/a/4222216 (pid 14064)] Task is starting.
2019-11-27 20:05:19.014 [164/a/4222216 (pid 14064)] the data artifact is: hello world
2019-11-27 20:05:19.484 [164/a/4222216 (pid 14064)] Task finished successfully.
2019-11-27 20:05:20.192 [164/end/4222217 (pid 14117)] Task is starting.
2019-11-27 20:05:21.756 [164/end/4222217 (pid 14117)] the data artifact is still: hello world
2019-11-27 20:05:22.436 [164/end/4222217 (pid 14117)] Task finished successfully.
2019-11-27 20:05:22.512 Done!
```

You might notice some delay when you execute this flow for the first time, as Metaflow performs dependency resolution, creates the environments and caches the results. Subsequent executions rely on this cache to reduce this overhead going forward.

Let’s import the module `sklearn` in one of the steps -

```python
from metaflow import FlowSpec, step

class LinearFlow(FlowSpec):

    @step
    def start(self):
        import sklearn
        self.my_var = 'hello world'
        self.next(self.a)

    @step
    def a(self):
        print('the data artifact is: %s' % self.my_var)
        self.next(self.end)

    @step
    def end(self):
        print('the data artifact is still: %s' % self.my_var)

if __name__ == '__main__':
    LinearFlow()
```

Let's execute this flow in a conda environment, again, by executing:

```bash
$ python LinearFlow.py --environment=conda run
```

You will notice that the execution progresses fairly quickly compared to before since all the specified dependencies are already cached locally, but the flow fails at step `start`, with the error `ModuleNotFoundError: No module named ‘sklearn’`, even though you might have the module installed locally already.

You can add an explicit dependency on the module `sklearn` by using the `@conda` decorator in the `start` step -

```python
from metaflow import FlowSpec, step, conda

class LinearFlow(FlowSpec):

    @conda(libraries={'scikit-learn':'0.21.1'})
    @step
    def start(self):
        import sklearn
        self.my_var = 'hello world'
        self.next(self.a)

    @step
    def a(self):
        print('the data artifact is: %s' % self.my_var)
        self.next(self.end)

    @step
    def end(self):
        print('the data artifact is still: %s' % self.my_var)

if __name__ == '__main__':
    LinearFlow()
```

Let’s execute this flow, in the conda environment again -

```bash
$ python LinearFlow.py --environment=conda run
```

You will notice that bootstrapping takes a little bit longer than before as we pull in the new set of dependencies \(`scikit-learn` `0.21.1` and its dependencies\) and the flow succeeds. `scikit-learn 0.21.1` is only available to the step `start` and no other step.

Every subsequent execution of your flow is guaranteed to execute in the same environment unless you explicitly make a change to the contrary. Behind the scenes, we resolve the dependencies you have specified in your steps and cache both the resolution order and dependencies \(stated and transitive\) locally and on S3 to be used for subsequent executions. We do this to isolate your code from changes not related to your code. This also allows for isolation between runs, you should be able to use a different version of tensorflow for different flows and even across different steps of the same flow if that suits your use-case.

### Remote Execution

You can execute your flow on AWS Batch, like before -

```bash
$ python LinearFlow.py --environment=conda run --with batch
```

Since we cache the exact set of dependencies \(stated and transitive\) for your flow in S3, you are not at the mercy of an upstream package repository and can avoid overwhelming it, particularly while running multiple parallel tasks, while being guaranteed the same execution environment locally and on AWS Batch.

Note that, the exact set of dependencies and their behavior might differ between an execution on MacOS \(darwin\) and on AWS Batch \(linux\).

### `@conda` Tips and Tricks

#### How do I specify the version of Python interpreter?

By default, we take the version of the Python interpreter with which you invoke your flow. You can override it whatever version you choose, e.g, `@conda(python='3.6.5')`.

#### What about storing and retrieving data artifacts between steps in my flow?

Metaflow relies on pickle for object serialization/deserialization. Make sure you have compatible versions \(ideally the same version\) of the object module as a dependency in your steps which rely on interacting with this object artifact.

#### How do I specify flow-level dependencies?

Using the flow-level `@conda_base` decorator you can specify, for the flow, explicit library dependencies, python version and also if you want to exclude all steps from executing within a conda environment. Some examples -

```python
@conda_base(libraries={'numpy':'1.15.4'}, python=’3.6.5’)
class LinearFlow(FlowSpec):
    ...
```

```python
@conda_base(disabled=True)
class LinearFlow(FlowSpec):
    ...
```

Step-level `@conda` decorators, for the step, will directly update the explicit library dependencies, python version, and conda environment exclusion as specified by the `@conda_base` decorator. Some examples:

```python
from metaflow import FlowSpec, step, conda, conda_base

@conda_base(libraries={'numpy':'1.15.4'}, python='3.6.5')
class MyFlow(FlowSpec):
    @step
    def a(self):
       ...

    @conda(libraries={'numpy':'1.16.3'})
    @step
    def b(self):
       ...

    @conda(disabled=True)
    @step
    def c(self):
       ...
```

In this example, step `a` executes in the environment `libraries={'numpy':'1.15.4'}, python=’3.6.5’`, step `b` executes in the environment `libraries={'numpy':'1.16.3'}, python=’3.6.5’`, while step `c` executes outside the conda environment in the user environment.

