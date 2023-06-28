import {BaseResultType, get} from "../config";
import {CategoryType} from "./blogRequest";
import {Nullable} from "../../utils/types";

/** 目录树类型 */
export type CategoryTreeType = CategoryType & {children?:CategoryType[]}

/** 获取用户博客目录 */
export async function getBlogCategory(userId?:Nullable<number|string>) {
    return (await get<BaseResultType<CategoryTreeType[]>>(`/category/getUserCategory/type/blog`,{userId})).data
}
