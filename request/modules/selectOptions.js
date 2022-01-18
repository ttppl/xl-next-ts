import request, {get, post} from "../config";


function formatCategory(categories) {
    return categories.map((c => {
        const category = {
            label: c.categoryName,
            value: c.categoryId,
            id: c.categoryId
        }
        if (c.children) {
            category.children = formatCategory(c.children)
        }
        return category
    }))
}

function formatTags(tags) {
    return tags?.map?.(tag => ({
        id: tag.tagId,
        label: tag.tagName,
        value: tag.tagId,
        color: tag.color
    })) || []
}


export async function getBlogTags(name, userId) {
    const res = await get('/tag/getTag', {name, userId, type: 'blog'})
    return res.data
}

export async function getTags(userId, page, pageSize=10,
                              options = {
                                  name: null, level: null,
                                  type: null, color: null
                              }) {
    return get(`/tag/getTag`, {userId, page, pageSize, ...options})
}

export async function addBlogTags(name, userId) {
    const res = await post('/tag/addTag', {name, userId, type: 'blog'})
    return res.data
}

export async function addTag(tag = {
    userId:null, name:null,
    type:null, level:null,
    color:null, addTime:null
}) {
    return await post('/tag/addTag', tag)
}

export async function modifyTag(tag={
    id:null,userId:null, name:null,
    type:null, level:null,
    color:null, addTime:null
}) {
    return post('/tag/modifyTag', tag)
}
export async function deleteTag(id) {
    return get(`/tag/deleteTag/id/${id}`)
}


export async function getBlogCategory(userId) {
    const categories = (await get(`/category/getUserCategory/user/${userId}/type/blog`)).data
    return formatCategory(categories)
}

export async function getCategoryTreeList(userId, page = 1, pageSize = 10, name, type, parent) {
    return get('/category/getCategoryTreeList', {userId, page, pageSize, name, type, parent})
}

export async function addCategory(category) {
    return post('/category/addCategory', category)
}

export async function modifyCategory(category) {
    return post('/category/modifyCategory', category)
}

export async function deleteCategory(id) {
    return get(`/category/deleteCategory/id/${id}`)
}


export async function getInitialTagAndCategory(userId) {
    const categories = await getBlogCategory(userId)
    const tags = await getBlogTags(null, userId)
    return {
        categories,
        tags: formatTags(tags)
    }
}
