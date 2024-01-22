// 채팅방 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/channel/~

var express = require('express');
var router = express.Router();

var db = require('../models/index.js');
const Op = db.Sequelize.Op;


router.get('/list', async(req, res, next)=>{

  var channel = await db.Channel.findAll(
    {
      attributes: ['channel_id', 'category_code', 'channel_name', 'channel_desc', 'user_limit', 'channel_state_code', 'reg_member_id']
    }
  );

  
  res.render('channel/list.ejs',{channel});
});

router.post('/list', async(req, res)=>{

  var categoryCode = req.body.categoryCode;
  var channelName = req.body.channelName;
  var regMemberId = req.body.regMemberId;

  var searchOption = {
    category_code:categoryCode,
    channel_name:channelName,
    reg_member_id:regMemberId
  };

  var whereClause = {};

  if (searchOption.category_code) {
    whereClause.category_code = searchOption.category_code;
  }
  if (searchOption.channel_name) {
    whereClause.channel_name = searchOption.channel_name;
  }
  if (searchOption.reg_member_id) {
    whereClause.reg_member_id = searchOption.reg_member_id;
  }

  var channel = await db.Channel.findAll({where:whereClause})

  res.render('channel/list.ejs', {channel, searchOption});
})

/// 수정중
router.get('/create', async(req, res)=>{

  res.render('channel/create.ejs')
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{

  var categoryCode = req.body.categoryCode;
  var channelName = req.body.channelName;
  var channelDesc = req.body.channelDesc;
  var userLimit = req.body.userLimit;
  var regMemberId = req.body.regMemberId;
  var channelStateCode = req.body.channelStateCode;

  var channel = {
    community_id:1,
    category_code:categoryCode,
    channel_name:channelName,
    channel_desc:channelDesc,
    user_limit:userLimit,
    channel_state_code:channelStateCode,
    channel_state_code:1,
    reg_date:'2023-12-19',
    reg_member_id:regMemberId
  };

  await db.Channel.create(channel)

  res.redirect('/channel/list');
})

router.get('/modify/:id', async(req, res)=>{
  
  var channelId = req.params.id;
  
  var channel = await db.Channel.findOne({where:{channel_id:channelId}});

  res.render('channel/modify.ejs', {channel})
})

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var channelId = req.params.id;

  var categoryCode = req.body.categoryCode;
  var channelName = req.body.channelName;
  var channelDesc = req.body.channelDesc;
  var userLimit = req.body.userLimit;
  var regMemberId = req.body.regMemberId;
  var channelStateCode = req.body.channelStateCode;

  var channel = {
    community_id:1,
    category_code:categoryCode,
    channel_name:channelName,
    channel_desc:channelDesc,
    user_limit:userLimit,
    channel_state_code:channelStateCode,
    channel_state_code:1,
    reg_date:'2023-12-19',
    reg_member_id:regMemberId
  };

  var updatedCount = await db.Channel.update(channel,{where:{channel_id:channelId}});
  res.redirect('/channel/list')
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{
  var channelId = req.query.aid;

  var deletedCnt = await db.Channel.destroy({where:{channel_id:channelId}});
  res.redirect('/channel/list')
})



module.exports = router;