import {useRouter} from "next/router";
import {Button} from "antd";
import {getManagementLayout, ManagementLayoutContext} from "../../components/layouts/managementLayout";
import React, {useContext, useEffect} from "react";
import Head from "next/head";

Management.layout = getManagementLayout

function Management() {

    const router = useRouter()
    const layoutContext = useContext(ManagementLayoutContext)
    useEffect(() => {
        layoutContext.setLoading(false)
    }, [])
    return <>
        <Head>
            <title>管理主页</title>
            <meta name="description" content="管理-主页"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>

        <Button onClick={() => {
            router.push('/api/auth/logoutUser?' + Math.random())
        }}>out</Button>
        <Button onClick={() => {
            router.push('/')
        }}>INDEX</Button>
    </>
}

export default Management
