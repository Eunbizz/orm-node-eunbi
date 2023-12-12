// 관리자 사이트 관리자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/admin/~

var express = require('express');
var router = express.Router();


router.get('/list', async (req, res, next) => {
  // Assume adminsData is an array of admin objects
  let adminsData = [
      { name: 'Admin 1', email: 'admin1@example.com' },
      { name: 'Admin 2', email: 'admin2@example.com' },
      // Add more admin objects as needed
  ];

  res.render('admin/list.ejs', { admins: adminsData });
});


router.get('/create', async(req, res)=>{
  res.render('admin/create.ejs');
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{
  res.redirect('/admin/list');
})

router.get('/modify/:id', async(req, res)=>{
  var adminId = req.params.id;

  res.render('admin/modify.ejs', {adminId});
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
