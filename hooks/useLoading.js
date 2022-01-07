import {useEffect, useRef, useState} from "react";
import Loading from "../basic/Loading";
import ReactDOM from 'react-dom'

import styles from '/styles/components/basic/Loading.module.scss'
import {getClasses} from "../utils/common";

const useLoading = (show, target,props) => {

    let div = useRef(null)
    const [showLoading, setShowLoading] = useState(show)
    useEffect(() => {
        const targetDom = target.current||target
        div.current = div.current || document.createElement('div')
        const mask = props?.mask&&'mask'
        div.current.className=getClasses([styles['loading-container'],mask])
        // div.current.style.cssText ='display:inline-flex;align-items:center;pointer-events:none;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)'
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
        }
    }, [props, showLoading, target])

    return [showLoading, setShowLoading]
}
export default useLoading
