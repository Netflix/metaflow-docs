"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[8156],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),l=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=l(e.components);return o.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(n),h=a,k=u["".concat(s,".").concat(h)]||u[h]||d[h]||i;return n?o.createElement(k,r(r({ref:t},p),{},{components:n})):o.createElement(k,r({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,r[1]=c;for(var l=2;l<i;l++)r[l]=n[l];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5161:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var o=n(7462),a=(n(7294),n(3905));const i={},r="Checkpointing Progress",c={unversionedId:"scaling/checkpoint/introduction",id:"scaling/checkpoint/introduction",title:"Checkpointing Progress",description:"Metaflow artifacts are used to persist models, dataframes, and other Python objects upon task completion. They",source:"@site/docs/scaling/checkpoint/introduction.md",sourceDirName:"scaling/checkpoint",slug:"/scaling/checkpoint/introduction",permalink:"/scaling/checkpoint/introduction",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/scaling/checkpoint/introduction.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Dealing with Failures",permalink:"/scaling/failures"},next:{title:"Checkpoints in ML/AI libraries",permalink:"/scaling/checkpoint/checkpoint-ml-libraries"}},s={},l=[{value:"Installing <code>@checkpoint</code>",id:"installing-checkpoint",level:2},{value:"Using <code>@checkpoint</code>",id:"using-checkpoint",level:2},{value:"Observing <code>@checkpoint</code> through cards",id:"observing-checkpoint-through-cards",level:2}],p={toc:l};function d(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,o.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"checkpointing-progress"},"Checkpointing Progress"),(0,a.kt)("p",null,"Metaflow artifacts are used to persist models, dataframes, and other Python objects upon task completion. They\ncheckpoint the flow's state at step boundaries, enabling you to inspect results of a task with\n",(0,a.kt)("a",{parentName:"p",href:"/metaflow/client"},"the Client API")," and ",(0,a.kt)("a",{parentName:"p",href:"/metaflow/debugging#how-to-use-the-resume-command"},(0,a.kt)("inlineCode",{parentName:"a"},"resume")," execution from any\nstep"),"."),(0,a.kt)("p",null,"In some cases, a task may require a long time to execute. For example, training a model on an expensive GPU instance\n(or across a cluster) may take several hours or even days. In such situations, persisting the final model only upon\ntask completion is not sufficient. Instead, it is advisable to checkpoint progress periodically while the task is\nexecuting, so you won\u2019t lose hours of work in the event of a failure."),(0,a.kt)("p",null,"You can use a Metaflow extension, ",(0,a.kt)("inlineCode",{parentName:"p"},"metaflow-checkpoint"),", to create and use in-task checkpoints easily: Just add\n",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," and call ",(0,a.kt)("inlineCode",{parentName:"p"},"current.checkpoint.save")," to checkpoint progress periodically. A major benefit of ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint"),"\nis that it keeps checkpoints organized automatically alongside Metaflow tasks, so you don\u2019t have to deal with saving,\nloading, organizing, and keeping track of checkpoint files manually."),(0,a.kt)("p",null,"Notably, ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," integrates seamlessly with popular AI and ML frameworks such as XGBoost, PyTorch, and others, as\ndescribed below. For more background, read ",(0,a.kt)("a",{parentName:"p",href:"https://outerbounds.com/blog/indestructible-training-with-checkpoint"},"the announcement blog post for\n",(0,a.kt)("inlineCode",{parentName:"a"},"@checkpoint")),"."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," decorator is not a built-in part of core Metaflow yet, so you have to install it separately as\ndescribed below. Also its APIs may change in the future, in contrast to the APIs of core Metaflow which are\nguaranteed to stay backwards compatible. Please share your feedback on\n",(0,a.kt)("a",{parentName:"p",href:"http://slack.outerbounds.co"},"Metaflow Slack"),"!")),(0,a.kt)("h2",{id:"installing-checkpoint"},"Installing ",(0,a.kt)("inlineCode",{parentName:"h2"},"@checkpoint")),(0,a.kt)("p",null,"To use the ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," extension, install it with"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"pip install metaflow-checkpoint\n")),(0,a.kt)("p",null,"in the environments where\nyou develop and deploy Metaflow code. Metaflow packages extensions for remote execution automatically, so you don\u2019t\nneed to include it in container images used to run tasks remotely."),(0,a.kt)("h2",{id:"using-checkpoint"},"Using ",(0,a.kt)("inlineCode",{parentName:"h2"},"@checkpoint")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," decorator operates by persisting files in a local directory to the Metaflow datastore. This makes it\ndirectly compatible with many popular ML and AI frameworks that support persisting checkpoints on disk natively."),(0,a.kt)("p",null,"Let\u2019s demonstrate the functionality with this simple flow that tries to increment a counter in a loop that fails 20% of\nthe time. Thanks to ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"@retry"),", the ",(0,a.kt)("inlineCode",{parentName:"p"},"flaky_count")," step recovers from exceptions and continues counting\nfrom the latest checkpoint, succeeding eventually:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'import os\nimport random\nfrom metaflow import FlowSpec, current, step, retry, checkpoint\n\nclass CheckpointCounterFlow(FlowSpec):\n    @step\n    def start(self):\n        self.counter = 0\n        self.next(self.flaky_count)\n\n    @checkpoint\n    @retry\n    @step\n    def flaky_count(self):\n        cp_path = os.path.join(current.checkpoint.directory, "counter")\n\n        def _save_counter():\n            print(f"Checkpointing counter value {self.counter}")\n            with open(cp_path, "w") as f:\n                f.write(str(self.counter))\n            self.latest_checkpoint = current.checkpoint.save()\n\n        def _load_counter():\n            if current.checkpoint.is_loaded:\n                with open(cp_path) as f:\n                    self.counter = int(f.read())\n                print(f"Checkpoint loaded!")\n\n        _load_counter()\n        print("Counter is now", self.counter)\n\n        while self.counter < 10:\n            self.counter += 1\n            if self.counter % 2 == 0:\n                _save_counter()\n\n            if random.random() < 0.2:\n                raise Exception("Bad luck! Try again!")\n\n        self.next(self.end)\n\n    @step\n    def end(self):\n        print("Final counter", self.counter)\n\nif __name__ == "__main__":\n    CheckpointCounterFlow()\n')),(0,a.kt)("p",null,"After installing the ",(0,a.kt)("inlineCode",{parentName:"p"},"metaflow-checkpoint")," extension, you can run the flow as usual:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"python checkpoint_counter.py run\n")),(0,a.kt)("p",null,"The flow demonstrates typical usage of ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," initializes a temporary directory, ",(0,a.kt)("inlineCode",{parentName:"p"},"current.checkpoint.directory"),", which you can use as a staging area for data to be checkpointed.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"By default, ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," loads the latest task-specific checkpoint in the directory automatically. If a checkpoint is found, ",(0,a.kt)("inlineCode",{parentName:"p"},"current.checkpoint.is_loaded")," is set to ",(0,a.kt)("inlineCode",{parentName:"p"},"True"),", so you can initialize processing with previously stored data, like loading the latest value of ",(0,a.kt)("inlineCode",{parentName:"p"},"counter")," in this case.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Periodically during processing, you can save any data required to resume processing in the staging directory and call ",(0,a.kt)("inlineCode",{parentName:"p"},"current.checkpoint.save()")," to persist it in the datastore.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"We save a reference to the latest checkpoint in an artifact, ",(0,a.kt)("inlineCode",{parentName:"p"},"latest_checkpoint"),", which allows us to find and load particular checkpoints later, as explained later in this document."))),(0,a.kt)("p",null,"Behind the scenes, besides loading and storing data efficiently, ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," takes care of scoping the checkpoint data to specific tasks. You can use ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," in many parallel tasks, even in a foreach, knowing that ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," will automatically load checkpoints specific to each branch. It also makes it possible to use checkpoints across runs, as described in ",(0,a.kt)("a",{parentName:"p",href:"/scaling/checkpoint/selecting-checkpoints"},"Deciding what checkpoint to use"),"."),(0,a.kt)("h2",{id:"observing-checkpoint-through-cards"},"Observing ",(0,a.kt)("inlineCode",{parentName:"h2"},"@checkpoint")," through cards"),(0,a.kt)("p",null,"Try running the above flow with ",(0,a.kt)("a",{parentName:"p",href:"/metaflow/visualizing-results/effortless-task-inspection-with-default-cards"},"the default Metaflow\n",(0,a.kt)("inlineCode",{parentName:"a"},"@card")),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"python checkpoint_counter.py run --with card\n")),(0,a.kt)("p",null,"If a step decorated with ",(0,a.kt)("inlineCode",{parentName:"p"},"@checkpoint")," has a card enabled, it will add information about checkpoints loaded and stored in the card. For instance, the screenshot below shows a card associated with the second attempt (",(0,a.kt)("inlineCode",{parentName:"p"},"[Attempt: 1]")," at the top of the card) which loaded a checkpoint produced by the first attempt and stored four checkpoints at 2 second intervals:"),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(1251).Z,width:"1074",height:"927"})))}d.isMDXComponent=!0},1251:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/checkpoint_card-676f8d1b2ac0401e63536b4d0d7e33c8.png"}}]);