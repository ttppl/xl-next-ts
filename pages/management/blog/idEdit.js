import Head from 'next/head'
import React from "react";
import 'highlight.js/styles/xcode.css';
import {getCookieParser} from "next/dist/server/api-utils";
import {BlogEdit} from "/components/BlogEdit";
import {getManagementLayout} from "/components/layouts/managementLayout";
import {getInitialTagAndCategory} from "/request/modules/selectOptions";
import {modifyBlog} from "../../../request/modules/blogRequest";
import {message} from "antd";
import {showfailMessage, showSuccessMessage} from "../../../utils/antdUtil";

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
            const res = await modifyBlog(formData)
            showSuccessMessage(`修改成功！id:${res.data.blogId}`)
        }catch (e) {
            showfailMessage(e)
        }
    }
    return <>
        <Head>
            <title>编辑博客</title>
            <meta name="description" content="管理-根据ID修改博客"/>
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
