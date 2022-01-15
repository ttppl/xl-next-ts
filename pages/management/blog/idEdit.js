import Head from 'next/head'
import React from "react";
import 'highlight.js/styles/xcode.css';
import {getCookieParser} from "next/dist/server/api-utils";
import {BlogEdit} from "/components/BlogEdit";
import {getManagementLayout} from "/components/layouts/managementLayout";
import {getInitialTagAndCategory} from "/request/modules/selectOptions";
import {modifyBlog} from "../../../request/modules/blogRequest";
import {message} from "antd";

IdEdit.layout = getManagementLayout


export async function getServerSideProps({req, res,params}) {
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    const {tags, categories} = await getInitialTagAndCategory(userId)
    return {
        props: {
            categories,
            tags
        }
    }
}

function IdEdit(props) {
    const submit = async (formData, form) => {
        try {
            const id = await modifyBlog(formData)
            message.success(`修改成功！id:${id}`)
        }catch (e) {
            message.error(e)
        }
    }
    return <>
        <Head>
            <title>管理</title>
            <meta name="description" content="管理-添加博客"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <BlogEdit tags={props.tags}
                  type='editSearch'
                  categories={props.categories}
                  // formData={props.blog}
                  onSubmit={submit}
        />
    </>
}


export default IdEdit
