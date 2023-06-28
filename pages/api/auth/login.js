// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {login} from "../../../request/modules/userRequest";
import jwt from 'jsonwebtoken'
import {createCookie} from "../../../utils/libs/cookieParser";

export default async function handler(req, res) {
    try {
        const loginRes = await login(req.body.userName, req.body.password)
        if(loginRes.success) {
            const user = loginRes.data
            const expireTime = 100000//小时
            const token = jwt.sign(user, process.env.SECRET, {expiresIn: `${expireTime}h`})
            res.setHeader(
                'Set-Cookie',
                [createCookie('xl-next-login-token', token, {httpOnly: true, path: '/'}),
                    createCookie('user', user)]
            )

            res.redirect(307, '/management')
        }else{
            res.status(400).json({msg: `login failed : ${loginRes.msg}`})
        }
    }catch (e) {
        res.status(400).json({msg: `login failed : ${e.toString()}`})

    }
}
