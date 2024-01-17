// 관리자 사이트 관리자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/admin/~

var express = require('express');
var router = express.Router();

// bcryptjs 단방향 암호화 패키지 참조
const bcrypt = require('bcryptjs');

var db = require('../models/index.js');
var Op = db.Sequelize.Op;

// 로그인 여부 체크 사용자 권한 세션 미들웨어 참조
const {isLoggedIn, isNotLoggedIn} = require('./sessionMiddleware');


router.get('/list', isLoggedIn, async (req, res, next) => {
  
  var admins = await db.Admin.findAll(
    {
      attributes: ['admin_member_id', 'email', 'admin_name', 'telephone', 'dept_name', 'used_yn_code', 'reg_date']
    }
  );

  res.render('admin/list.ejs', {admins});
});

router.post('/list', async(req, res)=>{
  // step1: 사용자가 선택/입력한 조회옵션 데이터 추출
  var email = req.body.email;
  var adminName = req.body.adminName;
  var telephone = req.body.telephone;

  var searchOption = {
    email, 
    admin_name:adminName,
    telephone
    };
  
  var whereClause = {};

  if (searchOption.email) {
    whereClause.email = searchOption.email;
  }
  if (searchOption.admin_name) {
    whereClause.admin_name = searchOption.admin_name;
  }
  if (searchOption.telephone) {
    whereClause.telephone = searchOption.telephone;
  }

  var admins = await db.Admin.findAll({where: whereClause});

  res.render('admin/list.ejs', {admins, searchOption});})


router.get('/create', isLoggedIn, async(req, res)=>{
  res.render('admin/create.ejs');
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var companyCode = req.body.companyCode;
  var adminPassword = req.body.adminPassword;
  var telephone = req.body.telephone;
  var deptName = req.body.deptName;
  var adminName = req.body.adminName;
  var adminId = req.body.adminId;
  var email = req.body.email;

  // 관리자 암호를 해시알고리즘 기반 단방향 암호화 적용하기
  // bcrypt.hash('암호화할문자', 암호화변환횟수)
  const encryptedPassword = await bcrypt.hash(adminPassword, 12);
  
  // step2: 추출된 데이터를 기반으로 DB 입력 객체  생성
  var admin = {
    company_code:companyCode,
    admin_id:adminId,
    admin_password:encryptedPassword,
    admin_name:adminName,
    email,
    telephone,
    dept_name:deptName,
    used_yn_code:1,
    reg_date:Date.now()
  }
  
  await db.Admin.create(admin)

  res.redirect('/admin/list');
})

router.get('/modify/:id', isLoggedIn, async(req, res)=>{

  var adminIdx = req.params.id;

  var admin = await db.Admin.findOne({where:{admin_member_id:adminIdx}});

  res.render('admin/modify.ejs', {admin});
});

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var adminIdx = req.params.id;

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var companyCode = req.body.companyCode;
  var adminPassword = req.body.adminPassword;
  var email = req.body.email;
  var telephone = req.body.telephone;
  var deptName = req.body.deptName;
  var adminName = req.body.adminName;

  var admin = {
    company_code:companyCode,
    admin_name:adminName,
    admin_password:adminPassword,
    email,
    telephone,
    dept_name:deptName
  }

  var updatedCount = await db.Admin.update(admin,{where:{admin_member_id:adminIdx}});
  res.redirect('/admin/list');
})

// 목록페이지 이동처리
router.get('/delete', isLoggedIn, async(req, res)=>{
  var adminIdx = req.query.aid;

  var deletedCnt = await db.Admin.destroy({where:{admin_member_id:adminIdx}});

  if (deletedCnt > 0){
    res.redirect('/admin/list');
  } else{
    res.send('No matching admin found for deletion')
  }

});



module.exports = router;
