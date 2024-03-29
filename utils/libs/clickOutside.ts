import {isNull} from "../check";
import {off, on} from "../dom";
import {Nullable} from "../types";

type Callback = (e: Event, el: HTMLElement) => void

const listeners: Map<HTMLElement, Array<Callback>> = new Map()
let isListening = false

export function addSource(dom: Nullable<HTMLElement>, callback: Callback) {
    if(isNull(dom)){
        return
    }
    const callbacks = listeners.get(dom)
    if (isNull(callbacks)) {
        listeners.set(dom, [callback])
    } else {
        if ((callbacks as Array<Callback>).includes(callback)) return
        (callbacks as Array<Callback>).push(callback)
    }
    if (!isListening) {
        start()
    }
    return dom
}

export function deleteSource(dom: HTMLElement, callback?: Callback) {
    if (isNull(callback)) {
        listeners.delete(dom)
    } else {
        if (isNull(listeners.get(dom))) return
    }
    if (listeners.size < 1) {
        stop()
    }
}

const callback = (e: Event) => {
    // console.log('clickOutside execute callbacks')
    listeners.forEach((callbacks, dom) => {
        if(!dom.contains(e.target as any)){
            callbacks?.forEach(fun => {
                fun(e, dom)
            })
        }

    })
}

function start() {
    on(document, 'click', callback,true)
    // on(document, 'touchstart', callback)
    isListening = true
}

function stop() {
    off(document, 'click', callback,true)
    // off(document, 'touchstart', callback)
    isListening = false
}

const ClickOutside = {
    addSource, deleteSource
}

export default ClickOutside
