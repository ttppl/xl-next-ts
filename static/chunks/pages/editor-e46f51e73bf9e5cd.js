(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[154],{3646:function(e,t,n){var r=n(7228);e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.default=e.exports,e.exports.__esModule=!0},6860:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},319:function(e,t,n){var r=n(3646),o=n(6860),a=n(379),u=n(8206);e.exports=function(e){return r(e)||o(e)||a(e)||u()},e.exports.default=e.exports,e.exports.__esModule=!0},8e3:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var o=((r=n(7294))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=o},5646:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=u,t.useAmp=function(){return u(o.default.useContext(a.AmpStateContext))};var r,o=(r=n(7294))&&r.__esModule?r:{default:r},a=n(8e3);function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,o=void 0!==r&&r,a=e.hasQuery,u=void 0!==a&&a;return n||o&&u}},2717:function(e,t,n){"use strict";var r=n(9713);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var a,u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(7294)),i=(a=n(1585))&&a.__esModule?a:{default:a},c=n(8e3),s=n(5850),l=n(5646);function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[u.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(u.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===u.default.Fragment?e.concat(u.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function v(e,t){return e.reduce((function(e,t){var n=u.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(f,[]).reverse().concat(d(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(o){var a=!0,u=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){u=!0;var i=o.key.slice(o.key.indexOf("$")+1);e.has(i)?a=!1:e.add(i)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var c=0,s=p.length;c<s;c++){var l=p[c];if(o.props.hasOwnProperty(l))if("charSet"===l)n.has(l)?a=!1:n.add(l);else{var d=o.props[l],f=r[l]||new Set;"name"===l&&u||!f.has(d)?(f.add(d),r[l]=f):a=!1}}}return a}}()).reverse().map((function(e,n){var a=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var i=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,u.default.cloneElement(e,i)}return u.default.cloneElement(e,{key:a})}))}var m=function(e){var t=e.children,n=u.useContext(c.AmpStateContext),r=u.useContext(s.HeadManagerContext);return u.default.createElement(i.default,{reduceComponentsToState:v,headManager:r,inAmpMode:l.isInAmpMode(n)},t)};t.default=m},1585:function(e,t,n){"use strict";var r=n(319),o=n(4575),a=n(3913),u=(n(1506),n(2205)),i=n(8585),c=n(9754);function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=c(e);if(t){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return i(this,n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(7294));var d=function(e){u(n,e);var t=s(n);function n(e){var a;return o(this,n),(a=t.call(this,e)).emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(r(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(l.Component);t.default=d},3834:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return _}});var r=n(5861),o=n(6854),a=n(7757),u=n.n(a),i=n(7294),c=n(9008),s=n(7264),l=n(4942),d=n(3084),f=n(3935),p=n(2252),v=n(6397),m=n(5893);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){(0,l.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=(0,i.useRef)(null),o=(0,i.useState)(e),a=o[0],u=o[1];return(0,i.useEffect)((function(){var e=(null===t||void 0===t?void 0:t.current)||t||document.body;r.current=r.current||document.createElement("div");var o=(null===n||void 0===n?void 0:n.mask)&&"mask";n.containerCssText&&(r.current.style.cssText=n.containerCssText),r.current.className=(0,p.k)(["xl-loading-container",o,n.className]);var i=(0,v.NH)(r.current,"click",(function(e){n.maskClose&&u(!1)}));return a?(f.render((0,m.jsx)(d.Z,b({},n)),r.current),e.appendChild(r.current)):(f.unmountComponentAtNode(r.current),e.contains(r.current)&&e.removeChild(r.current)),function(){f.unmountComponentAtNode(r.current),e.contains(r.current)&&e.removeChild(r.current),(0,v.yM)(i)}}),[n,a,t]),[a,u]},g=n(4298),x=n(1742);n(7732);function w(e){var t=e.language,n=e.onSubmit,a=e.style,s=e.defaultCode,l=e.theme,d=e.submitLabel,f=e.children,p=e.enableMinimap,v=(0,i.useRef)(null),h=y(!1,v,{containerCssText:"position:absolute;width:100%;height:100%",mask:!0,size:"5em",maskClose:!1,labelSize:"1.5em",label:"\u7f16\u8f91\u5668\u52a0\u8f7d\u4e2d..."}),b=(0,o.Z)(h,2),w=(b[0],b[1]);function O(){return j.apply(this,arguments)}function j(){return(j=(0,r.Z)(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,window.require.config({paths:{vs:"/monacoEditor/min/vs"}}),window.require(["vs/editor/editor.main"],(function(){document.getElementById("xl-monaco").innerHTML="",window.monacoEditorModel=window.monaco.editor.create(document.getElementById("xl-monaco"),{value:s,automaticLayout:!0,language:t,minimap:{enabled:p},theme:l})})),e.next=12;break;case 5:return e.prev=5,e.t0=e.catch(0),e.next=9,(0,x._v)(1e3);case 9:return e.next=11,O();case 11:return e.abrupt("return",e.sent);case 12:case"end":return e.stop()}}),e,null,[[0,5]])})))).apply(this,arguments)}(0,i.useEffect)((0,r.Z)(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(!0),e.next=3,O();case 3:w(!1);case 4:case"end":return e.stop()}}),e)}))),[]),(0,i.useEffect)((function(){var e;null!==(e=window.monaco)&&void 0!==e&&e.editor&&window.monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0],t)}),[t]);return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c.default,{children:(0,m.jsx)("link",{rel:"stylesheet","data-name":"vs/editor/editor.main",href:"/monacoEditor/min/vs/editor/editor.main.css"})}),(0,m.jsx)(g.default,{src:"/monacoEditor/min/vs/loader.js",strategy:"beforeInteractive"}),(0,m.jsx)("div",{className:"xl-monaco-editor-container",style:a,ref:v,children:(0,m.jsx)("div",{id:"xl-monaco"})}),(0,m.jsxs)("div",{className:"xl-editor-buttons",children:[(0,m.jsx)("button",{type:"button",onClick:function(e){var t=window.monacoEditorModel.getValue();null===n||void 0===n||n(t)},children:d}),(0,m.jsx)("button",{type:"button",onClick:function(){window.monacoEditorModel.setValue("")},children:"clear"}),f]})]})}w.defaultProps={language:"javascript",onSubmit:null,style:null,defaultCode:"",theme:"vs-light",submitLabel:"ok",enableMinimap:!0};var O=w,j=n(8031);n(7702);function k(){var e=(0,i.useState)(""),t=e[0],n=e[1],a=(0,i.useRef)(null),s=y(!1,a,{containerCssText:"position:relative",labelSize:"20px",label:"running..."}),l=(0,o.Z)(s,2),d=(l[0],l[1]),f=function(){var e=(0,r.Z)(u().mark((function e(t){var r,o;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),e.prev=1,e.next=4,(0,j.O)(t);case 4:(r=e.sent).success?(o="",r.data.map((function(e){o+=e+"<br>"})),n(o)):n(r.msg),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),n(e.t0.toString());case 11:d(!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c.default,{children:(0,m.jsx)("title",{children:"JS\u6d4b\u8bd5"})}),(0,m.jsx)("h1",{className:"xl-js-editor-title",children:"\u5728\u7ebf\u8fd0\u884cjs"}),(0,m.jsx)(O,{language:"javascript",style:{height:"50vh"},submitLabel:"Run",defaultCode:"function add(a,b){\n    return a+b\n}\nconsole.log('this is a test',add(1,2))",onSubmit:f}),(0,m.jsx)("div",{ref:a,className:"xl-js-editor-output",dangerouslySetInnerHTML:{__html:t}})]})}k.layout=s.uy;var _=k},8031:function(e,t,n){"use strict";n.d(t,{O:function(){return i}});var r=n(5861),o=n(7757),a=n.n(o),u=n(8222);function i(e){return c.apply(this,arguments)}function c(){return(c=(0,r.Z)(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.v_)("/runScript",{script:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},6397:function(e,t,n){"use strict";n.d(t,{NH:function(){return u},yM:function(){return i}});var r=n(7549),o=n(2252),a=new Map;function u(e,t,n){if(!e||!t||!(0,r.mf)(n))return null;var o=a.get(e);if(o){var u=o.get(t);if(u){if(u.callbacks.includes(n))return s(),{dom:e,event:t,callbackIndex:u.callbacks.indexOf(n)};var i=u.callbacks.push(n);return s(),{dom:e,event:t,callbackIndex:i-1}}return o.set(t,{callbacks:[n]}),s(),{dom:e,event:t,callbackIndex:0}}var c=new Map;return c.set(t,{callbacks:[n]}),a.set(e,c),s(),{dom:e,event:t,callbackIndex:0}}function i(e){return null!==e&&void 0!==e&&e.dom?c(e.dom,e.event,e.callbackIndex):null}function c(e,t,n){if(!e)return null;var u=a.get(e);if(!u)return null;if(!t)return u.forEach((function(t,n){(0,o.S1)(e,n,t.wrapperFun),delete t.wrapperFun,u.delete(n)})),a.delete(e),{dom:e};var i=u.get(t);if(!i)return null;if(null===n||void 0===n)return(0,o.S1)(e,t,i.wrapperFun),delete i.wrapperFun,u.delete(t),u.size<1&&c(e),{dom:e,event:t};var s=(0,r.hj)(n)?n:i.callbacks.findIndex((function(e){return e===n}));if(s<0)return null;var l=i.callbacks.splice(s,1);return i.callbacks.length<1?c(e,t):l.length>0?{dom:e,event:t,callbackIndex:s}:null}function s(){a.forEach((function(e,t){e.forEach((function(e,n){e.wrapperFun||(e.wrapperFun=function(r){var o=this;e.callbacks.forEach((function(e){e.call(o,r,t,n)}))},(0,o.on)(t,n,e.wrapperFun))}))}))}t.ZP={addListener:u,removeListener:c,removeListenerRS:i,start:s,removeAll:function(){a.forEach((function(e,t){e.forEach((function(n,r){(0,o.S1)(t,r,n.wrapperFun),delete n.wrapperFun,e.delete(r)})),a.delete(t)}))}}},1268:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/editor",function(){return n(3834)}])},7732:function(){},7702:function(){},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[662,929,116,774,888,179],(function(){return t=1268,e(e.s=t);var t}));var t=e.O();_N_E=t}]);