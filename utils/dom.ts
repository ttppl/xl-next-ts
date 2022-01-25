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
