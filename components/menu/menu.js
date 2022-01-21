import {createContext, useMemo, useState} from "react";
import PropTypes from 'prop-types'
import '/styles/components/Menu.scss'

Menu.propsTypes = {
    title: PropTypes.string,
    activeKey: PropTypes.string,
    afterClick:PropTypes.func,
    theme:PropTypes.string
}

Menu.defaultProps = {
    title: '',
    activeItem: '',
    theme:'light'
    // items: []
}

export const MenuContext = createContext(null)

function Menu(props) {
    const [activeKey,setActiveKey] = useState(props.activeKey)

    const menuProvider = useMemo(()=>{
        return {activeKey,setActiveKey,clickCallback:props.afterClick}
    },[activeKey,props.afterClick])
    return (
        <div className={`xl-menu ${props.theme}`}>
            {props.title && (<div className='xl-menu-title'>{props.title}</div>)}
            <MenuContext.Provider value={menuProvider}>
                {props.children}
            </MenuContext.Provider>
        </div>
    )
}

export default Menu
