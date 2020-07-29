---
description: The administrator's point of view
---

# Why Metaflow?

If you are an individual data scientist who wants to give Metaflow a try, you don't need this guide. All you have to do is to [install Metaflow](https://docs.metaflow.org/getting-started/install). Over time, if you want to start using more advanced features of Metaflow, or, in particular, you want to start collaborating with your colleagues using Metaflow, this guide will come in handy.

Since the early days of Metaflow at Netflix, Metaflow has been designed to be the common layer that binds together infrastructure components, people, and projects. We, like many other people, observed that models are only a small part of an end-to-end data science project. Production-grade projects rely on [a thick stack of infrastructure](https://docs.metaflow.org/introduction/what-is-metaflow#infrastructure-stack-for-data-science) and collaboration across multiple data scientists. **This guide is targeted at systems administrators who want to provide such a common layer for their organization.**

One of the core tenets of Metaflow is [fanatic focus on usability and ergonomics](https://docs.metaflow.org/introduction/what-is-metaflow#3-fanatic-focus-on-the-usability-and-ergonomics). Besides being delightful to use, we want Metaflow to be delightfully simple to operate at scale. From experience, we know that much of the pain related to operating modern machine learning infrastructure is caused by the complexity of large-scale distributed systems. While some of this pain is inherent in nature - complex systems are complex - there's a plenty of accidental complexity in many systems which we can avoid.

Metaflow comes with a number of design choices that make it easy to operate, regardless of whether you have a handful or hundreds of data scientists using Metaflow:

* Metaflow is designed from the ground up to leverage elastic storage and compute services available in the cloud without introducing bottlenecks. **Metaflow scales as well as your cloud provider**.
* All user-facing functionality is provided as a library that provides strong guarantees for backwards compatibility which **implies no migration overhead between versions**. Users can safely upgrade the library without having to fear that their projects break unintentionally.
* Only one simple backend service is required which tracks relatively lightweight metadata so it can scale to hundreds of users and millions of executions with **minimal operational overhead**. It is easy to deploy on various container platforms.
* The Metaflow deployment can be easily configured to **comply with security and data governance requirements of your organization**. Metaflow relies on proven cloud-native governance concepts like IAM and S3 lifecycle policies, instead of trying to reinvent the wheel.
* Metaflow handles both frictionless prototyping as well as production-grade deployments to a highly-available scheduler like AWS Step Functions. Metaflow’s approach makes it possible to **define organization-wide policies and best practices while leaving plenty of freedom for data scientists** to do their job well.

In the next section, we show what a Metaflow deployment looks like in practice.

