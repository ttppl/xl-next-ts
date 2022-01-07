export default async function logoutUser(req, res) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    res.setHeader(
        'Set-Cookie',
        [`xl-web-login-token=;path=/;expires=${exp.toGMTString()}`]
    );
    res.redirect(307, '/management')
}
