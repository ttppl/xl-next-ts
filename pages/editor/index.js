import React, {useRef, useState} from 'react';
import Head from "next/head";
import {getDefaultLayout} from "../../components/layouts/main";
import Editor from "../../components/common/Editor";
import {runScripts} from "../../request/modules/utilRequest";
import '/styles/pages/editor/JsEditor.scss'
import useLoading from "../../hooks/useLoading";

JsEditor.layout = getDefaultLayout

function JsEditor() {
    const [output,setOutput] = useState('')
    const outputRef = useRef(null)
    const [loading,setLoading] = useLoading(false,outputRef,{
        containerCssText:"position:relative",
        labelSize:'20px',
        label:'running...'
    })
    const runScript = async (code)=>{
        setLoading(true)
        try {
            const res = await runScripts(code)
            if (res.success) {
                let output = ''
                res.data.map((column) => {
                    output += (column + '<br>')
                })
                setOutput(output)
            } else {
                setOutput(res.msg)
            }
        }catch (e) {
            setOutput(e.toString())
        }
        setLoading(false)
    }

    return <>
        <Head>
            <title>JS测试</title>
        </Head>
        <h1 className='xl-js-editor-title'>在线运行js</h1>
        <Editor language='javascript'
                style={{height:'50vh'}}
                submitLabel='Run'
                defaultCode={`function add(a,b){
    return a+b
}
console.log('this is a test',add(1,2))`}
                onSubmit={runScript}/>
        <div ref={outputRef} className='xl-js-editor-output' dangerouslySetInnerHTML={{__html:output}}/>
        </>
}

export default JsEditor
