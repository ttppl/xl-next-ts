import {getDefaultLayout} from "../../components/layouts/main";
import React from "react";
import '/styles/pages/localEditor.scss'
import setGlobalLoading from "../../utils/libs/setGlobalLoading";

LocalEditor.layout = getDefaultLayout

function LocalEditor() {
    // useGlobalLoading(false)
    const finished = () => {
        setGlobalLoading(false)
    }
    return <iframe onLoad={finished} width='100%' height='100%'
    src='https://ttppl.gitee.io/local-code-editor'/>
}

export default LocalEditor
