(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[119],{3646:function(e,t,r){var n=r(7228);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},6860:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},319:function(e,t,r){var n=r(3646),a=r(6860),o=r(379),i=r(8206);e.exports=function(e){return n(e)||a(e)||o(e)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},9330:function(e,t,r){"use strict";r(7294);var n=r(1664),a=r(5891),o=r(1163),i=r(7549),l=(r(2878),r(5893));t.Z=function(e){var t=e.defaultPageSize,r=e.defaultCurrent,n=e.pageUrl,c=e.onChange,u=e.total,f=e.itemRender;t=t||10;var d=(u=u||t)/t>7,p=(0,o.useRouter)();return u/t>1?(0,l.jsx)(a.Z,{className:"xl-pagination",showQuickJumper:d,defaultPageSize:t,defaultCurrent:r||1,onChange:function(e,t){var r=(0,i.mf)(n)?n(e):n;r&&p.push(r),null===c||void 0===c||c(e)},itemRender:f||s(n),total:u}):null};var s=function(e){return function(t,r,a){return function(e,t,r,a){return"page"===t?(0,l.jsx)(n.default,{href:(0,i.mf)(a)?a(e):a,passHref:!0,children:(0,l.jsx)("a",{className:"xl-pagination-item",children:e})}):"prev"===t?"<":"next"===t?">":r}(t,r,a,e)}}},8e3:function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var a=((n=r(7294))&&n.__esModule?n:{default:n}).default.createContext({});t.AmpStateContext=a},5646:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=i,t.useAmp=function(){return i(a.default.useContext(o.AmpStateContext))};var n,a=(n=r(7294))&&n.__esModule?n:{default:n},o=r(8e3);function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,r=void 0!==t&&t,n=e.hybrid,a=void 0!==n&&n,o=e.hasQuery,i=void 0!==o&&o;return r||a&&i}},2717:function(e,t,r){"use strict";var n=r(9713);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=f,t.default=void 0;var o,i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r(7294)),l=(o=r(1585))&&o.__esModule?o:{default:o},s=r(8e3),c=r(5850),u=r(5646);function f(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function d(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function h(e,t){return e.reduce((function(e,t){var r=i.default.Children.toArray(t.props.children);return e.concat(r)}),[]).reduce(d,[]).reverse().concat(f(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,r=new Set,n={};return function(a){var o=!0,i=!1;if(a.key&&"number"!==typeof a.key&&a.key.indexOf("$")>0){i=!0;var l=a.key.slice(a.key.indexOf("$")+1);e.has(l)?o=!1:e.add(l)}switch(a.type){case"title":case"base":t.has(a.type)?o=!1:t.add(a.type);break;case"meta":for(var s=0,c=p.length;s<c;s++){var u=p[s];if(a.props.hasOwnProperty(u))if("charSet"===u)r.has(u)?o=!1:r.add(u);else{var f=a.props[u],d=n[u]||new Set;"name"===u&&i||!d.has(f)?(d.add(f),n[u]=d):o=!1}}}return o}}()).reverse().map((function(e,r){var o=e.key||r;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var l=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e.props||{});return l["data-href"]=l.href,l.href=void 0,l["data-optimized-fonts"]=!0,i.default.cloneElement(e,l)}return i.default.cloneElement(e,{key:o})}))}var m=function(e){var t=e.children,r=i.useContext(s.AmpStateContext),n=i.useContext(c.HeadManagerContext);return i.default.createElement(l.default,{reduceComponentsToState:h,headManager:n,inAmpMode:u.isInAmpMode(r)},t)};t.default=m},1585:function(e,t,r){"use strict";var n=r(319),a=r(4575),o=r(3913),i=(r(1506),r(2205)),l=r(8585),s=r(9754);function c(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=s(e);if(t){var a=s(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return l(this,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r(7294));var f=function(e){i(r,e);var t=c(r);function r(e){var o;return a(this,r),(o=t.call(this,e)).emitChange=function(){o._hasHeadManager&&o.props.headManager.updateHead(o.props.reduceComponentsToState(n(o.props.headManager.mountedInstances),o.props))},o._hasHeadManager=o.props.headManager&&o.props.headManager.mountedInstances,o}return o(r,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),r}(u.Component);t.default=f},2119:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSP:function(){return d}});var n=r(9008),a=(r(7201),r(7264)),o=r(7294),i=r(9330),l=r(1664),s=r(2252),c=r(5893),u=function(e){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(n.default,{children:[(0,c.jsx)("title",{children:"\u541e\u5929\u6ce1\u6ce1\u9f99\u7684\u4e3b\u9875"}),(0,c.jsx)("meta",{name:"description",content:"\u541e\u5929\u6ce1\u6ce1\u9f99\u7684\u4e3b\u9875"}),(0,c.jsx)("link",{rel:"icon",href:"/my_favicon.ico"})]}),(0,c.jsx)("main",{className:"index-main",children:(0,c.jsx)("div",{className:"xl-index-blogs",children:Array.from({length:4}).map((function(t,r){return(0,c.jsx)("div",{className:"xl-index-blogs-column",children:e.blogs.map((function(e,t){if(t%4===r)return(0,c.jsx)(f,{blog:e},e.blogId)}))},"index-blog-column-".concat(r))}))})}),(0,c.jsx)(i.Z,{defaultPageSize:e.pageSize,defaultCurrent:e.page,pageUrl:function(e){return"/p".concat(e)},total:e.total})]})};function f(e){var t=e.blog,r=(0,o.useMemo)((function(){return(Array.isArray(t.tags)?t.tags:t.tags.split(",")).map((function(e,t){if(e)return(0,c.jsx)(l.default,{passHref:!0,href:"/blog/search/p1?key=".concat((0,s.bl)(e)),children:(0,c.jsx)("a",{className:"xl-blog-tag",children:e},"tag-".concat(t))})}))}),[t.tags]),n=(0,o.useRef)(null),a=(0,o.useRef)(null);return(0,o.useEffect)((function(){var e=n.current,t=e.clientHeight,r=parseFloat(window.getComputedStyle(e).getPropertyValue("padding-bottom")),o=e.lastChild,i=parseFloat(window.getComputedStyle(o).getPropertyValue("margin-bottom")),l=t-r-o.offsetTop-o.clientHeight-i;if(l>0){var s=a.current,c=window.getComputedStyle(s),u=parseFloat(c.getPropertyValue("line-height")),f=parseFloat(c.getPropertyValue("-webkit-line-clamp"));s.style["-webkit-line-clamp"]=f+Math.floor(l/u)}}),[]),(0,c.jsxs)("div",{ref:n,className:"xl-index-blog-card",children:[(0,c.jsx)(l.default,{href:"/blog/detail/".concat(t.blogId),passHref:!0,children:(0,c.jsxs)("a",{className:"xl-blog-info",children:[(0,c.jsx)("p",{className:"xl-blog-title",children:t.title}),(0,c.jsx)("p",{className:"xl-blog-publish-time",children:new Date(t.publishTime).toLocaleDateString()}),(0,c.jsx)("img",{className:"xl-blog-cover-img",src:t.coverImg?"".concat("https://ttppl.xyz/file/id/").concat(t.coverImg):"https://ttppl.xyz/file/defaultCoverImg?t="+t.blogId,alt:"blogCoverImg"}),(0,c.jsx)("div",{ref:a,className:"xl-blog-abstract",children:t.plainText})]})}),(0,c.jsx)("div",{className:"xl-blog-card-category",children:t.category&&(0,c.jsxs)(c.Fragment,{children:["\u5206\u7c7b\uff1a",(0,c.jsx)(l.default,{passHref:!0,href:"/blog/search/p1?key=".concat((0,s.bl)(t.category)),children:(0,c.jsx)("a",{children:t.category})})]})}),r.length>1&&(0,c.jsx)("div",{className:"xl-blog-tags",children:r})]})}u.layout=a.u;var d=!0;t.default=u},2878:function(){},7201:function(){},9008:function(e,t,r){e.exports=r(2717)}}]);