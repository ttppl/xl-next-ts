"use strict";
(() => {
var exports = {};
exports.id = 186;
exports.ids = [186,405,839];
exports.modules = {

/***/ 3858:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useLogoClick)
/* harmony export */ });
/* harmony import */ var _components_layouts_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7264);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function useLogoClick(callback, deps) {
  const layoutContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_components_layouts_main__WEBPACK_IMPORTED_MODULE_0__/* .LayoutContext */ .VY);
  const logoClickCallback = layoutContext.logoClickCallback.current;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    logoClickCallback.push(callback);
    return () => {
      logoClickCallback.splice(logoClickCallback.findIndex(c => c === callback), 1);
    };
  }, deps);
  return {
    logoRef: layoutContext.logoRef
  };
}

/***/ }),

/***/ 2039:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ types),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: ./components/layouts/main.js + 4 modules
var main = __webpack_require__(7264);
// EXTERNAL MODULE: ./request/config.ts
var config = __webpack_require__(480);
;// CONCATENATED MODULE: ./request/modules/categoryRequest.ts


/** 获取用户博客目录 */
async function getBlogCategory(userId) {
  return (await (0,config/* get */.U2)(`/category/getUserCategory/type/blog`, {
    userId
  })).data;
}
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./utils/dom.ts
var dom = __webpack_require__(2252);
// EXTERNAL MODULE: ./components/common/XlTransition.tsx
var XlTransition = __webpack_require__(2240);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/common/Collapse.js




Collapse.defaultProps = {
  show: false
};

function Collapse({
  show,
  children
}) {
  const height = (0,external_react_.useRef)(0);
  const transitions = (0,external_react_.useMemo)(() => ({
    beforeEnter: el => {
      height.current = (0,dom/* getElementSize */.j3)(el).height;
      return {
        overflow: 'hidden',
        height: 0
      };
    },
    entering: () => {
      return {
        overflow: 'hidden',
        height: height.current
      };
    },
    entered: () => {
      return {};
    },
    beforeExit: el => {
      height.current = (0,dom/* getElementSize */.j3)(el).height;
      return {
        overflow: 'hidden',
        height: height.current
      };
    },
    exiting: () => {
      return {
        overflow: 'hidden',
        height: 0
      };
    },
    exited: () => {
      return {
        display: 'none'
      };
    }
  }), [height]);
  return /*#__PURE__*/jsx_runtime_.jsx(XlTransition/* default */.Z, {
    show: show,
    defaultStyle: {
      transition: 'height 300ms ease-in-out'
    },
    status: transitions,
    children: children
  });
}

/* harmony default export */ const common_Collapse = (Collapse);
// EXTERNAL MODULE: ./components/common/Icon.js
var Icon = __webpack_require__(6047);
// EXTERNAL MODULE: ./request/modules/blogRequest.ts
var blogRequest = __webpack_require__(5577);
// EXTERNAL MODULE: ./components/common/BlogCard.tsx
var BlogCard = __webpack_require__(6889);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/common/XlPagination.tsx
var XlPagination = __webpack_require__(9330);
// EXTERNAL MODULE: ./utils/libs/clickOutside.ts
var clickOutside = __webpack_require__(1578);
// EXTERNAL MODULE: ./hooks/useLogoClick.ts
var useLogoClick = __webpack_require__(3858);
;// CONCATENATED MODULE: ./pages/blog/types/index.tsx















const getServerSideProps = async ({
  req,
  res,
  params,
  query
}) => {
  var _query$page;

  const page = parseFloat((query === null || query === void 0 ? void 0 : (_query$page = query.page) === null || _query$page === void 0 ? void 0 : _query$page.toString()) || '1') || 1;
  const pageSize = 10; // const total = parseFloat(query.all[2]?.slice(1))||0

  const categories = await getBlogCategory();
  const categoryId = query.id || categories[0].categoryId; // 根据分类获取博客

  const blogs = await (0,blogRequest/* getBlogsByCategory */.M0)(categoryId, true, page, pageSize);
  return {
    props: {
      blogs: blogs.data || [],
      total: blogs.total || 0,
      categories,
      categoryId,
      page,
      pageSize
    }
  };
};

function BlogTypes({
  categories,
  categoryId,
  blogs,
  total,
  page,
  pageSize
}) {
  const router = (0,router_.useRouter)();
  (0,external_react_.useEffect)(() => {
    // 路由返回时自动滚动到原本位置
    router.beforePopState(({
      url,
      as,
      options
    }) => {
      options.scroll = false;
      return true;
    });
  }, []); // 当前选中的目录项

  const {
    0: activeItem,
    1: setActiveItem
  } = (0,external_react_.useState)([]); // 展开子目录

  const openCategoryChildren = id => {
    if (activeItem.includes(id)) {
      setActiveItem(activeItem.filter(a => a !== id));
    } else {
      const newActiveItem = [...activeItem];
      newActiveItem.push(id);
      setActiveItem(newActiveItem);
    }
  }; // mobile模式下显示目录


  const {
    0: showCategory,
    1: setShowCategory
  } = (0,external_react_.useState)(false);
  const {
    logoRef
  } = (0,useLogoClick/* default */.Z)(() => {
    setShowCategory(!showCategory);
  });
  const category = (0,external_react_.useRef)(null);
  (0,external_react_.useEffect)(() => {
    if (showCategory) {
      const clickOutsideDom = clickOutside/* default.addSource */.ZP.addSource(category.current, e => {
        if (logoRef.current && !logoRef.current.contains(e.target)) {
          e.stopPropagation();
          e.preventDefault();
          setShowCategory(false);
        }
      });
      return () => {
        if (clickOutsideDom) {
          clickOutside/* default.deleteSource */.ZP.deleteSource(clickOutsideDom);
        }
      };
    }
  }, [showCategory]); // 目录jsx

  const categoryRender = (0,external_react_.useMemo)(() => {
    const getCategoryRender = categories => {
      const items = categories.map(category => {
        const isActive = activeItem.includes(category.categoryId);

        if (category.children && category.children.length > 0) {
          return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            children: [/*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
              href: `/blog/types?id=${category.categoryId}`,
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
                className: `xl-blog-types-categories-menu-sub-item ${category.categoryId === categoryId && 'active'}`,
                children: [/*#__PURE__*/jsx_runtime_.jsx(Icon/* default */.Z, {
                  className: `back ${isActive && 'active'}`,
                  title: "\u5C55\u5F00",
                  onClick: e => {
                    e.stopPropagation();
                    openCategoryChildren(category.categoryId);
                  }
                }), category.categoryName]
              })
            }, category.categoryId), /*#__PURE__*/jsx_runtime_.jsx(common_Collapse, {
              show: isActive,
              children: getCategoryRender(category.children)
            }, `${category.categoryId}-children`)]
          }, category.categoryId);
        } else return /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
          href: `/blog/types?id=${category.categoryId}`,
          children: /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: `xl-blog-types-categories-menu-item ${category.categoryId === categoryId && 'active'}`,
            children: category.categoryName
          })
        }, category.categoryId);
      });
      return /*#__PURE__*/jsx_runtime_.jsx("ul", {
        className: "xl-blog-types-categories-menu",
        children: items
      });
    };

    return getCategoryRender(categories);
  }, [categories, activeItem]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "xl-blog-type-main",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      ref: category,
      className: `xl-blog-type-category-tree ${showCategory && 'show'}`,
      children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
        className: "title",
        children: "\u5206\u7C7B"
      }), categoryRender]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "xl-blog-type-blog-list",
      children: [blogs.length > 0 ? blogs.map(blog => {
        return /*#__PURE__*/jsx_runtime_.jsx(BlogCard/* default */.Z, {
          openBlank: false,
          style: {
            width: '50vw'
          },
          blog: blog
        }, blog.blogId);
      }) : '木有呢！！！', /*#__PURE__*/jsx_runtime_.jsx(XlPagination/* default */.Z, {
        defaultPageSize: pageSize,
        defaultCurrent: page,
        pageUrl: page => `/blog/types?id=${categoryId}&page=${page}`,
        total: total
      })]
    })]
  });
}

BlogTypes.layout = main/* getDefaultLayout */.uy;
/* harmony default export */ const types = (BlogTypes);

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
var __webpack_exports__ = __webpack_require__.X(0, [400,664,431,264,47,330,577,889], () => (__webpack_exec__(2039)));
module.exports = __webpack_exports__;

})();