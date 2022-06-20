# Inspecting Flows and Results

Metaflow provides a client API that is used to inspect results of past runs. It is particularly well suited to being used in notebooks.

This document provides an overview of the client API.

## Object hierarchy

Note that all operations in the Client API are filtered by the current namespace, as explained in [Organizing Results](tagging.md). If you do not get the results you expect, make sure you are in the correct namespace. The Client API consults the metadata service to gather results, so make sure that the client is properly configured to use the correct [metadata provider](client.md#metadata-provider).

![Object hierarchy](/assets/hierarchy.png)

You can import any of the objects shown above directly from the metaflow package as follows (for example):

```python
from metaflow import Run
```

The root object, `Metaflow`, can be instantiated simply with

```python
from metaflow import Metaflow
mf = Metaflow()
```

This is the entry point to all other objects. For instance, you can list all flows that have been run in the past with:

```python
from metaflow import Metaflow
print(Metaflow().flows)
```

## Navigating the object hierarchy

Every object listed above follows a consistent interface. All the operations below are available in all objects, not just the ones demonstrated.

### Listing children

You can list child objects of any parent object simply by iterating over the parent:

```python
from metaflow import Flow
flow = Flow('HelloFlow')
runs = list(flow)
```

Expectedly, this works too:

```python
from metaflow import Flow
flow = Flow('HelloFlow')
for run in flow:
    print(run)
```

### Accessing a specific child

You can access a specific child with square brackets, similar to a key lookup in a dictionary. Note that keys are always strings (even if they are numerical IDs):

```python
from metaflow import Flow
flow = Flow('HelloFlow')
run = flow['2']
```

### Accessing a specific object by its address

Besides navigating from the root downwards, you can instantiate every object directly with its fully qualified name, called `pathspec`. Note that also this operation is subject to the current namespace, as explained in [Organizing Results](tagging.md); in short, you will not be able to access a Flow that is not the current namespace; the error message returned will make it clear whether an object exists and is not in the namespace or does not exist at all.

You can instantiate, for example, a particular flow by its name:

```python
from metaflow import Flow
flow = Flow('HelloFlow')
```

You can instantiate a particular run of a flow by its run id:

```python
from metaflow import Run
run = Run('HelloFlow/2')
```

And every step in a run by its name:

```python
from metaflow import Step
step = Step('HelloFlow/2/start')
```

### Accessing data

One of the most typical use cases of the client API is to access data artifacts produced by runs. Each data artifact is represented by a `DataArtifact` object whose parent is a `Task`.

`DataArtifact` is a container object for the actual value. Besides the value, `DataArtifact` includes metadata about the artifact, such as its time of creation.

Often you are only interested in the value of an artifact. For this typical use case we provide a convenience property `.data` in the `Task` object. The `.data` property returns a container which has all artifacts produced by the task as attributes.

For instance, this the shortest way to access a value produced by a step in a run:

```python
from metaflow import Step
print(Step('DebugFlow/2/a').task.data.x)
```

Here, we print the value of `self.x` in the step `a` of the run `2` of the flow `DebugFlow`.

### Adding, removing, and replacing tags

*New in Metaflow 2.7.1: You need to upgrade your Metaflow library and the metadata service to benefit from this feature.*

Every run has [a set of tags](tagging.md#tagging) attached, that is, user-defined annotations.
You can add and remove tags as follows:

```python
from metaflow import Run
run = Run('HelloFlow/2')
run.add_tag('one_tag') # add one tag
run.add_tags(['another_tag', 'yet_another', 'one_tag']) # add many tags
print(run.user_tags)
```

This will print `one_tag`, `another_tag`, `yet_another`. Note that `one_tag` is added twice but since
tags are a set, duplicates are ignored.

Removing works symmetrically:
```python
from metaflow import Run
run = Run('HelloFlow/2')
run.remove_tag('one_tag') # remove one tag
run.remove_tags(['another_tag', 'yet_another']) # remove many tags
```

You can also replace tags with other tags:

```python
from metaflow import Run
run = Run('HelloFlow/2')
run.replace_tag('one_tag', 'better_tag')
run.replace_tags(['yet_another', 'another_tag'], ['better_tag'])
```

The replace calls first removes the tags specified as the first argument and then adds the tag(s) in the second argument. Crucially, this is guaranteed to be an *atomic operation*: If another party
lists the tags while replace is running, they won't see a partial state between remove and adds.

Note you can perform these operations also on the command line using the `tag` command, for instance:
```
python helloflow.py tag add --run-id 2 one_tag
```

#### System tags

In addition to user-defined tags, Metaflow assigns a handful of *system tags* to runs automatically.
These tags can be used for filtering and organizing runs but they can not be removed or replaced with
other tags.

You can see the set of system tags assigned to a run like this:
```python
from metaflow import Run
print(Run('HelloFlow/2').system_tags)
```

Or the union of system tags and user-defined tags like this:
```python
from metaflow import Run
print(Run('HelloFlow/2').tags)
```

### Common properties

Every object has the following properties available:

- `user_tags`: user-defined tags assigned to the object's run
- `system_tags`: system-defined (immutable) tags assigned to the object's run
- `tags`: the union of `user_tags` and `system_tags`
- `created_at`: creation timestamp
- `parent`: parent object
- `pathspec`: object fully qualified name
- `path_components`: list containing the elements in `pathspec`

### Properties related to flows

To access an iterator over runs and filter by tags, use the `runs()` method. See [Tagging](tagging.md#tagging) for more detail.

`Flow` has two additional properties related to determining the latest run for the flow. Note that any `Run` returned will be in the current namespace.

- `latest_run`: `Run` of the latest run whether or not it has completed or has been successful
- `latest_successful_run`: `Run` of the latest successful (and therefore completed) run.

### Properties related to runs

To access an iterator over the steps of a run and filter by tags, use the `steps()` method. See [Tagging](tagging.md#tagging) for more detail.

`Run` also has a few additional properties to make it easy to access commonly used information:

- `data`: A quick way to access the `data` object of the end task of this run. In other words, this is the quickest way to access the data produced at the end of the flow.
- `successful`: A boolean indicating whether or not the run completed successfully. Note that this will return `False` if the run has not completed (ie: is still in progress).
- `finished`: A boolean indicating whether or not the run completed. The returned value will be `True` whether or not the run was successful.
- `finished_at`: A datetime object indicating the completion time of the run. This will be `None` if the run has not completed
- `code`: In certain circumstances, the code used for this run is saved and persisted; this allows you to access this code.
- `end_task`: A quick access to the `Task` object of the last step in the run.

### Properties related to steps

A `Step` typically has a single `Task`. A Step will have multiple `Task` objects as its children if it is a `foreach` step; each `Task` will correspond to a single execution of the `Step`.

To access an iterator over the tasks of a step and filter by tags, use the `tasks()` method. See [Tagging](tagging.md#tagging) for more detail.

`Step` has a few additional properties as well:

- `task`: Convenience method to return the unique `Task` associated with this `Step`. If a `Step` has more than one `Task`, this will return any of them (no order guaranteed).
- `finished_at`: A datetime object indicating the completion time of the step. A step is complete when all its tasks are complete.
- `environment_info`: A dict object containing metadata for the execution environment. See [Dependencies](dependencies.md) for more detail.

### Properties related to tasks

Since a `Task` is the actual unit of execution in Metaflow, these objects contain the richest set of properties:

- `data`: A convenience method to access all data produced by this `Task`. See [Accessing data](client.md#accessing-data).
- `artifacts`: A convenience method to access all `DataArtifact` objects produced by this `Task`. See [Accessing data](client.md#accessing-data).
- `successful`: A boolean indicating whether or not this `Task` completed successfully.
- `finished`: A boolean indicating whether or not this `Task` completed.
- `exception`: If an exception was raised by this `Task` (ie: it did not complete successfully), it will be contained here.
- `finished_at`: A datetime object indicating the completion time of this `Task`.
- `stdout`: A string containing the standard output of this `Task`.
- `stderr`: A string containing the standard error of this `Task`.
- `code`: The code used to execute this `Task`, if available.
- `environment_info`: A dict object containing metadata for the execution environment. See [Dependencies](dependencies.md) for more detail.

Here is an example:

```python
from metaflow import Step
step = Step('DebugFlow/2/a')
if step.task.successful:
    print(step.task.finished_at)
```

## Metadata provider

The Client API relies on a metadata service to gather results appropriately. Metaflow supports a local mode (`.metaflow` directory on your filesystem) and a [remote mode](https://github.com/Netflix/metaflow-service).

```python
from metaflow import get_metadata, metadata

# Fetch currently configured metadata provider
get_metadata()

# Configure Client to use local metadata provider globally
metadata('/Users/bob/metaflow')

# Configure Client to use remote metadata provider globally
metadata('https://localhost:5000/mymetaflowservice')
```

Note that changing the metadata provider is a global operation and all subsequent client operations will use the metadata provider specified.
