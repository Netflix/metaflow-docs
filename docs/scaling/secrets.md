
# Accessing Secrets

If your flow needs to access an external service (e.g. a database) that requires
authentication, you need to supply credentials to the flow. If security wasn't
a concern, you could easily achieve this using
[Metaflow parameters](basics#how-to-define-parameters-for-flows). However,
when it comes to credentials and other sensitive information, security is a top concern.

The industry-standard best practice is to store credentials in a secrets
manager, such as [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/).
Once secrets are managed by such a system, Metaflow provides a decorator, `@secrets`,
which makes it easy to access them securely in a flow.

For more background, see [the `@secrets` launch blog post](https://outerbounds.com/blog/metaflow-secrets/).
Also, take a look at [the API docs for `@secrets`](/api/step-decorators/secrets).

:::info

Currently, `@secrets` supports only AWS Secrets Manager. Contact us on
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
use. Currently, the choice is easy since the only supported backend is AWS
Secrets Manager.

Make sure your Metaflow configuration contains the following line:

```json
"METAFLOW_DEFAULT_SECRETS_BACKEND_TYPE": "aws-secrets-manager"
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

