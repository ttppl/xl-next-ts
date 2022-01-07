import Head from "next/head";
import '/styles/pages/user/login.scss'
import React, {useRef, useState} from "react";
import {Form, Input, Button, Checkbox, Spin, message} from 'antd';
import 'antd/es/button/style/index.css'
import {formatFormData} from "../../utils/antdUtil";
import {postOrig} from "../../request/config";
function Login() {
    const [loading,setLoading] = useState(false)
    const submit = (formData)=>{
        setLoading(true)
        postOrig('/api/auth/login',formData).then(res=>{
            console.log(res)
            message.error(res?.msg)
            setLoading(false)
        })
        // document.getElementById('loginForm').submit()
    }
    return (
        <div>
            <Head>
                <title>登录</title>
                <meta name="description" content="管理登录"/>
                {/*<link rel="icon" href="/favicon.ico"/>*/}
            </Head>
            <main className={'xl-login-card'}>
                <Spin spinning={loading}>
                    <p className='xl-login-card-title'>登录</p>
                    <Form
                        id='loginForm'
                        // onSubmitCapture={submit}
                        onFinish={submit}
                        size={'large'}
                        name="basic"
                        // fields={data}
                        // onFieldsChange={(c,all)=>setData(all)}
                        labelCol={{span: 6}}
                        // wrapperCol={{span: 24}}
                        // initialValues={{remember: true}}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="userName"
                            // rules={[{required: true, message: '用户名不能为空!'}]}
                        >
                            <Input name="userName"/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            // rules={[{required: true, message: '密码不能为空!'}]}
                        >
                            <Input.Password name="password"/>
                        </Form.Item>

                        {/*<Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>*/}
                        {/*    <Checkbox>Remember me</Checkbox>*/}
                        {/*</Form.Item>*/}

                        <Form.Item wrapperCol={{offset: 4, span: 16}}>
                            <Button type="primary" size={"large"} htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </main>
            <style global jsx>{`
                body {
                    background:url(/imgs/light-bg.jpg) no-repeat;
                    //background-size: cover;//或者background-size: 100% 100%;
                    background-size:100% 100%;
                    background-attachment: fixed;
                }
            `}</style>
        </div>

    )
}

export default Login
