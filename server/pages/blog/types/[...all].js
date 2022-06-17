"use strict";
(() => {
var exports = {};
exports.id = 857;
exports.ids = [857,839];
exports.modules = {

/***/ 2685:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _all_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: ./components/layouts/main.js + 4 modules
var main = __webpack_require__(7264);
// EXTERNAL MODULE: ./request/config.js + 1 modules
var config = __webpack_require__(8222);
;// CONCATENATED MODULE: ./request/modules/selectOptions.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function formatCategory(categories) {
  return categories.map(c => {
    const category = {
      label: c.categoryName,
      value: c.categoryId,
      id: c.categoryId
    };

    if (c.children) {
      category.children = formatCategory(c.children);
    }

    return category;
  });
}

function formatTags(tags) {
  var _tags$map;

  return (tags === null || tags === void 0 ? void 0 : (_tags$map = tags.map) === null || _tags$map === void 0 ? void 0 : _tags$map.call(tags, tag => ({
    id: tag.tagId,
    label: tag.tagName,
    value: tag.tagId,
    color: tag.color
  }))) || [];
}

async function getBlogTags(name, userId) {
  const res = await get('/tag/getTag', {
    name,
    userId,
    type: 'blog'
  });
  return res.data;
}
async function getTags(userId, page, pageSize = 10, options = {
  name: null,
  level: null,
  type: null,
  color: null
}) {
  return get(`/tag/getTag`, _objectSpread({
    userId,
    page,
    pageSize
  }, options));
}
async function addBlogTags(name, userId) {
  const res = await post('/tag/addTag', {
    name,
    userId,
    type: 'blog'
  });
  return res.data;
}
async function addTag(tag = {
  userId: null,
  name: null,
  type: null,
  level: null,
  color: null,
  addTime: null
}) {
  return await post('/tag/addTag', tag);
}
async function modifyTag(tag = {
  id: null,
  userId: null,
  name: null,
  type: null,
  level: null,
  color: null,
  addTime: null
}) {
  return post('/tag/modifyTag', tag);
}
async function deleteTag(id) {
  return get(`/tag/deleteTag/id/${id}`);
}
async function getBlogCategory(userId = 1) {
  return (await (0,config/* get */.U2)(`/category/getUserCategory/user/${userId}/type/blog`)).data;
}
async function getCategoryTreeList(userId, page = 1, pageSize = 10, name, type, parent) {
  return get('/category/getCategoryTreeList', {
    userId,
    page,
    pageSize,
    name,
    type,
    parent
  });
}
async function getCategoryList(userId, page = 1, pageSize = 10, options = {
  name: null,
  type: null,
  parent: null,
  level: null
}) {
  return get('/category/getCategory', _objectSpread({
    userId,
    page,
    pageSize
  }, options));
}
async function addCategory(category) {
  return post('/category/addCategory', category);
}
async function modifyCategory(category) {
  return post('/category/modifyCategory', category);
}
async function deleteCategory(id) {
  return get(`/category/deleteCategory/id/${id}`);
}
async function getInitialTagAndCategory(userId) {
  const categories = await getBlogCategory(userId);
  const tags = await getBlogTags(null, userId);
  return {
    categories: formatCategory(categories),
    tags: formatTags(tags)
  };
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
;// CONCATENATED MODULE: ./hooks/useLogoClick.ts


function useLogoClick(callback, deps) {
  const layoutContext = (0,external_react_.useContext)(main/* LayoutContext */.VY);
  const logoClickCallback = layoutContext.logoClickCallback.current;
  (0,external_react_.useEffect)(() => {
    logoClickCallback.push(callback);
    return () => {
      logoClickCallback.splice(logoClickCallback.findIndex(c => c === callback), 1);
    };
  }, deps);
  return {
    logoRef: layoutContext.logoRef
  };
}
;// CONCATENATED MODULE: ./pages/blog/types/[...all].js















const getServerSideProps = async ({
  req,
  res,
  params,
  query
}) => {
  var _query$all$;

  // console.log( res.setHeader())
  // query格式：[typeId,page(p1)]
  const page = parseFloat((_query$all$ = query.all[1]) === null || _query$all$ === void 0 ? void 0 : _query$all$.slice(1)) || 1;
  const pageSize = 10; // const total = parseFloat(query.all[2]?.slice(1))||0

  const categories = await getBlogCategory(query.userId);
  const categoryId = query.all[0] === 'init' ? categories[0].categoryId : parseFloat(query.all[0]); // 根据分类获取博客

  const blogs = await (0,blogRequest/* getBlogsByCategory */.M0)(categoryId, true, page, pageSize);
  return {
    props: {
      blogs: blogs.data || [],
      total: blogs.total,
      categories,
      categoryId,
      page,
      pageSize
    }
  };
};
BlogTypes.layout = main/* getDefaultLayout */.uy;

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
  } = useLogoClick(() => {
    setShowCategory(!showCategory);
  });
  const category = (0,external_react_.useRef)(null);
  (0,external_react_.useEffect)(() => {
    if (showCategory) {
      const clickOutsideDom = clickOutside/* default.addSource */.ZP.addSource(category.current, e => {
        if (!logoRef.current.contains(e.target)) {
          e.stopPropagation();
          e.preventDefault();
          setShowCategory(false);
        }
      });
      return () => {
        clickOutside/* default.deleteSource */.ZP.deleteSource(clickOutsideDom);
      };
    }
  }, [showCategory]); // 目录jsx

  const categoryRender = (0,external_react_.useMemo)(() => {
    const getCategoryRender = categories => {
      const items = categories.map(category => {
        const isActive = activeItem.includes(category.categoryId);

        if (category.children) {
          return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            children: [/*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
              href: `/blog/types/${category.categoryId}`,
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
          href: `/blog/types/${category.categoryId}`,
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
        pageUrl: page => `/blog/types/${categoryId}/p${page}`,
        total: total
      })]
    })]
  });
}

/* harmony default export */ const _all_ = (BlogTypes);

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [400,664,431,264,47,330,577,889], () => (__webpack_exec__(2685)));
module.exports = __webpack_exports__;

})();