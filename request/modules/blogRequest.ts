import {get, post} from "../config";
import {isBoolean} from "../../utils/check";
export interface Blog {
    blogId:number,
    userId:number,
    title:string,
    coverImg:string,
    plainText:string,
    type:string,
    tags:string|Array<object>,
    category:string|Array<object>,
    viewCount:number,
    commentCount:number,
    likeCount:number,
    publishTime:string|Date
}

export async function getBlogById(id:number) {
    const res = await get(`/blog/getBlog/id/${id}`)
    return res.data
}

// export async function getBlogs(userId:number,options?:{key:string,page:number,pageSize:number,orderBy:string}) {
//     return await get(`/blog/getBlogs/userId/${userId}`,options)
// }

export async function queryBlogs(key:string,options?:{userId?:number,
    isPublish?:string,isDelete?:string,
    page?:number,pageSize?:number,orderBy?:string}) {
    return await get(`/blog/getBlogList`,options)
}


export async function getBlogsByType(type='newest',page=1,pageSize=10) {
    return await get(`/blog/getBlogs/type/${type}`,{page,pageSize})
}

export async function getBlogsByCategory(categoryId:number|string,containsChildren:boolean,page=1,pageSize=10) {
    return await get(`/blog/getBlogs/category/${categoryId}`,{children:containsChildren,page,pageSize})
}
