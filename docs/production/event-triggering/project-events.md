# Deploying Variants of Event-Triggered Flows

Consider this advanced scenario: You have deployed two flows [linked together via `@trigger_on_finish`](/production/event-triggering/flow-events#passing-data-across-flows).
The flows run happily in production. At some point, you want to experiment with a new modeling approach. In order to know if the new approach works better than the
current production version, you'd like to run them concurrently using the same data, maybe powering an A/B test.

It is critical that the experimental variant doesn't interfere with the production version. Conceptually, you would like to have two isolated deployments like here:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer playing controls muted loop url='/assets/et-variants.mp4' width='100%' height='100%'/>

Fortunately, you can achieve such isolated deployments by using [the `@project` decorator](/production/coordinating-larger-metaflow-projects) in conjunction with `@trigger_on_finish`.

## Using `@project` and `@trigger_on_finish` together

```python
from metaflow import FlowSpec, step, current, project

@project(name='variant_demo')
class FirstProjectFlow(FlowSpec):

    @step
    def start(self):
        print("This deployment is called", current.project_flow_name)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    FirstProjectFlow()
```

and 

```python
from metaflow import FlowSpec, step, trigger_on_finish, current, project

@trigger_on_finish(flow='FirstFlow')
@project(name='variant_demo')
class SecondProjectFlow(FlowSpec):

    @step
    def start(self):
        print("This deployment is called", current.project_flow_name)
        print("This run was triggered by", current.trigger.event)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    SecondProjectFlow()
```

Deploy both the flows on Argo Workflows:
```
python firstproject.py argo-workflows create
python secondproject.py argo-workflows create
```

and trigger the first one manually:

```
python firstproject.py argo-workflows trigger
```

Thanks to `@project`, the flows are deployed with a special name that includes a branch prefix. By default, [each user gets their own prefix](/production/coordinating-larger-metaflow-projects#single-flow-multiple-developers), so you should the output of the `start` step of `FirstProjectFlow` should look like:
```
The deployment is called variant_demo.user.alice.FirstProjectFlow
```




