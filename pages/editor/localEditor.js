import {getDefaultLayout} from "../../components/layouts/main";
import React, {useEffect, useRef} from "react";
import '/styles/pages/localEditor.scss'
import setGlobalLoading from "../../utils/libs/setGlobalLoading";
import useGlobalLoading from "../../hooks/useGlobalLoading";
import LocalEditor from '/components/localEditor/index'
import {addListener} from "../../utils/libs/EventManager";
import {parseCookie} from "../../utils/libs/cookieParser";
LocalEditorPage.layout = getDefaultLayout

export async function getServerSideProps({req, res, params}) {
    const isLogged = !!parseCookie(req.headers.cookie).user
    return {
        props: {
            isLogged
        }
    }
}

function LocalEditorPage(props) {
    useGlobalLoading(false)
    const finished = () => {
        setGlobalLoading(false)
        editor.current.contentWindow.postMessage({
            isLogged:props.isLogged,
        },'*')
    }
    const editor = useRef(null)
    useEffect(()=>{
        addListener(window,'message',(e)=>{
            // console.log(e)
        })
    },[])
    // return <iframe onLoad={finished} width='100%' height='100%'
    // src='https://ttppl.gitee.io/local-code-editor'/>
    return <iframe ref={editor} onLoad={finished} width='100%' height='100%'
                   src='http://localhost:8080/local-code-editor/#/'/>
    // return <LocalEditor/>
}

export default LocalEditorPage
