// 채팅 메시지 이력 정보 관리 라우팅 기능
// http://localhost:3000/message/~

var express = require('express');
var router = express.Router();

router.get('/list', async(req, res, next)=>{
  res.render('message/list.ejs');
});

router.get('/create', async(req, res)=>{
  res.render('message/create.ejs')
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{
  res.redirect('/message/list')
})

router.get('/modify/:id', async(req, res)=>{
  var messageId = req.params.id;

  res.render('message/modify.ejs', {messageId})
})

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var messageId = req.params.id;

  res.redirect('/message/list')
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{
  res.redirect('/message/list')
})


module.exports = router;
