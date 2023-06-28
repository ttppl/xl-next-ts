import {isServer} from "../utils/check";
import {showFailMessage} from "../utils/antdUtil";

// const https = require("https");
import https from 'https'

const baseUrl = process.env.NEXT_PUBLIC_BASE_REQUEST_URL
const baseClientUrl = process.env.NEXT_PUBLIC_BASE_CLIENT_REQUEST_URL
const headers = {
    'Content-Type': 'application/json'
}

/** HTTP基本返回类型 */
export interface BaseResultType<DataType>{
    data:DataType,
    msg:string,
    code:number,
    status:number,
    total?: number,
    size?: number,
    statusDesc: string,
    success: boolean
}

type ParamsType = Record<string, any>


export default function request(moduleUrl:string) {
    return {
        doGet<T=any>(url:string, params?:ParamsType) {
            return get<T>(moduleUrl + url, params)
        },
        doPost<T=any>(url:string, params:ParamsType) {
            return post<T>(moduleUrl + url, params)
        },
        doRestGet<T=any>(url:string, param:ParamsType, query:ParamsType) {
            return restGet<T>(moduleUrl + url, param, query)
        },
        doRestPos<T=any>(url:string, param:ParamsType, query:ParamsType) {
            return restPost<T>(moduleUrl + url, param, query)
        }
    }
}


const options:any = {
    headers:{
        ...headers,
        'Authorization':'xl-blog-next-app'
    }
}
if(process.env.NEXT_PUBLIC_IS_HTTPS==='TRUE') {
    options.agent = new https.Agent({
        rejectUnauthorized: false
    })
}

export function get<T=any>(url:string, params:ParamsType = {}):Promise<T> {
    const encodedParams:string[] = []
    Object.keys(params || {})?.forEach(k => {
        if (params[k]) {
            encodedParams.push(`${k}=${params[k]}`)
        }
    })
    const encodedParam = encodedParams.length > 0 ? `?${encodedParams.join('&')}` : ''
    const reqUrl = encodeURI(`${isServer?baseUrl:baseClientUrl}${url}${encodedParam}`)
    return new Promise((resolve, reject) => {
        fetch(reqUrl, {method: 'GET',...options})
            .then((response) => {
                // console.log(response,response.status)
                return response.json()
            }).then(data => {
            if (!data.success && !isServer) {
                // showfailMessage(data.msg)
                // throw new Error(data.msg)
                reject(data.msg)
            }
            resolve(data)
        }).catch(function (err) {
            console.log(err)
            if (!isServer) {
                showFailMessage(err)
            }
            reject(err)
        })
    })
}

export function post<T=any>(urls:string, params:ParamsType = {}):Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(encodeURI(`${isServer?baseUrl:baseClientUrl}${urls}`), {
            method: 'POST', headers,
            body: JSON.stringify(params),
            ...options
        }).then((response) => {
            return response.json()
        }).then(data => {
            if (!data.success && !isServer) {
                // showfailMessage(data.msg)
                // throw new Error(data.msg)
                reject(data.msg)
            }
            resolve(data)
        }).catch(function (err) {
            if (!isServer) {
                showFailMessage(err)
            }
            reject(err)
        })
    })
}

export function postOrig(url:string, params:ParamsType = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST', headers,
            redirect: 'follow',
            body: JSON.stringify(params)
        }).then((response) => {
            // console.log(response)
            if (response.redirected) {
                window.location.href = response.url
            }
            return response.json()
        }).then(data => {
            resolve(data?.data || data || {msg: 'unknown response'})
        }).catch(function (err) {
            console.log('error:', err)
            reject(err)
        })
    })
}

export function restGet<T>(url:string, param:ParamsType, query:ParamsType):Promise<T> {
    let encodedUrl = Array.isArray(param) ? param.join("/") : param
    return get([url, encodedUrl].filter(n => n).join('/'), query)
}

export function restPost<T>(url:string, param:ParamsType, query:ParamsType):Promise<T> {
    let encodedUrl = Array.isArray(param) ? param.join("/") : param
    return post([url, encodedUrl].filter(n => n).join('/'), query)
}
