"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[3454],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=o.createContext({}),s=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return o.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),h=r,m=u["".concat(p,".").concat(h)]||u[h]||d[h]||a;return n?o.createElement(m,i(i({ref:t},c),{},{components:n})):o.createElement(m,i({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6394:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var o=n(7462),r=(n(7294),n(3905));const a={},i="Coordinating Larger Metaflow Projects",l={unversionedId:"production/coordinating-larger-metaflow-projects",id:"production/coordinating-larger-metaflow-projects",title:"Coordinating Larger Metaflow Projects",description:"This page applies equally to all [production",source:"@site/docs/production/coordinating-larger-metaflow-projects.md",sourceDirName:"production",slug:"/production/coordinating-larger-metaflow-projects",permalink:"/production/coordinating-larger-metaflow-projects",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/production/coordinating-larger-metaflow-projects.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Scheduling Metaflow Flows with Apache Airflow",permalink:"/production/scheduling-metaflow-flows/scheduling-with-airflow"},next:{title:"Connecting Flows via Events",permalink:"/production/event-triggering/"}},p={},s=[{value:"The <code>@project</code> decorator",id:"the-project-decorator",level:2},{value:"Projects in production",id:"projects-in-production",level:2},{value:"Single Flow, multiple developers",id:"single-flow-multiple-developers",level:3},{value:"Main production deployment",id:"main-production-deployment",level:3},{value:"Custom branches",id:"custom-branches",level:3},{value:"Custom branches for production deployments",id:"custom-branches-for-production-deployments",level:3},{value:"<code>@project</code> and event triggering",id:"project-and-event-triggering",level:3},{value:"<code>@project</code> and configs",id:"project-and-configs",level:3},{value:"Summary",id:"summary",level:2}],c={toc:s};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,o.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"coordinating-larger-metaflow-projects"},"Coordinating Larger Metaflow Projects"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"This page applies equally to all ",(0,r.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/introduction"},"production\norchestrators")," supported by\nMetaflow, i.e. AWS Step Functions, Argo Workflows, and Airflow. Examples below mention\n",(0,r.kt)("inlineCode",{parentName:"p"},"step-functions")," but you can replace ",(0,r.kt)("inlineCode",{parentName:"p"},"step-functions")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"airflow"),"\nto get equivalent behavior on your orchestrator of choice (except the last part about\nevent triggering, which applies only to Argo Workflows).")),(0,r.kt)("p",null,"Most Metaflow projects start as a simple Python script that is developed by a single\ndata scientist. Metaflow takes care of ",(0,r.kt)("a",{parentName:"p",href:"../scaling/tagging"},"keeping results organized\nautomatically"),", so you can focus on developing models and the\nbusiness logic around them."),(0,r.kt)("p",null,"Over time, the project matures to the point that you want to deploy it to ",(0,r.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/introduction"},"a production\norchestrator")," to test how the model\nworks with real-life, updating data. In Metaflow, this is a matter of executing a single\ncommand like ",(0,r.kt)("inlineCode",{parentName:"p"},"step-functions create"),". Having the workflow run automatically with fresh\ndata is a great way to surface unforeseen issues in the code."),(0,r.kt)("p",null,"After a few iterations, the workflow starts to work reliably. If the results are\npromising enough, stakeholders can start relying on the results of your workflow. Often,\nsuccess attracts more developers to join the project. At this point, you will need to\nstart thinking about how to coordinate work amongst multiple people and how to iterate\non new, experimental versions of the workflow while providing stable results to your\nstakeholders. This is where the ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," decorator comes in."),(0,r.kt)("h2",{id:"the-project-decorator"},"The ",(0,r.kt)("inlineCode",{parentName:"h2"},"@project")," decorator"),(0,r.kt)("p",null,"During development, multiple people can work on the same workflow simultaneously as\nMetaflow keeps executions isolated through ",(0,r.kt)("a",{parentName:"p",href:"../scaling/tagging"},"independently stored artifacts and\nnamespaces"),". However, by default, all production deployments are\nbound to the name of the workflow. If multiple people call ",(0,r.kt)("inlineCode",{parentName:"p"},"step-functions create"),"\nindependently, each deployment will overwrite the previous one."),(0,r.kt)("p",null,"In the early stages of a project, this simple model is convenient but as the project\ngrows, it is desirable that multiple people can test their own production deployments\nwithout interference. Or, as a single developer, you may want to experiment with\nmultiple independent deployments of your workflow."),(0,r.kt)("p",null,"Metaflow provides a ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," decorator to address this need. The ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," decorator\nis used at the ",(0,r.kt)("inlineCode",{parentName:"p"},"FlowSpec"),"-level to bind a Flow to a specific project. All flows with the\nsame project name belong to the same project."),(0,r.kt)("p",null,"You can test this by executing the following flow."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="project_flow.py"',title:'"project_flow.py"'},"from metaflow import FlowSpec, step, project, current\n\n@project(name='example_project')\nclass ProjectFlow(FlowSpec):\n\n    @step\n    def start(self):\n        print('project name:', current.project_name)\n        print('project branch:', current.branch_name)\n        print('is this a production run?', current.is_production)\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n\nif __name__ == '__main__':\n    ProjectFlow()\n")),(0,r.kt)("p",null,"Save the above snippet in a file, ",(0,r.kt)("inlineCode",{parentName:"p"},"project_flow.py"),". Now you can run the flow as usual:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"python project_flow.py run\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," decorator exposes new project-related attributes, ",(0,r.kt)("inlineCode",{parentName:"p"},"project_name"),",\n",(0,r.kt)("inlineCode",{parentName:"p"},"branch_name"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"is_production")," in ",(0,r.kt)("a",{parentName:"p",href:"../scaling/tagging#accessing-current-ids-in-a-flow"},"the current\nobject")," which you can use to alter\nthe behavior of the flow depending on the execution context. Besides the new attributes\nin current, the flow works exactly as before when executed outside a production\norchestrator."),(0,r.kt)("h2",{id:"projects-in-production"},"Projects in production"),(0,r.kt)("p",null,"The main benefit of ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," relates to deployments on ",(0,r.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/introduction"},"a production\norchestrator"),". Below, we will cover\nthis case: How to manage a production project with multiple developers collaborating."),(0,r.kt)("h3",{id:"single-flow-multiple-developers"},"Single Flow, multiple developers"),(0,r.kt)("p",null,"If ",(0,r.kt)("inlineCode",{parentName:"p"},"ProjectFlow")," did not have a ",(0,r.kt)("inlineCode",{parentName:"p"},"@project decorator"),", it would get deployed as a\nworkflow called ",(0,r.kt)("inlineCode",{parentName:"p"},"ProjectFlow")," on AWS Step Functions by ",(0,r.kt)("inlineCode",{parentName:"p"},"step-functions create"),". Only one\nversion of ",(0,r.kt)("inlineCode",{parentName:"p"},"ProjectFlow")," could exist on a production orchestrator at a time. Everyone\ndeploying the flow would need to know ",(0,r.kt)("a",{parentName:"p",href:"../scaling/tagging#production-namespaces"},"the production\ntoken")," assigned to the deployment."),(0,r.kt)("p",null,"On the UI of your production orchestrator, you would see one workflow called\n",(0,r.kt)("inlineCode",{parentName:"p"},"ProjectFlow"),":"),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(2559).Z,width:"402",height:"84"})),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," decorator changes this behavior. Let's deploy ",(0,r.kt)("inlineCode",{parentName:"p"},"ProjectFlow"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"python project_flow.py step-functions create\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," decorator adds a user-specific prefix in the workflow name: the workflow\ngets deployed with a name like ",(0,r.kt)("inlineCode",{parentName:"p"},"example_project.user.YOURNAME.ProjectFlow")," where\n",(0,r.kt)("inlineCode",{parentName:"p"},"YOURNAME")," is your username. Metaflow gets the username by looking, in order, at the\nfollowing environment variables: ",(0,r.kt)("inlineCode",{parentName:"p"},"METAFLOW_USER"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"SUDO_USER"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"USERNAME")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"USER"),"."),(0,r.kt)("p",null,"This allows multiple developers to deploy their workflows on a production orchestrator\nwithout fear that they might interfere with someone else's deployment. Imagine Alice,\nBob, and Carol collaborating on a project. Each one of them can call ",(0,r.kt)("inlineCode",{parentName:"p"},"step-functions\ncreate")," independently, which results in three separate workflows in production:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(5758).Z,width:"412",height:"221"})),(0,r.kt)("p",null,"Note that each one of these deployments gets ",(0,r.kt)("a",{parentName:"p",href:"../scaling/tagging"},"an isolated namespace"),"\nand ",(0,r.kt)("a",{parentName:"p",href:"../scaling/tagging#production-tokens"},"a separate production token"),". This means that\nif your code refers to ",(0,r.kt)("inlineCode",{parentName:"p"},"Flow('ProjectFlow').latest_run")," in production, it is guaranteed\nto refer to a run that corresponds to its own isolated deployment. The deployments don't\ninterfere with each other."),(0,r.kt)("h3",{id:"main-production-deployment"},"Main production deployment"),(0,r.kt)("p",null,"In addition to user-specific deployments, most projects have a single blessed production\nversion which represents the official results of the workflow."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," decorator exposes a new top-level command-line argument, ",(0,r.kt)("inlineCode",{parentName:"p"},"--production"),"\nthat denotes a production run or deployment. See what happens when you run ProjectFlow\nwith ",(0,r.kt)("inlineCode",{parentName:"p"},"--production"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"python project_flow.py --production run\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"current.branch_name")," will be set to prod and ",(0,r.kt)("inlineCode",{parentName:"p"},"current.is_production")," is set to\nTrue. For instance, you could write results to a production table only if\n",(0,r.kt)("inlineCode",{parentName:"p"},"current.is_production"),"."),(0,r.kt)("p",null,"You can deploy a production version to AWS Step Functions as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"python project_flow.py --production step-functions create\n")),(0,r.kt)("p",null,"Instead of deploying the flow with a user-specific prefix, this will deploy the flow as\n",(0,r.kt)("inlineCode",{parentName:"p"},"example_project.prod.ProjectFlow"),". You will get a warning about missing production\ntoken if you are not authorized to deploy the flow to production."),(0,r.kt)("p",null,"The production deployment gets a separate, isolated namespace of its own:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(9728).Z,width:"402",height:"277"})),(0,r.kt)("h3",{id:"custom-branches"},"Custom branches"),(0,r.kt)("p",null,"Imagine that ProjectFlow has a stable version in production. Now, Alice and Bob want to\nstart developing a new, experimental version of the flow. They can work on a common\ncodebase and run the code locally independently. Eventually, they will want to deploy\nthe experimental version to a production orchestrator and let it run in parallel with\nthe production version for a while, to see that it works correctly."),(0,r.kt)("p",null,"Alice and Bob could deploy the experimental version under a user-specific namespace of\ntheirs but this would make it hard to keep iterating on the code, as one of the\nusernamespaces would be reserved for the long-running experiment. A better approach is\nto deploy the experimental code under a custom branch."),(0,r.kt)("p",null,"Try the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"python project_flow.py --branch better_version run\n")),(0,r.kt)("p",null,"The flow reports that the branch name is ",(0,r.kt)("inlineCode",{parentName:"p"},"test.better_version"),". You can deploy the\ncustom branch to AWS Step Functions:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"python project_flow.py --branch better_version step-functions create\n")),(0,r.kt)("p",null,"which will result in another separate, isolated namespace:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(5513).Z,width:"405",height:"343"})),(0,r.kt)("p",null,"Alice and Bob can share the production token corresponding to the branch, so either of\nthem can redeploy the branch when needed."),(0,r.kt)("h3",{id:"custom-branches-for-production-deployments"},"Custom branches for production deployments"),(0,r.kt)("p",null,"There are scenarios where Alice might need to run multiple variants of ProjectFlow in\nproduction. Alice can very simply use custom branches to run multiple production\nversions -"),(0,r.kt)("p",null,"Try the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"python project_flow.py --branch better_version --production run\n")),(0,r.kt)("p",null,"The flow reports that the branch name is ",(0,r.kt)("inlineCode",{parentName:"p"},"prod.better_version"),". You can deploy the\ncustom branch to AWS Step Functions:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"python project_flow.py --branch better_version --production step-functions create\n")),(0,r.kt)("h3",{id:"project-and-event-triggering"},(0,r.kt)("inlineCode",{parentName:"h3"},"@project")," and event triggering"),(0,r.kt)("p",null,"Importantly, workflows connected through\n",(0,r.kt)("a",{parentName:"p",href:"/production/event-triggering/flow-events"},"the ",(0,r.kt)("inlineCode",{parentName:"a"},"@trigger_on_finish")," decorator"),"\nrespect the ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," decorator. Besides deploying individual workflows as branches,\nas shown above, you can deploy flows-of-flows as isolated branches. Read more about\nthis pattern in\n",(0,r.kt)("a",{parentName:"p",href:"/production/event-triggering/project-events"},"Deploying Variants of Event-Triggered Flows"),"."),(0,r.kt)("h3",{id:"project-and-configs"},(0,r.kt)("inlineCode",{parentName:"h3"},"@project")," and configs"),(0,r.kt)("p",null,"Often, larger Metaflow projects spanning multiple branches and flows benefit from\nshared configuration files. For instance, your project can have a configuration\nfile (or multiple) which parametrizie the project separately in each Git branch that\nin turn map to project ",(0,r.kt)("inlineCode",{parentName:"p"},"--branch"),"'es. "),(0,r.kt)("p",null,"Take a look at\n",(0,r.kt)("a",{parentName:"p",href:"/metaflow/configuring-flows/introduction"},"Configuring Flows")," for more information\nhow to leverage ",(0,r.kt)("inlineCode",{parentName:"p"},"Config"),"s in your projects."),(0,r.kt)("h2",{id:"summary"},"Summary"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," decorator makes available three classes of namespaces that will affect\nthe behavior of a production deployment:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"user")," is the default. It will deploy to a user-specific, private namespace. Use it\nfor testing production deployments."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"test")," denotes custom branches that can be shared amongst multiple users. Use it for\ndeploying experimental versions that can run in parallel with production. Deploy\ncustom branches with ",(0,r.kt)("inlineCode",{parentName:"li"},"--branch foo"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"prod")," denotes the global production namespace. Use it for deploying the official\nproduction version of the project. Deploy to production with ",(0,r.kt)("inlineCode",{parentName:"li"},"--production"),". For\nmultiple production variants, deploy custom branches with ",(0,r.kt)("inlineCode",{parentName:"li"},"--production --branch foo"),".")),(0,r.kt)("p",null,"Note that the isolated namespaces offered by ",(0,r.kt)("inlineCode",{parentName:"p"},"@project")," work best when your code is\ndesigned to respect these boundaries. For instance, when writing results to a table, you\ncan use ",(0,r.kt)("inlineCode",{parentName:"p"},"current.branch_name")," to choose the table to write to, or you can disable writes\noutside production by checking ",(0,r.kt)("inlineCode",{parentName:"p"},"current.is_production"),"."))}d.isMDXComponent=!0},5513:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/project_branch-fa9d8a994728008777768f66b4a0503b.png"},2559:(e,t,n)=>{n.d(t,{Z:()=>o});const o="data:image/png;base64,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lIjMmjXLmjVr5mqgjXNkejDcnDlzTHffcZn2zFG+ceahsk+cONG++eYbe//9961y5ZL/Tps3b7Znn33WtBX1aaeVHEXu06ePE5KLLrrIf9rqBRdcEBcO0oVArARK/vJjzYrET1UCCxcudFU/evSoLV682LSlpwQm7G5sFeHYtGlT8/KtSPiwYSSW55xzzr9EJDW95557zm0alHqOYwgkiQBCkqSrmeN1qVGjht188832+uuv2/r16/3Sbty40b788kvr37+/LVmyxL766itr3LixDRgwwCQInsmXUFRUZNrO4MILL3S7dNapU8f72o4dO2avvPKK/1kHnTp1sksuuaTEuR9++MGWLl3qhpU0vNSvXz+XX2qg4uJi09OuV65cafJjdOzY0dSL8Hwu7733nv38889ue1L1RF544QUX/aqrrnLCkppWJo7l7/niiy9cecRGmxCpbjLxkGgOGjToX4L1xx9/2GuvvWbXX399CZaZKBNpQMAjULK/7Z3lHQIxEfjnn39s9+7dVrduXT8HCcmMGTPs3nvvtWnTppl6Ltryc8KECX6Yjz/+2G699Vb74IMP7MiRI/bYY4/ZHXfcYYcOHfLD/P3337ZixQr/pTT1OdW0OdtNN91kb775ph0/ftyeeeYZu+GGG+ynn37yg0lEJk+ebIMHD3bCtnXrVnvwwQddft42CkpH4if7/fff/TwPHz7sp5OpA6UvP8r48ePtwIED9tlnn9ntt99ub731lp+F6uo57cVKvSCZRFDfSYgwCMRFgB5JXGRJ1yfw+eefu2M11p988om7k5dopNtvv/3mGm7d9asB9PZFkG9FjWjv3r1do1ipUiVTr0KCMGnSJHdOaVWvXt1eeuklP9l0n4N6LGqQr7jiCps5c6bzW4wZM8auvPJK1/A+/vjjLq56NRKyJ5980m688UZ3btu2bTZw4EArKChwnxVWgnfxxRfbnXfe6UTHzzjtQEJVpUoV/+zTTz9tHTp08D+Xd/DUU085P8rcuXOtc+fOJqFTvZ944gnXK2nXrp2ru3wy+l69E/Xc5LiX6MpatmxZXjZ8D4HQBBCS0OiIWFECo0eP9oOee+65zkGt3kW63Xffff7QUb169UzDRDI5s2WKIxGRtW7d2rp3726ffvqpqZfjnXdflvHnu+++c70HDQtJGDxTmdTD8GzRokUubU9EdF5+kNQZ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"},9728:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/project_prod-910994acd266cade98446a49bcb4fe60.png"},5758:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/project_user-28351b3bdd6b86e62f88f3371632f4ab.png"}}]);