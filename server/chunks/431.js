"use strict";
exports.id = 431;
exports.ids = [431];
exports.modules = {

/***/ 3084:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_check__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7549);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);







function Loading(props) {
  const loadingStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const style = {};

    if (props.size) {
      const size = (0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .hj)(props.size) ? `${props.size}px` : props.size;
      style.width = size;
      style.height = size;
    }

    return style;
  }, [props.size]);
  const pathStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const style = {};

    if ((0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .hj)(props.size)) {
      style.strokeWidth = `${props.size / 10}px`;
    }

    props.strokeWidth && (style.strokeWidth = `${props.strokeWidth}px`);
    return style;
  }, [props.size, props.strokeWidth]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("svg", {
      style: loadingStyle,
      viewBox: "25 25 50 50",
      className: "xl-loading-circle-svg",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("circle", {
        style: pathStyle,
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        className: "path"
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
      className: "xl-loading-children",
      children: props.children
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("p", {
      className: "xl-loading-label",
      style: {
        fontSize: props.labelSize
      },
      children: props.label
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);

/***/ }),

/***/ 7549:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kn": () => (/* binding */ isObject),
/* harmony export */   "HD": () => (/* binding */ isString),
/* harmony export */   "mf": () => (/* binding */ isFunction),
/* harmony export */   "hj": () => (/* binding */ isNumber),
/* harmony export */   "Ft": () => (/* binding */ isNull),
/* harmony export */   "n$": () => (/* binding */ checkDevice),
/* harmony export */   "sk": () => (/* binding */ isServer)
/* harmony export */ });
/* unused harmony exports isArray, isBoolean */
const isObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
const isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
const isString = function (obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
};
const isFunction = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};
const isBoolean = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
};
const isNumber = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Number]';
};
const isNull = function (obj) {
  return ['[object Null]', '[object Undefined]'].includes(Object.prototype.toString.call(obj));
};
const checkDevice = () => {
  var _sUserAgent$match, _sUserAgent$match2, _sUserAgent$match3, _sUserAgent$match4, _sUserAgent$match5, _sUserAgent$match6, _sUserAgent$match7, _sUserAgent$match8;

  const sUserAgent = navigator.userAgent.toLowerCase();
  const bIsIpad = ((_sUserAgent$match = sUserAgent.match(/ipad/i)) === null || _sUserAgent$match === void 0 ? void 0 : _sUserAgent$match[0]) === 'ipad';
  const bIsIphoneOs = ((_sUserAgent$match2 = sUserAgent.match(/iphone os/i)) === null || _sUserAgent$match2 === void 0 ? void 0 : _sUserAgent$match2[0]) === 'iphone os';
  const bIsMidp = ((_sUserAgent$match3 = sUserAgent.match(/midp/i)) === null || _sUserAgent$match3 === void 0 ? void 0 : _sUserAgent$match3[0]) === 'midp';
  const bIsUc7 = ((_sUserAgent$match4 = sUserAgent.match(/rv:1.2.3.4/i)) === null || _sUserAgent$match4 === void 0 ? void 0 : _sUserAgent$match4[0]) === 'rv:1.2.3.4';
  const bIsUc = ((_sUserAgent$match5 = sUserAgent.match(/ucweb/i)) === null || _sUserAgent$match5 === void 0 ? void 0 : _sUserAgent$match5[0]) === 'ucweb';
  const bIsAndroid = ((_sUserAgent$match6 = sUserAgent.match(/android/i)) === null || _sUserAgent$match6 === void 0 ? void 0 : _sUserAgent$match6[0]) === 'android';
  const bIsCE = ((_sUserAgent$match7 = sUserAgent.match(/windows ce/i)) === null || _sUserAgent$match7 === void 0 ? void 0 : _sUserAgent$match7[0]) === 'windows ce';
  const bIsWM = ((_sUserAgent$match8 = sUserAgent.match(/windows mobile/i)) === null || _sUserAgent$match8 === void 0 ? void 0 : _sUserAgent$match8[0]) === 'windows mobile';

  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return 'mobile';
  } else {
    return 'pc';
  }
}; // export const isMobile = checkDevice()==='mobile'

const isServer = true;

/***/ }),

/***/ 4431:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ setGlobalLoading)
/* harmony export */ });
/* harmony import */ var _components_common_Loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3084);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6405);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const GlobalLoading = {
  isLoading: false,
  container: null,
  target: null
};
function setGlobalLoading(show, options = {
  label: ''
}) {
  if (!GlobalLoading.container) {
    GlobalLoading.container = document.createElement('div');
    GlobalLoading.container.className = 'xl-loading-container mask';
    GlobalLoading.container.style.position = 'fixed';
  }

  if (!GlobalLoading.target) {
    GlobalLoading.target = document.body;
  }

  if (show) {
    if (GlobalLoading.isLoading) {
      return;
    }

    react_dom__WEBPACK_IMPORTED_MODULE_1___default().render( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_components_common_Loading__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z, _objectSpread({}, options)), GlobalLoading.container);
    GlobalLoading.target.appendChild(GlobalLoading.container);
    GlobalLoading.isLoading = true;
  } else {
    react_dom__WEBPACK_IMPORTED_MODULE_1___default().unmountComponentAtNode(GlobalLoading.container);

    if (GlobalLoading.target.contains(GlobalLoading.container)) {
      GlobalLoading.target.removeChild(GlobalLoading.container);
    }

    GlobalLoading.isLoading = false;
  }
}

/***/ })

};
;