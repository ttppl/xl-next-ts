"use strict";
(() => {
var exports = {};
exports.id = 602;
exports.ids = [602,839];
exports.modules = {

/***/ 4548:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layouts_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7264);
/* harmony import */ var _request_modules_blogRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5577);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_common_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3084);
/* harmony import */ var _components_common_BlogCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6889);
/* harmony import */ var _utils_libs_EventManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6397);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);




 // @ts-ignore








async function getServerSideProps(context) {
  const res = await (0,_request_modules_blogRequest__WEBPACK_IMPORTED_MODULE_2__/* .getBlogsByType */ .Wj)();
  return {
    props: {
      blogs: res.data
    }
  };
}

const Home = props => {
  const {
    0: blogs,
    1: setBlogs
  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(props.blogs);
  const page = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(1);
  const {
    0: loadingMore,
    1: setLoadingMore
  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
  const {
    0: noMore,
    1: setNoMore
  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const main = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const getMore = lodash__WEBPACK_IMPORTED_MODULE_7___default().debounce(async () => {
      const scrollHeight = document.body.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      const clientHeight = document.body.clientHeight;

      if (scrollHeight - scrollTop < clientHeight + 1) {
        console.log('loading more blogs');
        (0,_utils_libs_EventManager__WEBPACK_IMPORTED_MODULE_6__/* .removeListenerRS */ .yM)(scrollEvent);
        setLoadingMore(true);
        page.current++;
        setLoadingMore(true);
        const res = await (0,_request_modules_blogRequest__WEBPACK_IMPORTED_MODULE_2__/* .getBlogsByType */ .Wj)('newest', page.current);

        if (res.data.length < 1) {
          // window.sessionStorage.setItem('indexBlogs',
          //     JSON.stringify([...JSON.parse(window.sessionStorage.get('indexBlogs')),...res.data]))
          // window.sessionStorage.setItem('indexBlogsPage',page.current.toString())
          setNoMore(true);
          (0,_utils_libs_EventManager__WEBPACK_IMPORTED_MODULE_6__/* .removeListenerRS */ .yM)(scrollEvent);
        } else {
          setBlogs([...blogs, ...res.data]);
        }

        setLoadingMore(false);
      }
    }, 500);
    const scrollEvent = (0,_utils_libs_EventManager__WEBPACK_IMPORTED_MODULE_6__/* .addListener */ .NH)(document, 'scroll', getMore);
    return () => {
      (0,_utils_libs_EventManager__WEBPACK_IMPORTED_MODULE_6__/* .removeListenerRS */ .yM)(scrollEvent);
    };
  }, [blogs]);
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)(); // useEffect(()=>{
  //     router.beforePopState(({ url, as, options }) => {
  //         // I only want to allow these two routes!
  //         console.log(url,as,options)
  //         // setBlogs([{},{},{},{},{},{},{},{},{},{},{},{}])
  //         options.scroll=false
  //         // options.shallow=true
  //         // setBlogs([...blogs, ...JSON.parse(window.sessionStorage.getItem('indexBlogs')||'[]')])
  //         // page.current = parseFloat(window.sessionStorage.getItem('indexBlogsPage')||'1')
  //         return true
  //     })
  // }, [])

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_0___default()), {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("title", {
        children: "\u541E\u5929\u6CE1\u6CE1\u9F99\u7684\u4E3B\u9875"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("meta", {
        name: "description",
        content: "\u541E\u5929\u6CE1\u6CE1\u9F99\u7684\u4E3B\u9875"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("link", {
        rel: "icon",
        href: "/my_favicon.ico"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("main", {
      className: "main",
      ref: main,
      id: "main",
      children: [blogs.map(blog => {
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_common_BlogCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
          openBlank: true,
          blog: blog
        }, blog.blogId);
      }), loadingMore && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_common_Loading__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        children: "\u73A9\u547D\u52A0\u8F7D\u4E2D..."
      }), noMore && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
        children: "\u6728\u6709\u4E86\u5462..."
      })]
    })]
  });
};

Home.layout = _components_layouts_main__WEBPACK_IMPORTED_MODULE_1__/* .getDefaultLayout */ .uy;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);

/***/ }),

/***/ 871:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 6517:
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 4780:
/***/ ((module) => {

module.exports = require("next/script");

/***/ }),

/***/ 580:
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ 805:
/***/ ((module) => {

module.exports = require("rc-message");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [400,664,431,264,397,410], () => (__webpack_exec__(4548)));
module.exports = __webpack_exports__;

})();