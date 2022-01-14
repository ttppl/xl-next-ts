import {get, post} from "../config";


export async function addBlog(blog) {
    const res = await post(`/blog/addBlog`,blog)
    return res.blogId
}


