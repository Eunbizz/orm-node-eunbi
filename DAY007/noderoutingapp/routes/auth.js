

// auth.js 라우터 파일은 회원 인증과 관련된 모든 사용자 요청과 응답을 처리
// 모든 라우터 파일은 기본 라우팅 주소 체계를 가짐 
// http://localhost:3000/라우터 파일의 기본 주소/라우팅 메소드의 주소
// http://localhost:3000/auth/라는 기본 주소로 해당 라우터 파일 내 모든 라우팅 메소드는 기본 주소를 갖는다

var express = require('express');
var router = express.Router();

// 기능: 로그인 웹페이지 사용자 요청과 응답처리 라우팅 메소드
// 호출주소: http://localhost:3000/auth/login
// 호출방식: GET
router.get('/login', function(req, res){

    res.render('auth/login.ejs')
});

// 기능: 로그인 웹페이지에서 사용자가 입력한 메일주소/암호를 받아 로그인 처리 요청과 응답처리 라우팅 메소드
// 호출 주소: http://localhost:3000/auth/login
// 호출 방식: POST
router.post('/login', function(req, res){

    // step1: 사용자 로그인 페이지에서 사용자가 입력한 메일 주소와 암호 값을 추출
    // 사용자가 입력한 값들은 웹브라우저를 통해 전달되기 때문에 req = HttpRequest 객체를 통해
    // 사용자가 입력한 값을 추출
    var email = req.body.email;
    var password = req.body.password;

    // step2: 모델을 이용해 동일한 메일 주소와 암호가 있는지 체크
    

    // step3: 정상적인 사용자 메일/암호인 경우 메인페이지로 사용자 웹페이지를 이동
    // res HttpResponse 객체에 redirect('도메인주소/하위주소') 메소드는 지정된 url 주소 체계로 사용자 웹페이지를 이동시켜줌
    // res.redirect('http://www.naver.com');
    res.redirect('/main');

});

// 로그아웃 요청 및 응답처리 라우팅 메소드
// http://localhost:300/auth/logout
// 요청 방식: GET
// 반환 방식: 특정 페이지 이동 처리
router.get('/logout', function(req, res){
    // step1: 로그아웃 처리
    // step2: 로그아웃 후 이동할 페이지 지정
    res.redirect('/main');
});

module.exports = router;

