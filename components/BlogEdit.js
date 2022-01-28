import {Button, Cascader, Col, Form, Input, Row, Select, Space, Spin, Switch, Tag} from "antd";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {marked} from "marked";
import hljs from "highlight.js";
import {getKeyCode, insertTextAtCursor, isCtrlKey, isShiftKey, KEY_CODE} from "../utils/dom";
import {addListener, removeListenerRS} from "../utils/libs/EventManager";
import {isNumber} from "../utils/check";
import {parseCookie} from "../utils/libs/cookieParser";
import '/styles/components/BlogEdit.scss'
import Icon from "./Icon";
import debounce from "lodash/debounce";
import PropTypes from 'prop-types'
import {getBlogTags} from "../request/modules/selectOptions";
import useManagementFinished from "../hooks/useManagementPageFinished";
import {getBlogById} from "../request/modules/blogRequest";
import {formatSwitchValue, showfailMessage} from "../utils/antdUtil";
import useRunnableScript from "../hooks/useRunnableScript";
import Editor from "./Editor";
import {message} from 'antd'
import {runScripts} from "../request/modules/utilRequest";

BlogEdit.propTypes = {
    tags: PropTypes.array,
    categories: PropTypes.array,
    onSubmit: PropTypes.func,
    formData: PropTypes.object,
    type: PropTypes.oneOf(['add', 'edit', 'editSearch'])
}

//marked.js配置，其他自定义参考：https://marked.js.org/using_pro#tokenizer
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
    "xhtml": false
})
const codeRenderer = {
    code(code, lang, escaped) {
        let highlightCodes = code
        try {
            highlightCodes = hljs.highlight(lang.replace('-run', ''), code).value;
        } catch (e) {
            console.log(e.toString())
        }
        if (lang === 'js-run') {
            const runScript = `<button title="运行" class="xl-run-script-button" type="button" onclick="runXlScript(event)">
                                        Run
                                        <textarea hidden>${code}</textarea>
                                    </button>
                                    <button title="清空" type="button" class="xl-run-script-clear-button" onclick="clearXlScriptOutput(event)">clear</button>
                                    <div class="xl-runnable-output"></div>`
            return `<pre><code>${highlightCodes}</code></pre><div class="xl-runnable-script-operation">${runScript}</div>`
        } else {
            return `<pre><code>${highlightCodes}</code></pre>`
        }
    }
};
marked.use({renderer: codeRenderer})


export function BlogEdit(props) {
    useManagementFinished()
    const [form] = Form.useForm();
    const preview = useRef(null)//preview实例
    const [showPreview, setShowPreview] = useState(false)
    const inlineFormItemStyle = {
        display: 'inline-flex',
        marginRight: '20px'
    }
    const [formDefaultData, setFormDefaultData] = useState(props.type === 'editSearch' ? {} : props.formData)
    const [loading, setLoading] = useState(false)
    const [fixTextarea, setFixTextarea] = useState(true)
    const [fullScreen, setFullScreen] = useState(false)
    const [showCodeEditor, setShowCodeEditor] = useState(false)
    const [maxCodeEditor, setMaxCodeEditor] = useState(false)
    const inputSelectedPos = useRef([0, 0])
    const searchBlog = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        setLoading(true)
        const blogId = e.target.value
        try {
            const blog = await getBlogById(blogId)
            if (Array.isArray(blog.category)) {
                blog.category = blog.category.map(c => c.categoryId)
            } else {
                blog.category = []
            }
            if (Array.isArray(blog.tags)) {
                blog.tags = blog.tags.map(t => (({
                    value: t.tagId,
                    label: t.tagName
                })))
            } else {
                blog.tags = []
            }
            preview.current.innerHTML = blog.htmlText
            formatSwitchValue(blog, 'isPublish', 'isTop', 'isDelete')
            form.setFieldsValue(blog)
        } catch (e) {
            showfailMessage(e.toString())
            // form.resetFields()
            preview.current.innerHTML = ''
            form.setFieldsValue({
                blogId, title: '', mdText: '',
                type: 'article',
                category: [],
                tags: [],
                isPublish: true,
                isDelete: false,
                isTop: false
            })
        }
        setLoading(false)

    }


    //转换markdown
    const parseMd = (e) => {
        if (showPreview) {
            try {
                preview.current.innerHTML = marked.parse(e.target?.value || e, {breaks: true})
            } catch (e) {
                console.log(e)
            }
        }
    }
    //添加换行符
    const addBr = () => {
        const inputDom = document.getElementById('md-input')
        const br = '<br/>\n'
        insertTextAtCursor(inputDom, br, true)
        parseMd(inputDom.value)
    }
    const addRunnable = () => {
        const inputDom = document.getElementById('md-input')
        const fragment = '```js-run\n\n```'
        insertTextAtCursor(inputDom, fragment, true, -4)
        parseMd(inputDom.value)
    }
    const addCodeFragment = () => {
        const inputDom = document.getElementById('md-input')
        const fragment = '``'
        insertTextAtCursor(inputDom, fragment, false, -1)
        parseMd(inputDom.value)
    }
    const addCodesFragment = () => {
        const inputDom = document.getElementById('md-input')
        const fragment = '```\n```'
        insertTextAtCursor(inputDom, fragment, true, -4)
        parseMd(inputDom.value)
    }
    const openCodeEditor = () => {
        // const inputDom = document.getElementById('md-input')
        // const startPos = inputDom.selectionStart;
        // const endPos = inputDom.selectionEnd;
        // inputSelectedPos.current = [startPos, endPos]
        setShowCodeEditor(!showCodeEditor)
    }
    const runCode = async (code)=>{
        try {
            const res = await runScripts(code)
            if(res.success) message.success(JSON.stringify(res.data))
            else message.error(res.msg)
        }catch (e) {
            message.error(e.toString())
        }
    }
    const insertCode=()=>{
        const code = window.monacoEditorModel.getValue()
        const inputDom = document.getElementById('md-input')
        const fragment = `\`\`\` js-run\n${code}\n\`\`\`\n`
        insertTextAtCursor(inputDom, fragment, true, 0)
        form.setFieldsValue({mdText:inputDom.value})
        parseMd(inputDom.value)
        setShowCodeEditor(false)
    }

    useRunnableScript()
    //快捷键
    useEffect(() => {
        const inputDom = document.getElementById('md-input')
        const keyDownListener = addListener(inputDom, 'keydown', (e) => {
            const keyCode = getKeyCode(e)
            const ctrlKey = isCtrlKey(e)
            const shiftKey = isShiftKey(e)
            // console.log(keyCode,ctrlKey,shiftKey)
            if (ctrlKey && keyCode === KEY_CODE.enter) {
                e.preventDefault()
                addBr()
            }
            if (ctrlKey && keyCode === KEY_CODE.P) {
                e.preventDefault()
                toggleShowPreview()
            }
            if (ctrlKey && shiftKey && keyCode === KEY_CODE.F) {
                e.preventDefault()
                setFullScreen(!fullScreen)
            }

        })

        return () => {
            removeListenerRS(keyDownListener)
        }
    }, [showPreview, fullScreen])
    // 预览
    const toggleShowPreview = () => {
        try {
            if (!showPreview) {
                const input = document.getElementById('md-input')
                preview.current.innerHTML = marked.parse(input.value, {breaks: true})
            }
        } catch (e) {
            console.log(e.toString())
        }
        setShowPreview(!showPreview)
    }

    //提交
    const submit = async (formData) => {
        // console.log('submitting...', formData)
        setLoading(true)
        let categories = props.categories
        formData.category = formData.category?.map((id, index) => {
            const category = categories.find(c => c.id === id)
            if (category) {
                categories = category.children
                return {
                    id: category.id,
                    name: category.label,
                    level: index + 1
                }
            } else return ''
        }) || []
        formData.tags = formData.tags?.map(tag => {
            return {id: isNumber(tag.value) ? tag.value : '', name: tag.label}
        }) || []
        formData.userId = parseCookie(document.cookie).user.userId
        formData.mdText && (formData.htmlText = marked.parse(formData.mdText, {breaks: true}))
        await props.onSubmit?.(formData, form)
        setLoading(false)
    }


    return <Spin spinning={loading}>
        {/*<Script src='/libs/global.js' strategy='beforeInteractive'/>*/}
        <Form initialValues={formDefaultData}
              labelCol={{style: {width: '80px', textAlign: 'left'}}}
              size='large'
              form={form}
              onFinish={submit}
        >
            <Form.Item label='ID' name='blogId'>
                <Input placeholder='唯一标识ID'
                       onPressEnter={searchBlog}
                       disabled={props.type === 'add'}/>
            </Form.Item>
            <Form.Item label='标题' name='title'>
                <Input/>
            </Form.Item>

            <div className='xl-md-editor-menu-bar'>
                <Icon className='br' title='换行：ctrl+enter' onClick={addBr}/>
                <Icon className={showPreview ? 'view-off' : 'view'}
                      title='预览：ctrl+P'
                      color={showPreview ? '#1890ff' : 'inherit'}
                      onClick={toggleShowPreview}/>
                <Icon className='thumbtack' title='固定输入框'
                      color={fixTextarea ? '#1890ff' : 'inherit'}
                      onClick={() => setFixTextarea(!fixTextarea)}/>
                <Icon className='full' title='全屏：ctrl+shift+f'
                      color={fullScreen ? '#1890ff' : 'inherit'}
                      onClick={() => setFullScreen(!fullScreen)}/>
                <Icon className='code' title='添加行内代码段'
                      onClick={addCodeFragment}/>
                <Icon className='codes' title='添加代码段'
                      onClick={addCodesFragment}/>
                <Icon className='runsnable' title='添加可执行代码段'
                      onClick={addRunnable}/>
                <Icon className='code-editor' title='js代码编辑器'
                      color={showCodeEditor ? '#1890ff' : 'inherit'}
                      onClick={openCodeEditor}/>
            </div>
            <Row justify={'space-between'}
                 style={{height: fixTextarea ? '300px' : 'auto'}}
                 className={`xl-md-input-row ${fullScreen && 'full'}`}>
                <Col flex={'1 0'} className={`xl-md-input-col ${showPreview ? 'in-view' : 'hidden'}`}>
                    <Form.Item label={''} name='mdText'>
                        <Input.TextArea id='md-input'
                            // autoSize={{minRows: 5,maxRows:fixTextarea?5:null}}
                                        bordered={false}
                                        autoSize={{minRows: 5}}
                                        onChange={parseMd}
                        />
                    </Form.Item>
                </Col>
                <Col flex={1} span={12} className={`xl-md-preview-col ${fullScreen && 'full'}`}
                     style={{display: showPreview ? 'block' : 'none'}}>
                    <div className='xl-md-preview' ref={preview}/>
                </Col>
                <div className={`xl-blog-edit-code-editor ${maxCodeEditor && 'max'}`}
                     style={{display: showCodeEditor ? 'block' : 'none'}}>
                    <Editor theme='vs-dark'
                            enableMinimap={false}
                            submitLabel='Run'
                            onSubmit={runCode}
                            style={{height: maxCodeEditor ? '70vh' : '200px'}}>
                        <button type='button' onClick={insertCode}>insert</button>
                        <button type='button' onClick={() => setMaxCodeEditor(!maxCodeEditor)}>max</button>
                        <button type='button' onClick={() => setShowCodeEditor(false)}>close</button>
                    </Editor>
                </div>
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
                <Form.Item name='isPublish' valuePropName='checked' label='是否发布'>
                    <Switch defaultChecked/>
                </Form.Item>
                <Form.Item name='isTop' valuePropName='checked' label='是否置顶'>
                    <Switch/>
                </Form.Item>
                <Form.Item name='isDelete' valuePropName='checked' label='是否删除'>
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
    </Spin>
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

async function searchTag(name) {
    const tags = await getBlogTags(name)
    return formatTags(tags)
}

function formatTags(tags) {
    return tags?.map?.(tag => ({
        key: tag.tagId,
        id: tag.tagId,
        label: tag.tagName,
        value: tag.tagId,
        color: tag.color
    })) || []
}

function TagSelect({fetchOptions, debounceTimeout = 800, ...props}) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState(props.options);
    const realOptions = useRef(props.options)
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
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
