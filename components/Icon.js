import PropTypes from 'prop-types'
import '/styles/components/Icon.scss'
import {useMemo} from "react";
import {getClasses} from "../utils/dom";

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

function Icon(props) {
    const className = useMemo(() => {
        return getClasses(['xl-iconfont', `xl-icon-${props.className}`])
    }, [props.className])
    const style = useMemo(() => {
        const stl = {...props.style}
        props.size && (stl.fontSize = `${props.size}px`)
        props.onClick&&(stl.cursor='pointer')
        stl.color = props.color
        return stl
    }, [props.style, props.size, props.onClick])
    return <i className={className} onClick={props.onClick} title={props.title} style={style}>{props.children}</i>
}

export default Icon
