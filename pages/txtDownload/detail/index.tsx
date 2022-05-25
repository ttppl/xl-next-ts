import {decryptUrl, encryptUrl} from "../../../utils/dom";
import {getTxtInfo} from "../../../request/modules/txtDownloadRequest";
import {getDefaultLayout} from "../../../components/layouts/main";
import '../../../styles/pages/txtDownload/detail.scss'
import {useRouter} from "next/router";
import React, {MouseEventHandler, useRef, useState} from "react";
import {asyncDownloadFile, getClass} from "../../../utils";
import {Confirm} from "../../../components/common/Modal";
import Icon from "../../../components/common/Icon";
import Link from "next/link";
import setGlobalLoading from "../../../utils/libs/setGlobalLoading";

export async function getServerSideProps({query}: any) {
    const url = decryptUrl(query.key)
    const txtInfo = await getTxtInfo(url)
    return {
        props: {
            txtInfo:{
                ...txtInfo,
                href:url
            }
        }
    }
}

interface Chapter {
    name: string,
    url: string,
    chapterIndex: number,
}

interface Props {
    txtInfo: {
        name: string,
        href:string,
        author: string,
        coverImg:string,
        abstract: string,
        newestChapter: string,
        lastUpdateTime: string,
        chapterSplicer: string,
        chapters: Array<Chapter>
    }
}

function TxtDetail({txtInfo}: Props) {
    // 章节
    const [chapters,setChapters] = useState(txtInfo.chapters)
    // 排序
    const [positiveOrder,setPositiveOrder] = useState(true)
    // 切换排序
    const changeOrder=()=>{
        setChapters(chapters.reverse())
        setPositiveOrder(!positiveOrder)
    }
    // 下载模式
    const [downloadMode,setDownloadMode] = useState(false)
    // 选择的章节
    const [selectedChapter,setSelectedChapter] = useState([0,0])
    // 全选
    const selectAllToggle = ()=>{
        if(selectedChapter[0]!==1&&selectedChapter[1]!==chapters.length) {
            setSelectedChapter([1, chapters.length])
        }else {
            setSelectedChapter([0,0])
        }
    }
    // 选择需要下载的章节
    const selectChapter = (index:any)=>{
        const chapterIndex = parseFloat(index)
        const newChapterRange = [...selectedChapter]
        if (chapterIndex < Math.min(...selectedChapter) || chapterIndex > Math.max(...selectedChapter)) {
            newChapterRange[0] = Math.min(chapterIndex, ...selectedChapter)
            newChapterRange[1] = Math.max(chapterIndex, ...selectedChapter)
            setSelectedChapter(newChapterRange)
        } else {
            Confirm({
                zIndex: 1000,
                maskClosable: false,
                centered: true,
                title: '当前选中章节为？',
                onOk: () => {
                    newChapterRange[1] = chapterIndex
                    setSelectedChapter(newChapterRange)
                }, // 点击确定时要执行的事件
                onCancel: () => {
                    newChapterRange[0] = chapterIndex
                    setSelectedChapter(newChapterRange)
                },
                cancelText: '起始',
                okText: '终止'
            })
        }
    }


    // 下载txt文件

    // ws连接实例
    const wsRef = useRef<any>(null)
    // 文件模型对象
    const fileModel = useRef<any>({})
    // 消息面板是否可见
    const [isMsgPanelVisible, setIsMsgPanelVisible] = useState(false)
    // 下载进度
    const [downloadProgress, setDownloadProgress] = useState(0)
    // 显示消息
    const showServerMsg=(msg:string)=>{
        const container = document.getElementById('xl-ws-msg-panel')
        const msgBox = document.createElement('div')
        msgBox.innerHTML = msg
        container?.insertBefore(msgBox, container.firstChild)
    }
    // 开始下载
    const download = () => {
        setIsMsgPanelVisible(true)
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_BASE_WS_URL}/ws/downloadTxt`)
        wsRef.current = ws
        // 连接简历后发送参数
        ws.addEventListener('open', function (event) {
            showServerMsg('服务器已连接...')
            ws.send(JSON.stringify({
                name: txtInfo.name,
                href: txtInfo.href,
                chapters: selectedChapter,
                chapterSplicer:txtInfo.chapterSplicer
            }))
        })
        // 监听服务器发送的消息
        ws.addEventListener('message', function (event) {
            const msg = event.data
            if (msg.startsWith('$')) {
                showServerMsg(msg.slice(1))
            } else {
                const res = JSON.parse(msg)
                if (res?.id) {
                    fileModel.current = res
                }
            }
        })
        // 服务器下载完成关闭连接后下载文件到本地
        ws.addEventListener('close', function (event) {
            if (fileModel.current.id) {
                showServerMsg('异步下载文件中...')
                asyncDownloadFile(`${process.env.NEXT_PUBLIC_BASE_FILE_URL}${fileModel.current.id}`, {
                    fileName:`${fileModel.current.fileName}.${fileModel.current.fileType}`,
                    onProgress:(progress) => {
                        setDownloadProgress(progress * 100)
                    }
                }).then(() => {
                    setIsMsgPanelVisible(false)
                })
            }
        })
    }
    // 取消下载
    const cancelDownload = () => {
        console.log('取消下载...')
        wsRef.current?.close()
        setIsMsgPanelVisible(false)
    }
    return <div className='xl-txt-info-main'>
        <div className='xl-txt-info-header'>
            <img className='cover-img' src={txtInfo.coverImg||'https://ttppl.xyz/file/id/70'} alt='封面图'/>
            <div className='book-info'>
                <p className='book-name'>{txtInfo.name}</p>
                <p className='book-author'>{txtInfo.author}</p>
                <div className='book-other-info'>
                    <p>{txtInfo.lastUpdateTime}</p>
                    <p>{txtInfo.newestChapter}</p>
                </div>
                <div className='book-abstract' title={txtInfo.abstract}>
                    {txtInfo.abstract}
                </div>
            </div>
        </div>
        <div className='xl-mobile-abstract'>{txtInfo.abstract}</div>
        <div className={getClass(['xl-txt-info-chapters',{'download-mode':downloadMode}])}>
            <div className='xl-chapters-function-bar'>
                <div className='xl-button' onClick={changeOrder}>{!positiveOrder?'正序':'倒序'}</div>
                <div className='xl-button' onClick={()=>{setDownloadMode(!downloadMode)}}>{downloadMode?'阅读模式':'下载模式'}</div>
                {downloadMode && <div className='xl-button' onClick={selectAllToggle}>
                    {selectedChapter[0] !== 1 && selectedChapter[1] !== chapters.length ? '全选' : '全不选'}
                </div>}
                {downloadMode && <div className='xl-button' onClick={download}>下载</div>}
            </div>
            {chapters.map((chapter,index)=><ChapterItem
                disableRouter={downloadMode}
                active={downloadMode&&chapter.chapterIndex>=selectedChapter[0]&&chapter.chapterIndex<=selectedChapter[1]}
                onClick={()=>downloadMode&&selectChapter(chapter.chapterIndex)}
                chapter={chapter} key={chapter.name+index}/>)}
        </div>
        {isMsgPanelVisible&& <div id='xl-ws-msg-panel'>
            <Icon className='close close-icon' onClick={cancelDownload}/>
            <div>初始化连接...</div>
        </div>}
    </div>
}

function ChapterItem({chapter,active,disableRouter,...res}:{chapter:Chapter,active:boolean,onClick:any,disableRouter:boolean}){
    const toChapter = (event:any)=>{
        if(disableRouter){
            event.preventDefault()
        }
        setGlobalLoading(true,{label:`章节【${chapter.name}】准备中...`})
    }
    return <div {...res} className={getClass(['xl-txt-chapter-item',{active}])}>
        <Link href={{pathname:'/txtDownload/chapter',query:{key:encryptUrl(chapter.url)}}} passHref>
            <a className={getClass({"reading-mode":!disableRouter})}
               onClick={toChapter}>{chapter.name}</a>
        </Link>

    </div>
}

TxtDetail.layout = getDefaultLayout
export default TxtDetail
