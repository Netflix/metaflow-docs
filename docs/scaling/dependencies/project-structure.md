
# Structuring Projects

This page describes how to arrange files in your projects to
follow software development best practices, which also leads to
[easy remote execution](/scaling/remote-tasks/introduction).

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
[remote execution](/scaling/remote-tasks/introduction) set up,
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

For instance, we can have two flows, `crumpetflow` and `teatimeflow` as
independent subdirectories with their own READMEs, as well as a shared
`crumpet` package:

```
crumpetflow/flow.py
crumpetflow/README.md
teatimeflow/flow.py
teatimeflow/README.md
crumpet/__init__.py
crumpet/teatime.py
crumpet/raisin.py
```

Unfortunately this wouldn't work out of the box since Metaflow packages
only the files under the `crumpetflow` and `teatimeflow` directory, ignoring
`crumpet` by default.

The solution is to including a symbolic link (*symlink*) in each flow directory, pointing
at the common package that should be included. You can create a symlink as follows
```
cd crumpetflow
ln -s ../crumpet .
```
With symlinks included the hierarchy looks like this:

```
crumpetflow/flow.py
crumpetflow/README.md
crumpetflow/crumpet -> ../crumpet
teatimeflow/flow.py
teatimeflow/README.md
teatimeflow/crumpet -> ../crumpet
crumpet/__init__.py
crumpet/teatime.py
crumpet/raisin.py
```

### Using common packages from other Git repositories

The above hierarchy works well when everything is stored in a single Git
repository. Technically, you could have `crumpetflow`, `teatimeflow`, and
`crumpet` as separate repositories as well, but you would need to ensure
that symlinks stay valid between repositories. This can be fragile.

If you want to include a package from a separate repository, a better approach
is to use [the `git subtree`
command](https://www.atlassian.com/git/tutorials/git-subtree), which is an enhanced
version of Git submodules. With `git subtree` you can nest a repository as
a subdirectory of another repository. For instance, the `crumpet` package
could be a repository of its own, included as a subtree in every flow project
that wants to use it.

Alternatively, you can publish the package as a private Python package which
you can [include with `@pypi` or `@conda`](/scaling/dependencies/libraries).


## Non-Python dependencies

By default, Metaflow packages `.py` files in the flow's directory hierarchy.
You can also include arbitrary files in the package for remote execution by
including their file suffices in the `--package-suffixes` option.

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
Locally, it would work without `--package-suffixes` but when running remotely
`--with batch` or `--with kubernetes`, it would complain about missing `.sql` files
unless `--package-suffixes` is specified.

You can confirm that all dependencies are included properly by executing
```
python moviesqlflow.py --package-suffixes .sql package list
```



