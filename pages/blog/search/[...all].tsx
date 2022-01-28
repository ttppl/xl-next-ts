import useGlobalLoading from "../../../hooks/useGlobalLoading";
import {getDefaultLayout} from "../../../components/layouts/main";
import '/styles/pages/blog/blogSearch.scss'
import React, {useState} from "react";
import Icon from "../../../components/Icon";
import Link from "next/link";
import {KEY_CODE} from "../../../utils/dom";
import {useRouter} from "next/router";
import setGlobalLoading from "../../../utils/libs/setGlobalLoading";
import {queryBlogs} from "../../../request/modules/blogRequest";
import BlogCard from "../../../components/BlogCard";
import {Pagination} from "antd";
import PaginationItem from "../../../components/antdWrapper/PaginationItem";

//query:/key/:p1/:t1
export const getServerSideProps = async ({req,query}:any)=>{
    console.log(query)
    const key = query.key||''
    const page = query.all[2]?.slice(1)||1
    const pageSize = 10
    const total = query.all[3]?.slice(1)||0
    const blogRes = await queryBlogs(key,{page,pageSize})
    return {
        props:{
            keyWord:key,
            page,
            pageSize,
            blogs:blogRes.data||[],
            total:total||blogRes.total||0
        }
    }
}

Search.layout = getDefaultLayout

interface SearchProps {
    keyWord:string,
    page:number,
    pageSize:number,
    total:number,
    blogs:Array<any>
}
function Search(props:SearchProps) {
    useGlobalLoading(false,props)
    const [key,setKey] = useState(props.keyWord)
    const loading = ()=>{setGlobalLoading(true)}
    const getPageItem=(page:number,type:any)=>{
        return <PaginationItem href={`/blog/search/key/${key}/p${page}/t${props.total}`}
                               onClick={loading}
                               page={page}
                               type={type}/>
    }
    return <div className='xl-blog-search-page'>
        <form className='xl-search-input' method='get' onSubmit={()=>setGlobalLoading(true)} action={`/blog/search/key`}>
            <input name='key' value={key} onChange={(e)=>setKey(e.target.value)}/>
        <button className='xl-search-button'><Icon className='search'/></button>
        </form>
        <div className='xl-blog-type-blog-list'>
            {props.blogs.length>0?props.blogs.map((blog) => {
                return <BlogCard openBlank={false} key={blog.blogId} style={{width:'100%'}} blog={blog}/>
            }):'木有呢！！！'}
            {/*<Pagination total={total} page={page} pageSize={pageSize}/>*/}
            {props.total/props.pageSize>1&&<Pagination itemRender={getPageItem} defaultCurrent={props.page} total={props.total} defaultPageSize={props.pageSize}/>}
        </div>
    </div>
}

export default Search
