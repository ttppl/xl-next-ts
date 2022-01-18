import Head from 'next/head'
import React, {useRef, useState} from "react";
import {getManagementLayout} from "../../../components/layouts/managementLayout";
import useManagementFinished from "../../../hooks/useManagementPageFinished";
import {Table, Popconfirm, Form, Button, Space} from 'antd';
import {getCookieParser} from "next/dist/server/api-utils";
import {addTag, deleteTag, getTags, modifyTag} from "../../../request/modules/selectOptions";
import {message} from "antd";
import {assignKey, findItem} from "../../../utils/antdUtil";
import AntdEditableCell from "../../../components/tables/AntdEditableCell";


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

tagList.layout = getManagementLayout


function tagList({tags, total, userId}) {
    useManagementFinished()
    const [form] = Form.useForm();
    const [data, setData] = useState(tags);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(total)
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            title: 'tagId',
            dataIndex: 'key',
            width: '8%',
            editable: false,
        },
        {
            title: 'tagName',
            dataIndex: 'tagName',
            width: '20%',
            editable: true,
        },
        {
            title: 'tagLevel',
            dataIndex: 'tagLevel',
            width: '8%',
            editable: true,
        },
        {
            title: 'userId',
            dataIndex: 'userId',
            width: '8%',
            editable: false,
        },
        {
            title: 'color',
            dataIndex: 'color',
            width: '15%',
            editable: true,
        },
        {
            title: 'type',
            dataIndex: 'type',
            width: '10%',
            editable: true,
        },
        {
            title: 'addTime',
            dataIndex: 'addTime',
            width: '20%',
            editable: false,
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
                        <Button onClick={() => cancel(record)}>取消</Button>
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

    const getTag = async (page, options) => {
        page = page || currentPage
        setCurrentPage(page)
        setLoading(true)
        try {
            const res = await getTags(userId, page, 10, options)
            setData(assignKey(res.data, 'tagId'))
        } catch (e) {
            message.error(e.toString())
        }
        setLoading(false)
    }
    const cancel = (record) => {
        if (!record.tagId) {
            const newData = [...data]
            newData.splice(newData.findIndex(d => d.key === record.key), 1)
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
            const item = findItem(newData, 'key', key)
            if (item) {
                if (item.tagId) {
                    const res = await modifyTag({
                        id: item.tagId,
                        level: row.tagLevel,
                        name: row.tagName,
                        type: row.type,
                        color: row.color
                    })
                    if (res.success) {
                        message.success(`修改成功！`)
                        Object.assign(item, row)
                    }
                } else {
                    const res = await addTag({
                        userId: userId, name: row.tagName,
                        type: row.type, level: row.tagLevel,
                        color: row.color, addTime: row.addTime
                    })
                    if (res.success) {
                        message.success(`添加成功！ID: ${res.data.insertId}`)
                        Object.assign(item, row, {tagId: res.data.insertId, key: res.data.insertId})
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
            const res = await deleteTag(record.tagId)
            if (res.success) {
                message.success(`删除成功！ID:${res.data.deleteId},共计${res.data.affectedRows}条数据`)
                const newData = [...data]
                newData.splice(newData.findIndex(t => t.key === record.key), 1)
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
            tagLevel: '9',
            categoryName: '',
            userId: userId,
            color: 'default',
            type: 'blog',
            addTime: new Date().toLocaleString()
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
                    onChange: getTag,
                }}
            />
        </Form>
    </>
}

export default tagList
