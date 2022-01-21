import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react'
import '/styles/layouts/main.scss'
import Transition from "react-transition-group/cjs/Transition";
import MenuItem from "../menu/MenuItem";
import Menu from "../menu/menu";
import Head from "next/head";
import Script from "next/script";
import clickOutside from "../../utils/libs/clickOutside";
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
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    // const menuIcon = useRef(null)
    // useEffect(()=>{
    //     ClickOutside.addSource(document.getElementById('xl-menu'),(e)=>{
    //         if(!menuIcon.current.contains(e.target)){
    //             setShowMenu(false)
    //         }
    //     })
    //     return ()=>{
    //         ClickOutside.deleteSource(document.getElementById('xl-menu'))
    //     }
    // },[])
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
                 onClick={toggleMenu}>
                <div className='xl-menu-icon-middle-line'/>
            </div>
            <div className='xl-main-layout-menu'>
                <Transition in={showMenu} timeout={300}>
                    {state => (
                        <div style={{
                            ...defaultStyle,
                            ...transitions[state]
                        }}>
                            <Menu id='xl-menu' activeKey='index' theme={appTheme} title={'导航'}
                                // afterClick={toggleMenu}
                            >
                                <MenuItem menuKey='index' label='首页'/>
                                <MenuItem menuKey='article' label='文章'/>
                                <MenuItem menuKey='essay' label='随笔'/>
                                <MenuItem menuKey='search' label='搜索'/>
                                <MenuItem menuKey='management' label='管理' to='/management'/>
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
