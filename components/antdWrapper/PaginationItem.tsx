import Link from "next/link";
import React, {MouseEventHandler} from "react";
interface PaginationItemProps {
    href:string,
    onClick:(event:any)=>void,
    page:string|number,
    type:string
}
export default function PaginationItem(props:PaginationItemProps){
    return <Link href={props.href}>
            <span className='xl-page-item'
                  onClick={props.onClick}
                  title={`page:${props.page}`}>{props.type==='page'?props.page:props.type}</span>
    </Link>
}
