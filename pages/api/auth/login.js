// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {login} from "../../../request/modules/userReq";
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    console.log('登录中。。。')
    const logRes = await login(req.body.userName, req.body.password)
    console.log(logRes)
    if (logRes?.success) {
        const expireTime= 10//小时
        var exp = new Date();
        exp.setTime(exp.getTime() + expireTime*60*60*1000);
        const user = logRes.data
        delete user.password
        const token = jwt.sign(user, process.env.SECRET, {expiresIn: `${expireTime}h`})
        // console.log(token)
        res.setHeader(
            'Set-Cookie',
            [`xl-web-login-token=${token};path=/;HttpOnly;expires=${exp.toGMTString()}`]
        );
        res.redirect(307, '/management')
    }else {
        // res.redirect(307, '/user/login')
        res.status(400).json({ msg: `login failed : ${logRes.msg}` })
        // res.end({message:'login failed'})
    }
}
