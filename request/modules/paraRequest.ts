import {get, post} from "../config";

export interface Parameter {
    key: string,
    keyDesc: string,
    type:string,
    value:string,
    addTime:Date,
    modifyTimestamp:Date
}

export async function addPara(para: Parameter) {
    return post(`/para/addPara`, para)
}

export async function modifyPara(para: Parameter) {
    return await post(`/para/modifyPara`, para)
}

export async function deletePara(key:string) {
    return get(`/para/deletePara/key/${key}`)
}

export async function getParaByKey(key:string) {
    const res = await get(`/para/getPara/key/${key}`)
    return res.data?.paraValue
}

export async function getParaByKeys(keys:[string?]) {
    return get(`/para/getParas`,{keys})
}

export async function getParasByPage(options?: { key: string, type: string, page: number, pageSize: number, orderBy: string }) {
    return await get(`/para/getParasByPage`, options)
}
