// 라우터의 기본주소는
// http://localhost:3000/articles/~

var express = require('express');
var router = express.Router();

// 게시글 목록 웹페이지 요청과 응답 처리 라우팅 메소드
// localhost:3000/articles/
// get
// 게시글 목록 웹페이지
router.get('/', async(req, res)=>{

    // 게시글 목록 데이터
    // 나중에 DB에서 가져옴
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
    res.render('article/list.ejs', {articles});
});

// 신규 게시글 등록 웹페이지 요청과 응답 처리 라우팅 메소드
// localhost:3000/articles/create
// get
// 신규 게시글 등록 웹페이지
router.get('/create', async(req, res)=>{
    res.render('article/create.ejs');
});

// 신규 게시글 사용자 입력 정보 등록 요청과 응답 처리 라우팅 메소드
// localhost:3000/articles/create
// post
// 게시글 목록 웹페이지로 이동처리
router.post('/create', async(req, res)=>{
    
    var title = req.body.title;
    var contents = req.body.contents;
    var register = req.body.register;

    // DB 입력 단일 데이터 생성 및 DB 등록 처리
    var article = {
        articleIdx:0, 
        title,
        contents,
        view_cnt:0,
        display:'Y',
        ipaddress:'111.111.111.111',
        registDate:Date.now(),
        registMemberId:register
    };
    
    // 게시글 목록 페이지로 이동
    res.redirect('/articles');
});

// 선택 게시글 정보확인 웹페이지 요청과 응답 처리 라우팅 메소드
// localhost:3000/articles/modify/1
// get
// 선택 단일 게시글 정보 표시 웹페이지
router.get('/modify/:aid',async(req, res, next)=>{
    // 1. url을 통해 전달된 게시글 고유번호 추출
    var articleIdx = req.params.aid;

    // 2. 게시글 고유번호를 이용해 DB에서 게시글 정보를 조회


    // 3. 조회해온 단일 게시글 정보
    var article = {
        articleIdx:articleIdx, 
        title:'1번째 게시글 제목',
        contents:'1번째 게시글 내용',
        view_cnt:100,
        display:'Y',
        ipaddress:'111.111.111.111',
        registDate:Date.now(),
        registMemberId:'eunbi'
    };

    res.render('article/modify.ejs', {article});
});

// 게시글 수정 페이지에서 사용자가 수정한 게시글 수정 정보 처리 요청과 응답 라우팅 메소드
// localhost:3000/articles/modify/1
// post
// 게시글 목록 웹페이지
router.post('/modify/:aid', async(req, res)=>{

    var articleIdx = req.params.aid;

    var title = req.body.title;
    var contents = req.body.contents;
    var register = req.body.register;

    // DB 수정 단일 데이터 생성 및 DB 수정 처리
    var article = {
        articleIdx, 
        title,
        contents,
        view_cnt:0,
        display:'Y',
        ipaddress:'111.111.111.111',
        registDate:Date.now(),
        registMemberId:register
    };
    
    // 게시글 목록 페이지로 이동
    res.redirect('/articles');
});

// 게시글 삭제 요청과 응답 처리 라우팅 메소드
// localhost:3000/articles/delete?aidx=1
// get
// 게시글 목록 웹페이지
router.get('/delete', async(req, res)=>{
    var articleIdx = req.query.aidx;

    // 해당 게시글 번호를 이용해 DB에서 해당 게시글 삭제

    // 삭제 완료 후 게시글 목록 페이지로 이동
    res.redirect('/articles')
});



module.exports = router;