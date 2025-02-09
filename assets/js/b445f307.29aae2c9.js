"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[5897],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),h=i,m=d["".concat(l,".").concat(h)]||d[h]||u[h]||r;return n?a.createElement(m,o(o({ref:t},c),{},{components:n})):a.createElement(m,o({ref:t},c))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1995:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const r={},o="Dealing with Failures",s={unversionedId:"scaling/failures",id:"scaling/failures",title:"Dealing with Failures",description:"Failures are a natural, expected part of data science workflows. Here are some typical",source:"@site/docs/scaling/failures.md",sourceDirName:"scaling",slug:"/scaling/failures",permalink:"/scaling/failures",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/scaling/failures.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Dependencies FAQ",permalink:"/scaling/dependencies/faq"},next:{title:"Checkpointing Progress",permalink:"/scaling/checkpoint/introduction"}},l={},p=[{value:"Retrying Tasks with the <code>retry</code> Decorator",id:"retrying-tasks-with-the-retry-decorator",level:2},{value:"How to Prevent Retries",id:"how-to-prevent-retries",level:3},{value:"Maximizing Safety",id:"maximizing-safety",level:3},{value:"Results of Retries",id:"results-of-retries",level:3},{value:"Catching Exceptions with the <code>catch</code> Decorator",id:"catching-exceptions-with-the-catch-decorator",level:2},{value:"Exceptions Raised by Your Code",id:"exceptions-raised-by-your-code",level:3},{value:"Platform Exceptions",id:"platform-exceptions",level:3},{value:"Timing out with the <code>timeout</code> Decorator",id:"timing-out-with-the-timeout-decorator",level:2},{value:"Summary",id:"summary",level:2}],c={toc:p};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"dealing-with-failures"},"Dealing with Failures"),(0,i.kt)("p",null,"Failures are a natural, expected part of data science workflows. Here are some typical\nreasons why you can expect your workflow to fail:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("strong",{parentName:"li"},"Misbehaving code:")," no code is perfect. Your code may fail to handle edge cases or\nlibraries behave differently than what you expected."),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("strong",{parentName:"li"},"Unanticipated issues with data:")," data is harder than science. Data is how Metaflow\nworkflows interact with the chaotic, high entropy, outside world. It is practically\nimpossible to anticipate all possible ways the input data can be broken."),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("strong",{parentName:"li"},"Platform issues:")," the best infrastructure is invisible. Unfortunately, every now\nand then platforms that Metaflow relies on, or Metaflow itself, make their existence\npainfully obvious by failing in creative ways.")),(0,i.kt)("p",null,"Metaflow provides straightforward tools for you to handle all these scenarios. If you\nare in a hurry, see ",(0,i.kt)("a",{parentName:"p",href:"/scaling/failures#summary"},"a quick summary of the tools"),"."),(0,i.kt)("h2",{id:"retrying-tasks-with-the-retry-decorator"},"Retrying Tasks with the ",(0,i.kt)("inlineCode",{parentName:"h2"},"retry")," Decorator"),(0,i.kt)("p",null,"Retrying a failed task is the simplest way to try to handle errors. It is a particularly\neffective strategy with platform issues which are typically transient in nature."),(0,i.kt)("p",null,"You can enable retries for a step simply by adding ",(0,i.kt)("inlineCode",{parentName:"p"},"retry")," decorator in the step, like\nhere:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'from metaflow import FlowSpec, step, retry\n\nclass RetryFlow(FlowSpec):\n\n    @retry\n    @step\n    def start(self):\n        import time\n        if int(time.time()) % 2 == 0:\n            raise Exception("Bad luck!")\n        else:\n            print("Lucky you!")\n        self.next(self.end)\n\n    @step\n    def end(self):\n        print("Phew!")\n\nif __name__ == \'__main__\':\n    RetryFlow()\n')),(0,i.kt)("p",null,"When you run this flow you will see that sometimes it succeeds without a hitch, but\nsometimes the ",(0,i.kt)("inlineCode",{parentName:"p"},"start")," step raises an exception and needs to be retried. By default,\n",(0,i.kt)("inlineCode",{parentName:"p"},"retry")," retries the step three times. Thanks to ",(0,i.kt)("inlineCode",{parentName:"p"},"retry"),", this workflow will almost\nalways succeed."),(0,i.kt)("p",null,"It is recommended that you use ",(0,i.kt)("inlineCode",{parentName:"p"},"retry")," every time you ",(0,i.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/requesting-resources"},"run tasks\nremotely"),". Instead of annotating every step with a\nretry decorator, you can also automatically add a retry decorator to all steps that do\nnot have one as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"python RetryFlow.py run --with retry\n")),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"@retry")," decorator restarts a task after a failure. If you want to avoid losing progress\nmade within a task, take a look at ",(0,i.kt)("a",{parentName:"p",href:"/scaling/checkpoint/introduction"},"the ",(0,i.kt)("inlineCode",{parentName:"a"},"@checkpoint")," decorator"),"\nthat allows you to save and load progress easily.")),(0,i.kt)("h3",{id:"how-to-prevent-retries"},"How to Prevent Retries"),(0,i.kt)("p",null,"If retries are such a good idea, why not enable them by default for all steps? First,\nretries only help with transient errors, like sporadic platform issues. If the input\ndata or your code is broken, retrying will not help anything. Secondly, not all steps\ncan be retried safely."),(0,i.kt)("p",null,"Imagine a hypothetical step like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"@step\ndef withdraw_money_from_account(self):\n    requests.post('bank.com/account/123/withdraw', data={'amount': 1000})\n")),(0,i.kt)("p",null,"If you run this code with:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"python MoneyFlow.py run --with retry\n")),(0,i.kt)("p",null,"you may end up withdrawing up to $4000 instead of the intended $1000. To make sure no\none will accidentally retry a step with ",(0,i.kt)("em",{parentName:"p"},"destructive side effects")," like this, you should\nadd ",(0,i.kt)("inlineCode",{parentName:"p"},"times=0")," in the code:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"@retry(times=0)\n@step\ndef withdraw_money_from_account(self):\n    requests.post('bank.com/account/123/withdraw', data={'amount': 1000})\n")),(0,i.kt)("p",null,"Now the code can be safely rerun, even using ",(0,i.kt)("inlineCode",{parentName:"p"},"--with retry"),". All other steps will be\nretried as usual."),(0,i.kt)("p",null,"Most data science workflows do not have to worry about this. As long as your step only\nreads and writes Metaflow artifacts and/or performs only read-only operations with\nexternal systems ","(","e.g. performs only ",(0,i.kt)("inlineCode",{parentName:"p"},"SELECT")," queries, no ",(0,i.kt)("inlineCode",{parentName:"p"},"INSERT"),"s etc.",")",", your step\nis ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning"},"idempotent")," and\ncan be retried without concern."),(0,i.kt)("h3",{id:"maximizing-safety"},"Maximizing Safety"),(0,i.kt)("p",null,"By default, ",(0,i.kt)("inlineCode",{parentName:"p"},"retry")," will retry the step for three times before giving up. It waits for 2\nminutes between retries for ",(0,i.kt)("a",{parentName:"p",href:"/scaling/remote-tasks/requesting-resources"},"remote tasks"),". This\nmeans that if your code fails fast, any transient platform issues need to get resolved\nin less than 10 minutes or the whole run will fail. 10 minutes is typically more than\nenough, but sometimes you want both a belt and suspenders."),(0,i.kt)("p",null,"If you have a sensitive production workflow which should not fail easily, there are four\nthings you can do:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"You can increase the number of retries to ",(0,i.kt)("inlineCode",{parentName:"li"},"times=4"),", which is the maximum number of\nretries currently."),(0,i.kt)("li",{parentName:"ol"},"You can make the time between retries arbitrarily long, e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"times=4,\nminutes_between_retries=20.")," This will give the task over an hour to succeed."),(0,i.kt)("li",{parentName:"ol"},"You can use ",(0,i.kt)("inlineCode",{parentName:"li"},"catch"),", described below, as a way to continue even after all retries\nhave failed."),(0,i.kt)("li",{parentName:"ol"},"You can use ",(0,i.kt)("inlineCode",{parentName:"li"},"timeout"),", also described below, to make sure your code will not get\nstuck.")),(0,i.kt)("p",null,"You can use any combination of these four techniques, or all of them together, to build\nrock-solid workflows."),(0,i.kt)("h3",{id:"results-of-retries"},"Results of Retries"),(0,i.kt)("p",null,"If the same code is executed multiple times by ",(0,i.kt)("inlineCode",{parentName:"p"},"retry"),", are there going to be duplicate\nartifacts? No, Metaflow manages retries so that only artifacts from the last retry are\nvisible. If you use ",(0,i.kt)("a",{parentName:"p",href:"/metaflow/client"},"the Client API "),"to inspect results, you don't\nhave to do anything special to deal with retries that may have happened. Each task will\nhave only one set of results. Correspondingly, the logs returned by ",(0,i.kt)("inlineCode",{parentName:"p"},"task")," show the\noutput of the last attempt only."),(0,i.kt)("p",null,"If you want to know if a task was retried, you can retrieve retry timestamps from ",(0,i.kt)("inlineCode",{parentName:"p"},"Task"),"\nmetadata:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import Run, namespace\n\nnamespace(None)\ntask = Run('RetryFlow/10')['start'].task\nattempts = [m for m in task.metadata if m.type == 'attempt']\n")),(0,i.kt)("h2",{id:"catching-exceptions-with-the-catch-decorator"},"Catching Exceptions with the ",(0,i.kt)("inlineCode",{parentName:"h2"},"catch")," Decorator"),(0,i.kt)("p",null,"As mentioned above, ",(0,i.kt)("inlineCode",{parentName:"p"},"retry")," is an appropriate tool for dealing with transient issues.\nWhat about issues that are not transient? Metaflow has another decorator, ",(0,i.kt)("inlineCode",{parentName:"p"},"catch")," that\ncatches any exceptions that occur during the step and then continues execution of\nsubsequent steps."),(0,i.kt)("p",null,"The main upside of ",(0,i.kt)("inlineCode",{parentName:"p"},"catch")," is that it can make your workflows extremely robust: it will\nhandle all error scenarios from faulty code and faulty data to platform issues. The main\ndownside is that your code needs to be modified so that it can tolerate faulty steps."),(0,i.kt)("p",null,"Let's consider issues caused by your code versus everything surrounding it separately."),(0,i.kt)("h3",{id:"exceptions-raised-by-your-code"},"Exceptions Raised by Your Code"),(0,i.kt)("p",null,"By default, Metaflow stops execution of the flow when a step fails. It can't know what\nto do with failed steps automatically."),(0,i.kt)("p",null,"You may know that some steps are error-prone. For instance, this can happen with a step\ninside a foreach loop that iterates over unknown data, such as the results of a query or\na parameter matrix. In this case, it may be desirable to let some tasks fail without\ncrashing the whole flow."),(0,i.kt)("p",null,"Consider this example that is structured like a hyperparameter search:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, catch, step\n\nclass CatchFlow(FlowSpec):\n\n    @step\n    def start(self):\n        self.params = range(3)\n        self.next(self.compute, foreach='params')\n\n    @catch(var='compute_failed')\n    @step\n    def compute(self):\n        self.div = self.input\n        self.x = 5 / self.div\n        self.next(self.join)\n\n    @step\n    def join(self, inputs):\n        for input in inputs:\n            if input.compute_failed:\n                print('compute failed for parameter: %d' % input.div)\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n\nif __name__ == '__main__':\n    CatchFlow()\n")),(0,i.kt)("p",null,"As you can guess, the above flow raises an error. Normally, this would crash the whole\nflow. However, in this example the ",(0,i.kt)("inlineCode",{parentName:"p"},"catch")," decorator catches the exception and stores it\nin an instance variable called ",(0,i.kt)("inlineCode",{parentName:"p"},"compute_failed"),", and lets the execution continue. The\nnext step, ",(0,i.kt)("inlineCode",{parentName:"p"},"join"),", contains logic to handle the exception."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"var")," argument is optional. The exception is not stored unless you specify it. You\ncan also specify ",(0,i.kt)("inlineCode",{parentName:"p"},"print_exception=False")," to prevent the ",(0,i.kt)("inlineCode",{parentName:"p"},"catch")," decorator from printing\nout the caught exception on stdout."),(0,i.kt)("h3",{id:"platform-exceptions"},"Platform Exceptions"),(0,i.kt)("p",null,"You could have dealt with the above error by wrapping the whole step in a ",(0,i.kt)("inlineCode",{parentName:"p"},"try ...\nexcept")," block. In effect, this is how ",(0,i.kt)("inlineCode",{parentName:"p"},"catch")," deals with errors raised in the user code."),(0,i.kt)("p",null,"In contrast, platform issues happen outside of your code, so you can't handle them with\na ",(0,i.kt)("inlineCode",{parentName:"p"},"try ... except")," block."),(0,i.kt)("p",null,"Let's simulate a platform issue like these with the following flow that kills itself\nwithout giving Python a chance to recover:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, step, retry, catch\n\nclass SuicidalFlow(FlowSpec):\n\n    @catch(var='start_failed')\n    @retry\n    @step\n    def start(self):\n        import os, signal\n        # kill this process with the KILL signal\n        os.kill(os.getpid(), signal.SIGKILL)\n        self.next(self.end)\n\n    @step\n    def end(self):\n        if self.start_failed is not None:\n            print(\"It seems 'start' did not survive.\")\n\nif __name__ == '__main__':\n    SuicidalFlow()\n")),(0,i.kt)("p",null,"Note that we use both ",(0,i.kt)("inlineCode",{parentName:"p"},"retry")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"catch")," above. ",(0,i.kt)("inlineCode",{parentName:"p"},"retry")," attempts to run the step three\ntimes, hoping that the issue is transient. The hope is futile. The task kills itself\nevery time."),(0,i.kt)("p",null,"After all retries are exhausted, ",(0,i.kt)("inlineCode",{parentName:"p"},"catch")," takes over and records an exception in\n",(0,i.kt)("inlineCode",{parentName:"p"},"start_failed"),", notifying that all attempts to run ",(0,i.kt)("inlineCode",{parentName:"p"},"start")," failed. Now it is up to the\nsubsequent steps, ",(0,i.kt)("inlineCode",{parentName:"p"},"end")," in this case, to deal with the scenario that ",(0,i.kt)("inlineCode",{parentName:"p"},"start")," produced no\nresults whatsoever. They can choose an alternative code path using the variable assigned\nby ",(0,i.kt)("inlineCode",{parentName:"p"},"catch"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"start_failed")," in this example."),(0,i.kt)("h2",{id:"timing-out-with-the-timeout-decorator"},"Timing out with the ",(0,i.kt)("inlineCode",{parentName:"h2"},"timeout")," Decorator"),(0,i.kt)("p",null,"By default, there is no timeout for steps. If you cause an infinite loop accidentally or\nquery an external service that hangs, the step will block the flow forever. This is\nundesirable especially in production runs that should not require human intervention."),(0,i.kt)("p",null,"Metaflow provides a ",(0,i.kt)("inlineCode",{parentName:"p"},"timeout")," decorator to address this issue:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, timeout, step\nimport time\n\nclass TimeoutFlow(FlowSpec):\n\n    @timeout(seconds=5)\n    @step\n    def start(self):\n        for i in range(100):\n            print(i)\n            time.sleep(1)\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n\nif __name__ == '__main__':\n    TimeoutFlow()\n")),(0,i.kt)("p",null,"Here, the ",(0,i.kt)("inlineCode",{parentName:"p"},"start")," step times out after five seconds. Besides ",(0,i.kt)("inlineCode",{parentName:"p"},"seconds"),", you can specify\n",(0,i.kt)("inlineCode",{parentName:"p"},"minutes")," and/or ",(0,i.kt)("inlineCode",{parentName:"p"},"hours")," as the timeout value. Note that all values specified are\ncumulative so specifying 10 seconds and 5 minutes will result in a timeout of 5 minutes\nand 10 seconds."),(0,i.kt)("p",null,"The above example raises an exception if the step does not finish in the given time\nperiod. This is a good pattern if the timeout is a genuine error condition."),(0,i.kt)("p",null,"In some cases you can handle a timeout in subsequent steps. Similar to ",(0,i.kt)("inlineCode",{parentName:"p"},"SuicidalFlow"),"\nabove, you can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"catch")," decorator to catch the timeout exception:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, timeout, step, catch\nimport time\n\nclass CatchTimeoutFlow(FlowSpec):\n\n    @catch(print_exception=False, var='timeout')\n    @timeout(seconds=5)\n    @step\n    def start(self):\n        for i in range(100):\n            print(i)\n            time.sleep(1)\n        self.next(self.end)\n\n    @step\n    def end(self):\n        if self.timeout:\n            print('the previous step timed out')\n        else:\n            print('all ok!')\n\nif __name__ == '__main__':\n    CatchTimeoutFlow()\n")),(0,i.kt)("p",null,"This example handles a timeout in ",(0,i.kt)("inlineCode",{parentName:"p"},"start")," gracefully without showing any exceptions."),(0,i.kt)("h2",{id:"summary"},"Summary"),(0,i.kt)("p",null,"Here is a quick summary of failure handling in Metaflow:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Use ",(0,i.kt)("inlineCode",{parentName:"li"},"retry")," to deal with transient platform issues. You can do this easily on the\ncommand line with the ",(0,i.kt)("inlineCode",{parentName:"li"},"--with retry")," option."),(0,i.kt)("li",{parentName:"ul"},"Use ",(0,i.kt)("inlineCode",{parentName:"li"},"retry")," ",(0,i.kt)("strong",{parentName:"li"},"with")," ",(0,i.kt)("inlineCode",{parentName:"li"},"catch")," for extra robustness if you have modified your code to\ndeal with faulty steps which are handled by ",(0,i.kt)("inlineCode",{parentName:"li"},"catch"),"."),(0,i.kt)("li",{parentName:"ul"},"Use ",(0,i.kt)("inlineCode",{parentName:"li"},"catch")," ",(0,i.kt)("strong",{parentName:"li"},"without")," ",(0,i.kt)("inlineCode",{parentName:"li"},"retry")," to handle steps ",(0,i.kt)("a",{parentName:"li",href:"/scaling/failures#how-to-prevent-retries"},"that can't be retried\nsafely"),". It is a good idea to use ",(0,i.kt)("inlineCode",{parentName:"li"},"times=0")," for\n",(0,i.kt)("inlineCode",{parentName:"li"},"retry")," in this case."),(0,i.kt)("li",{parentName:"ul"},"Use ",(0,i.kt)("inlineCode",{parentName:"li"},"timeout")," with any of the above if your code can get stuck.")))}u.isMDXComponent=!0}}]);