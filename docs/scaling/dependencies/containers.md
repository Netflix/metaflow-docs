
# Defining Custom Images

All [tasks executed remotely](/scaling/remote-tasks/introduction) run in a container,
both on [Kubernetes](/scaling/remote-tasks/kubernetes) and in
[AWS Batch](/scaling/remote-tasks/aws-batch). Hence, the default environment for
remote tasks is defined by the container (Docker) image used.

By default, Metaflow uses [a default Python image](https://hub.docker.com/_/python/)
which doesn't contain any libraries besides Python itself. When additional libraries
are needed, an easy option is to use [the `@pypi` and `@conda`
decorators](/scaling/dependencies/libraries) which install libraries on the fly,
on top of the base image.

Alternatively, you can use any other image of your choosing. Many off-the-shelf
images work with Metaflow without modifications, or you can build a custom 
image.

## Building a custom image

The main requirement is to make sure that the image has a `python` version installed.

For more information about building a custom image, see [this external howto
page](https://outerbounds.com/docs/build-custom-image/).

## Configuring a custom image

There are three ways to pick an image, depending how broadly you want to use the image.
The options are listed from the broadest to the most specific:

### 1. Define a default image

If you want to use an alternative image by default in all remote tasks, specify
two variables in [the Metaflow configuration
files](https://outerbounds.com/engineering/operations/configure-metaflow/):

- `METAFLOW_DEFAULT_CONTAINER_REGISTRY` controls which registry Metaflow uses to pick the image. This defaults to DockerHub but could also be a URL to a public or private ECR repository on AWS.

- `METAFLOW_DEFAULT_CONTAINER_IMAGE` dictates the default container image that Metaflow should use.

### 2. Define a step-specific image

To use a specific image in a specific step, specify the `image` argument in
the [`@batch`](/api/step-decorators/batch) or [`@kubernetes`](api/step-decorators/kubernetes)
decorators.

### 3. Execute a run with a custom image

You can test a specific image with a run without changing anything in the
configuration or the code. Simply add `:image=repo/image:version`
to `--with batch` or `--with kubernetes`.

For instance, you can run with the latest Ubuntu image like this:
```
python helloflow.py run --with kubernetes:image=hub.docker.com/ubuntu:latest
```

## Custom image with `@pypi` or `@conda`

You can use both a custom image as well as `@pypi` or `@conda` on top of it.
As usual, `@pypi` and `@conda` guarantee isolated environments, meaning that packages
installed in the image won't be visible in steps unless [you explicity disable
the environment for a step](/scaling/dependencies/libraries#disabling-environments).

This combination is beneficial if there are other assets in the image besides packages
that should be accessed by steps. Steps may access all files in the image, e.g.
configuration files, background processes work as usual, and you can launch
image-specific subprocesses.

This way, you can design a base image containing non-library assets, and let developers
handle libraries independently with `@pypi` or `@conda`.

