import '/styles/pages/Index.scss'
import {getBlogsByType} from "../request/modules/blogRequest";
import React from "react";
import Home from "./index";
import {isNum} from "../utils/check";
import {getBlogUser} from "../request/modules/userRequest";

export async function getServerSideProps({query}: any) {
    const page = parseFloat(query.page.slice(1))
    const pageSize = 20
    const res = await getBlogsByType('newest', page, pageSize)
    const userRes = await getBlogUser()
    const user = userRes.data||{}
    user.avatar = isNum(user.avatar)?`${process.env.NEXT_PUBLIC_BASE_FILE_URL}${user.avatar}`:user.avatar
    try{
        user.detailInfo = JSON.parse(user.detailInfo)
    }catch (e) {
        console.error(e)
    }
    return {
        props: {
            blogs: res.data,
            total: res.total,
            user,
            page,
            pageSize
        }
    }
}

export default Home
