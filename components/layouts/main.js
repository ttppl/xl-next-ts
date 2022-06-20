import PropTypes, {func} from 'prop-types';
import React, {createContext, useEffect, useRef, useState} from 'react'
import '/styles/layouts/main.scss'
import MenuItem from "../menu/MenuItem";
import Menu from "../menu/menu";
import Script from "next/script";
import useTheme from "../../hooks/useTheme";
// import Wave from "../svg/Wave";
import {addScript} from "../../utils/dom";
import {getParaByKeys} from "../../request/modules/paraRequest";
import {isFunction} from "../../utils/check";
import Head from "next/head";


MyLayout.propTypes = {
    theme: PropTypes.string.isRequired//主题
}
MyLayout.defaultProps = {
    theme: 'light'
}

export const LayoutContext = createContext(null)

//带菜单的布局
function MyLayout({theme, children}) {
    // 主题
    const [appTheme, changeTheme] = useTheme(theme)
    // 菜单过度效果
    const [para,setPara] = useState({})
    //logo点击事件回调函数

    useEffect(()=>{
        getParaByKeys(['blog_head_title','blog_head_motto']).then((res)=>{
            const newPara = {}
            res.data.forEach(p=>{
                newPara[p.paraKey] = p.paraValue
            })
            setPara(newPara)
        })
    },[])
    const logoRef = useRef(null)
    const logoClickCallback = useRef([])
    // logo点击事件
    const logoClick = ()=>{
        logoClickCallback.current.forEach(fun=>{
            if(isFunction(fun)) {
                fun.call(this)
            }
        })
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0,viewport-fit=cover"/>
            </Head>
            {/*<img className='xl-body-bg'/>*/}
           <header className='xl-header'>
               {/*<img className='xl-header-bg'/>*/}
               <img ref={logoRef} onClick={logoClick} className='xl-head-logo' src='/imgs/logo.png'/>
               <span className='xl-head-title'>{para['blog_head_title']}</span>
               <span className='xl-head-motto'>{para['blog_head_motto']}</span>
           </header>
            <Menu style={{position: 'fixed', right: '20px', top: '20px'}} activeKey='index' title={'导航'}>
                <MenuItem menuKey='index' to='/' label='首页'/>
                <MenuItem menuKey='types' to='/blog/types/init' label='博客分类'/>
                <MenuItem menuKey='codeRun' to='/codeRun' label='localCode'/>
                <MenuItem menuKey='search' to='/blog/search/key' label='搜索'/>
                <MenuItem menuKey='jsEditor' to='/editor' label='JS在线测试'/>
                <MenuItem menuKey='txtDownload' to='/txtDownload' label='网文爬取'/>
                {/*<MenuItem menuKey='localEditor' to='/editor/localEditor' label='本地测试'/>*/}
                <MenuItem menuKey='changeTheme' label={`${appTheme === 'light' ? 'dark' : 'light'}主题`}
                          onClick={changeTheme}/>
            </Menu>

            {/*波浪纹*/}
            {/*<Wave className='xl-wave' height={40} color={appTheme === 'light'?'#92c3d3':'white'} waveCount={5}  radius={40} width={3000} />*/}
            {/*菜单对应界面*/}
            <main className='xl-main-content'>
                <LayoutContext.Provider value={{logoClickCallback,logoRef}}>
                    {children}
                </LayoutContext.Provider>
            </main>
            {/*粒子背景加载*/}
            <Script src="/libs/particleBg/particles.js" strategy='afterInteractive' onLoad={() => {
                addScript('/libs/particleBg/app.js')
            }}/>
        </>
    )
}

export default MyLayout

export function getDefaultLayout(page, layoutProps) {
    return <MyLayout {...layoutProps}>{page}</MyLayout>
}
