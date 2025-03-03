import ReactPlayer from 'react-player'

# Setting Up the Dev Stack

You can start writing and running flows just by installing Metaflow locally with 
`pip install metaflow`. However, its true power lies in its integration with underlying
infrastructure, which allows you to

 - [run tasks in the cloud at any scale](/scaling/remote-tasks/introduction),
 - [visualize and observe them in a UI](/metaflow/visualizing-results),
 - [deploy them in a highly available production orchestrator](/production/introduction),
 - and compose reactive systems with [event-triggered flows](/production/event-triggering).

All of these features require an infrastructure stack that needs to be configured to work
with Metaflow. In production settings, this infrastructure runs in your cloud account -
as [described on this page](/getting-started/infrastructure) - but you may want to test the
full stack first locally.

Metaflow comes with a one-click script, `metaflow-dev`, which sets up a complete
development stack for you locally on top of [Minikube](https://minikube.sigs.k8s.io/docs/),
including a local metadata service and a database, and [Metaflow UI](https://github.com/Netflix/metaflow-ui).
The stack allows you to [test scaling with `@kubernetes`](/scaling/remote-tasks/kubernetes),
[deployment on Argo Workflows](/production/scheduling-metaflow-flows/scheduling-with-argo-workflows),
as well as [event-triggering](/production/event-triggering).

## When to use `metaflow-dev`

The `metaflow-dev` stack comes in handy in a few scenarios:

 1. It allows you to **test the full functionality of Metaflow** before [deploying it in your cloud account](/getting-started/infrastructure).

 2. You can use it **in your CI/CD workflows to test flows** in a fully isolated, ephemeral environment.

 3. If you want to **contribute extensions for Metaflow**, or make changes in the core Metaflow, the stack
    provides you a compelte development and testing environment.

## How to set up the dev stack

Setting up the stack is straightforward:

1. Install Metaflow with `pip install metaflow`.
2. Ensure that [you have Docker installed](https://docs.docker.com/desktop/).
3. Run `metaflow-dev up`.

The `metaflow-dev` command downloads and installs Minikube. After this, it uses [Tilt](https://tilt.dev/) to deploy
and expose [all components required by Metaflow](/internals/technical-overview) inside Minikube.

After the deployment completes, leave the shell running `metaflow-dev up` open, as it hosts necessary port
forwardings. On the side, open a new shell and execute
`metaflow-dev shell`. This will open a session with a Metaflow configuration pointing at the local stack.
You can now use the shell to develop, run, and deploy Metaflow flows!

You can navigate to the Tilt UI, linked in the console output, to find links to the Metaflow and Argo Workflows UIs.
You can find direct links to the UI in the Metaflow output as well.

### The dev stack in action

Watch this short video (no sound) for a quick setup-to-usage walkthrough:

<ReactPlayer controls url="https://www.youtube.com/watch?v=nPtqj72hfKU" />
<br/>

The video covers:

- Setting up the dev stack
- Observing the stack through the Tilt UI
- Using the stack to run and monitor runs
- Running at scale with `@kubernetes`
- Inspecting results in a notebook, accessing metadata
- Deploying to Argo Workflows
- Tearing down the stack

## Using the dev stack in a CI/CD pipeline

The dev stack is lightweight enough to run in small CI/CD worker nodes, including those provided by GitHub Actions. You
can use the stack to run integration tests for flows in a fully isolated, ephemeral environment.

Take a look at [this example repository](https://github.com/outerbounds/gha-metaflow/) and
[a GitHub Actions config](https://github.com/outerbounds/gha-metaflow/blob/main/.github/workflows/metaflow.yml) for
a template that you can easily apply in your own setup.

