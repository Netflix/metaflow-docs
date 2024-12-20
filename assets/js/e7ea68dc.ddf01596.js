"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[6943],{7343:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=n(7462),i=(n(7294),n(3905)),o=n(2004);const r={},l="Triggering Flows Based on External Events",s={unversionedId:"production/event-triggering/external-events",id:"production/event-triggering/external-events",title:"Triggering Flows Based on External Events",description:"You can configure flows",source:"@site/docs/production/event-triggering/external-events.md",sourceDirName:"production/event-triggering",slug:"/production/event-triggering/external-events",permalink:"/production/event-triggering/external-events",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/production/event-triggering/external-events.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Connecting Flows via Events",permalink:"/production/event-triggering/"},next:{title:"Triggering Flows Based on Other Flows",permalink:"/production/event-triggering/flow-events"}},d={},p=[{value:"Defining events",id:"defining-events",level:3},{value:"Depending on multiple events",id:"depending-on-multiple-events",level:3},{value:"Creating events",id:"creating-events",level:2},{value:"Advanced case: Publishing events inside a flow",id:"advanced-case-publishing-events-inside-a-flow",level:3},{value:"Passing parameters in events",id:"passing-parameters-in-events",level:2},{value:"Mapping parameter names",id:"mapping-parameter-names",level:3}],m={toc:p};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"triggering-flows-based-on-external-events"},"Triggering Flows Based on External Events"),(0,i.kt)("p",null,"You can configure flows\n",(0,i.kt)("a",{parentName:"p",href:"/production/scheduling-metaflow-flows/scheduling-with-argo-workflows"},"deployed on Argo Workflows"),"\nto start automatically when an event occurs in an external system. For instance, you\ncould start a flow whenever new data is available in a data warehouse:"),(0,i.kt)(o.Z,{playsinline:!0,playing:!0,controls:!0,muted:!0,loop:!0,url:"/assets/et-basic-event.mp4",width:"100%",height:"100%",mdxType:"ReactPlayer"}),(0,i.kt)("p",null,"All you have to do is to add ",(0,i.kt)("a",{parentName:"p",href:"/api/flow-decorators/trigger"},"a decorator, ",(0,i.kt)("inlineCode",{parentName:"a"},"@trigger")),", with\na desired event name above the flow:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow import FlowSpec, step, trigger\n\n@trigger(event='data_updated')\nclass FreshDataFlow(FlowSpec):\n\n    @step\n    def start(self):\n        # load data from the data warehouse\n        print('processing fresh data!')\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n\nif __name__ == '__main__':\n    FreshDataFlow()\n")),(0,i.kt)("p",null,"You can develop and test the flow locally as usual: ",(0,i.kt)("inlineCode",{parentName:"p"},"@trigger")," doesn't have any\neffect on local runs. To test triggering, deploy the flow to Argo Workflows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"python freshdata.py argo-workflows create\n")),(0,i.kt)("p",null,"The output should state something along the lines of"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"What will trigger execution of the workflow:\n    This workflow triggers automatically when the upstream\n    data_updated event is/are published.\n")),(0,i.kt)("p",null,"indicating that the deployment has been linked to the desired event. "),(0,i.kt)("h3",{id:"defining-events"},"Defining events"),(0,i.kt)("p",null,"In the above example, we used ",(0,i.kt)("inlineCode",{parentName:"p"},"data_updated")," as the name of the event that triggers the flow. You\ncan choose the name freely. By using different names, you can make flows react to different events."),(0,i.kt)("p",null,"If you are familiar with streaming systems like Kafka or queues like AWS SQS, you can think of the\nevent name as ",(0,i.kt)("em",{parentName:"p"},"a topic")," in these systems."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"You can also define an event name through a configuration file,\ne.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"@trigger(event=config.upstream_event)")," instead of\nspecifying the name in the decorator directly.\nTake a look at ",(0,i.kt)("a",{parentName:"p",href:"/metaflow/configuring-flows/introduction"},"Configuring Flows"),"\nfor more information.")),(0,i.kt)("h3",{id:"depending-on-multiple-events"},"Depending on multiple events"),(0,i.kt)("p",null,"You can require that multiple events must be present before the flow gets\ntriggered. Simply define a list of events:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"@trigger(events=['data_updated', 'phase_of_the_moon'])\n")),(0,i.kt)("p",null,"all the events need to occur within a configured time window for the flow to trigger."),(0,i.kt)("h2",{id:"creating-events"},"Creating events"),(0,i.kt)("p",null,"In order to trigger the flow deployed with ",(0,i.kt)("inlineCode",{parentName:"p"},"@trigger"),", we need an event.\nMetaflow comes with a utility class, ",(0,i.kt)("a",{parentName:"p",href:"/api/argoevent"},(0,i.kt)("inlineCode",{parentName:"a"},"ArgoEvent")),", which\nmakes it easy to create suitable events from any environment. You can call\nit as a part of your ETL pipeline running outside Metaflow, in a microservice,\nor in a notebook - wherever and whenever you want to trigger a Metaflow execution."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'from metaflow.integrations import ArgoEvent\n\nArgoEvent(name="data_updated").publish()\n')),(0,i.kt)("p",null,"This line will create an event that will trigger ",(0,i.kt)("strong",{parentName:"p"},"all flows")," deployed on Argo Workflows that are\nwaiting for the event ",(0,i.kt)("inlineCode",{parentName:"p"},"data_updated"),"."),(0,i.kt)("p",null,"Note that ",(0,i.kt)("inlineCode",{parentName:"p"},"publish()")," only publishes an event and returns immediately. It does not guarantee that\na run will start -- it's possible that no flow is waiting for the particular event. Correspondingly,\nif you call ",(0,i.kt)("inlineCode",{parentName:"p"},"ArgoEvent")," many times, you can trigger arbitrarily many runs of connected flows."),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Before calling ",(0,i.kt)("inlineCode",{parentName:"p"},"ArgoEvent")," make sure that you have a valid Metaflow\nconfiguration and a connection to the Kubernetes cluster set up in the\nenvironment where you call ",(0,i.kt)("inlineCode",{parentName:"p"},".publish()"),". If you call it from systems outside\nMetaflow, make sure that these prerequisites are met.")),(0,i.kt)("h3",{id:"advanced-case-publishing-events-inside-a-flow"},"Advanced case: Publishing events inside a flow"),(0,i.kt)("p",null,"It is not common to publish events inside a Metaflow flow, since\n",(0,i.kt)("a",{parentName:"p",href:"/production/event-triggering/flow-events"},"the ",(0,i.kt)("inlineCode",{parentName:"a"},"@trigger_on_finish")," decorator"),"\ntakes care of flow-to-flow\ntriggering conveniently. Should you have a more advanced use case that requires\npublishing events inside a flow, it is recommended that you use ",(0,i.kt)("a",{parentName:"p",href:"/api/argoevent#ArgoEvent.safe_publish"},"the\n",(0,i.kt)("inlineCode",{parentName:"a"},"ArgoEvent.safe_publish")," method"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'from metaflow.integrations import ArgoEvent\n\nArgoEvent(name="data_updated").safe_publish()\n')),(0,i.kt)("p",null,"The only difference to ",(0,i.kt)("inlineCode",{parentName:"p"},"publish()")," is that events won't be created during local\nruns. This means that you can include ",(0,i.kt)("inlineCode",{parentName:"p"},"safe_publish()")," in your code safely and\ndevelop and test it locally as usual, knowing that you won't be causing\nunintended side-effects in surrounding systems that may depend on the event."),(0,i.kt)("h2",{id:"passing-parameters-in-events"},"Passing parameters in events"),(0,i.kt)("p",null,"Besides simply starting runs through events, you can change their behavior on\nthe fly by letting the event\n",(0,i.kt)("a",{parentName:"p",href:"/metaflow/basics#how-to-define-parameters-for-flows"},"define ",(0,i.kt)("inlineCode",{parentName:"a"},"Parameters")," of the flow"),"."),(0,i.kt)("p",null,"Consider this typical machine learning system that implements a continuously refreshing model:"),(0,i.kt)(o.Z,{playsinline:!0,playing:!0,controls:!0,muted:!0,loop:!0,url:"/assets/et-model.mp4",width:"100%",height:"100%",mdxType:"ReactPlayer"}),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"An event is created whenever new data is available in the data warehouse."),(0,i.kt)("li",{parentName:"ol"},"The event contains information about the latest data available in the warehouse."),(0,i.kt)("li",{parentName:"ol"},"Using the information, a model is refreshed with a training set containing the\nlast N days of data.")),(0,i.kt)("p",null,"The corresponding flow could look like this, ignoring details of data loading and the actual\ntraining:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'from metaflow import FlowSpec, step, trigger, Parameter\nfrom datetime import datetime, timedelta\n\n@trigger(event="data_updated")\nclass ModelRefreshFlow(FlowSpec):\n    latest = Parameter("latest", default="2023-05-01")\n    window = Parameter("window", default=3)\n\n    def load_data(self):\n        # replace this with an actual data loader\n        SQL = f"select * from data where time > to_date(\'{self.start_date}\')"\n        print("loading data since %s" % self.start_date)\n        return [1, 2, 3]\n\n    def train_model(self, df):\n        # replace this with actual model training\n        return df\n\n    @step\n    def start(self):\n        self.latest_date = datetime.fromisoformat(self.latest)\n        self.start_date = self.latest_date - timedelta(days=self.window)\n        self.next(self.train)\n\n    @step\n    def train(self):\n        df = self.load_data()\n        self.model = self.train_model(df)\n        self.next(self.end)\n\n    @step\n    def end(self):\n        pass\n\nif __name__ == "__main__":\n    ModelRefreshFlow()\n')),(0,i.kt)("p",null,"To pass in parameters, we can simply define them in the ",(0,i.kt)("inlineCode",{parentName:"p"},"payload")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"ArgoEvent"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"from metaflow.integrations import ArgoEvent\nfrom datetime import datetime\n\nArgoEvent(name=\"data_updated\").publish(payload={'latest': datetime.now().isoformat()})\n")),(0,i.kt)("h3",{id:"mapping-parameter-names"},"Mapping parameter names"),(0,i.kt)("p",null,"Above, the payload field matches the parameter name ",(0,i.kt)("inlineCode",{parentName:"p"},"latest")," exactly. In certain situations you may want\nto define manually how parameters get their values. For instance, a common event may be used to trigger\nvarious kinds of flows and it may be hard to coordinate parameter names across all consumers of the event."),(0,i.kt)("p",null,"In this situation, you can remap payload fields to parameter names through the ",(0,i.kt)("inlineCode",{parentName:"p"},"parameters")," argument:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"@trigger(event={'name':'some_event', 'parameters': {'window': 'how_many_days'}})\n")),(0,i.kt)("p",null,"Here, we define that ",(0,i.kt)("inlineCode",{parentName:"p"},"Parameter('window')")," gets its value from the event payload field ",(0,i.kt)("inlineCode",{parentName:"p"},"how_many_days"),".\nNote that you need to remap all ",(0,i.kt)("inlineCode",{parentName:"p"},"parameters")," that you want to assign through the event. Default assignments\nare disabled when ",(0,i.kt)("inlineCode",{parentName:"p"},"parameters")," is specified, which allows you to stay in full control of parameter mappings."),(0,i.kt)("p",null,"Parameter mapping comes in handy when multiple events are present:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"@trigger(events=[{'name':'one_event', 'parameters': {'window': 'how_many_days'}},\n                 {'name':'another_event', 'parameters': {'latest': 'timestamp'}}])\n")),(0,i.kt)("p",null,"In this case, ",(0,i.kt)("inlineCode",{parentName:"p"},"window")," gets its value through the event ",(0,i.kt)("inlineCode",{parentName:"p"},"one_event")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"latest")," through ",(0,i.kt)("inlineCode",{parentName:"p"},"another_event"),"."))}u.isMDXComponent=!0}}]);