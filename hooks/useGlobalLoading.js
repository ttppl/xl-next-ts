import {useEffect} from "react";
import setGlobalLoading from "../utils/libs/setGlobalLoading";


const useGlobalLoading = (show, options) => {
    useEffect(() => {
        setGlobalLoading(show, options)
    }, [show,options])
}
export default useGlobalLoading
//
// const useLoading = (show:boolean) => {
//
//     let div = useRef(null)
//     const [showLoading, setShowLoading] = useState(show)
//     useEffect(() => {
//         const targetDom = document.body
//         div.current = div.current || document.createElement('div')
//         div.current.className=getClasses(['xl-loading-container','mask'])
//
//         if (showLoading) {
//             ReactDOM.render(<Loading {...props} />, div.current)
//             targetDom.appendChild(div.current)
//         } else {
//             ReactDOM.unmountComponentAtNode(div.current)
//             if (targetDom.contains(div.current)) {
//                 targetDom.removeChild(div.current)
//             }
//
//         }
//         return ()=>{
//             ReactDOM.unmountComponentAtNode(div.current)
//             if (targetDom.contains(div.current)) {
//                 targetDom.removeChild(div.current)
//             }
//             removeListenerRS(clickListener)
//         }
//     }, [show])
//
//     return [showLoading, setShowLoading]
// }
// export default useLoading
