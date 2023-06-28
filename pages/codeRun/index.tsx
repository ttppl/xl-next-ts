import {getDefaultLayout} from "../../components/layouts/main";
import '../../styles/pages/codeRun/index.scss'
import React, {useState} from "react";
import {CodeRunType, getCodeRunList} from "../../request/modules/codeRunRequest";
import Head from "next/head";
import XlPagination from "../../components/common/XlPagination";
import {getClass} from "../../utils";
import Icon from "../../components/common/Icon";
import useMobile from "../../hooks/useMobile";
import Link from "next/link";

export async function getServerSideProps({query}: any) {
    const pageSize = 12
    const codeRunList = await getCodeRunList({type: ['EXAMPLE', 'UTILS'],authority:['PUBLIC'], pageSize})
    return {
        props: {
            total: codeRunList.total,
            page: 1,
            pageSize,
            codeRunList: codeRunList.data
        }
    }
}

interface Props {
    page: number,
    pageSize: number,
    total: number,
    codeRunList: Array<CodeRunType>
}

function CodeRunIndex({codeRunList, pageSize, page, total}: Props) {
    const {isMobile} = useMobile()
    return <>
        <Head>
            <title>CodeRun</title>
            <meta name="description" content="codeRun本地测试"/>
            <link rel="icon" href="/my_favicon.ico"/>
        </Head>
        <div className='xl-code-run-index'>
            <p className='xl-title'>本地测试示例</p>
            <div className='xl-code-run-list'>{codeRunList.map(codeRun => {
                return <CodeRunCube key={`code-run-${codeRun.id}`} codeRun={codeRun} isMobile={isMobile}/>
            })}
            </div>
            <XlPagination
                defaultPageSize={pageSize}
                defaultCurrent={page}
                pageUrl={(page: number) => {
                    return `/codeRun/p${page}`
                }}
                total={total}
            />
        </div>

    </>
}

function CodeRunCube({codeRun,isMobile}: { codeRun:CodeRunType,isMobile:boolean }){
    const [showDetail,setShowDetail] = useState(false)

    const mobileShowDetail = (e:Event) => {
        e.stopPropagation()
        e.preventDefault()
        setShowDetail(true)
    }
    return <Link passHref href={`/codeRun/detail/${codeRun.id}`}>
        <a className='xl-code-run-container'>
            <div className={getClass(['xl-code-run',{'active':showDetail}])}
                 onMouseOver={()=>!isMobile&&setShowDetail(true)}
                 onMouseLeave={()=>setShowDetail(false)}>
                <div className='xl-code-run-face'>
                    <p className='xl-code-run-title'>{codeRun.title}</p>
                    <img
                        src={codeRun.coverImg ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}${codeRun.coverImg}` : process.env.NEXT_PUBLIC_DEFAULT_COVER_IMG_URL + '?t=' + codeRun.id}/>
                    {isMobile&&<Icon className='search xl-code-run-detail-icon' onClick={mobileShowDetail}/>}
                </div>
                <div className='xl-code-run-detail'>
                    <p className='xl-code-run-title'>{codeRun.title}</p>
                    <p className='xl-code-run-info'>类型：{codeRun.type}</p>
                    <p className='xl-code-run-info'>脚本：{codeRun.scriptLanguage}</p>
                    <p className='xl-code-run-info'>样式：{codeRun.styleLanguage}</p>
                    <p className='xl-code-run-info'>标记：{codeRun.xmlLanguage}</p>
                    <p className='xl-code-run-info'>更新：{codeRun.modifyTimestamp}</p>
                </div>
            </div>
        </a>
    </Link>
}

CodeRunIndex.layout = getDefaultLayout
export default CodeRunIndex
