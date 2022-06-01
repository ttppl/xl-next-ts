import {get, post} from "../config";

export interface CodeRun {
    id: string,
    userId: number,
    title: string,
    type:string,
    authority:'PUBLIC'|'PRIVATE'|'AUTH',
    textType: 'text',
    coverImg:number,
    specialText:string,
    scriptLanguage:string,
    scriptText:string,
    styleLanguage:string,
    styleText: string,
    xmlLanguage:string,
    xmlText:string,
    htmlValue:string,
    jsCND:string,
    cssCDN:string,
    editorConfig:string,
    modifyTimestamp:string
}

export async function getCodeRunById(id:number) {
    const res = await get(`/codeRun/getCodeRun/id/${id}`)
    return res.data
}

export async function getCodeRunList(options?:{key?:string,type?:Array<string>,authority?:['PUBLIC'|'PRIVATE'|'AUTH'],page?:number,pageSize?:number,orderBy?:string}) {
    return await get(`/codeRun/getCodeList`,options)
}
