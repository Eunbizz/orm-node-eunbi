// 관리자 사이트 관리자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/admin/~

var express = require('express');
var router = express.Router();


router.get('/list', async (req, res, next) => {
  
  const admin = {
    company_code:1,
    admin_id:'eb',
    admin_password:1020,
    admin_name:'김은비',
    email:'eb@gmail.com',
    telephone:'12345',
    dept_name:'123',
    used_yn_code:1,
    reg_date:"2023.12.19"
  }

  res.render('admin/list.ejs', { admin });
});


router.get('/create', async(req, res)=>{
  res.render('admin/create.ejs');
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var companyCode = req.body.company_code;
  var adminId = req.body.admin_id;
  var adminPassword = req.body.admin_password;
  var email = req.body.email;
  var telephone = req.body.telephone;
  var deptName = req.body.dept_name;

  var admin = {
    companyCode,
    adminId,
    adminPassword,
    email,
    telephone,
    deptName
  }

  res.redirect('/admin/list');
})

router.get('/modify/:id', async(req, res)=>{
  var adminId = req.params.id;

  const admin = {
    company_code:1,
    admin_id:'eb',
    admin_password:1020,
    admin_name:'김은비',
    email:'eb@gmail.com',
    telephone:'12345',
    dept_name:'123',
    used_yn_code:1,
    reg_date:"2023.12.19"
  }

  res.render('admin/modify.ejs', {admin});
});

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var adminId = req.params.id;
  res.redirect('/admin/list');
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{
  var adminId = req.query.aidx;
  res.redirect('/admin/list');
})



module.exports = router;
