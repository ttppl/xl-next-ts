"use strict";
exports.id = 397;
exports.ids = [397];
exports.modules = {

/***/ 6397:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NH": () => (/* binding */ addListener),
/* harmony export */   "yM": () => (/* binding */ removeListenerRS),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports removeListener, start, removeAll */
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7549);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2252);


const domListeners = new Map(); // <dom,<eventName,{isListening,wrapperFun,[...callback]}>>

function addListener(dom, event, callback) {
  if (!dom || !event || !(0,_check__WEBPACK_IMPORTED_MODULE_1__/* .isFunction */ .mf)(callback)) return null;
  const eventListeners = domListeners.get(dom);

  if (!eventListeners) {
    const newEventListeners = new Map();
    newEventListeners.set(event, {
      // isListening: false,
      callbacks: [callback]
    });
    domListeners.set(dom, newEventListeners);
    start();
    return {
      dom,
      event,
      callbackIndex: 0
    };
  } else {
    const eventListener = eventListeners.get(event);

    if (eventListener) {
      if (!eventListener.callbacks.includes(callback)) {
        const index = eventListener.callbacks.push(callback);
        start();
        return {
          dom,
          event,
          callbackIndex: index - 1
        };
      } else {
        start();
        return {
          dom,
          event,
          callbackIndex: eventListener.callbacks.indexOf(callback)
        };
      }
    } else {
      eventListeners.set(event, {
        callbacks: [callback]
      });
      start();
      return {
        dom,
        event,
        callbackIndex: 0
      };
    }
  }
}
function removeListenerRS(result) {
  if (result !== null && result !== void 0 && result.dom) {
    return removeListener(result.dom, result.event, result.callbackIndex);
  } else return null;
}
function removeListener(dom, event, callback) {
  if (!dom) return null;
  const eventListeners = domListeners.get(dom);
  if (!eventListeners) return null;

  if (!event) {
    //移除dom下所有event
    eventListeners.forEach((eventListener, event) => {
      (0,_dom__WEBPACK_IMPORTED_MODULE_0__/* .off */ .S1)(dom, event, eventListener.wrapperFun);
      delete eventListener.wrapperFun;
      eventListeners.delete(event);
    });
    domListeners.delete(dom);
    return {
      dom
    };
  }

  const eventListener = eventListeners.get(event);
  if (!eventListener) return null;

  if (callback === null || callback === undefined) {
    //没有callback，移除所有callback
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__/* .off */ .S1)(dom, event, eventListener.wrapperFun);
    delete eventListener.wrapperFun;
    eventListeners.delete(event);
    if (eventListeners.size < 1) removeListener(dom); //dom下不存在监听事件，移除dom

    return {
      dom,
      event
    };
  }

  const index = (0,_check__WEBPACK_IMPORTED_MODULE_1__/* .isNumber */ .hj)(callback) ? callback : eventListener.callbacks.findIndex(fun => fun === callback);
  if (index < 0) return null;
  const callbacks = eventListener.callbacks.splice(index, 1);

  if (eventListener.callbacks.length < 1) {
    return removeListener(dom, event);
  } else if (callbacks.length > 0) {
    return {
      dom,
      event,
      callbackIndex: index
    };
  } else return null;
}
function start() {
  domListeners.forEach((eventListeners, dom) => {
    eventListeners.forEach((eventListener, event) => {
      if (!eventListener.wrapperFun) {
        eventListener.wrapperFun = function (e) {
          eventListener.callbacks.forEach(fun => {
            fun.call(this, e, dom, event);
          });
        };

        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.on)(dom, event, eventListener.wrapperFun);
      }
    });
  });
}
function removeAll() {
  domListeners.forEach((eventListeners, dom) => {
    eventListeners.forEach((eventListener, event) => {
      (0,_dom__WEBPACK_IMPORTED_MODULE_0__/* .off */ .S1)(dom, event, eventListener.wrapperFun);
      delete eventListener.wrapperFun;
      eventListeners.delete(event);
    });
    domListeners.delete(dom);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  addListener,
  removeListener,
  removeListenerRS,
  start,
  removeAll
});

/***/ })

};
;