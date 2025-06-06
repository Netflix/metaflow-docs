# Managing Model Lifecycle

Metaflow's model management features are built on the same foundation as [checkpointing](../checkpoint/introduction.md).
While checkpointing is primarily about managing state within Metaflow tasks, 
model lifecycle management presents several orthogonal operational challenges:

1. **Version Control**: Tracking different versions of models as they evolve
2. **Metadata Management**: Attaching important information about models (accuracy, training parameters, etc.)
3. **Discoverability**: Finding and loading the right model for inference or further training
4. **Portability**: Moving models between different environments and workflows

The `@model` decorator addresses these challenges by providing a standardized way to save, load, and manage models 
within Metaflow. Like the `@checkpoint` functionality described [in the previous section](../checkpoint/introduction.md), `@model` integrates seamlessly with Metaflow's datastore, making it easy to version, track, and share 
models across your organization in an efficient manner. 

:::info
The `@model` decorator is part of the `metaflow-checkpoint` extension, 
so developers who self-manage Metaflow and its plugins have to install it separately as
described in [installing `@checkpoint`](/scaling/checkpoint/introduction#installing-checkpoint).
Also, the APIs may change in the future, in contrast to the APIs of core Metaflow which are
guaranteed to stay backwards compatible. Please share your feedback on
[Metaflow Slack](http://slack.outerbounds.co)!
:::

## Using `@model`

The `@model` decorator provides a simple interface for saving and loading models within your Metaflow steps. It's 
particularly useful for machine learning workflows where you need to train, evaluate, and deploy models.

Let's demonstrate the functionality with this simple flow that trains an XGBoost model and saves it using the `@model` 
decorator:

```python
from metaflow import FlowSpec, step, model, current, pypi_base

@pypi_base(python="3.12", packages={"xgboost": "3.0.2"})
class XGBoostModelFlow(FlowSpec):

    @model
    @step
    def start(self):
        import numpy as np # pylint: disable=import-error
        import xgboost as xgb  # pylint: disable=import-error

        # Create a simple dataset
        X = np.random.rand(100, 10)
        y = np.random.randint(2, size=100)
        dtrain = xgb.DMatrix(X, label=y)
        
        # Train a model
        param = {"max_depth": 2, "eta": 1, "objective": "binary:logistic"}
        num_round = 2
        bst = xgb.train(param, dtrain, num_round)
        
        # Save the model to a file
        bst.save_model("model.bst")
        
        # Save the model to Metaflow's datastore
        self.xgboost_model = current.model.save(
            "model.bst",
            label="xgboost_classifier",
            metadata={
                "accuracy": 0.95,
                "training_params": param,
                "num_rounds": num_round
            }
        )
        self.next(self.end)

    @model(load="xgboost_model") # using the Metaflow artifact key.
    @step
    def end(self):
        import os
        import xgboost as xgb  # pylint: disable=import-error
        
        # Access the loaded model in another step
        # Whether local or remote mode --> we have cached model for future use downstream
        # If remote mode --> we are now passing model state seamlessly across task/pod boundaries
        model_path = os.path.join(current.model.loaded["xgboost_model"], "model.bst")
        bst = xgb.Booster()
        bst.load_model(model_path)
        
        # Use reloaded model
        import numpy as np  # pylint: disable=import-error
        prediction = bst.predict(xgb.DMatrix([np.random.rand(10)]))
        print(f"Prediction: {prediction}")

if __name__ == "__main__":
    XGBoostModelFlow()
```

You can run the flow as usual:
```
python flow.py --environment=pypi run
```

The flow demonstrates typical usage of `@model`:

- `@model` activates the `current.model` object. Here we use it in the start step to upload our model after training completes. The resulting `self.xgboost_model` artifact contains a pointer to the model state, cached in Metaflow's datastore.

- `current.model.save()` saves a model file or directory to Metaflow's datastore, along with optional metadata and a label. It returns a reference to the saved model that can be stored as an artifact.

- `@model(load="xgboost_model")` loads the model referenced by the `xgboost_model` artifact created in the previous step. The loaded model is accessible via `current.model.loaded["xgboost_model"]`.

- The model's metadata is accessible via `current.model.loaded.info["xgboost_model"]`.

## Observing `@model` through cards

Try running the above. It will produce a [Metaflow `@card`](/metaflow/visualizing-results/effortless-task-inspection-with-default-cards) detailing your model's state:
```
python flow.py --environment=pypi card view start
```

If a step is decorated with `@model`, it will add information about models saved and loaded in the card, including metadata and lineage information.