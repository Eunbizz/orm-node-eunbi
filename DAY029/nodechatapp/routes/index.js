var express = require('express');
var router = express.Router();

var db = require('../models/index.js');
var Op = db.Sequelize.Op;

var bcrypt = require('bcryptjs');

// jsonwebtoken 참조
const jwt = require('jsonwebtoken');

/* 임시메인- */
router.get('/', function(req, res, next) {
  res.render('channel/chat.ejs',{layout:"baseLayout"});
  //res.render('channel/chat.ejs',{layout:false});
});




/* 회원가입 웹페이지 요청과 응답*/
router.get('/entry', function(req, res, next) {
  res.render('entry');
});

/* 회원가입 사용자 입력정보 처리 요청과 응답*/
router.post('/entry', async(req, res, next)=>{

    //step1: 회원가입페이지에서 사용자가 입력한 회원정보 추출
    var email= req.body.email;
    var password= req.body.password;
    var name = req.body.name;

    // 사용자 암호 단방향 암호화 적용
    var bcryptedPassword = await bcrypt.hash(password,12);

    //step2: db신규 회원등록처리
    var member = {
      email,
      member_password:bcryptedPassword,
      name,
      profile_img_path:"",
      telephone:"",
      entry_type_code:1,
      use_state_code:1,
      reg_date:Date.now(),
      reg_member_id:0
    };

    await db.Member.create(member);

    //등록완료시 로그인 페이지로 이동시키지
    res.redirect('/login');
});





/* 로그인 웹페이지 요청과 응답*/
router.get('/login', function(req, res, next) {
  res.render('login.ejs', {resultMsg:""});
});

/* 로그인 사용자 입력정보 처리 요청과 응답*/
router.post('/login', async(req, res, next)=>{
  
  var email = req.body.email;
  var password = req.body.password;

  var member = await db.Member.findOne({where:{email:email}});

  var resultMsg = ""

  if (member == null) {
    resultMsg = "동일한 메일주소가 존재하지 않습니다."
    res.render('login.ejs', {resultMsg})
  } else {
    // 단방향 암호된 값을 비교해 동일번호 검증
    // result는 불린형 (true or false)
    var result = await bcrypt.compare(password, member.member_password)
    if (result) {
      res.redirect('/chat');
    } else {
      resultMsg = "암호가 일치하지 않습니다.";
      res.render('login.ejs', {resultMsg})
    }
  }
});





/* 암호찾기 웹페이지 요청과 응답*/
router.get('/find', function(req, res, next) {
  res.render('find.ejs');
});

/* 암호찾기 사용자 입력정보 처리 요청과 응답*/
router.post('/find', function(req, res, next) {
  res.render('find.ejs',{email:"",result:"Ok"});
});



/* JWT 토큰 생성 웹페이지 요청과 응답 */
router.get('/maketoken', async(req, res, next)=>{
  var token = "";

  res.render('maketoken.ejs',{layout:false, token});
});

/* JWT 토큰 생성하고 토큰 확인 */
router.post('/maketoken', async(req, res, next)=>{
  var token = "";

  // 1. 토큰에 담을 JSON 데이터 구조 및 데이터 바인딩
  // JWT 토큰 영역내 Payload 영역에 담김
  var jsonTokenData = {
    userid:req.body.userid,
    email:req.body.email,
    usertype:req.body.usertype,
    name:req.body.name,
    telephone:req.body.telephone
  };

  // 2. JSON 데이터를 JWT 토큰으로 생성
  // jwt.sign('토큰에 담을 JSON데이터',토큰인증키,옵션{expiresIn:'파기일지정',issuer:'만든회사'})
  // 파기일시 저장포맷: 30s, 60m, 24h, 200d
  token = await jwt.sign(jsonTokenData, process.env.JWT_SECRET,{expiresIn:'24h', issuer:'eunbi'});


  res.render('maketoken.ejs',{layout:false, token});
});


/* JWT 토큰 값을 수신하여 토큰값을 해석하기
- http://localhost:3000/readtoken?token=토큰값
*/
router.get('/readtoken', async(req, res, next)=>{
  var token = req.query.token;
  var tokenJsonData = {};

  // 토큰의 유효성을 검사하고 JSON 데이터를 추출한다
  //jwt.verify(JWT토큰값,”JWT토큰 생성시 사용한 동일한 인증키값”)
  try{
    var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);
  }catch(err){
    token = "유효하지 않은 토큰입니다."
    var tokenJsonData = {
      userid:"",
      email:"",
      usertype:"",
      name:"",
      telephone:""
    }
  }
  

  res.render('readtoken.ejs',{layout:false, token, tokenJsonData});
});



module.exports = router;
