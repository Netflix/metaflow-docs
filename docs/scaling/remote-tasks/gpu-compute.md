
# Using GPUs and Other Accelerators

Metaflow enables access to hardware-accelerated computing, GPUs in particular, when
using [AWS Batch](aws-batch) or [Kubernetes](kubernetes).
You can leverage

- Single accelerators - e.g. `@resources(gpu=1)`
- Single instances with multiple accelerators - e.g. `@resources(gpu=4)`
- [Multiple instances with multiple accelerators](distributed-computing)

You can find many examples of how to use Metaflow to fine-tune LLMs and
other generative AI models, as well as how to train computer
vision and other deep learning models [in these articles](https://outerbounds.com/blog/?category=Foundation%20Models).

## Using accelerators

Before you can start taking advantage of hardware-accelerated steps, you need
to take care of two prerequisites:

1. Add hardware-accelerated instances in [your Metaflow stack](/getting-started/infrastructure).
Take a look specific tips for [AWS Batch](aws-batch) and [Kubernetes](kubernetes).

2. Configure your flow to [include necessary drivers and frameworks](installing-drivers-and-frameworks).

After this, using the accelerators in straightforward as explained below.

:::tip
Don't hesitate to reach out to [Metaflow Slack](http://chat.metaflow.org) if you need
help get started!
:::

### GPUs

To use GPUs in your compute environment, use [the
`@resources` decorator](requesting-resources) to get quick access to one or more GPUs
like in this example:

```python
from metaflow import FlowSpec, step, resources

class GPUFlow(FlowSpec):

    @resources(memory=32000, cpu=4, gpu=1)
    @step
    def start(self):
        from my_script import my_gpu_routine
        my_gpu_routine()
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    GPUFlow()
```

As usual with `@resources`, the decorator is ignored for local runs. This allows you to
develop the code locally, e.g. using GPU resources on your local workstation. To get access
to the requested resources in the cloud, run the flow `--with kubernetes` or `--with batch`.

If you need more fine-grained control over what GPUs get used, use the decorators
specific to compute environment: For instance, [`@kubernetes` allows you to
specify a `gpu_vendor`](/api/step-decorators/kubernetes) and [`@batch` allows you to
specify a `queue`](/api/step-decorators/batch) targeting a compute environment containing
specific GPUs. For more information, see guidance for [AWS Batch](aws-batch) and [Kubernetes](kubernetes).


### Using AWS Trainium and Inferentia

On AWS, you can use AWS-specific hardware accelerators, Trainium and Inferentia.
For more details, see [a blog post outlining them in the context of Metaflow](https://aws.amazon.com/blogs/machine-learning/develop-and-train-large-models-cost-efficiently-with-metaflow-and-aws-trainium/).

When using AWS Batch, you can request the accelerators simply by defining the number 
of Trainium or Inferentia cores in `@batch`:

* `@batch(trainium=16)`
* `@batch(inferentia=16)`

Note that Metaflow supports [distributed training](distributed-computing) over multiple
Trainium instances. For detailed instructions, visit
the [`metaflow-trainium` repository](https://github.com/outerbounds/metaflow-trainium/tree/main).

:::note
Contact [Metaflow Slack](http://chat.metaflow.org) if you are interested in using Trainium
of Inferentia with `@kubernetes`.
:::


### Using Google's Tensor Processing Units (TPUs)

Contact [Metaflow Slack](http://chat.metaflow.org) if you are interested in using TPUs with
Metaflow in the Google cloud.

## Monitoring GPU utilization

To monitor GPU devices and their utilization, add [a custom card
`@gpu_profile`](https://github.com/outerbounds/metaflow-gpu-profile) in your GPU steps.

![](/assets/gpu_profile.png)

