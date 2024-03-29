import {Nullable} from "./types";

export const isObject = function (obj: unknown): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isArray = function (obj: unknown): boolean {
    return Object.prototype.toString.call(obj) === '[object Array]'
}

export const isString = function (obj: unknown): obj is string {
    return Object.prototype.toString.call(obj) === '[object String]'
}

export const isFunction = function (obj: unknown): boolean {
    return Object.prototype.toString.call(obj) === '[object Function]'
}

export const isBoolean = function (obj: unknown): boolean {
    return Object.prototype.toString.call(obj) === '[object Boolean]'
}

export const isNumber = function (obj: unknown): obj is number {
    return Object.prototype.toString.call(obj) === '[object Number]'
}

export const isNum = function (num: unknown): num is number|string {
    return isNumber(num) ? true : /^-?\d*\.?\d*$/.test(num as any)
}

export const isNull = function (obj: unknown): obj is Nullable<typeof obj> {
    return ['[object Null]', '[object Undefined]'].includes(Object.prototype.toString.call(obj))
}


export const checkDevice = (): 'mobile'|'pc' => {
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsIpad = sUserAgent.match(/ipad/i)?.[0] === 'ipad';
    const bIsIphoneOs = sUserAgent.match(/iphone os/i)?.[0] === 'iphone os';
    const bIsMidp = sUserAgent.match(/midp/i)?.[0] === 'midp';
    const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)?.[0] === 'rv:1.2.3.4';
    const bIsUc = sUserAgent.match(/ucweb/i)?.[0] === 'ucweb';
    const bIsAndroid = sUserAgent.match(/android/i)?.[0] === 'android';
    const bIsCE = sUserAgent.match(/windows ce/i)?.[0] === 'windows ce';
    const bIsWM = sUserAgent.match(/windows mobile/i)?.[0] === 'windows mobile';
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return 'mobile'
    } else {
        return 'pc'
    }
}

// export const isMobile = checkDevice()==='mobile'

export const isServer = typeof window === 'undefined'
