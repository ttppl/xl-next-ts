"use strict";
exports.id = 609;
exports.ids = [609];
exports.modules = {

/***/ 8609:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_layouts_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7264);
/* harmony import */ var _components_common_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6047);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2252);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var _utils_libs_setGlobalLoading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4431);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);










async function getServerSideProps({
  query
}) {
  const pageSize = 10;
  return {
    props: {
      books: null,
      total: 0,
      page: 1,
      pageSize
    }
  };
}

function TxtDownload(props) {
  const {
    0: key,
    1: setKey
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(props.keyWord);
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();

  const search = e => {
    e.preventDefault();
    (0,_utils_libs_setGlobalLoading__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(true, {
      label: '努力搜索中...'
    });
    router.push(`/txtDownload/p1?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__/* .encryptUrl */ .bl)(key)}`);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: "txt-download-main",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("form", {
      action: "/txtDownload/p1",
      className: "xl-txt-download-search-form",
      method: "get",
      onSubmit: search,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("input", {
        name: "key",
        placeholder: "\u8BF7\u8F93\u5165 \u201C\u4E66\u540D/\u4F5C\u8005\u201D \u641C\u7D22",
        value: key,
        onChange: e => setKey(e.target.value)
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("button", {
        type: "submit",
        className: "xl-search-button",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(_components_common_Icon__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
          className: "search"
        })
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("div", {
      className: "xl-bool-list",
      children: props.books ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("table", {
        className: "xl-book-list-table",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("tbody", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("tr", {
            className: "xl-table-title",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("th", {
              children: "\u7C7B\u578B"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("th", {
              children: "\u4E66\u540D"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("th", {
              children: "\u4F5C\u8005"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("th", {
              children: "\u6700\u65B0\u7AE0\u8282"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("th", {
              children: "\u72B6\u6001"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("th", {
              children: "\u66F4\u65B0\u65F6\u95F4"
            })]
          }), props.books.map((book, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(BookSearchItem, {
            book: book
          }, index + book.href)), props.books.length === 0 && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("tr", {
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("td", {
              colSpan: 6,
              children: "\u62B1\u6B49\uFF0C\u5C0F\u722C\u866B\u5DF2\u7ECF\u52AA\u529B\u4E86\uFF01"
            })
          })]
        })
      }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("p", {
        children: "\u63A8\u8350"
      })
    })]
  });
}

function BookSearchItem({
  book
}) {
  const unknown = '[未知]';
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();

  const toDetail = () => {
    (0,_utils_libs_setGlobalLoading__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(true, {
      label: 'loading 书籍详情...'
    });
    router.push(`/txtDownload/detail?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__/* .encryptUrl */ .bl)(book.href)}`);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("tr", {
    className: "xl-book-search-tr-item",
    onClick: toDetail,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("td", {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
        href: `/txtDownload/detail?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__/* .encryptUrl */ .bl)(book.href)}`,
        children: book.type || unknown
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("td", {
      className: "xl-book-title",
      children: book.name || unknown
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("td", {
      children: book.author || unknown
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("td", {
      children: book.newestChapter || unknown
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("td", {
      children: book.status || unknown
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("td", {
      children: book.updateTime || unknown
    })]
  });
} // function BookSearchItem({book}:{book:BlogSearch}){
//     return <div className='xl-book-search-item'>
//         <p className='xl-book-title'>{book.name}</p>
//         <p>作者：{book.author}</p>
//         <p>{book.newestChapter}</p>
//         <p>{book.type}</p>
//         <p>{book.status}</p>
//         <p>更新时间：{book.updateTime}</p>
//     </div>
// }


TxtDownload.layout = _components_layouts_main__WEBPACK_IMPORTED_MODULE_0__/* .getDefaultLayout */ .u;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TxtDownload);

/***/ })

};
;