import {get, post} from "../config";


export async function addBlog(blog) {
    const res = await post(`/blog/addBlog`,blog)
    return res.data.blogId
}

export async function modifyBlog(blog) {
    const res = await post(`/blog/modifyBlog`,blog)
    return res.data.blogId
}

export async function getBlogById(id) {
    const res = await get(`/blog/getBlog/id/${id}`)
    return res.data
}


