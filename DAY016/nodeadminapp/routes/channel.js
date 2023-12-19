// 채팅방 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/channel/~

var express = require('express');
var router = express.Router();


router.get('/list', async(req, res, next)=>{

  const channel_list = {
    channel_id:1,
    community_id:1,
    category_code:1,
    channel_name:'hi',
    user_limit:100,
    channel_img_path:'image/1',
    reg_member_id:1,
    reg_date:'2023.12.19'
  }
  
  res.render('channel/list.ejs',{channel_list});
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

  const channel_list = {
    channel_id:channelId,
    community_id:1,
    category_code:1,
    channel_name:'hi',
    user_limit:100,
    channel_img_path:'image/1',
    reg_member_id:1,
    reg_date:'2023.12.19'
  }

  res.render('channel/modify.ejs', {channel_list})
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