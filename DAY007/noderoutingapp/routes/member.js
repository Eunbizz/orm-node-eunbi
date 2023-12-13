
// 기능: 각종 회원 정보 처리 요청과 응답 처리 라우팅 파일
// 약관 페이지 요청 응답, 회원가입 웹페이지 요청과 응답처리
// 기본 라우팅 주소: http://localhost:3000/member/~
// 사용자가 링크 클릭이나 url을 직접 입력한 주소가 위에 주소이면
// 노드앱의 app.js의 참조된 라우터 파일 중 해당 /member/~기본 주소를 관리하는 해당 라우터 파일을 먼저 찾고
// 그 다음에 사용자가 요청한 /member/entry entry 라우팅 메소드 주소로 바인딩 된 라우팅 메소드를 찾아
// 요청과 응답을 해당 라우팅 메소드에서 처리

// package.json에 express가 설치되어있고, 이를 참조
var express = require('express');
var router = express.Router();

// 사용자가 요청하는 방식(get, post.. )과 주소(/join)가 동일한 라우팅 메소드를 찾음
// 기능: 사용자 가입 약관 웹페이지에 대한 요청과 응답 처리 라우팅 메소드
// 요청방식: GET
// 요청주소: http://localhost:3000/member/join
// 응답결과: 회원약관웹페이지 전달(join.ejs뷰)
router.get('/join', function(req, res){

    // 뷰파일의 물리적 전체 경로가 들어감
    res.render('member/join.ejs')
});

// 기능: 신규 회원 직접 가입 웹페이지 요청과 응답 처리 라우팅 메소드
// 요청방식: GET
// 요청주소: http://localhost:3000/member/entry
// 응답결과: 회원가입 웹페이지(html, css, js=views/member/entry.ejs)
router.get('/entry', function(req, res){
    res.render('member/entry.ejs')
});


// 기능: 사용자가 입력한 회원 정보 DB 처리하고 로그인페이지로 이동시키는 요청과 응답처리 라우팅 메소드
// 요청방식: POST
// 요청주소: http://localhost:3000/member/entry
router.post('/entry', function(req, res){

    // step1: 사용자가 입력한 회원가입정보를 추출
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var telephone = req.body.telephone;

    // step2: DB에 member 테이블에 동일한 사용자 메일주소가 있는지 체크

    // step3: 메일주소가 중복되지 않으면 신규회원으로 해당 사용자 정보를 member 테이블에 저장
    var member = {
        email,
        password,
        name,
        telephone,
        entryDate: Date.now()
    }

    // step4: 데이터가 정상적으로 등록된 경우 사용자 웹페이즈를 로그인 페이지로 이동

    // 중요: 링크 URL 주소가 들어감
    res.redirect('/auth/login')
});


// 중요: 라우터 파일은 반드시 해당 라우터 객체를 exports를 통해 노출시켜줘야
// 노드 어플리케이션에 인식
module.exports = router;