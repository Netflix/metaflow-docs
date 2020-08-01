# Inspecting Flows and Results

Metaflow provides a client API that is used to inspect results of past runs. It is particularly well suited to being used in notebooks.

This document provides an overview of the client API.

## Object hierarchy

Note that all operations in the Client API are filtered by the current namespace, as explained in [Organizing Results](tagging.md). If you do not get the results you expect, make sure you are in the correct namespace. The Client API consults the metadata service to gather results, so make sure that the client is properly configured to use the correct [metadata provider](client.md#metadata-provider).

![Object hierarchy](../.gitbook/assets/hierarchy.png)

These objects can be instantiated simply with

```r
# Flow object
flow <- flow_client$new("HelloWorldFlow") 

# Run object
run <- run_client$new(flow, run_id)  
# run_id is 12
run <- run_client$new("HelloWorldFlow/12") 

# Step object
step <- step_client$new(run, step_name)
# step_name is start
step <- step_client$new("HelloWorldFlow/12/start") 

# Task object
task <- task_client$new(step, task_id)
# task_id is 12345678 
task <- task_client$new("HelloWorldFlow/12/start/12345678") 

# Data Artifact
task$artifact("my_var")
```

Metaflow library has a built-in function to print out all the flows you have run in the past.

```r
# list all flows 
print(metaflow::list_flows())
```

This returns a list of strings which represent the names of the flows.

## Navigating the object hierarchy

Every object listed above follows a consistent interface. All the operations below are available in all objects, not just the ones demonstrated.

### Listing children

```r
# list all past runs
metaflow::list_flows()

# list all past runs of the flow object
# shows a list of strings of run_id
print(flow$runs)

# list all step names of the run object
# shows a list of strings of step names 
print(run$steps)

# list all task id of the step object
# shows a list of strings of task_id
print(step$tasks)
```

### Accessing data

One of the most typical use cases of the client API is to access data artifacts produced by runs. Each data artifact is represented by a `DataArtifact` object whose parent is a `Task`.

`DataArtifact` is a container object for the actual value. Besides the value, `DataArtifact` includes metadata about the artifact, such as its time of creation.

Often you are only interested in the value of an artifact. For this typical use case we provide a convenience property `.data` in the `Task` object. The `.data` property returns a container which has all artifacts produced by the task as attributes.

For instance, this the shortest way to access a value produced by a step in a run:

```r
task <- task_client$new("DebugFlow/2/compute/123")
print(task$artifact("my_var"))
```

Here, we print the value of `self$my_varx` in the step `compute` of the run `2`, task `123` of the flow `DebugFlow`.

### Properties of Flow/Run/Step/Task Objects

You can check the full object documentation by run the following commands in R:

```r
help(metaflow::flow_client)
help(metaflow::run_client)
help(metaflow::step_client)
help(metaflow::task_client)
```

Every object has the following common properties available:

* `tags`: tags assigned to the object
* `created_at`: creation timestamp
* `finished_at`: finish timestamp
* `parent`: parent object
* `pathspec`: object fully qualified name

You can find more details in the object documentation.

## Metadata provider

The Client API relies on a metadata service to gather results appropriately. Metaflow supports a local mode \(`.metaflow` directory on your filesystem\) and a [remote mode](https://github.com/Netflix/metaflow-service).

```r
# Fetch currently configured metadata provider
metaflow::get_metadata()

# Configure Client to use local metadata provider globally
metaflow::set_metadata('/Users/bob/metaflow')

# Configure Client to use remote metadata provider globally
metaflow::set_metadata('https://localhost:5000/mymetaflowservice')
```

Note that changing the metadata provider is a global operation and all subsequent client operations will use the metadata provider specified.

