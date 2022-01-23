import Head from 'next/head'
import '/styles/Home.css'
import {getDefaultLayout} from "../components/layouts/main";
import {NextPageWithLayout} from "./_app";
import {Blog, getBlogsByType} from "../request/modules/blogRequest";
import React, {useEffect, useRef, useState} from "react";
import Loading from '../components/Loading'
import BlogCard from "../components/BlogCard";
import {addListener, removeListenerRS} from "../utils/libs/EventManager";
import lodash from 'lodash'
import {sleep} from "../utils";

export async function getServerSideProps(context: any) {
    const res = await getBlogsByType()
    return {
        props: {
            blogs: res.data
        }
    }
}

const Home: NextPageWithLayout = (props: any) => {
    const [blogs, setBlogs] = useState(props.blogs)
    const page = useRef(1)
    const [loadingMore, setLoadingMore] = useState(true)
    const [noMore, setNoMore] = useState(false)
    useEffect(() => {
        const getMore = lodash.debounce(async () => {
            const scrollHeight = document.body.scrollHeight
            const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
            const clientHeight = document.body.clientHeight
            if (scrollHeight - scrollTop < (clientHeight + 1)) {
                console.log('loading more blogs')
                removeListenerRS(scrollEvent)
                setLoadingMore(true)
                page.current++
                setLoadingMore(true)
                const res = await getBlogsByType('newest', page.current)
                if (res.data.length < 1) {
                    setNoMore(true)
                    removeListenerRS(scrollEvent)
                } else {
                    setBlogs([...blogs, ...res.data])
                }
                setLoadingMore(false)
            }
        }, 500)
        const scrollEvent = addListener(document as unknown as HTMLElement, 'scroll', getMore)
        return () => {
            removeListenerRS(scrollEvent)
        }
    }, [blogs])
    return (
        <div className='container'>
            <Head>
                <title>吞天泡泡龙的主页</title>
                <meta name="description" content="吞天泡泡龙的主页"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/my_favicon.ico"/>
            </Head>
            <main className='main'>
                {blogs.map((blog: Blog) => {
                    return <BlogCard key={blog.blogId} blog={blog}/>
                })}
                {loadingMore && <Loading>玩命加载中...</Loading>}
                {noMore && <p>木有了呢...</p>}
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
        </div>
    )
}

Home.layout = getDefaultLayout

export default Home
