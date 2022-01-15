import {useContext, useEffect} from "react";
import {ManagementLayoutContext} from "../components/layouts/managementLayout";


const useManagementFinished = () => {
    const layoutContext = useContext(ManagementLayoutContext)
    return useEffect(() => {
        layoutContext.setLoading(false)
    }, [])
}
export default useManagementFinished
