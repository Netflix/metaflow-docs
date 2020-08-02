# Installing Metaflow

### Installing Metaflow R in MacOS or Linux

Metaflow R is available on our [GitHub repository](https://github.com/Netflix/metaflow) and it's coming on CRAN soon. You can install Metaflow R package using `devtools` in R:

```r
> devtools::install_github("Netflix/metaflow@R-dev", subdir="R")
```

Metaflow R runs on top of the Metaflow python package. You can install the python package in ****R by

```bash
> metaflow::install()
```

{% hint style="info" %}
Metaflow requires **Python 3** on your system for installing the python package since Python 3 has fewer bugs and is better supported than [the deprecated Python 2.7](http://pythonclock.org)
{% endhint %}

To test that we have installed Metaflow successfully, use the following command to run a HelloWorld flow for sanity check

```bash
> metaflow::test()
```

Please let us know [here](http://chat.metaflow.org) if you run into issues with installation. 

Now you are ready to get your hands dirty with the [Tutorials](tutorials/).  


### Installing Metaflow R in Windows 10 with WSL 2

If you already have WSL 2 installed in Windows 10, the installation process should be the same as MacOS or Linux. The steps below are instructions on how to setup WSL 2 with Ubuntu 18.04, install R 3.6, and install Metaflow R. 

**Step 1**: Update your Windows 10 to be version 2004 or higher. Install WSL 2: please follow this [instruction](https://docs.microsoft.com/en-us/windows/wsl/install-win10) . Choose Ubuntu 18.04 as the Linux distribution.

**Step 2:** Install R version 3.6 or later.  Open Ubuntu 18.04 on Windows and run the following commands

```bash
$sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
$sudo echo "deb http://cran.wustl.edu/bin/linux/ubuntu bionic-cran35/" | sudo tee -a /etc/apt/sources.list
$sudo apt update
$sudo apt install r-base r-base-dev
$sudo apt install libcurl4-openssl-dev libxml2-dev libssl-dev
```

**Step 3:** Install python3, pip3 and set them as alias for python, pip Inside Ubuntu 18.04 Windows

```bash
$sudo apt-get install python3 python3-pip
$cat "alias python=python3; alias pip=pip3" > ~/.bash_aliases
$source ~/.bash_aliases
$python --version
$pip --version
$pip install numpy pandas --user
```

**Step 4:** Install Metaflow R and run a test. Inside Ubuntu 18.04 on Windows, run R console and run the following commands

```r
> install.packages('devtools', INSTALL_opts = c('--no-lock'))
> devtools::install_github("netflix/metaflow@R-dev", subdir = "R")
> metaflow::install()
> metaflow::test()
```

**Step 5 \[Optional\]**: Setup RStudio Server in Ubuntu and access RStudio in a browser in Windows. Inside Ubuntu 18.04, run the following commands

```r
$sudo apt install -y r-base r-base-core r-recommended r-base-dev gdebi-core build-essential libcurl4-gnutls-dev libxml2-dev libssl-dev
$wget https://rstudio.org/download/latest/stable/server/bionic/rstudio-server-latest-amd64.deb
$sudo gdebi rstudio-server-latest-amd64.deb
$sudo rstudio-server start
```

You can access RStudio at [http://localhost:8787](http://localhost:8787) in your browser in Windows.  
  


