import Head from 'next/head'
import '../styles/pages/Index.scss'
import {getDefaultLayout} from "../components/layouts/main";
import {NextPageWithLayout} from "./_app";
import {Blog, getBlogsByType} from "../request/modules/blogRequest";
import React, {useEffect, useMemo, useRef} from "react";
import XlPagination from "../components/common/XlPagination";
import Link from "next/link";
import {encryptUrl} from "../utils/dom";
import {getBlogUser} from '../request/modules/userReq'
import {isNum, isNumber} from "../utils/check";
import Icon from "../components/common/Icon";

// import Bingdundun from '../components/threejs/Bingdundun'

export async function getServerSideProps(context: any) {
    const pageSize = 20
    // 获取最新博客
    const res = await getBlogsByType('newest', 1, pageSize)
    const userRes = await getBlogUser()
    const user:User = userRes.data||{}
    user.avatar = isNum(user.avatar)?`${process.env.NEXT_PUBLIC_BASE_FILE_URL}${user.avatar}`:user.avatar
    try{
        user.detailInfo = JSON.parse(user.detailInfo)
    }catch (e) {
       console.error(e)
    }
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
interface User {
    userId?:number,
    userName?:string,
    password?:string,
    avatar?:string,
    lastToken?:string,
    detailInfo?:any,
    modifyTimestamp?:string
}

interface HomePageProps {
    blogs: Array<any>
    user:User,
    total: number,
    page: number,
    pageSize: number
}

// @ts-ignore
const Index: NextPageWithLayout = ({blogs,user,...props}: HomePageProps) => {
    const columnCount = 3//列数量
    return (
        <>
            <Head>
                <title>吞天泡泡龙的主页</title>
                <meta name="description" content="吞天泡泡龙的主页"/>
                <link rel="icon" href="/my_favicon.ico"/>
            </Head>
            {/*冰墩墩*/}
            {/*<Bingdundun className='xl-bing-dun-dun'/>*/}
            {/*<img className='header' src={`${process.env.NEXT_PUBLIC_BASE_CLIENT_REQUEST_URL}/file/defaultCoverImg`}/>*/}
            <main className='index-main'>
                {/*<div className='xl-user-info'></div>*/}
                <div className='xl-user-info'>
                    <div className='xl-user-main'>
                        <img className='xl-user-avatar' src={user.avatar}/>
                        <p className='xl-user-nickname'>{user.detailInfo.nickname}</p>
                        <p className='xl-user-introduction'>{user.detailInfo.introduction}</p>
                        <div className='xl-user-contact'>
                            {user.detailInfo.contact.map((contactInfo:any)=><Icon key={contactInfo.name} size={30} className={contactInfo.name} title={contactInfo.value} />)}
                        </div>
                    </div>
                </div>
                <div className='xl-index-blogs'>
                    {Array.from({length: columnCount}).map((i, columnIndex) => {
                        return <div key={`index-blog-column-${columnIndex}`} className='xl-index-blogs-column'>
                            {blogs.map((blog: Blog, index: number) => {
                                if (index % columnCount === columnIndex) {
                                    return <IndexBlogCard key={blog.blogId} blog={blog}/>
                                }
                            })}
                        </div>
                    })}

                </div>
                <div className='xl-index-right-side'>
                    <div className='xl-rank-card xl-top'>
                        <p className='xl-rank-card-title'><span>这里应该有点什么</span></p>
                        <p>但是我还没想好</p>
                    </div>

                    <div className='xl-rank-card xl-tags'>
                        <p className='xl-rank-card-title'><span>它必须做点什么</span></p>
                        <p>辉煌一刻，谁都别拿一刻当永久</p>
                    </div>
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

function IndexBlogCard({blog}: { blog: Blog }) {
    const tags = useMemo(() => {
        const blogTags = Array.isArray(blog.tags) ? blog.tags : (blog.tags as string).split(',')
        return blogTags.map((tag: any, index: number) => {
            if (tag)
                return <Link key={`tag-${tag}`} passHref href={`/blog/search/p1?key=${encryptUrl(tag)}`}><a key={`tag-${index}`}
                                                                                         className='xl-blog-tag'>{tag}</a></Link>
        })
    }, [blog.tags])
    const container = useRef<HTMLDivElement>(null)
    const abstract = useRef<HTMLDivElement>(null)
    // useEffect(()=>{
    //     const el:HTMLElement = container.current as HTMLElement
    //     const containerHeight = el.clientHeight
    //     const padding = parseFloat(window.getComputedStyle(el).getPropertyValue('padding-bottom'))
    //     const lastChild = el.lastChild as HTMLElement
    //     const childMargin = parseFloat(window.getComputedStyle(lastChild).getPropertyValue('margin-bottom'))
    //     const restHeight:number = containerHeight-padding-lastChild.offsetTop -lastChild.clientHeight -childMargin
    //     if(restHeight>0){
    //         const abstEl = abstract.current as HTMLElement
    //         const style = window.getComputedStyle(abstEl)
    //         const lineHeight:number = parseFloat(style.getPropertyValue('line-height'))
    //         const line = parseFloat(style.getPropertyValue('-webkit-line-clamp'))
    //         // @ts-ignore
    //         abstEl.style['-webkit-line-clamp'] = line+Math.floor(restHeight/lineHeight)
    //     }
    // },[])
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
            {blog.category && <>分类：<Link passHref href={`/blog/search/p1?key=${encryptUrl(blog.category as string)}`}>
                <a>{blog.category}</a>
            </Link></>}
        </div>
        {tags.length>1&&<div className='xl-blog-tags'>{tags}</div>}
    </div>
}

Index.layout = getDefaultLayout

export default Index
