import React, {createContext, forwardRef, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from 'prop-types'
import '/styles/components/common/Menu.scss'
import {useRouter} from "next/router";
import ClickOutside from "../../utils/libs/clickOutside";
import XlTransition from "../common/XlTransition";

const Menu = forwardRef(MenuFunc)

MenuFunc.propsTypes = {
    title: PropTypes.string,//菜单标题
    activeKey: PropTypes.string,//当前选中菜单项
    style: PropTypes.object//样式（菜单整体的）
}

MenuFunc.defaultProps = {
    title: '',
    activeItem: '',
}

export const MenuContext = createContext(null)


const transitions = {
    beforeEnter: {transform: 'translateY(-200vh)'},
    entering: {transform: 'translateY(0)'},
    entered: {transform: 'translateY(0)'},
    beforeExit: {transform: 'translateY(0)'},
    exiting: {transform: 'translateY(-200vh)'},
    exited: {transform: 'translateY(-200vh)'},
}

function MenuFunc(props, ref) {
    // 显示menu
    const [showMenu, setShowMenu] = useState(false)

    // 点击外面关闭菜单
    const menuIcon = useRef(null)
    const menu = useRef(null)
    useEffect(() => {
        const clickOutsideDom = ClickOutside.addSource(menu.current, (e) => {
            if (!menuIcon.current.contains(e.target)) {
                setShowMenu(false)
            }
        })
        return () => {
            ClickOutside.deleteSource(clickOutsideDom)
        }
    }, [])
    // 当前选中菜单项
    const [activeKey, setActiveKey] = useState(props.activeKey)
    // 将激活菜单项提供给menu-item判断是否显示激活样式
    const menuProvider = useMemo(() => {
        return {activeKey, setActiveKey,setShowMenu}
    }, [activeKey])
    // 路由切换完毕后关闭全局loading
    const router = useRouter()
    // useEffect(() => {
    //     const handleStop = () => {
    //         setGlobalLoading(false)
    //     }
    //     // router.events.on('routeChangeStart', handleStart)
    //     router.events.on('routeChangeComplete', handleStop)
    //     router.events.on('routeChangeError', handleStop)
    //
    //     return () => {
    //         // router.events.off('routeChangeStart', handleStart)
    //         router.events.off('routeChangeComplete', handleStop)
    //         router.events.off('routeChangeError', handleStop)
    //     }
    // }, [])
    return <div className="xl-menu" style={props.style}>
        {/*菜单icon*/}
        <div className='xl-menu-icon' data-active={showMenu} ref={menuIcon}
             onClick={() => setShowMenu(!showMenu)}>
            {/*菜单中间杠*/}
            <div className='xl-menu-icon-middle-line'/>
        </div>
        {/*菜单弹框*/}
            <XlTransition show={showMenu} duration={300} status={transitions}>
                <div ref={menu} className='xl-menu-main'>
                    {/*菜单标题*/}
                    {props.title && (<div className='xl-menu-title'>{props.title}</div>)}
                    {/*菜单项*/}
                    <MenuContext.Provider value={menuProvider}>
                        {props.children}
                    </MenuContext.Provider>
                </div>
            </XlTransition>

    </div>
}

export default Menu
