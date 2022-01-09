import PropTypes from 'prop-types'
import '/styles/components/Menu.scss'
import {useContext, useMemo} from "react";
import {getClasses} from "../../utils/dom";
import Link from 'next/link'
import {MenuContext} from "./menu";
import useLoading from "../../hooks/useLoading";

MenuItem.propTypes = {
    key: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string
}

MenuItem.defaultProps = {
    label: '',
    to: '/'
}

function MenuItem(props) {

    const menuContext = useContext(MenuContext)
    const key = props.key || props.label
    const itemIndex = menuContext.menuItems.findIndex(i => i.key === key)
    const index = itemIndex > -1 ? itemIndex : menuContext.menuItems.push({
        key,
        label: props.label,
        path: props.path
    }) - 1

    const [loading, setLoading] = useLoading(false, null, {
        containerCssText:'position:fixed;width:100%;height:100%',
        mask: true,
        size: '100',
        maskClose:true,
        label:'努力加载中...'
    })
    const cls = useMemo(() => {
        //console.log(menuContext.activeItem, index)
        const isActive = menuContext.activeItem === index && 'active'
        return getClasses(['xl-menu-item', isActive])
    }, [menuContext.activeItem])
    const navigation = (event) => {
        setLoading(true)
        menuContext.setActiveItem(index)
        props.onClick?.(event)
        menuContext.clickCallback?.(index, props.label)
    }

    return <Link href={{
        pathname: props.to,
        // query: {name: 'test'},
    }} passHref>
        <a className={cls} onClick={navigation}>
            {props.children || props.label}
        </a>
    </Link>

}

export default MenuItem
