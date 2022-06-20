"use strict";
(() => {
var exports = {};
exports.id = 650;
exports.ids = [650,405,839];
exports.modules = {

/***/ 3367:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_layouts_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7264);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6047);
/* harmony import */ var _request_modules_blogRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5577);
/* harmony import */ var _components_common_BlogCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6889);
/* harmony import */ var _components_common_XlPagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9330);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2252);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);








 //query:/key/:p1/:t1



const getServerSideProps = async ({
  req,
  query
}) => {
  var _query$all$;

  // console.log(query)
  const key = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_7__/* .decryptUrl */ .yt)(query.key || '');
  const page = ((_query$all$ = query.all[0]) === null || _query$all$ === void 0 ? void 0 : _query$all$.slice(1)) || 1;
  const pageSize = 10;
  const blogRes = await (0,_request_modules_blogRequest__WEBPACK_IMPORTED_MODULE_3__/* .queryBlogs */ ._j)(key, {
    page,
    pageSize
  });
  return {
    props: {
      keyWord: key,
      page,
      pageSize,
      blogs: blogRes.data || [],
      total: blogRes.total || 0
    }
  };
};
Search.layout = _components_layouts_main__WEBPACK_IMPORTED_MODULE_0__/* .getDefaultLayout */ .uy;

function Search(props) {
  const {
    0: key,
    1: setKey
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.keyWord);
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();

  const search = e => {
    e.preventDefault();
    router.push(`/blog/search/p1?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_7__/* .encryptUrl */ .bl)(key)}`);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "xl-blog-search-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("form", {
      action: "/blog/search",
      className: "xl-search-input",
      method: "get",
      onSubmit: search // action={`/blog/search/p1`}
      ,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("input", {
        name: "key",
        value: key,
        onChange: e => setKey(e.target.value)
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("button", {
        type: "submit",
        className: "xl-search-button",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
          className: "search"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "xl-blog-search-blog-list",
      children: [props.blogs.length > 0 ? props.blogs.map((blog, index) => {
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_components_common_BlogCard__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
          className: `blog-card-index-${index}`,
          openBlank: false,
          style: {
            width: '50vw'
          },
          blog: blog
        }, blog.blogId);
      }) : '木有呢！！！', props.total / props.pageSize > 1 && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_components_common_XlPagination__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
        defaultPageSize: props.pageSize,
        defaultCurrent: props.page,
        pageUrl: page => `/blog/search/p${page}?key=${key}`,
        total: props.total
      })]
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

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

/***/ 3006:
/***/ ((module) => {

module.exports = require("rc-pagination");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [400,664,431,264,47,330,577,889], () => (__webpack_exec__(3367)));
module.exports = __webpack_exports__;

})();