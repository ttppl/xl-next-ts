import request from "../config";

const module = '/user'
const {doGet, doPost, doRestGet} = request(module)

// export function getUser(name) {
//     return doRestGet('/getUser', name)
// }

export async function login(userName, password) {
    return await doPost(`/login`, {userName, password})
}

export async function getBlogUser() {
    return await doGet(`/blogUser`)
}
