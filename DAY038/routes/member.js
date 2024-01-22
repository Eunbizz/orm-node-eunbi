// 사용자 계정 정보(사용자 사이트에서 가입한 사용자 정보) 관리 라우팅 기능
// http://localhost:3000/member/~

var express = require('express');
var router = express.Router();


router.get('/list', async(req, res, next)=>{

  const members = {
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
  res.render('member/list.ejs', {members});
});

router.get('/create', async(req, res)=>{

  res.render('member/create.ejs')
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{

  res.redirect('/member/list')
})

router.get('/modify/:id', async(req, res)=>{

  var memberId = req.params.id;

  const members = {
    member_id:memberId,
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

  res.render('member/modify.ejs', {members})
})

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var memberId = req.params.id;

  res.redirect('/member/list')
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{
  res.redirect('/member/list')
})


module.exports = router;
