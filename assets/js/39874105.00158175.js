"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[9974],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),f=p(n),m=r,d=f["".concat(s,".").concat(m)]||f[m]||u[m]||o;return n?a.createElement(d,i(i({ref:t},c),{},{components:n})):a.createElement(d,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5543:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={},i="Configuring Flows",l={unversionedId:"metaflow/configuring-flows/introduction",id:"metaflow/configuring-flows/introduction",title:"Configuring Flows",description:"This is a new feature in Metaflow 2.13. Make sure you have a recent enough version of",source:"@site/docs/metaflow/configuring-flows/introduction.md",sourceDirName:"metaflow/configuring-flows",slug:"/metaflow/configuring-flows/introduction",permalink:"/metaflow/configuring-flows/introduction",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/metaflow/configuring-flows/introduction.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Advanced, Shareable Cards with Card Templates",permalink:"/metaflow/visualizing-results/advanced-shareable-cards-with-card-templates"},next:{title:"Basic Configuration",permalink:"/metaflow/configuring-flows/basic-configuration"}},s={},p=[{value:"Introducing <code>Config</code>",id:"introducing-config",level:3},{value:"Which construct should I use?",id:"which-construct-should-i-use",level:3}],c={toc:p};function u(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"configuring-flows"},"Configuring Flows"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"This is a new feature in Metaflow 2.13. Make sure you have a recent enough version of\nMetaflow to use this feature. For more background, read\n",(0,r.kt)("a",{parentName:"p",href:"https://netflixtechblog.medium.com/d2fb8e9ba1c6"},"an announcement blog post about configs here"),".")),(0,r.kt)("p",null,"At this point, you have learned how you can ",(0,r.kt)("a",{parentName:"p",href:"/metaflow/basics#artifacts"},"pass data through a flow with\nartifacts")," and how you can ",(0,r.kt)("a",{parentName:"p",href:"/metaflow/basics#how-to-define-parameters-for-flows"},"parametrize a run\nwith ",(0,r.kt)("inlineCode",{parentName:"a"},"Parameters")),". These are\nthe main constructs that allow you to control the behavior of\n",(0,r.kt)("a",{parentName:"p",href:"/metaflow/client#object-hierarchy"},"a run")," while it executes."),(0,r.kt)("p",null,"What if you want to configure the behavior of the flow itself before it\nhas started executing? For instance, you may want to"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Configure its ",(0,r.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/requesting-resources"},(0,r.kt)("inlineCode",{parentName:"a"},"@resource")," requirements"),"\nseparately for development and production.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Adjust ",(0,r.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/introduction"},"the ",(0,r.kt)("inlineCode",{parentName:"a"},"@schedule"))," or\n",(0,r.kt)("a",{parentName:"p",href:"/production/event-triggering"},"event-",(0,r.kt)("inlineCode",{parentName:"a"},"@trigger"),"'ing behavior")," through a deployment config.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Provide ",(0,r.kt)("a",{parentName:"p",href:"/metaflow/configuring-flows/config-driven-experimentation"},"a configurable template flow"),"\nthat can perform different actions without altering the code - just change a config file."))),(0,r.kt)("h3",{id:"introducing-config"},"Introducing ",(0,r.kt)("inlineCode",{parentName:"h3"},"Config")),(0,r.kt)("p",null,"For use cases that require modifying the flow's behavior \u2014 particularly its decorators \u2014 Metaflow provides\nan object called ",(0,r.kt)("inlineCode",{parentName:"p"},"Config"),". It complements artifacts and ",(0,r.kt)("inlineCode",{parentName:"p"},"Parameters")," by allowing\nyou to configure nearly everything about a flow before it starts executing:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(2982).Z,width:"1110",height:"478"})),(0,r.kt)("p",null,"The objects differ in their scope, in particular, when they are evaluated and persisted:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"An artifact")," is persisted at the end of ",(0,r.kt)("em",{parentName:"p"},"a task"),". A step can yield one or more tasks.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"A parameter")," is persisted at the start of ",(0,r.kt)("em",{parentName:"p"},"a run"),". A common use case is to use CLI options, UIs,\nor triggers to pass values to a run right before executing. Parameters can only be used within your step code.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"A config")," is persisted when the flow is ",(0,r.kt)("em",{parentName:"p"},"deployed"),". When using ",(0,r.kt)("a",{parentName:"p",href:"/production/introduction"},"a production scheduler such as\nArgo Workflows"),", deployment happens when you call ",(0,r.kt)("inlineCode",{parentName:"p"},"create"),". In the case of a\nlocal run, \u201cdeployment\u201d happens just prior to the execution of the run. Think of \u201cdeployment\u201d here as\ngathering all that is needed to run the flow."))),(0,r.kt)("p",null,"Unlike parameters, configs can be used more widely in your flow code, particularly, they can be used in step or flow level decorators as well as to set defaults for ",(0,r.kt)("inlineCode",{parentName:"p"},"Parameters"),"."),(0,r.kt)("h3",{id:"which-construct-should-i-use"},"Which construct should I use?"),(0,r.kt)("p",null,"Here's an easy decision tree for choosing between artifacts, parameters, and configs:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Do you want to alter the behavior of ",(0,r.kt)("a",{parentName:"p",href:"/production/introduction"},"a production deployment"),"\nthrough a config file, disabling run-level changes \u27f6 use ",(0,r.kt)("inlineCode",{parentName:"p"},"Config"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Do you need to configure the behavior of Metaflow decorators \u27f6 use ",(0,r.kt)("inlineCode",{parentName:"p"},"Config"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Do you need to pass information to a run on the CLI, on an orchestrator UI,\nor ",(0,r.kt)("a",{parentName:"p",href:"/production/event-triggering/external-events#passing-parameters-in-events"},"through an event\npayload"),"\n\u27f6 use ",(0,r.kt)("inlineCode",{parentName:"p"},"Parameter"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"For all other cases, use artifacts."))),(0,r.kt)("p",null,"Many advanced flows end up using all the three constructs - they are fully composable. Also,\nevery ",(0,r.kt)("inlineCode",{parentName:"p"},"Config")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Parameter")," becomes a read-only artifact, allowing you\nto access both ",(0,r.kt)("a",{parentName:"p",href:"/metaflow/client#accessing-data"},"the results and configuration of a run")," consistently.\nThis ensures full visibility into how a run was configured and what occurred during its execution."),(0,r.kt)("p",null,"As with most features in Metaflow, ",(0,r.kt)("inlineCode",{parentName:"p"},"Config"),"s are simple and seamlessly handle basic cases. They also\nenable a surprising range of advanced use cases, as demonstrated in the following sections. Next,\nlearn more about"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"basic-configuration"},"Common configuration patterns"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"parsing-configs"},"Supports various formats of configuration files"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"custom-parsers"},"Parsing and generating configs on the fly"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"config-driven-experimentation"},"Advanced, config-driven experimentation"),"."))))}u.isMDXComponent=!0},2982:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/config-scope-485e0e5850689337c3c41b17f44f5e31.png"}}]);