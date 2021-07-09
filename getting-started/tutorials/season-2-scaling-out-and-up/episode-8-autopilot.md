# Episode 8: Autopilot

## Scheduling Compute in the Cloud.

This example revisits '[Episode 06-statistics-redux: Computing in the Cloud](episode06.md)'. With Metaflow, you don't need to make any code changes to schedule your flow in the cloud. In this example, we will schedule the `stats.py` workflow using the `step-functions create` command-line argument. This instructs Metaflow to schedule your flow on AWS Step Functions without changing any code. You can execute your flow on AWS Step Functions by using the `step-functions trigger` command-line argument. You can use a notebook to set up a simple dashboard to monitor all of your Metaflow flows.

You can find the tutorial code on [GitHub](https://github.com/Netflix/metaflow/tree/master/metaflow/tutorials/08-autopilot).

**Showcasing:**

* `step-functions create` command-line option
* `step-functions trigger` command-line option
* Accessing data locally or remotely through the Metaflow [Client API](../../../metaflow/client.md)

**Before playing this episode:**

1. `python -m pip install notebook`
2. `python -m pip install plotly`
3. This tutorial requires access to compute and storage resources on AWS, which can be configured by 
   1. Following the instructions [here](https://admin-docs.metaflow.org/metaflow-on-aws/deployment-guide) or 
   2. Requesting a [sandbox](https://docs.metaflow.org/metaflow-on-aws/metaflow-sandbox).

**To play this episode:**

1. `cd metaflow-tutorials`
2. `python 02-statistics/stats.py --environment=conda --with conda:python=3.7,libraries="{pandas:0.24.2}" step-functions create --max-workers 4`
3. `python 02-statistics/stats.py step-functions trigger`
4. `jupyter-notebook 08-autopilot/autopilot.ipynb`
5. Open _**autopilot.ipynb**_ in your remote Sagemaker notebook.

