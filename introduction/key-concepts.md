# Key Concepts

If you are an individual data scientist who wants to give Metaflow a try, you don't need this guide. All you have to do is to [install Metaflow](https://docs.metaflow.org/getting-started/install). This guide is targeted at administrators who are responsible for deploying and maintaining a shared backend for Metaflow that is meant to be used by multiple data scientists.

This is where Metaflow shines: Metaflow was originally built at Netflix to increase productivity of a whole organization of data scientists. Models are only a small part of an end-to-end data science project. Production-grade projects rely on [a thick stack of infrastructure](https://docs.metaflow.org/introduction/what-is-metaflow#infrastructure-stack-for-data-science) and collaboration across multiple data scientists. Metaflow is designed to be the common layer that binds together infrastructure components, people, and projects.

### Infrastructure Requirements

Metaflow can be used in _the local mode,_ e.g. on a laptop_,_ without any connection to the outside world. The local mode precludes any sharing and most advanced use cases of Metaflow, so it is recommended that for any serious use cases an administrator sets up infrastructure that allows Metaflow to be used in the shared mode.

At the minimum, two infrastructure components are required by the shared mode:

1. **A shared object store**, e.g. AWS S3, that is used to store [Metaflow artifacts](https://docs.metaflow.org/metaflow/basics#linear).
2. **Metaflow metadata service** which is used to keep track of Metaflow runs, artifacts, and other metadata.



 

Security and Data Governance



### Client vs. Server

Most of the functionality of Metaflow is provided as a relatively lightweight Python library. 



Change Management

The public APIs provided by the Metaflow library are guaranteed to be very stable, abstracting away changes in the underlying infrastructure.

Our backwards compatibility guarantee means that data scientists can upgrade the Metaflow library freely without having to worry about their code breaking unintentionally. Production deployments of Metaflow projects deploy a fixed version of the Metaflow library with the user code

