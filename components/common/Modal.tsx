import React, {useState} from "react";
// @ts-ignore
import ReactDOM from 'react-dom'
import Dialog from "rc-dialog";
import 'rc-dialog/assets/index.css'
import '../../styles/components/common/Modal.scss'
interface Props {
    title:string,
    maskClosable:boolean,
    centered:boolean,
    onOk:()=>void,
    onCancel:()=>void,
    cancelText:string,
    okText:string,
    zIndex:number
}

export const Confirm = ({title,onCancel,maskClosable,zIndex,centered,onOk,cancelText,okText}:Props)=>{
    const container = document.createElement('div')
    container.className = 'modal-container'
    const close = ()=>{
        onCancel?.()
        clear()
    }
    const ok = ()=>{
        onOk?.()
        clear()
    }
    const clear = ()=>{
        ReactDOM.unmountComponentAtNode(container)
        document.body.removeChild(container)
    }
    ReactDOM.render(<Dialog title={title} onClose={clear} maskClosable={maskClosable} zIndex={zIndex}
        // modalRender={()=><div>11111</div>}
                            visible
                            destroyOnClose>
        <div className='xl-modal--buttons'>
            <div className='xl-modal--button' onClick={close}>{cancelText||'取消'}</div>
            <div className='xl-modal--button' onClick={ok}>{okText||'确认'}</div>
        </div>
        </Dialog>
    , container)
    document.body.appendChild(container)
}
