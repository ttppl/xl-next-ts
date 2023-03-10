import {useEffect} from "react";
import {runScripts} from "../request/modules/utilRequest";
import {loadJsResource} from "../utils/dom";

const useRunnableScript = (dependencies=[]) => {
    useEffect(() => {
        loadJsResource('https://ttppl.xyz/file/lib/xlUtils.js').then(res=>{
            loadJsResource('https://ttppl.xyz/file/lib/blog.js').then(()=>{
                //重写runscript方法
                (window as any).runXlScript = function (e: Event) {
                    try {
                        const code = (e.target as HTMLElement)?.getElementsByTagName('textarea')[0].value
                        const container:any = ((e.target as HTMLElement)?.parentNode as HTMLElement)?.getElementsByClassName('xl-runnable-output')[0]
                        runScripts(code).then((res) => {
                            if (res.success) {
                                let output = ''
                                res.data.map((column: any) => {
                                    output += (column+ '\n')
                                })
                                output = output.replace(/\\/g,'\\').replace(/\</g, '&lt').replace(/\>/g,'&gt')
                                container.innerHTML = `<pre><code>${output}</code></pre>`
                            } else {
                                container.innerHTML = JSON.stringify(res.msg)
                            }
                        }).catch(e => {
                            container.innerHTML = e.toString()
                        })
                        container.style.display='block'
                    } catch (e) {
                        console.error(e)
                    }
                }
            })
        })
    }, [...dependencies])
}

export default useRunnableScript
