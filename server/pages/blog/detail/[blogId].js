"use strict";
(() => {
var exports = {};
exports.id = 443;
exports.ids = [443,839];
exports.modules = {

/***/ 3098:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _blogId_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./request/modules/blogRequest.ts
var blogRequest = __webpack_require__(5577);
// EXTERNAL MODULE: ./components/layouts/main.js + 4 modules
var main = __webpack_require__(7264);
// EXTERNAL MODULE: ./components/common/Icon.js
var Icon = __webpack_require__(6047);
// EXTERNAL MODULE: ./request/modules/utilRequest.ts
var utilRequest = __webpack_require__(8031);
;// CONCATENATED MODULE: ./hooks/useRunnableScript.ts



const useRunnableScript = (dependencies = []) => {
  (0,external_react_.useEffect)(() => {
    const global = window;

    global.runXlScript = function (e) {
      try {
        var _e$target, _e$target2, _e$target2$parentNode;

        const code = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.getElementsByTagName('textarea')[0].value;
        const container = (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : (_e$target2$parentNode = _e$target2.parentNode) === null || _e$target2$parentNode === void 0 ? void 0 : _e$target2$parentNode.getElementsByClassName('xl-runnable-output')[0];
        (0,utilRequest/* runScripts */.O)(code).then(res => {
          if (res.success) {
            let output = '';
            res.data.map(column => {
              output += column + '\n';
            });
            output = output.replace(/\\/g, '\\').replace(/\</g, '&lt').replace(/\>/g, '&gt');
            container.innerHTML = `<pre><code>${output}</code></pre>`;
          } else {
            container.innerHTML = JSON.stringify(res.msg);
          }
        }).catch(e => {
          container.innerHTML = e.toString();
        });
        container.style.display = 'block';
      } catch (e) {
        console.log(e);
      }
    };

    global.clearXlScriptOutput = function (e) {
      var _e$target3, _e$target3$parentNode;

      const container = (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : (_e$target3$parentNode = _e$target3.parentNode) === null || _e$target3$parentNode === void 0 ? void 0 : _e$target3$parentNode.getElementsByClassName('xl-runnable-output')[0];
      container.innerHTML = '';
      container.style.display = 'none';
    };
  }, [...dependencies]);
};

/* harmony default export */ const hooks_useRunnableScript = (useRunnableScript);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./utils/dom.ts
var dom = __webpack_require__(2252);
// EXTERNAL MODULE: ./utils/libs/EventManager.ts
var EventManager = __webpack_require__(6397);
// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(6517);
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);
// EXTERNAL MODULE: ./utils/libs/clickOutside.ts
var clickOutside = __webpack_require__(1578);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./pages/blog/detail/[blogId].js















BlogDetail.layout = main/* getDefaultLayout */.uy;
async function getServerSideProps({
  req,
  res,
  params
}) {
  const blogId = params.blogId;
  const blog = await (0,blogRequest/* getBlogById */.zv)(blogId);
  return {
    props: {
      blog
    }
  };
}

function BlogDetail({
  blog
}) {
  hooks_useRunnableScript();
  const router = (0,router_.useRouter)();

  const back = () => {
    router.back();
  };

  const blogContentRef = (0,external_react_.useRef)(null);
  const {
    0: category,
    1: setCategory
  } = (0,external_react_.useState)([]);
  const {
    0: activeCategory,
    1: setActiveCategory
  } = (0,external_react_.useState)('');
  const {
    0: categoryOffset,
    1: setCategoryOffset
  } = (0,external_react_.useState)(0);
  const anchoring = (0,external_react_.useRef)(false);
  const {
    0: showCategory,
    1: setShowCategory
  } = (0,external_react_.useState)(true);
  const categoryRef = (0,external_react_.useRef)(null);
  const showCategoryIconRef = (0,external_react_.useRef)(null);

  const getHead = (parent, level) => {
    const category = [];
    Array.from(blogContentRef.current.children).forEach(node => {
      var _node$tagName;

      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes((_node$tagName = node.tagName) === null || _node$tagName === void 0 ? void 0 : _node$tagName.toLowerCase())) {
        category.push({
          id: node.id,
          level: parseFloat(node.tagName.slice(1)),
          text: node.id
        });
      }
    });

    const formatCategory = categoryArray => {
      const newCategory = [];
      categoryArray.some((categoryItem, index) => {
        const last = newCategory[newCategory.length - 1];

        if (newCategory.length > 0 && last.level < categoryItem.level) {
          const restCategory = categoryArray.slice(index);
          let nextSiblingIndex = restCategory.findIndex(item => item.level <= last.level) + index;

          if (nextSiblingIndex < index) {
            nextSiblingIndex = restCategory.length + index;
          }

          if (nextSiblingIndex - index >= 1) {
            last.children = formatCategory(categoryArray.slice(index, nextSiblingIndex));
            newCategory.push(...formatCategory(categoryArray.slice(nextSiblingIndex)));
            return true;
          } else {
            last.children = [categoryItem];
          }
        } else {
          newCategory.push(categoryItem);
        }
      });
      return newCategory;
    };

    return formatCategory(category);
  };

  const categoryRender = (0,external_react_.useCallback)(() => {
    const renderer = category => {
      return category.map((categoryItem, index) => {
        if (categoryItem.children) {
          return /*#__PURE__*/jsx_runtime_.jsx("ul", {
            className: "xl-blog-detail-sub-category",
            children: renderer(categoryItem.children)
          });
        } else {
          return /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
            className: (0,dom/* getClasses */.k)(['xl-blog-detail-category-item', categoryItem.id === activeCategory && 'active']) // style={{paddingLeft: `${(categoryItem.level - 2) * 20}px`}}
            ,
            onClick: () => anchorTo(categoryItem.id),
            children: [categoryItem.text, /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "item-bar"
            })]
          }, `categoryItem-${index}`);
        }
      });
    };

    return /*#__PURE__*/jsx_runtime_.jsx("ul", {
      className: "xl-blog-detail-category",
      ref: categoryRef,
      style: {
        transform: `translateY(${categoryOffset}px)`,
        display: showCategory ? 'block' : 'none'
      },
      children: renderer(category)
    });
  }, [category, categoryOffset, showCategory]);

  const anchorTo = id => {
    // 锚点跳转
    const anchorElement = document.getElementById(id);

    if (anchorElement) {
      (0,dom/* scrollTo */.X5)(document.documentElement, anchorElement, -20);
      setActiveCategory(id);
      anchoring.current = true;
    }
  };

  (0,external_react_.useEffect)(() => {
    var _category$;

    const category = getHead(blogContentRef.current, 2);
    setCategory(category);
    setActiveCategory((_category$ = category[0]) === null || _category$ === void 0 ? void 0 : _category$.id);
    const isMobile = window.innerWidth < 900;
    isMobile && setShowCategory(false);
    const scrollListener = (0,EventManager/* addListener */.NH)(document, 'scroll', external_lodash_default().debounce(e => {
      const scrollTop = (0,dom/* getScrollTop */.cx)();
      setCategoryOffset(Math.max(scrollTop - 80, 0));
      category.some((categoryItem, index) => {
        var _document$getElementB, _document$getElementB2;

        if (((_document$getElementB = document.getElementById(categoryItem.id)) === null || _document$getElementB === void 0 ? void 0 : (_document$getElementB2 = _document$getElementB.getBoundingClientRect()) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.top) > 21) {
          if (!anchoring.current) {
            var _category;

            setActiveCategory(((_category = category[index - 1]) === null || _category === void 0 ? void 0 : _category.id) || categoryItem.id);
          } else {
            anchoring.current = false;
          }

          return true;
        }
      });
    }, 300));
    const clickOutsideDom = clickOutside/* default.addSource */.ZP.addSource(categoryRef.current, (e, dom) => {
      var _showCategoryIconRef$;

      if (isMobile && !((_showCategoryIconRef$ = showCategoryIconRef.current) !== null && _showCategoryIconRef$ !== void 0 && _showCategoryIconRef$.contains(e.target))) {
        setShowCategory(false);
      }
    });
    return () => {
      (0,EventManager/* removeListenerRS */.yM)(scrollListener);
      clickOutside/* default.deleteSource */.ZP.deleteSource(clickOutsideDom);
    };
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "xl-blog-detail",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "\u535A\u5BA2\u8BE6\u60C5"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "description",
        content: "\u535A\u5BA2\u8BE6\u7EC6\u5185\u5BB9"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "icon",
        href: "/my_favicon.ico"
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(Icon/* default */.Z, {
      className: "back",
      onClick: back
    }), /*#__PURE__*/jsx_runtime_.jsx(Icon/* default */.Z, {
      className: "category",
      ref: showCategoryIconRef,
      onClick: () => {
        setShowCategory(!showCategory);
      }
    }), /*#__PURE__*/jsx_runtime_.jsx("h1", {
      className: "xl-blog-detail-title",
      children: blog.title
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "xl-blog-detail-main",
      children: [categoryRender(), /*#__PURE__*/jsx_runtime_.jsx("div", {
        ref: blogContentRef,
        className: "xl-blog-detail-content",
        dangerouslySetInnerHTML: {
          __html: blog.htmlText
        }
      })]
    })]
  });
}

/* harmony default export */ const _blogId_ = (BlogDetail);

/***/ }),

/***/ 8031:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ runScripts)
/* harmony export */ });
/* unused harmony export getCodeRunPreview */
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8222);

async function runScripts(script) {
  return await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .post */ .v_)(`/runScript`, {
    script
  });
}
async function getCodeRunPreview(id) {
  return await get(`/codeRun/getCodeRunPreview/id/${id}`);
}

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
var __webpack_exports__ = __webpack_require__.X(0, [400,664,431,264,47,577,397], () => (__webpack_exec__(3098)));
module.exports = __webpack_exports__;

})();