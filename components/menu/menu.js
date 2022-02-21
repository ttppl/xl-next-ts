import {createContext, forwardRef, useEffect, useMemo, useState} from "react";
import PropTypes from 'prop-types'
import '/styles/components/Menu.scss'
import {useRouter} from "next/router";
import setGlobalLoading from "../../utils/libs/setGlobalLoading";

const Menu = forwardRef(MenuFunc)

MenuFunc.propsTypes = {
    title: PropTypes.string,
    activeKey: PropTypes.string,
    afterClick: PropTypes.func,
    style: PropTypes.object
}

MenuFunc.defaultProps = {
    title: '',
    activeItem: '',
}

export const MenuContext = createContext(null)

function MenuFunc(props, ref) {
    const [activeKey, setActiveKey] = useState(props.activeKey)
    const menuProvider = useMemo(() => {
        return {activeKey, setActiveKey, clickCallback: props.afterClick}
    }, [activeKey, props.afterClick])
    const router = useRouter()
    useEffect(()=>{
        // const handleStart = ()=>{ setGlobalLoading(true,{label:`loading '${activeKey}' ...`})}
        const handleStop = ()=>{setGlobalLoading(false)}
        // router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            // router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    },[])
    return (
        <div ref={ref} style={props.style} className='xl-menu'>
            {props.title && (<div className='xl-menu-title'>{props.title}</div>)}
            <MenuContext.Provider value={menuProvider}>
                {props.children}
            </MenuContext.Provider>
        </div>
    )
}

export default Menu
