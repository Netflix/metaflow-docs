
# Developing with Metaflow

Every project is a journey. Each stage of the journey presents different challenges and
requirements. Luckily Metaflow allows you to start experimenting easily without having
to worry about all details upfront. Rest assured that when your project grows in scale
and impact, Metaflow helps your code grow accordingly.

A typical project goes through three major stages that are illustrated below. This
section focuses on the first stage - local development. If you are curious about the
next two stages, you can take a peek at [Scalable Flows](/scaling/introduction) and
[Production Deployments](/production/introduction).

![](/assets/intro-cartoon-1.svg)

## Developing on a Personal Workstation

As a data scientist or engineer, your main productivity tool is your personal
workstation, such as a laptop or a cloud workstation. A great thing about a personal
computer is that they allow you to iterate quickly and experiment freely knowing that
you are not accidentally interfering with a colleague's work.

Metaflow treats local development as the first class concern. You can develop and test
Metaflow code locally like any other Python project or a notebook. Here's what often
happens in the early phases of a project:

1. Many data scientists are familiar with notebooks that shine at open-ended exploration
   and quick sketching of solutions. When developing with Metaflow, it is totally ok
   (although not required) to use notebooks for analysis. You can [execute flows in
   notebook](/metaflow/managing-flows/notebook-runs) and use the [Metaflow Client
   API](/metaflow/client) to inspect the results.

2. Once you have a rough idea for the first version of your project, it is useful to
structure it as a workflow, or *flows* in Metaflow parlance. Metaflow makes this easy:
You can copy-paste the best parts of a notebook as steps of a Metaflow flow. For details
why this is a good idea and how to create flows in practice, see [Creating
Flows](/metaflow/basics).

3. Don't consider flows just as static configuration. They are living and dynamic
entities that you should be able to execute locally and improve gradually (this is where
[`resume` comes in handy!](/metaflow/debugging#how-to-use-the-resume-command)). The
workflow becomes the backbone of your application - in particular helping with [data
flow through artifacts](/metaflow/basics#artifacts) - which enables much of the
functionality in the next phases of the project.

## What You Will Learn

Let's go ahead and learn how to create and test Metaflow flows. This stage covers five
core topics:

 1. [Creating flows](/metaflow/basics)
 2. [Inspecting results of flows](/metaflow/client)
 3. [Managing flows programmatically](/metaflow/managing-flows/introduction)
 4. [Visualizing results](/metaflow/visualizing-results)
 5. [Debugging flows](/metaflow/debugging)

These topics work locally on your workstation without any additional infrastructure, so
it is easy to get started.