// 공통 페이지 제공(로그인, 회원가입, 암호찾기)

var express = require('express');
var router = express.Router();

var db = require('../models/index.js');
var Op = db.Sequelize.Op;

// 로그인 웹페이지 요청 및 응답
router.get('/login', async(req, res)=>{
  res.render('login.ejs',{layout:"authLayout", resultMsg:""})
});

// 로그인 처리 요청 및 응답, 로그인 완료 후 채팅 페이지 이동
router.post('/login', async(req, res)=>{
  var email = req.body.email;
  var password = req.body.password;

  login = {
    email,
    member_password:password
  }

  var member = await db.Member.findOne({where:{email:login.email}});

  var resultMsg = '';

  if (member==null){
    resultMsg = '관리자 정보가 등록되지 않았습니다.'
  } else {
    if (member.member_password == login.member_password) {
      res.redirect('/chat');
    } else {
      resultMsg = '암호가 일치하지 않습니다.'
    }
  }
  
  if (resultMsg !== ''){
    res.render('login', {resultMsg, login, member})
  }
});

// 회원가입 웹페이지 요청 및 응답
router.get('/entry', async(req, res)=>{
  res.render('entry.ejs')
});

// 회원가입 처리 요청 및 응답, 회원가입 완료 후 로그인 페이지 이동
router.post('/entry', async(req, res)=>{

  // step1: 회원가입페이지에서 사용자가 입력한 회원정보 추출
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  var telephone = req.body.telephone;
  var birthDate = req.body.birthDate;
  var profileImgPath = req.body.profileImgPath;

  // step2: db 신규 회원 등록 처리
  member = {
    email,
    name,
    member_password:password,
    telephone,
    birth_date:birthDate,
    profile_img_path:profileImgPath
  };

  await db.Member.create(member)

  // 등록완료시 로그인 페이지로 이동시키기
  res.redirect('/login')
});

// 암호 찾기 웹페이지 요청 및 응답
router.get('/find', async(req, res)=>{
  res.render('find.ejs',{resultMsg:""})
});

// 암호찾기 처리 요청 및 응답,암호 찾기 완료 후 로그인 페이지 이동
router.post('/find', async(req, res)=>{
  try {
    var email = req.body.email;

    // DB admin 테이블에서 동일한 메일주소의 단일사용자 정보를 조회한다.
    var member = await db.Member.findOne({ where: { email: email } });

    var resultMsg = '';

    if (member == null) {
        resultMsg = '등록되지 않은 이메일 입니다.';
    } else {
        if (member.email == email) {
            resultMsg = member.member_password
        }
    }

    if (resultMsg !== '') {
        res.render('find', { resultMsg, email, layout: "authLayout" })
    }
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
});

module.exports = router;
