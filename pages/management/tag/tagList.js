import Head from 'next/head'
import {getManagementLayout} from "../../../components/layouts/managementLayout";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import {getCookieParser} from "next/dist/server/api-utils";
import {addTag, deleteTag, getTags, modifyTag} from "../../../request/modules/selectOptions";
import {assignKey, showfailMessage, showSuccessMessage} from "../../../utils/antdUtil";
import EditableTable from "../../../components/tables/EditableTable";


export async function getServerSideProps({req, res, params}) {
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    try {
        const res = await getTags(userId, 1, 10)
        const tags = assignKey(res.data, 'tagId')
        return {
            props: {
                tags,
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

TagList.layout = getManagementLayout


function TagList({tags, total, userId}) {
    useManagementFinished()
    const columns = [
        {
            title: 'tagId',
            dataIndex: 'key',
            width: '5rem',
            editable: false,
        },
        {
            title: 'tagName',
            dataIndex: 'tagName',
            width: '15rem',
            editable: true,
        },
        {
            title: 'tagLevel',
            dataIndex: 'tagLevel',
            width: '5rem',
            editable: true,
            inputType: 'number'
        },
        {
            title: 'userId',
            dataIndex: 'userId',
            width: '5rem',
            editable: false,
        },
        {
            title: 'color',
            dataIndex: 'color',
            width: '8rem',
            editable: true,
        },
        {
            title: 'type',
            dataIndex: 'type',
            width: '8rem',
            editable: true,
        },
        {
            title: 'addTime',
            dataIndex: 'addTime',
            width: '10rem',
            editable: false,
        }
    ]

    const getTag = async (page, pageSize) => {
        try {
            const res = await getTags(userId, page, pageSize)
            return assignKey(res.data, 'tagId')
        } catch (e) {
            showfailMessage(e.toString())
        }
    }

    const save = async (editItem, formData) => {
        try {
            if (editItem.tagId) {
                const res = await modifyTag({
                    id: editItem.tagId,
                    level: formData.tagLevel,
                    name: formData.tagName,
                    type: formData.type,
                    color: formData.color
                })
                if (res.success) {
                    showSuccessMessage(`修改成功！`)
                    return true
                }
            } else {
                const res = await addTag({
                    userId: userId, name: formData.tagName,
                    type: formData.type, level: formData.tagLevel,
                    color: formData.color, addTime: formData.addTime
                })
                if (res.success) {
                    showSuccessMessage(`添加成功！ID: ${res.data.insertId}`)
                    return {tagId: res.data.insertId, key: res.data.insertId}
                }
            }
        } catch (errInfo) {
            showfailMessage(errInfo.toString())
            return false
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

    const addDefault = {
        tagLevel: '9',
        categoryName: '',
        userId: userId,
        color: 'default',
        type: 'blog',
        addTime: new Date().toLocaleString()
    }

    return <>
        <Head>
            <title>管理</title>
            <meta name="description" content="管理-添加博客"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <EditableTable onGetMore={getTag}
                       onAddDefault={addDefault}
                       onDeleteItem={deleteItem}
                       onSave={save}
                       columns={columns}
                       data={tags}
                       total={total}
        />
    </>
}

export default TagList
