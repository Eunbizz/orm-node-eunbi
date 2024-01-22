// 관리자 사이트 관리자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/admin/~

var express = require('express');
var router = express.Router();

var db = require('../models/index.js');
var Op = db.Sequelize.Op;

const bcrypt = require('bcryptjs');
const AES = require('mysql-aes');


router.get('/list', async (req, res, next) => {
  
  var admin = await db.Admin.findAll(
    {
      attributes: ['admin_member_id', 'email', 'admin_name', 'telephone', 'dept_name', 'used_yn_code', 'reg_date']
    }
  );

  res.render('admin/list.ejs', {admin});
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

  var admin = await db.Admin.findAll({where: whereClause});

  res.render('admin/list.ejs', {admin, searchOption});})


router.get('/create', async(req, res)=>{
  res.render('admin/create.ejs');
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var companyCode = req.body.companyCode;
  var adminId = req.body.adminId;
  var adminPassword = req.body.adminPassword;
  var email = req.body.email;
  var telephone = req.body.telephone;
  var deptName = req.body.deptName;
  var adminName = req.body.adminName;

  // 관리자 암호 단방향 암호화
  const encryptedPassword = await bcrypt.hash(adminPassword, 12);

  // 관리자 전화번호 양방향 암호화
  const encryptedTelephone = AES.encrypt(telephone, pocess.env.MYSQL_AES_KEY);

  var admin = {
    company_code:companyCode,
    admin_id:'eb',
    admin_password:encryptedPassword,
    admin_name:adminName,
    email,
    telephone:encryptedTelephone,
    dept_name:deptName,
    used_yn_code:1,
    reg_date:'2023-12-28'
  }
  
  await db.Admin.create(admin)

  res.redirect('/admin/list');
})

router.get('/modify/:id', async(req, res)=>{

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
router.get('/delete', async(req, res)=>{
    var adminIdx = req.query.aid;

  var deletedCnt = await db.Admin.destroy({where:{admin_member_id:adminIdx}});

  res.redirect('/admin/list', {deletedCnt});
})



module.exports = router;
