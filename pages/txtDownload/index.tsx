import {getDefaultLayout} from "../../components/layouts/main";
import '../../styles/pages/txtDownload/index.scss'
import Icon from "../../components/common/Icon";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {BlogSearch} from "../../request/modules/txtDownloadRequest";
import {encryptUrl} from "../../utils/dom";
import Link from "next/link";
import setGlobalLoading from "../../utils/libs/setGlobalLoading";

export async function getServerSideProps({query}: any) {
    const pageSize = 10

    return {
        props: {
            books: null,
            total: 0,
            page: 1,
            pageSize
        }
    }
}

interface Props {
    keyWord: string,
    page: number,
    pageSize: number,
    total: number,
    books: Array<BlogSearch>
}

function TxtDownload(props: Props) {
    const [key, setKey] = useState(props.keyWord)
    const router = useRouter()
    const search = (e: any) => {
        e.preventDefault()
        setGlobalLoading(true, {label: '努力搜索中...'})
        router.push(`/txtDownload/p1?key=${encryptUrl(key)}`)
    }
    return <div className='txt-download-main'>
        <form action='/txtDownload/p1' className='xl-txt-download-search-form' method='get' onSubmit={search}>
            <input name='key' placeholder='请输入 “书名/作者” 搜索' value={key} onChange={(e) => setKey(e.target.value)}/>
            <button type='submit' className='xl-search-button'><Icon className='search'/></button>
        </form>
        <div className='xl-bool-list'>
            {props.books ? <table className='xl-book-list-table'>
                <tbody>
                <tr className='xl-table-title'>
                    <th>类型</th>
                    <th>书名</th>
                    <th>作者</th>
                    <th>最新章节</th>
                    <th>状态</th>
                    <th>更新时间</th>
                </tr>
                {props.books.map(((book, index) => <BookSearchItem book={book} key={index + book.href}/>))}
                {props.books.length===0&&<tr><td colSpan={6}>抱歉，小爬虫已经努力了！</td></tr>}
                </tbody>
            </table>:<div className='xl-bool-list-none'>
                <h2>推荐</h2>
                <p>推荐啥呀，自己搜！（趁网站还没把我拉黑之前😂...）</p>
            </div>}
        </div>

    </div>
}

function BookSearchItem({book}: { book: BlogSearch }) {
    const unknown = '[未知]'
    const router = useRouter()
    const toDetail = () => {
        setGlobalLoading(true, {label: 'loading 书籍详情...'})
        router.push(`/txtDownload/detail?key=${encryptUrl(book.href)}`)
    }
    return <tr className='xl-book-search-tr-item' onClick={toDetail}>
        <td><Link href={`/txtDownload/detail?key=${encryptUrl(book.href)}`}>{book.type || unknown}</Link></td>
        <td className='xl-book-title'>{book.name || unknown}</td>
        <td>{book.author || unknown}</td>
        <td>{book.newestChapter || unknown}</td>
        <td>{book.status || unknown}</td>
        <td>{book.updateTime || unknown}</td>
    </tr>
}

// function BookSearchItem({book}:{book:BlogSearch}){
//     return <div className='xl-book-search-item'>
//         <p className='xl-book-title'>{book.name}</p>
//         <p>作者：{book.author}</p>
//         <p>{book.newestChapter}</p>
//         <p>{book.type}</p>
//         <p>{book.status}</p>
//         <p>更新时间：{book.updateTime}</p>
//     </div>
// }

TxtDownload.layout = getDefaultLayout
export default TxtDownload
