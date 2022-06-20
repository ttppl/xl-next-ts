import {getDefaultLayout} from "../../../components/layouts/main";
import '../../../styles/pages/blog/blogSearch.scss'
import React, {useState} from "react";
import Icon from "../../../components/common/Icon";
import {queryBlogs} from "../../../request/modules/blogRequest";
import BlogCard from "../../../components/common/BlogCard";
import XlPagination from "../../../components/common/XlPagination";
import {useRouter} from "next/router";
import {decryptUrl, encryptUrl} from "../../../utils/dom";

//query:/key/:p1/:t1
export const getServerSideProps = async ({req, query}: any) => {
    // console.log(query)
    const key = decryptUrl(query.key || '')
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
    const [key, setKey] = useState(props.keyWord)
    const router = useRouter()
    const search = (e:any)=>{
        e.preventDefault()
        router.push(`/blog/search/p1?key=${encryptUrl(key)}`)
    }
    return <div className='xl-blog-search-page'>
        <form action='/blog/search' className='xl-search-input' method='get' onSubmit={search}
              // action={`/blog/search/p1`}
        >
            <input name='key' value={key} onChange={(e) => setKey(e.target.value)}/>
            <button type='submit' className='xl-search-button'><Icon className='search'/></button>
        </form>
        <div className='xl-blog-search-blog-list'>
            {props.blogs.length > 0 ? props.blogs.map((blog,index) => {
                return <BlogCard className={`blog-card-index-${index}`} openBlank={false} key={blog.blogId} style={{width: '50vw'}} blog={blog}/>
            }) : '木有呢！！！'}
            {/*<Pagination total={total} page={page} pageSize={pageSize}/>*/}
            {props.total / props.pageSize > 1 &&
            <XlPagination
                defaultPageSize={props.pageSize}
                defaultCurrent={props.page}
                pageUrl={(page: number) => `/blog/search/p${page}?key=${key}`}
                total={props.total}
            />}
        </div>
    </div>
}

export default Search
