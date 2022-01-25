import React, {useEffect, useRef, useState} from "react";
import useLoading from "../hooks/useLoading";
import Head from "next/head";
import Script from "next/script";
import {sleep} from "../utils";
import '/styles/components/editor.scss'


Editor.defaultProps={
    language:'javascript',
    onSubmit:null,
    style:null,
    defaultCode:'',
    theme:'vs-light',
    submitLabel:'ok',
    enableMinimap:true
}

function Editor({language,onSubmit,style,defaultCode,theme,submitLabel,children,enableMinimap}) {
    const editorContainer = useRef(null)
    const [loading, setLoading] = useLoading(false, editorContainer, {
        containerCssText: 'position:absolute;width:100%;height:100%',
        mask: true,
        size: '5em',
        maskClose: false,
        labelSize: '1.5em',
        label: '编辑器加载中...'
    })
    async function initEditor() {
        try {
            window.require.config({paths: {'vs': '/monacoEditor/min/vs'}});
            window.require(["vs/editor/editor.main"], () => {
                document.getElementById('xl-monaco').innerHTML = ''
                window.monacoEditorModel = window.monaco.editor.create(document.getElementById('xl-monaco'), {
                    value: defaultCode,
                    automaticLayout: true,
                    language: language,
                    // contextmenu: false,
                    minimap: {
                        enabled: enableMinimap // 是否启用预览图
                    },
                    theme: theme,
                })
            })
        } catch (e) {
            await sleep(1000)
            return await initEditor()
        }

    }
    useEffect(async () => {
        setLoading(true)
        await initEditor()
        setLoading(false)
    }, [])
    useEffect(() => {
        if(window.monaco?.editor) {
            window.monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0], language)
        }
    }, [language])
    const run = (e) => {
        const code = window.monacoEditorModel.getValue()
        onSubmit?.(code)
    }
    const clear = ()=>{
        window.monacoEditorModel.setValue('')
    }
    return <>
        <Head>
            <link rel="stylesheet" data-name="vs/editor/editor.main"
                  href="/monacoEditor/min/vs/editor/editor.main.css"/>
        </Head>
        <Script src="/monacoEditor/min/vs/loader.js"
                strategy='beforeInteractive'/>
        <div className='xl-monaco-editor-container' style={style} ref={editorContainer}>
            <div id="xl-monaco"/>
        </div>
        <div className='xl-editor-buttons'>
            <button type='button' onClick={run}>{submitLabel}</button>
            <button type='button' onClick={clear}>clear</button>
            {children}
        </div>

    </>
}

export default Editor
