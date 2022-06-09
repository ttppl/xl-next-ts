"use strict";
exports.id = 119;
exports.ids = [119];
exports.modules = {

/***/ 2119:
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
/* harmony import */ var _components_common_XlPagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9330);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2252);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);







 // import Bingdundun from '../components/threejs/Bingdundun'




async function getServerSideProps(context) {
  const pageSize = 20; // 获取最新博客

  const res = await (0,_request_modules_blogRequest__WEBPACK_IMPORTED_MODULE_2__/* .getBlogsByType */ .Wj)('newest', 1, pageSize);
  return {
    props: {
      blogs: res.data,
      total: res.total,
      page: 1,
      pageSize
    }
  };
}

// @ts-ignore
const Index = props => {
  const columnCount = 4; //列数量

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_0___default()), {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("title", {
        children: "\u541E\u5929\u6CE1\u6CE1\u9F99\u7684\u4E3B\u9875"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("meta", {
        name: "description",
        content: "\u541E\u5929\u6CE1\u6CE1\u9F99\u7684\u4E3B\u9875"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("link", {
        rel: "icon",
        href: "/my_favicon.ico"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("main", {
      className: "index-main",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("div", {
        className: "xl-index-blogs",
        children: Array.from({
          length: columnCount
        }).map((i, columnIndex) => {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("div", {
            className: "xl-index-blogs-column",
            children: props.blogs.map((blog, index) => {
              if (index % columnCount === columnIndex) {
                return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(IndexBlogCard, {
                  blog: blog
                }, blog.blogId);
              }
            })
          }, `index-blog-column-${columnIndex}`);
        })
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(_components_common_XlPagination__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
      defaultPageSize: props.pageSize,
      defaultCurrent: props.page,
      pageUrl: page => {
        return `/p${page}`;
      },
      total: props.total
    })]
  });
};

function IndexBlogCard({
  blog
}) {
  const tags = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    const blogTags = Array.isArray(blog.tags) ? blog.tags : blog.tags.split(',');
    return blogTags.map((tag, index) => {
      if (tag) return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
        passHref: true,
        href: `/blog/search/p1?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__/* .encryptUrl */ .bl)(tag)}`,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("a", {
          className: "xl-blog-tag",
          children: tag
        }, `tag-${index}`)
      });
    });
  }, [blog.tags]);
  const container = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const abstract = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const el = container.current;
    const containerHeight = el.clientHeight;
    const padding = parseFloat(window.getComputedStyle(el).getPropertyValue('padding-bottom'));
    const lastChild = el.lastChild;
    const childMargin = parseFloat(window.getComputedStyle(lastChild).getPropertyValue('margin-bottom'));
    const restHeight = containerHeight - padding - lastChild.offsetTop - lastChild.clientHeight - childMargin;

    if (restHeight > 0) {
      const abstEl = abstract.current;
      const style = window.getComputedStyle(abstEl);
      const lineHeight = parseFloat(style.getPropertyValue('line-height'));
      const line = parseFloat(style.getPropertyValue('-webkit-line-clamp')); // @ts-ignore

      abstEl.style['-webkit-line-clamp'] = line + Math.floor(restHeight / lineHeight);
    }
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    ref: container,
    className: "xl-index-blog-card",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
      href: `/blog/detail/${blog.blogId}`,
      passHref: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("a", {
        className: "xl-blog-info",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("p", {
          className: "xl-blog-title",
          children: blog.title
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("p", {
          className: "xl-blog-publish-time",
          children: new Date(blog.publishTime).toLocaleDateString()
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("img", {
          className: "xl-blog-cover-img",
          src: blog.coverImg ? `${"https://ttppl.xyz/file/id/"}${blog.coverImg}` : "https://ttppl.xyz/file/defaultCoverImg" + '?t=' + blog.blogId,
          alt: "blogCoverImg"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("div", {
          ref: abstract,
          className: "xl-blog-abstract",
          children: blog.plainText
        })]
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("div", {
      className: "xl-blog-card-category",
      children: blog.category && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
        children: ["\u5206\u7C7B\uFF1A", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
          passHref: true,
          href: `/blog/search/p1?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__/* .encryptUrl */ .bl)(blog.category)}`,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("a", {
            children: blog.category
          })
        })]
      })
    }), tags.length > 1 && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("div", {
      className: "xl-blog-tags",
      children: tags
    })]
  });
}

Index.layout = _components_layouts_main__WEBPACK_IMPORTED_MODULE_1__/* .getDefaultLayout */ .u;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);

/***/ })

};
;