"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[5133],{3905:(e,t,o)=>{o.d(t,{Zo:()=>s,kt:()=>y});var r=o(7294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function m(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var l=r.createContext({}),p=function(e){var t=r.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},s=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,s=m(e,["components","mdxType","originalType","parentName"]),c=p(o),y=n,u=c["".concat(l,".").concat(y)]||c[y]||d[y]||a;return o?r.createElement(u,i(i({ref:t},s),{},{components:o})):r.createElement(u,i({ref:t},s))}));function y(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,i=new Array(a);i[0]=c;var m={};for(var l in t)hasOwnProperty.call(t,l)&&(m[l]=t[l]);m.originalType=e,m.mdxType="string"==typeof e?e:n,i[1]=m;for(var p=2;p<a;p++)i[p]=o[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,o)}c.displayName="MDXCreateElement"},6770:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>m,toc:()=>p});var r=o(7462),n=(o(7294),o(3905));const a={},i="Deployer - Deploying flows programmatically",m={unversionedId:"api/deployer",id:"api/deployer",title:"Deployer - Deploying flows programmatically",description:"The Deployer class allows you to manage production deployments programmatically. For an overview, see Deploying flows programmatically.",source:"@site/docs/api/deployer.md",sourceDirName:"api",slug:"/api/deployer",permalink:"/api/deployer",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/api/deployer.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Runner - Running flows programmatically",permalink:"/api/runner"},next:{title:"S3 - Accessing data in S3 quickly",permalink:"/api/S3"}},l={},p=[{value:"Example",id:"example",level:3},{value:"Common <code>Deployer</code>",id:"common-deployer",level:2},{value:"Deploy Argo Workflows with <code>ArgoWorkflowsDeployer</code>",id:"deploy-argo-workflows-with-argoworkflowsdeployer",level:2},{value:"Manage a flow deployed on Argo Workflows with <code>ArgoWorkflowsDeployedFlow</code>",id:"manage-a-flow-deployed-on-argo-workflows-with-argoworkflowsdeployedflow",level:3},{value:"Manage a run triggered on Argo Workflows with <code>ArgoWorkflowsTriggeredRun</code>",id:"manage-a-run-triggered-on-argo-workflows-with-argoworkflowstriggeredrun",level:3},{value:"Deploy Step Functions with <code>StepFunctionsDeployer</code>",id:"deploy-step-functions-with-stepfunctionsdeployer",level:2},{value:"Manage a flow deployed on Step Functions with <code>StepFunctionsDeployedFlow</code>",id:"manage-a-flow-deployed-on-step-functions-with-stepfunctionsdeployedflow",level:3},{value:"Manage a run triggered on Step Functions with <code>StepFunctionsTriggeredRun</code>",id:"manage-a-run-triggered-on-step-functions-with-stepfunctionstriggeredrun",level:3}],s=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,n.kt)("div",t)},d=s("DocSection"),c=s("SigArgSection"),y=s("SigArg"),u=s("Description"),g=s("ParamSection"),f=s("Parameter"),k={toc:p};function h(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,r.Z)({},k,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"deployer---deploying-flows-programmatically"},"Deployer - Deploying flows programmatically"),(0,n.kt)("p",null,"The ",(0,n.kt)("inlineCode",{parentName:"p"},"Deployer")," class allows you to manage ",(0,n.kt)("a",{parentName:"p",href:"/production/introduction"},"production deployments")," programmatically. For an overview, see ",(0,n.kt)("a",{parentName:"p",href:"/metaflow/managing-flows/deployer"},"Deploying flows programmatically"),"."),(0,n.kt)("p",null,"Metaflow supports ",(0,n.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/introduction"},"various production orchestrators"),", each offering slightly different functionalities. All of them operate with the same high-level interfaces, exposed through the ",(0,n.kt)("inlineCode",{parentName:"p"},"Deployer")," API:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Start by instantiating the top-level ",(0,n.kt)("inlineCode",{parentName:"li"},"Deployer")," object."),(0,n.kt)("li",{parentName:"ol"},"Choose a production orchestrator through the functions of ",(0,n.kt)("inlineCode",{parentName:"li"},"Deployer"),"."),(0,n.kt)("li",{parentName:"ol"},"Deploy a flow by calling an implementation-specific ",(0,n.kt)("inlineCode",{parentName:"li"},"create()")," function that returns a ",(0,n.kt)("inlineCode",{parentName:"li"},"DeployedFlow")," representing a flow that is deployed but not yet running."),(0,n.kt)("li",{parentName:"ol"},"The ",(0,n.kt)("inlineCode",{parentName:"li"},"DeployedFlow")," is ready to execute automatically if it is scheduled with ",(0,n.kt)("a",{parentName:"li",href:"/api/flow-decorators/schedule"},(0,n.kt)("inlineCode",{parentName:"a"},"@schedule")),", ",(0,n.kt)("a",{parentName:"li",href:"/api/flow-decorators/trigger"},(0,n.kt)("inlineCode",{parentName:"a"},"@trigger")),",\nand ",(0,n.kt)("a",{parentName:"li",href:"/api/flow-decorators/trigger_on_finish"},(0,n.kt)("inlineCode",{parentName:"a"},"@trigger_on_finish"))," decorators."),(0,n.kt)("li",{parentName:"ol"},"Optionally, you can trigger a run explictly by calling ",(0,n.kt)("inlineCode",{parentName:"li"},"DeployedFlow.trigger()")," that returns a ",(0,n.kt)("inlineCode",{parentName:"li"},"TriggeredRun"),"  representing a run that will start executing."),(0,n.kt)("li",{parentName:"ol"},"Once the run has started executing, ",(0,n.kt)("inlineCode",{parentName:"li"},"TriggeredRun.run")," returns a corresponding ",(0,n.kt)("a",{parentName:"li",href:"/api/client#run"},(0,n.kt)("inlineCode",{parentName:"a"},"Run")," object"),".")),(0,n.kt)("h3",{id:"example"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-python"},"import time\nfrom metaflow import Deployer\ndeployed_flow = Deployer('helloflow.py').argo_workflows().create()\nprint('Production token', deployed_flow.production_token)\ntriggered_run = deployed_flow.trigger()\nwhile triggered_run.run is None:\n    print(f'Waiting for the run to start')\n    time.sleep(1)\nprint('Run started', triggered_run.run)\nprint('Terminating the flow', triggered_run.terminate())\n")),(0,n.kt)("p",null,"Note that you can replace ",(0,n.kt)("inlineCode",{parentName:"p"},"argo_workflows()")," above with ",(0,n.kt)("inlineCode",{parentName:"p"},"step_functions()")," without changing anything\nelse in the code."),(0,n.kt)("p",null,"In addition to this basic functionality, each implementation-specific object exposes additional functions for managing deployed flows and runs, as documented below."),(0,n.kt)("h2",{id:"common-deployer"},"Common ",(0,n.kt)("inlineCode",{parentName:"h2"},"Deployer")),(0,n.kt)(d,{type:"class",name:"Deployer",module:"metaflow",show_import:"False",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"flow_file, show_output=True, profile=None, env=None, cwd=None, **kwargs",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Use the `Deployer` class to configure and access one of the production\\norchestrators supported by Metaflow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"flow_file",type:"str",desc:"Path to the flow file to deploy.",mdxType:"Parameter"}),(0,n.kt)(f,{name:"show_output",type:"bool, default True",desc:"Show the 'stdout' and 'stderr' to the console by default.",mdxType:"Parameter"}),(0,n.kt)(f,{name:"profile",type:"Optional[str], default None",desc:"Metaflow profile to use for the deployment. If not specified, the default\\nprofile is used.",mdxType:"Parameter"}),(0,n.kt)(f,{name:"env",type:"Optional[Dict[str, str]], default None",desc:"Additional environment variables to set for the deployment.",mdxType:"Parameter"}),(0,n.kt)(f,{name:"cwd",type:"Optional[str], default None",desc:"The directory to run the subprocess in; if not specified, the current\\ndirectory is used.",mdxType:"Parameter"}),(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments that you would pass to `python myflow.py` before\\nthe deployment command.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"Deployer.argo_workflows",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L11",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Returns a deployer specific to Argo Workflows.",mdxType:"Description"}),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"ArgoWorkflowsDeployer",desc:"a deployer class specific to Argo Workflows",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"Deployer.step_functions",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L21",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Returns a deployer specific to Step Functions.",mdxType:"Description"}),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"StepFunctionsDeployer",desc:"a deployer class specific to Step Functions",mdxType:"Parameter"}))),(0,n.kt)("h2",{id:"deploy-argo-workflows-with-argoworkflowsdeployer"},"Deploy Argo Workflows with ",(0,n.kt)("inlineCode",{parentName:"h2"},"ArgoWorkflowsDeployer")),(0,n.kt)(d,{type:"method",name:"ArgoWorkflowsDeployer.create",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L52",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"}),(0,n.kt)(y,{name:"**kwargs",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Create a deployed flow using the deployer implementation.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to `create` corresponding to the\\ncommand line arguments of `create`",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"DeployedFlow",desc:"DeployedFlow object representing the deployed flow.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Raises",mdxType:"ParamSection"},(0,n.kt)(f,{type:"Exception",desc:"If there is an error during deployment.",mdxType:"Parameter"}))),(0,n.kt)("h3",{id:"manage-a-flow-deployed-on-argo-workflows-with-argoworkflowsdeployedflow"},"Manage a flow deployed on Argo Workflows with ",(0,n.kt)("inlineCode",{parentName:"h3"},"ArgoWorkflowsDeployedFlow")),(0,n.kt)(d,{type:"property",name:"ArgoWorkflowsDeployedFlow.production_token",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,n.kt)(u,{summary:"Get the production token for the deployed flow.\\n",mdxType:"Description"}),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"str, optional",desc:"The production token, None if it cannot be retrieved.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"ArgoWorkflowsDeployedFlow.trigger",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L40",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Trigger a new run for the deployed flow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to the trigger command, `Parameters` in particular",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"ArgoWorkflowsTriggeredRun",desc:"The triggered run instance.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Raises",mdxType:"ParamSection"},(0,n.kt)(f,{type:"Exception",desc:"If there is an error during the trigger process.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"ArgoWorkflowsDeployedFlow.delete",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L43",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Delete the deployed flow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to the delete command.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"bool",desc:"True if the command was successful, False otherwise.",mdxType:"Parameter"}))),(0,n.kt)("h3",{id:"manage-a-run-triggered-on-argo-workflows-with-argoworkflowstriggeredrun"},"Manage a run triggered on Argo Workflows with ",(0,n.kt)("inlineCode",{parentName:"h3"},"ArgoWorkflowsTriggeredRun")),(0,n.kt)(d,{type:"property",name:"ArgoWorkflowsTriggeredRun.run",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,n.kt)(u,{summary:"Retrieve the `Run` object for the triggered run.\\n\\nNote that Metaflow `Run` becomes available only when the `start` task\\nhas started executing.\\n",mdxType:"Description"}),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"Run, optional",desc:"Metaflow Run object if the `start` step has started executing, otherwise None.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"ArgoWorkflowsTriggeredRun.terminate",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L15",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Terminate the running workflow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to the terminate command.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"bool",desc:"True if the command was successful, False otherwise.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"ArgoWorkflowsTriggeredRun.suspend",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L18",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Suspend the running workflow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to the suspend command.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"bool",desc:"True if the command was successful, False otherwise.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"ArgoWorkflowsTriggeredRun.unsuspend",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L21",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Unsuspend the suspended workflow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to the unsuspend command.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"bool",desc:"True if the command was successful, False otherwise.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"ArgoWorkflowsTriggeredRun.status",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L24",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Get the status of the triggered run.",mdxType:"Description"}),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"str, optional",desc:"The status of the workflow considering the run object, or None if the status could not be retrieved.",mdxType:"Parameter"}))),(0,n.kt)("h2",{id:"deploy-step-functions-with-stepfunctionsdeployer"},"Deploy Step Functions with ",(0,n.kt)("inlineCode",{parentName:"h2"},"StepFunctionsDeployer")),(0,n.kt)(d,{type:"method",name:"StepFunctionsDeployer.create",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L42",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"}),(0,n.kt)(y,{name:"**kwargs",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Create a deployed flow using the deployer implementation.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to `create` corresponding to the\\ncommand line arguments of `create`",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"DeployedFlow",desc:"DeployedFlow object representing the deployed flow.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Raises",mdxType:"ParamSection"},(0,n.kt)(f,{type:"Exception",desc:"If there is an error during deployment.",mdxType:"Parameter"}))),(0,n.kt)("h3",{id:"manage-a-flow-deployed-on-step-functions-with-stepfunctionsdeployedflow"},"Manage a flow deployed on Step Functions with ",(0,n.kt)("inlineCode",{parentName:"h3"},"StepFunctionsDeployedFlow")),(0,n.kt)(d,{type:"property",name:"StepFunctionsDeployedFlow.production_token",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,n.kt)(u,{summary:"Get the production token for the deployed flow.\\n",mdxType:"Description"}),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"str, optional",desc:"The production token, None if it cannot be retrieved.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"StepFunctionsDeployedFlow.trigger",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L27",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Trigger a new run for the deployed flow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to the trigger command, `Parameters` in particular",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"StepFunctionsTriggeredRun",desc:"The triggered run instance.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Raises",mdxType:"ParamSection"},(0,n.kt)(f,{type:"Exception",desc:"If there is an error during the trigger process.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"StepFunctionsDeployedFlow.delete",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L30",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Delete the deployed flow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to the delete command.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"bool",desc:"True if the command was successful, False otherwise.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"StepFunctionsDeployedFlow.list_runs",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L33",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"}),(0,n.kt)(y,{name:"states",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"List runs of the deployed flow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"states",type:"Optional[List[str]], optional",desc:"A list of states to filter the runs by. Allowed values are:\\nRUNNING, SUCCEEDED, FAILED, TIMED_OUT, ABORTED.\\nIf not provided, all states will be considered.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"List[TriggeredRun]",desc:"A list of TriggeredRun objects representing the runs of the deployed flow.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Raises",mdxType:"ParamSection"},(0,n.kt)(f,{type:"ValueError",desc:"If any of the provided states are invalid or if there are duplicate states.",mdxType:"Parameter"}))),(0,n.kt)("h3",{id:"manage-a-run-triggered-on-step-functions-with-stepfunctionstriggeredrun"},"Manage a run triggered on Step Functions with ",(0,n.kt)("inlineCode",{parentName:"h3"},"StepFunctionsTriggeredRun")),(0,n.kt)(d,{type:"property",name:"StepFunctionsTriggeredRun.run",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,n.kt)(u,{summary:"Retrieve the `Run` object for the triggered run.\\n\\nNote that Metaflow `Run` becomes available only when the `start` task\\nhas started executing.\\n",mdxType:"Description"}),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"Run, optional",desc:"Metaflow Run object if the `start` step has started executing, otherwise None.",mdxType:"Parameter"}))),(0,n.kt)(d,{type:"method",name:"StepFunctionsTriggeredRun.terminate",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L13",mdxType:"DocSection"},(0,n.kt)(c,{mdxType:"SigArgSection"},(0,n.kt)(y,{name:"self",mdxType:"SigArg"})),(0,n.kt)(u,{summary:"Terminate the running workflow.",mdxType:"Description"}),(0,n.kt)(g,{name:"Parameters",mdxType:"ParamSection"},(0,n.kt)(f,{name:"**kwargs",type:"Any",desc:"Additional arguments to pass to the terminate command.",mdxType:"Parameter"})),(0,n.kt)(g,{name:"Returns",mdxType:"ParamSection"},(0,n.kt)(f,{type:"bool",desc:"True if the command was successful, False otherwise.",mdxType:"Parameter"}))))}h.isMDXComponent=!0}}]);