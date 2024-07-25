"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[2840],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=s(n),g=o,m=u["".concat(p,".").concat(g)]||u[g]||d[g]||a;return n?r.createElement(m,l(l({ref:t},c),{},{components:n})):r.createElement(m,l({ref:t},c))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var s=2;s<a;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4908:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var r=n(7462),o=(n(7294),n(3905));const a={},l="Deploying Flows Programmatically",i={unversionedId:"metaflow/managing-flows/deployer",id:"metaflow/managing-flows/deployer",title:"Deploying Flows Programmatically",description:"Besides running flows programmatically, you can deploy flows to",source:"@site/docs/metaflow/managing-flows/deployer.md",sourceDirName:"metaflow/managing-flows",slug:"/metaflow/managing-flows/deployer",permalink:"/metaflow/managing-flows/deployer",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/metaflow/managing-flows/deployer.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Running Flows Programmatically",permalink:"/metaflow/managing-flows/runner"},next:{title:"Debugging Flows",permalink:"/metaflow/debugging"}},p={},s=[{value:"Deploying to production with the <code>Deployer</code> API",id:"deploying-to-production-with-the-deployer-api",level:2},{value:"Triggering a flow explicitly",id:"triggering-a-flow-explicitly",level:2},{value:"Terminating a triggered run",id:"terminating-a-triggered-run",level:3},{value:"Orchestrator-specific methods",id:"orchestrator-specific-methods",level:2}],c={toc:s};function d(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"deploying-flows-programmatically"},"Deploying Flows Programmatically"),(0,o.kt)("p",null,"Besides running flows programmatically, you can deploy flows to\n",(0,o.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/introduction"},"one of the production orchestrators supported by Metaflow"),"\nprogrammatically. For instance, you can use this feature to create a deployment script running\nas ",(0,o.kt)("a",{parentName:"p",href:"https://outerbounds.com/blog/continuous-delivery-of-ml-ai/"},"a part of your CI/CD system"),",\ne.g. on GitHub Actions, to deploy a flow to production automatically after a pull request\nhas been approved."),(0,o.kt)("h2",{id:"deploying-to-production-with-the-deployer-api"},"Deploying to production with the ",(0,o.kt)("inlineCode",{parentName:"h2"},"Deployer")," API"),(0,o.kt)("p",null,"Deployments are handled through ",(0,o.kt)("a",{parentName:"p",href:"/api/deployer"},"the ",(0,o.kt)("inlineCode",{parentName:"a"},"Deployer")," API")," which follows closely the\ncommand line interface used to push flows to production orchestrators like\n",(0,o.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/scheduling-with-argo-workflows"},"Argo Workflows")," and\n",(0,o.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/scheduling-with-aws-step-functions"},"Step Functions"),"."),(0,o.kt)("p",null,"This diagram outlines the deployment process and the objects involved:"),(0,o.kt)("p",null,(0,o.kt)("img",{src:n(2910).Z,width:"1497",height:"500"})),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Instantiate a ",(0,o.kt)("inlineCode",{parentName:"li"},"Deployer")," class pointing at the flow file you want to deploy:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import Deployer\ndeployer = Deployer('helloflow.py')\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Choose an orchestrator - here Argo Workflows - and call ",(0,o.kt)("inlineCode",{parentName:"li"},"create()")," to deploy the flow")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"deployed_flow = deployer.argo_workflows().create()\n")),(0,o.kt)("p",null,"The flow is now scheduled for execution! If you had annotated the flow\nwith ",(0,o.kt)("a",{parentName:"p",href:"/api/flow-decorators/schedule"},"a ",(0,o.kt)("inlineCode",{parentName:"a"},"@schedule")," decorator"),", it would\nrun automatically at the desired time.\nHad you annotated it with ",(0,o.kt)("a",{parentName:"p",href:"/api/flow-decorators/trigger"},(0,o.kt)("inlineCode",{parentName:"a"},"@trigger")),",\nor ",(0,o.kt)("a",{parentName:"p",href:"/api/flow-decorators/trigger_on_finish"},(0,o.kt)("inlineCode",{parentName:"a"},"@trigger_on_finish")),", it would\nrun automatically when the specified event arrives."),(0,o.kt)("h2",{id:"triggering-a-flow-explicitly"},"Triggering a flow explicitly"),(0,o.kt)("p",null,"You can trigger a deployed flow explicitly by calling ",(0,o.kt)("inlineCode",{parentName:"p"},"trigger()")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"triggered_run = deployed_flow.trigger()\n")),(0,o.kt)("p",null,"You can specify any ",(0,o.kt)("a",{parentName:"p",href:"/metaflow/basics#how-to-define-parameters-for-flows"},(0,o.kt)("inlineCode",{parentName:"a"},"Parameters")),"\nin ",(0,o.kt)("inlineCode",{parentName:"p"},"trigger"),", e.g."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"triggered_run = deployed_flow.trigger(alpha=5, algorithm='cubic')\n")),(0,o.kt)("p",null,"Triggering returns a ",(0,o.kt)("inlineCode",{parentName:"p"},"TriggeredRun")," object, representing a run that is\nabout to get scheduled by the orchestrator. Only when the ",(0,o.kt)("inlineCode",{parentName:"p"},"start"),"\nstep starts executing, a corresponding ",(0,o.kt)("a",{parentName:"p",href:"/metaflow/client"},(0,o.kt)("inlineCode",{parentName:"a"},"Run")," object"),"\nbecomes accessible. This may take a while, for instance, if a new\ncloud instance needs to start to execute the task:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import time\nwhile triggered_run.run is None:\n    print(f'Waiting for the run to start')\n    time.sleep(1)\nprint('Run started', triggered_run.run)\n")),(0,o.kt)("h3",{id:"terminating-a-triggered-run"},"Terminating a triggered run"),(0,o.kt)("p",null,"You may terminate a triggered run at any time by calling"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"triggered_run.terminate()\n")),(0,o.kt)("h2",{id:"orchestrator-specific-methods"},"Orchestrator-specific methods"),(0,o.kt)("p",null,"Besides the common methods highlighted above, each orchestrator exposes\nadditional methods for managing deployments and triggered runs. For details,\nsee ",(0,o.kt)("a",{parentName:"p",href:"/api/deployer"},"the API documentation for ",(0,o.kt)("inlineCode",{parentName:"a"},"Deployer")),"."),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Currently, ",(0,o.kt)("inlineCode",{parentName:"p"},"Deployer")," doesn't support deployments to Apache Airflow, as Airflow\ndoesn't expose an API for deployments. Instead, you should\n",(0,o.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/scheduling-with-airflow#pushing-a-flow-to-production"},"copy the resulting Airflow dag"),"\nmanually to your Airflow server.")))}d.isMDXComponent=!0},2910:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/deployer-flow-7936d81719e7b5eec3d34d58ec8f841b.png"}}]);