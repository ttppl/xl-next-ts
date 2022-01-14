import Head from 'next/head'
import '/styles/pages/management/addBlog.scss'

import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import Icon from "../../../components/Icon";
import {getKeyCode, insertTextAtCursor, isCtrlKey, isShiftKey, KEY_CODE, off} from "../../../utils/dom";
import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css';
import {Cascader, Col, Form, Input, Row, Select, Tag, Spin, message, Button, Space, Checkbox, Switch} from "antd";
import {marked} from 'marked';
import {addListener, removeListenerRS} from "../../../utils/libs/EventManager";
import {getManagementLayout, ManagementLayoutContext} from "../../../components/layouts/managementLayout";
import {addBlogTags, getBlogCategory, getBlogTags} from "../../../request/modules/selectOptions";
import debounce from 'lodash/debounce';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {createCookie, parseCookie} from "../../../utils/libs/cookieParser";
import {getCookieParser} from "next/dist/server/api-utils";
import {on} from '/utils/dom'
import {addBlog} from "../../../request/modules/blogRequest";
import {isNumber} from "../../../utils/check";

AddBlog.layout = getManagementLayout

function formatTags(tags) {
    return tags?.map?.(tag => ({
        id: tag.tagId,
        label: tag.tagName,
        value: tag.tagId,
        color: tag.color
    })) || []
}

async function searchTag(name) {
    const tags = await getBlogTags(name)
    return formatTags(tags)
}

export async function getServerSideProps({req, res}) {
    const userId = getCookieParser(req.headers.cookie).user?.id || 1
    const categories = await getBlogCategory(userId)
    const tags = await getBlogTags()
    return {
        props: {
            categories,
            tags: formatTags(tags)
        }, // will be passed to the page component as props
    }
}

function AddBlog(props) {
    const layoutContext = useContext(ManagementLayoutContext)
    marked.setOptions({
        "baseUrl": null,
        "breaks": false,
        "extensions": null,
        "gfm": true,
        "headerIds": true,
        "headerPrefix": "",
        "langPrefix": "language-",
        "mangle": true,
        "pedantic": false,
        "sanitize": false,
        "sanitizer": null,
        "silent": false,
        "smartLists": false,
        "smartypants": false,
        "tokenizer": null,
        "walkTokens": null,
        "xhtml": false,
        highlight: function (code, lang, callback) {
            return hljs.highlight(lang, code).value;
        }
    })
    // // //其他自定义参考：https://marked.js.org/using_pro#tokenizer
    const addBr = () => {
        const inputDom = document.getElementById('md-input')
        const br = '<br/>\n'
        insertTextAtCursor(inputDom, br, true)
        parseMd(inputDom.value)
    }
    const preview = useRef(null)
    const parseMd = (e) => {
        // if(showPreview)
        preview.current.innerHTML = marked.parse(e.target?.value || e, {breaks: true})
    }

    useEffect(() => {
        const inputDom = document.getElementById('md-input')
        const keyDownListener = addListener(inputDom, 'keydown', (e) => {

            const keyCode = getKeyCode(e)
            const ctrlKey = isCtrlKey(e)
            const shiftKey = isShiftKey(e)
            if (ctrlKey && keyCode === KEY_CODE.enter) {
                e.preventDefault()
                addBr()
            }
            if (ctrlKey && keyCode === KEY_CODE.P) {
                e.preventDefault()
                toggleShowPreview()
            }
        })
        // let url = window.location.pathname;
        // // url = url.substring(url.lastIndexOf('/') + 1, url.length);
        // alert(url);
        layoutContext.setLoading(false)
        return () => {
            removeListenerRS(keyDownListener)
        }
    }, [])
    // 预览
    const [showPreview, setShowPreview] = useState(false)
    const pre = useRef(false)//快捷键获取state一直为初始值，所以定义中间变量ref
    const toggleShowPreview = () => {
        pre.current = !pre.current
        setShowPreview(!pre.current)
    }

    const inlineFormItemStyle = {
        display: 'inline-flex',
        marginRight: '20px'
    }
    const [form] = Form.useForm();
    const [formDefaultData, setFormDefaultData] = useState({
        type: 'article',
        isPublish: true,
        isDelete: false,
        isTop: false
    })
    const submit = async (formData) => {
        let categories = props.categories
        formData.category = formData.category?.map((id, index) => {
            const category = categories.find(c => c.id === id)
            categories = category.children
            return {
                id: category.id,
                name: category.label,
                level: index + 1
            }
        })
        formData.tags = formData.tags?.map(tag => {
            return {id: isNumber(tag.value) ? tag.value:'', name: tag.label}
        })
        formData.userId = parseCookie(document.cookie).user.userId
        formData.mdText&&(formData.htmlText = marked.parse(formData.mdText, {breaks: true}))
        console.log(formData, JSON.stringify(formData))
        const id = await addBlog(formData)
        if (id) {
            message.success('添加成功！')
        }
        form.setFieldsValue({blogId: id})
        setFormDefaultData({...formDefaultData, blogId: id})
    }
    return (
        <div>
            <Head>
                <title>管理</title>
                <meta name="description" content="管理-添加博客"/>
                <link rel="icon" href="/my_favicon.ico"/>
            </Head>

            <Form initialValues={formDefaultData}
                  labelCol={{style: {width: '80px', textAlign: 'left'}}}
                  size='large'
                  form={form}
                  onFinish={submit}
            >
                <Form.Item label='ID' name='blogId'>
                    <Input placeholder='唯一标识，自动生成' disabled/>
                </Form.Item>
                <Form.Item label='标题' name='title'>
                    <Input/>
                </Form.Item>

                <div className='xl-md-editor-menu-bar'>
                    <Icon className='br' title='换行：ctrl+enter' onClick={addBr}/>
                    <Icon className={showPreview ? 'view-off' : 'view'} title='预览：ctrl+P'
                          onClick={toggleShowPreview}/>
                </div>
                <Row justify={'space-between'}>
                    <Col flex={'1 0'}>
                        <Form.Item label={''} name='mdText'>
                            <Input.TextArea id='md-input'
                                            autoSize={{minRows: 20}}
                                            onChange={parseMd}
                            />
                        </Form.Item>
                    </Col>
                    <Col flex={1} span={12} style={{display: showPreview ? 'block' : 'none'}}>
                        <div className='xl-md-preview' ref={preview}/>
                    </Col>
                </Row>

                <Form.Item label='类型' name="type" style={inlineFormItemStyle}>
                    <Select style={{width: '120px'}} placeholder='类型'>
                        <Select.Option value="article">文章</Select.Option>
                        <Select.Option value="essay">随笔</Select.Option>
                        <Select.Option value="movement">动态</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='目录' name="category" style={inlineFormItemStyle}>
                    <Cascader options={props.categories} style={{width: '200px'}} changeOnSelect/>
                </Form.Item>
                <Form.Item label='标签' name="tags">
                    <TagSelect
                        mode="multiple"
                        placeholder="选择标签"
                        fetchOptions={searchTag}
                        tagRender={tagRender}
                        showSearch
                        options={props.tags}
                    />
                </Form.Item>
                <Space size={30}>
                    <Form.Item name='isPublish' label='是否发布'>
                        <Switch defaultChecked/>
                    </Form.Item>
                    <Form.Item name='isTop' label='是否置顶'>
                        <Switch/>
                    </Form.Item>
                    <Form.Item name='isDelete' label='是否删除'>
                        <Switch/>
                    </Form.Item>
                </Space>

                <Form.Item>
                    <Row justify='center'>
                        <Space>
                            <Button type="primary" htmlType="submit">submit</Button>
                            <Button onClick={() => {
                                form.resetFields();
                            }}>reset</Button>
                        </Space>
                    </Row>
                </Form.Item>

            </Form>

        </div>

    )
}

function tagRender(props) {
    const {label, value, closable, onClose} = props;
    const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            // color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{marginRight: 3}}
        >
            {label}
        </Tag>
    );
}


function TagSelect({fetchOptions, debounceTimeout = 800, ...props}) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState(props.options);
    const realOptions = useRef(props.options)
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            // if (!value) {
            //     setOptions(oldOptions.current);
            // }
            // const inputTag = {
            //     label: value,
            //     value
            // }
            // if (props.options?.find(tag => {
            //     return tag.label?.includes(value)
            // })) {
            //     setOptions([inputTag, ...options]);
            //     return
            // }
            // fetchRef.current += 1;
            // const fetchId = fetchRef.current;
            // setOptions([]);
            // setFetching(true);
            // fetchOptions(value).then((newOptions) => {
            //     if (fetchId !== fetchRef.current) {
            //         // 响应超时则丢弃
            //         return;
            //     }
            //     tmpOption.current = newOptions.length < 1 ? [inputTag] : [inputTag, ...newOptions]
            //     oldOptions.current = options
            //     setOptions(tmpOption.current)
            //
            //     // setOptions(options.concat(newOptions));
            //     setFetching(false);
            // })

            if (!value) {
                setOptions(realOptions.current)
                return
            }
            const inputTag = {
                label: value,
                value
            }
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions = []) => {
                if (fetchId !== fetchRef.current) {
                    // 响应超时则丢弃
                    return;
                }
                newOptions = newOptions.map(o => ({label: o.label, value: o.value}))
                setOptions([inputTag, ...newOptions])
                setFetching(false);
            })

        }

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    const select = (option) => {
        if (!realOptions.current.find(o => o.value === option.value)) {
            realOptions.current.push(option)
            setOptions(realOptions.current)
            // Modal.confirm({
            //     icon: <ExclamationCircleOutlined/>,
            //     content: '添加标签到数据库？',
            //     async onOk() {
            //         const insert = await addBlogTags(option.label,parseCookie(document.cookie).user?.id)
            //         option.value = insert.data.insertId
            //         props.addedOptions&&(
            //             props.addedOptions.current = Array.isArray(props.addedOptions.current) ? props.addedOptions.current.push(option) : [option]
            //         )
            //         oldOptions.current.push(option)
            //         setOptions(oldOptions.current)
            //     },
            //     onCancel() {
            //         setOptions(oldOptions.current);
            //     },
            // })

        }

    }
    return (<Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small"/> : null}
        {...props}
        onSelect={select}
        onFocus={(e) => {
            setOptions(realOptions.current)
        }}
        options={options}
    />)
}

export default AddBlog
