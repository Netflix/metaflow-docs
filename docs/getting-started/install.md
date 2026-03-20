# Installing Metaflow

Metaflow is available as a Python package for macOS and Linux. You can visit our [GitHub
repository](https://github.com/Netflix/metaflow) or get the latest version from
[PyPI](https://pypi.org/):

```bash
pip install metaflow
```

:::info

If you want to get a feel of Metaflow and the infrastructure behind it without having to
install anything locally, you can do in the browser by signing up for [a Metaflow
Sandbox](https://docs.outerbounds.com/sandbox/).

:::

Now you are ready to get your hands dirty with the [Tutorials](tutorials/). Or, if you want
to take a step further and test the full power of Metaflow, you can [easily setup a
Minikube-based dev stack](/getting-started/devstack) locally.

## Upgrading Metaflow

If you have installed Metaflow previously, you can upgrade to the latest version with:

```bash
pip install --upgrade metaflow
```
:::tip Windows Installation & Local UI Troubleshooting
If you are installing Metaflow on Windows (such as on an Asus Zenbook or similar laptop), you may encounter environment-specific hurdles. Follow these steps for a smoother setup:

1. **WSL2 Recommended**: For the best experience, we recommend using Windows Subsystem for Linux (WSL2). If you encounter permission errors with `pip install`, ensure your WSL distribution is up to date.
2. **Local UI Setup**: To verify your installation and view your flows locally:
   - Run a basic flow: `python helloworld.py run`
   - Start the local metadata service: `metaflow service start`
   - Access the UI at `http://localhost:8080`. 
3. **Environment Persistence**: If `metaflow` commands are not recognized after installation, ensure the Python Scripts folder (e.g., `...\Python312\Scripts`) is added to your Windows System PATH.
:::
