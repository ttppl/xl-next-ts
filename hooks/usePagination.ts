import {PaginationItemHOC} from "../components/XlPagination";
import setGlobalLoading from "../utils/libs/setGlobalLoading";
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import Pagination from "rc-pagination";

type PageUrlFunc = (page: number) => string

function usePagination(pageUrlFunc: PageUrlFunc): Array<any> {
    const IndexPaginationItem = PaginationItemHOC(pageUrlFunc)
    const router = useRouter()
    const routerChange = (page:number,pageSize:number) => {
        setGlobalLoading(true)
        router.push(pageUrlFunc(page))
    }
    useEffect(() => {
        const routerCompleteHandler = () => {
            // console.log('router changed')
            setGlobalLoading(false)
        }
        router.events.on('routeChangeComplete', routerCompleteHandler)
        return () => {
            router.events.off('routeChangeComplete', routerCompleteHandler)
        }
    }, [])
    return [routerChange, IndexPaginationItem]
}

export default usePagination
