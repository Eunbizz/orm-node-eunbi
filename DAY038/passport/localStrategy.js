const LocalStrategy = require('passport-local').Strategy;
var db = require('../models/index.js');
var bcrypt = require('bcryptjs');

module.exports= passport =>{
    passport.use(
        new LocalStrategy({
            usernameField: 'id', // 로그인 페이지의 사용자 아이디 UI Input 요소 name값
            passwordField: 'pw'
        },
        async(id, pw, done) =>{
            try {
                // 1. 동일한 사용자 아이디 정보조회
                const admin = await db.Admin.findOne({where:{admin_id:id}});

                if (admin){
                    const result = await bcrypt.compare(pw, admin.admin_password);

                    if (result){
                        var sessionLoginData = {
                            admin_member_id:admin.admin_member_id,
                            company_code:admin.company_code,
                            admin_id:admin.admin_id,
                            admin_name:admin.admin_name
                        };
                        done(null, sessionLoginData);
                    } else {
                        done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                    }
                } else {
                    done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                }
            } catch(err){
                done(err);
            }
        })
    )
}