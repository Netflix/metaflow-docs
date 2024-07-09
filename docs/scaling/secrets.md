
# Accessing Secrets

If your flow needs to access an external service (e.g. a database) that requires
authentication, you need to supply credentials to the flow. If security wasn't
a concern, you could easily achieve this using
[Metaflow parameters](/metaflow/basics#how-to-define-parameters-for-flows). However,
when it comes to credentials and other sensitive information, security is a top concern.

The industry-standard best practice is to store credentials in a secrets
manager, such as [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/), 
[Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/) or
[GCP Secret Manager](https://cloud.google.com/security/products/secret-manager).
Once secrets are managed by such a system, Metaflow provides a decorator, `@secrets`,
which makes it easy to access them securely in a flow.

For more background, see [the `@secrets` launch blog post](https://outerbounds.com/blog/metaflow-secrets/).
Also, take a look at [the API docs for `@secrets`](/api/step-decorators/secrets).

:::info

Currently, `@secrets` supports AWS Secrets Manager, Azure Key Vault and GCP Secrets Manager. Contact us on
[Metaflow support Slack](http://chat.metaflow.org) if you are interested in
using another secrets manager.

:::

## Basic usage

This video gives a one-minute overview of how to store a secret and access it in
Metaflow (no sound):

import ReactPlayer from 'react-player'

<ReactPlayer controls url="https://www.youtube.com/watch?v=tGRc8tWTzoQ" />
<br/>

The secrets manager stores secrets as a set of key-value pairs that are
identified by a name. Given a name, the `@secrets` decorator fetches the
key-value pairs - assuming your IAM user is allowed to read the secret - and
exposes them through environment variables.

Here is the simple example featured in the video:

```python
from metaflow import FlowSpec, step, secrets
import os

class SecretFlow(FlowSpec):

    @secrets(sources=['metaflow-example-password'])
    @step
    def start(self):
        print("Here's the password:", os.environ['password'])
        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    SecretFlow()
```

In this case, `metaflow-example-password` is the name of the secret which
contains a key `password`. The `sources` attribute, which defines the secret
sources, could contain multiple names, in which case the union of all secret
sets is exposed through environment variables.

### Configuring a secrets backend

To use `@secrets`, you need to inform Metaflow which secrets manager you want to
use. If you are using AWS Secrets Manager, make sure your Metaflow configuration
contains the following line:

```json
"METAFLOW_DEFAULT_SECRETS_BACKEND_TYPE": "aws-secrets-manager"
```

If you are using Azure Key Vault, make sure your Metaflow configuration contains 
the following line:

```json
"METAFLOW_DEFAULT_SECRETS_BACKEND_TYPE": "az-key-vault"
```

### Defining secrets on the command line

Note that you can define `@secrets` on the command line using the `--with`
option like any other decorator. This comes especially handy when moving
between prototype and production: For instance, you can access a different
database during development and production.

Consider this example that connects to a Postgres database:

```python
from metaflow import FlowSpec, step, secrets
import os
from psycopg import connect

class DBFlow(FlowSpec):

    @step
    def start(self):
        with connect(user=os.environ['DB_USER'],  
                     password=os.environ['DB_PASSWORD'],
                     dbname=os.environ['DB_NAME'],
                     host=os.environ['DB_HOST']) as conn:

            with conn.cursor() as cur:
                cur.execute("SELECT * FROM data")
                print(cur.fetchall())

        self.next(self.end)

    @step
    def end(self):
        pass

if __name__ == '__main__':
    DBFlow()
```

During development, you can run the flow locally, maybe reading credentials to a
local database from environment variables - no need to use a secrets manager
during early prototyping.

To read data from a test database, you can fetch credentials from a secrets
manager by running the flow like this:

```bash
python dbflow.py
   –with 'secrets:sources=[“test-db-credentials”]'
   run
```

And you can [deploy to production](/production/introduction) using a production
database like this:

```bash
python dbflow.py
  –with 'secrets:sources=["prod-db-credentials”]'
  argo-workflows create
```

## Advanced topics

The following topics come up occasionally when running flows in serious
production environments.

### Controlling access to secrets

A major benefit of using a secrets manager is that you can control closely who
gets to access which secrets. In the case of AWS Secrets Manager, access
control is accomplished through IAM policies. For more details, [consult the
section about access control in the AWS Secrets Manager
documentation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html).

For instance, you can set up IAM policies so that only a test database is
accessible to users directly, while production database can be only accessed
by [tasks running on a production scheduler](/production/introduction).

### Using an alternative role

By default, `@secrets` accesses secrets using the default IAM role available in
the execution environment. For local runs, this is typically the role attached
to the IAM user.

If the default role doesn't have access to the specified secrets, you can define
an alternative role through the `role` attribute:

```python
@secrets(sources=['metaflow-example-password'],
         role='arn:aws:iam::123456789012:role/SecretsAccess')
```

The default role needs to be able to assume the specified `role` for this
to work.

### Accessing secrets from a non-default location

AWS Secrets Manager is an account- and region-specific service. By default, when
you specify a secret name in the `sources` list, `@secrets` assumes that the
name is available in the current AWS account, in the current default region.

If this is not the case, you can specify a full secrets ARN (available on the
AWS Secrets Manager console) as a source:

```python
@secrets(sources=['arn:aws:secretsmanager:us-west-2:001234556000:secret:some-secret'])
```

### Accessing secrets in Azure

Azure Key Vault is an account specific service, managed via Azure Resource Manager. 
Currently, only `Secret` object types are supported. You can specify secrets in the `sources` 
list or dictionary object as shown below.

The following formats of secrets are supported. 

Fully qualified Key Vault Id:

```python
@secrets(sources=['https://az-key-vault.vault.azure.net/secrets/secretkey/2260d88aca504269999c5f9413c3abcd'])
```

Key Vault Id without version:

```python
@secrets(sources=['https://az-key-vault.vault.azure.net/secrets/secretkey'])
```

Key Vault Object Name with version:

```python
@secrets(sources=['secretkey/2260d88aca504269999c5f9413c3abcd'])
```

Key Vault Object Name:

```python
@secrets(sources=['secretkey'])
```

Using a dictionary to specify the arguments to the sources attribute can be done as follows:

```python
@secrets(sources=[{"type": "az-key-vault", "id":"https://az-key-vault.vault.azure.net/secrets/secretkey/2260d88aca504269999c5f9413c3ddcd"}])
```

:::info

If the Azure Key Vault URL is not specified in the sources attribute, it must be set in 
the metaflow configuration as:

```json
"METAFLOW_AZURE_KEY_VAULT_PREFIX": "https://az-key-vault.vault.azure.net/"
```

:::
 
### Accessing secrets in GCP

Metaflow supports integration with GCP Secret Manager - to store and retrieve secrets securely. The secrets are retrieved and made available through environment variables. 

:::info

Pre-requisites:
1. Enable the Secrets Manager API in your GCP Project
2. In order to access a Secret in GCP, you should have at least Secret Manager Secret Accessor role on the secret.

:::

You can specify secrets in the `sources` list or dictionary object as shown below. The following formats of secrets are supported. 

Fully qualified Path to Secret:

```python
@secrets(sources=["projects/1234567890/mysecret"]) 
```

Secret name:

```python
@secrets(sources=['mysecret'])
```

Using a dictionary to specify the environment variable name using options as follows:

```python
@secrets(sources=[{"id": "mysecret", {"options": {"env_var_name": "MY_SECRET"}}])
```

:::info

If the fully qualified GCP Secret Path is not specified in the sources attribute, it must be set in 
the metaflow configuration as:

```json
"METAFLOW_GCP_SECRET_MANAGER_PREFIX": "projects/1234567890"
```

:::
 