import {isFunction, isNumber} from "../check";
import {off, on} from "../dom";

type Callback = (e: Event, dom?: HTMLElement, eventName?: string) => void
type WrapperFun = (event: Event) => void
type EventListener = {
    // isListening: boolean,//是否监听
    wrapperFun?: WrapperFun//包裹的function
    callbacks: Array<Callback>//回调函数
}
type Result = {
    dom?: HTMLElement,
    event?: string,
    callbackIndex?: number
} | null

const domListeners: Map<HTMLElement, Map<string, EventListener>> = new Map()

// <dom,<eventName,{isListening,wrapperFun,[...callback]}>>


export function addListener(dom: HTMLElement, event: string, callback: Callback): Result {
    if (!dom || !event || !isFunction(callback)) return null
    const eventListeners = domListeners.get(dom)
    if (!eventListeners) {
        const newEventListeners = new Map<string, EventListener>()
        newEventListeners.set(event, {
            // isListening: false,
            callbacks: [callback]
        })
        domListeners.set(dom, newEventListeners)
        start()
        return {dom, event, callbackIndex: 0}
    } else {
        const eventListener = eventListeners.get(event)
        if (eventListener) {
            if (!eventListener.callbacks.includes(callback)) {
                const index = eventListener.callbacks.push(callback)
                start()
                return {dom, event, callbackIndex: index - 1}
            } else {
                start()
                return {dom, event, callbackIndex: eventListener.callbacks.indexOf(callback)}
            }
        } else {
            eventListeners.set(event, {callbacks: [callback]})
            start()
            return {dom, event, callbackIndex: 0}
        }
    }

}

export function removeListenerRS(result: Result): Result {
    if (result?.dom){
        return removeListener(result.dom, result.event, result.callbackIndex)
    } else return null
}

export function removeListener(dom: HTMLElement, event?: string, callback?: Callback | number): Result {
    if (!dom) return null
    const eventListeners = domListeners.get(dom)
    if (!eventListeners) return null
    if (!event) {//移除dom下所有event
        eventListeners.forEach((eventListener, event) => {
            off(dom, event, (eventListener.wrapperFun as WrapperFun))
            delete eventListener.wrapperFun
            eventListeners.delete(event)
        })
        domListeners.delete(dom)
        return {dom}
    }
    const eventListener = eventListeners.get(event)
    if (!eventListener) return null
    if (callback === null || callback === undefined) {//没有callback，移除所有callback
        off(dom, event, (eventListener.wrapperFun as WrapperFun))
        delete eventListener.wrapperFun
        eventListeners.delete(event)
        if (eventListeners.size < 1) removeListener(dom)//dom下不存在监听事件，移除dom
        return {dom, event}
    }
    const index: number = isNumber(callback) ?
        (callback as number) :
        eventListener.callbacks.findIndex(fun => fun === callback)
    if (index < 0) return null
    const callbacks = eventListener.callbacks.splice(index, 1)

    if (eventListener.callbacks.length < 1) {
        return removeListener(dom, event)
    } else if (callbacks.length > 0) {
        return {dom, event, callbackIndex: index}
    } else return null

}

export function start() {
    domListeners.forEach((eventListeners, dom) => {
        eventListeners.forEach((eventListener, event) => {
            if (!eventListener.wrapperFun) {
                eventListener.wrapperFun = function (e: Event) {
                    eventListener.callbacks.forEach(fun => {
                        fun(e, dom, event)
                    })
                }
                on(dom, event, eventListener.wrapperFun)
            }
        })
    })
}


export function removeAll() {
    domListeners.forEach((eventListeners, dom) => {
        eventListeners.forEach((eventListener, event) => {
            off(dom, event, (eventListener.wrapperFun as WrapperFun))
            delete eventListener.wrapperFun
            eventListeners.delete(event)
        })
        domListeners.delete(dom)
    })
}

export default {addListener, removeListener, removeListenerRS, start, removeAll}
