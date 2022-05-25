import {decryptUrl, encryptUrl} from "../../../utils/dom";
import {getChapter,} from "../../../request/modules/txtDownloadRequest";
import {getDefaultLayout} from "../../../components/layouts/main";
import '../../../styles/pages/txtDownload/chapterDetail.scss'
import {useRouter} from "next/router";

export async function getServerSideProps({query}: any) {
    const url = decryptUrl(query.key)
    const chapterInfo = await getChapter(url)
    return {
        props: {
            chapterInfo
        }
    }
}

interface Props {
    chapterInfo: {
        name: string,
        content: string,
        pre: string,
        next: string,
        bookInfo:string
    }
}

function TxtChapterDetail({chapterInfo}: Props) {
    const router = useRouter()
    const toDetail = (url:string)=>{
        router.push(`/txtDownload/chapter?key=${encryptUrl(url)}`)
    }
    const toBookInfo = (url:string)=>{
        router.push(`/txtDownload/detail?key=${encryptUrl(url)}`)
    }
    return <div className='xl-chapter-main'>
        <p className='xl-chapter-title'>{chapterInfo.name}</p>
        <div className='xl-pre-next-chapter'>
            <span onClick={()=>toDetail(chapterInfo.pre)}>上一章</span>
            <span onClick={()=>toBookInfo(chapterInfo.bookInfo)}>目录</span>
            <span onClick={()=>toDetail(chapterInfo.next)}>下一章</span>
        </div>
        <div className='xl-chapter-content'>{chapterInfo.content?.replace(/\n\n/g,'\n')}</div>
        <div className='xl-pre-next-chapter'>
            <span onClick={()=>toDetail(chapterInfo.pre)}>上一章</span>
            <span onClick={()=>toBookInfo(chapterInfo.bookInfo)}>目录</span>
            <span onClick={()=>toDetail(chapterInfo.next)}>下一章</span>
        </div>
    </div>
}

TxtChapterDetail.layout = getDefaultLayout
export default TxtChapterDetail
