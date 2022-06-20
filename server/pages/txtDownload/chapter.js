"use strict";
(() => {
var exports = {};
exports.id = 208;
exports.ids = [208,839];
exports.modules = {

/***/ 4174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2252);
/* harmony import */ var _request_modules_txtDownloadRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7733);
/* harmony import */ var _components_layouts_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7264);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);







async function getServerSideProps({
  query
}) {
  const url = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .decryptUrl */ .yt)(query.key);
  const chapterInfo = await (0,_request_modules_txtDownloadRequest__WEBPACK_IMPORTED_MODULE_1__/* .getChapter */ .bR)(url);
  return {
    props: {
      chapterInfo
    }
  };
}

function TxtChapterDetail({
  chapterInfo
}) {
  var _chapterInfo$content;

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "xl-chapter-main",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
      className: "xl-chapter-title",
      children: chapterInfo.name
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "xl-pre-next-chapter",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_3__["default"], {
        href: `/txtDownload/chapter?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .encryptUrl */ .bl)(chapterInfo.pre)}`,
        children: "\u4E0A\u4E00\u7AE0"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_3__["default"], {
        href: `/txtDownload/detail?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .encryptUrl */ .bl)(chapterInfo.bookInfo)}`,
        children: "\u76EE\u5F55"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_3__["default"], {
        href: `/txtDownload/chapter?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .encryptUrl */ .bl)(chapterInfo.next)}`,
        children: "\u4E0B\u4E00\u7AE0"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
      className: "xl-chapter-content",
      children: (_chapterInfo$content = chapterInfo.content) === null || _chapterInfo$content === void 0 ? void 0 : _chapterInfo$content.replace(/\n\n/g, '\n')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "xl-pre-next-chapter",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_3__["default"], {
        href: `/txtDownload/chapter?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .encryptUrl */ .bl)(chapterInfo.pre)}`,
        children: "\u4E0A\u4E00\u7AE0"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_3__["default"], {
        href: `/txtDownload/detail?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .encryptUrl */ .bl)(chapterInfo.bookInfo)}`,
        children: "\u76EE\u5F55"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_3__["default"], {
        href: `/txtDownload/chapter?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .encryptUrl */ .bl)(chapterInfo.next)}`,
        children: "\u4E0B\u4E00\u7AE0"
      })]
    })]
  });
}

TxtChapterDetail.layout = _components_layouts_main__WEBPACK_IMPORTED_MODULE_2__/* .getDefaultLayout */ .uy;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TxtChapterDetail);

/***/ }),

/***/ 7733:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "yC": () => (/* binding */ search),
/* harmony export */   "RR": () => (/* binding */ getTxtInfo),
/* harmony export */   "bR": () => (/* binding */ getChapter)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8222);

async function search(key) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/txtDownload/search`, {
    key
  });
  return res.data;
}
async function getTxtInfo(url) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/txtDownload/getTxtInfo`, {
    url
  });
  return res.data;
}
async function getChapter(url) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/txtDownload/getTxtChapter`, {
    url
  });
  return res.data || {
    content: '小小爬虫怠工了！'
  };
}

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
var __webpack_exports__ = __webpack_require__.X(0, [400,664,431,264], () => (__webpack_exec__(4174)));
module.exports = __webpack_exports__;

})();