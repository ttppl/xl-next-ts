import request, {get, restGet} from "../config";

const baseModule = '/selectOptions'
const {doGet, doPost, doRestGet} = request(baseModule)

function formatCategory(categories) {
    return categories.map((c => {
        const category = {
            id: c.categoryId,
            label: c.categoryName,
            value: c.categoryName
        }
        if (c.children) {
            category.children = formatCategory(c.children)
        }
        return category
    }))
}

export async function getBlogCategory(userId) {
    const categories = await restGet('/category/getAllBlogCategory/user/', userId)
    return formatCategory(categories)
}

export async function getBlogChildrenCategory(parentId, userId) {
    const categories = await get('/category/getBlogCategory', {parent: parentId, userId})
    return formatCategory(categories)
}

export async function getBlogTags(name,userId) {
    const tags = await get('/tag/getBlogTag', {name, userId})
    return tags
}

