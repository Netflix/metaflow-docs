"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[2585],{6135:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=t(7462),o=(t(7294),t(3905)),i=t(2004);const r={},l="Running in a Notebook",s={unversionedId:"metaflow/managing-flows/notebook-runs",id:"metaflow/managing-flows/notebook-runs",title:"Running in a Notebook",description:"To execute a flow defined in a cell, just add a NBRunner one-liner",source:"@site/docs/metaflow/managing-flows/notebook-runs.md",sourceDirName:"metaflow/managing-flows",slug:"/metaflow/managing-flows/notebook-runs",permalink:"/metaflow/managing-flows/notebook-runs",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/metaflow/managing-flows/notebook-runs.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Managing Flows in Notebooks and Scripts",permalink:"/metaflow/managing-flows/introduction"},next:{title:"Managing Flows Programmatically",permalink:"/metaflow/managing-flows/runner"}},u={},p=[{value:"Passing Parameters",id:"passing-parameters",level:2},{value:"Running flows remotely",id:"running-flows-remotely",level:2},{value:"Non-blocking runs",id:"non-blocking-runs",level:2},{value:"Changing the working directory",id:"changing-the-working-directory",level:2}],m={toc:p};function c(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"running-in-a-notebook"},"Running in a Notebook"),(0,o.kt)("p",null,"To execute a flow defined in a cell, just add ",(0,o.kt)("a",{parentName:"p",href:"/api/runner#nbrunner"},"a ",(0,o.kt)("inlineCode",{parentName:"a"},"NBRunner")," one-liner"),"\non the last line of the same cell:"),(0,o.kt)(i.Z,{playing:!0,controls:!0,muted:!0,playsinline:!0,loop:!0,url:"/assets/nbrun1.mp4",width:"100%",height:"100%",mdxType:"ReactPlayer"}),(0,o.kt)("p",null,"Once the flow finishes successfully, it will return ",(0,o.kt)("a",{parentName:"p",href:"/api/client#run"},"a ",(0,o.kt)("inlineCode",{parentName:"a"},"Run")," object")," which you can use\nto ",(0,o.kt)("a",{parentName:"p",href:"/metaflow/client"},"inspect the results"),"."),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Notebook execution requires that"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"The whole flow is defined in a single cell, including all ",(0,o.kt)("inlineCode",{parentName:"p"},"import")," statements that the flow requires.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"The ",(0,o.kt)("inlineCode",{parentName:"p"},"NBRunner")," call must be the last line of the cell.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"The cell shouldn't include the ",(0,o.kt)("inlineCode",{parentName:"p"},"if __name__ == '__main__'")," block at the end which is needed\nby command line execution.")))),(0,o.kt)("h2",{id:"passing-parameters"},"Passing Parameters"),(0,o.kt)("p",null,"You can set values for ",(0,o.kt)("a",{parentName:"p",href:"/metaflow/basics#how-to-define-parameters-for-flows"},(0,o.kt)("inlineCode",{parentName:"a"},"Parameters")," of a flow")," by\npassing them as keyword arguments in ",(0,o.kt)("inlineCode",{parentName:"p"},"nbrun"),":"),(0,o.kt)(i.Z,{playing:!0,controls:!0,muted:!0,playsinline:!0,loop:!0,url:"/assets/nbrun-params.mp4",width:"100%",height:"100%",mdxType:"ReactPlayer"}),(0,o.kt)("p",null,"Importantly, the parameter values may be variables defined in other cells, like ",(0,o.kt)("inlineCode",{parentName:"p"},"myalpha")," in the video above."),(0,o.kt)("h2",{id:"running-flows-remotely"},"Running flows remotely"),(0,o.kt)("p",null,"A major benefit of Metaflow is that it gives you easy access to ",(0,o.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/introduction"},"scalable compute\nresources"),". To run a flow in the cloud instead of the notebook instance,\njust ",(0,o.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/requesting-resources"},"request cloud resources"),"."),(0,o.kt)("p",null,"You can pass any command-line options to ",(0,o.kt)("inlineCode",{parentName:"p"},"NBRunner")," as keyword arguments. Note any ",(0,o.kt)("inlineCode",{parentName:"p"},"--with")," options\nare aliased as ",(0,o.kt)("inlineCode",{parentName:"p"},"decospecs"),", as ",(0,o.kt)("inlineCode",{parentName:"p"},"with")," is a reserved keyword in Python. For instance,\n",(0,o.kt)("inlineCode",{parentName:"p"},"NBRunner(MyFlow, decospecs=['kubernetes']")," would be equal to ",(0,o.kt)("inlineCode",{parentName:"p"},"run --with kubernetes"),", running the\nflow remotely in a Kubernetes cluster:"),(0,o.kt)(i.Z,{playing:!0,controls:!0,muted:!0,playsinline:!0,loop:!0,url:"/assets/nbrun-k8s.mp4",width:"100%",height:"100%",mdxType:"ReactPlayer"}),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"With Metaflow, you can use powerful compute resources, like ",(0,o.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/gpu-compute"},"GPUs and other\naccelerators"),", to run a cell and easily get the results\nback in the notebook.")),(0,o.kt)("h2",{id:"non-blocking-runs"},"Non-blocking runs"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"NBRunner(FlowName).nbrun()")," one-liner is convenient for running a flow, waiting for it to complete, and\nreturning its results. However, especially with long-running runs, you may want to start a run in the\nbackground, monitoring its progress and outputs live while the run is executing."),(0,o.kt)("p",null,"You can do this with ",(0,o.kt)("inlineCode",{parentName:"p"},"NBRunner.async_run()")," which leverages ",(0,o.kt)("a",{parentName:"p",href:"/metaflow/managing-flows/runner#non-blocking-api"},"the non-blocking\nRunner API"),":"),(0,o.kt)(i.Z,{playing:!0,controls:!0,muted:!0,playsinline:!0,loop:!0,url:"/assets/nbrun-async.mp4",width:"100%",height:"100%",mdxType:"ReactPlayer"}),(0,o.kt)("p",null,"The key constructs that come in handy with non-blocking runs are:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"await runner.async_run()")," which starts a run and returns ","[an ",(0,o.kt)("inlineCode",{parentName:"p"},"ExecutingRun")," object]",".")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"async for _, line in running.stream_log('stdout')")," allows you to stream logs line by line.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"running.status")," returns the current status of the run.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"await running.wait()")," blocks until the run completes.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"runner.cleanup()")," deletes any any temporary files that were created during execution."))),(0,o.kt)("p",null,"Note that it is possible to instantiate multiple ",(0,o.kt)("inlineCode",{parentName:"p"},"NBRunner")," objects in separate cells and manage many concurrent\nruns with the above API. For more information, see documentation for\n",(0,o.kt)("a",{parentName:"p",href:"/metaflow/managing-flows/runner#non-blocking-api"},"the non-blocking runner API"),"."),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Remember to call ",(0,o.kt)("inlineCode",{parentName:"p"},"runner.cleanup()")," when you are done with a non-blocking run to remove temporary files.")),(0,o.kt)("h2",{id:"changing-the-working-directory"},"Changing the working directory"),(0,o.kt)("p",null,"By default, flows execute in a temporary directory. If you use a local configuration which saves Metaflow artifacts\nin the current working directory, or you access local files using relative paths, you may want to set the working directory to a specific location. Define it with the ",(0,o.kt)("inlineCode",{parentName:"p"},"base_dir")," keyword argument in ",(0,o.kt)("inlineCode",{parentName:"p"},"NBRunner"),":"),(0,o.kt)(i.Z,{playing:!0,controls:!0,muted:!0,playsinline:!0,loop:!0,url:"/assets/nbrun-basedir1.mp4",width:"100%",height:"100%",mdxType:"ReactPlayer"}))}c.isMDXComponent=!0}}]);