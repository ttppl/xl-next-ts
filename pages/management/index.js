import {useRouter} from "next/router";
import {Button} from "antd";
import {getManagementLayout, ManagementLayoutContext} from "../../components/layouts/managementLayout";
import {useContext, useEffect} from "react";
Management.layout = getManagementLayout

function Management() {

    const router = useRouter()
    const layoutContext = useContext(ManagementLayoutContext)
    useEffect(()=> {
        layoutContext.setLoading(false)
    },[])
    return <div>
        <Button onClick={() => {
            router.push('/api/auth/logoutUser?'+Math.random())
        }}>out</Button>
        <Button onClick={() => {
            router.push('/management/blog/add?'+Math.random())
        }}>add</Button>
    </div>
}

export default Management
