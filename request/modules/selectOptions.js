import request, {get, post} from "../config";


function formatCategory(categories) {
    return categories.map((c => {
        const category = {
            label: c.categoryName,
            value: c.categoryId,
            id:c.categoryId
        }
        if (c.children) {
            category.children = formatCategory(c.children)
        }
        return category
    }))
}

export async function getBlogCategory(userId) {
    const categories = await get(`/category/getUserCategory/user/${userId}/type/blog`)
    return formatCategory(categories)
}

// export async function getBlogChildrenCategory(parentId, userId) {
//     const categories = await get('/category/getBlogCategory', {parent: parentId, userId})
//     return formatCategory(categories)
// }

export async function getBlogTags(name,userId) {
    return await get('/tag/getTag', {name, userId,type:'blog'})
}

export async function addBlogTags(name,userId) {
    return await post('/tag/addTag', {name, userId,type:'blog'})
}

// export async function addBlogTags(tagName) {
//     const tags = await get('/tag/getBlogTag', {name, userId})
//     return tags
// }

