
# Custom Config Parsers

The primary purpose of the `parser` argument in `Config` is to enable support for different configuration formats, as
[explained in the previous section](parsing-configs). As parsers are arbitrary Python functions, one can leverage them
more creatively as well, including generating configurations on the fly.

For instance, a custom parser could contact an external service to fetch a suitable config. Or, it
could examine data and other context to determine a suitable configuration dynamically.

## Generating configs programmatically

To illustrate config generation, consider this example that annotates each deployment with information about
the current `git` branch through a custom parser function, `git_info`. It generates a config on the fly by
calling the `git` command.

This example should be run in an existing Git repository. [Check out the
example](https://github.com/outerbounds/config-examples/blob/main/git-info/) from its repository for testing:

```python
from subprocess import check_output
from metaflow import FlowSpec, step, Config, current, card
from metaflow.cards import Markdown, Table

def git_info(args):
    info = {
        "commit": ["git", "rev-parse", "HEAD"],
        "branch": ["git", "rev-parse", "--abbrev-ref", "HEAD"],
        "message": ["git", "log", "-1", "--pretty=%B"],
    }
    cfg = {}
    for key, cmd in info.items():
        cfg[key] = check_output(cmd, text=True).strip()
    return cfg

class GitInfoFlow(FlowSpec):
    git_info = Config("git_info", default_value="", parser=git_info)

    def output_git_info(self):
        table = [
            [Markdown(f"**{k.capitalize()}**"), v] for k, v in self.git_info.items()
        ]
        current.card["git"].append(Markdown(f"# Deployment info"))
        current.card["git"].append(Table(table))

    @card(type="blank", id="git")
    @step
    def start(self):
        print("Git info", self.git_info)
        self.output_git_info()
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == "__main__":
    GitInfoFlow()
```

As the config is generated on the fly, we don't need any config files to be present. We set
`Config(default_value='')` to inform `Config` that we can proceed without a config file.

You can run the flow as usual:
```
python git_info.py run
```
and view the resulting card:
```
python git_config.py card view start
```

## Including default configs in flows

The example above is practically useful, as it ensures that every deployment and local run includes
lineage information about the originating Git branch. Thanks to `Config`, this information is stored
in an artifact, making it easy to inspect later.

We may want to ensure that all flows include this information. We could include a `Config` line with
a `git_info` parser in every flow, but it adds unnecessary boilerplate which developers shouldn't have
to worry about.

Instead, we can create *a `FlowSpec` template* or superclass which takes care of this:

```python
from subprocess import check_output

from metaflow import FlowSpec, Config, current
from metaflow.cards import Markdown, Table

def git_info(args):
    info = {
        "commit": ["git", "rev-parse", "HEAD"],
        "branch": ["git", "rev-parse", "--abbrev-ref", "HEAD"],
        "message": ["git", "log", "-1", "--pretty=%B"],
    }
    cfg = {}
    for key, cmd in info.items():
        cfg[key] = check_output(cmd, text=True).strip()
    return cfg

class TrackedFlowSpec(FlowSpec):
    git_info = Config("git_info", default_value="", parser=git_info)

    def output_git_info(self):
        print("deployment info", self.git_info)
        if hasattr(current, "card"):
            table = [
                [Markdown(f"**{k.capitalize()}**"), v] for k, v in self.git_info.items()
            ]
            current.card.append(Markdown(f"# Deployment info"))
            current.card.append(Table(table))
```

We can distribute this module, `tracked_flow.py`, containing `TrackedFlowSpec` as a shared base class
for flows to inherit from, such as `MyTrackedFlow`:

```python
from metaflow import step, Config
from tracked_flow import TrackedFlowSpec

class MyTrackedFlow(TrackedFlowSpec):
    config = Config("config", default="myconfig.json")

    @step
    def start(self):
        self.output_git_info()
        self.next(self.end)

    @step
    def end(self):
        print("config", self.config)

if __name__ == "__main__":
    MyTrackedFlow()
```

An important detail here is that `MyTrackedFlow` derives from `TrackedFlowSpec`, instead of the usual
Metaflow `FlowSpec`. Since `TrackedFlowSpec` includes `git_info`, all derived flows will have it too, in addition
to any `Config`s they define by themselves such as `config` above.

When you run `MyTrackedFlow`, it will record its `git` lineage in `git_info` automatically without boilerplate.
Optionally, if you run the flow `--with card`, `output_git_info` will populate a card with the lineage information.






