
# Checkpoints in ML/AI libraries

Let's explore how `@checkpoint` works in a real-world scenario when checkpointing training progress with popular ML
libraries.

## Checkpointing XGBoost

Like many other ML libraries, [XGBoost](https://xgboost.readthedocs.io/en/stable/) allows you to define custom callbacks
that are called periodically during training. We can create a custom checkpointer that saves the model to a file, using
`pickle`, [as recommended by XGBoost](https://xgboost.readthedocs.io/en/stable/tutorials/saving_model.html), and calls
`current.checkpoint.save()` to persist it.

Save this snippet in a file, `xgboost_checkpointer.py`:

```python
import os
import pickle
from metaflow import current
import xgboost

class Checkpointer(xgboost.callback.TrainingCallback):

    @classmethod
    def _path(cls):
        return os.path.join(current.checkpoint.directory, 'xgb_cp.pkl')

    def __init__(self, interval=10):
        self._interval = interval

    def after_iteration(self, model, epoch, evals_log):
        if epoch > 0 and epoch % self._interval == 0:
            with open(self._path(), 'wb') as f:
                pickle.dump(model, f)
            current.checkpoint.save()

    @classmethod
    def load(cls):
        with open(cls._path(), 'rb') as f:
            return pickle.load(f)  
```

:::tip
Make sure that the checkpoint directory doesn't accumulate files across invocations, which would make the `save`
operation become slower over time. Either overwrite the same files or clean up the directory between checkpoints.
The `save` call will create a uniquely named checkpoint directory automatically, so you can keep overwriting files
across iterations.
:::

We can then train an XGboost model using `Checkpointer`:

```python
from metaflow import FlowSpec, step, current, Flow,\
                     Parameter, conda, retry, checkpoint, card, timeout

class CheckpointXGBoost(FlowSpec):
    rounds = Parameter("rounds", help="number of boosting rounds", default=128)

    @conda(packages={"scikit-learn": "1.6.1"})
    @step
    def start(self):
        from sklearn.datasets import load_breast_cancer

        self.X, self.y = load_breast_cancer(return_X_y=True)
        self.next(self.train)

    @timeout(seconds=15)
    @conda(packages={"xgboost": "2.1.4"})
    @card
    @retry
    @checkpoint
    @step
    def train(self):
        import xgboost as xgb
        from xgboost_checkpointer import Checkpointer

        if current.checkpoint.is_loaded:
            cp_model = Checkpointer.load()
            cp_rounds = cp_model.num_boosted_rounds()
            print(f"Checkpoint was trained for {cp_rounds} rounds")
        else:
            cp_model = None
            cp_rounds = 0

        model = xgb.XGBClassifier(
            n_estimators=self.rounds - cp_rounds,
            eval_metric="logloss",
            callbacks=[Checkpointer()])
        model.fit(self.X, self.y, eval_set=[(self.X, self.y)], xgb_model=cp_model)

        assert model.get_booster().num_boosted_rounds() == self.rounds
        print("Training completed!")
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    CheckpointXGBoost()
```

You can run the flow, saved to `xgboostflow.py`, as usual:

```
python xgboostflow.py --environment=conda run
```

To demonstrate checkpoints in action, [the `@timeout`
decorator](/scaling/failures#timing-out-with-the-timeout-decorator) interrupts training every 15 seconds.
You can adjust the time
depending on how fast the training progresses on your workstation. The `@retry` decorator will then start the task
again, allowing `@checkpoint` to load the latest checkpoint and resume training.

## Checkpointing PyTorch

Using `@checkpoint` with [PyTorch](https://pytorch.org/) is straightforward. Within your training loop, periodically
serialize the model and use `current.checkpoint.save()` to create a checkpoint, along these lines:

```python
model_path = os.path.join(current.checkpoint.directory, 'model')
torch.save(model.state_dict(), model_path)
current.checkpoint.save()
```

Before starting training, check for an available checkpoint and load the model from it if found:

```python
if current.checkpoint.is_loaded:
    model.load_state_dict(torch.load(model_path))
```

Take a look at [this reference repository for a complete
example](https://github.com/outerbounds/metaflow-checkpoint-examples/tree/master/mnist_torch_vanilla) showing this pattern in action, in addition to examples for many other frameworks.

## Checkpointing GenAI/LLM fine-tuning

Fine-tuning large language models and other large foundation models for generative AI can easily take hours, running on expensive GPU instances. Take a look at the following examples to learn how `@checkpoint` can be applied to various fine-tuning use cases:

- [Finetuning a LoRA from a model downloaded from
HuggingFace](https://github.com/outerbounds/metaflow-checkpoint-examples/tree/master/lora_huggingface)

- [Finetuning an LLM using LLaMA
Factory](https://github.com/outerbounds/metaflow-checkpoint-examples/tree/master/llama_factory)

- [Finetuning an LLM and serve it with NVIDIA
NIM](https://github.com/outerbounds/metaflow-checkpoint-examples/tree/master/nim_lora)

## Checkpointing distributed workloads

[Metaflow supports distributed training](/scaling/remote-tasks/distributed-computing) and other distributed workloads
which execute across multiple instances in a cluster. When training large models over extended periods across multiple
instances, which greatly increases the likelihood of hitting spurious failures, checkpointing becomes essential to
ensure efficient recovery.

Checkpointing works smoothly when only the control node in a training cluster is designated to handle it, preventing
race conditions that could arise from multiple instances attempting to save progress simultaneously. For reference,
[take a look at this
example](https://github.com/outerbounds/metaflow-checkpoint-examples/tree/master/cifar_distributed) that uses [PyTorch Data Distributed Parallel (DDP)](https://pytorch.org/tutorials/intermediate/ddp_tutorial.html) mode to train a vision model on CIFAR-10 dataset, checkpointing progress with `@checkpoint`.

:::info
Large-scale distributed computing can be challenging. If you need help setting up @checkpoint in distributed setups, don’t hesitate to [ask for guidance on Metaflow Slack](http://slack.outerbounds.org).
:::

