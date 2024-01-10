var express = require('express');
var router = express.Router();

var db = require('../models/index.js');
var Op = db.Sequelize.Op;

var bcrypt = require('bcryptjs')

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



module.exports = router;
