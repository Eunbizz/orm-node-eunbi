// 공통 페이지 제공(로그인, 회원가입, 암호찾기)

var express = require('express');
var router = express.Router();

// router.get('/', async(req, res)=>{
//   res.render('index.ejs')
// })

// 로그인 웹페이지 요청 및 응답
router.get('/login', async(req, res)=>{
  res.render('login.ejs')
});

// 로그인 처리 요청 및 응답, 로그인 완료 후 채팅 페이지 이동
router.post('/login', async(req, res)=>{
  var email = req.body.email;
  var password = req.body.password;

  user = {
    email,
    password
  };

  res.redirect('/chat')
});

// 회원가입 웹페이지 요청 및 응답
router.get('/entry', async(req, res)=>{
  res.render('entry.ejs')
});

// 회원가입 처리 요청 및 응답, 회원가입 완료 후 로그인 페이지 이동
router.post('/entry', async(req, res)=>{

  // step1: 회원가입페이지에서 사용자가 입력한 회원정보 추출
  var email = req.body.email;
  var password = req.body.password;

  // step2: db 신규 회원 등록 처리
  user = {
    email,
    password
  };

  // 등록완료시 로그인 페이지로 이동시키기
  res.redirect('/login')
});

// 암호 찾기 웹페이지 요청 및 응답
router.get('/find', async(req, res)=>{
  res.render('find.ejs')
});

// 암호찾기 처리 요청 및 응답,암호 찾기 완료 후 로그인 페이지 이동
router.post('/find', async(req, res)=>{
  
  res.redirect('/login')
});

module.exports = router;
