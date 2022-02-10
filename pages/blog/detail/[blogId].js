import Head from 'next/head'
import React from "react";
import {getBlogById} from "../../../request/modules/blogRequest";
import {getDefaultLayout} from "../../../components/layouts/main";
import '../../../styles/pages/blog/blogDetail.scss'
import 'highlight.js/styles/xcode.css';
import Icon from "../../../components/Icon";
import useRunnableScript from "../../../hooks/useRunnableScript";
import {useRouter} from "next/router";

BlogDetail.layout = getDefaultLayout


export async function getServerSideProps({req, res, params}) {
    const blogId = params.blogId
    const blog = await getBlogById(blogId)
    return {
        props: {
            blog
        }
    }
}

function BlogDetail({blog}) {
    useRunnableScript()
    // useEffect(()=>{
    //     window.addEventListener("popstate", function(e) {
    //         alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
    //     }, false);
    // })
    const router = useRouter()
    const back = () => {
        // window.history.go(-1)
        router.back()
    }
    return <div className='xl-blog-detail'>
        <Head>
            <title>博客详情</title>
            <meta name="description" content="博客详细内容"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <Icon className='back' onClick={back}/>
        <h1 className='xl-blog-detail-title'>{blog.title}</h1>
        <div className='xl-blog-detail-content' dangerouslySetInnerHTML={{__html: blog.htmlText}}/>
    </div>
}


export default BlogDetail
