"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[3697],{3905:(t,e,r)=>{r.d(e,{Zo:()=>p,kt:()=>d});var n=r(7294);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function l(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}var s=n.createContext({}),u=function(t){var e=n.useContext(s),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},p=function(t){var e=u(t.components);return n.createElement(s.Provider,{value:e},t.children)},c={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},f=n.forwardRef((function(t,e){var r=t.components,a=t.mdxType,o=t.originalType,s=t.parentName,p=l(t,["components","mdxType","originalType","parentName"]),f=u(r),d=a,g=f["".concat(s,".").concat(d)]||f[d]||c[d]||o;return r?n.createElement(g,i(i({ref:e},p),{},{components:r})):n.createElement(g,i({ref:e},p))}));function d(t,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=r.length,i=new Array(o);i[0]=f;var l={};for(var s in e)hasOwnProperty.call(e,s)&&(l[s]=e[s]);l.originalType=t,l.mdxType="string"==typeof t?t:a,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5873:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var n=r(7462),a=(r(7294),r(3905));const o={},i="Installing Metaflow",l={unversionedId:"getting-started/install",id:"getting-started/install",title:"Installing Metaflow",description:"Metaflow is available as a Python package for macOS and Linux. You can visit our [GitHub",source:"@site/docs/getting-started/install.md",sourceDirName:"getting-started",slug:"/getting-started/install",permalink:"/getting-started/install",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/getting-started/install.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Metaflow Resources",permalink:"/introduction/metaflow-resources"},next:{title:"Deploying Infrastructure for Metaflow",permalink:"/getting-started/infrastructure"}},s={},u=[{value:"Upgrading Metaflow",id:"upgrading-metaflow",level:2}],p={toc:u};function c(t){let{components:e,...r}=t;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"installing-metaflow"},"Installing Metaflow"),(0,a.kt)("p",null,"Metaflow is available as a Python package for macOS and Linux. You can visit our ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Netflix/metaflow"},"GitHub\nrepository")," or get the latest version from\n",(0,a.kt)("a",{parentName:"p",href:"https://pypi.org/"},"PyPI"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pip install metaflow\n")),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"If you want to get a feel of Metaflow and the infrastructure behind it without having to\ninstall anything locally, you can do in the browser by signing up for ",(0,a.kt)("a",{parentName:"p",href:"https://docs.outerbounds.com/sandbox/"},"a Metaflow\nSandbox"),".")),(0,a.kt)("p",null,"Now you are ready to get your hands dirty with the ",(0,a.kt)("a",{parentName:"p",href:"tutorials/"},"Tutorials"),"."),(0,a.kt)("h2",{id:"upgrading-metaflow"},"Upgrading Metaflow"),(0,a.kt)("p",null,"If you have installed Metaflow previously, you can upgrade to the latest version with:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pip install --upgrade metaflow\n")))}c.isMDXComponent=!0}}]);