import Head from 'next/head'
import '../styles/pages/Index.scss'
import {getDefaultLayout} from "../components/layouts/main";
import {NextPageWithLayout} from "./_app";
import {Blog, getBlogsByType} from "../request/modules/blogRequest";
import React from "react";
import BlogCard from "../components/common/BlogCard";
import XlPagination from "../components/common/XlPagination";
import {NextPage} from "next";
// import Bingdundun from '../components/threejs/Bingdundun'

export async function getServerSideProps(context: any) {
    const pageSize = 20
    // 获取最新博客
    const res = await getBlogsByType('newest', 1, pageSize)
    return {
        props: {
            blogs: res.data,
            total: res.total,
            page: 1,
            pageSize
        }
    }
}

interface HomePageProps {
    blogs: Array<any>
    total: number,
    page: number,
    pageSize:number
}

// @ts-ignore
const Index: NextPageWithLayout = (props:HomePageProps) => {
    const columnCount = 4//列数量
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
                <div className='xl-index-blogs'>
                    {Array.from({length:columnCount}).map((i,columnIndex)=>{
                        return <div key={`index-blog-column-${columnIndex}`} className='xl-index-blogs-column'>
                            {props.blogs.map((blog: Blog, index: number) => {
                                if(index%columnCount===columnIndex) {
                                    return <IndexBlogCard key={blog.blogId} blog={blog}/>
                                }
                            })}
                        </div>
                    })}

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

function IndexBlogCard({blog}:{blog:Blog}){
    return <div className='xl-index-blog-card'>
        <img className='xl-blog-cover-img'
             src={blog.coverImg?`${process.env.NEXT_PUBLIC_BASE_FILE_URL}${blog.coverImg}`:process.env.NEXT_PUBLIC_DEFAULT_COVER_IMG_URL+'?t='+blog.blogId}
             alt='blogCoverImg'/>
        <div className='xl-blog-info'>
            <p>{blog.title}</p>
            <div className='xl-blog-abstract'>{blog.plainText}</div>
        </div>

    </div>
}

Index.layout = getDefaultLayout

export default Index
