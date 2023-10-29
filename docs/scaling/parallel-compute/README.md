# Using Parallelism

In the Metaflow basics section, you learned about the [`foreach`](/metaflow/basics#foreach) pattern for creating many parallel copies of steps.
In the beginning of this section, you learned about how to [use the `@resources`, `@kubernetes`, or `@batch` decorator](http://localhost:3000/scaling/remote-tasks/introduction#requesting-resources-with-resources-decorator) to scale single-node tasks up. 

In the section, the focus is on how to use Metaflow for parallel computing. There are two places to get started, depending on your interest:
1. Click on [Using GPUs with Metaflow](/scaling/parallel-compute/use-gpus.md) if you want a general primer on using GPUs with Metaflow. This is useful if you want to set up or use your Metaflow deployment to run GPU tasks.
2. Click on [Multi-node Metaflow tasks](/scaling/parallel-compute/multi-node.md) if you want to run more than one copy of a Metaflow step like a foreach, but where the tasks can communicate with each other. This is useful in HPC and distributed training contexts. 