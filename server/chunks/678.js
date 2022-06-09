"use strict";
exports.id = 678;
exports.ids = [678];
exports.modules = {

/***/ 8678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pC": () => (/* binding */ createCookie)
/* harmony export */ });
/* unused harmony exports parseCookie, getClientCookie */
function createCookie(name, value, options = {}) {
  let expires = null;

  if (options.expires) {
    if (options.expires instanceof Date) {
      expires = `expires=${options.expires.toUTCString()}`;
    } else {
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + options.expires);
      expires = `expires=${expireDate.toUTCString()}`;
    }
  }

  const path = `path=${options.path || '/'}`;
  const domain = options.domain ? `domain=${options.domain}` : null;
  const secure = options.secure ? 'secure' : null;
  const httpOnly = options.httpOnly ? 'httpOnly' : null;
  return [`${name}=${value ? JSON.stringify(value) : ''}`, expires, path, domain, secure, httpOnly].filter(n => n).join(';');
} // interface CookieValue {
//     value: string | number | object,
//     expires?: Date | number,
//     path?: string | number | object,
//     domain?: string,
//     secure?: string
// }

function parseCookie(cookie) {
  const cookieObj = {};
  if (!cookie) return cookieObj;
  const cookies = cookie.split(';');
  cookies.forEach(c => {
    const spliteCookie = c.split('=');

    try {
      cookieObj[spliteCookie[0].trim()] = JSON.parse(spliteCookie[1]);
    } catch (e) {
      cookieObj[spliteCookie[0].trim()] = spliteCookie[1];
    }
  });
  return cookieObj;
}
function getClientCookie(name, cookie) {
  cookie = cookie || parseCookie(document.cookie);
  const names = name.split('.');

  if (names.length > 1) {
    const newCookie = cookie[names[0]];
    if (!newCookie) return null;
    names.shift();
    return getClientCookie(names.join('.'), newCookie);
  } else {
    return cookie[name] || null;
  }
}

/***/ })

};
;