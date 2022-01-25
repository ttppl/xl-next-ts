import '/styles/components/Loading.scss'
import { useMemo} from "react";
import {isNumber} from "../utils/check";
import PropTypes from 'prop-types'
Loading.propTypes={
    size:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    strokeWidth:PropTypes.number,
    labelSize:PropTypes.string,
    label:PropTypes.string
}
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
        <span className='xl-loading-children'>{props.children}</span>
        <p className='xl-loading-label' style={{fontSize:props.labelSize}}>{props.label}</p>
    </>
}

export default Loading
