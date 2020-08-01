# Episode 0: Hello World

## Metaflow says Hi!

This flow is a simple linear workflow that verifies your installation by printing out _**Metaflow says: Hi!**_' to the terminal.

You can find the tutorial code on [GitHub](https://github.com/Netflix/metaflow/tree/master/metaflow/tutorials/00-helloworld) (broken link)[FIXME]

####  Showcasing:

* [Basics of Metaflow.](../../../metaflow-r/basics.md)
* [Step](../../../metaflow-r/basics.md#what-should-be-a-step) decorator.

####  To play this episode:

1. ```cd metaflow-tutorials/R```
2. ```Rscript 00-helloworld/helloworld.R show```
3. ```Rscript 00-helloworld/helloworld.R run```

The flow script below prints 'Hi' in Metaflow. Run this flow to validate that Metaflow is installed correctly.

```R
library(metaflow)

# This is the 'start' step. All flows must have a step named 
# 'start' that is the first step in the flow.
start <- function(self){
    print("HelloFlow is starting.")
}

# A step for metaflow to introduce itself.
hello <- function(self){
    print("Metaflow says: Hi!") 
}

# This is the 'end' step. All flows must have an 'end' step, 
# which is the last step in the flow.
end <- function(self){
     print("HelloFlow is all done.")
}

metaflow("HelloFlow") %>%
    step(step = "start", 
         r_function = start, 
         next_step = "hello") %>%
    step(step = "hello", 
         r_function = hello,  
         next_step = "end") %>%
    step(step = "end", 
         r_function = end) %>% 
    run()

```

{% page-ref page="../" %}

