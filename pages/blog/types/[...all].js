import {getDefaultLayout} from "../../../components/layouts/main";
import {getBlogCategory} from "../../../request/modules/selectOptions";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Collapse from "../../../components/common/Collapse";
import '/styles/pages/blog/blogTypes.scss'
import Icon from "../../../components/common/Icon";
import {getBlogsByCategory} from "../../../request/modules/blogRequest";
import BlogCard from "../../../components/common/BlogCard";
import Link from "next/link";
import setGlobalLoading from "../../../utils/libs/setGlobalLoading";
import {useRouter} from "next/router";
import XlPagination from "../../../components/common/XlPagination";
import ClickOutside from "../../../utils/libs/clickOutside";

export const getServerSideProps = async ({req, res, params, query}) => {

    // console.log( res.setHeader())
    // query格式：[typeId,page(p1)]
    const page = parseFloat(query.all[1]?.slice(1)) || 1
    const pageSize = 10
    // const total = parseFloat(query.all[2]?.slice(1))||0
    const categories = await getBlogCategory(query.userId)
    const categoryId = query.all[0] === 'init' ? categories[0].categoryId : parseFloat(query.all[0])
    // 根据分类获取博客
    const blogs = await getBlogsByCategory(categoryId, true, page, pageSize)

    return {
        props: {
            blogs: blogs.data || [],
            total: blogs.total,
            categories,
            categoryId,
            page,
            pageSize
        }
    }
}

BlogTypes.layout = getDefaultLayout

function BlogTypes({categories, categoryId, blogs, total, page, pageSize}) {
    const router = useRouter()
    useEffect(() => {
        // 路由返回时自动滚动到原本位置
        router.beforePopState(({url, as, options}) => {
            console.log(options)
            options.scroll = false
            return true
        })
    }, [])
    // 当前选中的目录项
    const [activeItem, setActiveItem] = useState([])
    // 展开子目录
    const openCategoryChildren = (id) => {
        if (activeItem.includes(id)) {
            setActiveItem(activeItem.filter(a => a !== id))
        } else {
            const newActiveItem = [...activeItem]
            newActiveItem.push(id)
            setActiveItem(newActiveItem)
        }

    }
    // 显示全局loading
    const loading = () => {
        setGlobalLoading(true)
    }
    // mobile模式下显示目录
    const [showCategory, setShowCategory] = useState(true)
    const category = useRef(null)
    useEffect(() => {
        const clickOutsideDom = ClickOutside.addSource(category.current, (e) => {
            // if (!menuIcon.current.contains(e.target)) {
            e.stopPropagation()
                setShowCategory(false)
            // }
        })
        return () => {
            ClickOutside.deleteSource(clickOutsideDom)
        }
    }, [])
    // 目录jsx
    const categoryRender = useMemo(() => {
        const getCategoryRender = (categories) => {
            const items = categories.map(category => {
                const isActive = activeItem.includes(category.categoryId)
                if (category.children) {
                    return <div key={category.categoryId}>
                        <Link href={`/blog/types/${category.categoryId}`} key={category.categoryId}>
                            <li className={`xl-blog-types-categories-menu-sub-item ${category.categoryId === categoryId && 'active'}`}
                                onClick={loading}
                            >
                                <Icon className={`back ${isActive && 'active'}`}
                                      title='展开'
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          openCategoryChildren(category.categoryId)
                                      }}/>
                                {category.categoryName}
                            </li>
                        </Link>

                        <Collapse key={`${category.categoryId}-children`} show={isActive}>
                            {getCategoryRender(category.children)}
                        </Collapse>
                    </div>
                } else return <Link href={`/blog/types/${category.categoryId}`} key={category.categoryId}>
                    <li
                        onClick={loading}
                        className={`xl-blog-types-categories-menu-item ${category.categoryId === categoryId && 'active'}`}>
                        {category.categoryName}
                    </li>
                </Link>
            })
            return <ul className='xl-blog-types-categories-menu'>{items}</ul>
        }
        return getCategoryRender(categories)
    }, [categories, activeItem])

    return <div className='xl-blog-type-main'>

        <div className={`xl-blog-type-category-tree ${showCategory && 'show'}`}>
            <h1 className='title'>分类</h1>
            {categoryRender}
        </div>
        <div ref={category} className={`xl-show-category ${showCategory && 'active'}`} onClick={(e) => {
            e.stopPropagation()
            setShowCategory(!showCategory)
        }}>
            <Icon className={`back xl-show-category-icon ${showCategory && 'showed'}`}/>
            {/*<span className='expand-icon-label'>{showCategory ? '收起' : '目录'}</span>*/}
        </div>


        <div className='xl-blog-type-blog-list'>
            {blogs.length > 0 ? blogs.map((blog) => {
                return <BlogCard openBlank={false} key={blog.blogId} style={{width: '50vw'}} blog={blog}/>
            }) : '木有呢！！！'}
            {/*<Pagination total={total} page={page} pageSize={pageSize}/>*/}
            <XlPagination
                defaultPageSize={pageSize}
                defaultCurrent={page}
                pageUrl={(page)=>`/blog/types/${categoryId}/p${page}`}
                total={total}
            />
        </div>
    </div>
}

export default BlogTypes
