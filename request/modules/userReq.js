import request from "../config";

const module = '/user'
const {doGet, doPost, doRestGet} = request(module)

// export function getUser(name) {
//     return doRestGet('/getUser', name)
// }

export async function login(userName, password) {
    const res = await doPost(`/login`, {userName, password})
    if(res.success){
        return res.data
    }else return false

}