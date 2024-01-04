// 공통기능 제공(관리자 사이트 로그인/메인 대시보드)

var express = require('express');
var router = express.Router();

/* 관리자 사이트 메인-대시보드*/
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Express' });
});

// 관리자 로그인 웹페이지 요청 및 응답
router.get('/login', function(req, res, next) {
  res.render('loginLayout.ejs', {layout:"loginLayout"});
});


// 로그인 처리 및 응답, 로그인 완료 후 메인 페이지 이동 처리
router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  var member = {
    email,
    password
  };

  res.redirect('/');
});




module.exports = router;
