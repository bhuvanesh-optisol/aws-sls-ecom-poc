(()=>{var q={879:(O,C,w)=>{"use strict";w.r(C),w.d(C,{notificationService:()=>c});var b=w(49),l=w.n(b);const p=w(336),M=new p.DynamoDB.DocumentClient,_=new p.SQS;async function c(i,s){try{console.log("454534",s.user.email);let e,o;switch(i){case 15:e=`Your product ${s.product_name} is selling fast`,o=`Your product ${s.product_name} is selling fast. Kindly update the quantity to avoid the last minute hassle`;break;case 10:e=`Remainder!!. Your product ${s.product_name} is less than 10`,o=`Remainder!!. Your product ${s.product_name} is less than 10. Kindly update the quantity to avoid the last minute hassle`;break;case 5:e=`Remainder!!. Your product ${s.product_name} is going to sold out`,o=`Remainder!!. Your product ${s.product_name} is less than 5 and going to sold out. Kindly update the quantity to avoid the last minute hassle`;break;case 0:e=`Oahh!!..Your product ${s.product_name} is sold out`,o=`Oahh!!..Your product ${s.product_name} is sold out. Kindly update the quantity`;break;default:}if(console.log(e,o),e&&o){var a;console.log("6454");const t=await _.sendMessage({QueueUrl:"https://sqs.us-west-1.amazonaws.com/441836939852/ecom-notification-poc-dev-MailQueue-YfMfoMxTY1SD",MessageBody:JSON.stringify({subject:e,body:o,recipient:String(s==null||(a=s.user)===null||a===void 0?void 0:a.email)})}).promise();return console.log("not",t),{statusCode:200,body:JSON.stringify(t)}}}catch(e){return{statusCode:500,body:JSON.stringify(e)}}}},358:O=>{var C=Object.prototype.toString,w=typeof Buffer<"u"&&typeof Buffer.alloc=="function"&&typeof Buffer.allocUnsafe=="function"&&typeof Buffer.from=="function";function b(_){return C.call(_).slice(8,-1)==="ArrayBuffer"}function l(_,c,i){c>>>=0;var s=_.byteLength-c;if(s<0)throw new RangeError("'offset' is out of bounds");if(i===void 0)i=s;else if(i>>>=0,i>s)throw new RangeError("'length' is out of bounds");return w?Buffer.from(_.slice(c,c+i)):new Buffer(new Uint8Array(_.slice(c,c+i)))}function p(_,c){if((typeof c!="string"||c==="")&&(c="utf8"),!Buffer.isEncoding(c))throw new TypeError('"encoding" must be a valid string encoding');return w?Buffer.from(_,c):new Buffer(_,c)}function M(_,c,i){if(typeof _=="number")throw new TypeError('"value" argument must not be a number');return b(_)?l(_,c,i):typeof _=="string"?p(_,c):w?Buffer.from(_):new Buffer(_)}O.exports=M},49:(O,C,w)=>{w(685).install()},685:(O,C,w)=>{O=w.nmd(O);var b=w(461).SourceMapConsumer,l=w(17),p;try{p=w(147),(!p.existsSync||!p.readFileSync)&&(p=null)}catch{}var M=w(358);function _(h,g){return h.require(g)}var c=!1,i=!1,s=!1,a="auto",e={},o={},t=/^data:application\/json[^,]+base64,/,f=[],u=[];function d(){return a==="browser"?!0:a==="node"?!1:typeof window<"u"&&typeof XMLHttpRequest=="function"&&!(window.require&&window.module&&window.process&&window.process.type==="renderer")}function S(){return typeof process=="object"&&process!==null&&typeof process.on=="function"}function m(){return typeof process=="object"&&process!==null?process.version:""}function L(){if(typeof process=="object"&&process!==null)return process.stderr}function n(h){if(typeof process=="object"&&process!==null&&typeof process.exit=="function")return process.exit(h)}function r(h){return function(g){for(var E=0;E<h.length;E++){var R=h[E](g);if(R)return R}return null}}var v=r(f);f.push(function(h){if(h=h.trim(),/^file:/.test(h)&&(h=h.replace(/file:\/\/\/(\w:)?/,function(R,N){return N?"":"/"})),h in e)return e[h];var g="";try{if(p)p.existsSync(h)&&(g=p.readFileSync(h,"utf8"));else{var E=new XMLHttpRequest;E.open("GET",h,!1),E.send(null),E.readyState===4&&E.status===200&&(g=E.responseText)}}catch{}return e[h]=g});function y(h,g){if(!h)return g;var E=l.dirname(h),R=/^\w+:\/\/[^\/]*/.exec(E),N=R?R[0]:"",A=E.slice(N.length);return N&&/^\/\w\:/.test(A)?(N+="/",N+l.resolve(E.slice(N.length),g).replace(/\\/g,"/")):N+l.resolve(E.slice(N.length),g)}function P(h){var g;if(d())try{var E=new XMLHttpRequest;E.open("GET",h,!1),E.send(null),g=E.readyState===4?E.responseText:null;var R=E.getResponseHeader("SourceMap")||E.getResponseHeader("X-SourceMap");if(R)return R}catch{}g=v(h);for(var N=/(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg,A,I;I=N.exec(g);)A=I;return A?A[1]:null}var j=r(u);u.push(function(h){var g=P(h);if(!g)return null;var E;if(t.test(g)){var R=g.slice(g.indexOf(",")+1);E=M(R,"base64").toString(),g=h}else g=y(h,g),E=v(g);return E?{url:g,map:E}:null});function U(h){var g=o[h.source];if(!g){var E=j(h.source);E?(g=o[h.source]={url:E.url,map:new b(E.map)},g.map.sourcesContent&&g.map.sources.forEach(function(N,A){var I=g.map.sourcesContent[A];if(I){var B=y(g.url,N);e[B]=I}})):g=o[h.source]={url:null,map:null}}if(g&&g.map&&typeof g.map.originalPositionFor=="function"){var R=g.map.originalPositionFor(h);if(R.source!==null)return R.source=y(g.url,R.source),R}return h}function T(h){var g=/^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(h);if(g){var E=U({source:g[2],line:+g[3],column:g[4]-1});return"eval at "+g[1]+" ("+E.source+":"+E.line+":"+(E.column+1)+")"}return g=/^eval at ([^(]+) \((.+)\)$/.exec(h),g?"eval at "+g[1]+" ("+T(g[2])+")":h}function $(){var h,g="";if(this.isNative())g="native";else{h=this.getScriptNameOrSourceURL(),!h&&this.isEval()&&(g=this.getEvalOrigin(),g+=", "),h?g+=h:g+="<anonymous>";var E=this.getLineNumber();if(E!=null){g+=":"+E;var R=this.getColumnNumber();R&&(g+=":"+R)}}var N="",A=this.getFunctionName(),I=!0,B=this.isConstructor(),V=!(this.isToplevel()||B);if(V){var D=this.getTypeName();D==="[object Object]"&&(D="null");var k=this.getMethodName();A?(D&&A.indexOf(D)!=0&&(N+=D+"."),N+=A,k&&A.indexOf("."+k)!=A.length-k.length-1&&(N+=" [as "+k+"]")):N+=D+"."+(k||"<anonymous>")}else B?N+="new "+(A||"<anonymous>"):A?N+=A:(N+=g,I=!1);return I&&(N+=" ("+g+")"),N}function x(h){var g={};return Object.getOwnPropertyNames(Object.getPrototypeOf(h)).forEach(function(E){g[E]=/^(?:is|get)/.test(E)?function(){return h[E].call(h)}:h[E]}),g.toString=$,g}function F(h,g){if(g===void 0&&(g={nextPosition:null,curPosition:null}),h.isNative())return g.curPosition=null,h;var E=h.getFileName()||h.getScriptNameOrSourceURL();if(E){var R=h.getLineNumber(),N=h.getColumnNumber()-1,A=/^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/,I=A.test(m())?0:62;R===1&&N>I&&!d()&&!h.isEval()&&(N-=I);var B=U({source:E,line:R,column:N});g.curPosition=B,h=x(h);var V=h.getFunctionName;return h.getFunctionName=function(){return g.nextPosition==null?V():g.nextPosition.name||V()},h.getFileName=function(){return B.source},h.getLineNumber=function(){return B.line},h.getColumnNumber=function(){return B.column+1},h.getScriptNameOrSourceURL=function(){return B.source},h}var D=h.isEval()&&h.getEvalOrigin();return D&&(D=T(D),h=x(h),h.getEvalOrigin=function(){return D}),h}function Q(h,g){s&&(e={},o={});for(var E=h.name||"Error",R=h.message||"",N=E+": "+R,A={nextPosition:null,curPosition:null},I=[],B=g.length-1;B>=0;B--)I.push(`
    at `+F(g[B],A)),A.nextPosition=A.curPosition;return A.curPosition=A.nextPosition=null,N+I.reverse().join("")}function Y(h){var g=/\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(h.stack);if(g){var E=g[1],R=+g[2],N=+g[3],A=e[E];if(!A&&p&&p.existsSync(E))try{A=p.readFileSync(E,"utf8")}catch{A=""}if(A){var I=A.split(/(?:\r\n|\r|\n)/)[R-1];if(I)return E+":"+R+`
`+I+`
`+new Array(N).join(" ")+"^"}}return null}function X(h){var g=Y(h),E=L();E&&E._handle&&E._handle.setBlocking&&E._handle.setBlocking(!0),g&&(console.error(),console.error(g)),console.error(h.stack),n(1)}function Z(){var h=process.emit;process.emit=function(g){if(g==="uncaughtException"){var E=arguments[1]&&arguments[1].stack,R=this.listeners(g).length>0;if(E&&!R)return X(arguments[1])}return h.apply(this,arguments)}}var H=f.slice(0),ee=u.slice(0);C.wrapCallSite=F,C.getErrorSource=Y,C.mapSourcePosition=U,C.retrieveSourceMap=j,C.install=function(h){if(h=h||{},h.environment&&(a=h.environment,["node","browser","auto"].indexOf(a)===-1))throw new Error("environment "+a+" was unknown. Available options are {auto, browser, node}");if(h.retrieveFile&&(h.overrideRetrieveFile&&(f.length=0),f.unshift(h.retrieveFile)),h.retrieveSourceMap&&(h.overrideRetrieveSourceMap&&(u.length=0),u.unshift(h.retrieveSourceMap)),h.hookRequire&&!d()){var g=_(O,"module"),E=g.prototype._compile;E.__sourceMapSupport||(g.prototype._compile=function(A,I){return e[I]=A,o[I]=void 0,E.call(this,A,I)},g.prototype._compile.__sourceMapSupport=!0)}if(s||(s="emptyCacheBetweenOperations"in h?h.emptyCacheBetweenOperations:!1),c||(c=!0,Error.prepareStackTrace=Q),!i){var R="handleUncaughtExceptions"in h?h.handleUncaughtExceptions:!0;try{var N=_(O,"worker_threads");N.isMainThread===!1&&(R=!1)}catch{}R&&S()&&(i=!0,Z())}},C.resetRetrieveHandlers=function(){f.length=0,u.length=0,f=H.slice(0),u=ee.slice(0),j=r(u),v=r(f)}},668:(O,C,w)=>{var b=w(930),l=Object.prototype.hasOwnProperty,p=typeof Map<"u";function M(){this._array=[],this._set=p?new Map:Object.create(null)}M.fromArray=function(c,i){for(var s=new M,a=0,e=c.length;a<e;a++)s.add(c[a],i);return s},M.prototype.size=function(){return p?this._set.size:Object.getOwnPropertyNames(this._set).length},M.prototype.add=function(c,i){var s=p?c:b.toSetString(c),a=p?this.has(c):l.call(this._set,s),e=this._array.length;(!a||i)&&this._array.push(c),a||(p?this._set.set(c,e):this._set[s]=e)},M.prototype.has=function(c){if(p)return this._set.has(c);var i=b.toSetString(c);return l.call(this._set,i)},M.prototype.indexOf=function(c){if(p){var i=this._set.get(c);if(i>=0)return i}else{var s=b.toSetString(c);if(l.call(this._set,s))return this._set[s]}throw new Error('"'+c+'" is not in the set.')},M.prototype.at=function(c){if(c>=0&&c<this._array.length)return this._array[c];throw new Error("No element indexed by "+c)},M.prototype.toArray=function(){return this._array.slice()},C.I=M},158:(O,C,w)=>{var b=w(977),l=5,p=1<<l,M=p-1,_=p;function c(s){return s<0?(-s<<1)+1:(s<<1)+0}function i(s){var a=(s&1)===1,e=s>>1;return a?-e:e}C.encode=function(a){var e="",o,t=c(a);do o=t&M,t>>>=l,t>0&&(o|=_),e+=b.encode(o);while(t>0);return e},C.decode=function(a,e,o){var t=a.length,f=0,u=0,d,S;do{if(e>=t)throw new Error("Expected more digits in base 64 VLQ value.");if(S=b.decode(a.charCodeAt(e++)),S===-1)throw new Error("Invalid base64 digit: "+a.charAt(e-1));d=!!(S&_),S&=M,f=f+(S<<u),u+=l}while(d);o.value=i(f),o.rest=e}},977:(O,C)=>{var w="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");C.encode=function(b){if(0<=b&&b<w.length)return w[b];throw new TypeError("Must be between 0 and 63: "+b)},C.decode=function(b){var l=65,p=90,M=97,_=122,c=48,i=57,s=43,a=47,e=26,o=52;return l<=b&&b<=p?b-l:M<=b&&b<=_?b-M+e:c<=b&&b<=i?b-c+o:b==s?62:b==a?63:-1}},63:(O,C)=>{C.GREATEST_LOWER_BOUND=1,C.LEAST_UPPER_BOUND=2;function w(b,l,p,M,_,c){var i=Math.floor((l-b)/2)+b,s=_(p,M[i],!0);return s===0?i:s>0?l-i>1?w(i,l,p,M,_,c):c==C.LEAST_UPPER_BOUND?l<M.length?l:-1:i:i-b>1?w(b,i,p,M,_,c):c==C.LEAST_UPPER_BOUND?i:b<0?-1:b}C.search=function(l,p,M,_){if(p.length===0)return-1;var c=w(-1,p.length,l,p,M,_||C.GREATEST_LOWER_BOUND);if(c<0)return-1;for(;c-1>=0&&M(p[c],p[c-1],!0)===0;)--c;return c}},923:(O,C,w)=>{var b=w(930);function l(M,_){var c=M.generatedLine,i=_.generatedLine,s=M.generatedColumn,a=_.generatedColumn;return i>c||i==c&&a>=s||b.compareByGeneratedPositionsInflated(M,_)<=0}function p(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}p.prototype.unsortedForEach=function(_,c){this._array.forEach(_,c)},p.prototype.add=function(_){l(this._last,_)?(this._last=_,this._array.push(_)):(this._sorted=!1,this._array.push(_))},p.prototype.toArray=function(){return this._sorted||(this._array.sort(b.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},C.H=p},645:(O,C)=>{function w(p,M,_){var c=p[M];p[M]=p[_],p[_]=c}function b(p,M){return Math.round(p+Math.random()*(M-p))}function l(p,M,_,c){if(_<c){var i=b(_,c),s=_-1;w(p,i,c);for(var a=p[c],e=_;e<c;e++)M(p[e],a)<=0&&(s+=1,w(p,s,e));w(p,s+1,e);var o=s+1;l(p,M,_,o-1),l(p,M,o+1,c)}}C.U=function(p,M){l(p,M,0,p.length-1)}},94:(O,C,w)=>{var b,l=w(930),p=w(63),M=w(668).I,_=w(158),c=w(645).U;function i(o,t){var f=o;return typeof o=="string"&&(f=l.parseSourceMapInput(o)),f.sections!=null?new e(f,t):new s(f,t)}i.fromSourceMap=function(o,t){return s.fromSourceMap(o,t)},i.prototype._version=3,i.prototype.__generatedMappings=null,Object.defineProperty(i.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),i.prototype.__originalMappings=null,Object.defineProperty(i.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),i.prototype._charIsMappingSeparator=function(t,f){var u=t.charAt(f);return u===";"||u===","},i.prototype._parseMappings=function(t,f){throw new Error("Subclasses must implement _parseMappings")},i.GENERATED_ORDER=1,i.ORIGINAL_ORDER=2,i.GREATEST_LOWER_BOUND=1,i.LEAST_UPPER_BOUND=2,i.prototype.eachMapping=function(t,f,u){var d=f||null,S=u||i.GENERATED_ORDER,m;switch(S){case i.GENERATED_ORDER:m=this._generatedMappings;break;case i.ORIGINAL_ORDER:m=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var L=this.sourceRoot;m.map(function(n){var r=n.source===null?null:this._sources.at(n.source);return r=l.computeSourceURL(L,r,this._sourceMapURL),{source:r,generatedLine:n.generatedLine,generatedColumn:n.generatedColumn,originalLine:n.originalLine,originalColumn:n.originalColumn,name:n.name===null?null:this._names.at(n.name)}},this).forEach(t,d)},i.prototype.allGeneratedPositionsFor=function(t){var f=l.getArg(t,"line"),u={source:l.getArg(t,"source"),originalLine:f,originalColumn:l.getArg(t,"column",0)};if(u.source=this._findSourceIndex(u.source),u.source<0)return[];var d=[],S=this._findMapping(u,this._originalMappings,"originalLine","originalColumn",l.compareByOriginalPositions,p.LEAST_UPPER_BOUND);if(S>=0){var m=this._originalMappings[S];if(t.column===void 0)for(var L=m.originalLine;m&&m.originalLine===L;)d.push({line:l.getArg(m,"generatedLine",null),column:l.getArg(m,"generatedColumn",null),lastColumn:l.getArg(m,"lastGeneratedColumn",null)}),m=this._originalMappings[++S];else for(var n=m.originalColumn;m&&m.originalLine===f&&m.originalColumn==n;)d.push({line:l.getArg(m,"generatedLine",null),column:l.getArg(m,"generatedColumn",null),lastColumn:l.getArg(m,"lastGeneratedColumn",null)}),m=this._originalMappings[++S]}return d},C.SourceMapConsumer=i;function s(o,t){var f=o;typeof o=="string"&&(f=l.parseSourceMapInput(o));var u=l.getArg(f,"version"),d=l.getArg(f,"sources"),S=l.getArg(f,"names",[]),m=l.getArg(f,"sourceRoot",null),L=l.getArg(f,"sourcesContent",null),n=l.getArg(f,"mappings"),r=l.getArg(f,"file",null);if(u!=this._version)throw new Error("Unsupported version: "+u);m&&(m=l.normalize(m)),d=d.map(String).map(l.normalize).map(function(v){return m&&l.isAbsolute(m)&&l.isAbsolute(v)?l.relative(m,v):v}),this._names=M.fromArray(S.map(String),!0),this._sources=M.fromArray(d,!0),this._absoluteSources=this._sources.toArray().map(function(v){return l.computeSourceURL(m,v,t)}),this.sourceRoot=m,this.sourcesContent=L,this._mappings=n,this._sourceMapURL=t,this.file=r}s.prototype=Object.create(i.prototype),s.prototype.consumer=i,s.prototype._findSourceIndex=function(o){var t=o;if(this.sourceRoot!=null&&(t=l.relative(this.sourceRoot,t)),this._sources.has(t))return this._sources.indexOf(t);var f;for(f=0;f<this._absoluteSources.length;++f)if(this._absoluteSources[f]==o)return f;return-1},s.fromSourceMap=function(t,f){var u=Object.create(s.prototype),d=u._names=M.fromArray(t._names.toArray(),!0),S=u._sources=M.fromArray(t._sources.toArray(),!0);u.sourceRoot=t._sourceRoot,u.sourcesContent=t._generateSourcesContent(u._sources.toArray(),u.sourceRoot),u.file=t._file,u._sourceMapURL=f,u._absoluteSources=u._sources.toArray().map(function(j){return l.computeSourceURL(u.sourceRoot,j,f)});for(var m=t._mappings.toArray().slice(),L=u.__generatedMappings=[],n=u.__originalMappings=[],r=0,v=m.length;r<v;r++){var y=m[r],P=new a;P.generatedLine=y.generatedLine,P.generatedColumn=y.generatedColumn,y.source&&(P.source=S.indexOf(y.source),P.originalLine=y.originalLine,P.originalColumn=y.originalColumn,y.name&&(P.name=d.indexOf(y.name)),n.push(P)),L.push(P)}return c(u.__originalMappings,l.compareByOriginalPositions),u},s.prototype._version=3,Object.defineProperty(s.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function a(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}s.prototype._parseMappings=function(t,f){for(var u=1,d=0,S=0,m=0,L=0,n=0,r=t.length,v=0,y={},P={},j=[],U=[],T,$,x,F,Q;v<r;)if(t.charAt(v)===";")u++,v++,d=0;else if(t.charAt(v)===",")v++;else{for(T=new a,T.generatedLine=u,F=v;F<r&&!this._charIsMappingSeparator(t,F);F++);if($=t.slice(v,F),x=y[$],x)v+=$.length;else{for(x=[];v<F;)_.decode(t,v,P),Q=P.value,v=P.rest,x.push(Q);if(x.length===2)throw new Error("Found a source, but no line and column");if(x.length===3)throw new Error("Found a source and line, but no column");y[$]=x}T.generatedColumn=d+x[0],d=T.generatedColumn,x.length>1&&(T.source=L+x[1],L+=x[1],T.originalLine=S+x[2],S=T.originalLine,T.originalLine+=1,T.originalColumn=m+x[3],m=T.originalColumn,x.length>4&&(T.name=n+x[4],n+=x[4])),U.push(T),typeof T.originalLine=="number"&&j.push(T)}c(U,l.compareByGeneratedPositionsDeflated),this.__generatedMappings=U,c(j,l.compareByOriginalPositions),this.__originalMappings=j},s.prototype._findMapping=function(t,f,u,d,S,m){if(t[u]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+t[u]);if(t[d]<0)throw new TypeError("Column must be greater than or equal to 0, got "+t[d]);return p.search(t,f,S,m)},s.prototype.computeColumnSpans=function(){for(var t=0;t<this._generatedMappings.length;++t){var f=this._generatedMappings[t];if(t+1<this._generatedMappings.length){var u=this._generatedMappings[t+1];if(f.generatedLine===u.generatedLine){f.lastGeneratedColumn=u.generatedColumn-1;continue}}f.lastGeneratedColumn=1/0}},s.prototype.originalPositionFor=function(t){var f={generatedLine:l.getArg(t,"line"),generatedColumn:l.getArg(t,"column")},u=this._findMapping(f,this._generatedMappings,"generatedLine","generatedColumn",l.compareByGeneratedPositionsDeflated,l.getArg(t,"bias",i.GREATEST_LOWER_BOUND));if(u>=0){var d=this._generatedMappings[u];if(d.generatedLine===f.generatedLine){var S=l.getArg(d,"source",null);S!==null&&(S=this._sources.at(S),S=l.computeSourceURL(this.sourceRoot,S,this._sourceMapURL));var m=l.getArg(d,"name",null);return m!==null&&(m=this._names.at(m)),{source:S,line:l.getArg(d,"originalLine",null),column:l.getArg(d,"originalColumn",null),name:m}}}return{source:null,line:null,column:null,name:null}},s.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(t){return t==null}):!1},s.prototype.sourceContentFor=function(t,f){if(!this.sourcesContent)return null;var u=this._findSourceIndex(t);if(u>=0)return this.sourcesContent[u];var d=t;this.sourceRoot!=null&&(d=l.relative(this.sourceRoot,d));var S;if(this.sourceRoot!=null&&(S=l.urlParse(this.sourceRoot))){var m=d.replace(/^file:\/\//,"");if(S.scheme=="file"&&this._sources.has(m))return this.sourcesContent[this._sources.indexOf(m)];if((!S.path||S.path=="/")&&this._sources.has("/"+d))return this.sourcesContent[this._sources.indexOf("/"+d)]}if(f)return null;throw new Error('"'+d+'" is not in the SourceMap.')},s.prototype.generatedPositionFor=function(t){var f=l.getArg(t,"source");if(f=this._findSourceIndex(f),f<0)return{line:null,column:null,lastColumn:null};var u={source:f,originalLine:l.getArg(t,"line"),originalColumn:l.getArg(t,"column")},d=this._findMapping(u,this._originalMappings,"originalLine","originalColumn",l.compareByOriginalPositions,l.getArg(t,"bias",i.GREATEST_LOWER_BOUND));if(d>=0){var S=this._originalMappings[d];if(S.source===u.source)return{line:l.getArg(S,"generatedLine",null),column:l.getArg(S,"generatedColumn",null),lastColumn:l.getArg(S,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},b=s;function e(o,t){var f=o;typeof o=="string"&&(f=l.parseSourceMapInput(o));var u=l.getArg(f,"version"),d=l.getArg(f,"sections");if(u!=this._version)throw new Error("Unsupported version: "+u);this._sources=new M,this._names=new M;var S={line:-1,column:0};this._sections=d.map(function(m){if(m.url)throw new Error("Support for url field in sections not implemented.");var L=l.getArg(m,"offset"),n=l.getArg(L,"line"),r=l.getArg(L,"column");if(n<S.line||n===S.line&&r<S.column)throw new Error("Section offsets must be ordered and non-overlapping.");return S=L,{generatedOffset:{generatedLine:n+1,generatedColumn:r+1},consumer:new i(l.getArg(m,"map"),t)}})}e.prototype=Object.create(i.prototype),e.prototype.constructor=i,e.prototype._version=3,Object.defineProperty(e.prototype,"sources",{get:function(){for(var o=[],t=0;t<this._sections.length;t++)for(var f=0;f<this._sections[t].consumer.sources.length;f++)o.push(this._sections[t].consumer.sources[f]);return o}}),e.prototype.originalPositionFor=function(t){var f={generatedLine:l.getArg(t,"line"),generatedColumn:l.getArg(t,"column")},u=p.search(f,this._sections,function(S,m){var L=S.generatedLine-m.generatedOffset.generatedLine;return L||S.generatedColumn-m.generatedOffset.generatedColumn}),d=this._sections[u];return d?d.consumer.originalPositionFor({line:f.generatedLine-(d.generatedOffset.generatedLine-1),column:f.generatedColumn-(d.generatedOffset.generatedLine===f.generatedLine?d.generatedOffset.generatedColumn-1:0),bias:t.bias}):{source:null,line:null,column:null,name:null}},e.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(t){return t.consumer.hasContentsOfAllSources()})},e.prototype.sourceContentFor=function(t,f){for(var u=0;u<this._sections.length;u++){var d=this._sections[u],S=d.consumer.sourceContentFor(t,!0);if(S)return S}if(f)return null;throw new Error('"'+t+'" is not in the SourceMap.')},e.prototype.generatedPositionFor=function(t){for(var f=0;f<this._sections.length;f++){var u=this._sections[f];if(u.consumer._findSourceIndex(l.getArg(t,"source"))!==-1){var d=u.consumer.generatedPositionFor(t);if(d){var S={line:d.line+(u.generatedOffset.generatedLine-1),column:d.column+(u.generatedOffset.generatedLine===d.line?u.generatedOffset.generatedColumn-1:0)};return S}}}return{line:null,column:null}},e.prototype._parseMappings=function(t,f){this.__generatedMappings=[],this.__originalMappings=[];for(var u=0;u<this._sections.length;u++)for(var d=this._sections[u],S=d.consumer._generatedMappings,m=0;m<S.length;m++){var L=S[m],n=d.consumer._sources.at(L.source);n=l.computeSourceURL(d.consumer.sourceRoot,n,this._sourceMapURL),this._sources.add(n),n=this._sources.indexOf(n);var r=null;L.name&&(r=d.consumer._names.at(L.name),this._names.add(r),r=this._names.indexOf(r));var v={source:n,generatedLine:L.generatedLine+(d.generatedOffset.generatedLine-1),generatedColumn:L.generatedColumn+(d.generatedOffset.generatedLine===L.generatedLine?d.generatedOffset.generatedColumn-1:0),originalLine:L.originalLine,originalColumn:L.originalColumn,name:r};this.__generatedMappings.push(v),typeof v.originalLine=="number"&&this.__originalMappings.push(v)}c(this.__generatedMappings,l.compareByGeneratedPositionsDeflated),c(this.__originalMappings,l.compareByOriginalPositions)},b=e},458:(O,C,w)=>{var b=w(158),l=w(930),p=w(668).I,M=w(923).H;function _(c){c||(c={}),this._file=l.getArg(c,"file",null),this._sourceRoot=l.getArg(c,"sourceRoot",null),this._skipValidation=l.getArg(c,"skipValidation",!1),this._sources=new p,this._names=new p,this._mappings=new M,this._sourcesContents=null}_.prototype._version=3,_.fromSourceMap=function(i){var s=i.sourceRoot,a=new _({file:i.file,sourceRoot:s});return i.eachMapping(function(e){var o={generated:{line:e.generatedLine,column:e.generatedColumn}};e.source!=null&&(o.source=e.source,s!=null&&(o.source=l.relative(s,o.source)),o.original={line:e.originalLine,column:e.originalColumn},e.name!=null&&(o.name=e.name)),a.addMapping(o)}),i.sources.forEach(function(e){var o=e;s!==null&&(o=l.relative(s,e)),a._sources.has(o)||a._sources.add(o);var t=i.sourceContentFor(e);t!=null&&a.setSourceContent(e,t)}),a},_.prototype.addMapping=function(i){var s=l.getArg(i,"generated"),a=l.getArg(i,"original",null),e=l.getArg(i,"source",null),o=l.getArg(i,"name",null);this._skipValidation||this._validateMapping(s,a,e,o),e!=null&&(e=String(e),this._sources.has(e)||this._sources.add(e)),o!=null&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:s.line,generatedColumn:s.column,originalLine:a!=null&&a.line,originalColumn:a!=null&&a.column,source:e,name:o})},_.prototype.setSourceContent=function(i,s){var a=i;this._sourceRoot!=null&&(a=l.relative(this._sourceRoot,a)),s!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[l.toSetString(a)]=s):this._sourcesContents&&(delete this._sourcesContents[l.toSetString(a)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))},_.prototype.applySourceMap=function(i,s,a){var e=s;if(s==null){if(i.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);e=i.file}var o=this._sourceRoot;o!=null&&(e=l.relative(o,e));var t=new p,f=new p;this._mappings.unsortedForEach(function(u){if(u.source===e&&u.originalLine!=null){var d=i.originalPositionFor({line:u.originalLine,column:u.originalColumn});d.source!=null&&(u.source=d.source,a!=null&&(u.source=l.join(a,u.source)),o!=null&&(u.source=l.relative(o,u.source)),u.originalLine=d.line,u.originalColumn=d.column,d.name!=null&&(u.name=d.name))}var S=u.source;S!=null&&!t.has(S)&&t.add(S);var m=u.name;m!=null&&!f.has(m)&&f.add(m)},this),this._sources=t,this._names=f,i.sources.forEach(function(u){var d=i.sourceContentFor(u);d!=null&&(a!=null&&(u=l.join(a,u)),o!=null&&(u=l.relative(o,u)),this.setSourceContent(u,d))},this)},_.prototype._validateMapping=function(i,s,a,e){if(s&&typeof s.line!="number"&&typeof s.column!="number")throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");if(!(i&&"line"in i&&"column"in i&&i.line>0&&i.column>=0&&!s&&!a&&!e)){if(i&&"line"in i&&"column"in i&&s&&"line"in s&&"column"in s&&i.line>0&&i.column>=0&&s.line>0&&s.column>=0&&a)return;throw new Error("Invalid mapping: "+JSON.stringify({generated:i,source:a,original:s,name:e}))}},_.prototype._serializeMappings=function(){for(var i=0,s=1,a=0,e=0,o=0,t=0,f="",u,d,S,m,L=this._mappings.toArray(),n=0,r=L.length;n<r;n++){if(d=L[n],u="",d.generatedLine!==s)for(i=0;d.generatedLine!==s;)u+=";",s++;else if(n>0){if(!l.compareByGeneratedPositionsInflated(d,L[n-1]))continue;u+=","}u+=b.encode(d.generatedColumn-i),i=d.generatedColumn,d.source!=null&&(m=this._sources.indexOf(d.source),u+=b.encode(m-t),t=m,u+=b.encode(d.originalLine-1-e),e=d.originalLine-1,u+=b.encode(d.originalColumn-a),a=d.originalColumn,d.name!=null&&(S=this._names.indexOf(d.name),u+=b.encode(S-o),o=S)),f+=u}return f},_.prototype._generateSourcesContent=function(i,s){return i.map(function(a){if(!this._sourcesContents)return null;s!=null&&(a=l.relative(s,a));var e=l.toSetString(a);return Object.prototype.hasOwnProperty.call(this._sourcesContents,e)?this._sourcesContents[e]:null},this)},_.prototype.toJSON=function(){var i={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(i.file=this._file),this._sourceRoot!=null&&(i.sourceRoot=this._sourceRoot),this._sourcesContents&&(i.sourcesContent=this._generateSourcesContent(i.sources,i.sourceRoot)),i},_.prototype.toString=function(){return JSON.stringify(this.toJSON())},C.h=_},771:(O,C,w)=>{var b,l=w(458).h,p=w(930),M=/(\r?\n)/,_=10,c="$$$isSourceNode$$$";function i(s,a,e,o,t){this.children=[],this.sourceContents={},this.line=s??null,this.column=a??null,this.source=e??null,this.name=t??null,this[c]=!0,o!=null&&this.add(o)}i.fromStringWithSourceMap=function(a,e,o){var t=new i,f=a.split(M),u=0,d=function(){var r=y(),v=y()||"";return r+v;function y(){return u<f.length?f[u++]:void 0}},S=1,m=0,L=null;return e.eachMapping(function(r){if(L!==null)if(S<r.generatedLine)n(L,d()),S++,m=0;else{var v=f[u]||"",y=v.substr(0,r.generatedColumn-m);f[u]=v.substr(r.generatedColumn-m),m=r.generatedColumn,n(L,y),L=r;return}for(;S<r.generatedLine;)t.add(d()),S++;if(m<r.generatedColumn){var v=f[u]||"";t.add(v.substr(0,r.generatedColumn)),f[u]=v.substr(r.generatedColumn),m=r.generatedColumn}L=r},this),u<f.length&&(L&&n(L,d()),t.add(f.splice(u).join(""))),e.sources.forEach(function(r){var v=e.sourceContentFor(r);v!=null&&(o!=null&&(r=p.join(o,r)),t.setSourceContent(r,v))}),t;function n(r,v){if(r===null||r.source===void 0)t.add(v);else{var y=o?p.join(o,r.source):r.source;t.add(new i(r.originalLine,r.originalColumn,y,v,r.name))}}},i.prototype.add=function(a){if(Array.isArray(a))a.forEach(function(e){this.add(e)},this);else if(a[c]||typeof a=="string")a&&this.children.push(a);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+a);return this},i.prototype.prepend=function(a){if(Array.isArray(a))for(var e=a.length-1;e>=0;e--)this.prepend(a[e]);else if(a[c]||typeof a=="string")this.children.unshift(a);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+a);return this},i.prototype.walk=function(a){for(var e,o=0,t=this.children.length;o<t;o++)e=this.children[o],e[c]?e.walk(a):e!==""&&a(e,{source:this.source,line:this.line,column:this.column,name:this.name})},i.prototype.join=function(a){var e,o,t=this.children.length;if(t>0){for(e=[],o=0;o<t-1;o++)e.push(this.children[o]),e.push(a);e.push(this.children[o]),this.children=e}return this},i.prototype.replaceRight=function(a,e){var o=this.children[this.children.length-1];return o[c]?o.replaceRight(a,e):typeof o=="string"?this.children[this.children.length-1]=o.replace(a,e):this.children.push("".replace(a,e)),this},i.prototype.setSourceContent=function(a,e){this.sourceContents[p.toSetString(a)]=e},i.prototype.walkSourceContents=function(a){for(var e=0,o=this.children.length;e<o;e++)this.children[e][c]&&this.children[e].walkSourceContents(a);for(var t=Object.keys(this.sourceContents),e=0,o=t.length;e<o;e++)a(p.fromSetString(t[e]),this.sourceContents[t[e]])},i.prototype.toString=function(){var a="";return this.walk(function(e){a+=e}),a},i.prototype.toStringWithSourceMap=function(a){var e={code:"",line:1,column:0},o=new l(a),t=!1,f=null,u=null,d=null,S=null;return this.walk(function(m,L){e.code+=m,L.source!==null&&L.line!==null&&L.column!==null?((f!==L.source||u!==L.line||d!==L.column||S!==L.name)&&o.addMapping({source:L.source,original:{line:L.line,column:L.column},generated:{line:e.line,column:e.column},name:L.name}),f=L.source,u=L.line,d=L.column,S=L.name,t=!0):t&&(o.addMapping({generated:{line:e.line,column:e.column}}),f=null,t=!1);for(var n=0,r=m.length;n<r;n++)m.charCodeAt(n)===_?(e.line++,e.column=0,n+1===r?(f=null,t=!1):t&&o.addMapping({source:L.source,original:{line:L.line,column:L.column},generated:{line:e.line,column:e.column},name:L.name})):e.column++}),this.walkSourceContents(function(m,L){o.setSourceContent(m,L)}),{code:e.code,map:o}},b=i},930:(O,C)=>{function w(n,r,v){if(r in n)return n[r];if(arguments.length===3)return v;throw new Error('"'+r+'" is a required argument.')}C.getArg=w;var b=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,l=/^data:.+\,.+$/;function p(n){var r=n.match(b);return r?{scheme:r[1],auth:r[2],host:r[3],port:r[4],path:r[5]}:null}C.urlParse=p;function M(n){var r="";return n.scheme&&(r+=n.scheme+":"),r+="//",n.auth&&(r+=n.auth+"@"),n.host&&(r+=n.host),n.port&&(r+=":"+n.port),n.path&&(r+=n.path),r}C.urlGenerate=M;function _(n){var r=n,v=p(n);if(v){if(!v.path)return n;r=v.path}for(var y=C.isAbsolute(r),P=r.split(/\/+/),j,U=0,T=P.length-1;T>=0;T--)j=P[T],j==="."?P.splice(T,1):j===".."?U++:U>0&&(j===""?(P.splice(T+1,U),U=0):(P.splice(T,2),U--));return r=P.join("/"),r===""&&(r=y?"/":"."),v?(v.path=r,M(v)):r}C.normalize=_;function c(n,r){n===""&&(n="."),r===""&&(r=".");var v=p(r),y=p(n);if(y&&(n=y.path||"/"),v&&!v.scheme)return y&&(v.scheme=y.scheme),M(v);if(v||r.match(l))return r;if(y&&!y.host&&!y.path)return y.host=r,M(y);var P=r.charAt(0)==="/"?r:_(n.replace(/\/+$/,"")+"/"+r);return y?(y.path=P,M(y)):P}C.join=c,C.isAbsolute=function(n){return n.charAt(0)==="/"||b.test(n)};function i(n,r){n===""&&(n="."),n=n.replace(/\/$/,"");for(var v=0;r.indexOf(n+"/")!==0;){var y=n.lastIndexOf("/");if(y<0||(n=n.slice(0,y),n.match(/^([^\/]+:\/)?\/*$/)))return r;++v}return Array(v+1).join("../")+r.substr(n.length+1)}C.relative=i;var s=function(){var n=Object.create(null);return!("__proto__"in n)}();function a(n){return n}function e(n){return t(n)?"$"+n:n}C.toSetString=s?a:e;function o(n){return t(n)?n.slice(1):n}C.fromSetString=s?a:o;function t(n){if(!n)return!1;var r=n.length;if(r<9||n.charCodeAt(r-1)!==95||n.charCodeAt(r-2)!==95||n.charCodeAt(r-3)!==111||n.charCodeAt(r-4)!==116||n.charCodeAt(r-5)!==111||n.charCodeAt(r-6)!==114||n.charCodeAt(r-7)!==112||n.charCodeAt(r-8)!==95||n.charCodeAt(r-9)!==95)return!1;for(var v=r-10;v>=0;v--)if(n.charCodeAt(v)!==36)return!1;return!0}function f(n,r,v){var y=d(n.source,r.source);return y!==0||(y=n.originalLine-r.originalLine,y!==0)||(y=n.originalColumn-r.originalColumn,y!==0||v)||(y=n.generatedColumn-r.generatedColumn,y!==0)||(y=n.generatedLine-r.generatedLine,y!==0)?y:d(n.name,r.name)}C.compareByOriginalPositions=f;function u(n,r,v){var y=n.generatedLine-r.generatedLine;return y!==0||(y=n.generatedColumn-r.generatedColumn,y!==0||v)||(y=d(n.source,r.source),y!==0)||(y=n.originalLine-r.originalLine,y!==0)||(y=n.originalColumn-r.originalColumn,y!==0)?y:d(n.name,r.name)}C.compareByGeneratedPositionsDeflated=u;function d(n,r){return n===r?0:n===null?1:r===null?-1:n>r?1:-1}function S(n,r){var v=n.generatedLine-r.generatedLine;return v!==0||(v=n.generatedColumn-r.generatedColumn,v!==0)||(v=d(n.source,r.source),v!==0)||(v=n.originalLine-r.originalLine,v!==0)||(v=n.originalColumn-r.originalColumn,v!==0)?v:d(n.name,r.name)}C.compareByGeneratedPositionsInflated=S;function m(n){return JSON.parse(n.replace(/^\)]}'[^\n]*\n/,""))}C.parseSourceMapInput=m;function L(n,r,v){if(r=r||"",n&&(n[n.length-1]!=="/"&&r[0]!=="/"&&(n+="/"),r=n+r),v){var y=p(v);if(!y)throw new Error("sourceMapURL could not be parsed");if(y.path){var P=y.path.lastIndexOf("/");P>=0&&(y.path=y.path.substring(0,P+1))}r=c(M(y),r)}return _(r)}C.computeSourceURL=L},461:(O,C,w)=>{w(458).h,C.SourceMapConsumer=w(94).SourceMapConsumer,w(771)},336:O=>{"use strict";O.exports=require("aws-sdk")},147:O=>{"use strict";O.exports=require("fs")},17:O=>{"use strict";O.exports=require("path")}},z={};function G(O){var C=z[O];if(C!==void 0)return C.exports;var w=z[O]={id:O,loaded:!1,exports:{}};return q[O](w,w.exports,G),w.loaded=!0,w.exports}G.n=O=>{var C=O&&O.__esModule?()=>O.default:()=>O;return G.d(C,{a:C}),C},G.d=(O,C)=>{for(var w in C)G.o(C,w)&&!G.o(O,w)&&Object.defineProperty(O,w,{enumerable:!0,get:C[w]})},G.o=(O,C)=>Object.prototype.hasOwnProperty.call(O,C),G.r=O=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(O,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(O,"__esModule",{value:!0})},G.nmd=O=>(O.paths=[],O.children||(O.children=[]),O);var W={};(()=>{"use strict";G.r(W),G.d(W,{handler:()=>M});var O=G(49),C=G.n(O);const w=G(336),b=new w.DynamoDB.DocumentClient,{notificationService:l}=G(879);async function p(_,c){try{let s;var i={TableName:"ProductsTable",ExpressionAttributeNames:{"#is_available":"is_available","#isDeleted":"is_deleted"},ExpressionAttributeValues:{":is_available":!0,":isDeletedValue":!1},FilterExpression:"#is_available=:is_available and #isDeleted=:isDeletedValue"};s=(await b.scan(i).promise()).Items,await Promise.all(s.map(async e=>{try{const o=await b.get({TableName:"CompanyTable",Key:{id:"a84dba49-7696-44d3-92ae-1b8015ac9321"}}).promise();e.user=o.Item}catch(o){console.log("ex",o)}})),console.log("productList",s),await Promise.all(s.map(async e=>{try{await l(Number(e.qty),e)}catch(o){console.log("ex",o)}}))}catch(s){return console.log(s),{statusCode:500,body:JSON.stringify(s)}}}const M=p})();var J=exports;for(var K in W)J[K]=W[K];W.__esModule&&Object.defineProperty(J,"__esModule",{value:!0})})();

//# sourceMappingURL=notifyCompany.js.map