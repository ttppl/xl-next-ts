import PropTypes from 'prop-types';
import {useState} from 'react'
import '/styles/layouts/main.scss'
import Transition from "react-transition-group/cjs/Transition";
import MenuItem from "../menu/MenuItem";
import Menu from "../menu/menu";

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
    const transitions = {
            init:{transform: 'translateY(-200vh)'},
            entering: {transform: 'translateY(0)'},
            entered:  { transform: 'translateY(0)' },
            exiting:  { transform: 'translateY(-200vh)' },
            exited:  { transform: 'translateY(-200vh)' },
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
            {/*<div ref={container} className={style.container}></div>*/}
            <div className='xl-menu-icon' data-active={showMenu}
                 onClick={toggleMenu}>
                <div className='xl-menu-icon-middle-line'/>
            </div>
            <Transition in={showMenu} timeout={300}>
                {state => (
                    <div style={{
                        ...defaultStyle,
                        ...transitions[state]
                    }}>
                        <Menu className={'xl-main-layout-menu'} title={'导航'} afterClick={toggleMenu}>
                            <MenuItem label='首页'/>
                            <MenuItem label='文章'/>
                            <MenuItem label='随笔'/>
                            <MenuItem label='搜索'/>
                            <MenuItem label='管理' to='/management'/>
                            <MenuItem label={`${appTheme === 'light' ? 'dark' : 'light'}主题`} onClick={changeTheme}/>
                        </Menu>
                    </div>
                )}
            </Transition>
                <main>{children}</main>
        </>
    )
}

export default MyLayout

export function getDefaultLayout(page) {
    return <MyLayout>{page}</MyLayout>
}
