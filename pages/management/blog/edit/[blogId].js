import Head from 'next/head'
import React, {useContext, useEffect, useState} from "react";
import 'highlight.js/styles/xcode.css';
import {getManagementLayout, ManagementLayoutContext} from "../../../../components/layouts/managementLayout";
import {getInitialTagAndCategory} from "../../../../request/modules/selectOptions";
import {getCookieParser} from "next/dist/server/api-utils";
import {BlogEdit} from "../../../../components/BlogEdit";
import {getBlogById} from "../../../../request/modules/blogRequest";
import useManagementFinished from "../../../../hooks/useManagementPageFinished";

EditBlog.layout = getManagementLayout


export async function getServerSideProps({req, res,params}) {
    const blogId = params.blogId
    const blog = await getBlogById(blogId)
    blog.category = blog.category.map(c=>c.categoryName)
    blog.tags = blog.tags.map(t=>t.tagName)
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
        // const id = await addBlog(formData)
        // if (id) {
        //     message.success('添加成功！')
        // }
        // form.setFieldsValue({blogId: id})
        // // setFormDefaultData({...formDefaultData, blogId: id})
    }
    return <>
        <Head>
            <title>管理</title>
            <meta name="description" content="管理-添加博客"/>
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
