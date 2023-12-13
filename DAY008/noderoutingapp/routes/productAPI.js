// productAPI.js의 기본호출주소는   - 요청주소 : http://localhost:3000/api/products/~
// app.js에서

var express = require('express');
var router = express.Router();

router.get('/list',async(req,res)=>{
    var products = [
      {
        pid:1,
        pname:"LG 노트북",
        price:5000,
        stock:4
      },
      {
        pid:2,
        pname:"삼성 노트북",
        price:6000,
        stock:2
      }
    ];
    res.json(products)
})


module.exports = router;