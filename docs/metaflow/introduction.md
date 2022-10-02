
# Introduction to Developing with Metaflow

Every project is a journey. Each stage of the journey presents different challenges and requirements. Luckily Metaflow
allows you to start experimenting easily without having to worry about all details upfront. Rest assured that when your project grows in scale and impact, Metaflow helps your code grow accordingly.

A typical project goes through three major stages that are illustrated below:

![](/assets/intro-cartoon-1.svg)

This documentation is organized along the lines of the three stages. This part focuses on the first stage, *Developing
with Metaflow*, but it is useful to start by getting an idea of the whole lifecycle, as explained below.

### I. Developing With Metaflow

As a data scientist or engineer, your main productivity tool is your personal workstation, such as a laptop or a
cloud workstation. A great thing about a personal computer is that they allow you to iterate quickly and experiment
freely knowing that you are not accidentally interfering with a colleague's work.

Metaflow treats local development as the first class concern. You can develop and test Metaflow code locally
like any other Python project or a notebook. Here's what often happens in the early phases of a project:

1. Many data scientists are familiar with notebooks that shine at open-ended exploration and quick sketching of solutions. When developing with Metaflow, it is totally ok (although not required) to use notebooks for analysis. Use the [Metaflow Client API](/metaflow/client) to access and organize results of Metaflow runs in a notebook.

2. Once you have a rough idea for the first version of your project, it is useful to structure it as a workflow. Metaflow makes this easy: You can copy-paste the best parts of a notebook as steps of a Metaflow flow. For details why this is a good idea
and how to create workflows in practice, see [Basics of Metaflow](/metaflow/basics).

3. Don't consider workflows just as static configuration. They are living and dynamic entities that you should be able execute locally and improve gradually (this is where [`resume` comes in handy!](/metaflow/debugging#how-to-use-the-resume-command)). The
workflow becomes the backbone of your application - in particular helping with [data flow through artifacts](/metaflow/basics#artifacts) -
which enables much of the functionality in the next phases of the project.

### II. Scaling Workflows

While workstations are great for development, they have two big downsides: First, the amount data and
models you can handle on a workstation is quite limited. Second, they are not stable environments for production-like use cases. 
Metaflow addresses the first issue by making workflows scalable by leveraging the cloud. Before you can benefit from the scalability features of Metaflow, you or an engineer working with you should [configure infrastructure for Metaflow](/getting-started/infrastructure).

1. Just by adding a line of code, `@resources`, in your workflow, you can request more CPUs, memory, or GPUs for a step in your
workflow. It's like getting a bigger laptop instantly with a push of a button! Read [Scaling up and out](/metaflow/scaling-out-and-up) for details.

2. Once your project starts showing promise with realistic-size workloads, it may start attracting interest from colleagues too.
Metaflow contains a number of features, such as [namespaces](/metaflow/tagging), which make collaboration smoother by allowing
many people contribute without interfering with each other's work accidentally.

### III. Production Worflows

What does "production workflows" mean exactly? Simply: They are workflows that run reliably without any human intervention and produce
useful results that can be consumed by surrounding systems. It is quite clear that production workflows can't run on anyone's personal
workstation, but they must be *deployed* to a production-grade workflow orchestrator that keeps them running reliably.

Luckily, if you have gone through the stages I and II, you have a workflow that runs at scale already. [Deploying it to production](#) takes just 
a single command - no changes in the code required! As the project grows in importance and complexity, you may improve it by allowing
[multiple parallel deployments](#) e.g. for A/B testing.

---

So this is how you use Metaflow to develop projects from prototype to production - quite straightforward! 🤗 

Next, let's go ahead with Stage I and [start creating simple workflows](/metaflow/basics).




