import Head from 'next/head'
import {getManagementLayout} from "../../../components/layouts/managementLayout";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import {getCookieParser} from "next/dist/server/api-utils";
import {
    addCategory,
    addTag,
    deleteTag,
    getTags,
    modifyCategory,
    modifyTag
} from "../../../request/modules/selectOptions";
import {assignKey, formatSwitchValue, showfailMessage, showSuccessMessage} from "../../../utils/antdUtil";
import EditableTable from "../../../components/tables/EditableTable";
import {deleteBlog, getBlogs, modifyBlog} from "../../../request/modules/blogRequest";
import {useRouter} from "next/router";
import {Button, Popconfirm, Space, Table} from "antd";
import React, {useCallback} from "react";


export async function getServerSideProps({req, res, params}) {
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    try {
        const res = await getBlogs(userId)
        return {
            props: {
                blogs: assignKey(res.data, 'blogId'),
                total: res.total,
                userId
            }
        }
    } catch (e) {
        console.log(e)
    }
    return {
        props: {}
    }
}

BlogList.layout = getManagementLayout


function BlogList({blogs, total, userId}) {
    const layout = useManagementFinished()
    const router = useRouter()
    const columns = [
        {
            title: 'blogId',
            dataIndex: 'key',
            width: '6rem',
            editable: false,
        },
        {
            title: 'title',
            dataIndex: 'title',
            width: '20rem',
            editable: true,
            ellipsis: true,
        },
        {
            title: 'plainText',
            dataIndex: 'plainText',
            width: '12rem',
            editable: false,
            ellipsis: true,
        },
        {
            title: 'userId',
            dataIndex: 'userId',
            width: '6rem',
            editable: false,
        },
        {
            title: 'category',
            dataIndex: 'category',
            width: '8rem',
            editable: false,
        },
        {
            title: 'tags',
            dataIndex: 'tags',
            width: '8rem',
            editable: false,
        },
        {
            title: 'isPublish',
            dataIndex: 'isPublish',
            width: '5rem',
            inputType: 'switch',
            editable: true,
        },
        {
            title: 'isTop',
            dataIndex: 'isTop',
            width: '5rem',
            inputType: 'switch',
            editable: true,
        },
        {
            title: 'isDelete',
            dataIndex: 'isDelete',
            width: '5rem',
            inputType: 'switch',
            editable: true,
        },
        {
            title: 'viewCount',
            dataIndex: 'viewCount',
            width: '8rem',
            inputType: 'number',
            editable: true,
        },
        {
            title: 'likeCount',
            dataIndex: 'likeCount',
            width: '8rem',
            inputType: 'number',
            editable: true,
        },
        {
            title: 'commentCount',
            dataIndex: 'commentCount',
            width: '8rem',
            inputType: 'number',
            editable: true,
        },
        {
            title: 'publishTime',
            dataIndex: 'publishTime',
            width: '11rem',
            editable: false,
        },
        {
            title: 'operation',
            type: 'append',
            width: '16rem',
            operationAppend: (_, record, disabled) => {
                return <Button disabled={disabled} onClick={() => editBlog(record)}>文本编辑</Button>
            },
        }
    ]

    const addBlog = async () => {
        await router.push('/management/blog/add')
    }

    const editBlog = async (record) => {
        layout?.setLoading?.(true)
        await router.push(`/management/blog/edit/${record.blogId}`)
    }
    const editBlogAttr = async (record) => {
        const blog = {...record}
        formatSwitchValue(blog, 'isPublish', 'isTop', 'isDelete')
        return blog
    }
    const saveBlog = async (editItem, formData) => {
        try {
            if (editItem.blogId) {
                const res = await modifyBlog({
                    blogId: editItem.blogId,
                    title: formData.title,
                    isPublish: formData.isPublish,
                    isTop: formData.isTop,
                    isDelete: formData.isDelete,
                    viewCount: formData.viewCount,
                    likeCount: formData.likeCount,
                    commentCount: formData.commentCount
                })
                if (res.success) {
                    showSuccessMessage(`修改成功！`)
                    return {
                        isPublish: formData.isPublish ? 'Y' : 'N',
                        isDelete: formData.isDelete ? 'Y' : 'N',
                        isTop: formData.isTop ? 'Y' : 'N'
                    }
                }
            } else {
                // const res = await addCategory({
                //     level: formData.categoryLevel,
                //     name: formData.categoryName,
                //     userId: formData.userId,
                //     parent: formData.parentId,
                //     type: formData.type
                // })
                // if (res.success) {
                //     showSuccessMessage(`添加成功！ID: ${res.data.insertId}`)
                //     return {categoryId: res.data.insertId, key: res.data.insertId}
                // }
            }
        } catch (errInfo) {
            showfailMessage(errInfo.toString())
            return false
        }
    }
    const getBlog = useCallback(async (page, pageSize) => {
        try {
            const res = await getBlogs(userId, {page, pageSize})
            return assignKey(res.data, 'blogId')
        } catch (e) {
            showfailMessage(e.toString())
        }
    },[])
    return <>
        <Head>
            <title>管理</title>
            <meta name="description" content="管理-添加博客"/>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <EditableTable onGetMore={getBlog}
                       onAddDefault={addBlog}
                       onDeleteItem={deleteBlogItem}
                       onSave={saveBlog}
                       onEdit={editBlogAttr}
                       columns={columns}
                       data={blogs}
                       total={total}
        />
    </>
}

const deleteBlogItem = async (record) => {
    try {
        const res = await deleteBlog(record.blogId)
        if (res.success) {
            showSuccessMessage(`删除成功！ID:${res.data.deleteId},共计${res.data.affectedRows}条数据`)
            return true
        }
    } catch (e) {
        showfailMessage(e.toString())
        return false
    }

}

export default BlogList
