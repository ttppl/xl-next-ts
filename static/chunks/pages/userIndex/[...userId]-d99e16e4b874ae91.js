(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[602],{3646:function(e,t,n){var r=n(7228);e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.default=e.exports,e.exports.__esModule=!0},6860:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},319:function(e,t,n){var r=n(3646),a=n(6860),o=n(379),c=n(8206);e.exports=function(e){return r(e)||a(e)||o(e)||c()},e.exports.default=e.exports,e.exports.__esModule=!0},6889:function(e,t,n){"use strict";n(2689);var r=n(1664),a=n(7294),o=n(1163),c=n(5893),u=function(e){o.default.push("/blog/detail/".concat(e))};function i(e){var t=e.name,n=e.color;return(0,c.jsx)("div",{className:"xl-blog-tag",style:n,children:t})}t.Z=function(e){var t,n=e.blog,o=e.openBlank,l=e.style,s=e.className,d=(0,a.useMemo)((function(){return(Array.isArray(n.tags)?n.tags:n.tags.split(",")).map((function(e,t){if(e)return(0,c.jsx)(i,{name:e},"tag-".concat(t))}))}),[n.tags]);return(0,c.jsxs)("article",{className:"xl-blog-card ".concat(s||""),style:l,children:[(0,c.jsx)("h1",{className:"xl-blog-card-title",children:(0,c.jsx)(r.default,{href:"/blog/detail/".concat(n.blogId),passHref:!0,children:(0,c.jsx)("a",{rel:"noreferrer",onClick:function(){u(n.blogId)},target:o?"_blank":"_self",children:n.title})})}),(0,c.jsx)("p",{className:"xl-blog-card-content",onClick:function(){u(n.blogId)},children:null===(t=n.plainText)||void 0===t?void 0:t.replace(/[\r\n]/g,"")}),(0,c.jsxs)("footer",{className:"xl-blog-card-footer",children:[(0,c.jsx)("span",{className:"xl-blog-card-publish-date",children:new Date(n.publishTime).toLocaleDateString()}),n.category&&(0,c.jsxs)("span",{className:"xl-blog-card-category",children:["\u5206\u7c7b\uff1a",n.category]}),(0,c.jsx)("span",{children:d})]})]},"index-blog-".concat(n.blogId))}},8e3:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var a=((r=n(7294))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=a},5646:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=c,t.useAmp=function(){return c(a.default.useContext(o.AmpStateContext))};var r,a=(r=n(7294))&&r.__esModule?r:{default:r},o=n(8e3);function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,a=void 0!==r&&r,o=e.hasQuery,c=void 0!==o&&o;return n||a&&c}},2717:function(e,t,n){"use strict";var r=n(9713);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var o,c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(7294)),u=(o=n(1585))&&o.__esModule?o:{default:o},i=n(8e3),l=n(5850),s=n(5646);function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[c.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(c.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===c.default.Fragment?e.concat(c.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function h(e,t){return e.reduce((function(e,t){var n=c.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(f,[]).reverse().concat(d(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(a){var o=!0,c=!1;if(a.key&&"number"!==typeof a.key&&a.key.indexOf("$")>0){c=!0;var u=a.key.slice(a.key.indexOf("$")+1);e.has(u)?o=!1:e.add(u)}switch(a.type){case"title":case"base":t.has(a.type)?o=!1:t.add(a.type);break;case"meta":for(var i=0,l=p.length;i<l;i++){var s=p[i];if(a.props.hasOwnProperty(s))if("charSet"===s)n.has(s)?o=!1:n.add(s);else{var d=a.props[s],f=r[s]||new Set;"name"===s&&c||!f.has(d)?(f.add(d),r[s]=f):o=!1}}}return o}}()).reverse().map((function(e,n){var o=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var u=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.props||{});return u["data-href"]=u.href,u.href=void 0,u["data-optimized-fonts"]=!0,c.default.cloneElement(e,u)}return c.default.cloneElement(e,{key:o})}))}var v=function(e){var t=e.children,n=c.useContext(i.AmpStateContext),r=c.useContext(l.HeadManagerContext);return c.default.createElement(u.default,{reduceComponentsToState:h,headManager:r,inAmpMode:s.isInAmpMode(n)},t)};t.default=v},1585:function(e,t,n){"use strict";var r=n(319),a=n(4575),o=n(3913),c=(n(1506),n(2205)),u=n(8585),i=n(9754);function l(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=i(e);if(t){var a=i(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return u(this,n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(7294));var d=function(e){c(n,e);var t=l(n);function n(e){var o;return a(this,n),(o=t.call(this,e)).emitChange=function(){o._hasHeadManager&&o.props.headManager.updateHead(o.props.reduceComponentsToState(r(o.props.headManager.mountedInstances),o.props))},o._hasHeadManager=o.props.headManager&&o.props.headManager.mountedInstances,o}return o(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(s.Component);t.default=d},6068:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSP:function(){return w},default:function(){return j}});var r=n(1451),a=n(5861),o=n(7757),c=n.n(o),u=n(9008),i=(n(7201),n(7264)),l=n(8222);function s(){return d.apply(this,arguments)}function d(){return(d=(0,a.Z)(c().mark((function e(){var t,n,r,a=arguments;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:"newest",n=a.length>1&&void 0!==a[1]?a[1]:1,r=a.length>2&&void 0!==a[2]?a[2]:10,e.next=5,(0,l.U2)("/blog/getBlogs/type/".concat(t),{page:n,pageSize:r});case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var f=n(7294),p=n(3084),h=n(6889),v=n(6397),m=n(6486),y=n.n(m),b=n(1163),g=n(5893),x=function(e){var t=(0,f.useState)(e.blogs),n=t[0],o=t[1],i=(0,f.useRef)(1),l=(0,f.useState)(!0),d=l[0],m=l[1],x=(0,f.useState)(!1),w=x[0],j=x[1],_=(0,f.useRef)(null);(0,f.useEffect)((function(){var e=y().debounce((0,a.Z)(c().mark((function e(){var a,u,l,d;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=document.body.scrollHeight,u=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,l=document.body.clientHeight,!(a-u<l+1)){e.next=14;break}return console.log("loading more blogs"),(0,v.yM)(t),m(!0),i.current++,m(!0),e.next=11,s("newest",i.current);case 11:(d=e.sent).data.length<1?(j(!0),(0,v.yM)(t)):o([].concat((0,r.Z)(n),(0,r.Z)(d.data))),m(!1);case 14:case"end":return e.stop()}}),e)}))),500),t=(0,v.NH)(document,"scroll",e);return function(){(0,v.yM)(t)}}),[n]);(0,b.useRouter)();return(0,g.jsxs)("div",{className:"container",children:[(0,g.jsxs)(u.default,{children:[(0,g.jsx)("title",{children:"\u541e\u5929\u6ce1\u6ce1\u9f99\u7684\u4e3b\u9875"}),(0,g.jsx)("meta",{name:"description",content:"\u541e\u5929\u6ce1\u6ce1\u9f99\u7684\u4e3b\u9875"}),(0,g.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,g.jsx)("link",{rel:"icon",href:"/my_favicon.ico"})]}),(0,g.jsxs)("main",{className:"main",ref:_,id:"main",children:[n.map((function(e){return(0,g.jsx)(h.Z,{openBlank:!0,blog:e},e.blogId)})),d&&(0,g.jsx)(p.Z,{children:"\u73a9\u547d\u52a0\u8f7d\u4e2d..."}),w&&(0,g.jsx)("p",{children:"\u6728\u6709\u4e86\u5462..."})]})]})};x.layout=i.u;var w=!0,j=x},6397:function(e,t,n){"use strict";n.d(t,{NH:function(){return c},yM:function(){return u}});var r=n(7549),a=n(2252),o=new Map;function c(e,t,n){if(!e||!t||!(0,r.mf)(n))return null;var a=o.get(e);if(a){var c=a.get(t);if(c){if(c.callbacks.includes(n))return l(),{dom:e,event:t,callbackIndex:c.callbacks.indexOf(n)};var u=c.callbacks.push(n);return l(),{dom:e,event:t,callbackIndex:u-1}}return a.set(t,{callbacks:[n]}),l(),{dom:e,event:t,callbackIndex:0}}var i=new Map;return i.set(t,{callbacks:[n]}),o.set(e,i),l(),{dom:e,event:t,callbackIndex:0}}function u(e){return null!==e&&void 0!==e&&e.dom?i(e.dom,e.event,e.callbackIndex):null}function i(e,t,n){if(!e)return null;var c=o.get(e);if(!c)return null;if(!t)return c.forEach((function(t,n){(0,a.S1)(e,n,t.wrapperFun),delete t.wrapperFun,c.delete(n)})),o.delete(e),{dom:e};var u=c.get(t);if(!u)return null;if(null===n||void 0===n)return(0,a.S1)(e,t,u.wrapperFun),delete u.wrapperFun,c.delete(t),c.size<1&&i(e),{dom:e,event:t};var l=(0,r.hj)(n)?n:u.callbacks.findIndex((function(e){return e===n}));if(l<0)return null;var s=u.callbacks.splice(l,1);return u.callbacks.length<1?i(e,t):s.length>0?{dom:e,event:t,callbackIndex:l}:null}function l(){o.forEach((function(e,t){e.forEach((function(e,n){e.wrapperFun||(e.wrapperFun=function(r){var a=this;e.callbacks.forEach((function(e){e.call(a,r,t,n)}))},(0,a.on)(t,n,e.wrapperFun))}))}))}t.ZP={addListener:c,removeListener:i,removeListenerRS:u,start:l,removeAll:function(){o.forEach((function(e,t){e.forEach((function(n,r){(0,a.S1)(t,r,n.wrapperFun),delete n.wrapperFun,e.delete(r)})),o.delete(t)}))}}},4094:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/userIndex/[...userId]",function(){return n(6068)}])},2689:function(){},7201:function(){},9008:function(e,t,n){e.exports=n(2717)},1451:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(907);var a=n(181);function o(e){return function(e){if(Array.isArray(e))return(0,r.Z)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,a.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}},function(e){e.O(0,[662,929,116,774,888,179],(function(){return t=4094,e(e.s=t);var t}));var t=e.O();_N_E=t}]);