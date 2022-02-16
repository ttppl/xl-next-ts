import {Blog} from "../request/modules/blogRequest";
import '../styles/components/BlogCard.scss'
import Icon from '../components/Icon'
import Link from "next/link";
import React, {useMemo} from "react";
import Tag from "./Tag";
import Router from "next/router"
import setGlobalLoading from "../utils/libs/setGlobalLoading";

const showDetail = (id: number | string) => {
    setGlobalLoading(true)
    Router.push(`/blog/detail/${id}`)
}

function BlogCard({blog, openBlank, style, className}: { blog: Blog, openBlank: boolean, style?: object, className?: string }) {
    const tags = useMemo(() => {
        const blogTags = Array.isArray(blog.tags) ? blog.tags : (blog.tags as string).split(',')
        return blogTags.map((tag: any) => {
            if (tag)
                return <Tag name={tag}/>
        })
    }, [blog.tags])
    return <article className={`xl-blog-card ${className||''}`} style={style} key={`index-blog-${blog.blogId}`}>
        <div className='xl-blog-card-bg'/>
        <h1 className='xl-blog-card-title'>
            <Link href={`/blog/detail/${blog.blogId}`} passHref={true}>
                <a rel="noreferrer" onClick={() => {
                    showDetail(blog.blogId)
                }} target={openBlank?'_blank':'_self'}>{blog.title}</a>
            </Link>
        </h1>
        {/*<p className='xl-blog-card-content'><Link href='#'>{blog.plainText?.replace(/[\r\n]/g, "")}</Link></p>*/}
        <p className='xl-blog-card-content' onClick={() => {
            showDetail(blog.blogId)
        }}>{blog.plainText?.replace(/[\r\n]/g, "")}</p>
        <footer className='xl-blog-card-footer'>
            <span className='xl-blog-card-publish-date'>{new Date(blog.publishTime).toLocaleDateString()}</span>
            <span><Icon className='view'/>{blog.viewCount}</span>
            <span><Icon className='heart'/>{blog.likeCount}</span>
            <span><Icon className='comment'/>{blog.commentCount}</span>
            {blog.category && <span className='xl-blog-card-category'>分类：{blog.category}</span>}
            <span>{tags}</span>
        </footer>
    </article>
}

export default BlogCard
