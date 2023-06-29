import Head from 'next/head'
import '../styles/pages/Index.scss'
import {getDefaultLayout} from "../components/layouts/main";
import {BlogType, getBlogsByType, TagType} from "../request/modules/blogRequest";
import React, {useMemo, useRef} from "react";
import XlPagination from "../components/common/XlPagination";
import Link from "next/link";
import {encryptUrl} from "../utils/dom";
import {getBlogUser, UserType} from '../request/modules/userRequest'
import {isNum} from "../utils/check";
import Icon from "../components/common/Icon";
import {getFileUrl} from "../utils";
import {GetServerSideProps} from "next";

export interface HomePageProps {
    blogs: Array<BlogType>
    user:UserType,
    total: number,
    page: number,
    pageSize: number
}

/** 获取数据 */
export const getServerSideProps:GetServerSideProps<HomePageProps> = async function() {
    const pageSize = 20
    /** 获取最新博客 */
    const res = await getBlogsByType('newest', 1, pageSize)
    const userRes = await getBlogUser()
    const user= userRes.data
    user.avatar = getFileUrl(user.avatar)
    return {
        props: {
            blogs: res.data,
            total: res.total,
            user,
            page: 1,
            pageSize
        }
    }
}

const Index = ({blogs,user,...props}: HomePageProps) => {
    const columnCount = 3//列数量
    return (
        <>
            <Head>
                <title>吞天泡泡龙的主页</title>
                <meta name="description" content="吞天泡泡龙的主页"/>
                <link rel="icon" href="/my_favicon.ico"/>
            </Head>
            <main className='index-main'>
                <div className='xl-user-info'>
                    <div className='xl-user-main'>
                        <img className='xl-user-avatar' alt='用户头像' src={user.avatar}/>
                        <p className='xl-user-nickname'>{user.detailInfo?.nickname}</p>
                        <p className='xl-user-introduction'>{user.detailInfo?.introduction}</p>
                        <div className='xl-user-contact'>
                            {user.detailInfo?.contact.map((contactInfo:any)=><Icon key={contactInfo.name} size={30} className={contactInfo.name} title={contactInfo.value} />)}
                        </div>
                    </div>
                </div>
                <div className='xl-index-blogs'>
                    {Array.from({length: columnCount}).map((i, columnIndex) => {
                        return <div key={`index-blog-column-${columnIndex}`} className='xl-index-blogs-column'>
                            {blogs.map((blog: BlogType, index: number) => {
                                if (index % columnCount === columnIndex) {
                                    return <IndexBlogCard key={blog.blogId} blog={blog}/>
                                }
                            })}
                        </div>
                    })}

                </div>
                <div className='xl-index-right-side'>
                    {user.detailInfo?.blogIndexRightSide?.map(item=><div key={item.title} className='xl-rank-card'>
                        <p className='xl-rank-card-title'><span>{item.title}</span></p>
                        <p>{item.content}</p>
                    </div>)}
                </div>
            </main>
            <XlPagination
                defaultPageSize={props.pageSize}
                defaultCurrent={props.page}
                pageUrl={(page: number) => {
                    return `/p${page}`
                }}
                total={props.total}
            />
            {/*<footer className={styles.footer}>*/}
            {/*  <a*/}
            {/*    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*  >*/}
            {/*    Powered by{' '}*/}
            {/*    <span className={styles.logo}>*/}
            {/*      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />*/}
            {/*    </span>*/}
            {/*  </a>*/}
            {/*</footer>*/}
        </>
    )
}

/** 主页博客卡片 */
function IndexBlogCard({blog}: { blog: BlogType }) {
    const tags = useMemo(() => {
        const blogTags:TagType[] = blog.tags||[]
        return blogTags.map((tag: any, index: number) => {
            if (tag)
                return <Link key={`tag-${tag.tagId}`} passHref href={`/blog/search/p1?key=${encryptUrl(tag.tagName)}`}>
                    <a key={`tag-${index}`} className='xl-blog-tag'>{tag.tagName}</a>
            </Link>
        })
    }, [blog.tags])
    const container = useRef<HTMLDivElement>(null)
    const abstract = useRef<HTMLDivElement>(null)
    return <div ref={container} className='xl-index-blog-card'>
        <Link href={`/blog/detail/${blog.blogId}`} passHref>
            <a className='xl-blog-info'>
                <p className='xl-blog-title'>{blog.title}</p>
                <p className='xl-blog-publish-time'>{new Date(blog.publishTime).toLocaleDateString()}</p>
                {blog.coverImg && <img className='xl-blog-cover-img'
                                       src={isNum(blog.coverImg) ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}${blog.coverImg}` : blog.coverImg}
                                       alt='blogCoverImg'/>}
                <div ref={abstract} className='xl-blog-abstract'>{blog.plainText}</div>
            </a>
        </Link>
        <div className='xl-blog-card-category'>
            {blog.category && <>分类：<Link passHref href={`/blog/search/p1?key=${encryptUrl(blog.category.map(category=>category.categoryId).join(','))}`}>
                <a>{blog.category.map(category=>category.categoryName).join('/')}</a>
            </Link></>}
        </div>
        {tags.length>1&&<div className='xl-blog-tags'>{tags}</div>}
    </div>
}

Index.layout = getDefaultLayout

export default Index
