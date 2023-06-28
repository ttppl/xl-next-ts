import PropTypes from 'prop-types'
import '/styles/components/common/Menu.scss'
import {useContext, useMemo} from "react";
import {getClass} from "../../utils/dom";
import Link from 'next/link'
import {MenuContext} from "./menu";
import setGlobalLoading from "../../utils/libs/setGlobalLoading";

MenuItem.propTypes = {
    menuKey: PropTypes.string,//菜单项唯一标识
    label: PropTypes.string,//菜单显示的标签内容
    to: PropTypes.string,//菜单点击后跳转对应的路由路径
    openBlank:PropTypes.bool,//是否在新标签页打开链接
    onClick:PropTypes.func//点击回调事件
}

MenuItem.defaultProps = {
    label: '',
    to: '',
    openBlank:false
}

function MenuItem(props) {
    // menu提供的激活菜单项
    const {activeKey,setActiveKey,setShowMenu} = useContext(MenuContext)
    // 判断当前菜单项是否是激活状态
    const isActive = useMemo(()=>{
        return props.menuKey===activeKey
    },[props.menuKey,activeKey])
    // 点击导航事件
    const navigation = (event) => {
        if(props.menuKey){
            setActiveKey(props.menuKey)
        }
        if(props.to&&!isActive) {//提供路由路径且不是选中项则跳转
            setGlobalLoading(true,{label:`loading '${props.label}' ...`})
        }
        // 执行自定义事件
        props.onClick?.(event)
        // 点击后关闭菜单
        setShowMenu(false)
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
