var express = require('express');
var router = express.Router();

// 상품 목록 웹페이지 요청과 응답 라우팅 메소드
// localhost:3000/product/list
router.get('/list', async(req, res)=>{
    res.render('product/list');
});

// 단일상품 상세 정보 보기 웹페이지에 대한 요청과 응답
// localhost:3000/product/detail?pid=1&name=LG노트북
router.get('/detail', async(req, res)=>{
    
    // URL에 쿼리스트링방식으로 전달된 값 추출
    // URL에 쿼리스트링방식으로 파라미터가 전달되면 req.query.키명 으로 키의 값을 추출할 수 있다
    var productID = req.query.pid;
    var productName = req.query.pname;

    res.render('product/detail', {productID, productName});

});



// 와일드 카드 이용시 주의사항: 동일한 url 호출주소와 호출방식(GET)의 라우팅 메소드가 존재하는 경우
// 와일드 카드 방식이 먼저 호출되고 다른 라우팅 메소드 주소는 호출이 무시됨
// 라우팅 설계 네이밍이 같을떄 와일드 카드를 사용시 제일 하단으로 배치를 진행합니다.
// 호출주소체계: localhost:3000/product/detail/sample
// 호출방식: GET
router.get('/detail/sample', async(req, res)=>{

    res.render('product/detail', {productID:100, productName:'노트북'});
})


// res.send() 만능 메소드 사용
// 호출주소체계: localhost:3000/product/detail/sendall
router.get('/detail/sendall', async(req, res)=>{

    // 문자열 데이터를 보내보자
    // res.send('안녕하세요.')
    // res.send({uid:'eunbi', username:'김은비'});

    // html 태그 덩어리를 보내보자
    // var htmlTag = `
    //     <html>
    //         <body>
    //         <h1>웹페이지</h1>
    //         </body>
    //     </html>`;
    // res.send(htmlTag);

    // 서버에 저장된 파일을 다운로드 해보자
    // console.log('__dirname 물리적 경로 확인:', __dirname);
    res.sendFile(__dirname + '/1.jpeg');
})


// 파라미터 방식으로 전달된 상품정보를 추출해 단일상품정보를 보여주자
// 호출주소: localhost:3000/product/detail/1
// 호출방식: GET
// 반환값: 단일상품정보 웹페이지
// *매우중요: 와일드카드 방식으로 주소체계가 정의된 라우팅메소드는 해당 라우터 파일의 맨 하단에 배치시켜야 함
router.get('/detail/:pid', async(req,res)=>{

    // url을 통해 파라미터 방식으로 값이 전달되면 
    // 주소체계내에 와일드카드 키를 설정하고 해당 키명으로 url을 통해 전달된 파라미터 값을 
    // 추출(req.params.와일드카드)
    var productID = req.params.pid;

    res.render('product/detail', {productID, productName:'노트북'});

});


// 호출주소: http://localhost:3000/product/detail/1/LG노트북/6000
// 호출방식: GET
// 여러개의 파라미터를 여러개의 와일드카드 키명으로 정의해서 값을 추출해보자
router.get('/detail/:pid/:pname/:price', async(req, res)=>{

    var productID = req.params.pid;
    var productName = req.params.pname;
    var price = req.params.price;

    res.render('product/detail', {productID, productName, price})
});



module.exports = router;