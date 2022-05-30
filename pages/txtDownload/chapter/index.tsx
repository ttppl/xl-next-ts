import {decryptUrl, encryptUrl} from "../../../utils/dom";
import {getChapter,} from "../../../request/modules/txtDownloadRequest";
import {getDefaultLayout} from "../../../components/layouts/main";
import '../../../styles/pages/txtDownload/chapterDetail.scss'
import Link from "next/link";

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
    return <div className='xl-chapter-main'>
        <p className='xl-chapter-title'>{chapterInfo.name}</p>
        <div className='xl-pre-next-chapter'>
            <Link href={`/txtDownload/chapter?key=${encryptUrl(chapterInfo.pre)}`}>上一章</Link>
            <Link href={`/txtDownload/detail?key=${encryptUrl(chapterInfo.bookInfo)}`}>目录</Link>
            <Link href={`/txtDownload/chapter?key=${encryptUrl(chapterInfo.next)}`}>下一章</Link>
        </div>
        <div className='xl-chapter-content'>{chapterInfo.content?.replace(/\n\n/g,'\n')}</div>
        <div className='xl-pre-next-chapter'>
            <Link href={`/txtDownload/chapter?key=${encryptUrl(chapterInfo.pre)}`}>上一章</Link>
            <Link href={`/txtDownload/detail?key=${encryptUrl(chapterInfo.bookInfo)}`}>目录</Link>
            <Link href={`/txtDownload/chapter?key=${encryptUrl(chapterInfo.next)}`}>下一章</Link>
        </div>
    </div>
}

TxtChapterDetail.layout = getDefaultLayout
export default TxtChapterDetail
