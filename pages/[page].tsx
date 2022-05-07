import '/styles/pages/Index.scss'
import {getBlogsByType} from "../request/modules/blogRequest";
import React from "react";
import Home from "./index";

export async function getServerSideProps({query}: any) {
    const page = parseFloat(query.page.slice(1))
    const pageSize = 10
    const res = await getBlogsByType('newest', page, pageSize)
    return {
        props: {
            blogs: res.data,
            total: res.total,
            page,
            pageSize
        }
    }
}

export default Home
