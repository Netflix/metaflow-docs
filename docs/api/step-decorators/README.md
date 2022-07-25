
# Step Decorators

These decorators are set at the step level, i.e. above the `@step`
decorator.

Notably, you can attach any of these decorators to the flow on the
command line as well without changing the code using the `--with` option. For instance,
```
python myflow.py run --with retry --with batch:cpu=4
```
attaches a `@retry` and `@batch(cpu=4)` decorators to all steps of the flow.

## Index

- [`@environment`](/api/step-decorators/environment) - define environment variables for containers.
- [`@batch`](/api/step-decorators/batch) - run on AWS Batch.
- [`@card`](/api/step-decorators/card) - enable reporting.
- [`@catch`](/api/step-decorators/catch) - catch errors.
- [`@conda`](/api/step-decorators/conda) - define libraries.
- [`@kubernetes`](/api/step-decorators/kubernetes) - run on Kubernetes.
- [`@resources`](/api/step-decorators/resources) - request resources.
- [`@retry`](/api/step-decorators/retry) - retry errors.
- [`@step`](/api/step-decorators/step) - define steps.
- [`@timeout`](/api/step-decorators/timeout) - avoid getting stuck.
