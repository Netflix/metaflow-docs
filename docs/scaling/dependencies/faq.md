
# Dependencies FAQ

#### **Can I reuse environment created by Metaflow in another step or outside Metaflow?**

The built-in `@pypi` and `@conda` decorators require that you to specify the
packages you want to install explicitly. As of today, there isn't a mechanism
to refer to an existing environment directly.

However, [an alternative `@pypi` decorator by
Netflix](/scaling/dependencies/libraries.md#alternative-pypi-and-conda-decorators)
supports *named environments* that allow you to refer to, share and reuse existing environments.
Let us know on the [Metaflow community Slack](http://slack.outerbounds.co) if you
find this feature useful!

