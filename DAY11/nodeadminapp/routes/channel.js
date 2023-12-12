// 채팅방 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/channel/~

var express = require('express');
var router = express.Router();


router.get('/list', async(req, res, next)=>{
  res.render('channel/list.ejs');
});

router.get('/create', async(req, res)=>{
  res.render('channel/create.ejs')
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{
  res.redirect('/channel/list')
})

router.get('/modify/:id', async(req, res)=>{
  
  var channelId = req.params.id;

  res.render('channel/modify.ejs', {channelId})
})

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var channelId = req.params.id;
  res.redirect('/channel/list')
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{
  res.redirect('/channel/list')
})



module.exports = router;