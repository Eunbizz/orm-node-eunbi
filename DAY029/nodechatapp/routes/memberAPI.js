var express = require("express");
var router = express.Router();

var jwt = require('jsonwebtoken');
var byctrpt = require("bcryptjs");
var AES = require("mysql-aes");
var db = require("../models/index.js");

// 사용자 토큰제공여부 체크 미들웨어 참조
var {tokenAuthChecking}= require('./apiMiddleware.js');


/* 
  - 신규 회원 가입 처리 RESTful API 라우팅 메소드
  - http://localhost:3000/api/member/entry
  - POST
  - req.body.email
*/
router.post("/entry", async (req, res, next) => {
   var apiResult = {
      code: 400,
      data: null,
      msg: "",
   };

   try {
      var email = req.body.email;
      var password = req.body.password;
      var name = req.body.name;
      var telephone = req.body.telephone;

      // 회원가입 로직추가: 메일주소 중복체크
      var existMember = await db.Member.findOne({where:{email}});

      if (existMember != null){
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = "ExistDoubleEmail";
      } else {
        var encrypedPassword = await byctrpt.hash(password, 12);
        var encryptMobileNo = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);
        var member = {
          email: email,
          member_password: encrypedPassword,
          name: name,
          profile_img_path: "",
          telephone: encryptMobileNo,
          entry_type_code: 1,
          use_state_code: 1,
          reg_date: Date.now(),
          reg_member_id: 0,
        };
        var registeredMember = await db.Member.create(member);
        registeredMember.member_password = "";
        var decryptedMobileNo = AES.decrypt(encryptMobileNo, process.env.MYSQL_AES_KEY)
        registeredMember.telephone = decryptedMobileNo;

        apiResult.code = 200;
        apiResult.data = registeredMember;
        apiResult.msg = "ok";
      }
        
  } catch (err) {
    console.log("서버에러발생-/api/member/entry", err.meesage);
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = err.message;

    res.json(apiResult);
  }

});

/* 
  - 로그인 처리 RESTful API 라우팅 메소드
  - http://localhost:3000/api/member/login
  - POST
  - req.body.email
  - req.body.password
*/
router.post("/login", async (req, res, next) => {
   var apiResult = {
      code: 400,
      data: null,
      msg: "",
   };

   try {
      var email = req.body.email;
      var password = req.body.password;

      // 1. 로그인(인증)-동일메일주소 여부 체크
      var member = await db.Member.findOne({
         where: {
            email: email,
         },
      });
    resultMsg = "";

      if (member == null) {
      resultMsg = "NotExistEmail";
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = resultMsg;
    }else{
      
        // 2. 단방향암호화 기반 동일암호 일치여부 체크
        // 단방향 암호화 해시 알고리즘 암호 체크
         var isMatch = await byctrpt.compare(password, member.member_password);
      if(isMatch){
        resultMsg = "Ok";
        member.member_password = "";
        member.telephone = AES.decrypt(member.telephone, process.env.MYSQL_AES_KEY);
        
        // 3. 인증된 사용자의 기본정보 jwt 토큰 생성 발급
        // 3.1. jwt 토큰에 담을 사용자 정보 생성
        // jwt인증 사용자 정보 토큰 값 구조정의 및 데이터 세팅
        var memberTokenData = {
          member_id:member.member_id,
          email:member.email,
          name:member.name,
          profile_img_path:member.profile_img_path,
          telephone:member.telephone,
          etc:"기타정보"
        };

        var token = await jwt.sign(memberTokenData,process.env.JWT_SECRET,{expiresIn:'24h',issuer:'eunbi'});

        apiResult.code = 200;
        apiResult.data = token;
        apiResult.msg = resultMsg;

      }else{
        resultMsg = "NotCorrectword";
        apiResult.code = 400;
        apiResult.data = null;
        apiResult.msg = resultMsg;

      }
    }
   } catch (err) {
      console.log("서버에러발생-/api/member/entry", err.meesage);
      apiResult.code = 500;
      apiResult.data = null;
      apiResult.msg = err.message;
   }
  res.json(apiResult);
});

/* 
  - 로그인한 현재 사용자의 회원정보 조회 API
  - http://localhost:3000/api/member/profile
  - 로그인시 발급한 jwt 토큰은 HTTP Header 영역에 포함되어 전달됨
*/
router.get("/profile", tokenAuthChecking, async(req, res, next)=>{
  var apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try{

    // 1. 웹브라우저 헤더에서 사용자 JWT Bearer 인증토큰값을 추출 
    var token = req.headers.authorization.split('Bearer ')[1];
    var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);

    // 웹브라우저에서 전달된 JWT 토큰문자열에서 필요한 로그인 사용자 정보 추출
    var loginMemberId = tokenJsonData.member_id;
    var loginMemberEmail = tokenJsonData.email;

    var dbMember = await db.Member.findOne({
      where:{member_id:loginMemberId},
      attributes:['email','name','profile_img_path','telephone','birth_date']
    });

    dbMember.telephone = AES.decrypt(dbMember.telephone, process.env.MYSQL_AES_KEY);

    apiResult.code = 200;
    apiResult.data = dbMember;
    apiResult.msg = "Ok";
 
  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  res.json(apiResult);
})

module.exports = router;