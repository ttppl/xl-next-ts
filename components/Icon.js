import PropTypes from 'prop-types'
import '/styles/components/Icon.scss'
import {forwardRef, useMemo} from "react";
import {getClasses} from "../utils/dom";


const IconFun=(props,ref)=> {
    const className = useMemo(() => {
        const classNames = props.className.split(' ')
        return getClasses(['xl-iconfont', `xl-icon-${classNames[0]}`,...classNames.slice(1,classNames.length)])
    }, [props.className])
    const style = useMemo(() => {
        const stl = {...props.style}
        props.size && (stl.fontSize = `${props.size}px`)
        props.onClick&&(stl.cursor='pointer')
        stl.color = props.color
        return stl
    }, [props.style, props.size, props.onClick])
    return <i ref={ref} className={className} onClick={props.onClick} title={props.title} style={style}>{props.children}</i>
}
const Icon = forwardRef(IconFun)

Icon.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    color:PropTypes.string,
    size: PropTypes.number,
    title:PropTypes.string,
    onClick:PropTypes.func
}
Icon.defaultProps = {
    className: 'unknown',
    size:20,
    color:'inherit',
}
export default Icon
