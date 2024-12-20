
# Basic Configuration

:::note
You can find [all `Config` examples in this repository](https://github.com/outerbounds/config-examples).
:::

Let's start with a simple example that reads a JSON config file and uses it
to configure `@timeout` for the start step:

```python
import time
from metaflow import FlowSpec, step, Config, timeout

class TimeoutConfigFlow(FlowSpec):
    config = Config("config", default="myconfig.json")

    @timeout(seconds=config.timeout)
    @step
    def start(self):
        print(f"timing out after {self.config.timeout} seconds")
        time.sleep(7)
        print("success")
        self.next(self.end)

    @step
    def end(self):
        print("full config", self.config)

if __name__ == "__main__":
    TimeoutConfigFlow()
```

Save the flow as `timeout_config.py` and create a small config file, `myconfig.json`, in the same directory
with contents like this:

```javascript
{"timeout": 5}
````

You can run the flow as usual:
```
python timeout_config.py run
```

The flow should fail, as the step takes longer than 5 seconds to execute. To make the flow succeed, increase
the timeout value in the config file to `10` and re-run the flow.

### Accessing config keys

As shown above, you can use values from the config to parametrize decorators: Just refer to the config name
and a key in the config with a dot notation, as in `@timeout(seconds=config.timeout)`. Since decorators
exist outside the methods, you don't need to refer to `self` when using configs in decorators. Flow-level
decorators like `@schedule` and `@trigger` need a different style, which is covered below.

When using configs inside methods, they behave like any other artifacts as shows by the `print`
statement referring to `self.config.timeout`. You can treat configs as dictionaries or JSON objects,
although inside the flow they are wrapped in [a `ConfigValue` object](#) that allows you to use the dot
notation to refer to its keys. Note that config artifacts are read-only, similar to `Parameter`s.

If you want to inspect a config of a previous run, you can use the Client API to fetch the corresponding
artifact. You can try this e.g. in a notebook:

```python
Flow('TimeoutConfigFlow').latest_run.data.config
```

This will output a dictionary, `{'timeout': 5}`.

:::info
Regardless of their original format, configs are parsed and used as nested dictionaries.
If you want to use the dot notation to access keys, ensure that your keys are valid
Python identifiers, i.e. they contain only alphanumberic characters and underscores. Otherwise
you can access keys using the usual square brackets, e.g. `config['my special value!']`.
:::

### Defining config files

In the above example, the config was read from the default config file, `myconfig.json`. You
can define another config file, say `myconfig2.json`, on the command line:

```
python timeout_config.py --config config myconfig2.json run
```

The `--config` option comes before `run` as it affects all commands, not just `run`. It takes
two options: The name of the `Config` to disambiguate between multiple `Config`s in a flow
and the corresponding config file.

Instead of a file, you can pass the full config on the command line:
```
python timeout_config.py --config-value config '{"timeout": 3}' run
```
It is a good idea to use single quotes around the config value, to prevent the shell from
trying to parse the value. You can define multiple `--config` and `--config-value` options if
you have multiple `Config`s in your flow.

Alternatively, you can define the options through environment variables, `METAFLOW_FLOW_CONFIG` and `METAFLOW_FLOW_CONFIG_VALUE`,
which take a JSON object as their value, mapping config names to their values. For instance:
```
METAFLOW_FLOW_CONFIG_VALUE='{"config": {"timeout": 3}}' python timeout_config.py run
```

:::tip
If your application needs multiple, hierarchical config files, you can use a configuration
management system like [OmegaConf](https://omegaconf.readthedocs.io/) or [Hydra](https://hydra.cc)
to prepare them for Metaflow. See [Parsing Configs](parsing-configs) and [Config-Driven Experimentation](config-driven-experimentation) for examples.
:::

### Running remotely

If you have configured [a remote compute backend for Metaflow](/scaling/remote-tasks/introduction),
`@batch` or `@kubernetes`, you can run the example remotely as usual. For instance:

```
python timeout_config.py --config config myconfig2.json run --with kubernetes
```

Notably the config files are evaluated and included prior to executing anything remotely, so
no extra effort is needed in packaging the configs together with the code.

## Configuring flow-level decorators

Consider this example that configures its [software dependencies via `@pypi_base`](/scaling/dependencies/libraries)
and [a `@trigger` policy](/production/event-triggering) via a `Config`:

```python
from metaflow import FlowSpec, step, Config, trigger, pypi_base,\
                     config_expr, card, current
from metaflow.cards import Table

@pypi_base(packages=config_expr("config.packages"))
@trigger(event=config_expr("config.event"))
class TopLevelConfigFlow(FlowSpec):

    config = Config("config", default="myconfig.json")

    @step
    def start(self):
        import pandas as pd
        self.df = pd.DataFrame({"col": ["first", "second", "third"]})
        self.next(self.end)

    @card
    @step
    def end(self):
        print("outputing dataframe", self.df)
        current.card.append(Table.from_dataframe(self.df))

if __name__ == "__main__":
    TopLevelConfigFlow()
```

The corresponding config file, `myconfig.json` can look like this:

```javascript
{
    "event": "some_custom_event",
    "packages": {
        "pandas": "2.2.3",
        "pyarrow": "18.1.0"
    }
}
```

Python's variable visibility rules prevent the `config` variable defined within the flow from being
accessible outside of it. Hence, outside the flow we must refer to configs indirectly through
[the `config_expr` utility](#) which wraps the dot notation for late evaluation.

Other than this detail, the configs work the same way. You can run the example, taking into account
that it will install dependencies on the fly with `--environment=pypi`:
```
python toplevel.py --environment=pypi run
```

## Deploying configs to production

To see configurable `@trigger`s in action, you can [deploy the above example to Argo Workflows](/production/scheduling-metaflow-flows/scheduling-with-argo-workflows):
```
python toplevel.py --environment=pypi argo-workflows create
```
Configs are evaluated and snapshot during the deployment, as this command executes. Changes in config files
won't affect any existing deployment. Also all the decorator values become fixed at this point, allowing
the deployment to execute as per defined in the configs.

Use [the Client API](/metaflow/client) to inspect configs attached to existing production runs.


## Mixing `Config`s and `Parameter`s

[As outlined in the introduction](/metaflow/configuring-flows/introduction#introducing-config), `Config`s and
`Parameter`s serve different roles in flows - they can happily co-exist. Since `Config`s are evaluated
before `Parameter`s, you can use them to set defaults to `Parameter`s, as exemplified here:

```python
import time
from metaflow import FlowSpec, step, card, current, Config, Parameter, config_expr
from metaflow.cards import Image

BASE = "https://picsum.photos/id"

class ConfigurablePhotoFlow(FlowSpec):
    cfg = Config("config", default="photo_config.json")
    id = Parameter("id", default=cfg.id)
    size = Parameter("size", default=cfg.size)

    @card
    @step
    def start(self):
        import requests

        params = {k: v for k, v in self.cfg.style.items() if v}
        self.url = f"{BASE}/{self.id}/{self.size}/{self.size}"
        img = requests.get(self.url, params)
        current.card.append(Image(img.content))
        self.next(self.end)

    @step
    def end(self):
        pass


if __name__ == "__main__":
    ConfigurablePhotoFlow()
```
The corresponding config, `photo_config.json` looks like this:

```javascript
{
    "id": 1084,
    "size": 400,
    "style": {
        "grayscale": true,
        "blur": 2
    }
}
```

In this case, we use the config to define how our application should behave - all photos should
be slightly `blur`'red and `grayscale` - but the user is able to pick a photo `id` and determine its
`size`. 

When you are testing the flow locally, you can adjust both `Config`s and `Parameter`s easily like here:
```javascript
python photo_config.py \
   --config-value config '{"id": 1, "size": 1, "style": {"grayscale": false, "blur": 0}}' \
   run --id 50 --size 600
```

In this case, the config defines defaults for the two `Parameter`s, `id` and `size`, which we then
set on the command line. You can see the photo [included in a `@card`](/metaflow/visualizing-results/effortless-task-inspection-with-default-cards)
with
```
python photo_config.py card view start  
```

When you deploy the flow to production, the difference between `Config` and `Parameter` becomes clear:
```
python photo_config.py argo-workflows create
```
You can now start a production run, either through the CLI or on the UI, but you can only change `Parameter`s,
here `id` and `size`, nothing in the deployment-time `Config`, as shown in this screencast:

```mdx-code-block
import ReactPlayer from 'react-player';
```

<ReactPlayer controls muted playsinline url='/assets/configurable-photo.mp4' width='100%' height='100%'/>

