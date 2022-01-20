import Head from 'next/head'
import '/styles/Home.css'
import {getDefaultLayout} from "../components/layouts/main";
import {NextPageWithLayout} from "./_app";
import {Blog, getBlogsByType} from "../request/modules/blogRequest";
import {useState} from "react";
const  BlogCard =require('/components/BlogCard')

export async function getServerSideProps(context: any) {
    const res = await getBlogsByType()
    return {
        props: {
            blogs: res.data
        }
    }
}

const Home: NextPageWithLayout = ({blogs}: any) => {
    const page = useState(1)
    return (
        <div className='container'>
            <Head>
                <title>吞天泡泡龙的主页</title>
                <meta name="description" content="吞天泡泡龙的主页"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/my_favicon.ico"/>
            </Head>

            <main className='main'>
                {blogs.map((blog:Blog)=>{
                    return <BlogCard key={blog.blogId} blog={blog}/>
                })}
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
