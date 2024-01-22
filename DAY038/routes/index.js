var express = require('express');
var router = express.Router();

// db객체 불러오기
var db = require('../models/index.js');
// Op객체 생성
const Op = db.sequelize.Op;

const bcrypt = require('bcryptjs');
const AES = require('mysql-aes');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
    const isLoggedIn = req.session && req.session.isLoggedIn;
    res.render('index', { 
    isLoggedIn: isLoggedIn 
    });
});


router.get('/login', async(req, res)=>{
    res.render('login',{resultMsg:"", id:"", pw:"", layout:"loginLayout"});
});


router.post('/login', async(req, res)=>{
    
    try{
        // 사용자 로그인정보 추출
        var id = req.body.id; 
        var pw = req.body.pw;   

        // DB admin 테이블에서 동일한 메일주소의 단일사용자 정보를 조회한다.
        var admin = await db.Admin.findOne({where:{admin_id:id}});

        var resultMsg = '';

        if (admin == null) {
            resultMsg = '관리자 정보가 등록되지 않았습니다.'
        } else {
            // 단방향 암호 일치 여부 체크
            var comparePassword = await bcrypt.compare(pw, admin.admin_password);
            // 입력한 패스워드가 db패스워드와 같을 때 세션 값 세팅 후 메인페이지로 이동
            if(comparePassword) {
                
                // 전화번호 복호화
                var decryptTelephone = AES.decrypt(admin.telephone, process.env.MYSQL_AES_KEY);

                // 서버에 메모리 공간에 저장할 로그인한 현재 사용자의 세션 정보 구조 및 데이터바인딩
                var sessionLoginData = {
                    admin_member_id:admin.admin_member_id,
                    company_code:admin.company_code,
                    admin_id:admin.admin_id,
                    admin_name:admin.admin_name,
                    telephone:decryptTelephone
                };

                // req.session 속성에 동적속성으로 loginAdmin 생성하고 값으로 세션값 세팅
                req.session.loginAdmin = sessionLoginData;

                // 동적속성에 저장된 신규속성 저장
                req.session.save(function(){
                    res.redirect('/');
                })
            } else {
                resultMsg = '암호가 일치하지 않습니다.'
            }
        }
        if(resultMsg !=='') {
            res.render('login', {resultMsg, id, pw, layout:"loginLayout"})
            // res.redirect('/login');
        }
    } catch(err) {
        res.status(500).send('Internal Server Error');
        console.log(err)
    }

});

router.get('/forgot_password', async(req, res)=>{
    res.render('login/forgot_password', {resultMsg:"", email:"", layout:"loginLayout"});
});

router.post('/forgot_password', async (req, res) => {
    try {
        var Email = req.body.email;

        // DB admin 테이블에서 동일한 메일주소의 단일사용자 정보를 조회한다.
        var email = await db.Admin.findOne({ where: { email: Email } });

        var resultMsg = '';

        if (email == null) {
            resultMsg = '등록되지 않은 이메일 입니다.';
        } else {
            // db의 email의 email과 == 내가 입력한 email이 같으면
            if (email.email == Email) {

                console.log(`메일찾기 완료 :${Email} 입니다.`);
                resultMsg = '메일찾기 완료'
            }
        }

        if (resultMsg !== '') {
            res.render('login/forgot_password', { resultMsg, email, layout: "loginLayout" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/register', async(req, res)=>{
    res.render('login/register', {resultMsg:"", layout:"loginLayout"});
});

router.post('/register', async(req, res)=>{

    try {
        // 회원가입 정보
        const {admin_id, email, password, name, telephone} = req.body;

        // 단방향 암호화
        var bcryptedPassword = await bcrypt.hash(password, 12);
        // 양방향 암호화
        var encryptTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);

        var admins = {
            company_code: "1",
            admin_id: admin_id,
            admin_password: bcryptedPassword,
            admin_name: name,
            email: email,
            telephone: encryptTelephone,
            dept_name:"관리부",
            used_yn_code: "1",
            reg_date: Date.now()
        };
        
        var register = await db.Admin.create(admins);

        var resultMsg = '';
        
        register.admin_password = "";
        register.telephone = AES.decrypt(encryptTelephone, process.env.MYSQL_AES_KEY);

        if (register == !null) {
            resultMsg = '회원가입 실패';
        } else {
            resultMsg = '회원가입 완료. 로그인 후 이용바랍니다'
        }

        res.render('login', {register, admins, resultMsg, layout:"loginLayout"});

    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false; 
    res.redirect('/login');
});

module.exports = router;
