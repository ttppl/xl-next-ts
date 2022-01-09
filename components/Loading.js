import '/styles/components/Loading.scss'
import {useMemo} from "react";
import {isNumber} from "../utils/check";

function Loading(props) {
    const loadingStyle = useMemo(()=>{
        const style = {}
        if(props.size){
            const size = isNumber(props.size)?`${props.size}px`:props.size
            style.width=size
            style.height=size
        }
        return style
    },[props.size])
    const pathStyle = useMemo(()=>{
        const style = {}
        if(isNumber(props.size)){
            style.strokeWidth=`${props.size/10}px`
        }
        props.strokeWidth&&(style.strokeWidth = `${props.strokeWidth}px`)
        return style
    },[props.size,props.strokeWidth])
    return <>
        <svg style={loadingStyle} viewBox="25 25 50 50" className="xl-loading-circle-svg">
            <circle style={pathStyle} cx="50" cy="50" r="20" fill="none" className="path"></circle>
        </svg>
        <p className='xl-loading-label'>{props.label}</p>
    </>
}

export default Loading
