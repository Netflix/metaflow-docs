# Metaflow Sandbox

As described in [Metaflow on AWS](metaflow-on-aws.md), Metaflow comes with built-in integrations to various services on AWS. The seamless integration to the cloud is a key benefit of Metaflow.

We know that [setting up all the required components in AWS](deploy-to-aws.md) is not trivial. To make it easier to evaluate Metaflow on AWS, we provide a hosted sandbox environment at no cost where you can test Metaflow with your own code and data.

Only a limited number of sandboxes are available. When you sign up, you are added to a waitlist for a private sandbox. It may take anywhere between days to weeks to get access to the sandbox. We will notify you by email once your sandbox is ready. Please [contact us](../introduction/getting-in-touch.md) if you have any questions about signing up or using the sandbox.

## Choose Your Own Sandbox Adventure

Here are some ideas that you can try with the sandbox:

* [The season 2 of tutorials](../getting-started/tutorials/#season-2-scaling-out-and-up) focuses on scaling out. This is a good way to get started. Note that the Season 1 tutorials work with the Sandbox too, when executed `--with batch`.
* You have up to 64 CPU cores at your disposal using [the `@batch` decorator](../metaflow/scaling.md). Test some number crunching! You can run everything in the cloud simply by using `--with batch` or you can mix local and remote steps by adding `@batch` to select steps.
* Test your code with your own data in the cloud using [`IncludeFile`](../metaflow/data.md#data-in-local-files). You can also upload data to your private S3 bucket using [Metaflow's high-performance S3 client](../metaflow/data.md#data-in-s-3-metaflow-s3).
* Test your favorite ML libraries in the cloud using [`@batch`](../metaflow/scaling.md) and the [`@conda`](../metaflow/dependencies.md) decorator. For instance, try a basic hyperparameter search using [a custom parameter grid and foreach](../metaflow/basics.md#foreach). 
* [Schedule your flows](../going-to-production-with-metaflow/scheduling-metaflow-flows.md) on AWS Step Functions and execute them using a time-based trigger.
* Evaluate Metaflow's [experiment tracking and versioning](../metaflow/tagging.md) using local runs and the [Client API](../metaflow/client.md) in a local notebook. In contrast to the local mode, all runs are registered globally in the Metaflow Service regardless of the directory where you run them.
* Test how you can [`resume` tasks locally](../metaflow/debugging.md#how-to-use-the-resume-command) which were originally run remotely using `--with batch`.

## Sandbox Rules

Sandbox is a limited test environment:

* It is solely intended for testing and evaluating Metaflow for data science use cases. **It is not a production environment.** It is also not a general-purpose computation platform.
* While you can test your code with your own datasets, **make sure you don’t use any data that contains confidential information, personal information, or any sensitive information.**
* By default, **your access to the sandbox will expire in 7 days**, after which all data in the sandbox will be permanently deleted. You may contact us by email if you need more time for evaluation.
* There is no internet connectivity in the Sandbox. However, you can still use 3rd party libraries through [Metaflow's `@conda` decorator](../metaflow/dependencies.md). You can include your own [data sets using `IncludeFile`](../metaflow/data.md#data-in-local-files).
* You can use up to 8 concurrent instances with `cpu=8` \(8 cores\) and `memory=30000` \(30GB of RAM\) using [the `@batch` decorator](../metaflow/scaling.md).

It is important that you read and agree to the [Metaflow Sandbox terms of use](https://metaflow.org/sandbox-tos.html) and [privacy policy](https://metaflow.org/sandbox-privacy.html) before signing up.

## Sign up for a Sandbox

You can sign up for a sandbox at [metaflow.org/sandbox](https://metaflow.org/sandbox).

Here is a short screencast that walks you through the process \(no audio\):

{% embed url="https://www.youtube.com/watch?v=SMvgAINYGqU" caption="" %}

1. After agreeing to the Terms of Use and Privacy Policy, you will need to sign up with your GitHub account. This is required so we can verify your identify to prevent abuse.
2. You will be added to a waitlist. You can log in to [metaflow.org/sandbox](https://metaflow.org/sandbox) to see the status of your process. You can expect that the status will remain at "Waiting for the next available sandbox" for many days.
3. You will receive an email to the address specified in your GitHub profile after your sandbox is ready for use. Note that by default the sandbox will remain active only for three days. You can [contact us](../introduction/getting-in-touch.md) if you need more time for evaluation.
4. Once the sandbox is active, you will see a long configuration token in the "Sandbox active" box. Clicking "Click to copy" will copy the text to the clipboard.
5. In your terminal, run `metaflow configure sandbox` which configures Metaflow to use your personal sandbox. Paste the copied string to terminal when prompted and click enter.
6. Write `metaflow status` to confirm that "metadata provider" is a long URL pointing at `amazonaws.com`. Metaflow is now integrated with AWS!
7. In the screencast, a test artifact called `self.models` is added to demonstrate how artifacts are stored in S3.
8. Run your Metaflow workflow locally as usual. All Metaflow runs will now registered to the remote Metadata service by default. All artifacts are also written to S3 by default. You may notice that execution latency is slightly higher due to this.
9. The Sandbox also includes a private [Sagemaker notebook instance](https://docs.aws.amazon.com/sagemaker/latest/dg/nbi.html). Log in to it by click "My Sagemaker notebook" at [metaflow.org/sandbox](https://metaflow.org/sandbox).
10. The notebook includes the `metaflow` package by default. However, the notebook is not tied to a specific user, so you will need to [set the namespace explicitly](../metaflow/tagging.md#switching-namespaces) to match your username. 
11. Since your local run was registered with the Metadata service and artifacts were automatically copied to S3, you can access the locally generated artifact, `models`, in a remote notebook! This demonstrates how Metaflow enables multiple people share results via S3 and the [Client API](../metaflow/client.md).

## After Sandbox Expires

All good things come to an end. After your sandbox expires, all computation is stopped automatically and data is deleted permanently. Reset your Metaflow back to the local mode with `metaflow configure reset`.

Hopefully the sandbox convinced you that you want to keep using Metaflow with AWS. If so, a good next step is to [set up Metaflow to your own AWS account](deploy-to-aws.md) which you can use without any limitations.

