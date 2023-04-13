# Installing Metaflow

## MacOS/Linux

Metaflow is available as an R package for macOS and Linux. You can get it from our
[GitHub repository](https://github.com/Netflix/metaflow) \(or very soon from CRAN\):

```r
devtools::install_github("Netflix/metaflow", subdir="R")
```

You can finish the installation by running `install_metaflow()` :

```bash
metaflow::install_metaflow()
```

Behind the scenes, Metaflow relies on the Python Metaflow package, which gets installed
in a dedicated conda environment when you execute `install_metaflow()`. You can instead
use a [Python virtualenv](https://docs.python-guide.org/dev/virtualenvs/) as well:

```bash
install_metaflow(method='virtualenv')
```

:::info

Metaflow requires **Python 3** since Python 3 has fewer bugs and is better supported
than [the deprecated Python 2.7](http://pythonclock.org).

:::

You can test your installation by running:

```bash
metaflow::test()
```

If you see the message `Your Metaflow installation looks good!` congratulations! Now you
can get started with Metaflow by following the [tutorial](tutorials/), or you can [jump
straight into the docs](../metaflow/basics.md).

![](/assets/screenshot-2020-08-04-at-3.16.18-pm.png)

## Windows Support

Metaflow currently doesn't offer native support for Windows. However, if you are using
Windows 10, then you can use [WSL](https://docs.microsoft.com/en-us/windows/wsl/about)
\(Windows Subsystem for Linux\) to install Metaflow. WSL lets you run a Linux
environment inside Windows 10.

Follow these instructions to get set up with WSL 2 -

1. Update your Windows 10 distribution to version 2004 or higher.
2. Follow [these steps](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to
   install WSL 2. When prompted, choose Ubuntu 18.04 as the Linux distribution.
3. Open Ubuntu 18.04 on your workstation, and run the following commands in the terminal
   to install R and Python -

```r
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
sudo echo "deb http://cran.wustl.edu/bin/linux/ubuntu bionic-cran35/" | sudo tee -a /etc/apt/sources.list
sudo apt update
sudo apt install r-base r-base-dev
sudo apt install libcurl4-openssl-dev libxml2-dev libssl-dev

sudo apt-get install python3 python3-pip
echo "alias python=python3; alias pip=pip3" > ~/.bash_aliases
source ~/.bash_aliases
```

\[Optional\] Set up RStudio IDE. Inside Ubuntu 18.04 on Windows, run the following
commands -

```r
sudo apt install -y r-base r-base-core r-recommended r-base-dev gdebi-core build-essential libcurl4-gnutls-dev libxml2-dev libssl-dev
wget https://rstudio.org/download/latest/stable/server/bionic/rstudio-server-latest-amd64.deb
sudo gdebi rstudio-server-latest-amd64.deb
sudo rstudio-server start
```

You can access RStudio at [http://localhost:8787](http://localhost:8787) in your browser
in Windows.

To install Metaflow - Inside Ubuntu 18.04 on Windows, open the R console \(or your
RStudio IDE installed in the previous step\) and run the following commands -

```r
install.packages('devtools', INSTALL_opts = c('--no-lock'))
devtools::install_github("netflix/metaflow", subdir = "R")

metaflow::install_metaflow()
metaflow::test()
```
