import Head from 'next/head'
import '/styles/pages/Home.scss'
import {getDefaultLayout} from "../components/layouts/main";
import {NextPageWithLayout} from "./_app";
import {Blog, getBlogsByType} from "../request/modules/blogRequest";
import React, {useEffect} from "react";
import BlogCard from "../components/BlogCard";
import useGlobalLoading from "../hooks/useGlobalLoading";
import Pagination from 'rc-pagination';
import {useRouter} from "next/router";
import setGlobalLoading from "../utils/libs/setGlobalLoading";
import usePagination from "../hooks/usePagination";
import XlPagination from "../components/XlPagination";

export async function getServerSideProps(context: any) {
    const pageSize = 10
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

const Home: NextPageWithLayout = (props: any) => {
    useGlobalLoading(false)
    const [routerChange, IndexPaginationItem] = usePagination((page: number) => {
        return `/p${page}`
    })
    return (
        <>
            <Head>
                <title>吞天泡泡龙的主页</title>
                <meta name="description" content="吞天泡泡龙的主页"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/my_favicon.ico"/>
            </Head>
            <main className='main' id="main">
                {props.blogs.map((blog: Blog, index: number) => {
                    return <BlogCard className={`index-blog-${index}`} key={blog.blogId} openBlank={false} blog={blog}/>
                })}
                <XlPagination
                    defaultPageSize={props.pageSize}
                    defaultCurrent={props.page}
                    onChange={routerChange}
                    itemRender={IndexPaginationItem}
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

Home.layout = getDefaultLayout

export default Home
