"use strict";
(() => {
var exports = {};
exports.id = 71;
exports.ids = [71];
exports.modules = {

/***/ 6459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ logoutUser)
/* harmony export */ });
/* harmony import */ var _utils_libs_cookieParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8678);

async function logoutUser(req, res) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  res.setHeader('Set-Cookie', // [`xl-next-login-token=;path=/;expires=${exp.toGMTString()}`]
  [(0,_utils_libs_cookieParser__WEBPACK_IMPORTED_MODULE_0__/* .createCookie */ .pC)('xl-next-login-token', '', {
    path: '/',
    expires: -1
  }), (0,_utils_libs_cookieParser__WEBPACK_IMPORTED_MODULE_0__/* .createCookie */ .pC)('user', '', {
    expires: -1
  })]);
  res.redirect(307, '/management');
}

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [678], () => (__webpack_exec__(6459)));
module.exports = __webpack_exports__;

})();