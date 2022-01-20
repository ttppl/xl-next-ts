import Head from 'next/head'
import {getManagementLayout} from "../../../components/layouts/managementLayout";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import {getCookieParser} from "next/dist/server/api-utils";
import {addCategory, deleteCategory, getCategoryTreeList, modifyCategory} from "../../../request/modules/selectOptions";
import {assignKey, showfailMessage, showSuccessMessage} from "../../../utils/antdUtil";
import EditableTable from "../../../components/tables/EditableTable";

export async function getServerSideProps({req, res, params}) {
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    try {
        const res = await getCategoryTreeList(userId)
        const categories = assignKey(res.data, 'categoryId')
        return {
            props: {
                categories,
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

CategoryTreeList.layout = getManagementLayout

function CategoryTreeList({categories, total, userId}) {
    useManagementFinished()
    const getMoreCategory = async (page, pageSize) => {
        try {
            const res = await getCategoryTreeList(userId, page, pageSize)
            return assignKey(res.data, 'categoryId')
        } catch (e) {
            showfailMessage(e.toString())
        }
    }
    const addDefaultCategory = {
        categoryLevel: '1',
        categoryName: '',
        userId: userId,
        parentId: '0',
        type: 'blog'
    }
    return <>
        <Head>
            <title>管理</title>
            <meta name="description" content="管理-目录树"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <EditableTable onGetMore={getMoreCategory}
                       onAddDefault={addDefaultCategory}
                       onDeleteItem={deleteCategoryItem}
                       onSave={saveCategoryModification}
                       columns={categoryColumns}
                       data={categories}
                       total={total}
        />
    </>
}
export const categoryColumns = [
    {
        title: 'categoryId',
        dataIndex: 'key',
        width: '20rem',
        editable: false,
    },
    {
        title: 'categoryName',
        dataIndex: 'categoryName',
        width: '15rem',
        editable: true,
        inputType: 'text'
    },
    {
        title: 'categoryLevel',
        dataIndex: 'categoryLevel',
        width: '10rem',
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
        title: 'parentId',
        dataIndex: 'parentId',
        width: '5rem',
        editable: true,
        inputType: 'number'
    },
    {
        title: 'type',
        dataIndex: 'type',
        width: '5rem',
        editable: true,
        inputType: 'text'
    }
];


export const deleteCategoryItem = async (record) => {
    try {
        const res = await deleteCategory(record.categoryId)
        if (res.success) {
            showSuccessMessage(`删除成功！ID:${res.data.deleteId},共计${res.data.affectedRows}条数据`)
            return true
        }
    } catch (e) {
        showfailMessage(e.toString())
        return false
    }

}
export const saveCategoryModification = async (editItem, formData) => {
    try {
        if (editItem.categoryId) {
            const res = await modifyCategory({
                id: editItem.categoryId,
                level: formData.categoryLevel,
                name: formData.categoryName,
                userId: formData.userId,
                parent: formData.parentId,
                type: formData.type
            })
            if (res.success) {
                showSuccessMessage(`修改成功！`)
                return true
            }
        } else {
            const res = await addCategory({
                level: formData.categoryLevel,
                name: formData.categoryName,
                userId: formData.userId,
                parent: formData.parentId,
                type: formData.type
            })
            if (res.success) {
                showSuccessMessage(`添加成功！ID: ${res.data.insertId}`)
                return {categoryId: res.data.insertId, key: res.data.insertId}
            }
        }
    } catch (errInfo) {
        showfailMessage(errInfo.toString())
        return false
    }
}
export default CategoryTreeList
