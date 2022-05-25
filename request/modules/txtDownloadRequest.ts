import {get, post} from "../config";

export interface BlogSearch {
    source:string,
    type:string,
    name:string,
    href:string,
    newestChapter:string,
    author:string,
    updateTime:string,
    status:string,
}

export async function search(key:string) {
    const res = await get(`/txtDownload/search`,{key})
    return res.data
}


export async function getTxtInfo(url:string) {
    const res = await get(`/txtDownload/getTxtInfo`,{url})
    return res.data
}

export async function getChapter(url:string) {
    const res = await get(`/txtDownload/getTxtChapter`,{url})
    return res.data||{content:'小小爬虫怠工了！'}
}
