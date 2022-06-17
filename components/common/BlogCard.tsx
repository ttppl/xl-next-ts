import {Blog} from "../../request/modules/blogRequest";
import '../../styles/components/common/BlogCard.scss'
import Icon from './Icon'
import Link from "next/link";
import React, {useMemo} from "react";
import Router from "next/router"
import {encryptUrl} from "../../utils/dom";
import {isNum} from "../../utils/check";

const showDetail = (id: number | string) => {
    Router.push(`/blog/detail/${id}`)
}

function Tag({name,color}:any) {
    return <div className='xl-blog-tag' style={color}>{name}</div>
}

function BlogCard({blog, openBlank, style, className}: { blog: Blog, openBlank: boolean, style?: object, className?: string }) {
    const tags = useMemo(() => {
        const blogTags = Array.isArray(blog.tags) ? blog.tags : (blog.tags as string).split(',')
        return blogTags.map((tag: any,index:number) => {
            if (tag) {
                // return <Tag name={tag} key={`tag-${index}`}/>
                return <Link key={`tag-${index}`} passHref href={`/blog/search/p1?key=${encryptUrl(tag)}`}><a key={`tag-${index}`}
                                                                                         className='xl-blog-tag'>{tag}</a></Link>
            }
        })
    }, [blog.tags])
    return <article className={`xl-blog-card ${className||''}`} style={style} key={`index-blog-${blog.blogId}`}>
        {blog.coverImg&&
            <img className='xl-blog-cover-img' src={isNum(blog.coverImg)?`${process.env.NEXT_PUBLIC_BASE_FILE_URL}${blog.coverImg}`:blog.coverImg}/>
        }
        <div className='xl-blog-info'>
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
                {/*<span><Icon className='view'/>{blog.viewCount}</span>*/}
                {/*<span><Icon className='heart'/>{blog.likeCount}</span>*/}
                {/*<span><Icon className='comment'/>{blog.commentCount}</span>*/}
                {blog.category && <span className='xl-blog-card-category'>分类：
                <Link passHref href={`/blog/search/p1?key=${encryptUrl(blog.category as string)}`}>
                <a >{blog.category}</a>
            </Link></span>}
                <span>{tags}</span>
            </footer>
        </div>
    </article>
}

export default BlogCard
