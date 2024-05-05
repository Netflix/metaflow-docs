"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[8078],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>m});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,s=e.originalType,l=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),u=c(a),m=o,h=u["".concat(l,".").concat(m)]||u[m]||p[m]||s;return a?n.createElement(h,i(i({ref:t},d),{},{components:a})):n.createElement(h,i({ref:t},d))}));function m(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=a.length,i=new Array(s);i[0]=u;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r.mdxType="string"==typeof e?e:o,i[1]=r;for(var c=2;c<s;c++)i[c]=a[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},3316:(e,t,a)=>{a.d(t,{Z:()=>s});var n=a(7294);const o="caption_w1uB",s=e=>{let{children:t}=e;return n.createElement("div",{className:o},t)}},7974:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>r,toc:()=>c});var n=a(7462),o=(a(7294),a(3905));a(3316);const s={pagination_prev:"index"},i="Why Metaflow",r={unversionedId:"introduction/why-metaflow",id:"introduction/why-metaflow",title:"Why Metaflow",description:"1. Modern businesses are eager to utilize data science and ML",source:"@site/docs/introduction/why-metaflow.md",sourceDirName:"introduction",slug:"/introduction/why-metaflow",permalink:"/introduction/why-metaflow",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/introduction/why-metaflow.md",tags:[],version:"current",frontMatter:{pagination_prev:"index"},sidebar:"python",previous:{title:"Welcome to Metaflow",permalink:"/"},next:{title:"What is Metaflow",permalink:"/introduction/what-is-metaflow"}},l={},c=[{value:"1. Modern businesses are eager to utilize data science and ML",id:"1-modern-businesses-are-eager-to-utilize-data-science-and-ml",level:3},{value:"2. What is common in DS/ML applications?",id:"2-what-is-common-in-dsml-applications",level:3},{value:"3. All DS/ML applications use data",id:"3-all-dsml-applications-use-data",level:3},{value:"4. DS/ML applications need to perform computation",id:"4-dsml-applications-need-to-perform-computation",level:3},{value:"5. DS/ML applications consists of multiple interconnected parts",id:"5-dsml-applications-consists-of-multiple-interconnected-parts",level:3},{value:"6. DS/ML applications evolve over time incrementally",id:"6-dsml-applications-evolve-over-time-incrementally",level:3},{value:"7. DS/ML applications produce business value in various ways",id:"7-dsml-applications-produce-business-value-in-various-ways",level:3},{value:"8. DS/ML applications should leverage the best tools available",id:"8-dsml-applications-should-leverage-the-best-tools-available",level:3},{value:"9. Metaflow covers the full stack of DS/ML infrastructure",id:"9-metaflow-covers-the-full-stack-of-dsml-infrastructure",level:3},{value:"10. Metaflow takes care of the plumbing, so you can focus on the fun parts",id:"10-metaflow-takes-care-of-the-plumbing-so-you-can-focus-on-the-fun-parts",level:3},{value:"11. Metaflow relies on systems that engineers know and trust",id:"11-metaflow-relies-on-systems-that-engineers-know-and-trust",level:3},{value:"12. Metaflow is used by hundreds of innovative companies",id:"12-metaflow-is-used-by-hundreds-of-innovative-companies",level:3}],d={toc:c};function p(e){let{components:t,...s}=e;return(0,o.kt)("wrapper",(0,n.Z)({},d,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"why-metaflow"},"Why Metaflow"),(0,o.kt)("h3",{id:"1-modern-businesses-are-eager-to-utilize-data-science-and-ml"},"1. Modern businesses are eager to utilize data science and ML"),(0,o.kt)("p",null,"In the past, data scientists and ML engineers had to rely on a medley of point solutions\nand custom systems to build ML and data science applications."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Many data science opportunities",src:a(128).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"2-what-is-common-in-dsml-applications"},"2. What is common in DS/ML applications?"),(0,o.kt)("p",null,"Applications can be built quicker and more robustly if they stand on a common,\nhuman-friendly foundation. But what should the foundation cover?"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"A solid foundation for all use cases",src:a(612).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"3-all-dsml-applications-use-data"},"3. All DS/ML applications use data"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Data")," may come in different shapes and sizes and may be loaded from various data\nstores. However, no matter what data is used, accessing and processing it shouldn't be\ntoo cumbersome."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Data",src:a(5273).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"4-dsml-applications-need-to-perform-computation"},"4. DS/ML applications need to perform computation"),(0,o.kt)("p",null,"Some applications require a tremendous amount of compute power - think computer vision -\nwhile some do with less. Regardless of the scale, all applications need to perform\n",(0,o.kt)("strong",{parentName:"p"},"computation")," reliably. Thanks to cloud computing, data scientists and ML engineers\nshould be able to utilize elastic compute resources without friction."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Compute",src:a(7695).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"5-dsml-applications-consists-of-multiple-interconnected-parts"},"5. DS/ML applications consists of multiple interconnected parts"),(0,o.kt)("p",null,"Consider an application that loads data, transforms it, trains a bunch of models,\nchooses the best performing one, runs inference, and writes the results to a database.\nMulti-steps workflows like this are a norm in ML. ",(0,o.kt)("strong",{parentName:"p"},"A workflow orchestrator")," is needed\nto make sure all steps get executed in order, on time."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Orchestration",src:a(7179).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"6-dsml-applications-evolve-over-time-incrementally"},"6. DS/ML applications evolve over time incrementally"),(0,o.kt)("p",null,"Rarely a real-world application is built and deployed only once. Instead, a typical\napplication is built gradually, through contributions by many people. The project needs\nto be tracked, organized, and ",(0,o.kt)("strong",{parentName:"p"},"versioned"),", which enables systematic and continuous\nimprovement over time."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Versioning",src:a(4734).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"7-dsml-applications-produce-business-value-in-various-ways"},"7. DS/ML applications produce business value in various ways"),(0,o.kt)("p",null,"To produce real business value, DS/ML applications can't live in a walled garden. They\nmust be integrated with the surrounding systems seamlessly: Some applications enhance\ndata in a database, some power internal dashboards or microservices, whereas some power\nuser-facing products. There are many such ways to ",(0,o.kt)("strong",{parentName:"p"},"deploy")," ML in production. The more\nvaluable the application, the more carefully it needs to be operated and monitored as\nwell."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Deployment",src:a(3827).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"8-dsml-applications-should-leverage-the-best-tools-available"},"8. DS/ML applications should leverage the best tools available"),(0,o.kt)("p",null,"For many data scientists and ML engineers, the most rewarding part of the project is\n",(0,o.kt)("strong",{parentName:"p"},"modeling"),". Using their domain knowledge and expertise, the modeler should be able to\nchoose the best tool for the job amongst off-the-shelf libraries, such as PyTorch,\nXGBoost, Scikit Learn, and many others. Or, if necessary, they should be able to use a\nwholly custom approach."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Modeling",src:a(6562).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"9-metaflow-covers-the-full-stack-of-dsml-infrastructure"},"9. Metaflow covers the full stack of DS/ML infrastructure"),(0,o.kt)("p",null,"Metaflow was originally created at Netflix, motivated by the realization that data\nscientists and ML engineers need help with all these concerns: Any gaps or friction in\nthe stack can slow down the project drastically. Thanks to a common foundation provided\nby Metaflow, data scientists can iterate on ideas quickly and deploy them confidently by\nrelying on a well-defined architecture and best practices, shared by everyone in the\nteam."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Full-stack Metaflow",src:a(2036).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"10-metaflow-takes-care-of-the-plumbing-so-you-can-focus-on-the-fun-parts"},"10. Metaflow takes care of the plumbing, so you can focus on the fun parts"),(0,o.kt)("p",null,"Metaflow provides a robust and user-friendly foundation for a wide spectrum of\ndata-intensive applications, including most data science and ML use cases. Data\nscientists and ML engineers who know the basics of Python can build their own\napplications, models, and policies on top of it, while Metaflow takes care of the\nlow-level infrastructure: data, compute, orchestration, and versioning."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Full stack triangles",src:a(5520).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"11-metaflow-relies-on-systems-that-engineers-know-and-trust"},"11. Metaflow relies on systems that engineers know and trust"),(0,o.kt)("p",null,"Metaflow was designed at Netflix to serve the needs of business-critical ML/DS\napplications. It relies on proven and scalable infrastructure which works for small and\nlarge organizations alike. Metaflow integrates with all the top clouds as well as with\nKubernetes and systems around them in a responsible manner. It respects the security and\nother policies of your company, making engineering teams happy too."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Existing infrastructure",src:a(343).Z,width:"2000",height:"1125"})),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"12-metaflow-is-used-by-hundreds-of-innovative-companies"},"12. Metaflow is used by hundreds of innovative companies"),(0,o.kt)("p",null,"Today, Metaflow powers thousands of ML/DS applications at innovative companies such as\n",(0,o.kt)("a",{parentName:"p",href:"https://netflixtechblog.com/supporting-content-decision-makers-with-machine-learning-995b7b76006f"},"Netflix"),",\n",(0,o.kt)("a",{parentName:"p",href:"https://medium.com/cnn-digital/accelerating-ml-within-cnn-983f6b7bd2eb"},"CNN"),",\n",(0,o.kt)("a",{parentName:"p",href:"https://blogs.sap.com/2022/04/20/train-your-model-in-sap-ai-core-using-the-metaflow-argo-plugin/"},"SAP"),",\n",(0,o.kt)("a",{parentName:"p",href:"https://medium.com/23andme-engineering/machine-learning-eeee69d40736"},"23andMe"),",\n",(0,o.kt)("a",{parentName:"p",href:"https://medium.com/realtor-com-innovation-blog/improving-data-science-processes-to-speed-innovation-at-realtor-com-b6b90fa530dc"},"Realtor.com"),",\n",(0,o.kt)("a",{parentName:"p",href:"https://www.rea-group.com/about-us/news-and-insights/blog/accelerating-experimentation-with-mlops/"},"REA"),",\n",(0,o.kt)("a",{parentName:"p",href:"https://outerbounds.com/blog/dataops-mlops-reasonable-organizations/"},"Coveo"),",\n",(0,o.kt)("a",{parentName:"p",href:"https://aws.amazon.com/blogs/startups/brand-tracking-with-bayesian-statistics-and-aws-batch/"},"Latana"),",\nand hundreds of others across industries. Commercial support for Metaflow is provided by\n",(0,o.kt)("a",{parentName:"p",href:"https://outerbounds.com"},"Outerbounds"),". To hear first-hand experiences from these\ncompanies and many others, ",(0,o.kt)("a",{parentName:"p",href:"http://slack.outerbounds.co"},"join the Metaflow Slack"),"."))}p.isMDXComponent=!0},128:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-01-209ab3523789cdec7f2b4dd140799f8e.png"},612:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-02-92785f52b699d344681a056d5e1ce98d.png"},5273:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-03-408527e97b9d98e959c1ce3f48bc47c8.png"},7695:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-04-5a91ccc31f56ff3433411db972ade1fd.png"},7179:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-05-aacf4e6c043e41a316a595f8a2cde9ed.png"},4734:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-06-cc84bfcb75d1173030da1743d5ced4c8.png"},3827:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-07-944fe5b4a4ad6ba48125174e0f57f3a8.png"},6562:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-08-216cf38e90102a2a20833d30e3198ee8.png"},2036:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-09-816bb3076f49e180a52637762461bdfe.png"},5520:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-10-dc10f94638d191c8c3236bbec1753f2f.png"},343:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/mf-intro-11-81dabbf54ded724de871c64e31b6f198.png"}}]);