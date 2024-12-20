"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[3525],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),l=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,h=d["".concat(i,".").concat(m)]||d[m]||p[m]||a;return n?r.createElement(h,s(s({ref:t},c),{},{components:n})):r.createElement(h,s({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=d;var u={};for(var i in t)hasOwnProperty.call(t,i)&&(u[i]=t[i]);u.originalType=e,u.mdxType="string"==typeof e?e:o,s[1]=u;for(var l=2;l<a;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5045:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>u,toc:()=>l});var r=n(7462),o=(n(7294),n(3905));const a={},s="Using Kubernetes",u={unversionedId:"scaling/remote-tasks/kubernetes",id:"scaling/remote-tasks/kubernetes",title:"Using Kubernetes",description:"Here are some useful tips and tricks related to running Metaflow on Kubernetes. See our",source:"@site/docs/scaling/remote-tasks/kubernetes.md",sourceDirName:"scaling/remote-tasks",slug:"/scaling/remote-tasks/kubernetes",permalink:"/scaling/remote-tasks/kubernetes",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/scaling/remote-tasks/kubernetes.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Distributed Computing",permalink:"/scaling/remote-tasks/distributed-computing"},next:{title:"Using AWS Batch",permalink:"/scaling/remote-tasks/aws-batch"}},i={},l=[{value:"What value of <code>@timeout</code> should I set?",id:"what-value-of-timeout-should-i-set",level:2},{value:"How much <code>@resources</code> can I request?",id:"how-much-resources-can-i-request",level:2},{value:"How to configure GPUs for Kubernetes?",id:"how-to-configure-gpus-for-kubernetes",level:2},{value:"A <code>@kubernetes</code> task has been stuck in <code>PENDING</code> forever. What should I do?",id:"a-kubernetes-task-has-been-stuck-in-pending-forever-what-should-i-do",level:2},{value:"Accessing Kubernetes logs",id:"accessing-kubernetes-logs",level:2},{value:"Disk space",id:"disk-space",level:2}],c={toc:l};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"using-kubernetes"},"Using Kubernetes"),(0,o.kt)("p",null,"Here are some useful tips and tricks related to running Metaflow on Kubernetes. See our\nengineering resources for additional information about ",(0,o.kt)("a",{parentName:"p",href:"https://outerbounds.com/docs/engineering-welcome/"},"setting up and operating\nKubernetes for Metaflow"),"."),(0,o.kt)("h2",{id:"what-value-of-timeout-should-i-set"},"What value of ",(0,o.kt)("inlineCode",{parentName:"h2"},"@timeout")," should I set?"),(0,o.kt)("p",null,"Metaflow sets a default timeout of 5 days so that you tasks don't get stuck infinitely\nwhile running on Kubernetes. For more details on how to use ",(0,o.kt)("inlineCode",{parentName:"p"},"@timeout")," please read\n",(0,o.kt)("a",{parentName:"p",href:"/scaling/failures#timing-out-with-the-timeout-decorator"},"this.")),(0,o.kt)("h2",{id:"how-much-resources-can-i-request"},"How much ",(0,o.kt)("inlineCode",{parentName:"h2"},"@resources")," can I request?"),(0,o.kt)("p",null,"Here are the current defaults for different resource types:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"cpu"),": 1"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"memory"),": 4096 ","(","4GB",")"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"disk"),": 10240 ","(","10GB",")")),(0,o.kt)("p",null,"When setting ",(0,o.kt)("inlineCode",{parentName:"p"},"@resources"),", keep in mind the configuration of your Kubernetes cluster.\nYour pod will be stuck in an unschedulable state if Kubernetes is unable to provision\nthe requested resources. Additionally, as a good measure, don't request more resources\nthan what your workflow actually needs. On the other hand, never optimize resources\nprematurely."),(0,o.kt)("p",null,"You can place your Kubernetes pod in a specific namespace by using the ",(0,o.kt)("inlineCode",{parentName:"p"},"namespace"),"\nargument. By default, all pods execute on a vanilla ",(0,o.kt)("a",{parentName:"p",href:"https://hub.docker.com/_/python/"},"python docker\nimage")," corresponding to the version of Python\ninterpreter used to launch the flow and can be overridden using the ",(0,o.kt)("inlineCode",{parentName:"p"},"image")," argument."),(0,o.kt)("p",null,"You can also specify the resource requirements on command line as well:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python BigSum.py run --with kubernetes:cpu=4,memory=10000,namespace=foo,image=ubuntu:latest\n")),(0,o.kt)("h2",{id:"how-to-configure-gpus-for-kubernetes"},"How to configure GPUs for Kubernetes?"),(0,o.kt)("p",null,"Metaflow compute tasks can run on any Kubernetes cluster. For starters, take a\nlook at the ",(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/"},"Kubernetes documentation on Scheduling\nGPUs"),". The guide explains how to\ninstall ",(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/"},"Kubernetes Device\nPlugins"),"\nso your cluster exposes a custom schedulable resource such as ",(0,o.kt)("inlineCode",{parentName:"p"},"amd.com/gpu")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"nvidia.com/gpu"),",\nwhich Metaflow\u2019s Kubernetes resources integration is already configured to call when a user\nspecifies a decorator like ",(0,o.kt)("inlineCode",{parentName:"p"},"@kubernetes(gpu=1)"),". "),(0,o.kt)("p",null,"For additional information, take a look at cloud-specific documentation:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Amazon Web Services EKS"),"\nAmazon has prepared the ",(0,o.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html#gpu-ami"},"EKS-optimized accelerated Amazon Linux\nAMIs"),". Read the\nlinked guide to install the hardware dependencies and choose the AMI you want to run on your GPU\nnode group. You will need to make the suggested modifications to the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/outerbounds/terraform-aws-metaflow/blob/master/examples/eks_argo/eks.tf"},"Kubernetes cluster deployed\nas part of your Metaflow AWS\ndeployment"),".")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Google Cloud Platform GKE"),"\nRead GCP\u2019s guide about ",(0,o.kt)("a",{parentName:"p",href:"https://cloud.google.com/kubernetes-engine/docs/concepts/gpus"},"GPUs on GKE"),".\nYou will need to make the suggested modifications to the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/outerbounds/metaflow-tools/blob/master/gcp/terraform/infra/kubernetes.tf"},"Kubernetes cluster deployed as part of\nyour Metaflow GCP\ndeployment"),".")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Microsoft Azure AKS"),"\nRead Azure\u2019s guide about ",(0,o.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/azure/aks/gpu-cluster"},"GPUs on AKS"),".\nYou will need to make the suggested modifications to the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/outerbounds/metaflow-tools/blob/master/azure/terraform/infra/kubernetes.tf"},"Kubernetes cluster deployed as part of your\nMetaflow Azure\ndeployment"),"."))),(0,o.kt)("p",null,"Reach out to ",(0,o.kt)("a",{parentName:"p",href:"http://chat.metaflow.org"},"Metaflow Slack channel")," if you need help setting up a cluster."),(0,o.kt)("h2",{id:"a-kubernetes-task-has-been-stuck-in-pending-forever-what-should-i-do"},"A ",(0,o.kt)("inlineCode",{parentName:"h2"},"@kubernetes")," task has been stuck in ",(0,o.kt)("inlineCode",{parentName:"h2"},"PENDING")," forever. What should I do?"),(0,o.kt)("p",null,"Are the resources requested in your Metaflow code/command sufficient? Especially when\nusing custom GPU images, you might need to increase the requested memory to pull the\ncontainer image into your compute environment."),(0,o.kt)("h2",{id:"accessing-kubernetes-logs"},"Accessing Kubernetes logs"),(0,o.kt)("p",null,"As a convenience feature, you can also see the logs of any past step as follows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ python bigsum.py logs 15/end\n")),(0,o.kt)("h2",{id:"disk-space"},"Disk space"),(0,o.kt)("p",null,"You can request higher disk space for pods by using the ",(0,o.kt)("inlineCode",{parentName:"p"},"disk")," attribute of\n",(0,o.kt)("inlineCode",{parentName:"p"},"@kubernetes"),"."))}p.isMDXComponent=!0}}]);