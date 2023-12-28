// 채팅 메시지 이력 정보 관리 라우팅 기능
// http://localhost:3000/message/~

var express = require('express');
var router = express.Router();

router.get('/list', async(req, res, next)=>{
  
  const message_list = {
    message_id:1,
    channel_id:1,
    member_id:1,
    nick_name:'eb',
    msg_type_code:1
  }
  res.render('message/list.ejs',{message_list});
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

  const message_list = {
    message_id:messageId,
    channel_id:1,
    member_id:1,
    nick_name:'eb',
    msg_type_code:1
  }

  res.render('message/modify.ejs', {message_list})
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
