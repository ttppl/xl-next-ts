"use strict";
exports.id = 330;
exports.ids = [330];
exports.modules = {

/***/ 9330:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export PaginationItemHOC */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var rc_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3006);
/* harmony import */ var rc_pagination__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rc_pagination__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_check__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7549);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);








// 分页器
const XlPagination = ({
  defaultPageSize,
  defaultCurrent,
  pageUrl,
  onChange,
  total,
  itemRender
}) => {
  defaultPageSize = defaultPageSize || 10;
  total = total || defaultPageSize; // 大于7页显示快速跳转

  const showQuickJumper = total / defaultPageSize > 7; // 路由跳转

  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();

  const routerChange = (page, pageSize) => {
    // 路由跳转添加全局loading
    // setGlobalLoading(true)
    const routerUrl = (0,_utils_check__WEBPACK_IMPORTED_MODULE_5__/* .isFunction */ .mf)(pageUrl) ? pageUrl(page) : pageUrl;

    if (routerUrl) {
      router.push(routerUrl);
    } // 触发change回调


    onChange === null || onChange === void 0 ? void 0 : onChange(page);
  }; // useEffect(() => {
  //     const routerCompleteHandler = () => {
  //         // 路由跳转完成关闭全局loading
  //         setGlobalLoading(false)
  //     }
  //     router.events.on('routeChangeComplete', routerCompleteHandler)
  //     return () => {
  //         router.events.off('routeChangeComplete', routerCompleteHandler)
  //     }
  // }, [])


  const showPagination = total / defaultPageSize > 1; // 小于1页则不渲染分页器

  return showPagination ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx((rc_pagination__WEBPACK_IMPORTED_MODULE_2___default()), {
    className: "xl-pagination",
    showQuickJumper: showQuickJumper // showSizeChanger
    ,
    defaultPageSize: defaultPageSize,
    defaultCurrent: defaultCurrent || 1,
    onChange: routerChange // onShowSizeChange={onShowSizeChange}
    ,
    itemRender: itemRender || PaginationItemHOC(pageUrl),
    total: total
  }) : null;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (XlPagination); // 分页器item

const PaginationItem = (page, type, element, href) => {
  if (type === 'page') {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
      href: (0,_utils_check__WEBPACK_IMPORTED_MODULE_5__/* .isFunction */ .mf)(href) ? href(page) : href,
      passHref: true,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("a", {
        className: "xl-pagination-item",
        children: page
      })
    });
  }

  if (type === 'prev') {
    return '<';
  }

  if (type === 'next') {
    return '>';
  } // if (type.includes('jump')) {
  //     return '•••'
  // }


  return element;
};

const PaginationItemHOC = href => {
  return (page, type, element) => {
    return PaginationItem(page, type, element, href);
  };
};

/***/ })

};
;