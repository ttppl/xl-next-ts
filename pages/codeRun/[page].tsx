import React from "react";
import CodeRunIndex from "./index";
import {getCodeRunList} from "../../request/modules/codeRunRequest";

export async function getServerSideProps({query}: any) {
    const pageSize = 12
    const page = parseFloat(query.page?.slice?.(1))||1
    const codeRunList = await getCodeRunList({type:['EXAMPLE','UTILS'],pageSize,page})
    return {
        props: {
            total: codeRunList.total,
            page: 1,
            pageSize,
            codeRunList:codeRunList.data
        }
    }
}

export default CodeRunIndex
