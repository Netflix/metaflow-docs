import ReactPlayer from 'react-player'

# What is Metaflow

Metaflow is a human-friendly Python library that makes it straightforward to develop, deploy, and operate various kinds
of data-intensive applications, in particular those involving data science and ML. Metaflow was originally developed at Netflix to boost the productivity of data scientists who work on a wide variety of projects, from classical statistics to state-of-the-art deep learning.

Metaflow is available as open-source under the [Apache License, Version 2.0](https://github.com/Netflix/metaflow/blob/master/LICENSE).


## What does Metaflow do exactly?

Metaflow provides a unified API to the whole [infrastructure stack](/introduction/why-metaflow) that is required to execute data science projects from prototype to production. Take a look at this simple Metaflow flow that illustrates the concepts:

![image](/assets/what-is-metaflow.svg)

 - **Modeling**: You can use any Python libraries with Metaflow. Metaflow helps [make them available in all environments reliably](/metaflow/dependencies).
 - **Deployment**: Metaflow supports highly available, production-grade [workflow orchestration and other deployment patterns](/going-to-production-with-metaflow/scheduling-metaflow-flows/).
 - **Versioning**: Metaflow [keeps track of all flows, experiments, and artifacts automatically](/metaflow/artifacts).
 - **Orchestration**: Metaflow makes it easy to [construct workflows and test them locally](/metaflow/basics).
 - **Compute**: Metaflow leverages your [cloud account and Kubernetes clusters for scalability](/metaflow/scaling-out-and-up).
 - **Data**: Besides managing the data flow inside the workflow, Metaflow provides patterns for [accessing data from data warehouses and lakes](/metaflow/data).

You could use a separate tool for each of these layers but many data scientists prefer using a unified, thoughtfully
designed library. This also minimizes the operational burden for engineers who manage the infrastructure.

## How does Metaflow support prototyping and production use cases?

Based on our experiences with hundreds of data science and ML projects, we believe that projects should grow gradually
from quick experiments on the laptop, conducted by a single data scientist, to business-critical production deployments developed by a team of experts.

In contrast to traditional software engineering, it is hard to assess the value of a DS/ML project without running realistic experiments, like backtesting models at scale, exposing a prototype to business stakeholders, or running a live A/B test. This should be doable without a high upfront cost. When the value of the project has been proven, it shouldn't be too hard to take the project all the way to large-scale production.

Here is how Metaflow supports projects throughout this journey (click links in the image for more information about specific topics):

<object type="image/svg+xml" data="/assets/metaflow-lifecycle.svg"></object>

A typical project advances through these three stages:

 1. [**Prototyping**](/metaflow/intro): You can [develop and test Metaflow workflows locally](/getting-started/install) without having to deploy
 any infrastructure. Making the local development experience fast and smooth is a key to productivity.
 2. [**Scaling**](/metaflow/scaling-out-and-up): There is only so much data and compute you can manage on a laptop. It is very convenient to be able to [test
 workflows at scale](/metaflow/scaling-out-and-up) as early as possible. This gives you a good idea of how the system is going to behave in production, at no risk.
 3. [**Production**](/going-to-production-with-metaflow/scheduling-metaflow-flows/): A defining feature of any production deployment is *high availability*. No matter how the project is deployed to
 production, it shouldn't require any human attention. Metaflow supports this through [production-grade workflow orchestrators](/going-to-production-with-metaflow/scheduling-metaflow-flows/), deploying to which require no changes in the code. Also, the team needs to be able to continue development of [new versions of the project alongside any production deployments](/going-to-production-with-metaflow/coordinating-larger-metaflow-projects) and be able to A/B test them easily.

You can assess the value of the project at every stage before deciding to invest more. A core tenet of Metaflow is to make simple things simple and demanding production-deployments possible. Read more about the journey from prototype to production in [Introduction to Developing with Metaflow](/metaflow/introduction).

Also - don't consider only the happy path! Any real-world project should [account for failures](/metaflow/failures), consider how the system is [monitored](/going-to-production-with-metaflow/mfgui), and provide clear playbooks for [debugging issues](/metaflow/debugging) occurring at any point in the project's lifecycle, production issues in particular.

## Is Metaflow easy to deploy and operate?

You can get started with local development [by `pip` installing Metaflow](/getting-started/install) like any other Python library. To benefit from
scaling and production features of Metaflow, you need to [deploy Metaflow to your cloud account or Kubernetes cluster](outerbounds)
which can be done using [our Terraform or Cloudformation templates](...) which shouldn't take more than 15-30 minutes, unless
you want to customize the setup. Take a look at [Metaflow resources for engineers](outerbounds) for more information.

In general, engineering teams like Metaflow as it integrates well with the company's existing infrastructure instead
of introducing major new components. Metaflow works with all the major cloud providers ([AWS](...), [Azure](...)) and it provides native, thoroughly-tested integrations to popular systems like [AWS Batch](...), [AWS Step Functions](...), [Kubernetes](...), and [Argo Workflows](...).

Many teams find it comforting to know that Metaflow has been used for serious, large-scale production
use cases involving tens of thousands of flows and millions of runs for more than four years, so the codebase is extremely
well tested and battle-hardened. Also, we provide [a strong guarantee of backwards compatibility for the user-facing API](/api), so you get to stand
on a solid foundation.


## Should I Use Metaflow?

If you are working on an existing project dealing with data and compute, or you are planning to start a new one, consider the following questions:

1. **Scalability**: Do you need more than one laptop-size computer in the project?
2. **Criticality**: Is it important that results are produced correctly and in a timely manner?
3. **Complexity**: Does the project have many moving pieces or many people working together?

If you answered "yes" to any of the above, keep on reading - Metaflow can help you! If the answer is "no" to all of the above, Metaflow doesn't provide much benefit. This is a valid scenario, for instance, when you are hacking small-scale experiments in a notebook. You should come back when the project is ready to move to the next stage.

When the time is right, moving from notebooks-only to [notebooks-with-Metaflow](/metaflow/client) should be a smooth sailing. Metaflow is designed to be user-friendly and welcoming to all data scientists, novice and experts alike, who want to start building
end-to-end applications more indepently.


