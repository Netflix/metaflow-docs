
# Structuring Projects

This page describes how to arrange files in your projects to
follow software development best practices, which also leads to
[easy remote execution](/scaling/remote-tasks/requesting-resources).

## Separating code to modules

Let's start with a simple case. As your projects grow, it is a good idea
to structure business logic and modeling code as separate [Python
modules](https://docs.python.org/3/tutorial/modules.html), i.e. separate
files, instead of packing everything in a single flow file.

Code that is logically structured as bite-sized modules is easy
to comprehend, debug, and test using standard Python testing tools like 
[`unittest`](https://docs.python.org/3/library/unittest.html).
Importantly, modules can be shared across flows, allowing you to create 
reusable libraries of shared functionality.

To see this in action, create a Python file called `teatime.py` with
the following contents:

```python
from datetime import datetime

def is_tea_time():
    return 15 < datetime.utcnow().hour < 18
```

Create a separate file, `teaflow.py` with the following contents:

```python
from metaflow import FlowSpec, step

class TeaFlow(FlowSpec):

    @step
    def start(self):
        import teatime
        self.tea_time = teatime.is_tea_time()
        self.next(self.end)

    @step
    def end(self):
        print(f'is it tea time? {self.tea_time}')

if __name__ == '__main__':
    TeaFlow()
```

Note how we `import teatime` in the `start` step to use the module. You
can run the flow as usual:
```
python teaflow.py run
``` 
The `teatime.py` module works out of the box. If you have
[remote execution](/scaling/remote-tasks/requesting-resources) set up,
you can run the code `--with batch` or `--with kubernetes` and it works
equally well!

Remote execution works since Metaflow packages all `.py` files in the same
directory as the flow file, as well as its subdirectories, automatically. You
can see what files are being included by executing
```
python teaflow.py package list
```

## Separating code to packages

[A Python
package](https://docs.python.org/3/tutorial/modules.html#packages) is a
library that consists of multiple modules stored in a common directory.
These work out of the box with Metaflow too.

To test a local package, `crumpet`, create a directory structure with the
following files:

```
crumpetflow.py
crumpet/__init__.py
crumpet/teatime.py
crumpet/raisin.py
```

Here, `__init__.py` should be an empty file. It tells Python that `crumpet`
should be treated as a package. You can copy the `teatime.py` module from the
example above.

The `raisin.py` file should look like follows:
```python
import random

def is_dry():
    return random.random() > 0.5
```
and `crumpetflow.py` like this:
```python
from metaflow import FlowSpec, step

class CrumpetFlow(FlowSpec):

    @step
    def start(self):
        from crumpet import teatime, raisin
        self.tea_time = teatime.is_tea_time()
        self.is_dry = raisin.is_dry()
        self.next(self.end)

    @step
    def end(self):
        print(f'is it tea time? {self.tea_time}')
        print(f'are raisins dry? {self.is_dry}')

if __name__ == '__main__':
    CrumpetFlow()
```

You can execute the flow as usual

``` python crumpetflow.py run ``` 

As before, you can run the code remotely `--with kubernetes` or `--with batch`
and it works without you having to worry about packaging and installing the
`crumpet` package manually.

## Common packages shared across flows

You could add other flows next to `crumpetflow.py` in the above directory
hierarchy and they would all share the common `crumpet` package.

As a project grows, it may become desirable to separate each flow in a
subdirectory of its own, so each person or a team can manage their
files independently. All of them may share one or more common packages.

For instance, we can have two flows, `crumpetflow` and `teatimeflow`, in
independent subdirectories with their own READMEs. Both flows import a shared
package named `crumpet` that lives next to the flow directories:

```text
my-repo/
|-- crumpetflow/
|   |-- flow.py
|   `-- README.md
|-- teatimeflow/
|   |-- flow.py
|   `-- README.md
`-- crumpet/
    |-- __init__.py
    |-- teatime.py
    `-- raisin.py
```

Metaflow packages files under the flow file directory by default. In this
layout, a run of `crumpetflow/flow.py` would include files under
`crumpetflow/`, but it would not include the sibling `crumpet/` package unless
you ask for it explicitly.

Add `@package_sources("../crumpet")` to each flow that needs the shared
package:

```python
from metaflow import FlowSpec, package_sources, step


@package_sources("../crumpet")
class CrumpetFlow(FlowSpec):

    @step
    def start(self):
        from crumpet import raisin, teatime

        self.tea_time = teatime.is_tea_time()
        self.is_dry = raisin.is_dry()
        self.next(self.end)

    @step
    def end(self):
        pass
```

Use the same decorator in `teatimeflow/flow.py`; from that file,
`../crumpet` still points at the shared package. Relative source paths are
resolved from the directory containing the flow file, not from the current
working directory.

By default, the source is stored in the code package under its basename. In
this case, `../crumpet` becomes `crumpet/`, so remote tasks can import it as
`from crumpet import teatime`.

The decorator controls the code package used for remote execution. It does not
modify Python's local import path. If you launch these flows from the repository
root, make the root importable locally too:

```bash
PYTHONPATH=. python crumpetflow/flow.py run
PYTHONPATH=. python teatimeflow/flow.py run
```

You can verify that the shared package is included before launching a run:

```bash
PYTHONPATH=. python crumpetflow/flow.py package list
```

### Projects using a `src` layout

A common project layout keeps flow definitions and reusable Python packages in
separate directories:

```text
my-project/
|-- flows/
|   |-- train.py
|   `-- score.py
|-- src/
|   |-- forecasting/
|   |   |-- __init__.py
|   |   |-- features.py
|   |   `-- model.py
|   `-- common/
|       `-- __init__.py
`-- tests/
```

To preserve a top-level `import forecasting` during remote execution, select
the importable package directory itself:

```python
@package_sources("../src/forecasting")
class TrainFlow(FlowSpec):
    ...
```

This places `forecasting/` at the root of the code package. Selecting
`../src` instead would place the package under `src/forecasting/`, which does
not provide a top-level `forecasting` import.

For multiple packages under `src/`, pass each package explicitly:

```python
@package_sources([
    "../src/forecasting",
    "../src/common",
])
class TrainFlow(FlowSpec):
    ...
```

When launching from the project root, make `src/` importable locally:

```bash
PYTHONPATH=src python flows/train.py run
```

### Other `@package_sources` forms

Package more than one shared root by passing a list:

```python
@package_sources(["../crumpet", "../shared_models"])
class CrumpetFlow(FlowSpec):
    ...
```

Use `arcname` when a single source should appear under a different path inside
the code package:

```python
@package_sources("../crumpet", arcname="vendor/crumpet")
class CrumpetFlow(FlowSpec):
    ...
```

The archive path affects imports: the example above packages the module as
`vendor/crumpet`, rather than as a top-level `crumpet` package.

For multiple sources with explicit archive paths, use `(source, arcname)`
pairs:

```python
@package_sources([
    ("../crumpet", "vendor/crumpet"),
    ("../shared_models", "models"),
])
class CrumpetFlow(FlowSpec):
    ...
```

Single files can be packaged too:

```python
@package_sources("../config/settings.py", arcname="config/settings.py")
class CrumpetFlow(FlowSpec):
    ...
```

Archive paths must be relative paths inside the code package. For non-Python
files under an extra source root, set `suffixes` as shown in the
[Non-Python dependencies](#non-python-dependencies) section below.

For the full decorator contract, see
[`@package_sources`](/api/flow-decorators/package_sources).

### Using common packages from other Git repositories

`@package_sources` packages files that are already available locally; it does
not clone or download another repository.

If you want to include a package from a separate repository, a better approach
is to vendor it into the project with a mechanism such as [Git
subtree](https://www.atlassian.com/git/tutorials/git-subtree) or a Git
submodule, then point `@package_sources` at the resulting local directory.

Alternatively, you can publish the package as a private Python package which
you can [include with `@pypi` or `@conda`](/scaling/dependencies/libraries).


## Non-Python dependencies

By default, Metaflow packages Python files in the flow's directory hierarchy.
You can include other file types from the same hierarchy with the
`--package-suffixes` option.

For instance, the example below shows how to include SQL files but you could
also include custom binaries or configuration files.

Create a directory `sql` and store two files there:

`sql/populate_table.sql`
```sql
CREATE TABLE IF NOT EXISTS movie(title, year, score)
INSERT INTO movie VALUES ('Moana', 2016, 7.6), ('Scream', 2022, 6.3)
```

`sql/get_movies.sql`
```sql
SELECT title, year FROM movie
```

Here's an example flow that accesses the SQL files, save it in `moviesqlflow.py`:
```python
from metaflow import FlowSpec, step

class MovieSQLFlow(FlowSpec):

    @step
    def start(self):
        import sqlite3
        with sqlite3.connect("movies.db") as conn:
            cur = conn.cursor() 
            with open('sql/populate_table.sql') as f:
                for line in f:
                    cur.execute(line)
            with open('sql/get_movies.sql') as f:
                self.movies = cur.execute(f.read()).fetchall()
        self.next(self.end)

    @step
    def end(self):
        print("Found movies:")
        for title, year in self.movies:
            print(title, year)

if __name__ == '__main__':
    MovieSQLFlow()
```

Note that you need to refer to packages files through relative directories,
like `sql/` above, instead of absolute paths like `/home/alice/sql/`. The directory layout
is made available remotely but not in any guaranteed absolute location.

Execute the code as follows:
```
python moviesqlflow.py --package-suffixes .sql run
```
Locally, it would work without `--package-suffixes` because the files are
already on disk. When running remotely with `--with batch` or
`--with kubernetes`, the task only sees the code package, so it would complain
about missing `.sql` files unless `--package-suffixes` is specified. Metaflow
still includes the default Python and R suffixes when you add extra suffixes
this way.

You can confirm that all dependencies are included properly by executing
```
python moviesqlflow.py --package-suffixes .sql package list
```

If the non-Python files live outside the flow directory, package that source
root with `@package_sources` and set `suffixes` on the decorator:

```python
from metaflow import FlowSpec, package_sources


@package_sources("../shared_assets", suffixes=[".py", ".sql", ".json"])
class MovieSQLFlow(FlowSpec):
    ...
```

When `suffixes` is provided to `@package_sources`, that list replaces the
default suffix list for the extra source root. Include `.py` explicitly if the
source root also contains Python modules. You can inspect the result with:

```bash
python moviesqlflow.py package list
```

For the full decorator contract, see
[`@package_sources`](/api/flow-decorators/package_sources).

