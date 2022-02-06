import {post,get} from "../config";

export async function runScripts(script:string) {
    return await post(`/runScript`, {script})
}

export async function getCodeRunPreview(id:string|number) {
    return await get(`/codeRun/getCodeRunPreview/id/${id}`)
}