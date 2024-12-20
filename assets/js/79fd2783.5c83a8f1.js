"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[7780],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>l});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),m=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=m(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=m(r),l=o,f=d["".concat(p,".").concat(l)]||d[l]||c[l]||a;return r?n.createElement(f,s(s({ref:t},u),{},{components:r})):n.createElement(f,s({ref:t},u))}));function l(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var m=2;m<a;m++)s[m]=r[m];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9093:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>k,frontMatter:()=>a,metadata:()=>i,toc:()=>m});var n=r(7462),o=(r(7294),r(3905));const a={},s="@kubernetes",i={unversionedId:"api/step-decorators/kubernetes",id:"api/step-decorators/kubernetes",title:"@kubernetes",description:"The @kubernetes decorator sends a step for execution on a Kubernetes cluster. For more information, see Executing Tasks Remotely.",source:"@site/docs/api/step-decorators/kubernetes.md",sourceDirName:"api/step-decorators",slug:"/api/step-decorators/kubernetes",permalink:"/api/step-decorators/kubernetes",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/api/step-decorators/kubernetes.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"@conda",permalink:"/api/step-decorators/conda"},next:{title:"@resources",permalink:"/api/step-decorators/resources"}},p={},m=[],u=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.kt)("div",t)},c=u("DocSection"),d=u("SigArgSection"),l=u("SigArg"),f=u("Description"),y=u("ParamSection"),h=u("Parameter"),b={toc:m};function k(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},b,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"kubernetes"},"@kubernetes"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"@kubernetes")," decorator sends a step for execution on a ",(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.io"},"Kubernetes")," cluster. For more information, see ",(0,o.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/introduction"},"Executing Tasks Remotely"),"."),(0,o.kt)("p",null,"For options related to ",(0,o.kt)("inlineCode",{parentName:"p"},"tmpfs"),", see ",(0,o.kt)("a",{parentName:"p",href:"/scaling/data#using-metaflows3-for-in-memory-processing"},"Using ",(0,o.kt)("inlineCode",{parentName:"a"},"metaflow.S3")," for in-memory processing"),"."),(0,o.kt)(c,{type:"decorator",name:"kubernetes",module:"metaflow",show_import:"True",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/kubernetes/kubernetes_decorator.py#L45",mdxType:"DocSection"},(0,o.kt)(d,{mdxType:"SigArgSection"},(0,o.kt)(l,{name:"...",mdxType:"SigArg"})),(0,o.kt)(f,{summary:"Specifies that this step should execute on Kubernetes.",mdxType:"Description"}),(0,o.kt)(y,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(h,{name:"cpu",type:"int, default 1",desc:"Number of CPUs required for this step. If `@resources` is\\nalso present, the maximum value from all decorators is used.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"memory",type:"int, default 4096",desc:"Memory size (in MB) required for this step. If\\n`@resources` is also present, the maximum value from all decorators is\\nused.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"disk",type:"int, default 10240",desc:"Disk size (in MB) required for this step. If\\n`@resources` is also present, the maximum value from all decorators is\\nused.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"image",type:"str, optional, default None",desc:"Docker image to use when launching on Kubernetes. If not specified, and\\nMETAFLOW_KUBERNETES_CONTAINER_IMAGE is specified, that image is used. If\\nnot, a default Docker image mapping to the current version of Python is used.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"image_pull_policy: str, default KUBERNETES_IMAGE_PULL_POLICY",desc:"If given, the imagePullPolicy to be applied to the Docker image of the step.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"service_account",type:"str, default METAFLOW_KUBERNETES_SERVICE_ACCOUNT",desc:"Kubernetes service account to use when launching pod in Kubernetes.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"secrets",type:"List[str], optional, default None",desc:"Kubernetes secrets to use when launching pod in Kubernetes. These\\nsecrets are in addition to the ones defined in `METAFLOW_KUBERNETES_SECRETS`\\nin Metaflow configuration.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"namespace",type:"str, default METAFLOW_KUBERNETES_NAMESPACE",desc:"Kubernetes namespace to use when launching pod in Kubernetes.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"gpu",type:"int, optional, default None",desc:"Number of GPUs required for this step. A value of zero implies that\\nthe scheduled node should not have GPUs.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"gpu_vendor",type:"str, default KUBERNETES_GPU_VENDOR",desc:"The vendor of the GPUs to be used for this step.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"tolerations",type:"List[str], default []",desc:"The default is extracted from METAFLOW_KUBERNETES_TOLERATIONS.\\nKubernetes tolerations to use when launching pod in Kubernetes.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"use_tmpfs",type:"bool, default False",desc:"This enables an explicit tmpfs mount for this step.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"tmpfs_tempdir",type:"bool, default True",desc:"sets METAFLOW_TEMPDIR to tmpfs_path if set for this step.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"tmpfs_size",type:"int, optional, default: None",desc:"The value for the size (in MiB) of the tmpfs mount for this step.\\nThis parameter maps to the `--tmpfs` option in Docker. Defaults to 50% of the\\nmemory allocated for this step.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"tmpfs_path",type:"str, optional, default /metaflow_temp",desc:"Path to tmpfs mount for this step.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"persistent_volume_claims",type:"Dict[str, str], optional, default None",desc:"A map (dictionary) of persistent volumes to be mounted to the pod for this step. The map is from persistent\\nvolumes to the path to which the volume is to be mounted, e.g., `{'pvc-name': '/path/to/mount/on'}`.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"shared_memory: int, optional",desc:"Shared memory size (in MiB) required for this step",mdxType:"Parameter"}),(0,o.kt)(h,{name:"port: int, optional",desc:"Port number to specify in the Kubernetes job object",mdxType:"Parameter"}))))}k.isMDXComponent=!0}}]);