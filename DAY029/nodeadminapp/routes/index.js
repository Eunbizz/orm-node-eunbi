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


/* 
기능: 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/
 */
router.get('/', async(req, res, next)=> {
  res.render('index.ejs');
});


/* 
기능: 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/login
 */
router.get('/login', async(req, res, next)=> {
  res.render('login.ejs', {layout:false,resultMsg:""});
});

// 로그인 처리 및 응답, 로그인 완료 후 메인 페이지 이동 처리
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
      // step4.1: 암호가 동일할 경우 메인페이지 이동
      res.redirect('/');
    } else {
      // step4.2: 암호가 다른 경우
      resultMsg = "암호가 일치하지 않습니다."
      res.render('login.ejs', {layout:false,resultMsg});
    }
  }

  res.redirect('/');
});

module.exports = router;
