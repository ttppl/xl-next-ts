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
    const pageSize = 10
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
    return (
        <>
            <Head>
                <title>吞天泡泡龙的主页</title>
                <meta name="description" content="吞天泡泡龙的主页"/>
                <link rel="icon" href="/my_favicon.ico"/>
            </Head>
            {/*冰墩墩*/}
            {/*<Bingdundun className='xl-bing-dun-dun'/>*/}
            <main className='index-main'>
                {props.blogs.map((blog: Blog, index: number) => {
                    return <BlogCard className={`blog-card-index-${index}`} key={blog.blogId} openBlank={false} blog={blog}/>
                })}
                <XlPagination
                    defaultPageSize={props.pageSize}
                    defaultCurrent={props.page}
                    pageUrl={(page: number) => {
                        return `/p${page}`
                    }}
                    total={props.total}
                />
            </main>
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

Index.layout = getDefaultLayout

export default Index
