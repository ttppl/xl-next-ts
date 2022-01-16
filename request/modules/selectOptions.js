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

export async function getBlogCategory(userId) {
    const categories = (await get(`/category/getUserCategory/user/${userId}/type/blog`)).data
    return formatCategory(categories)
}

export async function getBlogTags(name, userId) {
    const res = await get('/tag/getTag', {name, userId, type: 'blog'})
    return res.data
}

export async function addBlogTags(name, userId) {
    const res = await post('/tag/addTag', {name, userId, type: 'blog'})
    return res.data
}


export async function getInitialTagAndCategory(userId) {
    const categories = await getBlogCategory(userId)
    const tags = await getBlogTags(null, userId)
    return {
        categories,
        tags: formatTags(tags)
    }
}

export async function getCategoryTreeList(userId, page = 1, pageSize = 10, name, type, parent) {
    return await get('/category/getCategoryTreeList', {userId, page, pageSize, name, type, parent})
}

