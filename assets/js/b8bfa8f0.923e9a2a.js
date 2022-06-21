"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[574],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return d}});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=o.createContext({}),m=function(e){var t=o.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=m(e.components);return o.createElement(c.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=m(r),d=n,f=u["".concat(c,".").concat(d)]||u[d]||l[d]||a;return r?o.createElement(f,s(s({ref:t},p),{},{components:r})):o.createElement(f,s({ref:t},p))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,s=new Array(a);s[0]=u;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var m=2;m<a;m++)s[m]=r[m];return o.createElement.apply(null,s)}return o.createElement.apply(null,r)}u.displayName="MDXCreateElement"},2203:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return m},toc:function(){return p},default:function(){return k}});var o=r(7462),n=r(3366),a=(r(7294),r(3905)),s=["components"],i={},c="Decorators",m={unversionedId:"api-ref/constructing-flows/decorators",id:"api-ref/constructing-flows/decorators",title:"Decorators",description:"",source:"@site/docs/api-ref/constructing-flows/decorators.md",sourceDirName:"api-ref/constructing-flows",slug:"/api-ref/constructing-flows/decorators",permalink:"/api-ref/constructing-flows/decorators",editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/api-ref/constructing-flows/decorators.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Basic Operations",permalink:"/api-ref/constructing-flows/basic"},next:{title:"The Client API Reference",permalink:"/api-ref/client"}},p=[],l=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.kt)("div",t)}},u=l("DocSection"),d=l("SigArgSection"),f=l("SigArg"),h=l("Description"),y=l("ParamSection"),g=l("Parameter"),x={toc:p};function k(e){var t=e.components,r=(0,n.Z)(e,s);return(0,a.kt)("wrapper",(0,o.Z)({},x,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"decorators"},"Decorators"),(0,a.kt)(u,{type:"decorator",name:"batch",module:"metaflow",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/aws/batch/batch_decorator.py#L30",mdxType:"DocSection"},(0,a.kt)(d,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"...",mdxType:"SigArg"})),(0,a.kt)(h,{summary:"Step decorator to specify that this step should execute on AWS Batch.",extended_summary:"This decorator indicates that your step should execute on AWS Batch. Note\\nthat you can apply this decorator automatically to all steps using the\\n```--with batch``` argument when calling run/resume. Step level decorators\\nwithin the code are overrides and will force a step to execute on AWS Batch\\nregardless of the ```--with``` specification.\\n\\nTo use, annotate your step as follows:\\n```\\n@batch\\n@step\\ndef my_step(self):\\n    ...\\n```",mdxType:"Description"}),(0,a.kt)(y,{name:"Parameters",mdxType:"ParamSection"},(0,a.kt)(g,{name:"cpu",type:"int",desc:"Number of CPUs required for this step. Defaults to 1. If @resources is\\nalso present, the maximum value from all decorators is used",mdxType:"Parameter"}),(0,a.kt)(g,{name:"gpu",type:"int",desc:"Number of GPUs required for this step. Defaults to 0. If @resources is\\nalso present, the maximum value from all decorators is used",mdxType:"Parameter"}),(0,a.kt)(g,{name:"memory",type:"int",desc:"Memory size (in MB) required for this step. Defaults to 4096. If\\n@resources is also present, the maximum value from all decorators is\\nused",mdxType:"Parameter"}),(0,a.kt)(g,{name:"image",type:"string",desc:"Docker image to use when launching on AWS Batch. If not specified, a\\ndefault docker image mapping to the current version of Python is used",mdxType:"Parameter"}),(0,a.kt)(g,{name:"queue",type:"string",desc:"AWS Batch Job Queue to submit the job to. Defaults to the one\\nspecified by the environment variable METAFLOW_BATCH_JOB_QUEUE",mdxType:"Parameter"}),(0,a.kt)(g,{name:"iam_role",type:"string",desc:"AWS IAM role that AWS Batch container uses to access AWS cloud resources\\n(Amazon S3, Amazon DynamoDb, etc). Defaults to the one specified by the\\nenvironment variable METAFLOW_ECS_S3_ACCESS_IAM_ROLE",mdxType:"Parameter"}),(0,a.kt)(g,{name:"execution_role",type:"string",desc:"AWS IAM role that AWS Batch can use to trigger AWS Fargate tasks.\\nDefaults to the one determined by the environment variable\\nMETAFLOW_ECS_FARGATE_EXECUTION_ROLE https://docs.aws.amazon.com/batch/latest/userguide/execution-IAM-role.html",mdxType:"Parameter"}),(0,a.kt)(g,{name:"shared_memory",type:"int",desc:"The value for the size (in MiB) of the /dev/shm volume for this step.\\nThis parameter maps to the --shm-size option to docker run.",mdxType:"Parameter"}),(0,a.kt)(g,{name:"max_swap",type:"int",desc:"The total amount of swap memory (in MiB) a container can use for this\\nstep. This parameter is translated to the --memory-swap option to\\ndocker run where the value is the sum of the container memory plus the\\nmax_swap value.",mdxType:"Parameter"}),(0,a.kt)(g,{name:"swappiness",type:"int",desc:"This allows you to tune memory swappiness behavior for this step.\\nA swappiness value of 0 causes swapping not to happen unless absolutely\\nnecessary. A swappiness value of 100 causes pages to be swapped very\\naggressively. Accepted values are whole numbers between 0 and 100.",mdxType:"Parameter"})),(0,a.kt)(y,{name:"Attributes",mdxType:"ParamSection"},(0,a.kt)(g,{name:"package_sha",mdxType:"Parameter"}),(0,a.kt)(g,{name:"package_url",mdxType:"Parameter"}),(0,a.kt)(g,{name:"run_time_limit",mdxType:"Parameter"}))),(0,a.kt)(u,{type:"decorator",name:"card",module:"metaflow",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/cards/card_decorator.py#L24",mdxType:"DocSection"},(0,a.kt)(d,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"...",mdxType:"SigArg"}))),(0,a.kt)(u,{type:"decorator",name:"catch",module:"metaflow",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/catch_decorator.py#L22",mdxType:"DocSection"},(0,a.kt)(d,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"...",mdxType:"SigArg"})),(0,a.kt)(h,{summary:"Step decorator to specify error handling for your step.",extended_summary:"This decorator indicates that exceptions in the step should be caught and not fail the entire\\nflow.\\n\\nThis can be used in conjunction with the @retry decorator. In that case, catch will only\\nactivate if all retries fail and will catch the last exception thrown by the last retry.\\n\\nTo use, annotate your step as follows:\\n```\\n@catch(var='foo')\\n@step\\ndef myStep(self):\\n    ...\\n```",mdxType:"Description"}),(0,a.kt)(y,{name:"Parameters",mdxType:"ParamSection"},(0,a.kt)(g,{name:"var",type:"string",desc:"Name of the artifact in which to store the caught exception. If not specified,\\nthe exception is not stored",mdxType:"Parameter"}),(0,a.kt)(g,{name:"print_exception",type:"bool",desc:"Determines whether or not the exception is printed to stdout when caught. Defaults\\nto True",mdxType:"Parameter"}))),(0,a.kt)(u,{type:"decorator",name:"conda",module:"metaflow",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/conda/conda_step_decorator.py#L38",mdxType:"DocSection"},(0,a.kt)(d,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"...",mdxType:"SigArg"})),(0,a.kt)(h,{summary:"Conda decorator that sets the Conda environment for your step",extended_summary:"To use, add this decorator to your step:\\n```\\n@conda\\n@step\\ndef MyStep(self):\\n    ...\\n```\\n\\nInformation in this decorator will override any eventual @conda_base flow level decorator.\\nParameters\\n----------\\nlibraries : Dict\\n    Libraries to use for this flow. The key is the name of the package and the value\\n    is the version to use. Defaults to {}\\npython : string\\n    Version of Python to use (for example: '3.7.4'). Defaults to None\\n    (will use the current python version)\\ndisabled : bool\\n    If set to True, disables Conda. Defaults to False",mdxType:"Description"}),(0,a.kt)(y,{name:"Attributes",mdxType:"ParamSection"},(0,a.kt)(g,{name:"conda",mdxType:"Parameter"}),(0,a.kt)(g,{name:"environments",mdxType:"Parameter"}))),(0,a.kt)(u,{type:"decorator",name:"kubernetes",module:"metaflow",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/kubernetes/kubernetes_decorator.py#L36",mdxType:"DocSection"},(0,a.kt)(d,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"...",mdxType:"SigArg"})),(0,a.kt)(h,{summary:"Step decorator to specify that this step should execute on Kubernetes.",extended_summary:"This decorator indicates that your step should execute on Kubernetes. Note\\nthat you can apply this decorator automatically to all steps using the\\n```--with kubernetes``` argument when calling run/resume. Step level\\ndecorators within the code are overrides and will force a step to execute\\non Kubernetes regardless of the ```--with``` specification.\\n\\nTo use, annotate your step as follows:\\n```\\n@kubernetes\\n@step\\ndef my_step(self):\\n    ...\\n```\\nParameters\\n----------\\ncpu : int\\n    Number of CPUs required for this step. Defaults to 1. If @resources is\\n    also present, the maximum value from all decorators is used\\nmemory : int\\n    Memory size (in MB) required for this step. Defaults to 4096. If\\n    @resources is also present, the maximum value from all decorators is\\n    used\\ndisk : int\\n    Disk size (in MB) required for this step. Defaults to 10GB. If\\n    @resources is also present, the maximum value from all decorators is\\n    used\\nimage : string\\n    Docker image to use when launching on Kubernetes. If not specified, a\\n    default docker image mapping to the current version of Python is used",mdxType:"Description"}),(0,a.kt)(y,{name:"Attributes",mdxType:"ParamSection"},(0,a.kt)(g,{name:"package_sha",mdxType:"Parameter"}),(0,a.kt)(g,{name:"package_url",mdxType:"Parameter"}),(0,a.kt)(g,{name:"run_time_limit",mdxType:"Parameter"}))),(0,a.kt)(u,{type:"decorator",name:"parallel",module:"metaflow",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/parallel_decorator.py#L8",mdxType:"DocSection"},(0,a.kt)(d,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"...",mdxType:"SigArg"}))),(0,a.kt)(u,{type:"decorator",name:"project",module:"metaflow",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/project_decorator.py#L15",mdxType:"DocSection"},(0,a.kt)(d,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"...",mdxType:"SigArg"}))),(0,a.kt)(u,{type:"decorator",name:"resources",module:"metaflow",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/resources_decorator.py#L4",mdxType:"DocSection"},(0,a.kt)(d,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"...",mdxType:"SigArg"})),(0,a.kt)(h,{summary:"Step decorator to specify the resources needed when executing this step.",extended_summary:"This decorator passes this information along to container orchestrator\\n(AWS Batch, Kubernetes, etc.) when requesting resources to execute this\\nstep.\\n\\nThis decorator is ignored if the execution of the step happens locally.\\n\\nTo use, annotate your step as follows:\\n```\\n@resources(cpu=32)\\n@step\\ndef my_step(self):\\n    ...\\n```\\nParameters\\n----------\\ncpu : int\\n    Number of CPUs required for this step. Defaults to 1\\ngpu : int\\n    Number of GPUs required for this step. Defaults to 0\\nmemory : int\\n    Memory size (in MB) required for this step. Defaults to 4096\\nshared_memory : int\\n    The value for the size (in MiB) of the /dev/shm volume for this step.\\n    This parameter maps to the --shm-size option to docker run .",mdxType:"Description"})),(0,a.kt)(u,{type:"decorator",name:"step",module:"metaflow",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/decorators.py#L493",mdxType:"DocSection"},(0,a.kt)(d,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"...",mdxType:"SigArg"})),(0,a.kt)(h,{summary:"The step decorator. Makes a method a step in the workflow.",mdxType:"Description"})))}k.isMDXComponent=!0}}]);