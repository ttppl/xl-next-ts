import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react'
import '/styles/layouts/main.scss'
import MenuItem from "../menu/MenuItem";
import Menu from "../menu/menu";
import Script from "next/script";
import ClickOutside from "../../utils/libs/clickOutside";
import useTheme from "../../hooks/useTheme";
import XlTransition from "../XlTransition";

MyLayout.propTypes = {
    theme: PropTypes.string.isRequired
}
MyLayout.defaultProps = {
    theme: 'light'
}

function useMenu() {
    const [showMenu, setShowMenu] = useState(false)
    const afterMenuItemClicked = (key) => {
        if (key) {
            setShowMenu(!showMenu)
        }
    }
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

    return [showMenu, setShowMenu, afterMenuItemClicked, menuIcon, menu]
}

function MyLayout({theme, children}) {
    const [appTheme, changeTheme] = useTheme(theme)
    const [showMenu, setShowMenu, afterMenuItemClicked, menuIcon, menu] = useMenu()


    const transitions = {
        beforeEnter: {transform: 'translateY(-200vh)'},
        entering: {transform: 'translateY(0)'},
        entered: {transform: 'translateY(0)'},
        beforeExit: {transform: 'translateY(0)'},
        exiting: {transform: 'translateY(-200vh)'},
        exited: {transform: 'translateY(-200vh)'},
    }

    return (
        <>
            <div className='xl-main-layout-menu-icon' data-active={showMenu}
                 ref={menuIcon}
                 onClick={(e) => {
                     setShowMenu(!showMenu)
                 }}>
                <div className='xl-menu-icon-middle-line'/>
            </div>
            <div className='xl-main-layout-menu'>
                <XlTransition show={showMenu} duration={300} status={transitions}>
                    <Menu style={{position: 'absolute', right: 0, top: 0}} ref={menu} activeKey='index'
                          theme={appTheme} title={'导航'}
                          afterClick={afterMenuItemClicked}
                    >
                        <MenuItem menuKey='index' to='/' label='首页'/>
                        <MenuItem menuKey='types' to='/blog/types/init' label='分类'/>
                        <MenuItem menuKey='search' to='/blog/search/key' label='搜索'/>
                        <MenuItem menuKey='jsEditor' to='/editor' label='JS在线测试'/>
                        <MenuItem menuKey='localEditor' to='/editor/localEditor' label='本地测试'/>
                        <MenuItem loading={false}
                                  label={`${appTheme === 'light' ? 'dark' : 'light'}主题`}
                                  onClick={changeTheme}/>
                    </Menu>
                </XlTransition>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                width="300"
                height="200">
                <g fill="rgba(106,127,239,0.1)">
                    <path d="M 0 70 Q 75 39, 150 70 T 300 70 T 450 70 T 600 70 T 750 70 V 100 H 0 V 0"></path>
                    <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-300" dur="1.5s" repeatCount="indefinite"></animateTransform>
                </g>
                <g fill="rgba(106,127,239,0.15)">
                    <path d="M 0 70 Q 87.5 47, 175 70 T 350 70 T 525 70 T 700 70 T 875 70 T 1050 70 V 100 H 0 V 0"></path>
                    <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-350" dur="3s" repeatCount="indefinite"></animateTransform>
                </g>
                <g fill="rgba(106,127,239,0.18)" transform="translate(-903.868 0)">
                    <path d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 V 100 H 0 V 0" transform="translate(-38.232284367796474, 0)"></path>
                    <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-540" dur="2s" repeatCount="indefinite"></animateTransform>
                </g>
            </svg>
            <main className='xl-main-content'>{children}</main>
            <Script src="/libs/particleBg/particles.js" strategy='afterInteractive' onLoad={() => {
                const script = document.createElement('script')
                script.src = '/libs/particleBg/app.js'
                document.getElementsByTagName('head')[0].appendChild(script);
            }}/>
            {/*<Script src='/libs/particleBg/app.js'></Script>*/}
            {/*<Script src="/libs/particleBg/app.js" strategy='afterInteractive'/>*/}
        </>
    )
}

export default MyLayout

export function getDefaultLayout(page) {
    return <MyLayout>{page}</MyLayout>
}
