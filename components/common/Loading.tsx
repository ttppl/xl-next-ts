import '../../styles/components/common/Loading.scss'
import { useMemo} from "react";
import {isNumber} from "../../utils/check";
import PropTypes from 'prop-types'
import {AppProps} from "next/app";
Loading.propTypes={
    size:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    strokeWidth:PropTypes.number,
    labelSize:PropTypes.string,
    label:PropTypes.string
}
interface Props {
    size?:number|string,
    strokeWidth?:number,
    label?:string,
    labelSize?:string,
    children?:any
}
function Loading(props:Props) {
    const loadingStyle = useMemo(()=>{
        const style:{width?:string,height?:string} = {}
        if(props.size){
            const size:string = isNumber(props.size)?`${props.size}px`:props.size as string
            style.width=size
            style.height=size
        }
        return style
    },[props.size])
    const pathStyle = useMemo(()=>{
        const style:{strokeWidth?:string} = {}
        if(isNumber(props.size)){
            style.strokeWidth=`${props.size as number/10}px`
        }
        props.strokeWidth&&(style.strokeWidth = `${props.strokeWidth}px`)
        return style
    },[props.size,props.strokeWidth])

    return <>
        <svg style={loadingStyle} viewBox="25 25 50 50" className="xl-loading-circle-svg">
            <circle style={pathStyle} cx="50" cy="50" r="20" fill="none" className="path"/>
        </svg>
        <span className='xl-loading-children'>{props.children}</span>
        <p className='xl-loading-label' style={{fontSize:props.labelSize}}>{props.label}</p>
    </>
}

export default Loading
