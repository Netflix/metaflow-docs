
# Production Deployments

What does *production* mean exactly? Surely the answer depends on who you ask and what application they are working on. There are so many different
ways to produce business value with machine learning and data science that there can't be a single unambiguous definition or a way to deploy
projects to production.

However, there are characteristics that are common to all production deployments:

 - Production deployments should **run without human intervention**. It is not very practical to use results that require you to execute `run`
 on your laptop to power serious business processes or products.

 - Production deployments should **run reliably** in a highly available manner. Results should appear predictably, even if infrastructure encounters spurious failures.

Consider the Metaflow journey

![](/assets/intro-cartoon-3.svg)

Thus far the steps have involved a human in the loop, from [local development](/metaflow/introduction) to [scalable flows](/scaling/introduction).
In contrast, a defining feature of production deployments is that they are fully automated. We achieve this by *scheduling flows* to run automatically on
*a production-grade workflow orchestrator* so you don't need to write `run` manually to produce the desired results.

## Reliably Running, Automated Flows

What about the second characteristic of production deployments - reliability? Firstly, a big benefit of [Stage II](/scaling/introduction) is that you can
test your workflows at scale, and add [reliability-enhancing](/scaling/failures) [features](/scaling/dependencies), making sure your flows can cope with
production-scale workloads. Secondly, your flow needs to be orchestrated by a system that by itself runs reliably, which is [harder than it sounds](https://netflixtechblog.com/unbundling-data-science-workflows-with-metaflow-and-aws-step-functions-d454780c6280). Such a production-grade orchestrator needs to be

 - **Highly available**: The orchestrator itself must not crash, even if a server it runs on hits a random failure.

 - **Highly scalable**: We shouldn't have to worry about the number flows orchestrated by the system.

 - **Capable of triggering flows based on different conditions**: We should be able to automate flow execution flexibly.

 - **Easy to monitor and operate**: To minimize the time spent on occasional human interventions.

Fortunately, a few systems are able to fulfill these requirements, judging by their track record. Metaflow integrates with two of them:
[Argo Workflows](https://argoproj.github.io/argo-workflows/) that runs on Kubernetes and [AWS Step Functions](https://aws.amazon.com/step-functions/),
a managed service by AWS.

While these systems are quite complex under the hood, Metaflow makes using them trivial:
You can deploy your flows literally with a single command - no changes in the code required!

### Patterns of production deployments

Once flows run reliably, you can leverage the results - like freshly trained models - on various systems:

1. You can write fresh predictions or other results in a data warehouse, e.g. to power a dashboard.
2. You can populate fresh results in a cache e.g. for a recommendation system.
3. You can deploy models on a *model hosting* platform of your choosing, e.g. [Seldon](https://www.seldon.io/) or [AWS Sagemaker](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-deployment.html).

The exact pattern depends on your use case. Importantly, creating these integrations become much easier when you can trust your flows to run reliably. We are happy to help
you on [the Metaflow support Slack](http://slack.outerbounds.co) to find a pattern that works for your needs.

## To Production And Back

While the journey illustration above looks like a linear path from prototype to production, realistically the picture should illustrate loops everywhere. In particular, there is
constant interaction between local development and production deployments, as you troubleshoot production issues (inevitably), as well as keep working on newer versions of flows. 

When it comes to troubleshooting, a hugely convenient feature is the ability to [`resume` failed production runs locally](/metaflow/debugging#reproducing-production-issues-locally).
Also, remember that you can inspect the state of any production run with [cards](/metaflow/visualizing-results) and [notebooks](/metaflow/client), in real-time.

When it comes to working on newer versions, how do you know if a newer version performs better than the latest production deployment? Often, the best way to answer the question is
to deploy the new version to run concurrently with the existing production version and compare the results, as in an A/B test.
This pattern is enabled by [the `@project` decorator](coordinating-larger-metaflow-projects). Also, [Metaflow tags](https://outerbounds.com/blog/five-ways-to-use-the-new-metaflow-tags/)
come in handy when designing processes around production deployments.

## What You Will Learn

In this section, you will learn how to make your flows run automatically without any human intervention. 

1. [Scheduling Metaflow flows](/production/scheduling-metaflow-flows/introduction).
   - Depending on the [infrastructure you have installed](/getting-started/infrastructure), pick a section below:
      - [Scheduling flows with Argo Workflows](/production/scheduling-metaflow-flows/scheduling-with-argo-workflows) - choose this if running on Kubernetes.
      - [Scheduling flows with AWS Step Functions](/production/scheduling-metaflow-flows/scheduling-with-aws-step-functions)
 2. [Coordinating larger Metaflow projects](/production/coordinating-larger-metaflow-projects) to enable multiple parallel production deployments.

