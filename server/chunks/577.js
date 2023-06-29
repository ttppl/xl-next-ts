"use strict";
exports.id = 577;
exports.ids = [577];
exports.modules = {

/***/ 5577:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zv": () => (/* binding */ getBlogById),
/* harmony export */   "_j": () => (/* binding */ queryBlogs),
/* harmony export */   "Wj": () => (/* binding */ getBlogsByType),
/* harmony export */   "M0": () => (/* binding */ getBlogsByCategory)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(480);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


async function getBlogById(id) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/blog/getBlog/id/${id}`);
  return res.data;
} // export async function getBlogs(userId:number,options?:{key:string,page:number,pageSize:number,orderBy:string}) {
//     return await get(`/blog/getBlogs/userId/${userId}`,options)
// }

async function queryBlogs(key, options) {
  return await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/blog/getBlogList`, _objectSpread({
    key
  }, options));
}
async function getBlogsByType(type = 'newest', page = 1, pageSize = 10) {
  return await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/blog/getBlogs/type/${type}`, {
    page,
    pageSize
  });
}
async function getBlogsByCategory(categoryId, containsChildren, page = 1, pageSize = 10) {
  return await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/blog/getBlogs/category/${categoryId}`, {
    children: containsChildren,
    page,
    pageSize
  });
}

/***/ })

};
;