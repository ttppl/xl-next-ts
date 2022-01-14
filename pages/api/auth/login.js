// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {login} from "../../../request/modules/userReq";
import jwt from 'jsonwebtoken'
import {createCookie} from "../../../utils/libs/cookieParser";

export default async function handler(req, res) {
    console.log('登录中。。。')
    try {
        const user = await login(req.body.userName, req.body.password)
        const expireTime = 100000//小时
        const token = jwt.sign(user, process.env.SECRET, {expiresIn: `${expireTime}h`})
        res.setHeader(
            'Set-Cookie',
            [createCookie('xl-next-login-token', token, {httpOnly: true, path: '/'}),
                createCookie('user', user)]
        )

        res.redirect(307, '/management')
    }catch (e) {
        res.status(400).json({msg: `login failed : ${logRes.msg}`})

    }

    // console.log(user)
    // if (user) {
    //
    // } else {
    //
    // }
}
