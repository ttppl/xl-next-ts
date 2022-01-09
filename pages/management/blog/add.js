import Head from 'next/head'
import styles from '/styles/pages/management/addBlog.scss'

import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import Icon from "../../../components/Icon";
import {getKeyCode, insertTextAtCursor, isCtrlKey, isShiftKey, KEY_CODE} from "../../../utils/dom";
import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css';
import {Cascader, Col, Form, Input, Row, Select, Tag, Spin, Modal} from "antd";
import {marked} from 'marked';
import {addListener, removeListenerRS} from "../../../utils/libs/EventManager";
import {getManagementLayout, ManagementLayoutContext} from "../../../components/layouts/managementLayout";
import {getBlogCategory, getBlogTags} from "../../../request/modules/selectOptions";
import debounce from 'lodash/debounce';
import { ExclamationCircleOutlined } from '@ant-design/icons';


AddBlog.layout = getManagementLayout

function formatTags(tags) {
    return tags?.map?.(tag => ({
        label: tag.tagName,
        value: tag.tagName,
        id: tag.tagId,
        color: tag.color
    })) || []
}

async function searchTag(name) {
    const tags = await getBlogTags(name)
    return formatTags(tags)
}

export async function getStaticProps(context) {
    const categories = await getBlogCategory(0)
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
    layoutContext.setActiveMenu(['addBlog'])
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
                setShowPreview(!showPreview)
            }
        })
        layoutContext.setLoading(false)
        return () => {
            removeListenerRS(keyDownListener)
        }
    }, [])
    // 预览
    const [showPreview, setShowPreview] = useState(false)


    const inlineFormItemStyle = {
        display: 'inline-flex',
        marginRight: '20px'
    }
    return (
        <div className={styles.main}>
            <Head>
                <title>管理</title>
                <meta name="description" content="管理-添加博客"/>
                <link rel="icon" href="/my_favicon.ico"/>
            </Head>
            {/*<div>{JSON.stringify(data)}</div>*/}

            <Form labelCol={{style: {width: '80px', textAlign: 'left'}}}
                  size='large'>
                <Form.Item label='标题' name='title'>
                    <Input/>
                </Form.Item>
                <Form.Item label={''} name='md-text'>
                    <div className='md-menu-bar'>
                        <Icon className='br' title='换行：ctrl+enter' onClick={addBr}/>
                        <Icon className={showPreview ? 'view-off' : 'view'} title='预览：ctrl+P'
                              onClick={() => setShowPreview(!showPreview)}/>
                    </div>
                    <Row justify={'space-between'}>
                        <Col flex={'1 0'}>
                            <Input.TextArea id='md-input'
                                            autoSize={{minRows: 8}}
                                            onChange={parseMd}
                            />
                        </Col>
                        <Col flex={1} span={12} style={{display: showPreview ? 'block' : 'none'}}>
                            <div ref={preview}/>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label='分类' name="type" style={inlineFormItemStyle}>
                    <Select defaultValue="article" style={{width: '120px'}} placeholder='分类'>
                        <Select.Option value="article">文章</Select.Option>
                        <Select.Option value="essay">随笔</Select.Option>
                        <Select.Option value="movement">动态</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='目录' name="category" style={inlineFormItemStyle}>
                    <Cascader options={props.categories} style={{width: '200px'}} changeOnSelect/>
                </Form.Item>
                <Form.Item label='标签' name="tags">
                    {/*<Select placeholder='选择标签'*/}
                    {/*        mode="multiple"*/}
                    {/*        options={props.tags}*/}
                    {/*        tagRender={tagRender}*/}
                    {/*        onSearch={tagSearch}*/}
                    {/*        notFoundContent={tagSearch ? <Spin size="small"/> : null}*/}
                    {/*        showSearch>*/}
                    {/*</Select>*/}
                    <TagSelect
                        mode="multiple"
                        placeholder="选择标签"
                        fetchOptions={searchTag}
                        tagRender={tagRender}
                        showSearch
                        options={props.tags}
                    />
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
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState(props.options);
    const oldOptions = useRef(props.options)
    const tmpOption = useRef(null)
    const fetchRef = React.useRef(0);
    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            if(!value){
                setOptions(oldOptions.current);
            }
            const inputTag = {
                label: value,
                value
            }
            if (props.options?.find(tag => {
                return tag.label?.includes(value)
            })) {
                setOptions([inputTag,...options]);
                return
            }

            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // 响应超时则丢弃
                    return;
                }
                tmpOption.current = newOptions.length < 1 ? [inputTag] : [inputTag,...newOptions]
                oldOptions.current = options
                setOptions(tmpOption.current)

                // setOptions(options.concat(newOptions));
                setFetching(false);
            })

        }

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    const select = (option) => {
        if(!oldOptions.current.find(o=>o.value===option.value)) {
            Modal.confirm({
                icon: <ExclamationCircleOutlined />,
                content: '添加标签到数据库？',
                onOk(){
                    oldOptions.current.push(option)
                    setOptions([...oldOptions.current])
                },
                onCancel() {
                    setOptions(oldOptions.current);
                },
            })

        }

    }
    return (
        <Select
            labelInValue
            filterOption={true}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            {...props}
            onSelect={select}
            options={options}
        />
    );
}

export default AddBlog