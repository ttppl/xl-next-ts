import {useEffect} from "react";
import {runScripts} from "../request/modules/utilRequest";
import {copyToclipboard} from "../utils";

const useRunnableScript = (dependencies=[]) => {
    useEffect(() => {
        const global:any = window as any
        global.runXlScript = function (e: Event) {
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
                console.log(e)
            }
        }

        global.clearXlScriptOutput = function (e:Event) {
            const container:any = ((e.target as HTMLElement)?.parentNode as HTMLElement)?.getElementsByClassName('xl-runnable-output')[0]
            container.innerHTML = ''
            container.style.display='none'
        }
        global.xlCopyCode  = function (e:Event) {
            const code = (e.target as HTMLElement)?.getElementsByTagName('textarea')[0].value
            copyToclipboard(code)
        }
    }, [...dependencies])
}

export default useRunnableScript
