import Head from 'next/head'

import React, {useContext, useEffect, useState} from "react";
import 'highlight.js/styles/xcode.css';
import {getManagementLayout, ManagementLayoutContext} from "../../../components/layouts/managementLayout";
import {getInitialTagAndCategory} from "../../../request/modules/selectOptions";
import {getCookieParser} from "next/dist/server/api-utils";
import {BlogEdit} from "../../../components/BlogEdit";
import {message} from "antd";
import {addBlog, modifyBlog} from "../../../request/modules/blogRequest";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import {showfailMessage, showSuccessMessage} from "../../../utils/antdUtil";

AddBlog.layout = getManagementLayout


export async function getServerSideProps({req, res}) {
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    const {tags, categories} = await getInitialTagAndCategory(userId)
    return {
        props: {
            categories,
            tags
        }
    }
}

function AddBlog(props) {
    useManagementFinished()
    const [formDefaultData, setFormDefaultData] = useState({
        type: 'article',
        isPublish: true,
        isDelete: false,
        isTop: false
    })
    const submit = async (formData, form) => {
        try {
            if(!formData.blogId){
                const id = await addBlog(formData)
                showSuccessMessage('添加成功！')
                form.setFieldsValue({blogId: id})
            }else {
                const id = await modifyBlog(formData)
                showSuccessMessage('修改成功！')
            }
        }catch (e) {
            showfailMessage(e)
        }
        // setFormDefaultData({...formDefaultData, blogId: id})
    }
    return <>
        <Head>
            <title>新建博客</title>
            <meta name="description" content="管理-添加博客"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <BlogEdit tags={props.tags}
                  type='add'
                  categories={props.categories}
                  formData={formDefaultData}
                  onSubmit={submit}
        />
    </>
}


export default AddBlog
