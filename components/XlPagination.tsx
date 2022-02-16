import React, {ReactNode} from "react";
import Link from "next/link";
import Pagination from "rc-pagination";

interface PaginationItemProps {
    href: string,
    onClick: (event: any) => void,
    page: string | number,
    type: string
}

// export default function XlPagination(props:PaginationItemProps){
//     return <Link href={props.href}>
//             <span className='xl-page-item'
//                   onClick={props.onClick}
//                   title={`page:${props.page}`}>{props.type==='page'?props.page:props.type}</span>
//     </Link>
// }
type hrefFun = (page: number) => string
const PaginationItem = (page: number,
                      type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
                      element: ReactNode,
                      href:hrefFun) => {
    if (type === 'page') {
        return <Link href={href(page)} passHref={true}><a className='xl-pagination-item'>{page}</a></Link>;
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

// export default PaginationItem

export const PaginationItemHOC = (href: hrefFun) => {
    return (page: number, type: "page" | "prev" | "next" | "jump-prev" | "jump-next", element: ReactNode) => {
        return PaginationItem(page, type, element, href)
    }
}

interface XlPaginationProps {
    defaultPageSize?:number,
    defaultCurrent?:number,
    onChange?:(page:number)=>void,
    total?:number,
    itemRender?:any
}
const XlPagination = ({defaultPageSize,defaultCurrent,onChange,total,itemRender}:XlPaginationProps)=>{
    defaultPageSize = defaultPageSize||10
    total = total||defaultPageSize
    return total/defaultPageSize>1?<Pagination
        className='xl-pagination'
        showQuickJumper={total/defaultPageSize>7}
        // showSizeChanger
        defaultPageSize={defaultPageSize}
        defaultCurrent={defaultCurrent||1}
        onChange={onChange}
        // onShowSizeChange={onShowSizeChange}
        itemRender={itemRender}
        total={total}
    />:null
}

export default XlPagination
