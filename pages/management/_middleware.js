// eslint-disable-next-line @next/next/no-server-import-in-page
import {NextResponse} from 'next/server'
import {verify} from "jsonwebtoken";

export default async function middleware(req, ev) {
    const token = req.cookies['xl-web-login-token']
    const decoded = await verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return false
        return decoded
    });
    if (!decoded) {
        console.log('重定向到登录')
        return NextResponse.redirect(`/user/login`)
    } else {
        return NextResponse.next()
    }
}

