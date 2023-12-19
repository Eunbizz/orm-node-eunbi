// 사용자 계정 정보(사용자 사이트에서 가입한 사용자 정보) 관리 라우팅 기능
// http://localhost:3000/member/~

var express = require('express');
var router = express.Router();


router.get('/list', async(req, res, next)=>{

  const member_list = {
    member_id:1,
    email:'eb@gmail.com',
    member_password:1,
    name:'eunbi',
    profile_img_path:'image/1',
    telephone:'12345',
    entry_type_code:1,
    use_state_code:1,
    birth_date:'2000.10.20',
    reg_date:'2023.12.19',
    reg_member_id:1,
    edit_date:'2023.12.19',
    edit_member_id:1
  }
  res.render('member/list.ejs', {member_list});
});

router.get('/create', async(req, res)=>{

  res.render('member/create.ejs')
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var memberId = req.body.member_id;
  var memberPassword = req.body.member_password;
  var name = req.body.name;
  var email = req.body.email;
  var telephone = req.body.telephone;
  var birth_date = req.body.birth_date;


  // step2: 추출된 사용자 입력 데이터를 단일 게시글 json 데이터로 구성해서
    // DB article 테이블에 영구적으로 저장처리한다
    // 저장처리 후 article 테이블에 저장된 데이터 반환된다

    var member = {
      memberId, 
      memberPassword,
      name,
      email,
      telephone,
      birth_date
  };

  res.redirect('/member/list')
})

router.get('/modify/:id', async(req, res)=>{

  var memberId = req.params.id;

  const member_list = {
    member_id:1,
    email:'eb@gmail.com',
    member_password:1,
    name:'eunbi',
    profile_img_path:'image/1',
    telephone:'12345',
    entry_type_code:1,
    use_state_code:1,
    birth_date:'2000.10.20',
    reg_date:'2023.12.19',
    reg_member_id:1,
    edit_date:'2023.12.19',
    edit_member_id:1
  }

  res.render('member/modify.ejs', {member_list})
})

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var memberId = req.params.id;

  // step1: 사용자가 입력한 게시글 등록 데이터 추출
  var memberId = req.body.member_id;
  var memberPassword = req.body.member_password;
  var name = req.body.name;
  var email = req.body.email;
  var telephone = req.body.telephone;
  var birth_date = req.body.birth_date;


  // step2: 추출된 사용자 입력 데이터를 단일 게시글 json 데이터로 구성해서
    // DB article 테이블에 영구적으로 저장처리한다
    // 저장처리 후 article 테이블에 저장된 데이터 반환된다

    var member = {
      memberId, 
      memberPassword,
      name,
      email,
      telephone,
      birth_date
  };
  res.redirect('/member/list')
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{
  res.redirect('/member/list')
})


module.exports = router;
