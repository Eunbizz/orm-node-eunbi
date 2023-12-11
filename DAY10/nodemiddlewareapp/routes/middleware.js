
// 사용자가 요청한 url에서 특정 파라미터가 존재하는지 사전 체크하는 미들웨어 함수
// localhost:3000/test/eddy
exports.checkParams = (req, res, next)=>{
    if (req.params.id == undefined){
        console.log('id 파라미터가 전달되지 않았습니다.')
    }else{
        console.log('id 파라미트 값이 전달되었습니다.', req.params.id)
    }
    next();
};

// 사용자 요청 url 주소에서 querystring 방식으로 category라는 키값이 전달되는지 체크하는 미들웨어 함수
exports.checkQueryKey = (req, res, next)=>{
    if (req.query.category == undefined){
        console.log('category 키가 전달되지 않았습니다.')
    }
    next();
};