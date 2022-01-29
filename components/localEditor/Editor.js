import Head from "next/head";
import Script from "next/script";
import React, {useEffect, useRef} from "react";
import useLoading from "../../hooks/useLoading";
import {sleep} from "../../utils";
import '/styles/components/localEditor/editor.scss'
Editor.defaultProps={
    editorKey:'1',
    language:'javascript',
    onSubmit:null,
    style:null,
    defaultCode:'',
    theme:'vs-light',
    submitLabel:'ok',
    enableMinimap:true,
    className:'',
    onChange:null,
    title:''
}

function Editor({editorKey,language,onSubmit,style,title,
                    defaultCode,theme,submitLabel,children,enableMinimap,className,
                    onChange}) {
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
                document.getElementById(`xl-monaco-${language}-${editorKey}`).innerHTML = ''
                window.monacoEditorModels = window.monacoEditorModels||[]
                window.monacoEditorModels[language+editorKey] = window.monaco.editor.create(document.getElementById(`xl-monaco-${language}-${editorKey}`), {
                    value: defaultCode,
                    automaticLayout: true,
                    language: language,
                    // contextmenu: false,
                    minimap: {
                        enabled: enableMinimap // 是否启用预览图
                    },
                    theme: theme,
                })
                window.monacoEditorModels[language+editorKey].onDidChangeModelContent(() => {
                    onChange?.(window.monacoEditorModels[language+editorKey].getValue())
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
    // useEffect(() => {
    //     if(window.monaco?.editor) {
    //         window.monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0], language)
    //     }
    // }, [language])
    // const run = (e) => {
    //     const code = window.monacoEditorModel.getValue()
    //     onSubmit?.(code)
    // }
    // const clear = ()=>{
    //     window.monacoEditorModel.setValue('')
    // }
return <div className={'xl-monaco-editor-container ' +className} ref={editorContainer}>
    <Head>
        <link rel="stylesheet" data-name="vs/editor/editor.main"
              href="/monacoEditor/min/vs/editor/editor.main.css"/>
    </Head>
    <Script src="/monacoEditor/min/vs/loader.js"
            strategy='beforeInteractive'/>
            <p>{title}</p>
    {/*<div className= style={style} ref={editorContainer}>*/}
        <div className={'xl-monaco-editor'} id={`xl-monaco-${language}-${editorKey}`}/>
    {/*</div>*/}
</div>
}

export default Editor
