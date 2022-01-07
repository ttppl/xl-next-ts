import request from "../config";

const module = '/user'
const {doGet, doPost, doRestGet} = request(module)

export function getUser(name) {
    return doRestGet('/getUser', name)
}

export function login(userName, password) {
    return doPost(`/login`, {userName, password})
}