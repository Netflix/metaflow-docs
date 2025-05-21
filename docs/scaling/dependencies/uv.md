
# Using uv

[`uv` is a fast, modern Python package manager](https://github.com/astral-sh/uv) designed for creating reproducible environments with minimal overhead. In Metaflow, you can use projects managed by `uv` directly by
specifying `--environment=uv`, enabling you to manage dependencies the same way you would in any contemporary Python project. This makes it easy to develop locally and seamlessly run flows in the cloud with all dependencies included.

`uv` takes a more holistic approach to package and project management in contrast to `conda` and `pip`. As a result,
when using `--environment=uv`, Metaflow lets `uv` install and handle dependencies using its native approach.
A downside of this is that `uv` doesn't benefit from [Metaflow's internal package snapshotting](/scaling/dependencies/internals) which provides stronger guarantees for scalability and availability of packages, which matters especially
when running tasks at large scale.

:::tip
`uv` is often a convenient starting point. If you run into any issues at scale, you can always switch to `@pypi`
or `@conda` later.
:::

## Setting up a Metaflow project with `uv`

Metaflow works with `uv` as any other Python library, so you can use `uv` as usual. Here's an example:

1. Initialize a project: `uv init myflow; cd myflow`.

2. Add packages you need, including Metaflow: `uv add pandas metaflow`.

3. Run a flow `uv run flow.py run`.

## Running tasks remotely

Metaflow will package and ship the `uv` project in the cloud when you specify `--environment=uv`:

```
uv run flow.py --environment=uv run
```
Or, more conveniently, you can set an environment variable
```
export METAFLOW_ENVIRONMENT=uv
```
so you don't need to add the command line option in every execution.

After this, you can use Metaflow's compute layer to [run the flow in the cloud](/scaling/remote-tasks/requesting-resources) with all the packages defined in your `uv` environment included, e.g. [using Kubernetes](/scaling/remote-tasks/kubernetes) ([or `--with batch`](/scaling/remote-tasks/aws-batch)):

```
uv run flow.py run --with kubernetes
```

Remember to set the `environment=uv` when [deploying to production](/production/introduction) as well.


