"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3611:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_libs_setGlobalLoading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4431);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









function MyApp({
  Component,
  pageProps
}) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!("fontDisplay" in document.body.style)) {
      if ("fonts" in document) {
        document.fonts.load("1em font-xk").then(() => {
          document.documentElement.classList.add('font-xk-loaded');
        });
      }
    } else {
      document.documentElement.classList.add('font-display-supported');
    }
  }, []); // 监听路由

  next_router__WEBPACK_IMPORTED_MODULE_1__.Router.events.on('routeChangeStart', () => {
    (0,_utils_libs_setGlobalLoading__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(true);
  });
  next_router__WEBPACK_IMPORTED_MODULE_1__.Router.events.on('routeChangeComplete', () => {
    // sleep(2000).then(()=>{
    //     setGlobalLoading(false)
    // })
    (0,_utils_libs_setGlobalLoading__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(false);
  });
  next_router__WEBPACK_IMPORTED_MODULE_1__.Router.events.on('routeChangeError', () => {
    (0,_utils_libs_setGlobalLoading__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(false);
  }); // return <Component {...pageProps} />

  const layout = Component.layout || ((page, props) => page);

  return layout( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(Component, _objectSpread({}, pageProps)), pageProps === null || pageProps === void 0 ? void 0 : pageProps.layoutProps);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [431], () => (__webpack_exec__(3611)));
module.exports = __webpack_exports__;

})();