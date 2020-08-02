# Installing Metaflow

Metaflow R is available on our [GitHub repository](https://github.com/Netflix/metaflow) and it's coming on CRAN soon. You can install Metaflow R package using `devtools` in R:

```r
> devtools::install_github("Netflix/metaflow@R-dev", subdir="R")
```

Metaflow R runs on top of the Metaflow python package. You can install the python package in ****R by

```bash
> metaflow::install()
```

{% hint style="info" %}
Metaflow requires **Python 3** for installing the python package since Python 3 has fewer bugs and is better supported than [the deprecated Python 2.7](http://pythonclock.org)
{% endhint %}

To test that we have installed Metaflow successfully, use the following command to run a HelloWorld flow for sanity check

```bash
> metaflow::test()
```

Please let us know [here](http://chat.metaflow.org) if you run into issues with installation. 

Now you are ready to get your hands dirty with the [Tutorials](tutorials/).  


