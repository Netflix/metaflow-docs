"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[5318],{2339:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>u,contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=t(7462),o=(t(7294),t(3905)),r=t(2004);const i={},s="Managing Flows Programmatically",l={unversionedId:"metaflow/managing-flows/runner",id:"metaflow/managing-flows/runner",title:"Managing Flows Programmatically",description:"The Runner API allows you to start and manage Metaflow runs and other operations programmatically,",source:"@site/docs/metaflow/managing-flows/runner.md",sourceDirName:"metaflow/managing-flows",slug:"/metaflow/managing-flows/runner",permalink:"/metaflow/managing-flows/runner",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/metaflow/managing-flows/runner.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Running in a Notebook",permalink:"/metaflow/managing-flows/notebook-runs"},next:{title:"Debugging Flows",permalink:"/metaflow/debugging"}},u={},p=[{value:"Blocking runs",id:"blocking-runs",level:2},{value:"Passing parameters",id:"passing-parameters",level:3},{value:"Setting options",id:"setting-options",level:2},{value:"Non-blocking API",id:"non-blocking-api",level:2},{value:"Streaming logs",id:"streaming-logs",level:3},{value:"Managing concurrent runs",id:"managing-concurrent-runs",level:3},{value:"Programmatic <code>resume</code>",id:"programmatic-resume",level:2}],m={toc:p};function c(n){let{components:e,...t}=n;return(0,o.kt)("wrapper",(0,a.Z)({},m,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"managing-flows-programmatically"},"Managing Flows Programmatically"),(0,o.kt)("p",null,"The Runner API allows you to start and manage Metaflow runs and other operations programmatically,\nfor instance, to run flows in a script. "),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Runner")," class exposes a blocking API, which waits for operations\nto complete, as well as a non-blocking (asynchronous) APIs, prefixed with ",(0,o.kt)("inlineCode",{parentName:"p"},"async")," which execute\noperations in the background. This document provides an overview of common patterns. For\ndetailed API documentation, see  ",(0,o.kt)("a",{parentName:"p",href:"/api/runner"},"the Runner API reference"),"."),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Runner")," API orchestrates flows locally, equivalent to local runs started\non the command line. To trigger runs in production, orchestrated by a production\nscheduler, take a look at ",(0,o.kt)("a",{parentName:"p",href:"/production/event-triggering"},"event triggering"),".")),(0,o.kt)("hr",null),(0,o.kt)("p",null,"To execute the examples below, save this flow in ",(0,o.kt)("inlineCode",{parentName:"p"},"slowflow.py"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import time\nfrom metaflow import FlowSpec, Parameter, step\n\nclass SlowFlow(FlowSpec):\n\n    secs = Parameter('seconds', default=3)\n\n    @step\n    def start(self):\n        for i in range(self.secs):\n            print(f\"{i} seconds passed\")\n            time.sleep(1)\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n    \nif __name__ == '__main__':\n    SlowFlow()\n")),(0,o.kt)("h2",{id:"blocking-runs"},"Blocking runs"),(0,o.kt)("p",null,"Here's a simple example that runs the above flow and waits for it to complete:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import Runner\nwith Runner('slowflow.py').run() as running:\n    print(f'{running.run} finished')\n")),(0,o.kt)("p",null,"You can access the results of the run through ",(0,o.kt)("a",{parentName:"p",href:"/metaflow/client"},"the Client API"),", accessible through\n",(0,o.kt)("a",{parentName:"p",href:"/api/client#run"},"the ",(0,o.kt)("inlineCode",{parentName:"a"},"Run")," object")," that you can find in the ",(0,o.kt)("inlineCode",{parentName:"p"},"ExecutingRun.run")," attribute."),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"Runner")," is best used as a context manager so it can clean up any temporary files created during\nexecution automatically. Otherwise you should call ",(0,o.kt)("inlineCode",{parentName:"p"},"runner.cleanup()")," once\nyou are done with the object to make sure no temporary files are left behind.")),(0,o.kt)("p",null,"All methods that start a run return ",(0,o.kt)("a",{parentName:"p",href:"/api/runner#executingrun"},"an ",(0,o.kt)("inlineCode",{parentName:"a"},"ExecutingRun")," object"),"\nwhich contains ",(0,o.kt)("a",{parentName:"p",href:"/api/client#run"},"the ",(0,o.kt)("inlineCode",{parentName:"a"},"Run")," started")," as well as metadata about the corresponding\nsubprocess such as its ",(0,o.kt)("inlineCode",{parentName:"p"},"status"),", and output in ",(0,o.kt)("inlineCode",{parentName:"p"},"stdout")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"stderr"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import Runner\n\nSECONDS = 5\n\nwith Runner('slowflow.py', show_output=False).run(seconds=SECONDS) as running:\n    if running.status == 'failed':\n        print(f'\u274c {running.run} failed:')\n    elif running.status == 'successful':\n        print(f'\u2705 {running.run} succeeded:')\n    print(f'-- stdout --\\n{running.stdout}')\n    print(f'-- stderr --\\n{running.stderr}')\n\n    print(f'\u23f0 The flow waited for {running.run.data.secs} seconds')\n")),(0,o.kt)("p",null,"Note that we set ",(0,o.kt)("inlineCode",{parentName:"p"},"show_output=False")," to hide the output of the run while it executes."),(0,o.kt)("h3",{id:"passing-parameters"},"Passing parameters"),(0,o.kt)("p",null,"You can pass parameters to the run through the keyword arguments in ",(0,o.kt)("inlineCode",{parentName:"p"},"run"),", such as ",(0,o.kt)("inlineCode",{parentName:"p"},"seconds")," above.\nNote that the parameter values are type-checked automatically, ensuring that the types match with\nthe actual types expected by each ",(0,o.kt)("inlineCode",{parentName:"p"},"Parameter"),"."),(0,o.kt)("h2",{id:"setting-options"},"Setting options"),(0,o.kt)("p",null,"You can set top-level options directly in the ",(0,o.kt)("inlineCode",{parentName:"p"},"Runner")," constructor. The names map to the corresponding\ncommand-line options with flags like ",(0,o.kt)("inlineCode",{parentName:"p"},"--no-pylint")," mapping to a corresponding boolean, ",(0,o.kt)("inlineCode",{parentName:"p"},"pylint=False"),". As\na special case, the option ",(0,o.kt)("inlineCode",{parentName:"p"},"--with")," maps to ",(0,o.kt)("inlineCode",{parentName:"p"},"decospecs"),", as ",(0,o.kt)("inlineCode",{parentName:"p"},"with")," is a reserved keyword in Python."),(0,o.kt)("p",null,"For instance, you can ",(0,o.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/requesting-resources"},"run a flow remotely in the cloud")," as follows"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import Runner\nwith Runner('slowflow.py', pylint=False, decospecs=['kubernetes', 'retry']).run() as running:\n    print(f'{running.run} completed on Kubernetes!')\n")),(0,o.kt)("p",null,"which is equivalent to running"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"python slowflow.py --no-pylint --with kubernetes --with retry run\n")),(0,o.kt)("p",null,"on the command line. Also, you can pass options to the ",(0,o.kt)("inlineCode",{parentName:"p"},"run")," command, such as ",(0,o.kt)("inlineCode",{parentName:"p"},"max_workers")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"tags"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import Runner\nwith Runner('slowflow.py').run(max_workers=1, tags=['myrun', 'another_tag']) as running:\n    print(f'{running.run} has tags {running.run.user_tags}')\n")),(0,o.kt)("h2",{id:"non-blocking-api"},"Non-blocking API"),(0,o.kt)("p",null,"The non-blocking Runner API leverages ",(0,o.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/asyncio.html"},"Python's asynchronous APIs")," to\nmanage operations running in the background. This allows you to inspect and interact with runs and other operations\nwhile they are executing, and handle many concurrent operations."),(0,o.kt)("p",null,"The API is nearly equivalent to the blocking API, except you must ",(0,o.kt)("inlineCode",{parentName:"p"},"await")," all asynchronous operations. For instance,\nyou can run a flow, check its status once a second, and access its outputs as follows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import asyncio\nfrom metaflow import Runner\n\nasync def main():\n    with await Runner('slowflow.py').async_run() as running:\n        while running.status == 'running':\n            print(f\"Run status is {running.status}\")\n            await asyncio.sleep(1)\n        print(f'{running.run} finished')\n\nasyncio.run(main())\n")),(0,o.kt)("p",null,"You can accomplish the above also using the ",(0,o.kt)("inlineCode",{parentName:"p"},"wait()")," method which waits for a run to complete:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import asyncio\nfrom metaflow import Runner\n\nasync def main():\n    with await Runner('slowflow.py').async_run() as running:\n        await running.wait()\n        print(f'{running.run} finished')\n\nasyncio.run(main())\n")),(0,o.kt)("h3",{id:"streaming-logs"},"Streaming logs"),(0,o.kt)("p",null,"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"stream_log")," asynchronous iterator to stream logs in real-time. This snippet prints\nlogs from ",(0,o.kt)("inlineCode",{parentName:"p"},"stdout")," line by line until the run completes:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import asyncio\nfrom metaflow import Runner\n\nasync def main():\n    with await Runner('slowflow.py').async_run() as running:\n        async for _, line in running.stream_log('stdout'):\n            print(f'OUT: {line}')\n        print(f'{running.run} finished')\n\nasyncio.run(main())\n")),(0,o.kt)("p",null,"If you want to perform other operations while ingesting logs periodically, you can pull lines\nfrom the iterator without a ",(0,o.kt)("inlineCode",{parentName:"p"},"for")," loop. This snippet outputs one line at a time from ",(0,o.kt)("inlineCode",{parentName:"p"},"stdout"),"\nuntil the run finishes, and then flushes any remaining logs to the output leveraging the\n",(0,o.kt)("inlineCode",{parentName:"p"},"position")," argument of ",(0,o.kt)("inlineCode",{parentName:"p"},"stream_log")," which allows streaming to continue from a known location:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import asyncio\nfrom metaflow import Runner\n\nasync def main():\n    with await Runner('slowflow.py', quiet=True).async_run(seconds=7) as running:\n        stdout = aiter(running.stream_log('stdout'))\n        while running.status == 'running':\n            out_pos, out_line = await anext(stdout)\n            print(f'STILL RUNNING: {out_line}')\n            await asyncio.sleep(1)\n        # output remaining lines, if any\n        async for _, out_line in running.stream_log('stdout', position=out_pos):\n            print(out_line)\n        print(f'{running.run} finished')\n\nasyncio.run(main())\n")),(0,o.kt)("h3",{id:"managing-concurrent-runs"},"Managing concurrent runs"),(0,o.kt)("p",null,"A key benefit of the asynchronous API is that it allows multiple operations to run at the same time.\nFor example, you can execute many runs in parallel, each with its own set of parameters."),(0,o.kt)("p",null,"This snippet demonstrates the pattern: It starts five concurrent runs, each with a different value of\nthe ",(0,o.kt)("inlineCode",{parentName:"p"},"seconds")," parameter, and shows the values one by one as the runs complete."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import asyncio\nfrom metaflow import Runner\n\nasync def main():\n    # start five concurrent runs\n    runs = [await Runner('slowflow.py').async_run(seconds=i, tags=['manyruns']) for i in range(5)]\n    while runs:\n        print(f'{len(runs)} runs are still running')\n        still_running = []\n        for running in runs:\n            if running.status == 'running':\n                still_running.append(running)\n            else:\n                print(f'{running.run} ran for {running.run.data.secs} seconds')\n        runs = still_running\n        await asyncio.sleep(1)\n\nasyncio.run(main())\n")),(0,o.kt)("p",null,"You can observe the five runs executing in parallel in the Metaflow UI:"),(0,o.kt)(r.Z,{playing:!0,controls:!0,muted:!0,playsinline:!0,loop:!0,url:"/assets/async_runs.mp4",width:"100%",height:"100%",mdxType:"ReactPlayer"}),(0,o.kt)("h2",{id:"programmatic-resume"},"Programmatic ",(0,o.kt)("inlineCode",{parentName:"h2"},"resume")),(0,o.kt)("p",null,"Besides managing runs, ",(0,o.kt)("a",{parentName:"p",href:"/metaflow/debugging#how-to-use-the-resume-command"},"you can ",(0,o.kt)("inlineCode",{parentName:"a"},"resume")," past executions"),",\neither in a blocking or non-blocking manner."),(0,o.kt)("p",null,"This snippet finds the oldest run of ",(0,o.kt)("inlineCode",{parentName:"p"},"SlowFlow")," and resumes it using a blocking call:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import Runner, Flow\nold_id = list(Flow('SlowFlow'))[-1].id\nprint(f'Resuming the first run of SlowFlow, {old_id}')\nwith Runner('slowflow.py').resume(origin_run_id=old_id) as running:\n    print(f\"Resumed run {running.run} completed\")\n")),(0,o.kt)("p",null,"This snippet does the same using the asynchronous API:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import asyncio\nfrom metaflow import Runner, Flow\n\nasync def main():\n    old_id = list(Flow('SlowFlow'))[-1].id\n    print(f'Resuming the first run of SlowFlow, {old_id}')\n    with await Runner('slowflow.py').async_resume(origin_run_id=old_id) as running:\n        await running.wait()\n        print(f\"Resumed run {running.run} completed\")\n\nasyncio.run(main())\n")))}c.isMDXComponent=!0}}]);