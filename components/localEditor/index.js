import Editor from "./Editor";
import React from "react";
import '/styles/components/localEditor/LocalEditor.scss'

function LocalEditor() {
    return <div className='xl-local-run'>
        <div className='xl-local-editors'>
            <Editor className='xl-local-editor' language='html'/>
            <Editor className='xl-local-editor'/>
            <Editor className='xl-local-editor' language='css'/>
        </div>
        <div className='xl-local-outputs'></div>
    </div>
}

export default LocalEditor