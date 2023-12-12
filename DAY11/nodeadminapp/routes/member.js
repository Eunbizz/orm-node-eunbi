// 사용자 계정 정보(사용자 사이트에서 가입한 사용자 정보) 관리 라우팅 기능
// http://localhost:3000/member/~

var express = require('express');
var router = express.Router();


router.get('/list', async(req, res, next)=>{
  res.render('member/list.ejs');
});

router.get('/create', async(req, res)=>{
  res.render('member/create.ejs')
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{
  res.redirect('/member/list')
})

router.get('/modify/:id', async(req, res)=>{
  var memberId = req.params.id;

  res.render('member/modify.ejs', {memberId})
})

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var memberId = req.params.id;
  res.redirect('/member/list')
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{
  res.redirect('/member/list')
})


module.exports = router;
