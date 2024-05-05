"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[4029],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>u});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},l=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=m(e,["components","mdxType","originalType","parentName"]),l=s(r),u=a,y=l["".concat(p,".").concat(u)]||l[u]||d[u]||o;return r?n.createElement(y,i(i({ref:t},c),{},{components:r})):n.createElement(y,i({ref:t},c))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=l;var m={};for(var p in t)hasOwnProperty.call(t,p)&&(m[p]=t[p]);m.originalType=e,m.mdxType="string"==typeof e?e:a,i[1]=m;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}l.displayName="MDXCreateElement"},6262:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>m,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={},i="Current - Operating a run",m={unversionedId:"api/current",id:"api/current",title:"Current - Operating a run",description:"The current object is used to inspect and manipulate the currently executing run. It is only available during flow execution, i.e. inside a FlowSpec class and functions called from its steps. You can access the object simply by importing it: from metaflow import current.",source:"@site/docs/api/current.md",sourceDirName:"api",slug:"/api/current",permalink:"/api/current",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/api/current.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"FlowSpec - Constructing flows",permalink:"/api/flowspec"},next:{title:"S3 - Accessing data in S3 quickly",permalink:"/api/S3"}},p={},s=[{value:"Common Attributes",id:"common-attributes",level:2},{value:"Decorator-specific attributes",id:"decorator-specific-attributes",level:2},{value:"@project",id:"project",level:3},{value:"@card",id:"card",level:3},{value:"@trigger and @trigger_on_finish",id:"trigger-and-trigger_on_finish",level:3}],c=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.kt)("div",t)},d=c("DocSection"),l=c("Description"),u=c("ParamSection"),y=c("Parameter"),h=c("SigArgSection"),f=c("SigArg"),_={toc:s};function g(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},_,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"current---operating-a-run"},"Current - Operating a run"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"current")," object is used to inspect and manipulate the currently executing run. It is only available during flow execution, i.e. inside a ",(0,a.kt)("inlineCode",{parentName:"p"},"FlowSpec")," class and functions called from its steps. You can access the object simply by importing it: ",(0,a.kt)("inlineCode",{parentName:"p"},"from metaflow import current"),"."),(0,a.kt)("p",null,"The attributes available in ",(0,a.kt)("inlineCode",{parentName:"p"},"current")," depend on the decorators assigned to the flow and the step where ",(0,a.kt)("inlineCode",{parentName:"p"},"current")," is used. Attributes that are always available are listed under ",(0,a.kt)("em",{parentName:"p"},"Common Attributes")," below. Decorator-specific attributes are listed under the decorator name."),(0,a.kt)("h2",{id:"common-attributes"},"Common Attributes"),(0,a.kt)("p",null,"These attributes are always available in the ",(0,a.kt)("inlineCode",{parentName:"p"},"current")," object."),(0,a.kt)(d,{type:"property",name:"current.is_running_flow",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"Returns True if called inside a running Flow, False otherwise.\\n\\nYou can use this property e.g. inside a library to choose the desired\\nbehavior depending on the execution context.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"bool",desc:"True if called inside a run, False otherwise.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.flow_name",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The name of the currently executing flow.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str, optional",desc:"Flow name.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.run_id",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The run ID of the currently executing run.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str, optional",desc:"Run ID.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.step_name",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The name of the currently executing step.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str, optional",desc:"Step name.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.task_id",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The task ID of the currently executing task.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str, optional",desc:"Task ID.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.retry_count",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The index of the task execution attempt.\\n\\nThis property returns 0 for the first attempt to execute the task.\\nIf the @retry decorator is used and the first attempt fails, this\\nproperty returns the number of times the task was attempted prior\\nto the current attempt.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"int",desc:"The retry count.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.origin_run_id",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The run ID of the original run this run was resumed from.\\n\\nThis property returns None for ordinary runs. If the run\\nwas started by the resume command, the property returns\\nthe ID of the original run.\\n\\nYou can use this property to detect if the run is resumed\\nor not.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str, optional",desc:"Run ID of the original run.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.pathspec",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"Pathspec of the current task, i.e. a unique\\nidentifier of the current task. The returned\\nstring follows this format:\\n```\\n{flow_name}/{run_id}/{step_name}/{task_id}\\n```\\n\\nThis is a shorthand to `current.task.pathspec`.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str, optional",desc:"Pathspec.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.namespace",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The current namespace.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str",desc:"Namespace.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.username",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The name of the user who started the run, if available.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str, optional",desc:"User name.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.tempdir",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"Currently configured temporary directory.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str, optional",desc:"Temporary director.",mdxType:"Parameter"}))),(0,a.kt)("h2",{id:"decorator-specific-attributes"},"Decorator-specific attributes"),(0,a.kt)("p",null,"These attributes are only available when the decorator is present."),(0,a.kt)("h3",{id:"project"},"@project"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/production/coordinating-larger-metaflow-projects"},"The @project decorator")," exposes attributes related to the current deployment."),(0,a.kt)(d,{type:"property",name:"current.project_name",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The name of the project assigned to this flow,\\ni.e. `X` in `@project(name=X)`.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str",desc:"Project name.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.project_flow_name",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The flow name prefixed with the current project\\nand branch. This name identifies the deployment\\non a production scheduler.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str",desc:"Flow name prefixed with project information.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.branch_name",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"The current branch, i.e. `X` in\\n`--branch=X` set during deployment.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"str",desc:"Branch name.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.is_user_branch",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"True if the flow is deployed without a\\nspecific `--branch` or a `--production` flag.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"bool",desc:"True if the deployment does not correspond to a specific branch.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"property",name:"current.is_production",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"True if the flow is deployed with the `--production`\\nflag.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"bool",desc:"True if the flow is deployed in `--production`.",mdxType:"Parameter"}))),(0,a.kt)("h3",{id:"card"},"@card"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/metaflow/visualizing-results"},"The @card decorator")," exposes functions in ",(0,a.kt)("inlineCode",{parentName:"p"},"current")," that allow you to customize\nthe contents of cards using ",(0,a.kt)("a",{parentName:"p",href:"/api/cards#Card-components"},"card components"),". For an overview of card-related APIs, see ",(0,a.kt)("a",{parentName:"p",href:"/api/cards"},"the API reference for cards"),"."),(0,a.kt)(d,{type:"method",name:"current.card.__getitem__",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L28",mdxType:"DocSection"},(0,a.kt)(h,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"self",mdxType:"SigArg"})),(0,a.kt)(l,{summary:"Choose a specific card for manipulation.",extended_summary:"When multiple @card decorators are present, you can add an\\n`ID` to distinguish between them, `@card(id=ID)`. This allows you\\nto add components to a specific card like this:\\n```\\ncurrent.card[ID].append(component)\\n```",mdxType:"Description"}),(0,a.kt)(u,{name:"Parameters",mdxType:"ParamSection"},(0,a.kt)(y,{name:"key",type:"str",desc:"Card ID.",mdxType:"Parameter"})),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"CardComponentManager",desc:"An object with `append` and `extend` calls which allow you to\\nadd components to the chosen card.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"method",name:"current.card.__setitem__",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L30",mdxType:"DocSection"},(0,a.kt)(h,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"self",mdxType:"SigArg"})),(0,a.kt)(l,{summary:"Specify components of the chosen card.",extended_summary:"Instead of adding components to a card individually with `current.card[ID].append(component)`,\\nuse this method to assign a list of components to a card, replacing the existing components:\\n```\\ncurrent.card[ID] = [FirstComponent, SecondComponent]\\n```",mdxType:"Description"}),(0,a.kt)(u,{name:"Parameters",mdxType:"ParamSection"},(0,a.kt)(y,{name:"key: str",desc:"Card ID.",mdxType:"Parameter"}),(0,a.kt)(y,{name:"value: List[MetaflowCardComponent]",desc:"List of card components to assign to this card.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"method",name:"current.card.append",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L32",mdxType:"DocSection"},(0,a.kt)(h,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"self",mdxType:"SigArg"})),(0,a.kt)(l,{summary:"Appends a component to the current card.",mdxType:"Description"}),(0,a.kt)(u,{name:"Parameters",mdxType:"ParamSection"},(0,a.kt)(y,{name:"component",type:"MetaflowCardComponent",desc:"Card component to add to this card.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"method",name:"current.card.extend",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L34",mdxType:"DocSection"},(0,a.kt)(h,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"self",mdxType:"SigArg"})),(0,a.kt)(l,{summary:"Appends many components to the current card.",mdxType:"Description"}),(0,a.kt)(u,{name:"Parameters",mdxType:"ParamSection"},(0,a.kt)(y,{name:"component",type:"Iterator[MetaflowCardComponent]",desc:"Card components to add to this card.",mdxType:"Parameter"}))),(0,a.kt)(d,{type:"method",name:"current.card.clear",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L36",mdxType:"DocSection"},(0,a.kt)(h,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"self",mdxType:"SigArg"})),(0,a.kt)(l,{summary:"Clears the list of components in this card.",mdxType:"Description"})),(0,a.kt)(d,{type:"method",name:"current.card.refresh",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/__main__.py#L38",mdxType:"DocSection"},(0,a.kt)(h,{mdxType:"SigArgSection"},(0,a.kt)(f,{name:"self",mdxType:"SigArg"})),(0,a.kt)(l,{summary:"Schedule the contents of this dynamic card to be refreshed soon.",extended_summary:"Call this method after you have modified the list of components or\\nchanged their contents with the components' `update` method. This will\\ncause the card to update live while the task is executing.\\n\\nNote that this method is rate-limited, determined by the\\n`@card(refresh_interval)` attribute. If you call this method more\\nfrequently than what is allowed by `refresh_interval`, some calls\\nare ignored causing the card to update more slowly.\\n\\nIt is advisable not to call this method more often than once\\na second, which is the minimum allowed value for `refresh_interval`.",mdxType:"Description"}),(0,a.kt)(u,{name:"Parameters",mdxType:"ParamSection"},(0,a.kt)(y,{name:"data",type:"dict, optional",desc:"Optional user-defined data to be passed to a custom card.",mdxType:"Parameter"}),(0,a.kt)(y,{name:"force",type:"bool, optional",desc:"Force a full card re-render, not just a data update.",mdxType:"Parameter"}))),(0,a.kt)("h3",{id:"trigger-and-trigger_on_finish"},"@trigger and @trigger_on_finish"),(0,a.kt)("p",null,"You can inspect event(s) that triggered ",(0,a.kt)("a",{parentName:"p",href:"/production/event-triggering"},"an event-triggered")," run through ",(0,a.kt)("inlineCode",{parentName:"p"},"current.trigger")," which returns a ",(0,a.kt)("a",{parentName:"p",href:"/api/client#metaflowtrigger"},(0,a.kt)("inlineCode",{parentName:"a"},"MetaflowTrigger"))," object, if the run was\ntriggered by an event."),(0,a.kt)(d,{type:"property",name:"current.trigger",module:"__main__",show_import:"False",heading_level:"4",mdxType:"DocSection"},(0,a.kt)(l,{summary:"Returns `MetaflowTrigger` if the current run is triggered by an event.\\n",mdxType:"Description"}),(0,a.kt)(u,{name:"Returns",mdxType:"ParamSection"},(0,a.kt)(y,{type:"MetaflowTrigger",desc:"`MetaflowTrigger` if triggered by a run.",mdxType:"Parameter"}))))}g.isMDXComponent=!0}}]);