# Basics of Metaflow

This document introduces the basic concepts of Metaflow. If you are eager to try out Metaflow in practice, you can start with the [tutorial](../getting-started/tutorials-r/). After the tutorial, you can return to this document to learn more about how Metaflow works.

## The Structure of Metaflow Code

Metaflow follows [the dataflow paradigm](https://en.wikipedia.org/wiki/Dataflow_programming) which models a program as a directed graph of operations. This is a natural paradigm for expressing data processing pipelines, machine learning in particular.

We call the graph of operations **a flow**. You define the operations, called **steps**, which are nodes of the graph and contain transitions to the next steps, which serve as edges.

Metaflow sets some constraints on the structure of the graph. For starters, every flow needs a step called `start` and a step called `end`. An execution of the flow, which we call **a run**, starts at `start`. The run is successful if the final `end` step finishes successfully.

What happens between `start` and `end` is up to you. You can construct the graph in between using an arbitrary combination of the following three types of transitions supported by Metaflow:

### Linear

The most basic type of transition is **a linear** transition. It moves from one step to another one.

Here is a graph with two linear transitions:

![](../.gitbook/assets/graph_linear.png)

The corresponding Metaflow script looks like this:

```R
library(metaflow)

start <- function(self){
    self$my_var <- "hello world"
}

a <- function(self){
    print(paste("the data artifact is", self$my_var))
}

end <- function(self){
    print("End of the linear flow")
}

metaflow("LinearFlow") %>%
    step(step="start", 
         r_function=start, 
         next_step="a") %>%
    step(step="a", 
         r_function=a, 
         next_step="end") %>%
    step(step="end", 
         r_function=end) %>% 
    run()
```

Besides executing the steps `start`, `a`, and `end` in order, this flow creates **a data artifact** called `my_var`. In Metaflow, data artifacts are created simply by assigning values to `$`-indexed variables under the `self` object such as `self$my_var`.

Data artifacts are available in all steps after they have been created, so they behave as any normal instance variables. If you want to use any R  object `obj` in downstream steps, you need to create a data artifact for it, for example `self$var <- obj`. An exception to this rule are branches, as explained below.

### Branch

You can express parallel steps with **a branch**. In the figure below, `start` transitions to two parallel steps, `a` and `b`. Any number of parallel steps are allowed. A benefit of a branch like this is performance: Metaflow can execute `a` and `b` over multiple CPU cores or over multiple instances in the cloud.

![](../.gitbook/assets/graph_branch.png)

```R
library(metaflow)

a <- function(self){
    self$var <- 1
}

b <- function(self){
    self$var <- 2
}

join <- function(self, inputs){
    print(paste("var in step a is", inputs$a$var))
    print(paste("var in step b is", inputs$b$var))
}

metaflow("BranchFlow") %>%
    step(step = "start",
         next_step = c("a", "b")) %>%
    step(step = "a", 
         r_function=a, 
         next_step="join") %>%
    step(step="b", 
         r_function=b, 
         next_step="join") %>%
    step(step="join", 
         r_function=join, 
         next_step="end",
         join=TRUE) %>%
    step(step="end") %>%
    run()
```

Every branch must be joined. The join step does not need to be called `join` as above but it must take an extra argument, like `inputs` above.

In the example above, the value of `x` above is ambiguous: `a` sets it to `1` and `b` to `2`. To disambiguate the branches, the join step can refer to a specific step in the branch, like `inputs[[1]]$x` above. For convenience, you can also iterate over all steps in the branch using `inputs`, which is simply an R list. For more details, see the section about [data flow through the graph](basics.md#data-flow-through-the-graph).

Note that you can nest branches arbitrarily, that is, you can branch inside a branch. Just remember to join all the branches that you create.

### Foreach

Static branches like above are useful when you know the branches at the development time. Alternatively, you may want to branch based on data dynamically. This is the use case for **a foreach** branch.

Foreach works similarly like the branch above but instead of creating named step methods, many parallel copies of steps inside a foreach loop are executed.

A foreach loop can iterate over any list like `params` below.

![](../.gitbook/assets/graph_foreach.png)

```R
library(metaflow)

start <- function(self){
    self$params <- c("param1", "param2", "param3") 
}

a <- function(self){
    self$result <- paste(self$input, "processed")
}

join <- function(self, inputs){
    results <- gather_inputs(inputs, "params")
    print(results)
}

metaflow("ForeachFlow") %>%
    step(step = "start",
         r_function = start,
         next_step = "a",
         foreach="params") %>%
    step(step = "a", 
         r_function=a, 
         next_step="join") %>%
    step(step="join", 
         r_function=join, 
         next_step="end",
         join=TRUE) %>%
    step(step="end") %>%
    run()
```

The foreach loop is initialized by specifying a keyword argument `foreach` in `step`. The `foreach` argument takes a string that is the name of a list stored in an instance variable, like `params` above.

Steps inside a foreach loop create separate **tasks** to process each item of the list. Here, Metaflow creates three parallel tasks for the step `a` to process the three items of the `params` list in parallel. You can access the specific item assigned to a task with an instance variable called `input`.

Foreach loops must be joined like static branches. Note that tasks inside a foreach loop are not named, so you can only iterate over them with `inputs`. If you want, you can assign a value to an instance variable in a foreach step which helps you to identify the task.

You can nest foreaches and combine them with branches and linear steps arbitrarily.

## What should be a step?

There is not a single right way of structuring code as a graph of steps but here are some best practices that you can follow.

Metaflow treats steps as indivisible units of execution. That is, a step either succeeds or fails as a whole. After the step has finished successfully, Metaflow persists all instance variables that were created in the step code, so the step does not have to be executed again even if a subsequent step fails. In other words, you can inspect data artifacts that were present when the step finished but you can not inspect data that were manipulated within a step.

This makes a step [a checkpoint](https://en.wikipedia.org/wiki/Application_checkpointing). The more granular your steps are, the more control you have over inspecting results and resuming failed runs.

A downside of making steps too granular is that checkpointing adds some overhead. It would not make sense to execute each line of code as a separate step. Keep your steps small but not too small. A good rule of thumb is that a single step should not take more than an hour to run, preferably much less than that.

Another important consideration is the readability of your code. Try running

```bash
Rscript myflow.R show
```

which prints out the steps of your flow. Does the overview give you a good idea of your code? If the steps are too broad, it might make sense to split them up just to make the overall flow more descriptive.

## How to define parameters for flows?

Here is an example of a flow that defines a parameter, `alpha`:

```R
library(metaflow)

start <- function(self){
    print(paste("alpha is", self$alpha))
}

end <- function(self){
    print(paste("alpha still is", self$alpha))
}

metaflow("ParameterFlow") %>%
    parameter("alpha", 
              help="learning rate", 
              required = TRUE) %>%    
    step(step="start", 
         r_function=start, 
         next_step="end") %>%
    step(step="end", 
         r_function=end) %>% 
    run()
```

Parameters are defined by assigning a `Parameter` object to a class variable. Parameter variables are automatically available in all steps, like `alpha` above.

You can set the parameter values on the command line as follows:

```bash
Rscript parameter_flow.R run --alpha 0.6
```

You can see available parameters with:

```bash
Rscript parameter_flow.R run --help
```

Parameters are typed based on the type of their default value. If there is no meaningful default for a parameter, you can define it as follows:

```python
parameter('num_components',
          help='Number of components',
          required=True,
          type="int")
```

Now the flow can not be run without setting `--num_components` to an integer value.

You can also put down the type as `int`/`float`/`double`/`bool`.

Parameters can also be used to include local files. See the section on [IncludeFile](data.md#data-in-local-files) for more information.

## Data flow through the graph

As previously mentioned, for [linear](basics.md#linear) steps, data artifacts are propagated and any linear step can access data artifacts created by previous steps using instance variables. In this case, Metaflow can easily determine the value of each artifact by simply taking the value of that artifact at the end of the previous step.

In a join step, however, the value of artifacts can potentially be set to different values on the incoming branches; the value of the artifact is said to be ambiguous.

To make it easier to implement a join step after foreach or branch, Metaflow provides a utility function, `merge_artifacts`, to aid in propagating unambiguous values.

```R
library(metaflow)

start <- function(self){
    self$pass_down <- "non-modified"
}

a <- function(self){
    self$common <- "common in a and b"
    self$x <- "x in a" 
    self$y <- "y in a" 
    self$from_a <- "only in a" 
}

b <- function(self){
    self$common <- "common in a and b" 
    self$x <- "x in b" 
    self$y <- "y in b" 
}

join <- function(self, inputs){
    # manually propogate variable that has different values in different branches 
    self$x <- inputs$a$x

    merge_artifacts(self, inputs, exclude=list("y"))

    # If without the merge_artifact, the following artifact access won't work. 
    print(paste('pass_down is', self$pass_down))
    print(paste('from_a is', self$from_a))
    print(paste('common is', self$common))
}

metaflow("BranchFlow") %>%
    step(step = "start",
         r_function=start,
         next_step = c("a", "b")) %>%
    step(step = "a", 
         r_function=a, 
         next_step="join") %>%
    step(step="b", 
         r_function=b, 
         next_step="join") %>%
    step(step="join", 
         r_function=join, 
         next_step="end",
         join=TRUE) %>%
    step(step="end") %>%
    run()
```

In the example above, the `merge_artifacts` function behaves as follows:

* `pass_down` is propagated because it is unmodified in both `a` and `b`.
* `common` is also propagated because it is set to the same value in both branches. Remember that it is the value of the artifact that matters when determining whether an artifact is ambiguous; Metaflow uses [content based deduplication](../internals-of-metaflow/technical-overview.md#datastore) to store artifacts and can therefore determine if the value of two artifacts is the same.
* `x` is handled by the code explicitly _prior_ to the call to `merge_artifacts` which causes `merge_artifacts` to ignore `x` when propagating artifacts. This pattern allows you to manually resolve any ambiguity in artifacts you would like to see propagated.
* `y` is not propagated because it is listed in the `exclude` list. This pattern allows you to prevent the propagation of artifacts that are no longer relevant. Remember that the default behavior of `merge_artifacts` is to propagate all incoming artifacts.
* `from_a` is propagated because it is only set in one branch and therefore is unambiguous. `merge_artifacts`will propagate all values even if they are present on only one incoming branch.

The `merge_artifacts` function will raise an exception if an artifact that it should merge has an ambiguous value. Remember that `merge_artifacts` will attempt to merge all incoming artifacts except if they are already present in the step or have been explicitly excluded in the `exclude` list.

