"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[1594],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=u(n),m=o,d=h["".concat(l,".").concat(m)]||h[m]||p[m]||i;return n?a.createElement(d,r(r({ref:t},c),{},{components:n})):a.createElement(d,r({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var u=2;u<i;u++)r[u]=n[u];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},7614:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var a=n(7462),o=(n(7294),n(3905));const i={},r="Using AWS Batch",s={unversionedId:"scaling/remote-tasks/aws-batch",id:"scaling/remote-tasks/aws-batch",title:"Using AWS Batch",description:"Here are some useful tips and tricks related to running Metaflow on AWS Batch. See our",source:"@site/docs/scaling/remote-tasks/aws-batch.md",sourceDirName:"scaling/remote-tasks",slug:"/scaling/remote-tasks/aws-batch",permalink:"/scaling/remote-tasks/aws-batch",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/scaling/remote-tasks/aws-batch.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Using Kubernetes",permalink:"/scaling/remote-tasks/kubernetes"},next:{title:"Managing Dependencies",permalink:"/scaling/dependencies/"}},l={},u=[{value:"What value of <code>@timeout</code> should I set?",id:"what-value-of-timeout-should-i-set",level:2},{value:"How much <code>@resources</code> can I request?",id:"how-much-resources-can-i-request",level:2},{value:"Using GPUs and Trainium instances with AWS Batch",id:"using-gpus-and-trainium-instances-with-aws-batch",level:2},{value:"My job is stuck in <code>RUNNABLE</code> state. What should I do?",id:"my-job-is-stuck-in-runnable-state-what-should-i-do",level:2},{value:"My job is stuck in <code>STARTING</code> state. What should I do?",id:"my-job-is-stuck-in-starting-state-what-should-i-do",level:2},{value:"Listing and killing AWS Batch tasks",id:"listing-and-killing-aws-batch-tasks",level:2},{value:"Accessing AWS Batch logs",id:"accessing-aws-batch-logs",level:2},{value:"Disk space",id:"disk-space",level:2},{value:"How to configure AWS Batch for distributed computing?",id:"how-to-configure-aws-batch-for-distributed-computing",level:2}],c={toc:u};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"using-aws-batch"},"Using AWS Batch"),(0,o.kt)("p",null,"Here are some useful tips and tricks related to running Metaflow on AWS Batch. See our\nengineering resources for additional information about ",(0,o.kt)("a",{parentName:"p",href:"https://outerbounds.com/docs/engineering-welcome/"},"setting up and operating AWS\nBatch for Metaflow"),"."),(0,o.kt)("h2",{id:"what-value-of-timeout-should-i-set"},"What value of ",(0,o.kt)("inlineCode",{parentName:"h2"},"@timeout")," should I set?"),(0,o.kt)("p",null,"Metaflow sets a default timeout of 5 days so that you tasks don't get stuck infinitely\nwhile running on AWS Batch. For more details on how to use ",(0,o.kt)("inlineCode",{parentName:"p"},"@timeout")," please read\n",(0,o.kt)("a",{parentName:"p",href:"/scaling/failures#timing-out-with-the-timeout-decorator"},"this.")),(0,o.kt)("h2",{id:"how-much-resources-can-i-request"},"How much ",(0,o.kt)("inlineCode",{parentName:"h2"},"@resources")," can I request?"),(0,o.kt)("p",null,"Here are the current defaults for different resource types:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"cpu"),": 1"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"memory"),": 4000 ","(","4GB",")")),(0,o.kt)("p",null,"When setting ",(0,o.kt)("inlineCode",{parentName:"p"},"@resources"),", keep in mind the configuration of your AWS Batch Compute\nEnvironment. Your job will be stuck in a ",(0,o.kt)("inlineCode",{parentName:"p"},"RUNNABLE")," state if AWS is unable to provision\nthe requested resources. Additionally, as a good measure, don't request more resources\nthan what your workflow actually needs. On the other hand, never optimize resources\nprematurely."),(0,o.kt)("p",null,"You can place your AWS Batch task in a specific queue by using the ",(0,o.kt)("inlineCode",{parentName:"p"},"queue")," argument. By\ndefault, all tasks execute on a vanilla ",(0,o.kt)("a",{parentName:"p",href:"https://hub.docker.com/_/python/"},"python docker\nimage")," corresponding to the version of Python\ninterpreter used to launch the flow and can be overridden using the ",(0,o.kt)("inlineCode",{parentName:"p"},"image")," argument."),(0,o.kt)("p",null,"You can also specify the resource requirements on command line as well:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python BigSum.py run --with batch:cpu=4,memory=10000,queue=default,image=ubuntu:latest\n")),(0,o.kt)("h2",{id:"using-gpus-and-trainium-instances-with-aws-batch"},"Using GPUs and Trainium instances with AWS Batch"),(0,o.kt)("p",null,"To use GPUs in Metaflow tasks that run on AWS Batch, you need to run the flow in a\n",(0,o.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/batch/latest/userguide/job_queues.html"},"Job Queue")," that\nis attached to a ",(0,o.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/batch/latest/userguide/compute_environments.html"},"Compute\nEnvironment"),"\nwith GPU/Trainium instances."),(0,o.kt)("p",null,"To set this up, you can either modify the allowable instances in a ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/outerbounds/metaflow-tools/tree/master/aws"},"Metaflow AWS deployment\ntemplate")," or manually add such a\ncompute environment from the AWS console. The steps are:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create a compute environment with GPU-enabled EC2 instances or Trainium instances."),(0,o.kt)("li",{parentName:"ol"},"Attach the compute environment to a new Job Queue - for example named ",(0,o.kt)("inlineCode",{parentName:"li"},"my-gpu-queue"),". "),(0,o.kt)("li",{parentName:"ol"},"Run a flow with a GPU task in the ",(0,o.kt)("inlineCode",{parentName:"li"},"my-gpu-queue")," job queue by",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"setting the ",(0,o.kt)("inlineCode",{parentName:"li"},"METAFLOW_BATCH_JOB_QUEUE")," environment variable, or"),(0,o.kt)("li",{parentName:"ul"},"setting the ",(0,o.kt)("inlineCode",{parentName:"li"},"METAFLOW_BATCH_JOB_QUEUE")," value in your Metaflow config, or "),(0,o.kt)("li",{parentName:"ul"},"(most explicit) setting the ",(0,o.kt)("inlineCode",{parentName:"li"},"queue")," parameter in the ",(0,o.kt)("inlineCode",{parentName:"li"},"@batch")," decorator.")))),(0,o.kt)("p",null,"It is a good practice to separate the job queues that you run GPU tasks on from those that do not\nrequire GPUs (or Trainium instances). This makes it easier to track hardware-accelerated workflows,\nwhich can be costly, independent of other workflows. Just add a line like"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"@batch(gpu=1, queue='my-gpu-queue')\n")),(0,o.kt)("p",null,"in steps that require GPUs."),(0,o.kt)("h2",{id:"my-job-is-stuck-in-runnable-state-what-should-i-do"},"My job is stuck in ",(0,o.kt)("inlineCode",{parentName:"h2"},"RUNNABLE")," state. What should I do?"),(0,o.kt)("p",null,"Does the Batch job queue you are trying to run the Metaflow task in have a compute environment\nwith EC2 instances with the resources requested? For example, if your job queue is connected to\na single compute environment that only has ",(0,o.kt)("inlineCode",{parentName:"p"},"p3.2xlarge")," as a GPU instance, and a user requests 2\nGPUs, that job will never get scheduled because ",(0,o.kt)("inlineCode",{parentName:"p"},"p3.2xlarge")," only have 1 GPU per instance."),(0,o.kt)("p",null,"For more information, ",(0,o.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/batch/latest/userguide/troubleshooting.html#job_stuck_in_runnable"},"see this\narticle"),"."),(0,o.kt)("h2",{id:"my-job-is-stuck-in-starting-state-what-should-i-do"},"My job is stuck in ",(0,o.kt)("inlineCode",{parentName:"h2"},"STARTING")," state. What should I do?"),(0,o.kt)("p",null,"Are the resources requested in your Metaflow code/command sufficient? Especially when using\ncustom GPU images, you might need to increase the requested memory to pull the container image\ninto your compute environment."),(0,o.kt)("h2",{id:"listing-and-killing-aws-batch-tasks"},"Listing and killing AWS Batch tasks"),(0,o.kt)("p",null,"If you interrupt a Metaflow run, any AWS Batch tasks launched by the run get killed by\nMetaflow automatically. Even if something went wrong during the final cleanup, the tasks\nwill finish and die eventually, at the latest when they hit the maximum time allowed for\nan AWS Batch task."),(0,o.kt)("p",null,"If you want to make sure you have no AWS Batch tasks running, or you want to manage them\nmanually, you can use the ",(0,o.kt)("inlineCode",{parentName:"p"},"batch list")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"batch kill")," commands."),(0,o.kt)("p",null,"You can easily see what AWS Batch tasks were launched by your latest run with"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python myflow.py batch list\n")),(0,o.kt)("p",null,"You can kill the tasks started by the latest run with"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python myflow.py batch kill\n")),(0,o.kt)("p",null,"If you have started multiple runs, you can make sure there are no orphaned tasks still\nrunning with"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python myflow.py batch list --my-runs\n")),(0,o.kt)("p",null,"You can kill the tasks started by the latest run with"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python myflow.py batch kill --my-runs\n")),(0,o.kt)("p",null,"If you see multiple runs running, you can cherry-pick a specific job, e.g. 456, to be\nkilled as follows"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python myflow.py batch kill --run-id 456\n")),(0,o.kt)("p",null,"If you are working with another person, you can see and kill their tasks related to this\nflow with"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python myflow.py batch kill --user willsmith\n")),(0,o.kt)("p",null,"Note that all the above commands only affect the flow defined in your script. You can\nwork on many flows in parallel and be confident that ",(0,o.kt)("inlineCode",{parentName:"p"},"kill")," kills tasks only related to\nthe flow you called ",(0,o.kt)("inlineCode",{parentName:"p"},"kill")," with. "),(0,o.kt)("h2",{id:"accessing-aws-batch-logs"},"Accessing AWS Batch logs"),(0,o.kt)("p",null,"As a convenience feature, you can also see the logs of any past step as follows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python bigsum.py logs 15/end\n")),(0,o.kt)("h2",{id:"disk-space"},"Disk space"),(0,o.kt)("p",null,"You can request higher disk space on AWS Batch instances by using an unmanaged Compute\nEnvironment with a custom AMI."),(0,o.kt)("h2",{id:"how-to-configure-aws-batch-for-distributed-computing"},"How to configure AWS Batch for distributed computing?"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://outerbounds.com/engineering/operations/distributed-computing/"},"See these instructions"),"\nif you want to use AWS Batch for ",(0,o.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/distributed-computing"},"distributed computing"),"."))}p.isMDXComponent=!0}}]);