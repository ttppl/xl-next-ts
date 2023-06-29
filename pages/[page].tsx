import '/styles/pages/Index.scss'
import {getBlogsByType} from "../request/modules/blogRequest";
import React from "react";
import Home, {HomePageProps} from "./index";
import {getBlogUser} from "../request/modules/userRequest";
import {getFileUrl, parseNumber} from "../utils";
import {GetServerSideProps} from "next";

export const getServerSideProps:GetServerSideProps<HomePageProps,{page:string}> =  async function ({params}) {
    const pageSize = 20
    const page = parseNumber(params?.page.slice(1),1)
    /** 获取最新博客 */
    const res = await getBlogsByType('newest', page, pageSize)
    const userRes = await getBlogUser()
    const user= userRes.data
    user.avatar = getFileUrl(user.avatar)
    return {
        props: {
            blogs: res.data,
            total: res.total,
            user,
            page: 1,
            pageSize
        }
    }
}

export default Home
