var express = require('express');
var router = express.Router();

// multer 멀티 업로드 패키지 참조
var multer = require('multer');

//파일저장위치 지정
var storage  = multer.diskStorage({ 
  destination(req, file, cb) {
    cb(null, 'public/upload/');
  },
  filename(req, file, cb) {
    cb(null, `${moment(Date.now()).format('YYYYMMDDHHMMss')}__${file.originalname}`);
  },
});

//일반 업로드처리 객체 생성
var upload = multer({ storage: storage });

var bcrypt = require('bcryptjs');

var db = require('../models/index');
var Op = db.Sequelize.Op;

var sequelize = db.sequelize;
const{ QueryTypes } = sequelize;

// 로그인 여부 체크 사용자 권한 세션 미들웨어 참조
// const {isLoggedIn, isNotLoggedIn} = require('./sessionMiddleware');
const {isLoggedIn, isNotLoggedIn} = require('./passportMiddleware');

// passport 객체 참조
const passport = require('passport');



/* 
기능: 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/
 */
router.get('/', isLoggedIn, async(req, res, next)=> {

  // 현재 로그인한 사용자 세션 정보 추출하기

  // 1) 일반세션 기반 로그인 사용자 정보 추출
  // var admin_id = req.session.loginUser.admin_id;

  // 2) 패스포트 세션 기반 로그인 사용자 정보 추출
  var admin_id = req.session.passport.user.admin_id;
  
  res.render('index.ejs');
});


/* 
기능: 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/login
 */
router.get('/login', isNotLoggedIn, async(req, res, next)=> {
  res.render('login.ejs', {layout:false,resultMsg:""});
});

/* 
기능: 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅 메소드 -일반세션(express-session기반)
호출주소: http://localhost:3000/login
 */
router.post('/login', async(req, res, next)=>{

  // step1: 사용자 입력 아이디/암호 추출
  var adminId = req.body.id;
  var password = req.body.password;

  // step2: 동일한 아이디 사용자 정보 조회
  var member = await db.Admin.findOne({where:{admin_id:adminId}});

  var resultMsg = "";

  if (member==null) {
    resultMsg = '동일한 아이디가 존재하지 않습니다.'
    res.render('login.ejs', {layout:false,resultMsg});
  } else {

    // step3: 사용자 암호 체크(db에 저장된 암호와 사용자 입력한 암호 체크)
    // bcrypt를 이용한 암호체크: bcrypt.compare(사용자입력값, 암호화되어 저장된값)
    var passwordResult = await bcrypt.compare(password, member.admin_password)
    if(passwordResult){
      // step4.0: 아이디/암호가 일치하는 사용자인 경우 해당 사용자의 주요정보를 세션에 저장

      // 서버에 메모리 공간에 저장할 로그인한 현재 사용자의 세션정보 구조 및 데이터바인딩
      var sessionLoginData = {
        admin_member_id:member.admin_member_id,
        company_code:member.company_code,
        admin_id:member.admin_id,
        admin_name:member.admin_name
      };

      // req.session 속성에 동적속성으로 loginUser라는 속성을 생성하고 값으로 세션 json 값을 세팅
      req.session.loginUser = sessionLoginData;

      // 관리자 로그인 여부 세션 속성 추가하기
      req.session.isLogined = true;

      // 반드시 req.session.save() 메소드를 호출해서 동적속성에 저장된 신규속성을 저장
      // save() 호출과 동시에 쿠키파일이 서버에서 생성되고 생성된 쿠키 파일이 
      // 현재 사용자 웹브라우저에 전달되어 저장된다
      // 저장된 쿠키파일은 이후 해당 사이트 요청이 있을 때마다 무조건 전달된다
      // 전달된 쿠키정보를 이용해 서버메모리상의 세션정보를 이용해 로그인한 사용자 정보를 추출  
      req.session.save(function(){
        // step4.1: 암호가 동일할 경우 메인페이지 이동
      res.redirect('/');
      });

      
    } else {
      // step4.2: 암호가 다른 경우
      resultMsg = "암호가 일치하지 않습니다."
      res.render('login.ejs', {layout:false,resultMsg});
    }
  }

});


/* 
기능: 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅 메소드 -패스포트 로컬전략기반 로그인(passport)
호출주소: http://localhost:3000/login
 */
router.post('/passportLogin', async(req, res, next)=>{

  // 패스포트 기반 로그인 인증처리 메소드 호출하여 패스포트 기반으로 로그인 실시
  // passport.authenticate('로그인전략=local',패스포트 로그인 후 수행되는 콜백함수=done('패스포트실행결과-(정상,에러), 세션데이터, 추가메시지))
  passport.authenticate('local',(authError, admin, info)=>{
    // 패스포트 인증시 에러가 발생하는 경우 에러값 반환
    if(authError){
      console.log(authError);
      return next(authError);
    }
    // 로컬 전략 파일에서 전달된 관리자 세션 데이터가 전달이 안된 경우 
    // 동일 아이디와 암호가 없는 경우 done('',false) 두번째 파라미터의 값이 false로 전달됨
    // 아이디 암호가 틀린 경우
    if(!admin){
      // flash 패키지 설치 필요 - 서버기반에서 특정 페이지 이동시 바로 전에 특정데이터를 전달해주고 싶을 때 사용
      // req.flash('키명',키값)
      req.flash('loginError',info.message); 
      return res.redirect('/login');
    }

    // 정상적으로 passport 인증이 완료된 경우
    // req.login('세션으로 저장할 사용자데이터',처리결과콜백함수(login실행시 발생한 에러))은 passport 기반 정상 인증이 완료되면 passport 세션을 생성해주는 기능 제공
    return req.login(admin,(loginError)=>{
      if(loginError){
        console.log(loginError);
        return next(loginError);
      }

      // 정상적으로 세션데이터가 세션에 반영된 경우 처리
      return res.redirect('/'); // 메인 페이지로 이동
    });


  })(req,res,next);
})


// 사용자 로그아웃 처리 라우팅 메소드 - passport 전용 로그아웃
// http://localhost:3001/logout
router.get('/logout', isLoggedIn, async(req,res)=>{
  
  req.logout(function(err){
    // 로그아웃하고 로그인 페이지로 이동 시키기 
    req.session.destroy();
    res.redirect('/login');
  });
});


module.exports = router;
