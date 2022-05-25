import React, {ReactNode, useEffect} from "react";
import Link from "next/link";
import Pagination from "rc-pagination";
import {useRouter} from "next/router";
import {isFunction} from "../../utils/check";
import '/styles/components/common/XlPagination.scss'
type urlGenerator = string|((page:number)=>string)//pageUrl

interface XlPaginationProps {
    defaultPageSize?:number,//每页数
    defaultCurrent?:number,//当前页
    pageUrl:urlGenerator,
    onChange?:(page:number)=>void,//page改变回调函数
    total?:number,//总条数
    itemRender?:any//分页item自定义render函数
}

// 分页器
const XlPagination = ({defaultPageSize,defaultCurrent,pageUrl,onChange,total,itemRender}:XlPaginationProps)=>{
    defaultPageSize = defaultPageSize||10
    total = total||defaultPageSize
    // 大于7页显示快速跳转
    const showQuickJumper = total/defaultPageSize>7
    // 路由跳转
    const router = useRouter()
    const routerChange = (page:number,pageSize:number) => {
        // 路由跳转添加全局loading
        // setGlobalLoading(true)
        const routerUrl = isFunction(pageUrl)?(pageUrl as Function)(page):pageUrl
        if(routerUrl) {
            router.push(routerUrl)
        }
        // 触发change回调
        onChange?.(page)
    }
    // useEffect(() => {
    //     const routerCompleteHandler = () => {
    //         // 路由跳转完成关闭全局loading
    //         setGlobalLoading(false)
    //     }
    //     router.events.on('routeChangeComplete', routerCompleteHandler)
    //     return () => {
    //         router.events.off('routeChangeComplete', routerCompleteHandler)
    //     }
    // }, [])
    const showPagination = total/defaultPageSize>1// 小于1页则不渲染分页器
    return showPagination?<Pagination
        className='xl-pagination'
        showQuickJumper={showQuickJumper}
        // showSizeChanger
        defaultPageSize={defaultPageSize}
        defaultCurrent={defaultCurrent||1}
        onChange={routerChange}
        // onShowSizeChange={onShowSizeChange}
        itemRender={itemRender||PaginationItemHOC(pageUrl)}
        total={total}
    />:null
}

export default XlPagination


// 分页器item
const PaginationItem = (page: number,
                        type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
                        element: ReactNode,
                        href:urlGenerator) => {
    if (type === 'page') {
        return <Link href={isFunction(href)?(href as Function)(page):href} passHref={true}>
            <a className='xl-pagination-item'>{page}</a>
        </Link>;
    }
    if (type === 'prev') {
        return '<';
    }
    if (type === 'next') {
        return '>';
    }
    // if (type.includes('jump')) {
    //     return '•••'
    // }
    return element;
};


export const PaginationItemHOC = (href: urlGenerator) => {
    return (page: number, type: "page" | "prev" | "next" | "jump-prev" | "jump-next", element: ReactNode) => {
        return PaginationItem(page, type, element, href)
    }
}
