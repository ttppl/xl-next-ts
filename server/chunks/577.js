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
/* unused harmony exports addBlog, modifyBlog, deleteBlog, getBlogs */
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8222);

async function addBlog(blog) {
  const res = await post(`/blog/addBlog`, blog);
  return res.data.blogId;
}
async function modifyBlog(blog) {
  return await post(`/blog/modifyBlog`, blog);
}
async function deleteBlog(id) {
  return await get(`/blog/deleteBlog/id/${id}`);
}
async function getBlogById(id) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/blog/getBlog/id/${id}`);
  return res.data;
}
async function getBlogs(userId, options) {
  return await get(`/blog/getBlogs/userId/${userId}`, options);
}
async function queryBlogs(key, options) {
  return await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/blog/getBlogs/key/${key}`, options);
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