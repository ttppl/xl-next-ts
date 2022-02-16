import useGlobalLoading from "../../../hooks/useGlobalLoading";
import {getDefaultLayout} from "../../../components/layouts/main";
import '/styles/pages/blog/blogSearch.scss'
import React, {FormEventHandler, useState} from "react";
import Icon from "../../../components/Icon";
import setGlobalLoading from "../../../utils/libs/setGlobalLoading";
import {queryBlogs} from "../../../request/modules/blogRequest";
import BlogCard from "../../../components/BlogCard";
import XlPagination from "../../../components/XlPagination";
import usePagination from "../../../hooks/usePagination";
import {useRouter} from "next/router";

//query:/key/:p1/:t1
export const getServerSideProps = async ({req, query}: any) => {
    console.log(query)
    const key = query.key || ''
    const page = query.all[0]?.slice(1) || 1
    const pageSize = 10
    const blogRes = await queryBlogs(key, {page, pageSize})
    return {
        props: {
            keyWord: key,
            page,
            pageSize,
            blogs: blogRes.data || [],
            total: blogRes.total || 0
        }
    }
}

Search.layout = getDefaultLayout

interface SearchProps {
    keyWord: string,
    page: number,
    pageSize: number,
    total: number,
    blogs: Array<any>
}

function Search(props: SearchProps) {
    useGlobalLoading(false, props)
    const [routerChange, IndexPaginationItem] = usePagination((page: number) => {
        return `/blog/search/p${page}?key=${key}`
    })
    const [key, setKey] = useState(props.keyWord)
    const router = useRouter()
    const search = (e:any)=>{
        e.preventDefault()
        setGlobalLoading(true)
        router.push(`/blog/search/p1?key=${key}`)
    }
    return <div className='xl-blog-search-page'>
        <form className='xl-search-input' method='get' onSubmit={search}
              // action={`/blog/search/p1`}
        >
            <input name='key' value={key} onChange={(e) => setKey(e.target.value)}/>
            <button className='xl-search-button'><Icon className='search'/></button>
        </form>
        <div className='xl-blog-type-blog-list'>
            {props.blogs.length > 0 ? props.blogs.map((blog) => {
                return <BlogCard openBlank={false} key={blog.blogId} style={{width: '50vw'}} blog={blog}/>
            }) : '木有呢！！！'}
            {/*<Pagination total={total} page={page} pageSize={pageSize}/>*/}
            {props.total / props.pageSize > 1 &&
            <XlPagination
                defaultPageSize={props.pageSize}
                defaultCurrent={props.page}
                onChange={routerChange}
                itemRender={IndexPaginationItem}
                total={props.total}
            />}
        </div>
    </div>
}

export default Search
