
# Deploying Infrastructure for Metaflow

While you can [get started with Metaflow easily](/getting-started/install) on your laptop, the main benefits of Metaflow lie in its
ability to [scale out to external compute clusters](/scaling/introduction) and to [deploy to production-grade workflow orchestrators](/production/introduction).
To benefit from these features, you need to configure Metaflow and the infrastructure behind it appropriately. A separate guide, [Metaflow Resources for Engineers](https://outerbounds.com/engineering/welcome/) covers everything related to such
deployments. This page provides a quick overview.

## Supported infrastructure components

Since modern data science / ML applications are powered by a number of interconnected systems,
 it is useful to organize them as an infrastructure stack like the one illustrated below ([Why? See here](/introduction/why-metaflow).
You can see logos of all supported systems which you can use to enable each layer.

Consider this illustration as a menu that allows you to build your own pizza: You get to customize your own crust, sauce, toppings, and cheese. You can make the choices based on your existing business infrastructure and the requirements and preferences
of your organization. Fortunately, Metaflow provides a consistent API for all these combinations, so you can
even change the choices later without having to rewrite your flows.

<object style={{width: 700}} type="image/svg+xml" data="/assets/infra-stack.svg"></object>

The table below explains the five major deployment options for Metaflow and what components of the stack are
supported in each. You can choose to deploy Metaflow on:

1. **Only local** environment - [just `pip install metaflow` on any workstation](/getting-started/install).
2. **AWS** either on [EKS as a Kubernetes platform](https://outerbounds.com/engineering/deployment/aws-k8s/deployment/) or [using AWS-managed services](https://outerbounds.com/engineering/deployment/aws-managed/introduction/).
3. **Azure** on [AKS as a Kubernetes platform](https://outerbounds.com/engineering/deployment/azure-k8s/deployment/).
4. **Google Cloud** on [GKE as a Kubernetes platform](https://outerbounds.com/engineering/deployment/gcp-k8s/deployment/).
4. [Any **Kubernetes** cluster](https://outerbounds.com/engineering/deployment/aws-k8s/deployment/) including on-premise deployments.

| Layer         | Component                                                                                                    | Description                                        | Only Local | AWS | Azure | GCP | K8s |
|---------------|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------|------------|-----|-------|-----|-----|
| Modeling      | <img src="/assets/infra-python.png" width=" 30" style={{verticalAlign:"middle"}}/> **Python libraries**      | Any Python libraries                               | 🟢         | 🟢  | 🟢    | 🟢 | 🟢  |
| Deployment    | <img src="/assets/infra-argo.png" width=" 30" style={{verticalAlign:"middle"}}/> **Argo Workflows**          | Open-source production-grade workflow orchestrator |            | 🟢  | 🟢    | 🟢 | 🟢  |
| Deployment    | <img src="/assets/infra-sfn.png" width=" 30" style={{verticalAlign:"middle"}}/> **Step Functions**           | AWS-managed production-grade workflow orchestrator |            | 🟢  |       |     |     |
| Versioning    | <img src="/assets/infra-mflocal.png" width=" 30" style={{verticalAlign:"middle"}}/> **Local Metadata**       | Metaflow's tracking in local files                 | 🟢         | 🟢  | 🟢    | 🟢  | 🟢  |
| Versioning    | <img src="/assets/infra-metaflow.png" width=" 30" style={{verticalAlign:"middle"}}/> **Metadata Service**    | Metaflow's tracking in a central database          |            | 🟢  | 🟢    | 🟢  | 🟢  |
| Orchestration | <img src="/assets/infra-mflocal.png" width=" 30" style={{verticalAlign:"middle"}}/> **Local Orchestrator**   | Metaflow's local workflow orchestrator             | 🟢         | 🟢  | 🟢    | 🟢  | 🟢  |
| Compute       | <img src="/assets/infra-mflocal.png" width=" 30" style={{verticalAlign:"middle"}}/> **Local Processes**      | Metaflow tasks as local processes                  | 🟢         | 🟢  | 🟢    | 🟢  | 🟢  |
| Compute       | <img src="/assets/infra-batch.png" width=" 30" style={{verticalAlign:"middle"}}/> **AWS Batch**              | AWS-managed batch compute service                  |            | 🟢  |       |     |
| Compute       | <img src="/assets/infra-k8s.png" width=" 30" style={{verticalAlign:"middle"}}/> **Kubernetes**               | Open-source batch compute platform                 |            | 🟢  | 🟢    | 🟢  | 🟢  |
| Data          | <img src="/assets/infra-mflocal.png" width=" 30" style={{verticalAlign:"middle"}}/> **Local Datastore**      | Metaflow artifacts in local files                  | 🟢         | 🟢  | 🟢    | 🟢  | 🟢  |
| Data          | <img src="/assets/infra-s3.png" width=" 30" style={{verticalAlign:"middle"}}/> **AWS S3**                    | Metaflow artifacts in AWS-managed storage          |            | 🟢  |       |     | 🟢  |
| Data          | <img src="/assets/infra-azureblob.png" width=" 30" style={{verticalAlign:"middle"}}/> **Azure Blob Storage** | Metaflow artifacts in Azure-managed storage        |            |     | 🟢    |     | 🟢  |
| Data          |<img src="/assets/infra-gcs.png" width=" 30" style={{verticalAlign:"middle"}}/> **Google Cloud Storage**      | Metaflow artifacts in Google-managed storage       |            |     |       | 🟢  | 🟢  |
Note that fast prototyping with the Local Orchestrator is supported in all these options, but the **only local** option doesn't support scalability with an external compute layer, nor production-grade deployments.

:::info
You can test the AWS/Azure/GCP/Kubernetes stack easily in your browser for free by signing up for a [Metaflow Sandbox](https://outerbounds.com/docs/sandbox/).
:::

## Example stacks

Here are some typical deployments that we have seen in action:

### Local: Effortless prototyping

**Just `pip install metaflow` to deploy this stack**

This is the stack you get by default when you [install Metaflow locally](/getting-started/install). It's main benefit is zero
configuration and maintenance - it works out of the box. It is a great way to get started with Metaflow.

<object style={{width: 700}} type="image/svg+xml" data="/assets/infra-stack-all-local.svg"></object>

When you want to start [collaborating with multiple people](/scaling/tagging) which requires a central metadata service, or
you want to start running [larger-scale workloads](/scaling/introduction), or you want to [deploy your workflows](/production/introduction) so that they
run even when your laptop is asleep, look into more featureful stacks below.

### Low-maintenance scalable prototyping, powered by AWS

**[Click here to deploy this stack](https://outerbounds.com/engineering/deployment/aws-managed/introduction/)**

If you are looking for the easiest and the most affordable way to scale out compute to the cloud, including cloud-based GPUs,
this stack is a great option. Consider the benefits:

- Artifacts are stored in AWS S3, so you don't have to worry about running out of storage or losing data.
- Scalability is managed by [AWS Batch](https://aws.amazon.com/batch/) which requires no maintenance after the initial setup.
- [AWS Batch](https://aws.amazon.com/batch/) is very cost-effective: You pay only for the EC2 instance time used by second, with no additional costs. To
  reduce the cost of compute even further, you can leverage spot instances.

<object style={{width: 700}} type="image/svg+xml" data="/assets/infra-stack-scaling.svg"></object>

In this stack, the main missing piece is [a highly-available workflow orchestrator](/production/introduction) which you can easily add by upgrading
to the option below. Also, larger teams with more involved compute needs may find [AWS Batch](https://aws.amazon.com/batch/) limiting, in which case you
can look into Kubernetes-based stacks.

### Low-maintenance full stack, powered by AWS

**[Click here to deploy this stack](https://outerbounds.com/engineering/deployment/aws-managed/introduction/)**

If you need the full stack of data science/ML infrastructure but want to spend a minimal amount of effort to
set up and manage it, choose this option. You get all the benefits of AWS Batch as described above, as well as production
deployments on [AWS Step Functions](https://aws.amazon.com/step-functions/) which is a highly-available, scalable workflow orchestrator managed by AWS. Metaflow
tracks everything in a central metadata service, making collaboration straightforward.

<object style={{width: 700}} type="image/svg+xml" data="/assets/infra-stack-aws-native.svg"></object>

Here are the main reasons for not using this stack:

- You want to use another cloud besides AWS.
- You need a more customizable workflow orchestrator and a compute platform than what the AWS-managed services can provide.

### Customizable full stack on AWS, powered by Kubernetes

**[Click here to deploy this stack](https://outerbounds.com/engineering/deployment/aws-k8s/deployment/)**

If your engineering team has prior experience with Kubernetes, they might prefer a familiar stack that works with their existing
security policies, observability tools, and deployment mechanisms. In this case, this Kubernetes-native stack featuring compute
on Kubernetes and deployments on reliable, scalable, open-source [Argo Workflows](https://argoproj.github.io/argo-workflows/) is a good option.

This stack can be [easily deployed on EKS on AWS](https://outerbounds.com/engineering/deployment/aws-k8s/deployment/), leveraging S3 as the datastore. Alternatively, some companies run this stack on-premise
using [Minio](https://min.io/) as an S3-compatible datastore.

<object style={{width: 700}} type="image/svg+xml" data="/assets/infra-stack-aws-k8s.svg"></object>

This stack requires more maintenance than the AWS-native stack above, although the basic setup is quite manageable if your organization is already familiar with Kubernetes.

### Customizable full stack on Azure, powered by Kubernetes

**[Click here to deploy this stack](https://outerbounds.com/engineering/deployment/azure-k8s/deployment/)**

If you need a full-stack DS/ML platform on Azure, this Kubernetes-based stack is a good option. It is the same stack as the one running on EKS on AWS, with the S3-based datastore replaced with Azure Blob Storage.

<object style={{width: 700}} type="image/svg+xml" data="/assets/infra-stack-azure.svg"></object>

This stack incurs a typical maintenance overhead of an AKS-based Kubernetes cluster, which shouldn't add much burden if your organization
uses AKS already.

### Customizable full stack on Google Cloud, powered by Kubernetes

**[Click here to deploy this stack](https://outerbounds.com/engineering/deployment/gcp-k8s/deployment/)**

If you need a full-stack DS/ML platform on Google Cloud, this Kubernetes-based stack is a good option. It is the same stack as the one running on EKS on AWS, with the S3-based datastore replaced with Google Cloud Storage.

<object style={{width: 700}} type="image/svg+xml" data="/assets/infra-stack-gcp.svg"></object>

This stack incurs a typical maintenance overhead of an GKE-based Kubernetes cluster, which shouldn't add much burden if your organization
uses GKE already.


---

If you are unsure about the stacks, just run `pip install metaflow` to install the local stack and move on to [the tutorials](/getting-started/tutorials). Flows you create will work without changes on any of these stacks.
