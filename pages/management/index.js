import {useRouter} from "next/router";
import {Button} from "antd";

function Management() {
    const session = {a: 1111}
    const signOut = () => {
        console.log('out')
    }
    const router = useRouter()
    return <div>{JSON.stringify(session)}
        <Button onClick={() => {
            router.push('/api/auth/logoutUser?'+Math.random())
        }}>out</Button>
        <Button onClick={() => {
            router.push('/management/blog/add?'+Math.random())
        }}>add</Button>
    </div>
}

export default Management
