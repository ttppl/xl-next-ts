"use strict";
exports.id = 889;
exports.ids = [889];
exports.modules = {

/***/ 6889:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1664);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);







const showDetail = id => {
  next_router__WEBPACK_IMPORTED_MODULE_2___default().push(`/blog/detail/${id}`);
};

function Tag({
  name,
  color
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
    className: "xl-blog-tag",
    style: color,
    children: name
  });
}

function BlogCard({
  blog,
  openBlank,
  style,
  className
}) {
  var _blog$plainText;

  const tags = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const blogTags = Array.isArray(blog.tags) ? blog.tags : blog.tags.split(',');
    return blogTags.map((tag, index) => {
      if (tag) return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(Tag, {
        name: tag
      }, `tag-${index}`);
    });
  }, [blog.tags]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("article", {
    className: `xl-blog-card ${className || ''}`,
    style: style,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("h1", {
      className: "xl-blog-card-title",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(next_link__WEBPACK_IMPORTED_MODULE_0__["default"], {
        href: `/blog/detail/${blog.blogId}`,
        passHref: true,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
          rel: "noreferrer",
          onClick: () => {
            showDetail(blog.blogId);
          },
          target: openBlank ? '_blank' : '_self',
          children: blog.title
        })
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
      className: "xl-blog-card-content",
      onClick: () => {
        showDetail(blog.blogId);
      },
      children: (_blog$plainText = blog.plainText) === null || _blog$plainText === void 0 ? void 0 : _blog$plainText.replace(/[\r\n]/g, "")
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("footer", {
      className: "xl-blog-card-footer",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
        className: "xl-blog-card-publish-date",
        children: new Date(blog.publishTime).toLocaleDateString()
      }), blog.category && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
        className: "xl-blog-card-category",
        children: ["\u5206\u7C7B\uFF1A", blog.category]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
        children: tags
      })]
    })]
  }, `index-blog-${blog.blogId}`);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlogCard);

/***/ })

};
;