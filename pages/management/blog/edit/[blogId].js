import Head from 'next/head'
import React, {useContext, useEffect, useState} from "react";
import 'highlight.js/styles/xcode.css';
import {getManagementLayout, ManagementLayoutContext} from "../../../../components/layouts/managementLayout";
import {getInitialTagAndCategory} from "../../../../request/modules/selectOptions";
import {getCookieParser} from "next/dist/server/api-utils";
import {BlogEdit} from "../../../../components/BlogEdit";
import {getBlogById, modifyBlog} from "../../../../request/modules/blogRequest";
import useManagementFinished from "../../../../hooks/useManagementPageFinished";
import {message} from "antd";
import {showfailMessage, showSuccessMessage} from "../../../../utils/antdUtil";

EditBlog.layout = getManagementLayout


export async function getServerSideProps({req, res, params}) {
    const blogId = params.blogId
    const blog = await getBlogById(blogId)
    // blog.category = blog.category?.map?.(c=>c.categoryName)
    // blog.tags = blog.tags?.map?.(t=>t.tagName)
    blog.category = Array.isArray(blog.category) ? blog.category.map(c => c.categoryId) : []

    blog.tags = Array.isArray(blog.tags) ? blog.tags.map(t => (({
        value: t.tagId,
        label: t.tagName
    }))) : []
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    const {tags, categories} = await getInitialTagAndCategory(userId)
    return {
        props: {
            categories,
            tags,
            blog
        }
    }
}

function EditBlog(props) {
    useManagementFinished()
    const submit = async (formData, form) => {
        try {
            const id = await modifyBlog(formData)
            showSuccessMessage(`修改成功！id:${id}`)
        } catch (e) {
            showfailMessage(e)
        }
    }
    return <>
        <Head>
            <title>编辑博客</title>
            <meta name="description" content="管理-修改博客"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <BlogEdit tags={props.tags}
                  type='edit'
                  categories={props.categories}
                  formData={props.blog}
                  onSubmit={submit}
        />
    </>
}


export default EditBlog
