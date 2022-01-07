import PropTypes from 'prop-types'
import styles from '/styles/components/Icon.module.scss'
import {useMemo} from "react";

Icon.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.number,
    title:PropTypes.string,
    onClick:PropTypes.func
}
Icon.defaultProps = {
    className: 'unknown',
    size:20
}

function Icon(props) {
    const className = useMemo(() => {
        return [styles.iconfont, styles[`xl-${props.className}`]].join(' ')
    }, [props.className])
    const style = useMemo(() => {
        const stl = {...props.style}
        props.size && (stl.fontSize = `${props.size}px`)
        props.onClick&&(stl.cursor='pointer')
        return stl
    }, [props.style, props.size, props.onClick])
    return <i className={`iconfont ${className}`} onClick={props.onClick} title={props.title} style={style}>{props.children}</i>
}

export default Icon
