import Head from 'next/head'
import styles from '/styles/pages/management/addBlog.module.scss'

import React, {useEffect, useRef, useState} from "react";
import Icon from "../../../components/Icon";
import {getKeyCode, insertTextAtCursor, isCtrlKey, isShiftKey, KEY_CODE} from "../../../utils/dom";
import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css';
import {Col, Form, Input, Row, Select} from "antd";
import {marked} from 'marked';
import {addListener, removeListenerRS} from "../../../utils/libs/EventManager";
import {instanceOf} from "prop-types";
export default function AddBlog(props) {
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
        preview.current.innerHTML = marked.parse(e.target?.value||e, {breaks: true})
    }
    useEffect(() => {
        const inputDom = document.getElementById('md-input')
        const keyDownListener = addListener(inputDom,'keydown',(e)=>{
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
        return () => {
            removeListenerRS(keyDownListener)
        }
    }, [])
    // 预览
    const [showPreview, setShowPreview] = useState(false)
    return (
        <div className={styles.main}>
            <Head>
                <title>管理</title>
                <meta name="description" content="管理-添加博客"/>
                {/*<link rel="icon" href="/favicon.ico"/>*/}
            </Head>
            {/*<div>{JSON.stringify(data)}</div>*/}

            <Form labelCol={{style:{width:'100px'}}} size='large'>
                <Form.Item label='标题' name='title'>
                    <Input/>
                </Form.Item>
                <Form.Item label={''} name='md-text'>
                    <div className='md-menu-bar'>
                        <Icon className='br' title='换行：ctrl+enter' onClick={addBr}/>
                        <Icon className={showPreview?'view-off':'view'} title='预览：ctrl+P' onClick={()=>setShowPreview(!showPreview)}/>
                    </div>
                    <Row justify={'space-between'}>
                        <Col flex={'1 0'}>
                            <Input.TextArea id='md-input'
                                            autoSize={{ minRows: 8 }}
                                            onChange={parseMd}
                            />
                        </Col>
                        <Col flex={1} span={12} style={{display:showPreview?'block':'none'}}>
                            <div ref={preview}/>
                        </Col>
                    </Row>
                </Form.Item>
                {/*<Form.Item label='分类' name="type">*/}

                {/*    /!*<Select multiSelect={false} placeholder='分类'>*!/*/}
                {/*    /!*    <SelectOption value='article' label='文章'/>*!/*/}
                {/*    /!*    <SelectOption value='essay' check label='随笔'/>*!/*/}
                {/*    /!*    <SelectOption value='movement' label='动态'/>*!/*/}
                {/*    /!*</Select>*!/*/}


                {/*</Form.Item>*/}
            </Form>

        </div>

    )
}
