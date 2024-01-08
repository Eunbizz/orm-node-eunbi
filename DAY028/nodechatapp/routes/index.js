// 공통 페이지 제공(로그인, 회원가입, 암호찾기)

var express = require('express');
var router = express.Router();

const Member = require('../schemas/member');

// 로그인 웹페이지 요청 및 응답
router.get('/login', async(req, res)=>{
  res.render('login.ejs',{resultMsg:"", email:"", password:"", layout:"authLayout"})
});

// 로그인 처리 요청 및 응답, 로그인 완료 후 채팅 페이지 이동
router.post('/login', async(req, res)=>{
  try{
    // 사용자 입력 정보 추출
    var email = req.body.email;
    var password = req.body.password;

    // DB 조회
    var member = await Member.findOne({where:{email:email}});
    
    var resultMsg = '';

    if (member==null){
      resultMsg = '멤버 정보가 등록되지 않았습니다.'
    } else{
      if(member.member_password == password){
        res.redirect('/chat');
      } else{
        resultMsg = '암호가 일치하지 않습니다.'
      }
    }

    if (resultMsg !== ''){
      res.render('login.ejs', {resultMsg, email, password, layout:"authLayout"})
    }

    } catch(err) {
      res.statusMessage(500).send('Internal Server Error')
    }
});

// 회원가입 웹페이지 요청 및 응답
router.get('/entry', async(req, res)=>{
  res.render('entry.ejs', {resultMsg:"", email:"", password:"", layout:"authLayout"})
});

// 회원가입 처리 요청 및 응답, 회원가입 완료 후 로그인 페이지 이동
router.post('/entry', async(req, res)=>{
  try {
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var telephone = req.body.telephone;
    var birthDate = req.body.birthDate;

    var member = {
      email,
      name,
      member_password:password,
      telephone,
      birthDate,
      entry_type_code:1,
      use_state_code:1,
      reg_date:Date.now()
    }

    await Member.create(member);
    res.redirect('/login')

  } catch(err) {
    res.status(500).send('Internal Server Error')
  }
  

});

// 암호 찾기 웹페이지 요청 및 응답
router.get('/find', async(req, res)=>{
  res.render('find.ejs',{resultMsg:"", email:"", password:"", layout:"authLayout"})
});

// 암호찾기 처리 요청 및 응답,암호 찾기 완료 후 로그인 페이지 이동
router.post('/find', async(req, res)=>{

  try{
    var email = req.body.email;

    var member = await Member.findOne({where:{email:email}});

    var resultMsg = '';

    if (email == null){
      resultMsg = '등록되지 않은 이메일입니다.'
    } else{
      // db의 email과 내가 입력한 것이 같으면
      if (member.email == email) {
        console.log(`메일찾기 완료 : ${email} 입니다.`)
        resultMsg = '메일찾기 완료'
      }
    }
    if (resultMsg !== ''){
      res.render('find.ejs', {resultMsg, layout:"authLayout"})
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
  
});

module.exports = router;
