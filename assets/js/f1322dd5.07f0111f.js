"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[4087],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(r),m=o,f=d["".concat(c,".").concat(m)]||d[m]||u[m]||a;return r?n.createElement(f,i(i({ref:t},l),{},{components:r})):n.createElement(f,i({ref:t},l))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3674:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const a={},i="@retry",s={unversionedId:"api/step-decorators/retry",id:"api/step-decorators/retry",title:"@retry",description:"The @retry decorator specifies how many times the task(s) corresponding to a step should be retried before failing the flow.",source:"@site/docs/api/step-decorators/retry.md",sourceDirName:"api/step-decorators",slug:"/api/step-decorators/retry",permalink:"/api/step-decorators/retry",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/api/step-decorators/retry.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"@resources",permalink:"/api/step-decorators/resources"},next:{title:"@secrets",permalink:"/api/step-decorators/secrets"}},c={},p=[],l=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.kt)("div",t)},u=l("DocSection"),d=l("SigArgSection"),m=l("SigArg"),f=l("Description"),y=l("ParamSection"),h=l("Parameter"),b={toc:p};function g(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},b,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"retry"},"@retry"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"@retry")," decorator specifies how many times the task(s) corresponding to a step should be retried before failing the flow."),(0,o.kt)("p",null,"For more information, see ",(0,o.kt)("a",{parentName:"p",href:"/scaling/failures"},"Dealing with Failures"),"."),(0,o.kt)(u,{type:"decorator",name:"retry",module:"metaflow",show_import:"True",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/retry_decorator.py#L6",mdxType:"DocSection"},(0,o.kt)(d,{mdxType:"SigArgSection"},(0,o.kt)(m,{name:"...",mdxType:"SigArg"})),(0,o.kt)(f,{summary:"Specifies the number of times the task corresponding\\nto a step needs to be retried.",extended_summary:"This decorator is useful for handling transient errors, such as networking issues.\\nIf your task contains operations that can't be retried safely, e.g. database updates,\\nit is advisable to annotate it with `@retry(times=0)`.\\n\\nThis can be used in conjunction with the `@catch` decorator. The `@catch`\\ndecorator will execute a no-op task after all retries have been exhausted,\\nensuring that the flow execution can continue.",mdxType:"Description"}),(0,o.kt)(y,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(h,{name:"times",type:"int, default: 3",desc:"Number of times to retry this task.",mdxType:"Parameter"}),(0,o.kt)(h,{name:"minutes_between_retries",type:"int, default: 2",desc:"Number of minutes between retries.",mdxType:"Parameter"}))))}g.isMDXComponent=!0}}]);