"use strict";
exports.id = 939;
exports.ids = [939];
exports.modules = {

/***/ 3939:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ codeRun),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: ./components/layouts/main.js + 4 modules
var main = __webpack_require__(7264);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./request/modules/codeRunRequest.ts
var codeRunRequest = __webpack_require__(3229);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./components/common/XlPagination.tsx
var XlPagination = __webpack_require__(9330);
// EXTERNAL MODULE: ./utils/index.ts
var utils = __webpack_require__(1742);
// EXTERNAL MODULE: ./components/common/Icon.js
var Icon = __webpack_require__(6047);
// EXTERNAL MODULE: ./utils/check.ts
var check = __webpack_require__(7549);
// EXTERNAL MODULE: ./utils/libs/EventManager.ts
var EventManager = __webpack_require__(6397);
// EXTERNAL MODULE: external "lodash/debounce"
var debounce_ = __webpack_require__(3908);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce_);
;// CONCATENATED MODULE: ./hooks/useMobile.ts





function useMobile() {
  const {
    0: isMobile,
    1: setIsMobile
  } = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    setIsMobile((0,check/* checkDevice */.n$)() === 'mobile');
    const resizeListener = EventManager/* default.addListener */.ZP.addListener(window, 'resize', debounce_default()(e => {
      if (window.innerWidth < 900) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, 300, {
      leading: true
    }));
    return () => {
      EventManager/* default.removeListenerRS */.ZP.removeListenerRS(resizeListener);
    };
  }, []);
  return {
    isMobile
  };
}

/* harmony default export */ const hooks_useMobile = (useMobile);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./pages/codeRun/index.tsx













async function getServerSideProps({
  query
}) {
  const pageSize = 12;
  const codeRunList = await (0,codeRunRequest/* getCodeRunList */.c)({
    type: ['EXAMPLE', 'UTILS'],
    authority: ['PUBLIC'],
    pageSize
  });
  return {
    props: {
      total: codeRunList.total,
      page: 1,
      pageSize,
      codeRunList: codeRunList.data
    }
  };
}

function CodeRunIndex({
  codeRunList,
  pageSize,
  page,
  total
}) {
  const {
    isMobile
  } = hooks_useMobile();
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "CodeRun"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "description",
        content: "codeRun\u672C\u5730\u6D4B\u8BD5"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "icon",
        href: "/my_favicon.ico"
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "xl-code-run-index",
      children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "xl-title",
        children: "\u672C\u5730\u6D4B\u8BD5\u793A\u4F8B"
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "xl-code-run-list",
        children: codeRunList.map(codeRun => {
          return /*#__PURE__*/jsx_runtime_.jsx(CodeRunCube, {
            codeRun: codeRun,
            isMobile: isMobile
          }, `code-run-${codeRun.id}`);
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(XlPagination/* default */.Z, {
        defaultPageSize: pageSize,
        defaultCurrent: page,
        pageUrl: page => {
          return `/codeRun/p${page}`;
        },
        total: total
      })]
    })]
  });
}

function CodeRunCube({
  codeRun,
  isMobile
}) {
  const {
    0: showDetail,
    1: setShowDetail
  } = (0,external_react_.useState)(false);

  const mobileShowDetail = e => {
    e.stopPropagation();
    e.preventDefault();
    setShowDetail(true);
  };

  return /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
    passHref: true,
    href: `/codeRun/detail/${codeRun.id}`,
    children: /*#__PURE__*/jsx_runtime_.jsx("a", {
      className: "xl-code-run-container",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (0,utils/* getClass */.ll)(['xl-code-run', {
          'active': showDetail
        }]),
        onMouseOver: () => !isMobile && setShowDetail(true),
        onMouseLeave: () => setShowDetail(false),
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "xl-code-run-face",
          children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
            className: "xl-code-run-title",
            children: codeRun.title
          }), /*#__PURE__*/jsx_runtime_.jsx("img", {
            src: codeRun.coverImg ? `${"https://ttppl.xyz/file/id/"}${codeRun.coverImg}` : "https://ttppl.xyz/file/defaultCoverImg" + '?t=' + codeRun.id
          }), isMobile && /*#__PURE__*/jsx_runtime_.jsx(Icon/* default */.Z, {
            className: "search xl-code-run-detail-icon",
            onClick: mobileShowDetail
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "xl-code-run-detail",
          children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
            className: "xl-code-run-title",
            children: codeRun.title
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
            className: "xl-code-run-info",
            children: ["\u7C7B\u578B\uFF1A", codeRun.type]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
            className: "xl-code-run-info",
            children: ["\u811A\u672C\uFF1A", codeRun.scriptLanguage]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
            className: "xl-code-run-info",
            children: ["\u6837\u5F0F\uFF1A", codeRun.styleLanguage]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
            className: "xl-code-run-info",
            children: ["\u6807\u8BB0\uFF1A", codeRun.xmlLanguage]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
            className: "xl-code-run-info",
            children: ["\u66F4\u65B0\uFF1A", codeRun.modifyTimestamp]
          })]
        })]
      })
    })
  });
}

CodeRunIndex.layout = main/* getDefaultLayout */.uy;
/* harmony default export */ const codeRun = (CodeRunIndex);

/***/ }),

/***/ 3229:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ getCodeRunById),
/* harmony export */   "c": () => (/* binding */ getCodeRunList)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(480);

async function getCodeRunById(id) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/codeRun/getCodeRun/id/${id}`);
  return res.data;
}
async function getCodeRunList(options) {
  return await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/codeRun/getCodeRunList`, options);
}

/***/ })

};
;