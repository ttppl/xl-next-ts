import {Form, Input, InputNumber, Switch} from "antd";
import React from "react";

const InputNodes = {
    text: <Input/>,
    number: <InputNumber/>,
    switch: <Switch/>
}

const AntdEditableCell = ({
                              editing,
                              editable,
                              dataIndex,
                              title,
                              inputType,
                              record,
                              index,
                              children,
                              ellipsis,
                              ...restProps
                          }) => {
    const inputNode = InputNodes[inputType || 'text'] || <Input/>;
    return (
        <td {...restProps} title={ellipsis ? record[dataIndex] : null}>
            {editable&&editing ? (
                <Form.Item
                    name={dataIndex}
                    valuePropName={inputType==='switch'?'checked':'value'}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
}

export default AntdEditableCell
