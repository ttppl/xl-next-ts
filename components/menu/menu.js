import {createContext, forwardRef, useMemo, useState} from "react";
import PropTypes from 'prop-types'
import '/styles/components/Menu.scss'

const Menu = forwardRef(MenuFunc)
Menu.displayName = 'Select'

MenuFunc.propsTypes = {
    title: PropTypes.string,
    activeKey: PropTypes.string,
    afterClick:PropTypes.func,
    theme:PropTypes.string,
    style:PropTypes.object
}

MenuFunc.defaultProps = {
    title: '',
    activeItem: '',
    theme:'light'
    // items: []
}

export const MenuContext = createContext(null)

function MenuFunc(props,ref) {
    const [activeKey,setActiveKey] = useState(props.activeKey)

    const menuProvider = useMemo(()=>{
        return {activeKey,setActiveKey,clickCallback:props.afterClick}
    },[activeKey,props.afterClick])
    return (
        <div ref={ref} style={props.style} className={`xl-menu ${props.theme}`}>
            {props.title && (<div className='xl-menu-title'>{props.title}</div>)}
            <MenuContext.Provider value={menuProvider}>
                {props.children}
            </MenuContext.Provider>
        </div>
    )
}

export default Menu
