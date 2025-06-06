# HuggingFace Hub Integration

Metaflow includes a wrapper around `@checkpoint` specific to assets in the [HuggingFace Hub](https://huggingface.co/), a popular platform for sharing and discovering machine learning models and datasets. The `@huggingface_hub` decorator simplifies the process of downloading, caching, and managing models from the HuggingFace Hub within your Metaflow workflows.

:::info
The `@huggingface_hub` decorator is part of the `metaflow-checkpoint` extension, 
so developers who self-manage Metaflow and its plugins have to install it separately as
described in [installing `@checkpoint`](/scaling/checkpoint/introduction#installing-checkpoint).
Also, the APIs may change in the future, in contrast to the APIs of core Metaflow which are
guaranteed to stay backwards compatible. Please share your feedback on
[Metaflow Slack](http://slack.outerbounds.co)!
:::

## Understanding `@huggingface_hub`

The `@huggingface_hub` decorator offers two main functionalities:

1. **Loading models directly in steps**: Using the `load` parameter, you can specify models to be downloaded and cached for use within a step.
2. **Dynamic model downloading**: Through the `current.huggingface_hub.snapshot_download` function, you can download models at runtime and store references for use in subsequent steps.

All models are stored in the same way the `@checkpoint` decorator stores checkpoints, ensuring efficient caching and versioning.

## Using `@huggingface_hub`

### Loading Static Repositories for a Step

For workflows that require specific, unchanging models or datasets from HuggingFace, you can use the `load` parameter of the `@huggingface_hub` decorator. This approach is useful when models don't change often and can be hard-coded into the flow.

The `load` parameter can accept arguments in several formats:

1. A list of strings representing repository IDs:

```python
@huggingface_hub(load=["bert-base-uncased"])
@step
def process_text(self):
    model_path = current.huggingface_hub.loaded["bert-base-uncased"]
    # Use the model...
```

2. A list of tuples specifying the repository ID and a local path:

```python
@huggingface_hub(load=[("bert-base-uncased", "./model_directory")])
@step
def process_text(self):
    model_path = current.huggingface_hub.loaded["bert-base-uncased"]
    # Use the model...
```

3. A list of dictionaries providing detailed configuration for the download:

```python
@huggingface_hub(load=[
    {
        "repo_id": "bert-base-uncased",
        "allow_patterns": ["*.json", "tokenizer.txt"],
        "repo_type": "model"
    }
])
@step
def process_text(self):
    model_path = current.huggingface_hub.loaded["bert-base-uncased"]
    # Use the model...
```

The dictionary format allows you to specify all the parameters supported by HuggingFace's [snapshot_download](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/file_download#huggingface_hub.snapshot_download) function, enabling fine-grained control over what gets downloaded.

### Loading HF Repositories Dynamically

In some workflows, a model or dataset must be determined at runtime, perhaps based on exogenous system events or results produced by upstream workflows. In these cases, you can use the `current.huggingface_hub.snapshot_download` function to dynamically download and cache models.

```python
@huggingface_hub
@step
def start(self):
    # Download a model from HuggingFace Hub
    self.hf_model_reference = current.huggingface_hub.snapshot_download(
        repo_id="bert-base-uncased",
        allow_patterns=["*.json"]  # Only download specific files
    )
    self.next(self.end)

@model(load="hf_model_reference")
@step
def end(self):
    model_path = current.model.loaded["hf_model_reference"]
    # Use the model...
```

The `snapshot_download` function returns a reference to the downloaded model, which can be stored as an artifact and loaded in subsequent steps using the `@model` decorator. If the `force_download` parameter is set to `True`, it will bypass the cache and download the model again.

## Complete Example

Here's a complete example that demonstrates both static and dynamic loading of HuggingFace models:

```python
from metaflow import FlowSpec, step, current, huggingface_hub, model, Parameter, pypi

class HuggingFaceModelFlow(FlowSpec):
    
    model_name = Parameter(
        "model-name", 
        help="Name of the HuggingFace model to use",
        default="bert-base-uncased"
    )
    
    @pypi(packages={"huggingface-hub": "0.16.4"})
    @huggingface_hub(load=["google-bert/bert-base-uncased"])
    @step
    def start(self):
        import os
        
        # Access the statically loaded model
        static_model_path = current.huggingface_hub.loaded["google-bert/bert-base-uncased"]
        print(f"Static model loaded at: {static_model_path}")
        print(f"Contents: {os.listdir(static_model_path)}")
        
        # Dynamically download the model specified by the parameter
        self.dynamic_model_ref = current.huggingface_hub.snapshot_download(
            repo_id=self.model_name,
            allow_patterns=["*.json", "*.txt"]  # Only download specific files
        )
        
        print(f"Dynamic model reference saved with key: {self.dynamic_model_ref['key']}")
        self.next(self.end)
    
    @model(load="dynamic_model_ref")
    @step
    def end(self):
        import os
        
        # Access the dynamically loaded model
        model_path = current.model.loaded["dynamic_model_ref"]
        print(f"Dynamic model loaded at: {model_path}")
        print(f"Contents: {os.listdir(model_path)}")

if __name__ == "__main__":
    HuggingFaceModelFlow()
```

You can run this flow with:

```bash
python flow.py --environment=pypi run --model-name roberta-base
```

## Best Practices

1. **Selective Downloads**: Use the `allow_patterns` parameter to download only the files you need, especially for large models. This can significantly reduce download times and storage requirements.

2. **Caching Strategy**: Leverage the caching mechanism by default, but use `force_download=True` when you need to ensure you have the latest version of a model.

3. **Error Handling**: Be prepared to handle network issues or API rate limits when downloading models from HuggingFace Hub. We have observed occasional timeouts. Consider implementing retry logic for robustness.

4. **Version Pinning**: When using models in production workflows, consider pinning to specific model versions using revision tags to ensure reproducibility.

5. **Authentication**: For accessing private or gated models, you'll need to set up authentication. You can use the HuggingFace CLI to log in or set the `HF_TOKEN` environment variable. On Outerbounds, you can do this by going to the `Integrations` tab and registering your desired HuggingFace token.

## Integration with Metaflow's Model Management

The `@huggingface_hub` decorator integrates seamlessly with Metaflow's model management system. Models downloaded from HuggingFace Hub are stored in Metaflow's datastore, making them available for versioning, tracking, and sharing across your organization.

When combined with the `@model` decorator, you can create powerful workflows that leverage pre-trained models from HuggingFace Hub, fine-tune them for your specific use case, and manage the entire model lifecycle within Metaflow.

This integration enables efficient workflows where:

1. Models are downloaded once and cached for future use
2. Large models can be shared across multiple flows without duplicating storage
3. Model versions are tracked and managed alongside your code
4. Models can be easily deployed to production environments

By leveraging the `@huggingface_hub` decorator, you can streamline your machine learning workflows and focus on building and deploying models rather than managing infrastructure and dependencies. Continue to the [`@model` documentation](../model-lifecycle-management/introduction) for more details.
