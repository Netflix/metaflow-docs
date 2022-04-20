# Scaling Out and Up

From a usability point of view, it is hard to beat the convenience of writing and running a straightforward script in the comfort of your favorite IDE and a local terminal. Since one of the core values of Metaflow is usability, we encourage you to start with this easy approach and not worry about scalability until it becomes an issue.

Instead of providing magical abstractions or a new paradigm for scalability, Metaflow provides a set of easy-to-use tools that help you to make your code scalable depending on your specific needs.

The scalability tools fall into three categories:

**Performance Optimization**: You can improve performance of your code by utilizing off-the-shelf, high-performance libraries such as [XGboost](https://github.com/dmlc/xgboost) or [Tensorflow](https://tensorflow.org). Sometimes, it is appropriate to implement a custom algorithm in a high-performance language such as C++ which can be called from your Metaflow steps. Or, as a happy medium between low-performance but productive Python and a fast but tedious C++, you may be able to use a compiler such as [Numba](https://numba.pydata.org) to speed up your code.

**Scaling Up**: One should not underestimate the horsepower of modern large server type machine. It is sometimes worth considering running on a larger machine prior to trying anything else.

**Scaling Out**: Metaflow also integrates with Kubernetes and AWS Batch allowing you to parallelize your steps over an arbitrarily large number of instances, giving you access to virtually unlimited amount of computing power.

It is hard to be prescriptive about which of the three categories is most suitable for your problem. Often, the answer is a combination of the three. In general, start with the approach that is the easiest to implement and keep iterating until the performance is satisfactory.

This section focuses specifically on using Kubernetes or AWS Batch to scale up and out: you can use either to request a larger instance to run your step as well as use it to parallelize your steps over multiple instances. 

This section requires you to have Metaflow working with AWS. See the [AWS section](../metaflow-on-aws/metaflow-on-aws.md) for more information on either setting up Metaflow in your [own AWS environment](../metaflow-on-aws/deploy-to-aws.md) or using the [provided sandbox](../metaflow-on-aws/metaflow-sandbox.md).

Learn more about the tools available in Metaflow for scaling up and out in the following subsections:

- [Effortless Scaling with Kubernetes](../metaflow/scaling-out-and-up/effortless-scaling-with-kubernetes)
- [Effortless Scaling with AWS Batch](../metaflow/scaling-out-and-up/effortless-scaling-with-aws-batch)