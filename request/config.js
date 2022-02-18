import {isServer} from "../utils/check";
import {showfailMessage} from "../utils/antdUtil";

const baseUrl = process.env.NEXT_PUBLIC_BASE_REQUEST_URL
const baseClientUrl = process.env.NEXT_PUBLIC_BASE_CLIENT_REQUEST_URL
const headers = {
    'Content-Type': 'application/json'
}


export default function request(moduleUrl) {
    return {
        doGet(url, params) {
            return get(moduleUrl + url, params)
        },
        doPost(url, params) {
            return post(moduleUrl + url, params)
        },
        doRestGet(url, param, query) {
            return restGet(moduleUrl + url, param, query)
        },
        doRestPost(url, param, query) {
            return restPost(moduleUrl + url, param, query)
        }
    }
}

const https = require("https");

const options = process.env.NEXT_PUBLIC_IS_HTTPS==='TRUE'?{
    agent: new https.Agent({
        rejectUnauthorized: false
    })
}:{};

export function get(url, params = {}) {
    const encodedParams = []
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
                showfailMessage(err)
            }
            reject(err)
        })
    })
}

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        fetch(encodeURI(`${isServer?baseUrl:baseClientUrl}${url}`), {
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
                showfailMessage(err)
            }
            reject(err)
        })
    })
}

export function postOrig(url, params = {}) {
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

export function restGet(url, param, query) {
    let encodedUrl = Array.isArray(param) ? param.join("/") : param
    return get([url, encodedUrl].filter(n => n).join('/'), query)
}

export function restPost(url, param, query) {
    let encodedUrl = Array.isArray(param) ? param.join("/") : param
    return post([url, encodedUrl].filter(n => n).join('/'), query)
}
