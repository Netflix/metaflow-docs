"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[7826],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=o.createContext({}),l=function(e){var t=o.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=l(e.components);return o.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),f=l(n),m=r,h=f["".concat(u,".").concat(m)]||f[m]||p[m]||i;return n?o.createElement(h,a(a({ref:t},c),{},{components:n})):o.createElement(h,a({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=f;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}f.displayName="MDXCreateElement"},314:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var o=n(7462),r=(n(7294),n(3905));const i={},a="Contributing to Metaflow",s={unversionedId:"v/r/introduction/wip-contributing-to-metaflow",id:"v/r/introduction/wip-contributing-to-metaflow",title:"Contributing to Metaflow",description:"First off, thanks for taking the time!",source:"@site/docs/v/r/introduction/wip-contributing-to-metaflow.md",sourceDirName:"v/r/introduction",slug:"/v/r/introduction/wip-contributing-to-metaflow",permalink:"/v/r/introduction/wip-contributing-to-metaflow",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/v/r/introduction/wip-contributing-to-metaflow.md",tags:[],version:"current",frontMatter:{}},u={},l=[{value:"Contributing Code and Issues",id:"contributing-code-and-issues",level:2},{value:"Community",id:"community",level:2}],c={toc:l};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"contributing-to-metaflow"},"Contributing to Metaflow"),(0,r.kt)("p",null,"First off, thanks for taking the time!"),(0,r.kt)("p",null,"If you are interested in contributing to Metaflow, we'd love to hear from you! Drop us a\nline in our ",(0,r.kt)("a",{parentName:"p",href:"https://chat.metaflow.org"},"chatroom"),"."),(0,r.kt)("h2",{id:"contributing-code-and-issues"},"Contributing Code and Issues"),(0,r.kt)("p",null,"We are proud of ",(0,r.kt)("a",{parentName:"p",href:"/v/r/introduction/what-is-metaflow#the-philosophy-of-metaflow"},"our philosophy and human-centric development\nstyle"),", which means that we value\nthoughtfulness and a polished user experience more than the number of features or lines\nof code."),(0,r.kt)("p",null,"When Metaflow was developed internally at Netflix, we spent a considerable amount of\ntime, often months, to hone the design for features before we implemented them. We are\nnot sure what\u2019s the best way to facilitate the design process in the open yet - your\nideas are welcome. We have outlined our current suggested way below -"),(0,r.kt)("p",null,"Please make sure there is an open issue discussing your contribution. Before opening a\nnew issue, please check for ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Netflix/metaflow/issues?q=is%3Aissue"},"existing\nissues"),". If you find an\nexisting issue that matches closely with yours, please thumbs-up or comment on it, so we\nknow that the issue is relevant to many people."),(0,r.kt)("p",null,"If you hit a bug that is not covered by an existing issue, please open a new issue. If\nyou are able to fix the bug by yourself with a few lines of code, we welcome your PR.\nHowever, if fixing the bug requires more effort, please wait for our response on the\nissue. We try to respond as quickly as possible."),(0,r.kt)("p",null,"If you have a proposal for an enhancement or a new feature, please open an issue and\nengage with us on the issue before devoting significant time and resources to it. We\ncare deeply about the ergonomics of Metaflow, and as such, for any new user-visible\nenhancement, please expect multiple design iterations."),(0,r.kt)("p",null,"We will do our best to respond to and review your PR, and we hope you will stay engaged\nwith us throughout the process."),(0,r.kt)("p",null,"We'd appreciate ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Netflix/metaflow/issues"},"issue reports")," if you run\ninto trouble using Metaflow."),(0,r.kt)("h2",{id:"community"},"Community"),(0,r.kt)("p",null,"Everyone is welcome to join us in our ",(0,r.kt)("a",{parentName:"p",href:"https://chat.metaflow.org"},"chatroom"),"!"),(0,r.kt)("p",null,"Please maintain appropriate, professional conduct while participating in our community.\nThis includes all channels of communication. We take reports of harassment or\nunwelcoming behavior very seriously. To report such behavior, please contact us via\n",(0,r.kt)("a",{parentName:"p",href:"mailto:help@metaflow.org"},"email"),"."))}p.isMDXComponent=!0}}]);