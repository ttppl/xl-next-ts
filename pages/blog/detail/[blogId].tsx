import Head from 'next/head'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {BlogType, getBlogById} from "../../../request/modules/blogRequest";
import {getDefaultLayout} from "../../../components/layouts/main";
import '../../../styles/pages/blog/blogDetail.scss'
import 'highlight.js/styles/xcode.css';
import useRunnableScript from "../../../hooks/useRunnableScript";
import {useRouter} from "next/router";
import {getClass, getScrollTop, scrollTo} from "../../../utils/dom";
import {addListener, removeListenerRS} from "../../../utils/libs/EventManager";
import ClickOutside from "../../../utils/libs/clickOutside";
import useLogoClick from "../../../hooks/useLogoClick";
import debounce from "lodash/debounce";
import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {Nullable} from "../../../utils/types";

interface Props{
    blog:BlogType
}
interface Category{
    id: string
    level: number
    text: string
    children?:Category[]
}

export async function getServerSideProps({req, res, params}:GetServerSidePropsContext<{ blogId: string }>):Promise<GetServerSidePropsResult<Props>> {
    const blogId = params?.blogId||''
    const blog = await getBlogById(blogId)
    return {
        props: {
            blog
        }
    }
}

function BlogDetail({blog}:Props) {
    useRunnableScript()
    const router = useRouter()
    const back = () => {
        router.back()
    }
    const blogContentRef = useRef<HTMLDivElement>(null)
    const [category, setCategory] = useState<Category[]>([])
    const flattenCategory = useRef<Omit<Category, 'children'>[]>([])
    const [activeCategory, setActiveCategory] = useState<string>('')
    // 滚动事件是否触发activeCategory改变
    const scrollActiveChange = useRef(true)
    const [categoryOffset, setCategoryOffset] = useState(0)
    const [showCategory, setShowCategory] = useState(true)
    const categoryRef = useRef<HTMLUListElement>(null)
    const topOffset = useRef(100)//顶部偏移量
    /** 获取目录 */
    const getHead = (parent:Nullable<HTMLElement>, level:number) => {
        const category:Category[] = []
        Array.from(parent?.children||[]).forEach((node, index) => {
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName?.toLowerCase())) {
                if (!node.id) {
                    node.id = `xl-blog-category-title-${index}`
                }
                category.push({
                    id: node.id,
                    level: parseFloat(node.tagName.slice(1)),
                    text: node.innerHTML?.replace(/<[^>]*>/g, "") || '',
                })

            }
        })
        flattenCategory.current = category
        const formatCategory = (categoryArray:Category[]) => {
            const newCategory:Category[] = [];
            categoryArray.some((categoryItem, index) => {
                const last = newCategory[newCategory.length - 1];
                if (newCategory.length > 0 && last.level < categoryItem.level) {
                    const restCategory = categoryArray.slice(index);
                    let nextSiblingIndex =
                        restCategory.findIndex((item) => item.level <= last.level) + index;
                    if (nextSiblingIndex < index) {
                        nextSiblingIndex = restCategory.length + index;
                    }
                    if (nextSiblingIndex - index >= 1) {
                        last.children = formatCategory(
                            categoryArray.slice(index, nextSiblingIndex)
                        );
                        newCategory.push(
                            ...formatCategory(categoryArray.slice(nextSiblingIndex))
                        );
                        return true;
                    } else {
                        last.children = [categoryItem];
                    }
                } else {
                    newCategory.push(categoryItem);
                }
            });
            return newCategory;
        }
        return formatCategory(category)
    }
    /** 获取目录render */
    const categoryRender = useMemo(() => {
        const renderer = (category:Category[]) => {
            return category.map((categoryItem, index) => {
                return <div key={`category-item-container-${categoryItem.id}`}>
                    <li
                        className={getClass(['xl-blog-detail-category-item',{active:categoryItem.id === activeCategory}])}
                        onClick={() => anchorTo(categoryItem.id)}
                        key={`category-item-${categoryItem.id}`}
                    >
                        {categoryItem.text}
                        <div className='item-bar'/>
                    </li>
                    {categoryItem.children && <ul className='xl-blog-detail-sub-category' key={`category-sub-item-${categoryItem.id}`}>
                        {renderer(categoryItem.children)}
                    </ul>}
                </div>

            })
        }
        return <ul className='xl-blog-detail-category' ref={categoryRef} style={{
            transform: `translateY(${categoryOffset}px)`,
            display: showCategory ? 'block' : 'none'
        }}>
            {renderer(category)}
        </ul>
    }, [category, activeCategory,categoryOffset, showCategory])
    /** 滚动到指定目录位置 */
    const anchorTo = (id:string) => { // 锚点跳转
        const anchorElement = document.getElementById(id)
        if (anchorElement) {
            scrollTo(document.documentElement, anchorElement, topOffset.current*-1)
            setActiveCategory(id)
            scrollActiveChange.current = false
        }
    }
    /** 初始化数据 */
    useEffect(() => {
        const category = getHead(blogContentRef.current, 2)
        setCategory(category)
        setActiveCategory(category[0]?.id)
        const isMobile = window.innerWidth < 900
        isMobile && (setShowCategory(false))
        const scrollListener = addListener(document, 'scroll', debounce((e) => {
            const scrollTop = getScrollTop()
            setCategoryOffset(Math.max(scrollTop - 80, 0))
            flattenCategory.current.some((categoryItem, index) => {
                // scroll大于offsetTop则active
                const offsetTop = document.getElementById(categoryItem.id)?.getBoundingClientRect()?.top||0
                if (offsetTop >= topOffset.current) {
                    if(!scrollActiveChange.current){
                        scrollActiveChange.current = true
                        return true
                    }
                    if (offsetTop <= (window.innerHeight / 2)) {
                        setActiveCategory(categoryItem.id)
                    } else {
                        setActiveCategory(flattenCategory.current[index - 1]?.id || categoryItem.id)
                    }
                    return true
                }
            })
        }, 300))
        const clickOutsideDom = ClickOutside.addSource(categoryRef.current, (e, dom) => {
            if (isMobile && e.target && !logoRef.current?.contains(e.target as Node)) {
                setShowCategory(false)
            }
        })
        return () => {
            removeListenerRS(scrollListener)
            if(clickOutsideDom) {
                ClickOutside.deleteSource(clickOutsideDom)
            }
        }
    }, [])
    const {logoRef} = useLogoClick(() => {
        setShowCategory(!showCategory)
    }, [showCategory])
    return <div className='xl-blog-detail'>
        <Head>
            <title>博客详情</title>
            <meta name="description" content="博客详细内容"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        {/*<Icon className='back' onClick={back}/>*/}
        {/*<Icon className='category' ref={showCategoryIconRef} onClick={()=>{}}/>*/}
        <h1 className='xl-blog-detail-title'>{blog.title}</h1>
        <div className='xl-blog-detail-main'>
            {categoryRender}
            <div ref={blogContentRef} className='xl-blog-detail-content'
                 dangerouslySetInnerHTML={{__html: blog.htmlText}}/>
        </div>
    </div>
}

BlogDetail.layout = getDefaultLayout

export default BlogDetail
