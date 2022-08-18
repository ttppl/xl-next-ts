"use strict";
exports.id = 119;
exports.ids = [119];
exports.modules = {

/***/ 2119:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layouts_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7264);
/* harmony import */ var _request_modules_blogRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5577);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_common_XlPagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9330);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2252);
/* harmony import */ var _request_modules_userReq__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3902);
/* harmony import */ var _utils_check__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7549);
/* harmony import */ var _components_common_Icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6047);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
const _excluded = ["blogs", "user"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }











 // import Bingdundun from '../components/threejs/Bingdundun'




async function getServerSideProps(context) {
  const pageSize = 20; // 获取最新博客

  const res = await (0,_request_modules_blogRequest__WEBPACK_IMPORTED_MODULE_2__/* .getBlogsByType */ .Wj)('newest', 1, pageSize);
  const userRes = await (0,_request_modules_userReq__WEBPACK_IMPORTED_MODULE_7__/* .getBlogUser */ .T)();
  const user = userRes.data || {};
  user.avatar = (0,_utils_check__WEBPACK_IMPORTED_MODULE_10__/* .isNum */ .e9)(user.avatar) ? `${"https://ttppl.xyz/file/id/"}${user.avatar}` : user.avatar;

  try {
    user.detailInfo = JSON.parse(user.detailInfo);
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      blogs: res.data,
      total: res.total,
      user,
      page: 1,
      pageSize
    }
  };
}

// @ts-ignore
const Index = _ref => {
  let {
    blogs,
    user
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const columnCount = 3; //列数量

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_0___default()), {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("title", {
        children: "\u541E\u5929\u6CE1\u6CE1\u9F99\u7684\u4E3B\u9875"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("meta", {
        name: "description",
        content: "\u541E\u5929\u6CE1\u6CE1\u9F99\u7684\u4E3B\u9875"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("link", {
        rel: "icon",
        href: "/my_favicon.ico"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("main", {
      className: "index-main",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("div", {
        className: "xl-user-info",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "xl-user-main",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("img", {
            className: "xl-user-avatar",
            src: user.avatar
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
            className: "xl-user-nickname",
            children: user.detailInfo.nickname
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
            className: "xl-user-introduction",
            children: user.detailInfo.introduction
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("div", {
            className: "xl-user-contact",
            children: user.detailInfo.contact.map(contactInfo => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_common_Icon__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
              size: 30,
              className: contactInfo.name,
              title: contactInfo.value
            }, contactInfo.name))
          })]
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("div", {
        className: "xl-index-blogs",
        children: Array.from({
          length: columnCount
        }).map((i, columnIndex) => {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("div", {
            className: "xl-index-blogs-column",
            children: blogs.map((blog, index) => {
              if (index % columnCount === columnIndex) {
                return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(IndexBlogCard, {
                  blog: blog
                }, blog.blogId);
              }
            })
          }, `index-blog-column-${columnIndex}`);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "xl-index-right-side",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "xl-rank-card xl-top",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
            className: "xl-rank-card-title",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("span", {
              children: "\u8FD9\u91CC\u5E94\u8BE5\u6709\u70B9\u4EC0\u4E48"
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
            children: "\u4F46\u662F\u6211\u8FD8\u6CA1\u60F3\u597D"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "xl-rank-card xl-tags",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
            className: "xl-rank-card-title",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("span", {
              children: "\u5B83\u5FC5\u987B\u505A\u70B9\u4EC0\u4E48"
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
            children: "\u8F89\u714C\u4E00\u523B\uFF0C\u8C01\u90FD\u522B\u62FF\u4E00\u523B\u5F53\u6C38\u4E45"
          })]
        })]
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_common_XlPagination__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
      defaultPageSize: props.pageSize,
      defaultCurrent: props.page,
      pageUrl: page => {
        return `/p${page}`;
      },
      total: props.total
    })]
  });
};

function IndexBlogCard({
  blog
}) {
  const tags = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    const blogTags = Array.isArray(blog.tags) ? blog.tags : blog.tags.split(',');
    return blogTags.map((tag, index) => {
      if (tag) return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
        passHref: true,
        href: `/blog/search/p1?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__/* .encryptUrl */ .bl)(tag)}`,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("a", {
          className: "xl-blog-tag",
          children: tag
        }, `tag-${index}`)
      }, `tag-${tag}`);
    });
  }, [blog.tags]);
  const container = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const abstract = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null); // useEffect(()=>{
  //     const el:HTMLElement = container.current as HTMLElement
  //     const containerHeight = el.clientHeight
  //     const padding = parseFloat(window.getComputedStyle(el).getPropertyValue('padding-bottom'))
  //     const lastChild = el.lastChild as HTMLElement
  //     const childMargin = parseFloat(window.getComputedStyle(lastChild).getPropertyValue('margin-bottom'))
  //     const restHeight:number = containerHeight-padding-lastChild.offsetTop -lastChild.clientHeight -childMargin
  //     if(restHeight>0){
  //         const abstEl = abstract.current as HTMLElement
  //         const style = window.getComputedStyle(abstEl)
  //         const lineHeight:number = parseFloat(style.getPropertyValue('line-height'))
  //         const line = parseFloat(style.getPropertyValue('-webkit-line-clamp'))
  //         // @ts-ignore
  //         abstEl.style['-webkit-line-clamp'] = line+Math.floor(restHeight/lineHeight)
  //     }
  // },[])

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    ref: container,
    className: "xl-index-blog-card",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
      href: `/blog/detail/${blog.blogId}`,
      passHref: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("a", {
        className: "xl-blog-info",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
          className: "xl-blog-title",
          children: blog.title
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
          className: "xl-blog-publish-time",
          children: new Date(blog.publishTime).toLocaleDateString()
        }), blog.coverImg && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("img", {
          className: "xl-blog-cover-img",
          src: (0,_utils_check__WEBPACK_IMPORTED_MODULE_10__/* .isNum */ .e9)(blog.coverImg) ? `${"https://ttppl.xyz/file/id/"}${blog.coverImg}` : blog.coverImg,
          alt: "blogCoverImg"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("div", {
          ref: abstract,
          className: "xl-blog-abstract",
          children: blog.plainText
        })]
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("div", {
      className: "xl-blog-card-category",
      children: blog.category && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
        children: ["\u5206\u7C7B\uFF1A", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
          passHref: true,
          href: `/blog/search/p1?key=${(0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__/* .encryptUrl */ .bl)(blog.category)}`,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("a", {
            children: blog.category
          })
        })]
      })
    }), tags.length > 1 && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("div", {
      className: "xl-blog-tags",
      children: tags
    })]
  });
}

Index.layout = _components_layouts_main__WEBPACK_IMPORTED_MODULE_1__/* .getDefaultLayout */ .uy;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);

/***/ }),

/***/ 3902:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ getBlogUser)
/* harmony export */ });
/* unused harmony export login */
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8222);

const module = '/user';
const {
  doGet,
  doPost,
  doRestGet
} = (0,_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)(module); // export function getUser(name) {
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

/***/ })

};
;