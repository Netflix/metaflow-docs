"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[5427],{3905:(e,t,o)=>{o.d(t,{Zo:()=>p,kt:()=>d});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var s=n.createContext({}),u=function(e){var t=n.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):l(l({},t),e)),o},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),f=u(o),d=r,h=f["".concat(s,".").concat(d)]||f[d]||c[d]||a;return o?n.createElement(h,l(l({ref:t},p),{},{components:o})):n.createElement(h,l({ref:t},p))}));function d(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=o.length,l=new Array(a);l[0]=f;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var u=2;u<a;u++)l[u]=o[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,o)}f.displayName="MDXCreateElement"},8601:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>a,metadata:()=>i,toc:()=>u});var n=o(7462),r=(o(7294),o(3905));const a={},l="Scheduling Metaflow Flows with Argo Workflows",i={unversionedId:"production/scheduling-metaflow-flows/scheduling-with-argo-workflows",id:"production/scheduling-metaflow-flows/scheduling-with-argo-workflows",title:"Scheduling Metaflow Flows with Argo Workflows",description:"Argo Workflows is a Kubernetes-native workflow orchestrator - you can read Argo Workflows documentation to learn all about it. If you just want to get your flow in production, this document contains everything you need to know.",source:"@site/docs/production/scheduling-metaflow-flows/scheduling-with-argo-workflows.md",sourceDirName:"production/scheduling-metaflow-flows",slug:"/production/scheduling-metaflow-flows/scheduling-with-argo-workflows",permalink:"/production/scheduling-metaflow-flows/scheduling-with-argo-workflows",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/production/scheduling-metaflow-flows/scheduling-with-argo-workflows.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Scheduling Metaflow Flows",permalink:"/production/scheduling-metaflow-flows/introduction"},next:{title:"Scheduling Metaflow Flows with AWS Step Functions",permalink:"/production/scheduling-metaflow-flows/scheduling-with-aws-step-functions"}},s={},u=[{value:"Pushing a flow to production",id:"pushing-a-flow-to-production",level:2},{value:"Limiting the number of concurrent tasks",id:"limiting-the-number-of-concurrent-tasks",level:3},{value:"Deploy-time parameters",id:"deploy-time-parameters",level:3},{value:"Scheduling a flow",id:"scheduling-a-flow",level:2},{value:"Reproducing failed production runs",id:"reproducing-failed-production-runs",level:2},{value:"Staging flows for production",id:"staging-flows-for-production",level:3}],p={toc:u};function c(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"scheduling-metaflow-flows-with-argo-workflows"},"Scheduling Metaflow Flows with Argo Workflows"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://argoproj.github.io/workflows"},"Argo Workflows")," is a Kubernetes-native workflow orchestrator - you can ",(0,r.kt)("a",{parentName:"p",href:"https://argoproj.github.io/argo-workflows/core-concepts/"},"read Argo Workflows documentation to learn all about it"),". If you just want to get your flow in production, this document contains everything you need to know."),(0,r.kt)("p",null,"In Metaflow's point of view, the main benefits of Argo Workflows are the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Argo Workflows orchestrates workflows expressed as directed acyclic graphs. This means that we can map Metaflow flows to the corresponding Argo Workflows Workflow Template fully automatically. This gives you much more detail about what gets executed and how, in contrast to treating Metaflow scripts as black boxes."),(0,r.kt)("li",{parentName:"ul"},"Argo Workflows comes with tooling that is required for running workflows in production. You can benefit from battle-hardened solutions provided by the Kubernetes community for alerting, monitoring, and scheduling. By using Argo Workflows your Metaflow flows can integrate seamlessly with the wider Kubernetes offerings.")),(0,r.kt)("p",null,"When running on Argo Workflows, Metaflow code works exactly as it does locally: No changes are required in the code. All data artifacts produced by steps run on Argo Workflows are available using the ",(0,r.kt)("a",{parentName:"p",href:"/metaflow/client"},"Client API"),". All tasks are run on Kubernetes respecting the ",(0,r.kt)("inlineCode",{parentName:"p"},"@resources")," decorator, as if the ",(0,r.kt)("inlineCode",{parentName:"p"},"@kubernetes")," decorator was added to all steps, as explained in ",(0,r.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/introduction#safeguard-flags"},"Executing Tasks Remotely"),"."),(0,r.kt)("p",null,"This document describes the basics of Argo Workflows scheduling. If your project involves multiple people, multiple workflows, or it is becoming business-critical, check out the section around ",(0,r.kt)("a",{parentName:"p",href:"/production/coordinating-larger-metaflow-projects"},"coordinating larger Metaflow projects"),"."),(0,r.kt)("h2",{id:"pushing-a-flow-to-production"},"Pushing a flow to production"),(0,r.kt)("p",null,"Let's use ",(0,r.kt)("a",{parentName:"p",href:"../../metaflow/basics#how-to-define-parameters-for-flows"},"the flow from the section about parameters")," as an example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, Parameter, step\n\nclass ParameterFlow(FlowSpec):\n    alpha = Parameter('alpha',\n                      help='Learning rate',\n                      default=0.01)\n\n    @step\n    def start(self):\n        print('alpha is %f' % self.alpha)\n        self.next(self.end)\n\n    @step\n    def end(self):\n        print('alpha is still %f' % self.alpha)\n\nif __name__ == '__main__':\n    ParameterFlow()\n")),(0,r.kt)("p",null,"Save this script to a file ",(0,r.kt)("inlineCode",{parentName:"p"},"parameter_flow.py"),". To deploy a version to Argo Workflows, simply run"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"python parameter_flow.py --with retry argo-workflows create\n")),(0,r.kt)("p",null,"This command takes a snapshot of your code in the working directory, as well as the version of Metaflow used and exports the whole package to Argo Workflows for scheduling."),(0,r.kt)("p",null,"It is highly recommended that you ",(0,r.kt)("a",{parentName:"p",href:"../../scaling/failures#retrying-tasks-with-the-retry-decorator"},"enable retries")," when deploying to Argo Workflows, which you can do easily with --with retry as shown above. However, make sure that all your steps are safe to retry before you do this. If some of your steps interact with external services in ways that can't tolerate automatic retries, decorate them with retry with times set to zero ","(","times=0",")"," as described in ",(0,r.kt)("a",{parentName:"p",href:"../../scaling/failures#how-to-prevent-retries"},"How to Prevent Retries"),"."),(0,r.kt)("p",null,"The command will export your workflow to  Argo Workflows as a ",(0,r.kt)("em",{parentName:"p"},"workflow template"),". You can also search for the ",(0,r.kt)("em",{parentName:"p"},"workflow template")," by name within the Argo Workflows UI. "),(0,r.kt)("p",null,(0,r.kt)("img",{src:o(7300).Z,width:"1600",height:"911"})),(0,r.kt)("p",null,"You can click on ",(0,r.kt)("em",{parentName:"p"},"Submit new workflow")," to submit your generated ",(0,r.kt)("em",{parentName:"p"},"Workflow Template")," for execution"),(0,r.kt)("p",null,(0,r.kt)("img",{src:o(3393).Z,width:"1600",height:"102"})),(0,r.kt)("p",null,"Metaflow automatically maps Parameters of your flow to corresponding parameters on Argo Workflows."),(0,r.kt)("p",null,(0,r.kt)("img",{src:o(2205).Z,width:"1600",height:"913"})),(0,r.kt)("p",null,"After you click ",(0,r.kt)("em",{parentName:"p"},"Submit"),", Argo Workflow starts running the flow:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:o(3277).Z,width:"1600",height:"911"})),(0,r.kt)("p",null,"In this case, the run should succeed without problems. If there were errors, you could reproduce them locally as explained in ",(0,r.kt)("a",{parentName:"p",href:"../../metaflow/debugging#reproducing-production-issues-locally"},"Debugging with Metaflow"),"."),(0,r.kt)("p",null,"You can trigger the workflow through command line as well:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"python parameter_flow.py argo-workflows trigger --alpha 0.5\n")),(0,r.kt)("p",null,"If you run ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows create")," again, it will create a new version of your flow on Argo Workflows. The newest version becomes the production version automatically. If you want to test on Argo Workflows without interfering with a production flow, you can change the name of your class, e.g. from ParameterFlow to ParameterFlowStaging, and ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows create")," the flow under a new name or use the ",(0,r.kt)("a",{parentName:"p",href:"/production/coordinating-larger-metaflow-projects/#projects-on-aws-step-functions--argo-workflows"},"@project")," decorator."),(0,r.kt)("p",null,"Note that ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows create")," creates a new isolated ",(0,r.kt)("a",{parentName:"p",href:"../../scaling/tagging#production-namespaces"},"production namespace")," for your production flow. Please read ",(0,r.kt)("a",{parentName:"p",href:"../../scaling/tagging"},"Organizing Results")," to learn all about namespace behavior."),(0,r.kt)("h3",{id:"limiting-the-number-of-concurrent-tasks"},"Limiting the number of concurrent tasks"),(0,r.kt)("p",null,"By default, Metaflow configures Argo Workflows to execute at most 100 tasks concurrently within a foreach step. This should ensure that most workflows finish quickly without overwhelming your Kubernetes cluster, the execution backend."),(0,r.kt)("p",null,"If your workflow includes a large foreach and you need results faster, you can increase the default with the ",(0,r.kt)("inlineCode",{parentName:"p"},"--max-workers")," option. For instance, ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows create --max-workers 500")," allows 500 tasks to be executed concurrently for every foreach step."),(0,r.kt)("p",null,"This option is similar to ",(0,r.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/introduction#safeguard-flags"},(0,r.kt)("inlineCode",{parentName:"a"},"run --max-workers"))," that is used to limit concurrency outside Argo Workflows."),(0,r.kt)("h3",{id:"deploy-time-parameters"},"Deploy-time parameters"),(0,r.kt)("p",null,"You can customize Argo Workflows deployments through Parameters that are evaluated at the deployment time, i.e. when ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows create")," is executed."),(0,r.kt)("p",null,"For instance, you can change the default value of a Parameter based on who deployed the workflow or what Git branch the deployment was executed in. Crucially, the function in Parameter is evaluated only once during ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows create")," and not during the execution of the flow."),(0,r.kt)("p",null,"You can run the flow locally as usual. The function inside Parameter is called only once when the execution starts."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, Parameter, step, JSONType\nfrom datetime import datetime\nimport json\n\ndef deployment_info(context):\n    return json.dumps({'who': context.user_name,\n                       'when': datetime.now().isoformat()})\n\nclass DeploymentInfoFlow(FlowSpec):\n    info = Parameter('deployment_info',\n                     type=JSONType,\n                     default=deployment_info)\n\n    @step\n    def start(self):\n        print('This flow was deployed at %s by %s'\\\n              % (self.info['when'], self.info['who']))\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n\nif __name__ == '__main__':\n    DeploymentInfoFlow()\n")),(0,r.kt)("p",null,"When ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows create")," is called, ",(0,r.kt)("inlineCode",{parentName:"p"},"deployment_info")," is evaluated which captures your username and the time of deployment. This information remains constant on Argo Workflows, although the user may override the default value."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"context")," object is passed to any function defined in Parameter. It contains various fields related to the flow being deployed. By relying on the values passed in context, you can create generic deploy-time functions that can be reused by multiple flows."),(0,r.kt)("h2",{id:"scheduling-a-flow"},"Scheduling a flow"),(0,r.kt)("p",null,"By default, a flow on Argo Workflows does not run automatically. You need to set up a trigger to launch the flow when an event occurs."),(0,r.kt)("p",null,"Metaflow provides built-in support for triggering Metaflow flows through time-based ","(","cron",")"," triggers. Use a time-based trigger if you want to trigger the workflow at a certain time."),(0,r.kt)("p",null,"Time-based triggers are implemented at the FlowSpec-level using the ",(0,r.kt)("inlineCode",{parentName:"p"},"@schedule")," decorator. This flow is triggered hourly:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, schedule, step\nfrom datetime import datetime\n\n@schedule(hourly=True)\nclass HourlyFlow(FlowSpec):\n\n    @step\n    def start(self):\n        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')\n        print('time is %s' % now)\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n\nif __name__ == '__main__':\n    HourlyFlow()\n")),(0,r.kt)("p",null,"You can define the schedule with ",(0,r.kt)("inlineCode",{parentName:"p"},"@schedule")," in one of the following ways:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"@schedule(weekly=True)")," runs the workflow on Sundays at midnight."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"@schedule(daily=True)")," runs the workflow every day at midnight."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"@schedule(hourly=True)")," runs the workflow every hour."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"@schedule(cron='0 10 * * ? *')")," runs the workflow at the given ",(0,r.kt)("a",{parentName:"li",href:"http://en.wikipedia.org/wiki/cron"},"Cron")," schedule, in this case at 10am UTC every day.")),(0,r.kt)("h2",{id:"reproducing-failed-production-runs"},"Reproducing failed production runs"),(0,r.kt)("p",null,"Let's use ",(0,r.kt)("a",{parentName:"p",href:"/metaflow/debugging#how-to-use-the-resume-command"},(0,r.kt)("inlineCode",{parentName:"a"},"DebugFlow")," from the debugging section")," as an example. The flow contains a bug in the step ",(0,r.kt)("inlineCode",{parentName:"p"},"b"),".\nWhen you run it, the failed run will look like this on the Argo Workflows UI:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:o(9097).Z,width:"1600",height:"912"})),(0,r.kt)("p",null,"Notice the execution ID of ",(0,r.kt)("inlineCode",{parentName:"p"},"branchflow-r8qcn"),". When running on Argo Workflows, Metaflow uses the Argo Workflows ",(0,r.kt)("em",{parentName:"p"},"workflow execution")," name (prefixed with ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-"),") as the run id."),(0,r.kt)("p",null,"The graph visualization shows that step ",(0,r.kt)("inlineCode",{parentName:"p"},"b")," failed, as expected. First, you should inspect the logs of the failed step to get an idea of why it failed. You can access Kubernetes step logs in the Argo Workflows UI by selecting the failed task and clicking on the logs button. "),(0,r.kt)("p",null,"Next, we want to reproduce the above error locally. We do this by resuming the specific Argo Workflows run that failed:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"python debug.py resume --origin-run-id argo-branchflow-r8qcn\n")),(0,r.kt)("p",null,"This will reuse the results of the ",(0,r.kt)("inlineCode",{parentName:"p"},"start")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"a")," step from the Argo Workflows run. It will try to rerun the step ",(0,r.kt)("inlineCode",{parentName:"p"},"b")," locally, which fails with the same error as it does in production."),(0,r.kt)("p",null,"You can fix the error locally as above. In the case of this simple flow, you can run the whole flow locally to confirm that the fix works. After validating the results, you would deploy a new version to production with ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows create"),"."),(0,r.kt)("p",null,"However, this might not be a feasible approach for complex production flow. For instance, the flow might process large amounts of data that can not be handled in your local instance. We have better approaches for staging flows for production:"),(0,r.kt)("h3",{id:"staging-flows-for-production"},"Staging flows for production"),(0,r.kt)("p",null,"The easiest approach to test a demanding flow is to run it with Kubernetes. This works even with resume:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"python debug.py resume --origin-run-id argo-branchflow-r8qcn --with kubernetes\n")),(0,r.kt)("p",null,"This will resume your flow and run every step on Kubernetes. When you are ready to test a fixed flow end-to-end, just run it as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"python debug.py run --with kubernetes\n")),(0,r.kt)("p",null,"Alternatively, you can change the name of the flow temporarily, e.g. from DebugFlow to DebugFlowStaging. Then you can run ",(0,r.kt)("inlineCode",{parentName:"p"},"argo-workflows create")," with the new name, which will create a separate staging flow on Argo Workflows. You can also use the ",(0,r.kt)("a",{parentName:"p",href:"/production/coordinating-larger-metaflow-projects#the-project-decorator"},(0,r.kt)("inlineCode",{parentName:"a"},"@project"))," decorator."),(0,r.kt)("p",null,"You can test the staging flow freely without interfering with the production flow. Once the staging flow runs successfully, you can confidently deploy a new version to production."))}c.isMDXComponent=!0},3393:(e,t,o)=>{o.d(t,{Z:()=>n});const n=o.p+"assets/images/argo-ui-0-1fa37d7488e195ad2d3fc472681bc91f.png"},2205:(e,t,o)=>{o.d(t,{Z:()=>n});const n=o.p+"assets/images/argo-ui-1-f4dd74f789145cd8e8816921ddb45fa9.png"},3277:(e,t,o)=>{o.d(t,{Z:()=>n});const n=o.p+"assets/images/argo-ui-2-5a308950e0eb94d3dd78266fcd553faf.png"},9097:(e,t,o)=>{o.d(t,{Z:()=>n});const n=o.p+"assets/images/argo-ui-fail-fe220e9ecb225199ad3afca7355e55eb.png"},7300:(e,t,o)=>{o.d(t,{Z:()=>n});const n=o.p+"assets/images/argo-ui-d59072ec38f0525264b1f9419b0d8f04.png"}}]);