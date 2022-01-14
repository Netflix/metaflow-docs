# Coordinating Larger Metaflow Projects

Most Metaflow projects start as a simple Python script that is developed by a single data scientist. Metaflow takes care of [keeping results organized automatically](https://docs.metaflow.org/metaflow/tagging), so you can focus on developing models and the business logic around them.

Over time, the project matures to the point that you want to [deploy it to AWS Step Functions](https://docs.metaflow.org/going-to-production-with-metaflow/scheduling-metaflow-flows) to test how the model works with real-life, updating data. In Metaflow, this is a matter of executing a single command, step-functions create. Having the workflow run automatically with fresh data is a great way to surface unforeseen issues in the code.

After a few iterations, the workflow starts to work reliably. If the results are promising enough, stakeholders can start relying on the results of your workflow. Often, success attracts more developers to join the project. At this point, you will need to start thinking how to coordinate work amongst multiple people and how to iterate on new, experimental versions of the workflow while providing stable results to your stakeholders. This is where the `@project` decorator comes in.

## The `@project` decorator

During development, multiple people can work on the same workflow simultaneously as Metaflow keeps executions isolated through [independently stored artifacts and namespaces](https://docs.metaflow.org/metaflow/tagging). However, by default, all [AWS Step Functions deployments](https://docs.metaflow.org/going-to-production-with-metaflow/scheduling-metaflow-flows) are bound to the name of the workflow. If multiple people call `step-functions create` independently, each deployment will overwrite the previous one.

In the early stages of a project, this simple model is convenient but as the project grows, it is desirable that multiple people can test their own AWS Step Functions deployments without interference. Or, as a single developer, you may want to experiment with multiple independent AWS Step Functions deployments of your workflow.

Metaflow provides a `@project` decorator to address this need. The `@project` decorator is used at the `FlowSpec`-level to bind a Flow to a specific project. All flows with the same project name belong to the same project.

You can test this by executing the following flow.

{% code title="project_flow.py" %}
```python
from metaflow import FlowSpec, step, project, current

@project(name='example_project')
class ProjectFlow(FlowSpec):

    @step
    def start(self):
        print('project name:', current.project_name)
        print('project branch:', current.branch_name)
        print('is this a production run?', current.is_production)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    ProjectFlow()
```
{% endcode %}

Save the above snippet in a file, `project_flow.py`. Now you can run the flow as usual:

```python
python project_flow.py run
```

The `@project` decorator exposes new project-related attributes, `project_name`, `branch_name`, and `is_production` in [the current object](https://docs.metaflow.org/metaflow/tagging#accessing-current-ids-in-a-flow) which you can use to alter the behavior of the flow depending on the execution context. Besides the new attributes in current, the flow works exactly as before when executed outside AWS Step Functions.

## Projects on AWS Step Functions

The main benefit of `@project` relates to [deployments on AWS Step Functions](https://docs.metaflow.org/going-to-production-with-metaflow/scheduling-metaflow-flows). Next, we will cover its main use case: Managing a project with multiple developers collaborating.

### Single Flow, Multiple Developers

If ProjectFlow did not have a @project decorator, it would get deployed as a workflow called ProjectFlow on AWS Step Functions by step-functions create. Only one version of ProjectFlow could exist on AWS Step Functions at a time. Everyone deploying the flow would need to know [the production token](https://docs.metaflow.org/metaflow/tagging#production-namespaces) assigned to the deployment.

On the AWS Step Functions UI, you would see one workflow called `ProjectFlow`:

![](https://lh6.googleusercontent.com/EYiiL19aH222-JgMp4\_Quz-TqEmRX1M9bu8wWdW3ColDjFN6rHytxaKv6qh3q-EzDxiz-Ok9r-BEbw1oSJJr7E38NZFqVtucfrEyfMuVdRx6MTwSoLvPtDtwGKvksmpLajomOzp8)

The `@project` decorator changes this behavior. Let's deploy ProjectFlow:

```python
python project_flow.py step-functions create
```

The `@project` decorator adds a user-specific prefix in the workflow name: the workflow gets deployed with a name like `example_project.user.YOURNAME.ProjectFlow` where `YOURNAME` is your user name.

This allows multiple developers to deploy their workflows on AWS Step Functions without fear that they might interfere with someone else's deployment. Imagine Alice, Bob, and Carol collaborating on a project. Each one of them can call `step-functions create` independently, which results in three separate workflows on AWS Step Functions:

![](https://lh5.googleusercontent.com/zAs6l7ZSZEA68ARLaDtwc\_V\_PHKhvaWHnvvFs2I\_QofMnxh8R3-yeGdcPYaXp\_UoGpMEfIqJL9kU4ZcT6k\_YgqiAvWw8oYGB8hC5TmNXp1-66mmukDIJuLkH6na3zfEDJ2UggTzl)

Note that each one of these deployments gets [an isolated namespace](https://docs.metaflow.org/metaflow/tagging) and [a separate production token](https://docs.metaflow.org/metaflow/tagging#production-tokens). This means that if your code refers to `Flow('ProjectFlow').latest_run` on AWS Step Functions, it is guaranteed to refer to a run that corresponds to its own isolated deployment. The deployments don't interfere with each other.

#### Production Deployment

In addition to user-specific deployments, most projects have a single blessed production version which represents the official results of the workflow.

The `@project` decorator exposes a new top-level command-line argument, `--production` that denotes a production run or deployment. See what happens when you run ProjectFlow with `--production`:

```python
python project_flow.py --production run
```

The `current.branch_name` will be set to prod and `current.is_production` is set to True. For instance, you could write results to a production table only if `current.is_production`.

You can deploy a production version to AWS Step Functions as follows:

```python
python project_flow.py --production step-functions create

```

Instead of deploying the flow with a user-specific prefix, this will deploy the flow as `example_project.prod.ProjectFlow`. You will get a warning about missing production token if you are not authorized to deploy the flow to production.

The production deployment gets a separate, isolated namespace of its own:

![](https://lh6.googleusercontent.com/pTFm6xYWlL2wqJNmEwAOYj34wwt\_2TLZlDbWrJIEDo2q7ksBOcMlll9kVW-n27cvTw8RKAxUyt9gYD0PgvEwnUWz0m1\_daVeR5HeOjuxbBH7WDf1LiwwSwLjs7CGFM48l6RPIvTJ)

#### Custom Branches

Imagine that ProjectFlow has a stable version in production. Now, Alice and Bob want to start developing a new, experimental version of the flow. They can work on a common codebase and run the code locally independently. Eventually, they will want to deploy the experimental version to AWS Step Functions and let it run in parallel with the production version for a while, to see that it works correctly.

Alice and Bob could deploy the experimental version under a user-specific namespace of theirs but this would make it hard to keep iterating on the code, as one of the user namespaces would be reserved for the long-running experiment. A better approach is to deploy the experimental code under a custom branch.

Try the following:

```python
python project_flow.py --branch better_version run
```

The flow reports that the branch name is `test.better_version`. You can deploy the custom branch to AWS Step Functions:

```python
python project_flow.py --branch better_version step-functions create
```

which will result in another separate, isolated namespace:

![](https://lh6.googleusercontent.com/uv8Zt8Rni77skhjJ90kw6pw6VcnOT2whBTSUstZHzT1-1yqOP61UGx8220Jn068xisYlh31wPjrjVl\_IWxmVHsLVyRZ1-MPZ911EqTjs3ff2vXJ\_MLt7rEnPIJ\_QEX6CLIn4p84o)

Alice and Bob can share the production token corresponding to the branch, so either of them can redeploy the branch when needed.\


#### Custom branches for Production deployment

There are scenarios where Alice might need to run multiple variants of ProjectFlow in production. Alice can very simply use custom branches to run multiple production versions -

Try the following:

```python
python project_flow.py --branch better_version --prodduction run
```

The flow reports that the branch name is `prod.better_version`. You can deploy the custom branch to AWS Step Functions:

```python
python project_flow.py --branch better_version --production step-functions create
```

#### Summary

The `@project` decorator makes available three classes of namespaces that will affect the behavior of `step-functions create`:

* `user` is the default. It will deploy to a user-specific, private namespace. Use it for testing production deployments.
* `test` denotes custom branches that can be shared amongst multiple users. Use it for deploying experimental versions that can run in parallel with production. Deploy custom branches with `--branch foo`.
* `prod` denotes the global production namespace. Use it for deploying the official production version of the project. Deploy to production with `--production`. For multiple production variants, deploy custom branches with `--production --branch foo`.

Note that the isolated namespaces offered by `@project` work best when your code is designed to respect these boundaries. For instance, when writing results to a table, you can use `current.branch_name` to choose the table to write to or you can disable writes outside production by checking `current.is_production`.\
