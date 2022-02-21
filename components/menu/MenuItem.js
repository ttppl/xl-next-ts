import PropTypes from 'prop-types'
import '/styles/components/Menu.scss'
import {useContext, useMemo} from "react";
import {getClasses} from "../../utils/dom";
import Link from 'next/link'
import {MenuContext} from "./menu";
import setGlobalLoading from "../../utils/libs/setGlobalLoading";

MenuItem.propTypes = {
    menuKey: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string,
    loading:PropTypes.bool
}

MenuItem.defaultProps = {
    label: '',
    to: '',
    loading:true
}

function MenuItem(props) {

    const {activeKey,setActiveKey,clickCallback} = useContext(MenuContext)

    const isActive = useMemo(()=>{
        return props.menuKey===activeKey
    },[props.menuKey,activeKey])
    const navigation = (event) => {
        // event.preventDefault()
        if(props.loading&&!isActive) {
            // setLoading(true)
            setGlobalLoading(true,{label:`loading '${props.label}' ...`})
        }
        if(props.menuKey){
            setActiveKey(props.menuKey)
        }
        props.onClick?.(event)
        clickCallback?.(props.menuKey, props.label)
    }

    return props.to?<Link href={{
        pathname: props.to,
        // query: {name: 'test'},
    }} passHref>
        <a className={`xl-menu-item ${isActive?'active':''}`} target={props.openBlank?'_blank':'_self'} onClick={navigation}>
            {props.children || props.label}
        </a>
    </Link>:<span className={`xl-menu-item ${isActive?'active':''}`} onClick={navigation}>
        {props.children || props.label}
    </span>

}

export default MenuItem
