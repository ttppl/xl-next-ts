import Head from 'next/head'
import {getManagementLayout} from "../../../components/layouts/managementLayout";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import {getCookieParser} from "next/dist/server/api-utils";
import {addTag, deleteTag, getTags, modifyTag} from "../../../request/modules/selectOptions";
import {assignKey, showfailMessage, showSuccessMessage} from "../../../utils/antdUtil";
import EditableTable from "../../../components/tables/EditableTable";
import {getBlogs} from "../../../request/modules/blogRequest";
import {useRouter} from "next/router";


export async function getServerSideProps({req, res, params}) {
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    try {
        const res = await getBlogs(userId)
        return {
            props: {
                blogs:assignKey(res.data,'blogId'),
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
    useManagementFinished()
    const router = useRouter()
    const columns = [
        {
            title: 'blogId',
            dataIndex: 'key',
            width: '8%',
            editable: false,
        },
        {
            title: 'title',
            dataIndex: 'title',
            width: '20%',
            editable: false,
            ellipsis: true,
        },
        {
            title: 'mdText',
            dataIndex: 'mdText',
            width: '200',
            editable: true,
            inputType: 'number',
            ellipsis: false,
        },
        {
            title: 'userId',
            dataIndex: 'userId',
            width: '8%',
            editable: false,
        },
        {
            title: 'category',
            dataIndex: 'category',
            width: '15%',
            editable: false,
        },
        {
            title: 'tags',
            dataIndex: 'tags',
            width: '10%',
            editable: false,
        },
        {
            title: 'publishTime',
            dataIndex: 'publishTime',
            width: '20%',
            editable: false,
        }
    ]

    const getBlog = async (page, pageSize) => {
        try {
            const res = await getBlogs(userId, {page, pageSize})
            return assignKey(res.data,'blogId')
        } catch (e) {
            showfailMessage(e.toString())
        }
    }
    const deleteItem = async (record) => {
        try {
            const res = await deleteTag(record.tagId)
            if (res.success) {
                showSuccessMessage(`删除成功！ID:${res.data.deleteId},共计${res.data.affectedRows}条数据`)
                return true
            }
        } catch (e) {
            showfailMessage(e.toString())
            return false
        }

    }

    const addDefault = async ()=>{
        await router.push('/management/blog/add')
    }

    const onEdit = async (record)=>{
        await router.push(`/management/blog/edit/${record.blogId}`)
    }

    return <>
        <Head>
            <title>管理</title>
            <meta name="description" content="管理-添加博客"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <EditableTable onGetMore={getBlog}
                       onAddDefault={addDefault}
                       onDeleteItem={deleteItem}
                       onEdit={onEdit}
                       columns={columns}
                       data={blogs}
                       total={total}
        />
    </>
}

export default BlogList
