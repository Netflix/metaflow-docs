"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[2300],{9283:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>p});var a=n(7462),s=(n(7294),n(3905)),o=n(2004);const r={},c="Accessing Secrets",i={unversionedId:"scaling/secrets",id:"scaling/secrets",title:"Accessing Secrets",description:"If your flow needs to access an external service (e.g. a database) that requires",source:"@site/docs/scaling/secrets.md",sourceDirName:"scaling",slug:"/scaling/secrets",permalink:"/scaling/secrets",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/scaling/secrets.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Loading and Storing Data",permalink:"/scaling/data"},next:{title:"Organizing Results",permalink:"/scaling/tagging"}},l={},p=[{value:"Basic usage",id:"basic-usage",level:2},{value:"Configuring a secrets backend",id:"configuring-a-secrets-backend",level:3},{value:"Defining secrets on the command line",id:"defining-secrets-on-the-command-line",level:3},{value:"Advanced topics",id:"advanced-topics",level:2},{value:"Controlling access to secrets",id:"controlling-access-to-secrets",level:3},{value:"Using an alternative role",id:"using-an-alternative-role",level:3},{value:"Accessing secrets from a non-default location",id:"accessing-secrets-from-a-non-default-location",level:3}],u={toc:p};function d(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"accessing-secrets"},"Accessing Secrets"),(0,s.kt)("p",null,"If your flow needs to access an external service (e.g. a database) that requires\nauthentication, you need to supply credentials to the flow. If security wasn't\na concern, you could easily achieve this using\n",(0,s.kt)("a",{parentName:"p",href:"/metaflow/basics#how-to-define-parameters-for-flows"},"Metaflow parameters"),". However,\nwhen it comes to credentials and other sensitive information, security is a top concern."),(0,s.kt)("p",null,"The industry-standard best practice is to store credentials in a secrets\nmanager, such as ",(0,s.kt)("a",{parentName:"p",href:"https://aws.amazon.com/secrets-manager/"},"AWS Secrets Manager"),".\nOnce secrets are managed by such a system, Metaflow provides a decorator, ",(0,s.kt)("inlineCode",{parentName:"p"},"@secrets"),",\nwhich makes it easy to access them securely in a flow."),(0,s.kt)("p",null,"For more background, see ",(0,s.kt)("a",{parentName:"p",href:"https://outerbounds.com/blog/metaflow-secrets/"},"the ",(0,s.kt)("inlineCode",{parentName:"a"},"@secrets")," launch blog post"),".\nAlso, take a look at ",(0,s.kt)("a",{parentName:"p",href:"/api/step-decorators/secrets"},"the API docs for ",(0,s.kt)("inlineCode",{parentName:"a"},"@secrets")),"."),(0,s.kt)("admonition",{type:"info"},(0,s.kt)("p",{parentName:"admonition"},"Currently, ",(0,s.kt)("inlineCode",{parentName:"p"},"@secrets")," supports only AWS Secrets Manager. Contact us on\n",(0,s.kt)("a",{parentName:"p",href:"http://chat.metaflow.org"},"Metaflow support Slack")," if you are interested in\nusing another secrets manager.")),(0,s.kt)("h2",{id:"basic-usage"},"Basic usage"),(0,s.kt)("p",null,"This video gives a one-minute overview of how to store a secret and access it in\nMetaflow (no sound):"),(0,s.kt)(o.Z,{controls:!0,url:"https://www.youtube.com/watch?v=tGRc8tWTzoQ",mdxType:"ReactPlayer"}),(0,s.kt)("br",null),(0,s.kt)("p",null,"The secrets manager stores secrets as a set of key-value pairs that are\nidentified by a name. Given a name, the ",(0,s.kt)("inlineCode",{parentName:"p"},"@secrets")," decorator fetches the\nkey-value pairs - assuming your IAM user is allowed to read the secret - and\nexposes them through environment variables."),(0,s.kt)("p",null,"Here is the simple example featured in the video:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, step, secrets\nimport os\n\nclass SecretFlow(FlowSpec):\n\n    @secrets(sources=['metaflow-example-password'])\n    @step\n    def start(self):\n        print(\"Here's the password:\", os.environ['password'])\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n\nif __name__ == '__main__':\n    SecretFlow()\n")),(0,s.kt)("p",null,"In this case, ",(0,s.kt)("inlineCode",{parentName:"p"},"metaflow-example-password")," is the name of the secret which\ncontains a key ",(0,s.kt)("inlineCode",{parentName:"p"},"password"),". The ",(0,s.kt)("inlineCode",{parentName:"p"},"sources")," attribute, which defines the secret\nsources, could contain multiple names, in which case the union of all secret\nsets is exposed through environment variables."),(0,s.kt)("h3",{id:"configuring-a-secrets-backend"},"Configuring a secrets backend"),(0,s.kt)("p",null,"To use ",(0,s.kt)("inlineCode",{parentName:"p"},"@secrets"),", you need to inform Metaflow which secrets manager you want to\nuse. Currently, the choice is easy since the only supported backend is AWS\nSecrets Manager."),(0,s.kt)("p",null,"Make sure your Metaflow configuration contains the following line:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'"METAFLOW_DEFAULT_SECRETS_BACKEND_TYPE": "aws-secrets-manager"\n')),(0,s.kt)("h3",{id:"defining-secrets-on-the-command-line"},"Defining secrets on the command line"),(0,s.kt)("p",null,"Note that you can define ",(0,s.kt)("inlineCode",{parentName:"p"},"@secrets")," on the command line using the ",(0,s.kt)("inlineCode",{parentName:"p"},"--with"),"\noption like any other decorator. This comes especially handy when moving\nbetween prototype and production: For instance, you can access a different\ndatabase during development and production."),(0,s.kt)("p",null,"Consider this example that connects to a Postgres database:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, step, secrets\nimport os\nfrom psycopg import connect\n\nclass DBFlow(FlowSpec):\n\n    @step\n    def start(self):\n        with connect(user=os.environ['DB_USER'],  \n                     password=os.environ['DB_PASSWORD'],\n                     dbname=os.environ['DB_NAME'],\n                     host=os.environ['DB_HOST']) as conn:\n\n            with conn.cursor() as cur:\n                cur.execute(\"SELECT * FROM data\")\n                print(cur.fetchall())\n\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n\nif __name__ == '__main__':\n    DBFlow()\n")),(0,s.kt)("p",null,"During development, you can run the flow locally, maybe reading credentials to a\nlocal database from environment variables - no need to use a secrets manager\nduring early prototyping."),(0,s.kt)("p",null,"To read data from a test database, you can fetch credentials from a secrets\nmanager by running the flow like this:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"python dbflow.py\n   \u2013with 'secrets:sources=[\u201ctest-db-credentials\u201d]'\n   run\n")),(0,s.kt)("p",null,"And you can ",(0,s.kt)("a",{parentName:"p",href:"/production/introduction"},"deploy to production")," using a production\ndatabase like this:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"python dbflow.py\n  \u2013with 'secrets:sources=[\"prod-db-credentials\u201d]'\n  argo-workflows create\n")),(0,s.kt)("h2",{id:"advanced-topics"},"Advanced topics"),(0,s.kt)("p",null,"The following topics come up occasionally when running flows in serious\nproduction environments."),(0,s.kt)("h3",{id:"controlling-access-to-secrets"},"Controlling access to secrets"),(0,s.kt)("p",null,"A major benefit of using a secrets manager is that you can control closely who\ngets to access which secrets. In the case of AWS Secrets Manager, access\ncontrol is accomplished through IAM policies. For more details, ",(0,s.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html"},"consult the\nsection about access control in the AWS Secrets Manager\ndocumentation"),"."),(0,s.kt)("p",null,"For instance, you can set up IAM policies so that only a test database is\naccessible to users directly, while production database can be only accessed\nby ",(0,s.kt)("a",{parentName:"p",href:"/production/introduction"},"tasks running on a production scheduler"),"."),(0,s.kt)("h3",{id:"using-an-alternative-role"},"Using an alternative role"),(0,s.kt)("p",null,"By default, ",(0,s.kt)("inlineCode",{parentName:"p"},"@secrets")," accesses secrets using the default IAM role available in\nthe execution environment. For local runs, this is typically the role attached\nto the IAM user."),(0,s.kt)("p",null,"If the default role doesn't have access to the specified secrets, you can define\nan alternative role through the ",(0,s.kt)("inlineCode",{parentName:"p"},"role")," attribute:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-python"},"@secrets(sources=['metaflow-example-password'],\n         role='arn:aws:iam::123456789012:role/SecretsAccess')\n")),(0,s.kt)("p",null,"The default role needs to be able to assume the specified ",(0,s.kt)("inlineCode",{parentName:"p"},"role")," for this\nto work."),(0,s.kt)("h3",{id:"accessing-secrets-from-a-non-default-location"},"Accessing secrets from a non-default location"),(0,s.kt)("p",null,"AWS Secrets Manager is an account- and region-specific service. By default, when\nyou specify a secret name in the ",(0,s.kt)("inlineCode",{parentName:"p"},"sources")," list, ",(0,s.kt)("inlineCode",{parentName:"p"},"@secrets")," assumes that the\nname is available in the current AWS account, in the current default region."),(0,s.kt)("p",null,"If this is not the case, you can specify a full secrets ARN (available on the\nAWS Secrets Manager console) as a source:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-python"},"@secrets(sources=['arn:aws:secretsmanager:us-west-2:001234556000:secret:some-secret'])\n")))}d.isMDXComponent=!0}}]);