import React, {useEffect, useRef, useState} from "react";
import '/styles/pages/management/codeRun/add.scss'
import setGlobalLoading from "../../../utils/libs/setGlobalLoading";
import useGlobalLoading from "../../../hooks/useGlobalLoading";
import LocalEditor from '/components/localEditor/index'
import {addListener} from "../../../utils/libs/EventManager";
import {parseCookie} from "../../../utils/libs/cookieParser";
import {getManagementLayout} from "../../../components/layouts/managementLayout";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import Icon from "../../../components/Icon";
LocalEditorPage.layout = getManagementLayout

export async function getServerSideProps({req, res, params}) {
    const isLogged = !!parseCookie(req.headers.cookie).user
    return {
        props: {
            isLogged
        }
    }
}

function LocalEditorPage(props) {
    useManagementFinished()
    const finished = () => {
        setGlobalLoading(false)
        editor.current.contentWindow.postMessage({
            isLogged:true,
        },'*')
    }
    const editor = useRef(null)
    useEffect(()=>{
        addListener(window,'message',(e)=>{
            // console.log(e)
        })
    },[])
    //全屏显示
    const [full,setFull] = useState(false)

    return <div className={`xl-local-run-editor ${full&&'full-screen'}`}>
        <Icon className={`${full?'close':'full'} full-icon`} color='white' size={40} onClick={()=>{setFull(!full)}}/>
        <iframe ref={editor} onLoad={finished} width='100%' height='100%'
                src='http://localhost:8080/local-code-editor/#/'/>
    </div>
}

export default LocalEditorPage
