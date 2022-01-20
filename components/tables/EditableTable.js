import useManagementFinished from "../../hooks/useManagementPageFinished";
import {Button, Form, Popconfirm, Space, Table} from "antd";
import React, {useMemo, useRef, useState} from "react";
import {findItem, showfailMessage} from "../../utils/antdUtil";
import lodash from "lodash";
import AntdEditableCell from "./AntdEditableCell";
import PropTypes from 'prop-types'
import {isFunction, isObject} from "../../utils/check";

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

EditableTable.propTypes = {
    onAddDefault: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),//fun||obj
    onDeleteItem: PropTypes.func,//fun(record)=>isSuccess:boolean
    onGetMore: PropTypes.func,//fun(page,pageSize)=>newData:array
    onSave: PropTypes.func,//fun(editItem,formData)=>isSuccess:boolean|additionData:object
    onEdit: PropTypes.func,//fun(record)
    pageSize: PropTypes.number,
    columns: PropTypes.array,
    data: PropTypes.array,
    total: PropTypes.number,
}

EditableTable.defaultProps = {
    columns: [],
    pageSize: 10
}


function EditableTable(props) {
    useManagementFinished()
    const [form] = Form.useForm();
    const [data, setData] = useState(props.data);
    const [editingKey, setEditingKey] = useState('');
    const editingType = useRef('edit')

    const isEditing = (record) => record.key === editingKey;
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(props.total)
    const [loading, setLoading] = useState(false)

    const columns = useMemo(() => {
        const cols = [...props.columns]
        const operation = cols.find(column => column.title === 'operation')
        if(operation) {
            cols.splice(cols.findIndex(column => column.title === 'operation'),1)
        }
        const baseOperation = {
            title: 'operation',
            // dataIndex: 'operation',
            fixed: operation?.fixed || 'right',
            width: operation?.width || '11rem',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button onClick={() => save(record.key)}>保存</Button>
                        <Button onClick={() => cancel(record)}>取消</Button>
                    </Space>
                ) : (
                    operation?.operation?operation?.operation?.():
                    <Space>
                        <Button disabled={editingKey !== ''} onClick={() => edit(record)}>编辑</Button>
                        <Popconfirm title="确认删除?"
                                    disabled={editingKey !== ''}
                                    onConfirm={() => deleteItem(record)}
                                    onCancel={cancel}>
                            <Button danger disabled={editingKey !== ''}>删除</Button>
                        </Popconfirm>
                        {operation?.operationAppend?.(_,record,editingKey !== '')}
                    </Space>
                );
            },
        }
        cols.push(baseOperation)
        return cols
    })
    const mergedColumns = columns.map((col) => {
        // if (!col.editable) {
        //     return col;
        // }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.inputType || 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editable:col.editable,
                editing: isEditing(record),
                ellipsis:col.ellipsis
            }),
        };
    });

    const getMore = async (page) => {
        setCurrentPage(page)
        setLoading(true)
        try {
            // const res = await getCategoryTreeList(userId, page)
            // setData(assignKey(res.data,'categoryId'))
            const newData = isFunction(props.onGetMore) ? (await props.onGetMore(page, props.pageSize)) : []
            setData(newData || [])
        } catch (e) {
            showfailMessage(e.toString())
        }
        setLoading(false)
    }
    const cancel = (record) => {
        if (editingType.current === 'add') {
            const newData = [...data]
            newData.splice(newData.findIndex(d => d.key === record.key), 1)
            setData(newData)
        }
        setEditingKey('');
    };
    const edit = async (record) => {

        if (isFunction(props.onEdit)) {
            setLoading(true)
            record = await props.onEdit(record)
            setLoading(false)
        }
        // console.log(record)
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
        editingType.current = 'edit'
    };

    const save = async (key) => {
        setLoading(true)
        try {
            const formData = await form.validateFields();//输入的数据
            const newData = [...data];
            const item = findItem(newData, 'key', key)
            if (item) {
                if (isFunction(props.onSave)) {
                    const additionData = await props.onSave(item, formData)
                    if (additionData !== false) {
                        Object.assign(item, formData, isObject(additionData) ? additionData : {})
                    }
                }
                setData(newData)
            } else {
                newData.unshift(formData);
                setData(newData);
            }
        } catch (errInfo) {
            showfailMessage(errInfo.toString())
        }
        setEditingKey('');
        editingType.current = ''
        setLoading(false)
    }
    const deleteItem = async (record) => {
        setLoading(true)
        try {
            // const res = await deleteCategory(record.categoryId)
            const isSuccess = isFunction(props.onDeleteItem) ? (await props.onDeleteItem(record)) : true
            if (isSuccess) {
                // showSuccessMessage(`删除成功！ID:${res.data.deleteId},共计${res.data.affectedRows}条数据`)
                const newData = lodash.cloneDeep(data)
                const parent = findParent(newData, record.key)
                parent.splice(parent.findIndex(t => t.key === record.key), 1)
                setData(newData)
            }
        } catch (e) {
            showfailMessage(e.toString())
        }
        setLoading(false)

    }

    const addIndex = useRef(0)
    const addItem = async () => {
        setLoading(true)
        const addDefault = isFunction(props.onAddDefault) ? (await props.onAddDefault()) : props.onAddDefault;
        const newData = {...addDefault, key: `new${addIndex.current}`}
        form.setFieldsValue({
            ...newData,
        });
        setTotalCount(totalCount + 1)
        setData([newData, ...data])
        setEditingKey(`new${addIndex.current}`)
        editingType.current = 'add'
        addIndex.current++
        setLoading(false)
    }

    return <>
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
                scroll={{x:'100%', scrollToFirstRowOnChange: true}}
                pagination={{
                    current: currentPage,
                    pageSize: props.pageSize,
                    // onShowSizeChange:()=>{},
                    total: totalCount,
                    onChange: getMore,
                }}
            />
        </Form>
    </>
}

export default EditableTable
