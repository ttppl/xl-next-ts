"use strict";
(() => {
var exports = {};
exports.id = 908;
exports.ids = [908];
exports.modules = {

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 7610:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: ./utils/check.ts
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
const isNum = function (num) {
  return isNumber(num) ? true : /^-?\d*\.?\d*$/.test(num);
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
;// CONCATENATED MODULE: external "rc-message"
const external_rc_message_namespaceObject = require("rc-message");
var external_rc_message_default = /*#__PURE__*/__webpack_require__.n(external_rc_message_namespaceObject);
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
  const reqUrl = encodeURI(`${isServer ? baseUrl : baseClientUrl}${url}${encodedParam}`);
  return new Promise((resolve, reject) => {
    fetch(reqUrl, config_objectSpread({
      method: 'GET'
    }, options)).then(response => {
      // console.log(response,response.status)
      return response.json();
    }).then(data => {
      if (!data.success && !isServer) {
        // showfailMessage(data.msg)
        // throw new Error(data.msg)
        reject(data.msg);
      }

      resolve(data);
    }).catch(function (err) {
      console.log(err);

      if (!isServer) {
        showfailMessage(err);
      }

      reject(err);
    });
  });
}
function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    fetch(encodeURI(`${isServer ? baseUrl : baseClientUrl}${url}`), config_objectSpread({
      method: 'POST',
      headers,
      body: JSON.stringify(params)
    }, options)).then(response => {
      return response.json();
    }).then(data => {
      if (!data.success && !isServer) {
        // showfailMessage(data.msg)
        // throw new Error(data.msg)
        reject(data.msg);
      }

      resolve(data);
    }).catch(function (err) {
      if (!isServer) {
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
;// CONCATENATED MODULE: ./request/modules/userReq.js

const userReq_module = '/user';
const {
  doGet,
  doPost,
  doRestGet
} = request(userReq_module); // export function getUser(name) {
//     return doRestGet('/getUser', name)
// }

async function login(userName, password) {
  return await doPost(`/login`, {
    userName,
    password
  });
}
async function getBlogUser() {
  return await doGet(`/blogUser`);
}
;// CONCATENATED MODULE: external "jsonwebtoken"
const external_jsonwebtoken_namespaceObject = require("jsonwebtoken");
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_namespaceObject);
// EXTERNAL MODULE: ./utils/libs/cookieParser.ts
var cookieParser = __webpack_require__(8678);
;// CONCATENATED MODULE: ./pages/api/auth/login.js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



async function handler(req, res) {
  try {
    const loginRes = await login(req.body.userName, req.body.password);

    if (loginRes.success) {
      const user = loginRes.data;
      const expireTime = 100000; //小时

      const token = external_jsonwebtoken_default().sign(user, process.env.SECRET, {
        expiresIn: `${expireTime}h`
      });
      res.setHeader('Set-Cookie', [(0,cookieParser/* createCookie */.pC)('xl-next-login-token', token, {
        httpOnly: true,
        path: '/'
      }), (0,cookieParser/* createCookie */.pC)('user', user)]);
      res.redirect(307, '/management');
    } else {
      res.status(400).json({
        msg: `login failed : ${loginRes.msg}`
      });
    }
  } catch (e) {
    res.status(400).json({
      msg: `login failed : ${e.toString()}`
    });
  }
}

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [678], () => (__webpack_exec__(7610)));
module.exports = __webpack_exports__;

})();