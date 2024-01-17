
// apiMiddleware.js의 목적은
// 각종 RESTful API 라우터/라우티메소드에서 데이터 요청하는 측에서 
// jwt 사용자 로그인 인증 토큰이 있는지 없는지를 체크해서 후행작업을 제어하는 미들웨어 구현
// 해당 호출 api를 해당 요청 사용자가 호출/사용가능한지에 대한 권한 체크 미들웨어

const jwt = require('jsonwebtoken');

exports.tokenAuthChecking = async(req,res,next)=>{

    // 1. 발급된 토큰정보가 존재하지 않을 경우
    if(req.headers.authorization == undefined){
        var apiResult = {
            code:400,
            data:null,
            msg:"사용자 인증토큰이 제공되지 않았습니다."
        }
        return res.json(apiResult);
    }

    // 제공 토큰의 유효성을 체크해서 유효하지 않으면(만료) 튕기고 정상적인 토큰이면 흘려보내기               
    try{
        var token = req.headers.authorization.split('Bearer ')[1];
        var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);

        if(tokenJsonData != null){
            next();
        }

    }catch(err){
        var apiResult = {
            code:400,
            data:null,
            msg:"유효하지 않은 사용자 인증토큰입니다."
        }
        return res.json(apiResult);
    }
};
