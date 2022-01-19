import {get, post} from "../config";


export async function addBlog(blog:any) {
    const res = await post(`/blog/addBlog`,blog)
    return res.data.blogId
}

export async function modifyBlog(blog:any) {
    const res = await post(`/blog/modifyBlog`,blog)
    return res.data.blogId
}

export async function getBlogById(id:number) {
    const res = await get(`/blog/getBlog/id/${id}`)
    return res.data
}

export async function getBlogs(userId:number,options?:{key:string,page:number,pageSize:number,orderBy:string}) {
    return await get(`/blog/getBlogs/userId/${userId}`,options)
}
