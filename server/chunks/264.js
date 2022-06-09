exports.id = 264;
exports.ids = [264];
exports.modules = {

/***/ 2240:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1742);
/* harmony import */ var _utils_check__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7549);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





XlTransition.defaultProps = {
  show: false,
  delay: 0,
  duration: 300,
  defaultStyle: {},
  status: {},
  loadInitTransition: false
};

function XlTransition({
  show,
  delay,
  duration,
  children,
  defaultStyle,
  status,
  loadInitTransition
}) {
  const container = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const currentState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(show ? 'entered' : 'exited');
  const defaultStyles = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => _objectSpread({
    transition: `all ${duration}ms ease-in-out`
  }, defaultStyle), [defaultStyle]);
  const initTransition = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(loadInitTransition); //是否展示初始动画

  const {
    0: myStyle,
    1: setMyStyle
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_objectSpread({
    display: show ? 'block' : 'none'
  }, defaultStyle));

  const startTransition = async () => {
    if (show) {
      //enter
      if (initTransition.current) {
        setMyStyle(_objectSpread(_objectSpread({}, defaultStyles), (0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isFunction */ .mf)(status.beforeEnter) ? status.beforeEnter(container.current) : status.beforeEnter));
        currentState.current = 'beforeEnter';
      } else {
        setMyStyle(_objectSpread(_objectSpread({}, defaultStyles), (0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isFunction */ .mf)(status.entered) ? status.entered(container.current) : status.entered));
        currentState.current = 'entered';
        initTransition.current = true;
      }
    } else {
      //exit
      if (initTransition.current) {
        setMyStyle(_objectSpread(_objectSpread({}, defaultStyles), (0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isFunction */ .mf)(status.beforeExit) ? status.beforeExit(container.current) : status.beforeExit));
        currentState.current = 'beforeExit';
      } else {
        setMyStyle(_objectSpread(_objectSpread({}, defaultStyles), (0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isFunction */ .mf)(status.exited) ? status.exited(container.current) : status.exited));
        currentState.current = 'exited';
        initTransition.current = true;
      }
    }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const ret = startTransition();
  }, [show]);

  const changeStatus = async () => {
    if (currentState.current === 'beforeEnter') {
      await (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .sleep */ ._v)(16 + delay); //浏览器每一帧绘制需要16ms时间

      setMyStyle(_objectSpread(_objectSpread({}, defaultStyles), (0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isFunction */ .mf)(status.entering) ? status.entering(container.current) : status.entering));
      currentState.current = 'entering';
    } else if (currentState.current === 'entering') {
      await (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .sleep */ ._v)(duration);
      setMyStyle(_objectSpread(_objectSpread({}, defaultStyles), (0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isFunction */ .mf)(status.entered) ? status.entered(container.current) : status.entered));
      currentState.current = 'entered';
    } else if (currentState.current === 'beforeExit') {
      await (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .sleep */ ._v)(16 + delay);
      setMyStyle(_objectSpread(_objectSpread({}, defaultStyles), (0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isFunction */ .mf)(status.exiting) ? status.exiting(container.current) : status.exiting));
      currentState.current = 'exiting';
    } else if (currentState.current === 'exiting') {
      await (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .sleep */ ._v)(duration);
      setMyStyle(_objectSpread(_objectSpread({}, defaultStyles), (0,_utils_check__WEBPACK_IMPORTED_MODULE_2__/* .isFunction */ .mf)(status.exited) ? status.exited(container.current) : status.exited));
      currentState.current = 'exited';
    }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    changeStatus();
  }, [myStyle]);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    ref: container,
    style: myStyle,
    children: children
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (XlTransition);

/***/ }),

/***/ 7264:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "u": () => (/* binding */ getDefaultLayout)
});

// UNUSED EXPORTS: default

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./utils/dom.ts
var dom = __webpack_require__(2252);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(580);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./utils/libs/clickOutside.ts
var clickOutside = __webpack_require__(1578);
// EXTERNAL MODULE: ./components/common/XlTransition.tsx
var XlTransition = __webpack_require__(2240);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/menu/menu.js








const Menu = /*#__PURE__*/(0,external_react_.forwardRef)(MenuFunc);
MenuFunc.propsTypes = {
  title: (external_prop_types_default()).string,
  //菜单标题
  activeKey: (external_prop_types_default()).string,
  //当前选中菜单项
  style: (external_prop_types_default()).object //样式（菜单整体的）

};
MenuFunc.defaultProps = {
  title: '',
  activeItem: ''
};
const MenuContext = /*#__PURE__*/(0,external_react_.createContext)(null);
const transitions = {
  beforeEnter: {
    transform: 'translateY(-200vh)'
  },
  entering: {
    transform: 'translateY(0)'
  },
  entered: {
    transform: 'translateY(0)'
  },
  beforeExit: {
    transform: 'translateY(0)'
  },
  exiting: {
    transform: 'translateY(-200vh)'
  },
  exited: {
    transform: 'translateY(-200vh)'
  }
};

function MenuFunc(props, ref) {
  // 显示menu
  const {
    0: showMenu,
    1: setShowMenu
  } = (0,external_react_.useState)(false); // 点击外面关闭菜单

  const menuIcon = (0,external_react_.useRef)(null);
  const menu = (0,external_react_.useRef)(null);
  (0,external_react_.useEffect)(() => {
    const clickOutsideDom = clickOutside/* default.addSource */.ZP.addSource(menu.current, e => {
      if (!menuIcon.current.contains(e.target)) {
        setShowMenu(false);
      }
    });
    return () => {
      clickOutside/* default.deleteSource */.ZP.deleteSource(clickOutsideDom);
    };
  }, []); // 当前选中菜单项

  const {
    0: activeKey,
    1: setActiveKey
  } = (0,external_react_.useState)(props.activeKey); // 将激活菜单项提供给menu-item判断是否显示激活样式

  const menuProvider = (0,external_react_.useMemo)(() => {
    return {
      activeKey,
      setActiveKey,
      setShowMenu
    };
  }, [activeKey]); // 路由切换完毕后关闭全局loading

  const router = (0,router_.useRouter)(); // useEffect(() => {
  //     const handleStop = () => {
  //         setGlobalLoading(false)
  //     }
  //     // router.events.on('routeChangeStart', handleStart)
  //     router.events.on('routeChangeComplete', handleStop)
  //     router.events.on('routeChangeError', handleStop)
  //
  //     return () => {
  //         // router.events.off('routeChangeStart', handleStart)
  //         router.events.off('routeChangeComplete', handleStop)
  //         router.events.off('routeChangeError', handleStop)
  //     }
  // }, [])

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "xl-menu",
    style: props.style,
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "xl-menu-icon",
      "data-active": showMenu,
      ref: menuIcon,
      onClick: () => setShowMenu(!showMenu),
      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "xl-menu-icon-middle-line"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(XlTransition/* default */.Z, {
      show: showMenu,
      duration: 300,
      status: transitions,
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        ref: menu,
        className: "xl-menu-main",
        children: [props.title && /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "xl-menu-title",
          children: props.title
        }), /*#__PURE__*/jsx_runtime_.jsx(MenuContext.Provider, {
          value: menuProvider,
          children: props.children
        })]
      })
    })]
  });
}

/* harmony default export */ const menu = (Menu);
// EXTERNAL MODULE: ./utils/libs/setGlobalLoading.js
var setGlobalLoading = __webpack_require__(4431);
;// CONCATENATED MODULE: ./components/menu/MenuItem.js







MenuItem.defaultProps = {
  label: '',
  to: '',
  openBlank: false
};

function MenuItem(props) {
  // menu提供的激活菜单项
  const {
    activeKey,
    setActiveKey,
    setShowMenu
  } = (0,external_react_.useContext)(MenuContext); // 判断当前菜单项是否是激活状态

  const isActive = (0,external_react_.useMemo)(() => {
    return props.menuKey === activeKey;
  }, [props.menuKey, activeKey]); // 点击导航事件

  const navigation = event => {
    var _props$onClick;

    if (props.menuKey) {
      setActiveKey(props.menuKey);
    }

    if (props.to && !isActive) {
      //提供路由路径且不是选中项则跳转
      (0,setGlobalLoading/* default */.Z)(true, {
        label: `loading '${props.label}' ...`
      });
    } // 执行自定义事件


    (_props$onClick = props.onClick) === null || _props$onClick === void 0 ? void 0 : _props$onClick.call(props, event); // 点击后关闭菜单

    setShowMenu(false);
  };

  return props.to ? /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
    href: {
      pathname: props.to // query: {name: 'test'},

    },
    passHref: true,
    children: /*#__PURE__*/jsx_runtime_.jsx("a", {
      className: `xl-menu-item ${isActive ? 'active' : ''}`,
      target: props.openBlank ? '_blank' : '_self',
      onClick: navigation,
      children: props.children || props.label
    })
  }) : /*#__PURE__*/jsx_runtime_.jsx("span", {
    className: `xl-menu-item ${isActive ? 'active' : ''}`,
    onClick: navigation,
    children: props.children || props.label
  });
}

/* harmony default export */ const menu_MenuItem = (MenuItem);
// EXTERNAL MODULE: external "next/script"
var script_ = __webpack_require__(4780);
var script_default = /*#__PURE__*/__webpack_require__.n(script_);
// EXTERNAL MODULE: ./request/config.js + 1 modules
var config = __webpack_require__(8222);
;// CONCATENATED MODULE: ./request/modules/paraRequest.ts

async function addPara(para) {
  return post(`/para/addPara`, para);
}
async function modifyPara(para) {
  return await post(`/para/modifyPara`, para);
}
async function deletePara(key) {
  return get(`/para/deletePara/key/${key}`);
}
async function getParaByKey(key) {
  var _res$data;

  const res = await (0,config/* get */.U2)(`/para/getPara/key/${key}`);
  return (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.paraValue;
}
async function getParaByKeys(keys) {
  return (0,config/* get */.U2)(`/para/getParas`, {
    keys
  });
}
async function getParasByPage(options) {
  return await get(`/para/getParasByPage`, options);
}
;// CONCATENATED MODULE: ./hooks/useTheme.ts




const useTheme = theme => {
  const {
    0: appTheme,
    1: setAppTheme
  } = (0,external_react_.useState)(theme);
  (0,external_react_.useEffect)(() => {
    const theme = localStorage.getItem('appTheme');

    if (theme) {
      setAppTheme(theme);
    } else {
      getParaByKey('blog_default_theme').then(theme => {
        localStorage.setItem('appTheme', theme);
        setAppTheme(theme);
      });
    }
  }, []);
  (0,external_react_.useEffect)(() => {
    const theme = localStorage.getItem('appTheme');

    if (!theme || appTheme === theme) {
      const themeVars = __webpack_require__(1974)(`./${appTheme}Theme.js`).default; // 修复切换背景图时出现的“白色闪屏”现象


      let img = new Image();
      img.src = `/imgs/${appTheme}-bg.jpg`;

      img.onload = function () {
        // document.body.style.backgroundImage = "url(" + img.src + ")";
        document.documentElement.style.setProperty('--base-bg-img', "url(" + img.src + ")");
        Object.keys(themeVars).forEach(item => {
          document.documentElement.style.setProperty(`--${item}`, themeVars[item]);
        });
        (0,setGlobalLoading/* default */.Z)(false);
      };
    }
  }, [appTheme]);
  const changeTheme = (0,external_react_.useCallback)(async () => {
    (0,setGlobalLoading/* default */.Z)(true, {
      label: '主题切换中...'
    });
    const newTheme = appTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('appTheme', newTheme);
    setAppTheme(newTheme);
  }, [appTheme]);
  return [appTheme, changeTheme];
};

/* harmony default export */ const hooks_useTheme = (useTheme);
;// CONCATENATED MODULE: ./components/layouts/main.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // import Wave from "../svg/Wave";






MyLayout.defaultProps = {
  theme: 'light'
}; //带菜单的布局

function MyLayout({
  theme,
  children
}) {
  // 主题
  const [appTheme, changeTheme] = hooks_useTheme(theme); // 菜单过度效果

  const {
    0: para,
    1: setPara
  } = (0,external_react_.useState)({});
  (0,external_react_.useEffect)(() => {
    getParaByKeys(['blog_head_title', 'blog_head_motto']).then(res => {
      const newPara = {};
      res.data.forEach(p => {
        newPara[p.paraKey] = p.paraValue;
      });
      setPara(newPara);
    });
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("header", {
      className: "xl-header",
      children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
        className: "xl-head-logo",
        src: "/imgs/logo.png"
      }), /*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "xl-head-title",
        children: para['blog_head_title']
      }), /*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "xl-head-motto",
        children: para['blog_head_motto']
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(menu, {
      style: {
        position: 'fixed',
        right: '20px',
        top: '20px'
      },
      activeKey: "index",
      title: '导航',
      children: [/*#__PURE__*/jsx_runtime_.jsx(menu_MenuItem, {
        menuKey: "index",
        to: "/",
        label: "\u9996\u9875"
      }), /*#__PURE__*/jsx_runtime_.jsx(menu_MenuItem, {
        menuKey: "types",
        to: "/blog/types/init",
        label: "\u535A\u5BA2\u5206\u7C7B"
      }), /*#__PURE__*/jsx_runtime_.jsx(menu_MenuItem, {
        menuKey: "codeRun",
        to: "/codeRun",
        label: "localCode"
      }), /*#__PURE__*/jsx_runtime_.jsx(menu_MenuItem, {
        menuKey: "search",
        to: "/blog/search/key",
        label: "\u641C\u7D22"
      }), /*#__PURE__*/jsx_runtime_.jsx(menu_MenuItem, {
        menuKey: "jsEditor",
        to: "/editor",
        label: "JS\u5728\u7EBF\u6D4B\u8BD5"
      }), /*#__PURE__*/jsx_runtime_.jsx(menu_MenuItem, {
        menuKey: "txtDownload",
        to: "/txtDownload",
        label: "\u7F51\u6587\u722C\u53D6"
      }), /*#__PURE__*/jsx_runtime_.jsx(menu_MenuItem, {
        menuKey: "changeTheme",
        label: `${appTheme === 'light' ? 'dark' : 'light'}主题`,
        onClick: changeTheme
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("main", {
      className: "xl-main-content",
      children: children
    }), /*#__PURE__*/jsx_runtime_.jsx((script_default()), {
      src: "/libs/particleBg/particles.js",
      strategy: "afterInteractive",
      onLoad: () => {
        (0,dom/* addScript */.Gx)('/libs/particleBg/app.js');
      }
    })]
  });
}

/* harmony default export */ const main = ((/* unused pure expression or super */ null && (MyLayout)));
function getDefaultLayout(page, layoutProps) {
  return /*#__PURE__*/jsx_runtime_.jsx(MyLayout, _objectSpread(_objectSpread({}, layoutProps), {}, {
    children: page
  }));
}

/***/ }),

/***/ 8222:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "U2": () => (/* binding */ get),
  "v_": () => (/* binding */ post)
});

// UNUSED EXPORTS: default, postOrig, restGet, restPost

// EXTERNAL MODULE: ./utils/check.ts
var check = __webpack_require__(7549);
// EXTERNAL MODULE: external "rc-message"
var external_rc_message_ = __webpack_require__(805);
var external_rc_message_default = /*#__PURE__*/__webpack_require__.n(external_rc_message_);
;// CONCATENATED MODULE: ./utils/antdUtil.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-ignore

function formatFormData(data) {
  var _data$map;

  const tmpData = {};
  data === null || data === void 0 ? void 0 : (_data$map = data.map) === null || _data$map === void 0 ? void 0 : _data$map.call(data, d => {
    var _d$name;

    if (((_d$name = d.name) === null || _d$name === void 0 ? void 0 : _d$name.length) > 0 && d.value) {
      tmpData[d.name[0]] = d.value;
    }
  });
  return tmpData;
}
function assignKey(data, columnName) {
  return data.map(d => {
    const keyedData = _objectSpread({
      key: d[columnName]
    }, d);

    if (d.children) {
      keyedData.children = assignKey(d.children, columnName);
    }

    return keyedData;
  });
}
function findItem(data, keyName, value) {
  for (const d of data) {
    if (d[keyName] === value) {
      return d;
    } else if (d.children) {
      const found = findItem(d.children, keyName, value);
      if (found) return found;
    }
  }

  return null;
}
function formatSwitchValue(data, ...columns) {
  columns.forEach(column => {
    data[column] = data[column] === 'Y' || data[column] === 'y';
  });
  return data;
}
function showfailMessage(msg) {
  external_rc_message_default().error(msg === null || msg === void 0 ? void 0 : msg.toString(), 8);
}
function showSuccessMessage(msg) {
  message.success(msg, 5);
}
;// CONCATENATED MODULE: ./request/config.js
function config_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function config_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { config_ownKeys(Object(source), true).forEach(function (key) { config_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { config_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function config_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const baseUrl = "https://ttppl.xyz";
const baseClientUrl = "https://ttppl.xyz";
const headers = {
  'Content-Type': 'application/json'
};
function request(moduleUrl) {
  return {
    doGet(url, params) {
      return get(moduleUrl + url, params);
    },

    doPost(url, params) {
      return post(moduleUrl + url, params);
    },

    doRestGet(url, param, query) {
      return restGet(moduleUrl + url, param, query);
    },

    doRestPost(url, param, query) {
      return restPost(moduleUrl + url, param, query);
    }

  };
}

const https = __webpack_require__(5687);

const options = {
  headers: config_objectSpread(config_objectSpread({}, headers), {}, {
    'Authorization': 'xl-blog-next-app'
  })
};

if (true) {
  options.agent = new https.Agent({
    rejectUnauthorized: false
  });
}

function get(url, params = {}) {
  var _Object$keys;

  const encodedParams = [];
  (_Object$keys = Object.keys(params || {})) === null || _Object$keys === void 0 ? void 0 : _Object$keys.forEach(k => {
    if (params[k]) {
      encodedParams.push(`${k}=${params[k]}`);
    }
  });
  const encodedParam = encodedParams.length > 0 ? `?${encodedParams.join('&')}` : '';
  const reqUrl = encodeURI(`${check/* isServer */.sk ? baseUrl : baseClientUrl}${url}${encodedParam}`);
  return new Promise((resolve, reject) => {
    fetch(reqUrl, config_objectSpread({
      method: 'GET'
    }, options)).then(response => {
      // console.log(response,response.status)
      return response.json();
    }).then(data => {
      if (!data.success && !check/* isServer */.sk) {
        // showfailMessage(data.msg)
        // throw new Error(data.msg)
        reject(data.msg);
      }

      resolve(data);
    }).catch(function (err) {
      console.log(err);

      if (!check/* isServer */.sk) {
        showfailMessage(err);
      }

      reject(err);
    });
  });
}
function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    fetch(encodeURI(`${check/* isServer */.sk ? baseUrl : baseClientUrl}${url}`), config_objectSpread({
      method: 'POST',
      headers,
      body: JSON.stringify(params)
    }, options)).then(response => {
      return response.json();
    }).then(data => {
      if (!data.success && !check/* isServer */.sk) {
        // showfailMessage(data.msg)
        // throw new Error(data.msg)
        reject(data.msg);
      }

      resolve(data);
    }).catch(function (err) {
      if (!check/* isServer */.sk) {
        showfailMessage(err);
      }

      reject(err);
    });
  });
}
function postOrig(url, params = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers,
      redirect: 'follow',
      body: JSON.stringify(params)
    }).then(response => {
      // console.log(response)
      if (response.redirected) {
        window.location.href = response.url;
      }

      return response.json();
    }).then(data => {
      resolve((data === null || data === void 0 ? void 0 : data.data) || data || {
        msg: 'unknown response'
      });
    }).catch(function (err) {
      console.log('error:', err);
      reject(err);
    });
  });
}
function restGet(url, param, query) {
  let encodedUrl = Array.isArray(param) ? param.join("/") : param;
  return get([url, encodedUrl].filter(n => n).join('/'), query);
}
function restPost(url, param, query) {
  let encodedUrl = Array.isArray(param) ? param.join("/") : param;
  return post([url, encodedUrl].filter(n => n).join('/'), query);
}

/***/ }),

/***/ 7851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const LIGHT_THEME = {
  'base-color': '#ffffff',
  //基本色
  'base-bg-color': '#000000',
  //基本背景色
  'header-bg': '#000000',
  //header背景色
  'menu-icon': '#ffffff',
  //菜单bar颜色
  'menu-bg': '#666666',
  //菜单弹出框背景色
  'category-bg': '#4e4b4b',
  //目录背景颜色（手机端弹出框目录）
  'code-bg': '#8d8787',
  //代码背景颜色
  'list-bar-bg': '#909399',
  //列表项的bar
  'mask': '#00000080',
  //遮罩层
  'loading': '#3cee3c',
  //加载图标颜色
  'modal-bg': '#575656',
  //modal背景
  'modal-title': '#eaeaea',
  //modal标题
  'index-blog-card-border': '3px solid #ffffff',
  //首页博客卡边框
  'index-bg': '#565a5e',
  //主页博客列表背景
  'code-run-detail-tag-bg': '#a09b9b' //code-run标签背景色

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LIGHT_THEME);

/***/ }),

/***/ 182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const LIGHT_THEME = {
  'base-color': '#000000',
  //基本色
  'base-bg-color': '#ffffff',
  //基本背景色
  'header-bg': '#f5f6f7',
  //header背景色
  'menu-icon': '#808080',
  //菜单bar颜色,灰色
  'menu-bg': '#ffffff',
  //菜单弹出框背景色
  'category-bg': '#ffffff',
  //目录背景颜色（手机端弹出框目录）
  'code-bg': '#f5f5f5',
  //代码背景颜色
  'list-bar-bg': '#909399',
  //列表项的bar
  'mask': '#00000080',
  //遮罩层
  'loading': '#3cee3c',
  //加载图标颜色
  'modal-bg': '#ffffff',
  //modal背景
  'modal-title': '#666',
  //modal标题
  'index-blog-card-border': 'none',
  //首页博客卡边框
  'index-bg': '#f5f6f7',
  //主页博客列表背景
  'code-run-detail-tag-bg': '#a09b9b' //code-run标签背景色

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LIGHT_THEME);

/***/ }),

/***/ 2252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "S1": () => (/* binding */ off),
/* harmony export */   "k": () => (/* binding */ getClasses),
/* harmony export */   "j3": () => (/* binding */ getElementSize),
/* harmony export */   "X5": () => (/* binding */ scrollTo),
/* harmony export */   "cx": () => (/* binding */ getScrollTop),
/* harmony export */   "Gx": () => (/* binding */ addScript),
/* harmony export */   "bl": () => (/* binding */ encryptUrl),
/* harmony export */   "yt": () => (/* binding */ decryptUrl)
/* harmony export */ });
/* unused harmony exports getKeyCode, isCtrlKey, isShiftKey, KEY_CODE, insertTextAtCursor, getStyle, setStyle, getOffsetTop, getOffsetTopDistance, isInView, removeScript */
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7549);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(871);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_1__);



function getKeyCode(e) {
  return e.keyCode || e.which || e.charCode;
}
function isCtrlKey(e) {
  return e.ctrlKey || e.metaKey;
}
function isShiftKey(e) {
  return e.shiftKey;
}
const KEY_CODE = {
  enter: 13,
  P: 80,
  F: 70
};
function insertTextAtCursor(el, text, newLine = false, cursorOffset = 0) {
  //IE support
  if (document.selection) {
    el.focus();
    const sel = document.selection.createRange();
    sel.text = text;
    sel.select();
  } //MOZILLA/NETSCAPE support
  else if (el.selectionStart || el.selectionStart === 0) {
    const startPos = el.selectionStart;
    const endPos = el.selectionEnd;
    const restoreTop = el.scrollTop;
    let newLineString = '';

    if (newLine) {
      const index = el.value.substring(0, startPos).lastIndexOf('\n') + 1;
      newLineString = newLine ? el.value.substring(index, startPos) ? '\n' : '' : '';
    }

    el.value = el.value.substring(0, startPos) + newLineString + text + el.value.substring(endPos, el.value.length);

    if (restoreTop > 0) {
      el.scrollTop = restoreTop;
    }

    el.focus();
    el.selectionStart = startPos + text.length + newLineString.length + cursorOffset;
    el.selectionEnd = startPos + text.length + newLineString.length + cursorOffset;
  } else {
    el.value += text;
    el.focus();
  }
}
function on(element, event, handler, useCapture = false) {
  element.addEventListener(event, handler, useCapture);
}
function off(element, event, handler, useCapture = false) {
  element.removeEventListener(event, handler, useCapture);
}
function getClasses(arr) {
  return arr.filter(n => n).join(' ');
} // function splitCamel(str){
//     return str.replace(/([A-Z])/g,function(s){
//         return ' '+s.toLowerCase();
//     }).trim().split(' ');
// }
// export function setStyle (element:HTMLElement, styleName:string, value:string):void {
//     if (!element || !styleName) return
//
//     if (isObject(styleName)) {
//         Object.keys(styleName).forEach(prop => {
//             setStyle(element, prop, styleName[prop])
//         })
//     } else {
//         styleName = splitCamel(styleName)
//         element.style[styleName] = value
//     }
// }

function isNoneDisplay(el) {
  const display = getStyle(el, 'display');

  if (display !== 'none') {
    if (el && el.parentNode && el.parentNode.nodeName !== 'BODY') {
      return isNoneDisplay(el.parentNode);
    } else {
      return {
        isNone: false,
        ele: el
      };
    }
  } else {
    return {
      isNone: true,
      ele: el
    };
  }
}

const getStyle = function (element, styleName) {
  if (!element || !styleName) return '';
  styleName = lodash__WEBPACK_IMPORTED_MODULE_0___default().camelCase(styleName);

  if (styleName === 'float') {
    styleName = 'cssFloat';
  } // @ts-ignore


  const style = element.style[styleName];
  if (style) return style;

  try {
    // @ts-ignore
    const computed = document.defaultView.getComputedStyle(element, '');
    return computed === null || computed === void 0 ? void 0 : computed[styleName];
  } catch (e) {
    return style;
  }
};
function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if ((0,_check__WEBPACK_IMPORTED_MODULE_2__/* .isObject */ .Kn)(styleName)) {
    Object.keys(styleName).forEach(prop => {
      // @ts-ignore
      setStyle(element, prop, styleName[prop]);
    });
  } else {
    styleName = lodash__WEBPACK_IMPORTED_MODULE_0___default().camelCase(styleName); // @ts-ignore

    element.style[styleName] = value;
  }
}
function getElementSize(el, elPos = 'absolute') {
  const size = {
    width: 0,
    height: 0
  };
  const displayNone = isNoneDisplay(el);

  if (displayNone.isNone) {
    const position = getStyle(displayNone.ele, 'position');
    const zIndex = getStyle(displayNone.ele, 'zIndex');
    const visibility = getStyle(displayNone.ele, 'visibility');
    const display = getStyle(displayNone.ele, 'display');
    setStyle(displayNone.ele, 'position', elPos);
    setStyle(displayNone.ele, 'zIndex', '-100');
    setStyle(displayNone.ele, 'visibility', 'hidden');
    setStyle(displayNone.ele, 'display', 'block');
    size.width = displayNone.ele.getBoundingClientRect().width;
    size.height = displayNone.ele.getBoundingClientRect().height;
    setStyle(displayNone.ele, 'position', position);
    setStyle(displayNone.ele, 'zIndex', zIndex);
    setStyle(displayNone.ele, 'visibility', visibility);
    setStyle(displayNone.ele, 'display', display);
  } else {
    size.width = el.getBoundingClientRect().width;
    size.height = el.getBoundingClientRect().height;
  }

  return size;
}
const getOffsetTop = el => {
  let offset = 0;
  let parent = el;

  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return offset;
};
const getOffsetTopDistance = (el, containerEl) => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};

const cubic = value => Math.pow(value, 3);

const easeInOutCubic = value => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;

const scrollTo = (container = document.documentElement || document.body || window.pageYOffset, el, offset = 0) => {
  const beginTime = Date.now();
  const beginValue = container.scrollTop;
  const distance = getOffsetTopDistance(container, el) - beginValue + offset;

  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));

  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500;

    if (progress < 1) {
      container.scrollTop = beginValue + distance * easeInOutCubic(progress);
      rAF(frameFunc);
    } else {
      container.scrollTop = beginValue + distance;
    }
  };

  rAF(frameFunc);
};
const getScrollTop = el => {
  if (!el || el === document) {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  } else {
    return el.scrollTop;
  }
};
const isInView = (el, offset) => {
  try {
    const boundingRect = el.getBoundingClientRect(); // const windowWidth = window.innerWidth||document.documentElement.clientWidth
    // console.log(boundingRect)

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    console.log(boundingRect.top, boundingRect.bottom, windowHeight, offset === null || offset === void 0 ? void 0 : offset.offsetTop, offset === null || offset === void 0 ? void 0 : offset.offsetBottom);
    return boundingRect.top < windowHeight - ((offset === null || offset === void 0 ? void 0 : offset.offsetBottom) || 0) && boundingRect.bottom > ((offset === null || offset === void 0 ? void 0 : offset.offsetTop) || 0);
  } catch (e) {
    return false;
  }
};
const DOM_SCRIPTS = new Map();
const addScript = (src, dom, async = false) => {
  return new Promise((resolve, reject) => {
    const target = dom || document.getElementsByTagName('head')[0];

    if (!DOM_SCRIPTS.get(src)) {
      const script = document.createElement('script');
      script.src = src;
      const id = `xl-script-${DOM_SCRIPTS.size}`;
      script.id = id;
      async && (script.async = async);
      target.appendChild(script);
      DOM_SCRIPTS.set(src, {
        dom: target,
        id
      });

      script.onload = e => {
        resolve(e);
      };
    } else {
      resolve('loaded');
    }
  });
};
const removeScript = src => {
  return new Promise((resolve, reject) => {
    const domScript = DOM_SCRIPTS.get(src);

    if (domScript) {
      const target = domScript.dom;
      const script = document.getElementById(domScript.id);

      if (script) {
        target === null || target === void 0 ? void 0 : target.removeChild(script);
        DOM_SCRIPTS.delete(src);
      }
    }
  });
};
const encryptUrl = url => {
  if (buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer && url) {
    return new buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer(encodeURI(url)).toString('base64');
  } else return url;
};
const decryptUrl = url => {
  if (buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer && url) {
    return decodeURI(new buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer(url, 'base64').toString());
  } else return url;
};

/***/ }),

/***/ 1742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_v": () => (/* binding */ sleep),
/* harmony export */   "ll": () => (/* binding */ getClass),
/* harmony export */   "B8": () => (/* binding */ asyncDownloadFile)
/* harmony export */ });
/* unused harmony export downloadFile */
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7549);

const sleep = timeountMS => new Promise(resolve => {
  // console.log('timeBegin')
  setTimeout(e => {
    // console.log('timeOut')
    resolve(e);
  }, timeountMS);
});
const getClass = className => {
  const classNames = [];

  if ((0,_check__WEBPACK_IMPORTED_MODULE_0__/* .isString */ .HD)(className)) {
    classNames.push(className);
  }

  if (Array.isArray(className)) {
    className.forEach(classNameItem => classNames.push(getClass(classNameItem)));
  }

  if ((0,_check__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Kn)(className)) {
    Object.keys(className).forEach(key => {
      if (className[key]) {
        classNames.push(key);
      }
    });
  }

  return classNames.join(' ');
};
function asyncDownloadFile(url, options) {
  return new Promise((resolve, reject) => {
    url = url.replace(/\\/g, '/');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(url), true);
    xhr.responseType = 'blob'; // xhr.withCredentials = true;

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 获取文件blob数据并保存
        const fileName = (options === null || options === void 0 ? void 0 : options.fileName) || getFileName(url);
        saveAs(xhr.response, fileName);
        resolve(true);
      } else {
        reject();
      }
    };

    if ((0,_check__WEBPACK_IMPORTED_MODULE_0__/* .isFunction */ .mf)(options === null || options === void 0 ? void 0 : options.onProgress)) {
      xhr.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          const percentComplete = evt.loaded / evt.total;
          (options === null || options === void 0 ? void 0 : options.onProgress.bind(options))(percentComplete);
        }
      }, false);
      xhr.send();
    }
  });
}
/**
 * URL方式保存文件到本地
 * @param data 文件的blob数据
 * @param name 文件名
 */

function saveAs(data, name) {
  const urlObject = window.URL || window.webkitURL || window;
  const export_blob = new Blob([data]);
  downloadFile(urlObject.createObjectURL(export_blob), name);
}

const downloadFile = (url, name) => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', name);
  a.click();
};
/**
 * 根据文件url获取文件名
 * @param url 文件url
 */

function getFileName(url) {
  const num = url.lastIndexOf('/') + 1;
  let fileName = url.substring(num); //把参数和文件名分割开

  fileName = decodeURI(fileName.split("?")[0]);
  return fileName;
}

/***/ }),

/***/ 1578:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports addSource, deleteSource */
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7549);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2252);


const listeners = new Map();
let isListening = false;
function addSource(dom, callback) {
  const callbacks = listeners.get(dom);

  if ((0,_check__WEBPACK_IMPORTED_MODULE_1__/* .isNull */ .Ft)(callbacks)) {
    listeners.set(dom, [callback]);
  } else {
    if (callbacks.includes(callback)) return;
    callbacks.push(callback);
  }

  if (!isListening) {
    start();
  }

  return dom;
}
function deleteSource(dom, callback) {
  if ((0,_check__WEBPACK_IMPORTED_MODULE_1__/* .isNull */ .Ft)(callback)) {
    listeners.delete(dom);
  } else {
    if ((0,_check__WEBPACK_IMPORTED_MODULE_1__/* .isNull */ .Ft)(listeners.get(dom))) return;
  }

  if (listeners.size < 1) {
    stop();
  }
}

const callback = e => {
  // console.log('clickOutside execute callbacks')
  listeners.forEach((callbacks, dom) => {
    if (!dom.contains(e.target)) {
      callbacks === null || callbacks === void 0 ? void 0 : callbacks.forEach(fun => {
        fun(e, dom);
      });
    }
  });
};

function start() {
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.on)(document, 'click', callback);
  isListening = true;
}

function stop() {
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__/* .off */ .S1)(document, 'click', callback);
  isListening = false;
}

const ClickOutside = {
  addSource,
  deleteSource
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClickOutside);

/***/ }),

/***/ 1974:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./darkTheme.js": 7851,
	"./lightTheme.js": 182
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1974;

/***/ })

};
;