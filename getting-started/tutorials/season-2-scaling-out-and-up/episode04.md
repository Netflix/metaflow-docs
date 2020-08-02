# Episode 4: Look Mom, We're in the Cloud.

This flow is a simple linear workflow that verifies your AWS configuration. The `start` and `end` steps will run locally, while the `hello` step will run remotely on AWS batch.   
  
After configuring Metaflow to run on AWS, data and metadata about your runs will be stored remotely. This means you can use the client to access information about any flow from anywhere.

## Showcasing:

* AWS [batch decorator](../../../metaflow/scaling.md).
* Accessing data artifacts generated remotely in a local notebook.
* [retry decorator](../../../metaflow/failures.md#retrying-tasks-with-the-retry-decorator).

## Before playing this episode:

Configure your [sandbox](../../../metaflow-on-aws/metaflow-sandbox.md).

## To play this episode:

Pull the tutorials code to current working directory by `Rscript -e "metaflow::pull_tutorials()"` 

1. `cd tutorials` 
2. `Rscript 04-helloaws/helloaws.R run` 
3. Open `helloaws.md` in your local RStudio

```r
#  A flow where Metaflow prints 'Hi'.
#  Run this flow to validate that Metaflow is installed correctly.

library(metaflow)

# This is the 'start' step. All flows must have a step named 
# 'start' that is the first step in the flow.
start <- function(self){
    message("HelloAWS is starting.")
    message("Using metadata provider: ", get_metadata())
}

# A step for metaflow to introduce itself.
hello <- function(self){
    self$message <- "We're on the cloud! Metaflow says: Hi!"
    print(self$message) 
    message("Using metadata provider: ", get_metadata())
}

# This is the 'end' step. All flows must have an 'end' step, 
# which is the last step in the flow.
end <- function(self){
    message("HelloAWS is all done.")
}

metaflow("HelloAWSFlow") %>%
    step(step = "start", 
         r_function = start, 
         next_step = "hello") %>%
    step(step = "hello", 
         decorator("retry", times=2),
         decorator("batch", cpu=2, memory=2048),
         r_function = hello,  
         next_step = "end") %>%
    step(step = "end", 
         r_function = end) %>% 
    run()
```

