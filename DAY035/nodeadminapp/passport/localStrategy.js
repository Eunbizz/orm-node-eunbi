
var bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
var db = require('../models/index.js');

module.exports = passport =>{
    
    // passport.use('new LocalStrategy('로그인화면의 아이디/암호 UI 요소의 네임갑 설정',
    // 로그인처리함수정의(사용자가입력한아이디, 사용자가입력한암호, 후행콜백함수));
    passport.use(new LocalStrategy({
        usernameField:"id",
        passwordField:"password"
    },async(adminId, adminPWD, done)=>{
        // 사용자가 입력한 아이디/암호를 기반으로 로그인 기능을 구현
        try{
            // 1. 동일한 사용자 아이디 정보조회
            const admin = await db.Admin.findOne({where:{admin_id:adminId}});
            
            if(admin){
                // 2. 사용자 암호를 체크
                const result = await bcrypt.compare(adminPWD, admin.admin_password);

                if(result){
                    // 관리자 아이디 암호가 일치하는 경우
                    // 3. 로그인 관리자의 세션 정보 구조 정의 및 데이터 바인딩
                    var sessionLoginData = {
                        admin_member_id:admin.admin_member_id,
                        company_code:admin.company_code,
                        admin_id:admin.admin_id,
                        admin_name:admin.admin_name
                    };

                    // done(null, 세션으로 저장할 세션데이터)
                    done(null, sessionLoginData);

                }else{
                    // 관리자 암호가 일치하지 않은 경우
                    // done(null, 사용자세션데이터없으면 flase, {추가옵션데이터});
                    done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                }
            }else{
                // 동일한 아이디가 존재하지 않는 경우
                // done(null, 사용자세션데이터없으면 flase, {추가옵션데이터});
                done(null, false, {message:'아이디가 일치하지 않습니다.'});
            }
        }catch(err){
            done(err);
        };


    }));


}