var express = require('express');
var router = express.Router();

// 메인 웹페이지 요청 및 응답처리 라우팅 메소드
// http://localhost:3000
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '파' });
});

module.exports = router;
