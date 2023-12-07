
// productAPI.js의 기본 호출 주소 = http://localhost:3000/api/products/~
// app.js에서 라우터 추가시 기본 주소 설정

var express = require('express');
var router = express.Router();


// 기능: 상품 목록 데이터에 대한 요청과 응답처리 라우팅 메소드
// 요청방식: GET
// 요청주소: http://localhost:3000/api/products/list
// 응답결과: 상품목록 JSON 데이터 목록
router.get('/list', async(req, res)=>{

    var products = [
      {
        pid: 1,
        pname:'삼성 노트북',
        price: 5000,
        stock: 4
      },
      {
        pid: 2,
        pname:'lg 노트북',
        price: 5000,
        stock: 4
      }
    ];
  
    // res.json('json데이터=배열이든 단일 객체든 상관없다') 메소드는 지정한 json 데이터를 브라우저로 전송
    res.json(products)
  })


module.exports = router;