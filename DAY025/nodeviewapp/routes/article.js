// 게시글 정보 관리 각종 웹페이지 요청과 응답처리 라우터 
// localhost:3000/article/~

var express = require('express');
var router = express.Router();

var moment = require('moment');

// MongoDB ODB 모델 참조
const Article = require('../schemas/article');

// 게시글 목록 조회 웹페이지 요청 및 응답 라우팅메소드
router.get('/list', async(req, res)=>{

    var searchOption = {
        boardTypeCode:"0", 
        title:"",
        isDisplayCode:"9"
    };

    // step1: DB에서 모든 게시글 데이터 목록 조회
    const articles = await Article.find({});

    // step2: 게시글 전체 목록을 list.ejs 뷰에 전달
    res.render('article/list.ejs', {articles,searchOption,moment});
});

// 게시글 목록에서 조회 옵션 데이터를 전달받아 게시글 목록 조회 후
// 게시글 목록 페이지에 대한 요청과 응답처리
router.post('/list', async(req, res)=>{

    // step1: 사용자가 선택/입력한 조회옵션 데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var isDisplayCode = req.body.isDisplayCode;

    var searchOption = {
        boardTypeCode, 
        title,
        isDisplayCode
    };

    // step2: 사용자가 입력/선택한 조회옵션 데이터를 기반으로 DB에서
    // 게시글 목록을 재조회해온다
    const articles = await Article.find({});

    // step3: 게시글 목록 페이지 list.ejs
    res.render('article/list.ejs', {articles, searchOption});

});

// 신규 게시글 등록 웹페이지 요청 및 응답 라우팅메소드
router.get('/create', async(req, res)=>{
    res.render('article/create.ejs');
});

// 신규 게시글 사용자 등록정보 처리 요청 및 라우팅메소드
router.post('/create', async(req, res)=>{

    // step1: 사용자가 입력한 게시글 등록 데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;

    // step2: 추출된 사용자 입력 데이터를 단일 게시글 json 데이터로 구성해서
    // DB article 테이블에 영구적으로 저장처리한다
    // 저장처리 후 article 테이블에 저장된 데이터 반환된다

    // 등록할 게시글 데이터
    var article = {
        title,
        contents,
        article_type_code:articleTypeCode,
        view_count:0,
        ip_address:'123.123.111.1',
        is_display_code:isDisplayCode,
        edit_member_id:register,
        edit_date:Date.now()
    };

    await Article.create(article);

    // step3: 등록처리 후 게시글 목록 웹페이지로 이동처리
    res.redirect('/article/list');
});

// 기존 게시물 삭제 처리 요청 및 응답 라우팅메소드 
// localhost:3000/article/delete?aid=1
router.get('/delete', async(req, res)=>{

    // step1: 삭제하려는 게시글 고유번호를 추출
    var articleIdx = req.query.aid;

    // step2: 게시번호 기반으로 실제 DB article 테이블에서 데이터를 삭제처리
    await Article.deleteOne({article_id:articleIdx});

    // step3: 게시글 목록 페이지로 이동
    res.redirect('/article/list');
});

// 기존 게시글 정보 확인 및 수정 웹페이지 요청과 응답 라우팅메소드
// localhost:3000/article/modify/1
// GET
router.get('/modify/:aid', async(req, res)=>{

    // step 1: 선택한 게시글 고유번호를 파라미터 방식으로 url을 통해 전달받음
    var articleIdx = req.params.aid;

    // step 2: 해당 게시글 번호에 해당하는 단일 게시글 정보를 DB article 테이블에서 조회해온다.
    // mongoose find 메소드는 무조건 배열값이 반환된다
   var articles = await Article.find({article_id:articleIdx});

   var article = {};
   if(articles.length > 0){
    article = articles[0]
   };

    // step 3: 단일 게시글 정보로 뷰에 전달한다.
    res.render('article/modify.ejs', {article});
});

// 기존 게시글 사용자 수정 정보 처리 및 요청과 응답 라우팅메소드
// http://localhost:3000/article/modify/1
// POST
router.post('/modify/:aid', async(req, res)=>{

    var articleIdx = req.params.aid;

     // step1: 사용자가 입력한 게시글 등록 데이터 추출
     var boardTypeCode = req.body.boardTypeCode;
     var title = req.body.title;
     var contents = req.body.contents;
     var articleTypeCode = req.body.articleTypeCode;
     var isDisplayCode = req.body.isDisplayCode;
     var register = req.body.register;
 
     // step2: 추출된 사용자 입력 데이터를 단일 게시글 json 데이터로 구성해서
     // DB article 테이블에 수정 처리한다.
     // 수정 처리하면 처리건수 값이 반환
 
     // 수정할 게시글 데이터
     var article = {
        title,
        contents,
        article_type_code:articleTypeCode,
        view_count:0,
        ip_address:'123.123.111.1',
        is_display_code:isDisplayCode,
        edit_member_id:register,
        edit_date:Date.now()
    };

    await Article.updateOne({article_id:articleIdx},article);
 
     // step3: 등록처리 후 게시글 목록 웹페이지로 이동처리
    res.redirect('/article/list');
});

module.exports = router;