"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[1748],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>y});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var m=n.createContext({}),l=function(e){var t=n.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=l(e.components);return n.createElement(m.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,m=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=l(a),y=o,u=c["".concat(m,".").concat(y)]||c[y]||p[y]||r;return a?n.createElement(u,i(i({ref:t},d),{},{components:a})):n.createElement(u,i({ref:t},d))}));function y(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=c;var s={};for(var m in t)hasOwnProperty.call(t,m)&&(s[m]=t[m]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<r;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},8342:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>i,default:()=>k,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var n=a(7462),o=(a(7294),a(3905));const r={},i="S3 - Accessing data in S3 quickly",s={unversionedId:"api/S3",id:"api/S3",title:"S3 - Accessing data in S3 quickly",description:"The S3 client is a wrapper over the standard AWS Python library, boto. It contains enhancements that are relevant for data-intensive applications:",source:"@site/docs/api/S3.md",sourceDirName:"api",slug:"/api/S3",permalink:"/api/S3",draft:!1,editUrl:"https://github.dev/Netflix/metaflow-docs/blob/master/docs/api/S3.md",tags:[],version:"current",frontMatter:{},sidebar:"python",previous:{title:"Deployer - Deploying flows programmatically",permalink:"/api/deployer"},next:{title:"Cards - Visualizing results",permalink:"/api/cards"}},m={},l=[{value:"The <code>S3</code> client",id:"the-s3-client",level:2},{value:"Downloading data",id:"downloading-data",level:2},{value:"Listing objects",id:"listing-objects",level:2},{value:"Uploading data",id:"uploading-data",level:2},{value:"Querying metadata",id:"querying-metadata",level:2},{value:"Handling results with <code>S3Object</code>",id:"handling-results-with-s3object",level:2},{value:"Helper Objects",id:"helper-objects",level:2}],d=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.kt)("div",t)},p=d("DocSection"),c=d("SigArgSection"),y=d("SigArg"),u=d("Description"),h=d("ParamSection"),f=d("Parameter"),g={toc:l};function k(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"s3---accessing-data-in-s3-quickly"},"S3 - Accessing data in S3 quickly"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"S3")," client is a wrapper over the standard AWS Python library, ",(0,o.kt)("inlineCode",{parentName:"p"},"boto"),". It contains enhancements that are relevant for data-intensive applications:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Supports accessing large amounts of data quickly through parallel operations (functions with the ",(0,o.kt)("inlineCode",{parentName:"li"},"_many")," suffix). You can download up to 20Gbps on a large EC2 instance."),(0,o.kt)("li",{parentName:"ul"},"Improved error handling."),(0,o.kt)("li",{parentName:"ul"},"Supports versioned data through ",(0,o.kt)("inlineCode",{parentName:"li"},"S3(run=self)")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"S3(run=Run)"),"."),(0,o.kt)("li",{parentName:"ul"},"User-friendly API with minimal boilerplate."),(0,o.kt)("li",{parentName:"ul"},"Convenient API for advanced featured such as range requests (downloading partial files) and object headers.")),(0,o.kt)("p",null,"For instructions how to use the class, see ",(0,o.kt)("a",{parentName:"p",href:"/scaling/data"},"Loading and Storing Data"),"."),(0,o.kt)("h2",{id:"the-s3-client"},"The ",(0,o.kt)("inlineCode",{parentName:"h2"},"S3")," client"),(0,o.kt)(p,{type:"class",name:"S3",module:"metaflow",show_import:"True",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L452",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"tmproot='.', bucket=None, prefix=None, run=None, s3root=None",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"The Metaflow S3 client.",extended_summary:"This object manages the connection to S3 and a temporary diretory that is used\\nto download objects. Note that in most cases when the data fits in memory, no local\\ndisk IO is needed as operations are cached by the operating system, which makes\\noperations fast as long as there is enough memory available.\\n\\nThe easiest way is to use this object as a context manager:\\n```\\nwith S3() as s3:\\n    data = [obj.blob for obj in s3.get_many(urls)]\\nprint(data)\\n```\\nThe context manager takes care of creating and deleting a temporary directory\\nautomatically. Without a context manager, you must call `.close()` to delete\\nthe directory explicitly:\\n```\\ns3 = S3()\\ndata = [obj.blob for obj in s3.get_many(urls)]\\ns3.close()\\n```\\nYou can customize the location of the temporary directory with `tmproot`. It\\ndefaults to the current working directory.\\n\\nTo make it easier to deal with object locations, the client can be initialized\\nwith an S3 path prefix. There are three ways to handle locations:\\n\\n1. Use a `metaflow.Run` object or `self`, e.g. `S3(run=self)` which\\n   initializes the prefix with the global `DATATOOLS_S3ROOT` path, combined\\n   with the current run ID. This mode makes it easy to version data based\\n   on the run ID consistently. You can use the `bucket` and `prefix` to\\n   override parts of `DATATOOLS_S3ROOT`.\\n\\n2. Specify an S3 prefix explicitly with `s3root`,\\n   e.g. `S3(s3root='s3://mybucket/some/path')`.\\n\\n3. Specify nothing, i.e. `S3()`, in which case all operations require\\n   a full S3 url prefixed with `s3://`.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"tmproot",type:"str, default: '.'",desc:"Where to store the temporary directory.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"bucket",type:"str, optional",desc:"Override the bucket from `DATATOOLS_S3ROOT` when `run` is specified.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"prefix",type:"str, optional",desc:"Override the path from `DATATOOLS_S3ROOT` when `run` is specified.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"run",type:"FlowSpec or Run, optional",desc:"Derive path prefix from the current or a past run ID, e.g. S3(run=self).",mdxType:"Parameter"}),(0,o.kt)(f,{name:"s3root",type:"str, optional",desc:"If `run` is not specified, use this as the S3 prefix.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"method",name:"S3.close",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L582",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Delete all temporary files downloaded in this context.",mdxType:"Description"})),(0,o.kt)("h2",{id:"downloading-data"},"Downloading data"),(0,o.kt)(p,{type:"method",name:"S3.get",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L859",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"key",type:"Union",default:"None",mdxType:"SigArg"}),(0,o.kt)(y,{name:"return_missing",type:"bool",default:"False",mdxType:"SigArg"}),(0,o.kt)(y,{name:"return_info",type:"bool",default:"True",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Get a single object from S3.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"key",type:"Union[str, S3GetObject], optional, default None",desc:"Object to download. It can be an S3 url, a path suffix, or\\nan S3GetObject that defines a range of data to download. If None, or\\nnot provided, gets the S3 root.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"return_missing",type:"bool, default False",desc:"If set to True, do not raise an exception for a missing key but\\nreturn it as an `S3Object` with `.exists == False`.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"return_info",type:"bool, default True",desc:"If set to True, fetch the content-type and user metadata associated\\nwith the object at no extra cost, included for symmetry with `get_many`",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"S3Object",desc:"An S3Object corresponding to the object requested.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"method",name:"S3.get_many",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L964",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"keys",type:"Iterable",mdxType:"SigArg"}),(0,o.kt)(y,{name:"return_missing",type:"bool",default:"False",mdxType:"SigArg"}),(0,o.kt)(y,{name:"return_info",type:"bool",default:"True",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Get many objects from S3 in parallel.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"keys",type:"Iterable[Union[str, S3GetObject]]",desc:"Objects to download. Each object can be an S3 url, a path suffix, or\\nan S3GetObject that defines a range of data to download.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"return_missing",type:"bool, default False",desc:"If set to True, do not raise an exception for a missing key but\\nreturn it as an `S3Object` with `.exists == False`.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"return_info",type:"bool, default True",desc:"If set to True, fetch the content-type and user metadata associated\\nwith the object at no extra cost, included for symmetry with `get_many`.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"List[S3Object]",desc:"S3Objects corresponding to the objects requested.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"method",name:"S3.get_recursive",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L1039",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"keys",type:"Iterable",mdxType:"SigArg"}),(0,o.kt)(y,{name:"return_info",type:"bool",default:"False",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Get many objects from S3 recursively in parallel.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"keys",type:"Iterable[str]",desc:"Prefixes to download recursively. Each prefix can be an S3 url or a path suffix\\nwhich define the root prefix under which all objects are downloaded.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"return_info",type:"bool, default False",desc:"If set to True, fetch the content-type and user metadata associated\\nwith the object.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"List[S3Object]",desc:"S3Objects stored under the given prefixes.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"method",name:"S3.get_all",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L1095",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"return_info",type:"bool",default:"False",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Get all objects under the prefix set in the `S3` constructor.",extended_summary:"This method requires that the `S3` object is initialized either with `run` or\\n`s3root`.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"return_info",type:"bool, default False",desc:"If set to True, fetch the content-type and user metadata associated\\nwith the object.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"Iterable[S3Object]",desc:"S3Objects stored under the main prefix.",mdxType:"Parameter"}))),(0,o.kt)("h2",{id:"listing-objects"},"Listing objects"),(0,o.kt)(p,{type:"method",name:"S3.list_paths",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L647",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"keys",type:"Optional",default:"None",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"List the next level of paths in S3.",extended_summary:"If multiple keys are specified, listings are done in parallel. The returned\\nS3Objects have `.exists == False` if the path refers to a prefix, not an\\nexisting S3 object.\\n\\nFor instance, if the directory hierarchy is\\n```\\na/0.txt\\na/b/1.txt\\na/c/2.txt\\na/d/e/3.txt\\nf/4.txt\\n```\\nThe `list_paths(['a', 'f'])` call returns\\n```\\na/0.txt (exists == True)\\na/b/ (exists == False)\\na/c/ (exists == False)\\na/d/ (exists == False)\\nf/4.txt (exists == True)\\n```",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"keys",type:"Iterable[str], optional, default None",desc:"List of paths.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"List[S3Object]",desc:"S3Objects under the given paths, including prefixes (directories) that\\ndo not correspond to leaf objects.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"method",name:"S3.list_recursive",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L697",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"keys",type:"Optional",default:"None",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"List all objects recursively under the given prefixes.",extended_summary:"If multiple keys are specified, listings are done in parallel. All objects\\nreturned have `.exists == True` as this call always returns leaf objects.\\n\\nFor instance, if the directory hierarchy is\\n```\\na/0.txt\\na/b/1.txt\\na/c/2.txt\\na/d/e/3.txt\\nf/4.txt\\n```\\nThe `list_paths(['a', 'f'])` call returns\\n```\\na/0.txt (exists == True)\\na/b/1.txt (exists == True)\\na/c/2.txt (exists == True)\\na/d/e/3.txt (exists == True)\\nf/4.txt (exists == True)\\n```",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"keys",type:"Iterable[str], optional, default None",desc:"List of paths.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"List[S3Object]",desc:"S3Objects under the given paths.",mdxType:"Parameter"}))),(0,o.kt)("h2",{id:"uploading-data"},"Uploading data"),(0,o.kt)(p,{type:"method",name:"S3.put",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L1121",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"key",type:"Union",mdxType:"SigArg"}),(0,o.kt)(y,{name:"obj",type:"Union",mdxType:"SigArg"}),(0,o.kt)(y,{name:"overwrite",type:"bool",default:"True",mdxType:"SigArg"}),(0,o.kt)(y,{name:"content_type",type:"Optional",default:"None",mdxType:"SigArg"}),(0,o.kt)(y,{name:"metadata",type:"Optional",default:"None",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Upload a single object to S3.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"key",type:"Union[str, S3PutObject]",desc:"Object path. It can be an S3 url or a path suffix.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"obj",type:"PutValue",desc:"An object to store in S3. Strings are converted to UTF-8 encoding.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"overwrite",type:"bool, default True",desc:"Overwrite the object if it exists. If set to False, the operation\\nsucceeds without uploading anything if the key already exists.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"content_type",type:"str, optional, default None",desc:"Optional MIME type for the object.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"metadata",type:"Dict[str, str], optional, default None",desc:"A JSON-encodable dictionary of additional headers to be stored\\nas metadata with the object.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"str",desc:"URL of the object stored.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"method",name:"S3.put_many",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L1216",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"key_objs",type:"List",mdxType:"SigArg"}),(0,o.kt)(y,{name:"overwrite",type:"bool",default:"True",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Upload many objects to S3.",extended_summary:"Each object to be uploaded can be specified in two ways:\\n\\n1. As a `(key, obj)` tuple where `key` is a string specifying\\n   the path and `obj` is a string or a bytes object.\\n\\n2. As a `S3PutObject` which contains additional metadata to be\\n   stored with the object.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"key_objs",type:"List[Union[Tuple[str, PutValue], S3PutObject]]",desc:"List of key-object pairs to upload.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"overwrite",type:"bool, default True",desc:"Overwrite the object if it exists. If set to False, the operation\\nsucceeds without uploading anything if the key already exists.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"List[Tuple[str, str]]",desc:"List of `(key, url)` pairs corresponding to the objects uploaded.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"method",name:"S3.put_files",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L1290",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"key_paths",type:"List",mdxType:"SigArg"}),(0,o.kt)(y,{name:"overwrite",type:"bool",default:"True",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Upload many local files to S3.",extended_summary:"Each file to be uploaded can be specified in two ways:\\n\\n1. As a `(key, path)` tuple where `key` is a string specifying\\n   the S3 path and `path` is the path to a local file.\\n\\n2. As a `S3PutObject` which contains additional metadata to be\\n   stored with the file.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"key_paths",type:"List[Union[Tuple[str, PutValue], S3PutObject]]",desc:"List of files to upload.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"overwrite",type:"bool, default True",desc:"Overwrite the object if it exists. If set to False, the operation\\nsucceeds without uploading anything if the key already exists.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"List[Tuple[str, str]]",desc:"List of `(key, url)` pairs corresponding to the files uploaded.",mdxType:"Parameter"}))),(0,o.kt)("h2",{id:"querying-metadata"},"Querying metadata"),(0,o.kt)(p,{type:"method",name:"S3.info",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L743",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"key",type:"Optional",default:"None",mdxType:"SigArg"}),(0,o.kt)(y,{name:"return_missing",type:"bool",default:"False",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Get metadata about a single object in S3.",extended_summary:"This call makes a single `HEAD` request to S3 which can be\\nmuch faster than downloading all data with `get`.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"key",type:"str, optional, default None",desc:"Object to query. It can be an S3 url or a path suffix.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"return_missing",type:"bool, default False",desc:"If set to True, do not raise an exception for a missing key but\\nreturn it as an `S3Object` with `.exists == False`.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"S3Object",desc:"An S3Object corresponding to the object requested. The object\\nwill have `.downloaded == False`.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"method",name:"S3.info_many",module:"metaflow",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L799",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"self",mdxType:"SigArg"}),(0,o.kt)(y,{name:"keys",type:"Iterable",mdxType:"SigArg"}),(0,o.kt)(y,{name:"return_missing",type:"bool",default:"False",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Get metadata about many objects in S3 in parallel.",extended_summary:"This call makes a single `HEAD` request to S3 which can be\\nmuch faster than downloading all data with `get`.",mdxType:"Description"}),(0,o.kt)(h,{name:"Parameters",mdxType:"ParamSection"},(0,o.kt)(f,{name:"keys",type:"Iterable[str]",desc:"Objects to query. Each key can be an S3 url or a path suffix.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"return_missing",type:"bool, default False",desc:"If set to True, do not raise an exception for a missing key but\\nreturn it as an `S3Object` with `.exists == False`.",mdxType:"Parameter"})),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"List[S3Object]",desc:"A list of S3Objects corresponding to the paths requested. The\\nobjects will have `.downloaded == False`.",mdxType:"Parameter"}))),(0,o.kt)("h2",{id:"handling-results-with-s3object"},"Handling results with ",(0,o.kt)("inlineCode",{parentName:"h2"},"S3Object")),(0,o.kt)("p",null,"Most operations above return ",(0,o.kt)("inlineCode",{parentName:"p"},"S3Object"),"s that encapsulate information about S3 paths and objects."),(0,o.kt)("p",null,"Note that the data itself is not kept in these objects but it is stored in a temporary directory which is accessible through the properties of this object."),(0,o.kt)(p,{type:"class",name:"S3Object",module:"metaflow",show_import:"False",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/metaflow/plugins/datatools/s3/s3.py#L139",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"This object represents a path or an object in S3,\\nwith an optional local copy.",extended_summary:"`S3Object`s are not instantiated directly, but they are returned\\nby many methods of the `S3` client.",mdxType:"Description"})),(0,o.kt)(p,{type:"property",name:"S3Object.exists",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Does this key correspond to an object in S3?\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"bool",desc:"True if this object points at an existing object (file) in S3.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.downloaded",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Has this object been downloaded?\\n\\nIf True, the contents can be accessed through `path`, `blob`,\\nand `text` properties.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"bool",desc:"True if the contents of this object have been downloaded.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.url",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"S3 location of the object\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"str",desc:"The S3 location of this object.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.prefix",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Prefix requested that matches this object.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"str",desc:"Requested prefix",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.key",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Key corresponds to the key given to the get call that produced\\nthis object.\\n\\nThis may be a full S3 URL or a suffix based on what\\nwas requested.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"str",desc:"Key requested.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.path",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Path to a local temporary file corresponding to the object downloaded.\\n\\nThis file gets deleted automatically when a S3 scope exits.\\nReturns None if this S3Object has not been downloaded.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"str",desc:"Local path, if the object has been downloaded.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.blob",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Contents of the object as a byte string or None if the\\nobject hasn't been downloaded.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"bytes",desc:"Contents of the object as bytes.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.text",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Contents of the object as a string or None if the\\nobject hasn't been downloaded.\\n\\nThe object is assumed to contain UTF-8 encoded data.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"str",desc:"Contents of the object as text.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.size",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Size of the object in bytes.\\n\\nReturns None if the key does not correspond to an object in S3.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"int",desc:"Size of the object in bytes, if the object exists.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.has_info",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Returns true if this `S3Object` contains the content-type MIME header or\\nuser-defined metadata.\\n\\nIf False, this means that `content_type`, `metadata`, `range_info` and\\n`last_modified` will return None.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"bool",desc:"True if additional metadata is available.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.metadata",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Returns a dictionary of user-defined metadata, or None if no metadata\\nis defined.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"Dict",desc:"User-defined metadata.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.content_type",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Returns the content-type of the S3 object or None if it is not defined.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"str",desc:"Content type or None if the content type is undefined.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"property",name:"S3Object.range_info",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"If the object corresponds to a partially downloaded object, returns\\ninformation of what was downloaded.\\n\\nThe returned object has the following fields:\\n- `total_size`: Size of the object in S3.\\n- `request_offset`: The starting offset.\\n- `request_length`: The number of bytes downloaded.\\n",mdxType:"Description"})),(0,o.kt)(p,{type:"property",name:"S3Object.last_modified",module:"metaflow.plugins.datatools.s3.s3",show_import:"False",heading_level:"4",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(u,{summary:"Returns the last modified unix timestamp of the object.\\n",mdxType:"Description"}),(0,o.kt)(h,{name:"Returns",mdxType:"ParamSection"},(0,o.kt)(f,{type:"int",desc:"Unix timestamp corresponding to the last modified time.",mdxType:"Parameter"}))),(0,o.kt)("h2",{id:"helper-objects"},"Helper Objects"),(0,o.kt)("p",null,"These objects are simple containers that are used to pass information to ",(0,o.kt)("inlineCode",{parentName:"p"},"get_many"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"put_many"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"put_files"),". You may use your own objects instead of them, as long as they provide the same set of attributes."),(0,o.kt)(p,{type:"class",name:"S3GetObject",module:"metaflow.datatools.s3",show_import:"True",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"key",default:"None",mdxType:"SigArg"}),(0,o.kt)(y,{name:"offset",default:"None",mdxType:"SigArg"}),(0,o.kt)(y,{name:"length",default:"None",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Represents a chunk of an S3 object. A range query is performed to download only a subset of data,\\n`object[key][offset:offset + length]`, from S3.",mdxType:"Description"}),(0,o.kt)(h,{name:"Attributes",mdxType:"ParamSection"},(0,o.kt)(f,{name:"key",type:"str",desc:"Key identifying the object. Works the same way as any `key` passed to `get` or `get_many`.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"offset",type:"int",desc:"A byte offset in the file.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"length",type:"int",desc:"The number of bytes to download.",mdxType:"Parameter"}))),(0,o.kt)(p,{type:"class",name:"S3PutObject",module:"metaflow.datatools.s3",show_import:"True",heading_level:"3",link:"https://github.com/Netflix/metaflow/tree/master/",mdxType:"DocSection"},(0,o.kt)(c,{mdxType:"SigArgSection"},(0,o.kt)(y,{name:"key",default:"None",mdxType:"SigArg"}),(0,o.kt)(y,{name:"value",default:"None",mdxType:"SigArg"}),(0,o.kt)(y,{name:"path",default:"None",mdxType:"SigArg"}),(0,o.kt)(y,{name:"content_type",default:"None",mdxType:"SigArg"}),(0,o.kt)(y,{name:"metadata",default:"None",mdxType:"SigArg"})),(0,o.kt)(u,{summary:"Defines an object with metadata to be uplaoded with `put_many` or `put_files`.",mdxType:"Description"}),(0,o.kt)(h,{name:"Attributes",mdxType:"ParamSection"},(0,o.kt)(f,{name:"key",type:"str",desc:"Key identifying the object. Works the same way as `key` passed to `put` or `put_many`.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"value",type:"str or bytes",desc:"Object to upload. Works the same way as `obj` passed `to `put` or `put_many`.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"path",type:"str",desc:"Path to a local file. Works the same way as `path` passed to `put_files`.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"content_type",type:"str",desc:"Optional MIME type for the file.",mdxType:"Parameter"}),(0,o.kt)(f,{name:"metadata",type:"Dict",desc:"A JSON-encodable dictionary of additional headers to be stored\\nas metadata with the file.",mdxType:"Parameter"}))))}k.isMDXComponent=!0}}]);