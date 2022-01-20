import Head from 'next/head'
import {getManagementLayout} from "../../../components/layouts/managementLayout";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import {getCookieParser} from "next/dist/server/api-utils";
import {getCategoryList} from "../../../request/modules/selectOptions";
import {assignKey, showfailMessage} from "../../../utils/antdUtil";
import EditableTable from "../../../components/tables/EditableTable";
import {categoryColumns, deleteCategoryItem, saveCategoryModification} from "./categoryTree";

export async function getServerSideProps({req, res, params}) {
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    try {
        const res = await getCategoryList(userId)
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

CategoryList.layout = getManagementLayout

function CategoryList({categories, total, userId}) {
    const {setLoading} = useManagementFinished()
    const getMoreCategory = async (page, pageSize) => {
        try {
            const res = await getCategoryList(userId, page, pageSize)
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
            <meta name="description" content="管理-目录列表"/>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
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

export default CategoryList
