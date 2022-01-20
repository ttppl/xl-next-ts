import {useContext, useEffect} from "react";
import {ManagementLayoutContext} from "../components/layouts/managementLayout";


const useManagementFinished = () => {
    const layoutContext = useContext(ManagementLayoutContext)
    useEffect(() => {
        layoutContext?.setLoading?.(false)
    }, [])
    return layoutContext
}
export default useManagementFinished
