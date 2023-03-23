# Episode 8: Autopilot

## Scheduling Compute in the Cloud.

This example revisits [Episode 06-statistics-redux: Computing in the Cloud](episode06.md). Wi th Metaflow, you don't need to make any code changes to schedule your flow in the cloud. In this example, we will schedule the `stats.py` workflow using the `argo-workflows create` command-line argument. This instructs Metaflow to schedule your flow on [Argo Workflows](https://argoproj.github.io/argo-workflows/) without changing any code. You can execute your flow on Argo Workflows by using the `argo-workflows trigger` command-line argument. You can use a notebook to set up a simple dashboard to monitor all of your Metaflow flows.

You can find the tutorial code on [GitHub](https://github.com/Netflix/metaflow/tree/master/metaflow/tutorials/08-autopilot)

**Showcasing:**

- `argo-workflows createe` command-line option
- `argo-workflows trigger` command-line option
- Accessing data locally or remotely through the Metaflow [Client API](../../../metaflow/client.md)

**Before playing this episode:**

1. `python -m pip install notebook`
2. `python -m pip install plotly`
3. This tutorial requires access to compute and storage resources on AWS, which can be configured by
   1. Following the instructions [here](https://outerbounds.com/docs/engineering-welcome/) or
   2. Requesting [a sandbox](https://outerbounds.com/sandbox/).

**To play this episode:**

1. `cd metaflow-tutorials`
2. `python 02-statistics/stats.py --with kubernetes argo-workflows create --max-workers 4`
3. `python 02-statistics/stats.py argo-workflows trigger`
4. `jupyter-notebook 08-autopilot/autopilot.ipynb`
5. Open _**autopilot.ipynb**_ in your notebook
