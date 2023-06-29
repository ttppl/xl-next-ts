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
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2252);
/* harmony import */ var _utils_check__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7549);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);









const showDetail = id => {
  next_router__WEBPACK_IMPORTED_MODULE_2___default().push(`/blog/detail/${id}`);
};

function Tag({
  name,
  color
}) {
  return /*#__PURE__*/_jsx("div", {
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
  var _blog$plainText, _blog$category;

  // const tags = useMemo(() => {
  //     const blogTags = Array.isArray(blog.tags) ? blog.tags : (blog.tags as string).split(',')
  //     return blogTags.map((tag: any,index:number) => {
  //         if (tag) {
  //             // return <Tag name={tag} key={`tag-${index}`}/>
  //             return <Link key={`tag-${index}`} passHref href={`/blog/search/p1?key=${encryptUrl(tag)}`}><a key={`tag-${index}`}
  //                                                                                      className='xl-blog-tag'>{tag}</a></Link>
  //         }
  //     })
  // }, [blog.tags])
  const tags = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const blogTags = blog.tags || [];
    return blogTags.map((tag, index) => {
      if (tag) return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_0__["default"], {
        passHref: true,
        href: `/blog/search/p1?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__/* .encryptUrl */ .bl)(tag.tagName)}`,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("a", {
          className: "xl-blog-tag",
          children: tag.tagName
        }, `tag-${index}`)
      }, `tag-${tag.tagId}`);
    });
  }, [blog.tags]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("article", {
    className: `xl-blog-card ${className || ''}`,
    style: style,
    children: [blog.coverImg && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("img", {
      className: "xl-blog-cover-img",
      src: (0,_utils_check__WEBPACK_IMPORTED_MODULE_5__/* .isNum */ .e9)(blog.coverImg) ? `${"https://ttppl.xyz/file/id/"}${blog.coverImg}` : blog.coverImg
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "xl-blog-info",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("h1", {
        className: "xl-blog-card-title",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_0__["default"], {
          href: `/blog/detail/${blog.blogId}`,
          passHref: true,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("a", {
            rel: "noreferrer",
            onClick: () => {
              showDetail(blog.blogId);
            },
            target: openBlank ? '_blank' : '_self',
            children: blog.title
          })
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
        className: "xl-blog-card-content",
        onClick: () => {
          showDetail(blog.blogId);
        },
        children: (_blog$plainText = blog.plainText) === null || _blog$plainText === void 0 ? void 0 : _blog$plainText.replace(/[\r\n]/g, "")
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("footer", {
        className: "xl-blog-card-footer",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
          className: "xl-blog-card-publish-date",
          children: new Date(blog.publishTime).toLocaleDateString()
        }), ((_blog$category = blog.category) === null || _blog$category === void 0 ? void 0 : _blog$category.length) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
          className: "xl-blog-card-category",
          children: ["\u5206\u7C7B\uFF1A", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_0__["default"], {
            passHref: true,
            href: `/blog/search/p1?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__/* .encryptUrl */ .bl)(blog.category.map(category => category.categoryId).join(','))}`,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("a", {
              children: blog.category.map(category => category.categoryName).join('/')
            })
          })]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
          children: tags
        })]
      })]
    })]
  }, `index-blog-${blog.blogId}`);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlogCard);

/***/ })

};
;