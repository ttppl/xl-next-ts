import {Blog} from "../request/modules/blogRequest";
import '/styles/components/BlogCard.scss'
// const Icon =require("/components/Icon")
import Icon from '../components/Icon'
import {Space} from "antd";
import Link from "next/link";
import React, {useMemo} from "react";
import Tag from "./Tag";
import {isArray} from "../utils/check";
function BlogCard({blog}: { blog: Blog }) {
    const tags = useMemo(()=>{
        const blogTags = Array.isArray(blog.tags)?blog.tags:(blog.tags as string).split(',')
        return blogTags.map((tag:any)=>{
            if(tag)
                return <Tag name={tag}/>
        })
    },[blog.tags])
    return <article className='xl-blog-card' key={`index-blog-${blog.blogId}`}>
        <h1 className='xl-blog-card-title'>
            <Link href='/'>{blog.title}</Link>
        </h1>
        {/*<p className='xl-blog-card-content'><Link href='#'>{blog.plainText?.replace(/[\r\n]/g, "")}</Link></p>*/}
        <p className='xl-blog-card-content'>{blog.plainText?.replace(/[\r\n]/g, "")}</p>
        <footer className='xl-blog-card-footer'>
            <Space size={40} align='center'>
                <span>{new Date(blog.publishTime).toLocaleDateString()}</span>
                <span><Icon className='view'/>{blog.viewCount}</span>
                <span><Icon className='heart'/>{blog.likeCount}</span>
                <span><Icon className='comment'/>{blog.commentCount}</span>
                {blog.category&&<span>分类：{blog.category}</span>}
                <span>{tags}</span>
            </Space>
        </footer>
    </article>
}

export default BlogCard
