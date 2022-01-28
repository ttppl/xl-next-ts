import lodash from "lodash";
import {isObject} from "./check";

export function getKeyCode(e:any) {
    return e.keyCode || e.which || e.charCode
}

export function isCtrlKey(e:any) {
    return e.ctrlKey || e.metaKey
}

export function isShiftKey(e:any) {
    return e.shiftKey
}

export const KEY_CODE = {
    enter: 13,
    P: 80,
    F:70
}

export function insertTextAtCursor(el:HTMLInputElement, text:string, newLine = false,cursorOffset=0) {
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
        el.selectionStart = startPos + text.length + newLineString.length+cursorOffset;
        el.selectionEnd = startPos + text.length + newLineString.length+cursorOffset;
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


export function getClasses(arr:Array<string>) {
    return arr.filter(n=>n).join(' ')
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
function isNoneDisplay (el:HTMLElement):{isNone:boolean, ele:HTMLElement} {
    const display = getStyle(el, 'display')
    if (display !== 'none') {
        if (el && el.parentNode && el.parentNode.nodeName !== 'BODY') {
            return isNoneDisplay(el.parentNode as HTMLElement)
        } else {
            return { isNone: false, ele: el }
        }
    } else {
        return { isNone: true, ele: el }
    }
}
export const getStyle = function (element:HTMLElement, styleName:string):string {
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
        const computed:any = document.defaultView.getComputedStyle(element, '')
        return computed?.[styleName]
    } catch (e) {
        return style
    }
}
export function setStyle (element:HTMLElement, styleName:string, value:string):void {
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
export function getElementSize (el:HTMLElement, elPos = 'absolute'):{width:number, height:number} {
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
