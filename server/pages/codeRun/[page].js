"use strict";
(() => {
var exports = {};
exports.id = 16;
exports.ids = [16,362,405,839];
exports.modules = {

/***/ 811:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3939);
/* harmony import */ var _request_modules_codeRunRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3229);


async function getServerSideProps({
  query
}) {
  var _query$page, _query$page$slice;

  const pageSize = 12;
  const page = parseFloat((_query$page = query.page) === null || _query$page === void 0 ? void 0 : (_query$page$slice = _query$page.slice) === null || _query$page$slice === void 0 ? void 0 : _query$page$slice.call(_query$page, 1)) || 1;
  const codeRunList = await (0,_request_modules_codeRunRequest__WEBPACK_IMPORTED_MODULE_1__/* .getCodeRunList */ .c)({
    type: ['EXAMPLE', 'UTILS'],
    pageSize,
    page
  });
  return {
    props: {
      total: codeRunList.total,
      page: 1,
      pageSize,
      codeRunList: codeRunList.data
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_index__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ 871:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 4071:
/***/ ((module) => {

module.exports = require("clipboard");

/***/ }),

/***/ 6517:
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ 3908:
/***/ ((module) => {

module.exports = require("lodash/debounce");

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [400,664,431,264,47,330,397,939], () => (__webpack_exec__(811)));
module.exports = __webpack_exports__;

})();