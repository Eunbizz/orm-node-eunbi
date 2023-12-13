// 게시글 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/article/~

var express = require('express');
var router = express.Router();

// 게시글 목록 웹페이지 요청과 응답 처리 라우팅 메소드
// localhost:3000/article/list
// get
// 게시글 목록 웹페이지
router.get('/list', async(req, res)=>{

  var articles = [
    {
        articleIdx:1, 
        title:'1번째 게시글입니다.',
        contents:'1번째 게시글 내용입니다.',
        view_cnt:100,
        display:'Y',
        ipaddress:'111.111.111.111',
        registDate:Date.now(),
        registMemberId:'eunbi'
    },
    {
        articleIdx:2, 
        title:'2번째 게시글입니다.',
        contents:'2번째 게시글 내용입니다.',
        view_cnt:100,
        display:'Y',
        ipaddress:'112.111.111.111',
        registDate:Date.now(),
        registMemberId:'eunbi2'
    },
    {
        articleIdx:3, 
        title:'3번째 게시글입니다.',
        contents:'3번째 게시글 내용입니다.',
        view_cnt:100,
        display:'Y',
        ipaddress:'113.111.111.111',
        registDate:Date.now(),
        registMemberId:'eunbi3'
    }
  ];
  res.render('article/list.ejs')
});

// 신규 게시글 등록 웹페이지 요청과 응답 처리 라우팅 메소드
// localhost:3000/article/create
// get
// 신규 게시글 등록 웹페이지
router.get('/create', async(req, res)=>{
  res.render('article/create.ejs')
});


// 신규 게시글 사용자 입력 정보 등록 요청과 응답 처리 라우팅 메소드
// localhost:3000/articles/create
// post
// 게시글 목록 웹페이지로 이동처리
router.post('/create', async(req, res)=>{
  
  var title = req.body.title;
  var contents = req.body.contents;
  var register = req.body.register;

  var article = {
    article_id:0,
    board_type_code:0,
    title,
    article_type_code:0,
    contents,
    view_count:0,
    ip_address:'111.111.111.111',
    is_display_code:0,
    reg_date:Date.now(),
    reg_member_id:register,
    edit_date:Date.now(),
    edit_member_id:register
  }
  res.redirect('/article/list')
});

// 선택 게시글 정보확인 웹페이지 요청과 응답 처리 라우팅 메소드
// localhost:3000/articles/modify
// get
// 선택 단일 게시글 정보 표시 웹페이지
router.get('/modify', async(req, res)=>{

  // var article = {
  //   article_id:0,
  //   board_type_code:0,
  //   title:'1',
  //   article_type_code:0,
  //   contents:'1',
  //   view_count:0,
  //   ip_address:'111.111.111.111',
  //   is_display_code:0,
  //   reg_date:Date.now(),
  //   reg_member_id:1,
  //   edit_date:Date.now(),
  //   edit_member_id:1
  // }

  res.render('article/modify.ejs')
});

// 게시글 수정 페이지에서 사용자가 수정한 게시글 수정 정보 처리 요청과 응답 라우팅 메소드
// localhost:3000/articles/modify
// post
// 게시글 목록 웹페이지
router.post('/modify', async(req, res)=>{

    // var title = req.body.title;
    // var contents = req.body.contents;
    // var register = req.body.register;

    // var article = {
    //   article_id:0,
    //   board_type_code:0,
    //   title,
    //   article_type_code:0,
    //   contents,
    //   view_count:0,
    //   ip_address:'111.111.111.111',
    //   is_display_code:0,
    //   reg_date:Date.now(),
    //   reg_member_id:register,
    //   edit_date:Date.now(),
    //   edit_member_id:register
    // }

  res.redirect('/article/list')
});


// 게시글 삭제 요청과 응답 처리 라우팅 메소드
// localhost:3000/articles/delete
// get
// 게시글 목록 웹페이지
router.get('/delete', async(req, res)=>{
  res.redirect('/article/list')
});

module.exports = router;
