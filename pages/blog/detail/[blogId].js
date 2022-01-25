import Head from 'next/head'
import React, {useEffect} from "react";
import {getBlogById} from "../../../request/modules/blogRequest";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import {getDefaultLayout} from "../../../components/layouts/main";
import '../../../styles/pages/blog/blogDetail.scss'
import 'highlight.js/styles/xcode.css';
import Icon from "../../../components/Icon";

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
    useManagementFinished()
    useEffect(()=>{
        window.addEventListener("popstate", function(e) {
            alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        }, false);
    })
    return <div className='xl-blog-detail'>
        <Head>
            <title>博客详情</title>
            <meta name="description" content="博客详细内容"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <Icon className='back' onClick={() => {
            window.close()
        }}/>
        <h1 className='xl-blog-detail-title'>{blog.title}</h1>
        <div className='xl-blog-detail-content' dangerouslySetInnerHTML={{__html: blog.htmlText}}/>
    </div>
}


export default BlogDetail
