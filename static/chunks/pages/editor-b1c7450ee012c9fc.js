(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[154],{3834:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return O}});var r=t(5861),a=t(6854),o=t(7757),c=t.n(o),u=t(7294),i=t(9008),l=t(7264),s=t(4942),d=t(3084),f=t(3935),p=t(2252),m=t(6397),v=t(5893);function h(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function b(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?h(Object(t),!0).forEach((function(n){(0,s.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):h(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var w=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=(0,u.useRef)(null),a=(0,u.useState)(e),o=a[0],c=a[1];return(0,u.useEffect)((function(){var e=(null===n||void 0===n?void 0:n.current)||n||document.body;r.current=r.current||document.createElement("div");var a=(null===t||void 0===t?void 0:t.mask)&&"mask";t.containerCssText&&(r.current.style.cssText=t.containerCssText),r.current.className=(0,p.k)(["xl-loading-container",a,t.className]);var u=(0,m.NH)(r.current,"click",(function(e){t.maskClose&&c(!1)}));return o?(f.render((0,v.jsx)(d.Z,b({},t)),r.current),e.appendChild(r.current)):(f.unmountComponentAtNode(r.current),e.contains(r.current)&&e.removeChild(r.current)),function(){f.unmountComponentAtNode(r.current),e.contains(r.current)&&e.removeChild(r.current),(0,m.yM)(u)}}),[t,o,n]),[o,c]},x=t(4298),g=t(1742);t(7732);function k(e){var n=e.language,t=e.onSubmit,o=e.style,l=e.defaultCode,s=e.theme,d=e.submitLabel,f=e.children,p=e.enableMinimap,m=(0,u.useRef)(null),h=w(!1,m,{containerCssText:"position:absolute;width:100%;height:100%",mask:!0,size:"5em",maskClose:!1,labelSize:"1.5em",label:"\u7f16\u8f91\u5668\u52a0\u8f7d\u4e2d..."}),b=(0,a.Z)(h,2),k=(b[0],b[1]);function y(){return j.apply(this,arguments)}function j(){return(j=(0,r.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=(0,r.Z)(c().mark((function e(t,r){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,window.require.config({paths:{vs:"/monacoEditor/min/vs"}}),window.require(["vs/editor/editor.main"],(function(){document.getElementById("xl-monaco").innerHTML="",window.monacoEditorModel=window.monaco.editor.create(document.getElementById("xl-monaco"),{value:l,automaticLayout:!0,language:n,minimap:{enabled:p},theme:s}),t(!0)})),e.next=14;break;case 5:return e.prev=5,e.t0=e.catch(0),e.next=9,(0,g._v)(1e3);case 9:return e.t1=t,e.next=12,y();case 12:e.t2=e.sent,(0,e.t1)(e.t2);case 14:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(n,t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(0,u.useEffect)((0,r.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(!0),e.next=3,y();case 3:k(!1);case 4:case"end":return e.stop()}}),e)}))),[]),(0,u.useEffect)((function(){var e;null!==(e=window.monaco)&&void 0!==e&&e.editor&&window.monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0],n)}),[n]);return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(i.default,{children:(0,v.jsx)("link",{rel:"stylesheet","data-name":"vs/editor/editor.main",href:"/monacoEditor/min/vs/editor/editor.main.css"})}),(0,v.jsx)(x.default,{src:"/monacoEditor/min/vs/loader.js",strategy:"beforeInteractive"}),(0,v.jsx)("div",{className:"xl-monaco-editor-container",style:o,ref:m,children:(0,v.jsx)("div",{id:"xl-monaco"})}),(0,v.jsxs)("div",{className:"xl-editor-buttons",children:[(0,v.jsx)("button",{type:"button",onClick:function(e){var n=window.monacoEditorModel.getValue();null===t||void 0===t||t(n)},children:d}),(0,v.jsx)("button",{type:"button",onClick:function(){window.monacoEditorModel.setValue("")},children:"clear"}),f]})]})}k.defaultProps={language:"javascript",onSubmit:null,style:null,defaultCode:"",theme:"vs-light",submitLabel:"ok",enableMinimap:!0};var y=k,j=t(8031);t(7702);function E(){var e=(0,u.useState)(""),n=e[0],t=e[1],o=(0,u.useRef)(null),l=w(!1,o,{containerCssText:"position:relative",labelSize:"20px",label:"running..."}),s=(0,a.Z)(l,2),d=(s[0],s[1]),f=function(){var e=(0,r.Z)(c().mark((function e(n){var r,a;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),e.prev=1,e.next=4,(0,j.O)(n);case 4:(r=e.sent).success?(a="",r.data.map((function(e){a+=e+"<br>"})),t(a)):t(r.msg),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t(e.t0.toString());case 11:d(!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(n){return e.apply(this,arguments)}}();return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(i.default,{children:(0,v.jsx)("title",{children:"JS\u6d4b\u8bd5"})}),(0,v.jsx)("h1",{className:"xl-js-editor-title",children:"\u5728\u7ebf\u8fd0\u884cjs"}),(0,v.jsx)(y,{language:"javascript",style:{height:"50vh"},submitLabel:"Run",defaultCode:"function add(a,b){\n    return a+b\n}\nconsole.log('this is a test',add(1,2))",onSubmit:f}),(0,v.jsx)("div",{ref:o,className:"xl-js-editor-output",dangerouslySetInnerHTML:{__html:n}})]})}E.layout=l.uy;var O=E},8031:function(e,n,t){"use strict";t.d(n,{O:function(){return u}});var r=t(5861),a=t(7757),o=t.n(a),c=t(8222);function u(e){return i.apply(this,arguments)}function i(){return(i=(0,r.Z)(o().mark((function e(n){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,c.v_)("/runScript",{script:n});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},6397:function(e,n,t){"use strict";t.d(n,{NH:function(){return c},yM:function(){return u}});var r=t(7549),a=t(2252),o=new Map;function c(e,n,t){if(!e||!n||!(0,r.mf)(t))return null;var a=o.get(e);if(a){var c=a.get(n);if(c){if(c.callbacks.includes(t))return l(),{dom:e,event:n,callbackIndex:c.callbacks.indexOf(t)};var u=c.callbacks.push(t);return l(),{dom:e,event:n,callbackIndex:u-1}}return a.set(n,{callbacks:[t]}),l(),{dom:e,event:n,callbackIndex:0}}var i=new Map;return i.set(n,{callbacks:[t]}),o.set(e,i),l(),{dom:e,event:n,callbackIndex:0}}function u(e){return null!==e&&void 0!==e&&e.dom?i(e.dom,e.event,e.callbackIndex):null}function i(e,n,t){if(!e)return null;var c=o.get(e);if(!c)return null;if(!n)return c.forEach((function(n,t){(0,a.S1)(e,t,n.wrapperFun),delete n.wrapperFun,c.delete(t)})),o.delete(e),{dom:e};var u=c.get(n);if(!u)return null;if(null===t||void 0===t)return(0,a.S1)(e,n,u.wrapperFun),delete u.wrapperFun,c.delete(n),c.size<1&&i(e),{dom:e,event:n};var l=(0,r.hj)(t)?t:u.callbacks.findIndex((function(e){return e===t}));if(l<0)return null;var s=u.callbacks.splice(l,1);return u.callbacks.length<1?i(e,n):s.length>0?{dom:e,event:n,callbackIndex:l}:null}function l(){o.forEach((function(e,n){e.forEach((function(e,t){e.wrapperFun||(e.wrapperFun=function(r){var a=this;e.callbacks.forEach((function(e){e.call(a,r,n,t)}))},(0,a.on)(n,t,e.wrapperFun))}))}))}n.ZP={addListener:c,removeListener:i,removeListenerRS:u,start:l,removeAll:function(){o.forEach((function(e,n){e.forEach((function(t,r){(0,a.S1)(n,r,t.wrapperFun),delete t.wrapperFun,e.delete(r)})),o.delete(n)}))}}},1268:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/editor",function(){return t(3834)}])},7732:function(){},7702:function(){}},function(e){e.O(0,[662,786,116,774,888,179],(function(){return n=1268,e(e.s=n);var n}));var n=e.O();_N_E=n}]);