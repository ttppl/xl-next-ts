import {createCookie} from "../../../utils/libs/cookieParser";

export default async function logoutUser(req, res) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    res.setHeader(
        'Set-Cookie',
        // [`xl-next-login-token=;path=/;expires=${exp.toGMTString()}`]
        [createCookie('xl-next-login-token','',{path:'/',expires:-1}),
        createCookie('user','',{expires:-1})]
    );
    res.redirect(307, '/management')
}
