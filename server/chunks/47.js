"use strict";
exports.id = 47;
exports.ids = [47];
exports.modules = {

/***/ 6047:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2252);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const IconFun = (props, ref) => {
  const className = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const classNames = props.className.split(' ');
    return (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__/* .getClasses */ .k)(['xl-iconfont', `xl-icon-${classNames[0]}`, ...classNames.slice(1, classNames.length)]);
  }, [props.className]);
  const style = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const stl = _objectSpread({}, props.style);

    props.size && (stl.fontSize = `${props.size}px`);
    props.onClick && (stl.cursor = 'pointer');
    stl.color = props.color;
    return stl;
  }, [props.style, props.size, props.onClick]);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("i", _objectSpread(_objectSpread({
    ref: ref
  }, props), {}, {
    className: className,
    onClick: props.onClick,
    title: props.title,
    style: style,
    children: props.children
  }));
};

const Icon = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(IconFun);
Icon.propTypes = {
  className: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  style: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  color: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  size: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  title: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().func)
};
Icon.defaultProps = {
  className: '',
  size: 20,
  color: ''
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ })

};
;