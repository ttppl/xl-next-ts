import {createContext, useMemo, useState} from "react";
import PropTypes from 'prop-types'
import '/styles/components/Menu.scss'
import {useRouter} from "next/router";
import MenuItem from "./MenuItem";
import {getClasses} from "../../utils/dom";

Menu.propsTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    activeItem: PropTypes.string,
    items: PropTypes.array,
    afterClick:PropTypes.func
}

Menu.defaultProps = {
    type: '',
    title: '',
    activeItem: '',
    // items: []
}

export const MenuContext = createContext(null)

function Menu(props) {
    const className = useMemo(() => {
        const type = props.type && `xl-menu-${props.type}`
        return getClasses(['xl-menu',type,props.className])
    }, [props.type, props.className])
    const router = useRouter()
    const [menuItems] = useState(props.items||[])
    const active = props.activeItem ||menuItems.find(i=>i.path===router.pathname)
    const [activeItem, setActiveItem] = useState(active>-1?active:0)
    return (
        <div className={className}>
            {props.title && (<div className='xl-menu-title'>{props.title}</div>)}
            <MenuContext.Provider value={{activeItem,setActiveItem,menuItems,clickCallback:props.afterClick}}>
                {
                    props.children ? props.children :
                        props.items?.map((item, index) => <MenuItem key={`menuItem${index}`} label={item.label}/>)

                }
            </MenuContext.Provider>
        </div>
    )
}

export default Menu
