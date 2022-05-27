import TxtDownload from "./index";
import {search} from "../../request/modules/txtDownloadRequest";
import {decryptUrl} from "../../utils/dom";

export async function getServerSideProps({query}: any) {
    const pageSize = 10
    const keyWord = decryptUrl(query.key)
    const page = parseFloat(query.page?.slice(1)||'1')
    const books = keyWord!==''?(await search(keyWord)):[]
    return {
        props: {
            keyWord,
            books,
            total: 0,
            page,
            pageSize
        }
    }
}

export default TxtDownload
