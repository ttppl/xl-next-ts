import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react'
import '/styles/layouts/main.scss'
import Transition from "react-transition-group/cjs/Transition";
import MenuItem from "../menu/MenuItem";
import Menu from "../menu/menu";
import Script from "next/script";
import ClickOutside from "../../utils/libs/clickOutside";

MyLayout.propTypes = {
    theme: PropTypes.string.isRequired
}
MyLayout.defaultProps = {
    theme: 'light'
}

function MyLayout({theme, children}) {
    const [appTheme, setAppTheme] = useState(theme)
    const changeTheme = () => {
        setAppTheme(appTheme === 'light' ? 'dark' : 'light')
        document.body.style.color = appTheme === 'light' ? 'white' : 'black'
    }

    const [showMenu, setShowMenu] = useState(false)
    const afterMenuItemClicked = (key) => {
        if(key) {
            setShowMenu(!showMenu)
        }
        if(key==='management'){
            ClickOutside.deleteSource(menu.current)
        }
    }
    const menuIcon = useRef(null)
    const menu = useRef(null)
    useEffect(()=>{
        ClickOutside.addSource(menu.current,(e)=>{
            if(!menuIcon.current.contains(e.target)){
                setShowMenu(false)
            }
        })
        return ()=>{
            ClickOutside.deleteSource(menu.current)
        }
    },[])
    const transitions = {
        init: {transform: 'translateY(-200vh)'},
        entering: {transform: 'translateY(0)'},
        entered: {transform: 'translateY(0)'},
        exiting: {transform: 'translateY(-200vh)'},
        exited: {transform: 'translateY(-200vh)'},
    }
    const defaultStyle = {
        transition: 'all 300ms ease-in-out',
        ...transitions.init
    }

    return (
        <>
            <style global jsx>{`
                body {
                    background:url(/imgs/${appTheme}-bg.jpg) no-repeat;
                    //background-size: cover;//或者background-size: 100% 100%;
                    background-size:100% 100%;
                    background-attachment: fixed;
                    color:${appTheme === 'light' ? 'black' : 'white'}
                }
            `}</style>
            <div className='xl-main-layout-menu-icon' data-active={showMenu}
                 ref={menuIcon}
                 onClick={(e)=>{setShowMenu(!showMenu)}}>
                <div className='xl-menu-icon-middle-line'/>
            </div>
            <div className='xl-main-layout-menu'>
                <Transition in={showMenu} timeout={300}>
                    {state => (
                        <div style={{
                            ...defaultStyle,
                            ...transitions[state]
                        }}>
                            <Menu style={{position: 'absolute',right: 0,top: 0}} ref={menu} activeKey='index' theme={appTheme} title={'导航'}
                                afterClick={afterMenuItemClicked}
                            >
                                <MenuItem menuKey='index' to='/' label='首页'/>
                                <MenuItem menuKey='types' to='/blog/types/init' label='分类'/>
                                <MenuItem menuKey='search' to='/blog/search/key' label='搜索'/>
                                <MenuItem menuKey='jsEditor' to='/editor' label='JS在线测试'/>
                                <MenuItem menuKey='localEditor' to='/editor/localEditor' label='本地测试'/>
                                {/*<MenuItem menuKey='management' loading={false} openBlank={true} label='管理' to='/management'/>*/}
                                <MenuItem loading={false}
                                          label={`${appTheme === 'light' ? 'dark' : 'light'}主题`}
                                          onClick={changeTheme}/>
                            </Menu>
                        </div>
                    )}
                </Transition>
            </div>

            <main>{children}</main>
            <Script src="/libs/particleBg/particles.js" strategy='afterInteractive' onLoad={()=>{
                const script = document.createElement('script')
                script.src = '/libs/particleBg/app.js'
                document.getElementsByTagName('head')[0].appendChild(script);
            }}/>
            {/*<Script src="/libs/particleBg/app.js" strategy='afterInteractive'/>*/}
        </>
    )
}

export default MyLayout

export function getDefaultLayout(page) {
    return <MyLayout>{page}</MyLayout>
}
