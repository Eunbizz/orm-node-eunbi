const express = require('express');
const router = express.Router();

// db객체 불러오기
var db = require('../models/index.js');
// Op객체 생성
const Op = db.sequelize.Op;


// 리스트 
router.get('/list', async(req, res) => {

    try {
        var ChannelMessage = await db.ChannelMessage.findAll(
            {
                order: [['channel_msg_id', 'ASC']]
            }
        );
        res.render('message/list', {ChannelMessage});
    }catch(err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }
});


router.get('/create', async(req, res) => {
    res.render('message/create', { value: '4' });
});

// 채널 메시지 생성
router.post('/create', async(req, res) => {
  // 생성 처리 로직
    const {msg_type_code, msg_state_code, nick_name, message, ip_address, msg_date} = req.body;

    var createMsg = {
        msg_type_code: msg_type_code,
        msg_state_code:msg_state_code,
        channel_id:1,
        member_id:1,
        connection_id: "robin",
        message: message,
        ip_address:ip_address,
        msg_date: Date.now(),
        nick_name: nick_name,
    }

    await db.ChannelMessage.create(createMsg);
    res.render('message/list', {createMsg});
});

// 아직 삭제 미구현
// 구현하기
router.get('/delete', async(req, res) => {
    // 삭제 처리 로직
    res.redirect('/message/list');
});


// 수정 불러오기
router.get('/modify/:id', async(req, res) => {
    var channel_msg_id = req.params.id;

    var ChannelMessage = await db.ChannelMessage.findOne({where:{channel_msg_id}})
    
    res.render('message/modify', {ChannelMessage});
});


router.post('/modify/:id', async(req, res) => {

    var channel_msg_id = req.params.id;

    const {msg_type_code, msg_state_code, nick_name, message, ip_address, msg_date} = req.body;

    var channelMsg = {
        channel_id:1,
        msg_type_code,
        msg_state_code,
        nick_name,
        message,
        ip_address,
        msg_date,
        connection_id:"robin",
    };

    try {
        await db.ChannelMessage.update(channelMsg, {where:{channel_msg_id}});
        res.redirect('/message/list/');

    } catch(err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }

});



module.exports = router;
