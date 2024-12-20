
# Parsing Configs

All the [basic configuration](basic-configuration) examples we discussed relied on a single JSON file
for defining the configuration. This page covers scenarios involving alternative formats and more
advanced configurations.

To support diverse config formats and use cases, `Config` allows you to specify a custom parser. All
it has to do is to output a Python dictionary.

## Using common formats like `TOML` and `YAML`

To use a format other than JSON, you need to define a `parser` that accepts a string (the configuration
file) and converts it to a Python dictionary. Luckily, common configuration formats include such a function
out of the box.

For instance, this example uses a configuration file specified in [TOML](https://toml.io), a pleasantly
human-readable and writable format, a parser of which is [included in Python since 3.11](https://docs.python.org/3/library/tomllib.html):

```python
import pprint
from metaflow import FlowSpec, step, Config, resources

class TomlConfigFlow(FlowSpec):
    config = Config("config", default="myconfig.toml", parser="tomllib.loads")

    @resources(cpu=config.resources.cpu)
    @step
    def start(self):
        print("Config loaded:")
        pprint.pp(self.config)
        self.next(self.end)

    @step
    def end(self):
        pass


if __name__ == "__main__":
    TomlConfigFlow()
```

Note that the `parser` is defined as a string, so you can run the flow in remote systems that
might not have the parser installed. There is no need to include it in `@pypi` or `@conda` or the
underlying container images.

The corresponding TOML file, `myconfig.toml` looks like this:

```
[general]
a = 5

[resources]
cpu = 1
```

You can run the flow as usual, assuming you are using Python 3.11 or newer:
```
python toml_config.py run
```

:::tip
The parser needs to be available only on the system that starts a run or a deployment. Since `Config`s are
evaluated only during the deploy-time, you don't need to have the parser available in all remote nodes.

To make sure remote systems won't complain about missing imports, you can define the parser function as
a string, such as `"tomllib.loads"`.
:::

### Loading YAML

To load YAML, change the `Config` line in the above example to
```python
config = Config("config", default="myconfig.yml", parser="yaml.full_load")
```
You can test it with a YAML file like this:
```
resources:
  cpu: 1
foo: bar
```
Make sure that you have [the `pyyaml` package](https://pypi.org/project/PyYAML/) installed before running the flow.

## Validating configs with `pydantic`

Besides loading custom formats, you can use parsers to preprocess and validate configs ([and much more](custom-parsers)). This example uses [the popular `pydantic` package](https://docs.pydantic.dev/) to validate the config schema:

```python
import json, pprint
from metaflow import FlowSpec, step, Config, resources

def pydantic_parser(txt):
    from pydantic import BaseModel, PositiveInt
    from datetime import datetime

    class ConfigSchema(BaseModel):
        id: int
        signup_ts: datetime | None
        tastes: dict[str, PositiveInt]

    cfg = json.loads(txt)
    ConfigSchema.model_validate(cfg)
    return cfg

class PydanticConfigFlow(FlowSpec):
    config = Config("config", parser=pydantic_parser)

    @step
    def start(self):
        print("Config loaded and validated:")
        pprint.pp(self.config)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    PydanticConfigFlow()
```

You can test validation with the following config that has a small data issue which a human can miss easily:
```json
python pydantic_config.py --config-value config \
  '{"id": 1, "signup_ts": "2024-12-12 00:12", "tastes": {"milk": -2}}' \
  run
```

Pydantic spots the issue and gives a helpful error message about it before a run starts.

## Advanced configurations with `OmegaConf`

Thanks to custom parsers, Metaflow `Config`s work well with existing configuration frameworks like
[OmegaConf](https://omegaconf.readthedocs.io/) which handle advanced cases involving multiple
overlapping configuration files, value interpolation and substitution, and schema validation out
of the box.

To illustrate what is possible, consider this example that uses `OmegaConf` to read a YAML `Config`,
values of which you can selectively override for a run with a `Parameter`:

```python
import pprint

from metaflow import FlowSpec, step, Config, Parameter
from omegaconf import OmegaConf

def omega_parse(txt):
    config = OmegaConf.create(txt)
    return OmegaConf.to_container(config, resolve=True)

def parse_overrides(config, overrides):
    cfg = config.to_dict()
    if overrides:
        base = OmegaConf.create(cfg)
        config = OmegaConf.from_dotlist(overrides.split(","))
        return OmegaConf.to_container(OmegaConf.merge(base, config))
    else:
        return cfg

class OmegaConfigFlow(FlowSpec):
    base = Config("config", default="omega.yaml", parser=omega_parse)
    overrides = Parameter("overrides", default="")

    @step
    def start(self):
        self.config = parse_overrides(self.base, self.overrides)
        pprint.pp(self.config)
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    OmegaConfigFlow()
```

The example reads a YAML config as usual, but it allows the user to override any specific keys in the
config using `OmegaConf`'s [support for the `dot-list`
format](https://omegaconf.readthedocs.io/en/latest/usage.html#from-a-dot-list) and [configuration
merging](https://omegaconf.readthedocs.io/en/latest/usage.html#merging-configurations).

Test this with a YAML file like below, which for illustration leverages [variable
interpolation](https://omegaconf.readthedocs.io/en/latest/usage.html#variable-interpolation):

```
training:
  alpha: 0.5
  epochs: 100
id: training-${training.alpha}-${training.epochs}
dataset:
  name: myfile.txt
  preprocess: false
```

Run the flow like here, overriding two keys `dataset.name` and `training.epochs` in the config:
```
python omega_config.py run --overrides dataset.name=newfile.txt,training.epochs=50
```

