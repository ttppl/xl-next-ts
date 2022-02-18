import Head from 'next/head'
import React, {useCallback, useEffect, useRef, useState} from "react";
import {getBlogById} from "../../../request/modules/blogRequest";
import {getDefaultLayout} from "../../../components/layouts/main";
import '../../../styles/pages/blog/blogDetail.scss'
import 'highlight.js/styles/xcode.css';
import Icon from "../../../components/Icon";
import useRunnableScript from "../../../hooks/useRunnableScript";
import {useRouter} from "next/router";
import useGlobalLoading from "../../../hooks/useGlobalLoading";
import {getClasses, getScrollTop, scrollTo} from "../../../utils/dom";
import {addListener, removeListenerRS} from "../../../utils/libs/EventManager";
import lodash from 'lodash'

BlogDetail.layout = getDefaultLayout


export async function getServerSideProps({req, res, params}) {
    const blogId = params.blogId
    const blog = await getBlogById(blogId)
    return {
        props: {
            blog
        }
    }
}

function BlogDetail({blog}) {
    useGlobalLoading(false)
    useRunnableScript()
    const router = useRouter()
    const back = () => {
        router.back()
    }
    const blogContentRef = useRef(null)
    const [category, setCategory] = useState([])
    const [activeCategory, setActiveCategory] = useState('')
    const [categoryOffset, setCategoryOffset] = useState(0)
    const anchoring = useRef(false)
    const getHead = (parent, level) => {
        const category = []
        Array.from(blogContentRef.current.children).forEach(node => {
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName?.toLowerCase())) {
                category.push({
                    id: node.id,
                    level: parseFloat(node.tagName.slice(1)),
                    text: node.id,
                })

            }
        })
        const formatCategory = (categoryArray) => {
            const newCategory = []
            categoryArray.some((categoryItem, index) => {
                const last = newCategory[newCategory.length - 1]
                if (newCategory.length > 0 && last.level < categoryItem.level) {
                    const nextSibling = categoryArray.slice(index).findIndex(item => item.level <= last.level)+index
                    if (nextSibling - index > 1) {
                        last.children = formatCategory(categoryArray.slice(index, nextSibling))
                        newCategory.push(...formatCategory(categoryArray.slice(nextSibling)))
                        return true
                    } else {
                        last.children = [categoryItem]
                    }

                } else {
                    newCategory.push(categoryItem)
                }
            })
            return newCategory
        }
        return formatCategory(category)
    }

    const categoryRender = useCallback(()=>{
        const renderer = (category)=>{
            return category.map((categoryItem, index) => {
                    if(categoryItem.children){
                        return <ul className='xl-blog-detail-sub-category'>
                            {renderer(categoryItem.children)}
                        </ul>
                    }else {
                        return <li
                            className={getClasses(['xl-blog-detail-category-item', categoryItem.id === activeCategory && 'active'])}
                            // style={{paddingLeft: `${(categoryItem.level - 2) * 20}px`}}
                            onClick={() => anchorTo(categoryItem.id)}
                            key={`categoryItem-${index}`}
                        >
                            {categoryItem.text}
                            <div className='item-bar'/>
                        </li>
                    }
                })}
        return <ul className='xl-blog-detail-category' style={{transform: `translateY(${categoryOffset}px)`}}>
            {renderer(category)}
        </ul>
    },[category,categoryOffset])

    const anchorTo = (id) => { // 锚点跳转
        const anchorElement = document.getElementById(id)
        if (anchorElement) {
            scrollTo(document.documentElement, anchorElement, -20)
            setActiveCategory(id)
            anchoring.current = true
        }
    }
    useEffect(() => {
        const category = getHead(blogContentRef.current, 2)
        setCategory(category)
        setActiveCategory(category[0]?.id)
        const scrollListener = addListener(document, 'scroll', lodash.debounce((e) => {
            const scrollTop = getScrollTop()
            setCategoryOffset(Math.max(scrollTop - 80, 0))
            category.some((categoryItem, index) => {
                if (document.getElementById(categoryItem.id)?.getBoundingClientRect()?.top > 21) {
                    if (!anchoring.current) {
                        setActiveCategory(category[index - 1]?.id || categoryItem.id)
                    } else {
                        anchoring.current = false
                    }
                    return true
                }
            })
        }, 300))
        return () => {
            removeListenerRS(scrollListener)
        }
    }, [])
    return <div className='xl-blog-detail'>
        <Head>
            <title>博客详情</title>
            <meta name="description" content="博客详细内容"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <Icon className='back' onClick={back}/>
        <h1 className='xl-blog-detail-title'>{blog.title}</h1>
        <div className='xl-blog-detail-main'>
            {categoryRender()}
            <div ref={blogContentRef} className='xl-blog-detail-content'
                 dangerouslySetInnerHTML={{__html: blog.htmlText}}/>
        </div>
    </div>
}


export default BlogDetail
