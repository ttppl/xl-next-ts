import {CodeRun, getCodeRunById} from "../../../request/modules/codeRunRequest";
import {getDefaultLayout} from "../../../components/layouts/main";
import {useEffect, useState} from "react";
import 'highlight.js/styles/xcode.css';
import highlightJs from 'highlight.js'
import '../../../styles/pages/codeRun/detail.scss'
import {getClass} from "../../../utils";

export async function getServerSideProps({query}: any) {
    const codeRun = await getCodeRunById(query.id)
    return {
        props: {
            codeRun: codeRun || {}
        }
    }
}

function CodeRunDetail({codeRun}: { codeRun: CodeRun }) {
    const [showCode, setShowCode] = useState(false)
    const [code, setCode] = useState('preview')
    useEffect(() => {
        document.querySelectorAll("pre code").forEach(block => {
            try {
                highlightJs.highlightBlock(block as HTMLElement);
            } catch (e) {
                console.log(e);
            }
        });
    }, [])
    const setIframeHeight = ()=>{
        const ifm:any = document.getElementById("xl-iframe");
        try {
            const contentHeight = ifm.contentWindow.document.documentElement.offsetHeight
            ifm.height=contentHeight+100
        }catch (e) {
            console.error(e)
        }

    }
    return <div className='xl-code-run-detail'>
        <div className='xl-lang-tags'>
            <div className={getClass(['xl-lang-tag',{'active':code==='preview'}])} onClick={()=>setCode('preview')}>preview</div>
            <div className={getClass(['xl-lang-tag',{'active':code==='html'}])} onClick={()=>setCode('html')}>html</div>
            <div className={getClass(['xl-lang-tag',{'active':code==='script'}])} onClick={()=>setCode('script')}>script</div>
            <div className={getClass(['xl-lang-tag',{'active':code==='style'}])} onClick={()=>setCode('style')}>style</div>
        </div>
        <iframe width='100%'
                id='xl-iframe'
                style={{display:code==='preview'?'':'none'}}
                className='xl-code-run-iframe'
                srcDoc={codeRun.htmlValue}
                onLoad={setIframeHeight}>
            加载中
        </iframe>
        <div>
            <pre style={{display:code==='html'?'':'none'}}>
            <code lang={codeRun.xmlLanguage}>
                {codeRun.xmlText}
            </code>
            </pre>
            <pre style={{display:code==='script'?'':'none'}}>
            <code lang={codeRun.scriptLanguage}>
                {codeRun.scriptText}
            </code>
            </pre>
            <pre style={{display:code==='style'?'':'none'}}>
            <code lang={codeRun.styleLanguage}>
                {codeRun.styleText}
            </code>
            </pre>
        </div>
    </div>
}

CodeRunDetail.layout = getDefaultLayout
export default CodeRunDetail
