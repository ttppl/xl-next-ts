import {isObject} from "../check";

interface Option {
    expires?: Date | number,
    path?: string,
    domain?: string,
    secure?: boolean,
    httpOnly?:boolean
}

export function createCookie(name: string, value: string | number | object, options: Option = {}): string {
    let expires = null
    if (options.expires) {
        if (options.expires instanceof Date) {
            expires = `expires=${options.expires.toUTCString()}`
        } else {
            const expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + options.expires);
            expires = `expires=${expireDate.toUTCString()}`
        }
    }
    const path = `path=${options.path || '/'}`
    const domain = options.domain ? `domain=${options.domain}` : null
    const secure = options.secure?'secure':null
    const httpOnly = options.httpOnly?'httpOnly':null
    return [`${name}=${value?JSON.stringify(value):''}`, expires, path, domain, secure,httpOnly].filter(n => n).join(';')
}



// interface CookieValue {
//     value: string | number | object,
//     expires?: Date | number,
//     path?: string | number | object,
//     domain?: string,
//     secure?: string
// }

interface Cookie {
    [name: string]: string|number|object
}

export function parseCookie(cookie: string): Cookie {
    const cookieObj:Cookie = {}
    if(!cookie) return cookieObj
    const cookies = cookie.split(';')
    cookies.forEach(c => {
        const spliteCookie = c.split('=')
        try {
            cookieObj[spliteCookie[0].trim()] = JSON.parse(spliteCookie[1])
        }catch (e) {
            cookieObj[spliteCookie[0].trim()] = spliteCookie[1]
        }

    })
    return cookieObj
}

export function getClientCookie(name:string,cookie?:any): any {
    cookie = cookie||parseCookie(document.cookie)
    const names = name.split('.')
    if(names.length>1){
        const newCookie = cookie[names[0]]
        if(!newCookie) return null
        names.shift()
        return getClientCookie(names.join('.'),newCookie)
    }else{
        return cookie[name]||null
    }
}
