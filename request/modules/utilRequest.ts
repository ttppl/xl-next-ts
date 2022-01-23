import {post} from "../config";

export async function runScripts(script:string) {
    return await post(`/runScript`, {script})
}