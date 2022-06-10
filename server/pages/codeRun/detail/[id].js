"use strict";
(() => {
var exports = {};
exports.id = 989;
exports.ids = [989,839];
exports.modules = {

/***/ 2680:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _request_modules_codeRunRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3229);
/* harmony import */ var _components_layouts_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7264);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1000);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1742);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([highlight_js__WEBPACK_IMPORTED_MODULE_3__]);
highlight_js__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];









async function getServerSideProps({
  query
}) {
  const codeRun = await (0,_request_modules_codeRunRequest__WEBPACK_IMPORTED_MODULE_0__/* .getCodeRunById */ .C)(query.id);
  return {
    props: {
      codeRun: codeRun || {}
    }
  };
}

function CodeRunDetail({
  codeRun
}) {
  const {
    0: showCode,
    1: setShowCode
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const {
    0: code,
    1: setCode
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('preview');
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    document.querySelectorAll("pre code").forEach(block => {
      try {
        highlight_js__WEBPACK_IMPORTED_MODULE_3__["default"].highlightBlock(block);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  const setIframeHeight = () => {
    console.log(111); // const ifm= document.getElementById("xl-iframe");
    // console.log(ifm)
    // ifm.height=ifm.contentWindow.document.documentElement.offsetHeight;
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "xl-code-run-detail",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "xl-lang-tags",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .getClass */ .ll)(['xl-lang-tag', {
          'active': code === 'preview'
        }]),
        onClick: () => setCode('preview'),
        children: "preview"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .getClass */ .ll)(['xl-lang-tag', {
          'active': code === 'html'
        }]),
        onClick: () => setCode('html'),
        children: "html"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .getClass */ .ll)(['xl-lang-tag', {
          'active': code === 'script'
        }]),
        onClick: () => setCode('script'),
        children: "script"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .getClass */ .ll)(['xl-lang-tag', {
          'active': code === 'style'
        }]),
        onClick: () => setCode('style'),
        children: "style"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("iframe", {
      width: "100%",
      id: "xl-iframe",
      style: {
        display: code === 'preview' ? '' : 'none'
      },
      className: "xl-code-run-iframe",
      srcDoc: codeRun.htmlValue,
      onLoad: setIframeHeight,
      children: "\u52A0\u8F7D\u4E2D"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("pre", {
        style: {
          display: code === 'html' ? '' : 'none'
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("code", {
          lang: codeRun.xmlLanguage,
          children: codeRun.xmlText
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("pre", {
        style: {
          display: code === 'script' ? '' : 'none'
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("code", {
          lang: codeRun.scriptLanguage,
          children: codeRun.scriptText
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("pre", {
        style: {
          display: code === 'style' ? '' : 'none'
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("code", {
          lang: codeRun.styleLanguage,
          children: codeRun.styleText
        })
      })]
    })]
  });
}

CodeRunDetail.layout = _components_layouts_main__WEBPACK_IMPORTED_MODULE_1__/* .getDefaultLayout */ .u;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodeRunDetail);
});

/***/ }),

/***/ 3229:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ getCodeRunById),
/* harmony export */   "c": () => (/* binding */ getCodeRunList)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8222);

async function getCodeRunById(id) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/codeRun/getCodeRun/id/${id}`);
  return res.data;
}
async function getCodeRunList(options) {
  return await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/codeRun/getCodeList`, options);
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

/***/ 1000:
/***/ ((module) => {

module.exports = import("highlight.js");;

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
var __webpack_exports__ = __webpack_require__.X(0, [400,664,431,264], () => (__webpack_exec__(2680)));
module.exports = __webpack_exports__;

})();