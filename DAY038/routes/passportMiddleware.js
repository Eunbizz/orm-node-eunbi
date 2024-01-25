
exports.isLoggedIn = (req, res, next) =>{
    if (req.isAuthenticated()) {
        // 사용자가 인증되어 있으면 다음 라우터로 이동
        next();
    } else {
        // 인증되어 있지 않으면 로그인 페이지로 이동
        res.redirect('/login');
    }
};

exports.isNotLoggedIn = (req, res, next) =>{
    if (!req.isAuthenticated()) {
        // 사용자가 인증되어 있지 않으면 다음 라우터로 이동
        next();
    } else {
        // 인증되어 있으면 메인 페이지로 이동
        res.redirect('/');
    }
}