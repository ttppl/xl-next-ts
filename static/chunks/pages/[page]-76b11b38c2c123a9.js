(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[358],{6047:function(e,n,t){"use strict";var r=t(4942),l=t(1451),a=t(5697),c=t.n(a),i=(t(9919),t(7294)),s=t(2252),o=t(5893);function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){(0,r.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var f=function(e,n){var t=(0,i.useMemo)((function(){var n=e.className.split(" ");return(0,s.ll)(["xl-iconfont","xl-icon-".concat(n[0])].concat((0,l.Z)(n.slice(1,n.length))))}),[e.className]),r=(0,i.useMemo)((function(){var n=d({},e.style);return e.size&&(n.fontSize="".concat(e.size,"px")),e.onClick&&(n.cursor="pointer"),n.color=e.color,n}),[e.style,e.size,e.onClick]);return(0,o.jsx)("i",d(d({ref:n},e),{},{className:t,onClick:e.onClick,title:e.title,style:r,children:e.children}))},g=(0,i.forwardRef)(f);g.propTypes={className:c().string,style:c().object,color:c().string,size:c().number,title:c().string,onClick:c().func},g.defaultProps={className:"",size:20,color:""},n.Z=g},9330:function(e,n,t){"use strict";t(7294);var r=t(1664),l=t(5891),a=t(1163),c=t(7549),i=(t(2878),t(5893));n.Z=function(e){var n=e.defaultPageSize,t=e.defaultCurrent,r=e.pageUrl,o=e.onChange,u=e.total,d=e.itemRender;n=n||10;var f=(u=u||n)/n>7,g=(0,a.useRouter)();return u/n>1?(0,i.jsx)(l.Z,{className:"xl-pagination",showQuickJumper:f,defaultPageSize:n,defaultCurrent:t||1,onChange:function(e,n){var t=(0,c.mf)(r)?r(e):r;t&&g.push(t),null===o||void 0===o||o(e)},itemRender:d||s(r),total:u}):null};var s=function(e){return function(n,t,l){return function(e,n,t,l){return"page"===n?(0,i.jsx)(r.default,{href:(0,c.mf)(l)?l(e):l,passHref:!0,children:(0,i.jsx)("a",{className:"xl-pagination-item",children:e})}):"prev"===n?"<":"next"===n?">":t}(n,t,l,e)}}},7369:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSP:function(){return l}});t(7201);var r=t(2119),l=!0;n.default=r.default},2119:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSP:function(){return m}});var r=t(91),l=t(9008),a=(t(7201),t(7264)),c=t(7294),i=t(9330),s=t(1664),o=t(2252),u=t(7549),d=t(6047),f=t(5893),g=["blogs","user"],m=!0,x=function(e){var n,t,a,c,s,o=e.blogs,u=e.user,m=(0,r.Z)(e,g);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(l.default,{children:[(0,f.jsx)("title",{children:"\u541e\u5929\u6ce1\u6ce1\u9f99\u7684\u4e3b\u9875"}),(0,f.jsx)("meta",{name:"description",content:"\u541e\u5929\u6ce1\u6ce1\u9f99\u7684\u4e3b\u9875"}),(0,f.jsx)("link",{rel:"icon",href:"/my_favicon.ico"})]}),(0,f.jsxs)("main",{className:"index-main",children:[(0,f.jsx)("div",{className:"xl-user-info",children:(0,f.jsxs)("div",{className:"xl-user-main",children:[(0,f.jsx)("img",{className:"xl-user-avatar",src:u.avatar}),(0,f.jsx)("p",{className:"xl-user-nickname",children:null===(n=u.detailInfo)||void 0===n?void 0:n.nickname}),(0,f.jsx)("p",{className:"xl-user-introduction",children:null===(t=u.detailInfo)||void 0===t?void 0:t.introduction}),(0,f.jsx)("div",{className:"xl-user-contact",children:null===(a=u.detailInfo)||void 0===a?void 0:a.contact.map((function(e){return(0,f.jsx)(d.Z,{size:30,className:e.name,title:e.value},e.name)}))})]})}),(0,f.jsx)("div",{className:"xl-index-blogs",children:Array.from({length:3}).map((function(e,n){return(0,f.jsx)("div",{className:"xl-index-blogs-column",children:o.map((function(e,t){if(t%3===n)return(0,f.jsx)(p,{blog:e},e.blogId)}))},"index-blog-column-".concat(n))}))}),(0,f.jsx)("div",{className:"xl-index-right-side",children:null===(c=u.detailInfo)||void 0===c||null===(s=c.blogIndexRightSide)||void 0===s?void 0:s.map((function(e){return(0,f.jsxs)("div",{className:"xl-rank-card",children:[(0,f.jsx)("p",{className:"xl-rank-card-title",children:(0,f.jsx)("span",{children:e.title})}),(0,f.jsx)("p",{children:e.content})]},e.title)}))})]}),(0,f.jsx)(i.Z,{defaultPageSize:m.pageSize,defaultCurrent:m.page,pageUrl:function(e){return"/p".concat(e)},total:m.total})]})};function p(e){var n=e.blog,t=(0,c.useMemo)((function(){return(n.tags||[]).map((function(e,n){if(e)return(0,f.jsx)(s.default,{passHref:!0,href:"/blog/search/p1?key=".concat((0,o.bl)(e.tagName)),children:(0,f.jsx)("a",{className:"xl-blog-tag",children:e.tagName},"tag-".concat(n))},"tag-".concat(e.tagId))}))}),[n.tags]),r=(0,c.useRef)(null),l=(0,c.useRef)(null);return(0,f.jsxs)("div",{ref:r,className:"xl-index-blog-card",children:[(0,f.jsx)(s.default,{href:"/blog/detail/".concat(n.blogId),passHref:!0,children:(0,f.jsxs)("a",{className:"xl-blog-info",children:[(0,f.jsx)("p",{className:"xl-blog-title",children:n.title}),(0,f.jsx)("p",{className:"xl-blog-publish-time",children:new Date(n.publishTime).toLocaleDateString()}),n.coverImg&&(0,f.jsx)("img",{className:"xl-blog-cover-img",src:(0,u.e9)(n.coverImg)?"".concat("https://ttppl.xyz/file/id/").concat(n.coverImg):n.coverImg,alt:"blogCoverImg"}),(0,f.jsx)("div",{ref:l,className:"xl-blog-abstract",children:n.plainText})]})}),(0,f.jsx)("div",{className:"xl-blog-card-category",children:n.category&&(0,f.jsxs)(f.Fragment,{children:["\u5206\u7c7b\uff1a",(0,f.jsx)(s.default,{passHref:!0,href:"/blog/search/p1?key=".concat((0,o.bl)(n.category.map((function(e){return e.categoryId})).join(","))),children:(0,f.jsx)("a",{children:n.category.map((function(e){return e.categoryName})).join("/")})})]})}),t.length>1&&(0,f.jsx)("div",{className:"xl-blog-tags",children:t})]})}x.layout=a.uy,n.default=x},5868:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[page]",function(){return t(7369)}])},9919:function(){},2878:function(){},7201:function(){},91:function(e,n,t){"use strict";function r(e,n){if(null==e)return{};var t,r,l=function(e,n){if(null==e)return{};var t,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}t.d(n,{Z:function(){return r}})}},function(e){e.O(0,[662,878,577,116,774,888,179],(function(){return n=5868,e(e.s=n);var n}));var n=e.O();_N_E=n}]);