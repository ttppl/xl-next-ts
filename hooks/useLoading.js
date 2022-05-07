import {useEffect, useRef, useState} from "react";
import Loading from "/components/common/Loading";
import ReactDOM from 'react-dom'
import {getClasses} from "../utils/dom";
import {addListener, removeListenerRS} from "../utils/libs/EventManager";

const useLoading = (show, target,props={}) => {

    let div = useRef(null)
    const [showLoading, setShowLoading] = useState(show)
    useEffect(() => {
        const targetDom = target?.current||target||document.body
        div.current = div.current || document.createElement('div')
        const mask = props?.mask&&'mask'
        props.containerCssText&&((div.current.style.cssText = props.containerCssText))
        div.current.className=getClasses(['xl-loading-container',mask,props.className])
        const clickListener = addListener(div.current,'click',(e)=>{
            props.maskClose&&(setShowLoading(false))
        })
        if (showLoading) {
            ReactDOM.render(<Loading {...props} />, div.current)
            targetDom.appendChild(div.current)
        } else {
            ReactDOM.unmountComponentAtNode(div.current)
            if (targetDom.contains(div.current)) {
                targetDom.removeChild(div.current)
            }

        }
        return ()=>{
            ReactDOM.unmountComponentAtNode(div.current)
            if (targetDom.contains(div.current)) {
                targetDom.removeChild(div.current)
            }
            removeListenerRS(clickListener)
        }
    }, [props, showLoading, target])

    return [showLoading, setShowLoading]
}
export default useLoading
