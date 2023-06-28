import {BaseResultType, get, post} from "../config";
import {isBoolean} from "../../utils/check";
import {ColumnBoolean} from "../../utils/types";

export interface TagType{
    tagId: number,
    tagLevel: string,
    tagName: string,
    color: string,
    userId: string,
    type: string,
    addTime:Date
}
export interface CategoryType {
    categoryId: number,
    categoryLevel: string,
    categoryName: string,
    parentId: string,
    userId: string,
    type: string
}

export interface BlogType {
    blogId: number,
    userId: number,
    title: string,
    coverImg: string,
    plainText: string,
    mdText: string,
    htmlText: string,
    type: string,
    tags:Array<TagType>,
    category:Array<CategoryType>,
    class: string,
    isPublish: ColumnBoolean,
    isDelete: ColumnBoolean,
    isTop: ColumnBoolean,
    viewCount: number,
    commentCount: number,
    likeCount: number,
    publishTime: Date,
    modifyTime: Date
}

export async function getBlogById(id:number|string) {
    const res = await get<BaseResultType<BlogType>>(`/blog/getBlog/id/${id}`)
    return res.data
}

// export async function getBlogs(userId:number,options?:{key:string,page:number,pageSize:number,orderBy:string}) {
//     return await get(`/blog/getBlogs/userId/${userId}`,options)
// }

export async function queryBlogs(key:string,options?:{userId?:number,
    isPublish?:string,isDelete?:string,
    page?:number,pageSize?:number,orderBy?:string}) {
    return await get(`/blog/getBlogList`, {key,...options})
}


export async function getBlogsByType(type='newest',page=1,pageSize=10) {
    return await get(`/blog/getBlogs/type/${type}`,{page,pageSize})
}

export async function getBlogsByCategory(categoryId:number|string,containsChildren:boolean,page=1,pageSize=10) {
    return await get<BaseResultType<BlogType[]>>(`/blog/getBlogs/category/${categoryId}`,{children:containsChildren,page,pageSize})
}
