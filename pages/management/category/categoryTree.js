import Head from 'next/head'
import React, {useRef, useState} from "react";
import {getManagementLayout} from "../../../components/layouts/managementLayout";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import {Table, Popconfirm, Form, Button, Space} from 'antd';
import {getCookieParser} from "next/dist/server/api-utils";
import {addCategory, deleteCategory, getCategoryTreeList, modifyCategory} from "../../../request/modules/selectOptions";
import {message} from "antd";
import lodash from 'lodash'
import {assignKey, findItem} from "../../../utils/antdUtil";
import AntdEditableCell from "../../../components/tables/AntdEditableCell";

function findParent(data, key) {
    for (const d of data) {
        if (d.key === key) {
            return data
        } else if (d.children) {
            const found = findParent(d.children, key)
            if (found) return found
        }
    }
    return null
}

export async function getServerSideProps({req, res, params}) {
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    try {
        const res = await getCategoryTreeList(userId)
        const categories = assignKey(res.data,'categoryId')
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

function CategoryList({categories, total,userId}) {
    useManagementFinished()
    const [form] = Form.useForm();
    const [data, setData] = useState(categories);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(total)
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            title: 'categoryId',
            dataIndex: 'key',
            width: '25%',
            editable: false,
        },
        {
            title: 'categoryName',
            dataIndex: 'categoryName',
            width: '20%',
            editable: true,
        },
        {
            title: 'categoryLevel',
            dataIndex: 'categoryLevel',
            width: '10%',
            editable: true,
        },
        {
            title: 'userId',
            dataIndex: 'userId',
            width: '8%',
            editable: false,
        },
        {
            title: 'parentId',
            dataIndex: 'parentId',
            width: '10%',
            editable: true,
        },
        {
            title: 'type',
            dataIndex: 'type',
            width: '10%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button onClick={() => save(record.key)}>保存</Button>
                        <Button onClick={()=>cancel(record)}>取消</Button>
                    </Space>
                ) : (
                    <Space>
                        <Button disabled={editingKey !== ''} onClick={() => edit(record)}>编辑</Button>
                        <Popconfirm title="确认删除?"
                                    disabled={editingKey !== ''}
                                    onConfirm={() => deleteItem(record)}
                                    onCancel={cancel}>
                            <Button danger disabled={editingKey !== ''}>删除</Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: ['categoryLevel', 'userId', 'parentId'].includes(col.dataIndex) ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const getCategory = async (page) => {
        setCurrentPage(page)
        setLoading(true)
        try {
            const res = await getCategoryTreeList(userId, page)
            setData(assignKey(res.data,'categoryId'))
        } catch (e) {
            message.error(e.toString())
        }
        setLoading(false)
    }
    const cancel = (record) => {
        if(!record.categoryId){
            const newData = [...data]
            newData.splice(newData.findIndex(d=>d.key===record.key),1)
            setData(newData)
        }
        setEditingKey('');
    };
    const edit = (record) => {
        form.setFieldsValue({
            categoryLevel: '',
            categoryName: '',
            userId: '',
            parentId: '',
            type: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const save = async (key) => {
        setLoading(true)
        try {
            const row = await form.validateFields();//输入的数据
            const newData = [...data];
            const item = findItem(newData, 'key',key)
            if (item) {
                // console.log(item, row)
                if (item.categoryId) {
                    const res = await modifyCategory({
                        id: item.categoryId,
                        level: row.categoryLevel,
                        name: row.categoryName,
                        userId: row.userId,
                        parent: row.parentId,
                        type: row.type
                    })
                    if (res.success) {
                        message.success(`修改成功！`)
                        Object.assign(item, row)
                    }
                } else {
                    const res = await addCategory({
                        level: row.categoryLevel,
                        name: row.categoryName,
                        userId: row.userId,
                        parent: row.parentId,
                        type: row.type
                    })
                    if (res.success) {
                        message.success(`添加成功！ID: ${res.data.insertId}`)
                        Object.assign(item, row, {categoryId: res.data.insertId, key: res.data.insertId})
                    }
                }
                setData(newData)
            } else {
                newData.unshift(row);
                setData(newData);
            }
        } catch (errInfo) {
            message.error(errInfo.toString())
        }
        setEditingKey('');
        setLoading(false)
    }
    const deleteItem = async (record) => {
        setLoading(true)
        try {
            const res = await deleteCategory(record.categoryId)
            if (res.success) {
                message.success(`删除成功！ID:${res.data.deleteId},共计${res.data.affectedRows}条数据`)
                const newData = lodash.cloneDeep(data)
                const parent = findParent(newData, record.key)
                parent.splice(parent.findIndex(t => t.key === record.key), 1)
                setData(newData)
            }
        } catch (e) {
            message.error(e.toString())
        }
        setLoading(false)

    }

    const addIndex = useRef(0)
    const addItem = () => {
        const newData = {
            key: `new${addIndex.current}`,
            categoryLevel: '1',
            categoryName: '',
            userId: userId,
            parentId: '0',
            type: 'blog'
        };
        form.setFieldsValue({
            ...newData,
        });
        setTotalCount(totalCount + 1)
        setData([newData, ...data])
        setEditingKey(`new${addIndex.current}`)
        addIndex.current++
    }

    return <>
        <Head>
            <title>管理</title>
            <meta name="description" content="管理-添加博客"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <div>
            <Button
                onClick={addItem}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                添加
            </Button>

        </div>
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: AntdEditableCell,
                    },
                }}
                bordered
                loading={loading}
                indentSize={40}
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                rowSelection={{checkStrictly: false}}
                scroll={{y: '60vh', x: 'max-content', scrollToFirstRowOnChange: true}}
                pagination={{
                    current: currentPage,
                    pageSize: 10,
                    // onShowSizeChange:()=>{},
                    total: totalCount,
                    onChange: getCategory,
                }}
            />
        </Form>
    </>
}



export default CategoryList
