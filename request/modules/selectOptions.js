import request, {restGet} from "../config";
const baseModule = '/selectOptions'
const {doGet, doPost, doRestGet} = request(baseModule)

export function getCategory(level,parentNode,userId) {
    return doRestGet('/getBlogCategory', level)
}

export function getChildCategory(value) {
    return doRestGet('/getBlogChildCategory', value)
}

