

# Using Spot Instances

Metaflow supports running tasks on spot instances, which can significantly
reduce compute costs. Spot instances are spare compute capacity offered at a
discounted price compared to on-demand instances. However, these instances can
be interrupted with a short notice when the cloud provider needs the capacity
back.

:::info
Spot instance support is currently available with `@kubernetes` and `@batch` decorator on AWS.
:::

## Retrying and resuming tasks running on spot instances

Spot instances are inherently unpredictable and may be terminated at any time. To
ensure automatic recovery from failures, use [the `@retry`
decorator](/scaling/failures#retrying-tasks-with-the-retry-decorator) when working
with spot instances.

Also take a look how [`@checkpoint` can help you to resume interrupted
computation](/scaling/checkpoint/introduction). The `@checkpoint` [announcement blog
post](https://outerbounds.com/blog/indestructible-training-with-checkpoint) includes
an example showing how to use `@checkpoint` effectively on spot instaces.

## Graceful handling of spot instance interruptions

When running on spot instances, your code should be designed to handle
potential interruptions gracefully. Metaflow provides built-in support for
detecting spot instance termination notices through the
`current.spot_termination_notice` path. When the cloud provider decides to
reclaim the spot instance, Metaflow will create this file, giving your task
time to clean up before the instance is terminated.

Here's an example that demonstrates how to implement a long-running task that gracefully handles spot instance interruptions:

```python
import os
import time
from metaflow import FlowSpec, step, kubernetes, current


class SpotInterruptionFlow(FlowSpec):

    @kubernetes(node_selector={"node_type": "spot"})
    @step
    def start(self):
        print("Starting long-running task...")
        start_time = time.time()

        try:
            # Run for 5 minutes or until interrupted
            while time.time() - start_time < 300:  # 5 minutes
                if os.path.exists(current.spot_termination_notice):
                    print("SPOT TERMINATION DETECTED...")
                    break

                seconds_elapsed = (time.time() - start_time)
                print(f"Task running for {seconds_elapsed:.1f} seconds...")

                time.sleep(1)  # Status update every 1 second
        except KeyboardInterrupt:
            print("Task was interrupted!")

        print("Task completed or interrupted.")
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    SpotInterruptionFlow()
```

In this example, we use the `@kubernetes` decorator with a `node_selector:
{"node_type": "spot"}` to schedule our task on spot instances. Note that this
requires a spot node group labeled with `node_type: spot` to already exist in
your Kubernetes cluster. The code periodically checks for the existence of a
termination notice file using `current.spot_termination_notice`. When a
termination notice is detected, the task can perform any necessary cleanup and
checkpointing before the instance is reclaimed.

## Testing Spot Instance Interruptions

You can use the AWS FIS (Fault Injection Service) to test how your tasks handle spot instance
interruptions. The AWS console provides an interface to initiate spot instance interruptions for
testing purposes.

![](/assets/aws-spot-interruption.png)

## Spot Instance Metadata

When a termination notice is received, Metaflow populates the following metadata fields:

| Field | Example Value |
|----------|---------|
| spot-termination-received-at | 2025-01-16T22:15:50Z |
| spot-termination-time | 2025-01-16T22:17:47Z |
