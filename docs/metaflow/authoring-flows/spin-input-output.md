
# Spin Inputs And Outputs

By default, `spin` uses artifacts from the most recent `run` as inputs.
It doesn’t produce any new artifacts, nor does it record metadata, making
it ideal for quick, transient smoke tests which mainly focus on logs and
errors output on the console, as well as `@card`s.

However, you can optionally override inputs, even individual artifacts,
and capture outputs for later inspection, as described below.

## Inspecting artifacts produced by `spin`

To persist artifacts for inspection, run `spin` with the `--persist`
option:
```
python myflow.py spin train --persist
```
After running `spin`, you can inspect its artifacts using
[the Client API](/metaflow/client). To do so, tell the Client to look at
the ephemeral results from `spin` instead of the usual metadata service by
pointing it to the working directory that contains the results via
`inspect_spin`, as shown below:

```python
from metaflow import inspect_spin

inspect_spin(".")
Flow("TrainingFlow").latest_run["train"].task["model"].data
```

This will fetch the results from a special local `./.metaflow_spin`
datastore. You can safely delete the `.metaflow_spin` directory when you
don't need the results anymore.

This way, you can quickly test and inspect artifacts without persisting
anything in the main datastore permanently.

## Using `spin` for unit testing

The above pattern makes `spin` useful for unit testing of individual steps
e.g. in a CI/CD pipeline.

In a unit testing script (e.g. using `pytest`), you can use
[the `Runner` API](/metaflow/managing-flows/runner) to run `spin` with
`persist=True` to capture output artifacts, the correctness
of which you can `assert` on the step has completed, like here:

```python
from metaflow import Runner

with Runner("flow.py").spin("train", persist=True) as spin:
  assert spin.task["model"].data == "kmeans"
```

## Overriding input artifacts

By default, `spin` uses the exact same input artifacts as what were used
in the latest run of the given step, or those of [any past
run](/metaflow/authoring-flows/introduction#testing-a-step-with-past-results).

However, you may override any or all of the artifacts individually. This can
come in handy if you want to test your step code quickly with arbitrary inputs
on the fly. Since artifacts can be any Python objects, the overrides are defined
as a special Python module (file) that contains a dictionary, `ARTIFACTS`, like
in this example:

```python
ARTIFACTS = {
  "model": "kmeans",
  "k": 15
}
```

You can save this to a file, say, `artifacts.py`, and run `spin` as follows:
```
python myflow.py spin train --artifacts-module artifacts.py
```
In this case, the base set of artifacts is loaded from the latest run
(since no explicit pathspec was provided on the command line), and two of them,
`model` and `k`, are overridden by the module.
