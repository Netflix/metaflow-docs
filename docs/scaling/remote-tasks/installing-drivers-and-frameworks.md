
# Installing Drivers and Frameworks

Paradoxically, often the hardest part of using an hardware accelerator is to get all the
necessary software installed, such as CUDA drivers and platform-specific ML/AI frameworks.

Metaflow allows you to [specify software dependencies as a part of the flow](/scaling/dependencies).
You can either use a Docker image with necessary dependenices included, or layer them on top of 
a generic image on the fly using `@conda` or `@pypi` decorators. We cover both the approaches below.

## Using a GPU-ready Docker image

You can use the `image` argument in `@batch` and `@kubernetes` decorators to choose a suitable
image on the fly, like [an official `pytorch` image](https://hub.docker.com/r/pytorch/pytorch)
we use below:

```python
from metaflow import FlowSpec, step, kubernetes

class GPUImageFlow(FlowSpec):

    @kubernetes(
        gpu=1, 
        image='pytorch/pytorch:2.0.1-cuda11.7-cudnn8-runtime'
    )
    @step
    def start(self):
        import torch # pylint: disable=import-error
        if torch.cuda.is_available():
            print('Cuda found 🙌')
            for d in range(torch.cuda.device_count()):
                print(f"GPU device {d}:", torch.cuda.get_device_name(d))
        else:
            print('No CUDA 😭')
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    GPUImageFlow()
```

If you want to avoid spec an image in the code, you can configure a default image in your [Metaflow
configuration file](https://outerbounds.com/engineering/operations/configure-metaflow/) through the 
`METAFLOW_KUBERNETES_CONTAINER_IMAGE` and `METAFLOW_BATCH_CONTAINER_IMAGE` settings.

Many GPU-ready images are available online, e.g. at:

- [Nvidia's NVCR catalogs](https://catalog.ngc.nvidia.com/containers).
- [PyTorch DockerHub Registry](https://hub.docker.com/r/pytorch/pytorch).
- [TensorFlow DockerHub Registry](https://hub.docker.com/r/tensorflow/tensorflow).
- [AWS' registry of Docker images for deep
  learning](https://github.com/aws/deep-learning-containers/blob/master/available_images.md)

You can also [build a Docker image of your own](https://outerbounds.com/docs/build-custom-image/),
using a GPU-ready image as a base image.

## Installing libraries with `@conda` and `@pypi`

[The `@conda` and `@pypi` decorators](/scaling/dependencies/libraries) allow you to install
packages on the fly on top of a default image. This makes it easy to test different libraries
quickly without having to build custom images.

The CUDA drivers are hosted at [NVIDIA's official Conda
channel](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#conda-installation).
Run this command once to include the channel in your environment: 
```bash
conda config --add channels nvidia
```

After this, you can install PyTorch and other CUDA-enabled libraries with `@conda` and
`@conda_base` as usual. Try this:

```python
from metaflow import FlowSpec, step, resources, conda_base

@conda_base(
    libraries={
        "pytorch::pytorch": "2.0.1",
        "pytorch::pytorch-cuda": "11.8"
    },
    python="3.9"
)
class GPUCondaFlow(FlowSpec):

    @resources(gpu=1)
    @step
    def start(self):
        import torch # pylint: disable=import-error
        if torch.cuda.is_available():
            print('Cuda found 🙌')
            for d in range(torch.cuda.device_count()):
                print(f"GPU device {d}:", torch.cuda.get_device_name(d))
        else:
            print('No CUDA 😭')
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    GPUCondaFlow()
```
Run the flow as
```
python gpuconda.py run --with batch
```
or `--with kubernetes`. When you run the flow for the first time, it will create an
execution environment and cache it, which will take a few minutes. Subsequent runs will
start faster.

:::note
If you run workflows from a machine with a different operating system
than where remote tasks run, for example launching Metaflow runs that have remote
`@kubernetes` tasks from a Mac, some available dependencies and versions may not be
the same for each operating system. In this case, you can go to
the [conda-forge website](https://conda-forge.org/feedstock-outputs/) and find
which package versions are available across each platform.
:::



