// 관리자 사이트 관리자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/admin/~

var express = require('express');
var router = express.Router();

var moment = require('moment');

const Admin = require('../schemas/admin');


router.get('/list', async (req, res, next) => {

  const admins = await Admin.find({});

  res.render('admin/list.ejs', { admins,moment });
});

router.post('/list', async(req, res)=>{

  // step1: 사용자가 선택/입력한 조회옵션 데이터 추출
  var deptName = req.body.deptName;
  var adminName = req.body.adminName;
  var telephone = req.body.telephone;

  var searchOption = {
    deptName, 
    adminName,
    telephone
  };

  // step2: 사용자가 입력/선택한 조회옵션 데이터를 기반으로 DB에서
  // 게시글 목록을 재조회해온다

  
  let query = {};
  
  if (searchOption.deptName) {
    query.dept_name = searchOption.deptName;
  }
  if (searchOption.adminName) {
    query.admin_name = searchOption.adminName;
  }
  if (searchOption.telephone) {
    query.telephone = searchOption.telephone;
  }
    
  const admins = await Admin.find(query);

  // step3: 게시글 목록 페이지 list.ejs
  res.render('admin/list.ejs', {admins, searchOption, moment});

});


router.get('/create', async(req, res)=>{
  res.render('admin/create.ejs');
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var companyCode = req.body.companyCode;
  var adminId = req.body.adminId;
  var adminPassword = req.body.password;
  var telephone = req.body.telephone;
  var deptName = req.body.deptName;
  var adminName = req.body.adminName;

  var admin = {
    company_code:companyCode,
    admin_id:adminId,
    admin_password:adminPassword,
    admin_name:adminName,
    telephone,
    dept_name:deptName,
    used_yn_code:1
  }
  
  await Admin.create(admin);

  res.redirect('/admin/list');
})

router.get('/modify/:id', async(req, res)=>{
  var adminId = req.params.id;

  var admin = await Admin.findOne({admin_member_id:adminId});

  res.render('admin/modify.ejs', {admin});
});

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{

  var adminId = req.params.id;

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var companyCode = req.body.companyCode;
  var adminId = req.body.adminId;
  var adminPassword = req.body.password;
  var telephone = req.body.telephone;
  var deptName = req.body.deptName;
  var adminName = req.body.adminName;

  var admin = {
    company_code:companyCode,
    admin_id:adminId,
    admin_password:adminPassword,
    admin_name:adminName,
    telephone,
    dept_name:deptName,
    used_yn_code:1
  }
  
  
  await Admin.updateOne({admin_member_id:adminId},admin);

  res.redirect('/admin/list');
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{

  var adminId = req.query.aidx;

  await Admin.deleteOne({admin_member_id:adminId});

  res.redirect('/admin/list');
})



module.exports = router;
