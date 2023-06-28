import {getDefaultLayout} from "../../../components/layouts/main";
import {CategoryTreeType, getBlogCategory} from "../../../request/modules/categoryRequest";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Collapse from "../../../components/common/Collapse";
import '/styles/pages/blog/blogTypes.scss'
import Icon from "../../../components/common/Icon";
import {BlogType, CategoryType, getBlogsByCategory} from "../../../request/modules/blogRequest";
import BlogCard from "../../../components/common/BlogCard";
import Link from "next/link";
import {useRouter} from "next/router";
import XlPagination from "../../../components/common/XlPagination";
import ClickOutside from "../../../utils/libs/clickOutside";
import useLogoClick from "../../../hooks/useLogoClick";
import { GetServerSidePropsContext, GetServerSidePropsResult} from "next";

interface Props{
    blogs: BlogType[],
    total: number,
    categories:CategoryTreeType[],
    categoryId:number|string,
    page:number,
    pageSize:number
}
export const getServerSideProps = async ({req, res, params, query}:GetServerSidePropsContext<any,{id?:string,page?:string}>):Promise<GetServerSidePropsResult<Props>> => {
    const page = parseFloat(query?.page?.toString()||'1') || 1
    const pageSize = 10
    // const total = parseFloat(query.all[2]?.slice(1))||0
    const categories = await getBlogCategory()
    const categoryId = query.id as string||categories[0].categoryId
    // 根据分类获取博客
    const blogs = await getBlogsByCategory(categoryId, true, page, pageSize)

    return {
        props: {
            blogs: blogs.data || [],
            total: blogs.total||0,
            categories,
            categoryId,
            page,
            pageSize
        }
    }
}


function BlogTypes({categories, categoryId, blogs, total, page, pageSize}:Props) {
    const router = useRouter()
    useEffect(() => {
        // 路由返回时自动滚动到原本位置
        router.beforePopState(({url, as, options}) => {
            options.scroll = false
            return true
        })
    }, [])
    // 当前选中的目录项
    const [activeItem, setActiveItem] = useState<number[]>([])
    // 展开子目录
    const openCategoryChildren = (id:number) => {
        if (activeItem.includes(id)) {
            setActiveItem(activeItem.filter(a => a !== id))
        } else {
            const newActiveItem = [...activeItem]
            newActiveItem.push(id)
            setActiveItem(newActiveItem)
        }

    }
    // mobile模式下显示目录
    const [showCategory, setShowCategory] = useState(false)
    const {logoRef} = useLogoClick(()=>{
        setShowCategory(!showCategory)
    })
    const category = useRef(null)
    useEffect(() => {
        if(showCategory) {
            const clickOutsideDom = ClickOutside.addSource(category.current, (e) => {
                if (logoRef.current&&!logoRef.current.contains(e.target as Node)) {
                    e.stopPropagation()
                    e.preventDefault()
                    setShowCategory(false)
                }
            })
            return () => {
                if(clickOutsideDom) {
                    ClickOutside.deleteSource(clickOutsideDom)
                }
            }
        }
    }, [showCategory])
    // 目录jsx
    const categoryRender = useMemo(() => {
        const getCategoryRender = (categories:CategoryTreeType[]) => {
            const items = categories.map(category => {
                const isActive = activeItem.includes(category.categoryId)
                if (category.children&&category.children.length>0) {
                    return <div key={category.categoryId}>
                        <Link href={`/blog/types?id=${category.categoryId}`} key={category.categoryId}>
                            <li className={`xl-blog-types-categories-menu-sub-item ${category.categoryId === categoryId && 'active'}`}>
                                <Icon className={`back ${isActive && 'active'}`}
                                      title='展开'
                                      onClick={(e:MouseEvent) => {
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
                } else return <Link href={`/blog/types?id=${category.categoryId}`} key={category.categoryId}>
                    <li className={`xl-blog-types-categories-menu-item ${category.categoryId === categoryId && 'active'}`}>
                        {category.categoryName}
                    </li>
                </Link>
            })
            return <ul className='xl-blog-types-categories-menu'>{items}</ul>
        }
        return getCategoryRender(categories)
    }, [categories, activeItem])

    return <div className='xl-blog-type-main'>
        <div ref={category} className={`xl-blog-type-category-tree ${showCategory && 'show'}`}>
            <h1 className='title'>分类</h1>
            {categoryRender}
        </div>
        <div className='xl-blog-type-blog-list'>
            {blogs.length > 0 ? blogs.map((blog) => {
                return <BlogCard openBlank={false} key={blog.blogId} style={{width: '50vw'}} blog={blog}/>
            }) : '木有呢！！！'}
            {/*<Pagination total={total} page={page} pageSize={pageSize}/>*/}
            <XlPagination
                defaultPageSize={pageSize}
                defaultCurrent={page}
                pageUrl={(page)=>`/blog/types?id=${categoryId}&page=${page}`}
                total={total}
            />
        </div>
    </div>
}

BlogTypes.layout = getDefaultLayout

export default BlogTypes
