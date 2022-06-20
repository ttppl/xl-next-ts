"use strict";
(() => {
var exports = {};
exports.id = 915;
exports.ids = [915,839];
exports.modules = {

/***/ 2381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ detail),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: ./utils/dom.ts
var dom = __webpack_require__(2252);
// EXTERNAL MODULE: ./request/modules/txtDownloadRequest.ts
var txtDownloadRequest = __webpack_require__(7733);
// EXTERNAL MODULE: ./components/layouts/main.js + 4 modules
var main = __webpack_require__(7264);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./utils/index.ts
var utils = __webpack_require__(1742);
// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(6405);
var external_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_react_dom_);
;// CONCATENATED MODULE: external "rc-dialog"
const external_rc_dialog_namespaceObject = require("rc-dialog");
var external_rc_dialog_default = /*#__PURE__*/__webpack_require__.n(external_rc_dialog_namespaceObject);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/common/Modal.tsx
 // @ts-ignore







const Confirm = ({
  title,
  onCancel,
  maskClosable,
  zIndex,
  centered,
  onOk,
  cancelText,
  okText
}) => {
  const container = document.createElement('div');
  container.className = 'modal-container';

  const close = () => {
    onCancel === null || onCancel === void 0 ? void 0 : onCancel();
    clear();
  };

  const ok = () => {
    onOk === null || onOk === void 0 ? void 0 : onOk();
    clear();
  };

  const clear = () => {
    external_react_dom_default().unmountComponentAtNode(container);
    document.body.removeChild(container);
  };

  external_react_dom_default().render( /*#__PURE__*/jsx_runtime_.jsx((external_rc_dialog_default()), {
    title: title,
    onClose: clear,
    maskClosable: maskClosable,
    zIndex: zIndex // modalRender={()=><div>11111</div>}
    ,
    visible: true,
    destroyOnClose: true,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "xl-modal--buttons",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "xl-modal--button",
        onClick: close,
        children: cancelText || '取消'
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "xl-modal--button",
        onClick: ok,
        children: okText || '确认'
      })]
    })
  }), container);
  document.body.appendChild(container);
};
// EXTERNAL MODULE: ./components/common/Icon.js
var Icon = __webpack_require__(6047);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: ./utils/libs/setGlobalLoading.js
var setGlobalLoading = __webpack_require__(4431);
;// CONCATENATED MODULE: ./pages/txtDownload/detail/index.tsx
const _excluded = ["chapter", "active", "disableRouter"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













async function getServerSideProps({
  query
}) {
  const url = (0,dom/* decryptUrl */.yt)(query.key);
  const txtInfo = await (0,txtDownloadRequest/* getTxtInfo */.RR)(url);
  return {
    props: {
      txtInfo: _objectSpread(_objectSpread({}, txtInfo), {}, {
        href: url
      })
    }
  };
}

function TxtDetail({
  txtInfo
}) {
  // 章节
  const {
    0: chapters,
    1: setChapters
  } = (0,external_react_.useState)(txtInfo.chapters); // 排序

  const {
    0: positiveOrder,
    1: setPositiveOrder
  } = (0,external_react_.useState)(true); // 切换排序

  const changeOrder = () => {
    setChapters(chapters.reverse());
    setPositiveOrder(!positiveOrder);
  }; // 下载模式


  const {
    0: downloadMode,
    1: setDownloadMode
  } = (0,external_react_.useState)(false); // 选择的章节

  const {
    0: selectedChapter,
    1: setSelectedChapter
  } = (0,external_react_.useState)([]); // 全选

  const selectAllToggle = () => {
    if (selectedChapter[0] !== 1 && selectedChapter[1] !== chapters.length) {
      setSelectedChapter([1, chapters.length]);
    } else {
      setSelectedChapter([]);
    }
  }; // 选择需要下载的章节


  const selectChapter = index => {
    const chapterIndex = parseFloat(index);
    const newChapterRange = [...selectedChapter];

    if (chapterIndex < Math.min(...selectedChapter) || chapterIndex > Math.max(...selectedChapter)) {
      newChapterRange[0] = Math.min(chapterIndex, ...selectedChapter);
      newChapterRange[1] = Math.max(chapterIndex, ...selectedChapter);
      setSelectedChapter(newChapterRange);
    } else {
      Confirm({
        zIndex: 1000,
        maskClosable: false,
        centered: true,
        title: '当前选中章节为？',
        onOk: () => {
          newChapterRange[1] = chapterIndex;
          setSelectedChapter(newChapterRange);
        },
        // 点击确定时要执行的事件
        onCancel: () => {
          newChapterRange[0] = chapterIndex;
          setSelectedChapter(newChapterRange);
        },
        cancelText: '起始',
        okText: '终止'
      });
    }
  }; // 下载txt文件
  // ws连接实例


  const wsRef = (0,external_react_.useRef)(null); // 文件模型对象

  const fileModel = (0,external_react_.useRef)({}); // 消息面板是否可见

  const {
    0: isMsgPanelVisible,
    1: setIsMsgPanelVisible
  } = (0,external_react_.useState)(false); // 下载进度

  const {
    0: downloadProgress,
    1: setDownloadProgress
  } = (0,external_react_.useState)(0); // 显示消息

  const showServerMsg = msg => {
    const container = document.getElementById('xl-ws-msg-panel');
    const msgBox = document.createElement('div');
    msgBox.innerHTML = msg;
    container === null || container === void 0 ? void 0 : container.insertBefore(msgBox, container.firstChild);
  }; // 开始下载


  const download = () => {
    setIsMsgPanelVisible(true);
    const ws = new WebSocket(`${"wss://ttppl.xyz"}/ws/downloadTxt`);
    wsRef.current = ws; // 连接简历后发送参数

    ws.addEventListener('open', function (event) {
      showServerMsg('服务器已连接...');
      ws.send(JSON.stringify({
        name: txtInfo.name,
        href: txtInfo.href,
        chapters: selectedChapter,
        chapterSplicer: txtInfo.chapterSplicer
      }));
    }); // 监听服务器发送的消息

    ws.addEventListener('message', function (event) {
      const msg = event.data;

      if (msg.startsWith('$')) {
        showServerMsg(msg.slice(1));
      } else {
        const res = JSON.parse(msg);

        if (res !== null && res !== void 0 && res.id) {
          fileModel.current = res;
        }
      }
    }); // 服务器下载完成关闭连接后下载文件到本地

    ws.addEventListener('close', function (event) {
      if (fileModel.current.id) {
        showServerMsg('异步下载文件中...');
        (0,utils/* asyncDownloadFile */.B8)(`${"https://ttppl.xyz/file/id/"}${fileModel.current.id}`, {
          fileName: `${fileModel.current.fileName}.${fileModel.current.fileType}`,
          onProgress: progress => {
            setDownloadProgress(progress * 100);
          }
        }).then(() => {
          setIsMsgPanelVisible(false);
        });
      }
    });
  }; // 取消下载


  const cancelDownload = () => {
    var _wsRef$current;

    console.log('取消下载...');
    (_wsRef$current = wsRef.current) === null || _wsRef$current === void 0 ? void 0 : _wsRef$current.close();
    setIsMsgPanelVisible(false);
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "xl-txt-info-main",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "xl-txt-info-header",
      children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
        className: "cover-img",
        src: txtInfo.coverImg || 'https://ttppl.xyz/file/id/70',
        alt: "\u5C01\u9762\u56FE"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "book-info",
        children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
          className: "book-name",
          children: txtInfo.name
        }), /*#__PURE__*/jsx_runtime_.jsx("p", {
          className: "book-author",
          children: txtInfo.author
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "book-other-info",
          children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
            children: txtInfo.lastUpdateTime
          }), /*#__PURE__*/jsx_runtime_.jsx("p", {
            children: txtInfo.newestChapter
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "book-abstract",
          title: txtInfo.abstract,
          children: txtInfo.abstract
        })]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "xl-mobile-abstract",
      children: txtInfo.abstract
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (0,utils/* getClass */.ll)(['xl-txt-info-chapters', {
        'download-mode': downloadMode
      }]),
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "xl-chapters-function-bar",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "xl-button",
          onClick: changeOrder,
          children: !positiveOrder ? '正序' : '倒序'
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "xl-button",
          onClick: () => {
            setDownloadMode(!downloadMode);
          },
          children: downloadMode ? '阅读模式' : '下载模式'
        }), downloadMode && /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "xl-button",
          onClick: selectAllToggle,
          children: selectedChapter[0] !== 1 && selectedChapter[1] !== chapters.length ? '全选' : '全不选'
        }), downloadMode && /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "xl-button",
          onClick: download,
          children: "\u4E0B\u8F7D"
        })]
      }), chapters.map((chapter, index) => /*#__PURE__*/jsx_runtime_.jsx(ChapterItem, {
        disableRouter: downloadMode,
        active: downloadMode && chapter.chapterIndex >= selectedChapter[0] && chapter.chapterIndex <= selectedChapter[1],
        onClick: () => downloadMode && selectChapter(chapter.chapterIndex),
        chapter: chapter
      }, chapter.name + index))]
    }), isMsgPanelVisible && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      id: "xl-ws-msg-panel",
      children: [/*#__PURE__*/jsx_runtime_.jsx(Icon/* default */.Z, {
        className: "close close-icon",
        onClick: cancelDownload
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        children: "\u521D\u59CB\u5316\u8FDE\u63A5..."
      })]
    })]
  });
}

function ChapterItem(_ref) {
  let {
    chapter,
    active,
    disableRouter
  } = _ref,
      res = _objectWithoutProperties(_ref, _excluded);

  const toChapter = event => {
    if (disableRouter) {
      event.preventDefault();
    } else {
      (0,setGlobalLoading/* default */.Z)(true, {
        label: `章节【${chapter.name}】准备中...`
      });
    }
  };

  return /*#__PURE__*/jsx_runtime_.jsx("div", _objectSpread(_objectSpread({}, res), {}, {
    className: (0,utils/* getClass */.ll)(['xl-txt-chapter-item', {
      active
    }]),
    children: /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
      href: {
        pathname: '/txtDownload/chapter',
        query: {
          key: (0,dom/* encryptUrl */.bl)(chapter.url)
        }
      },
      passHref: true,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: (0,utils/* getClass */.ll)({
          "reading-mode": !disableRouter
        }),
        onClick: toChapter,
        children: chapter.name
      })
    })
  }));
}

TxtDetail.layout = main/* getDefaultLayout */.uy;
/* harmony default export */ const detail = (TxtDetail);

/***/ }),

/***/ 7733:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "yC": () => (/* binding */ search),
/* harmony export */   "RR": () => (/* binding */ getTxtInfo),
/* harmony export */   "bR": () => (/* binding */ getChapter)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8222);

async function search(key) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/txtDownload/search`, {
    key
  });
  return res.data;
}
async function getTxtInfo(url) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/txtDownload/getTxtInfo`, {
    url
  });
  return res.data;
}
async function getChapter(url) {
  const res = await (0,_config__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(`/txtDownload/getTxtChapter`, {
    url
  });
  return res.data || {
    content: '小小爬虫怠工了！'
  };
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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [400,664,431,264,47], () => (__webpack_exec__(2381)));
module.exports = __webpack_exports__;

})();