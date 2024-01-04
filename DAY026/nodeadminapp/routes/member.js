// 사용자 계정 정보(사용자 사이트에서 가입한 사용자 정보) 관리 라우팅 기능
// http://localhost:3000/member/~

var express = require('express');
var router = express.Router();

var moment = require('moment');
const Member = require('../schemas/member');


router.get('/list', async(req, res, next)=>{

  const members = await Member.find({});
  res.render('member/list.ejs', {members,moment});
});

router.post('/list', async(req, res)=>{

  // step1: 사용자가 선택/입력한 조회옵션 데이터 추출
  var email = req.body.email;
  var name = req.body.name;
  var telephone = req.body.telephone;

  var searchOption = {
    email, 
    name,
    telephone
  };

  // step2: 사용자가 입력/선택한 조회옵션 데이터를 기반으로 DB에서
  // 게시글 목록을 재조회해온다

  let query = {};
  
  if (searchOption.email) {
    query.dept_name = searchOption.email;
  }
  if (searchOption.name) {
    query.admin_name = searchOption.name;
  }
  if (searchOption.telephone) {
    query.telephone = searchOption.telephone;
  }
    
  const members = await Member.find(query);

  // step3: 게시글 목록 페이지 list.ejs
  res.render('member/list.ejs', {members, searchOption, moment});

});

router.get('/create', async(req, res)=>{

  res.render('member/create.ejs')
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var profileImgPath = req.body.profileImgPath;
  var telephone = req.body.telephone;
  var birthDate = req.body.birthDate;
  var entryTypeCode = req.body.entryTypeCode;
  var useStateCode = req.body.useStateCode;


  // step2: 추출된 사용자 입력 데이터를 단일 게시글 json 데이터로 구성해서
    // DB article 테이블에 영구적으로 저장처리한다
    // 저장처리 후 article 테이블에 저장된 데이터 반환된다

    var member = {
      email,
      member_password:password,
      name,
      profile_img_path:profileImgPath,
      telephone,
      birth_date:birthDate,
      entry_type_code:entryTypeCode,
      use_state_code:useStateCode,
      reg_date:Date.now()
  };

  await Member.create(member);

  res.redirect('/member/list')
})

router.get('/modify/:id', async(req, res)=>{

  var memberId = req.params.id;

  var member = await Member.findOne({member_id:memberId});

  res.render('member/modify.ejs', {member})
})

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var memberId = req.params.id;

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var profileImgPath = req.body.profileImgPath;
  var telephone = req.body.telephone;
  var birthDate = req.body.birthDate;
  var entryTypeCode = req.body.entryTypeCode;
  var useStateCode = req.body.useStateCode;


  // step2: 추출된 사용자 입력 데이터를 단일 게시글 json 데이터로 구성해서
    // DB article 테이블에 영구적으로 저장처리한다
    // 저장처리 후 article 테이블에 저장된 데이터 반환된다

  var member = {
    email,
    member_password:password,
    name,
    profile_img_path:profileImgPath,
    telephone,
    birth_date:birthDate,
    entry_type_code:entryTypeCode,
    use_state_code:useStateCode,
    reg_date:Date.now()
  };

  await Member.updateOne({member_id:memberId},member);

  res.redirect('/member/list')
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{

  var memberId = req.query.aidx;

  await Member.deleteOne({member_id:memberId});

  res.redirect('/member/list')
})


module.exports = router;
