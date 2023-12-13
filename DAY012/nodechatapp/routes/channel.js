// 채팅 페이지 정보관리 라우팅 

var express = require('express');
var router = express.Router();

// 채팅 웹페이지 정보관리 라우팅
router.get('/', async(req, res)=>{
    res.render('chat/index.ejs')
});

module.exports = router;