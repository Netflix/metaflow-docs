
# Scalable Compute and Data

After you have [prototyped a flow locally](/metaflow/introduction) and iterated with it for a while, you may face questions like these:
How can I test the flow with more data without running out of memory? Or, how can I make the model train faster? You could try to optimize
the code to work better on your laptop, but such [premature optimization](https://xkcd.com/1691/) is probably not the best use of
your time.

Instead, you can leverage the cloud to get a bigger laptop or more laptops (virtually, not literally). This is the Stage II in Metaflow
development: Scaling flows with the cloud. Luckily Metaflow makes this trivially easy - no changes in the code required - after you
have done the initial legwork to [configure infrastructure for Metaflow](/getting-started/infrastructure).

![](/assets/intro-cartoon-2.svg)

## Supersizing Flows

Here's how Metaflow can help make your project more scalable:

1. You can make your existing flows more scalable just by adding a line of code, `@resources`. This way you can request
more CPUs, memory, or GPUs in your flows. Or, you can parallelize processing over multiple instances, even thousands of them.

2. Once your project starts showing promise with realistic-size workloads, it may start attracting interest from colleagues too.
Metaflow contains a number of features, such as [namespaces](/scaling/tagging), which make collaboration smoother by allowing
many people contribute without interfering with each other's work accidentally.

### Toolbox of Scalability

There is no single magic formula for scalability. Instead of proposing a novel paradigm to make your Python code faster,
Metaflow provides a set of pragmatic tools, leveraging the best off-the-shelf components and services, which help you make code more scalable
and performant depending on your specific needs. 

The scalability tools fall into three categories:

- **Performance Optimization**: You can improve performance of your code by utilizing off-the-shelf, high-performance libraries such as [XGboost](https://github.com/dmlc/xgboost) or [Tensorflow](https://tensorflow.org). Or, if you need something more custom, you can leverage the vast landscape of data tools for Python, including compilers like [Numba](https://numba.pydata.org) to speed up your code.

- **Scaling Up**: One should not underestimate the horsepower of a modern large server, especially one equipped with GPUs. Before considering anything else, you can simply run a step on a beefier cloud instance.
Metaflow integrates with [Kubernetes that works on all major clouds](/getting-started/infrastructure) and AWS Batch, both of which take care of provisioning such machines on demand.

- **Scaling Out**: Besides executing code on a single instance, Metaflow makes it easy to parallelize steps over an arbitrarily large number of instances, leveraging Kubernetes and AWS Batch, giving you access to virtually unlimited amount of computing power.

Often an effective recipe for scalability is a combination of these three techniques: Start with high-performance Python libraries, run them on large instances, and if necessary, parallelize processing as widely as needed.
Also, besides compute concerns, [loading data efficiently](/scaling/data) is something Metaflow can help with.

No matter whether you use Metaflow or any other system, executing at scale comes with a few extra concerns: The larger the scale, the more likely it is that you hit [spurious failures](/scaling/failures). And, you need to make sure your execution environments, including any libraries you depend on, are [available consistently wherever the code gets executed](/scaling/dependencies). Since these issues are a common headache in all large-scale projects, Metaflow helps manage them too.

## What You Will Learn

In this section, you will learn how to make your flows capable of handling more data and execute faster. You will also learn how to scale projects over multiple people by organizing results better. We cover five topics:

1. [Executing tasks remotely with Kubernetes or AWS Batch](/scaling/remote-tasks/introduction)
2. [Dealing with failures](/scaling/failures)
3. [Managing execution environments](/scaling/dependencies)
4. [Loading and storing data efficiently](/scaling/data)
5. [Organizing results for smoother collaboration](/scaling/tagging)

Before you proceed, make sure to [configure infrastructure for Metaflow](/getting-started/infrastructure) or sign up for a [Metaflow Sandbox](https://outerbounds.com/sandbox/).