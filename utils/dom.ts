import lodash from "lodash";
import {isObject, isString} from "./check";
import {Buffer} from "buffer";

export function getKeyCode(e: any) {
    return e.keyCode || e.which || e.charCode
}

export function isCtrlKey(e: any) {
    return e.ctrlKey || e.metaKey
}

export function isShiftKey(e: any) {
    return e.shiftKey
}

export const KEY_CODE = {
    enter: 13,
    P: 80,
    F: 70
}

export function insertTextAtCursor(el: HTMLInputElement, text: string, newLine = false, cursorOffset = 0) {
//IE support
    if ((document as any).selection) {
        el.focus();
        const sel = (document as any).selection.createRange();
        sel.text = text;
        sel.select();
    }
//MOZILLA/NETSCAPE support
    else if (el.selectionStart || el.selectionStart === 0) {
        const startPos = el.selectionStart;
        const endPos = el.selectionEnd;
        const restoreTop = el.scrollTop;
        let newLineString = ''
        if (newLine) {
            const index = el.value.substring(0, startPos).lastIndexOf('\n') + 1
            newLineString = (newLine ? (el.value.substring(index, startPos) ? '\n' : '') : '')
        }
        el.value = el.value.substring(0, startPos) + newLineString +
            text + el.value.substring(endPos as number, el.value.length);
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

export function on(
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture = false): void {
    element.addEventListener(event, handler, useCapture)
}

export function off(
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture = false): void {
    element.removeEventListener(event, handler, useCapture)
}


/** 获取className */
type ClassType = Array<ClassType> | string | object
export const getClass = (className: ClassType, ...rest: Array<ClassType>): string => {
    const classNames: Array<string> = []
    if (rest.length > 0) {
        className = [className, ...rest]
    }
    if (isString(className)) {
        classNames.push(className as string)
    }
    if (Array.isArray(className)) {
        className.forEach(classNameItem => classNames.push(getClass(classNameItem)))
    }
    if (isObject(className)) {
        Object.keys(className).forEach(key => {
            if ((className as any)[key]) {
                classNames.push(key)
            }
        })
    }
    return classNames.join(' ')
}

// function splitCamel(str){
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
function isNoneDisplay(el: HTMLElement): { isNone: boolean, ele: HTMLElement } {
    const display = getStyle(el, 'display')
    if (display !== 'none') {
        if (el && el.parentNode && el.parentNode.nodeName !== 'BODY') {
            return isNoneDisplay(el.parentNode as HTMLElement)
        } else {
            return {isNone: false, ele: el}
        }
    } else {
        return {isNone: true, ele: el}
    }
}

export const getStyle = function (element: HTMLElement, styleName: string): string {
    if (!element || !styleName) return ''
    styleName = lodash.camelCase(styleName)
    if (styleName === 'float') {
        styleName = 'cssFloat'
    }
    // @ts-ignore
    const style = element.style[styleName]
    if (style) return style
    try {
        // @ts-ignore
        const computed: any = document.defaultView.getComputedStyle(element, '')
        return computed?.[styleName]
    } catch (e) {
        return style
    }
}

export function setStyle(element: HTMLElement, styleName: string, value: string): void {
    if (!element || !styleName) return

    if (isObject(styleName)) {
        Object.keys(styleName).forEach(prop => {
            // @ts-ignore
            setStyle(element, prop, styleName[prop])
        })
    } else {
        styleName = lodash.camelCase(styleName)
        // @ts-ignore
        element.style[styleName] = value
    }
}

export function getElementSize(el: HTMLElement, elPos = 'absolute'): { width: number, height: number } {
    const size = {
        width: 0,
        height: 0
    }
    const displayNone = isNoneDisplay(el)
    if (displayNone.isNone) {
        const position = getStyle(displayNone.ele, 'position')
        const zIndex = getStyle(displayNone.ele, 'zIndex')
        const visibility = getStyle(displayNone.ele, 'visibility')
        const display = getStyle(displayNone.ele, 'display')
        setStyle(displayNone.ele, 'position', elPos)
        setStyle(displayNone.ele, 'zIndex', '-100')
        setStyle(displayNone.ele, 'visibility', 'hidden')
        setStyle(displayNone.ele, 'display', 'block')
        size.width = displayNone.ele.getBoundingClientRect().width
        size.height = displayNone.ele.getBoundingClientRect().height
        setStyle(displayNone.ele, 'position', position)
        setStyle(displayNone.ele, 'zIndex', zIndex)
        setStyle(displayNone.ele, 'visibility', visibility)
        setStyle(displayNone.ele, 'display', display)
    } else {
        size.width = el.getBoundingClientRect().width
        size.height = el.getBoundingClientRect().height
    }
    return size
}

export const getOffsetTop = (el: HTMLElement) => {
    let offset = 0
    let parent = el

    while (parent) {
        offset += parent.offsetTop
        parent = parent.offsetParent as HTMLElement
    }

    return offset
}

export const getOffsetTopDistance = (el: HTMLElement, containerEl: HTMLElement) => {
    return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl))
}

const cubic = (value: number) => Math.pow(value, 3)

const easeInOutCubic = (value: number) => value < 0.5
    ? cubic(value * 2) / 2
    : 1 - cubic((1 - value) * 2) / 2

export const scrollTo = (container = document.documentElement || document.body || window.pageYOffset, el: HTMLElement, offset = 0) => {
    return new Promise((resolve, reject) => {
        //触底则不滚动
        if (container.scrollTop + container.clientHeight === container.scrollHeight) {
            resolve(true)
        }
        const beginTime = Date.now()
        const beginValue = container.scrollTop
        const distance = getOffsetTopDistance(container, el) - beginValue + offset
        const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
        const frameFunc = () => {
            const progress = (Date.now() - beginTime) / 500
            if (progress < 1) {
                container.scrollTop = beginValue + distance * easeInOutCubic(progress)
                rAF(frameFunc)
            } else {
                container.scrollTop = beginValue + distance
                resolve(true)
            }
        }
        rAF(frameFunc)
    })
}


export const getScrollTop = (el?: HTMLElement): number => {
    if (!el || el === (document as any)) {
        return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    } else {
        return el.scrollTop
    }
}

interface IsInViewOffset {
    offsetTop?: number,
    offsetBottom?: number,
    offsetLeft?: number,
    offsetRight?: number
}

export const isInView = (el: HTMLElement, offset?: IsInViewOffset): boolean => {
    try {
        const boundingRect = el.getBoundingClientRect()
        // const windowWidth = window.innerWidth||document.documentElement.clientWidth
        // console.log(boundingRect)
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        console.log(boundingRect.top, boundingRect.bottom, windowHeight, offset?.offsetTop, offset?.offsetBottom)
        return boundingRect.top < (windowHeight - (offset?.offsetBottom || 0))
            && boundingRect.bottom > (offset?.offsetTop || 0)
    } catch (e) {
        return false
    }
}

const DOM_SCRIPTS = new Map<string, { dom: HTMLElement, id: string }>()

export const addScript = (src: string, dom?: HTMLElement, async = false) => {
    return new Promise((resolve, reject) => {
        const target = dom || document.getElementsByTagName('head')[0]
        if (!DOM_SCRIPTS.get(src)) {
            const script = document.createElement('script')
            script.src = src
            const id = `xl-script-${DOM_SCRIPTS.size}`
            script.id = id
            async && (script.async = async)
            target.appendChild(script);
            DOM_SCRIPTS.set(src, {dom: target, id})
            script.onload = (e) => {
                resolve(e)
            }
        } else {
            resolve('loaded')
        }
    })

}

export const removeScript = (src: string) => {
    return new Promise((resolve, reject) => {
        const domScript = DOM_SCRIPTS.get(src)
        if (domScript) {
            const target = domScript.dom
            const script = document.getElementById(domScript.id)
            if (script) {
                target?.removeChild(script)
                DOM_SCRIPTS.delete(src)
            }
        }

    })

}

export const encryptUrl = (url: string) => {
    if (Buffer && url) {
        return (new Buffer(encodeURI(url))).toString('base64')
    } else return url
}

export const decryptUrl = (url: string) => {
    if (Buffer && url) {
        return decodeURI((new Buffer(url, 'base64')).toString())
    } else return url
}

export const loadJsResource = (url:string) => {
    return new Promise((resolve, reject) => {
        if (url) {
            console.info(`准备加载js文件：${url}`)
            const script = document.createElement("script");
            script.type = 'text/javascript';
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script)
            script.onload = () => {
                console.info(`js文件加载完成：${url}`)
                resolve(true)
            }
        } else {
            reject(new Error('url不能为空'))
        }
    })
}
/** 加载css资源 */
export const loadCssResource = (url:string) => {
    return new Promise((resolve, reject) => {
        if (url) {
            console.info(`准备加载css文件：${url}`)
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link)
            link.onload = () => {
                console.info(`css文件加载完成：${url}`)
                resolve(true)
            }
        } else {
            reject(new Error('url不能为空'))
        }
    })
}