import request, {BaseResultType} from "../config";

const module = '/user'
const {doGet, doPost} = request(module)

export interface UserModel{
    userId:number,
    userName:string,
    password:string,
    avatar:string,
    lastToken:string,
    detailInfo:string
    modifyTimestamp:string
}

export type UserType = Omit<UserModel, 'detailInfo'>&{
    detailInfo?:{
        "nickname": string,
        "introduction": string,
        "contact": {
            "name": string,
            "value": string
        }[],
        "blogIndexRightSide"?: {
            "offsetTop": number,
            "title": string,
            "content": string
        }[]
    },
}

export async function login(userName:string, password:string) {
    return await doPost(`/login`, {userName, password})
}

export async function getBlogUser() {
    return await doGet<BaseResultType<UserType>>(`/blogUser`)
}
