
// index.js = 샘플 웹사이트의 공통 사용자 요청과 응답을 처리해주는 라우팅 파일(컨트롤러 파일)

// express 웹 개발 프레임워크 패키지 참조
var express = require('express');

// express 객체에 Router() 매소드를 호출해서 router 객체를 생성
// router 객체는 모든 사용자의 요청과 응답을 처리하는 핵심 객체
var router = express.Router();

// 신규 메인페이지
// http://localhost:3000/main
router.get('/main', function(req, res){
  res.render('main');
})

/* 
샘플 노드 익스프레스 웹사이트의 메인 웹페이지 요청과 음답 처리 라우팅 메소드
호출 주소 체계: http://localhost:3000/
router.get() 메소드는 사용자가 클라이언트에서 직접 URL(주소체계)을 입력해서 최초 호출하거나
또는, 각종 링크 주소를 클릭했을 때 발생
사용자가 url을 통해 서버에 무언가를 요청할 때는 요청 방식이 존재
요청 방식: get/post/put/delete/... 
router.get('사용자가 호출하는 주소 체계', 호출된 주소에서 처리해야할 응답 처리를 위한 익명콜백함수)
콜백함수 = 응답(요청)이 들어오면 처리를 진행 후 결과 값 돌려줌 
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 회사소개 웹페이지 요청과 응답 처리 라우팅 메소드
// step1: 라우팅 메소드의 기본 호출 주소 체계 정의
// http://localhost:3000/intro
// http://localhost:3000/company
router.get('/company', function(req, res){
  // req = HttpRequest 객체이고 웹브라우저(클라이언트)에서 넘어오는 각종 요청 정보 담김
  // req에는 웹브라우저에서 웹 서버로 넘어오는 모든 정보가 담겨있고, 담겨있는 정보 추출 가능

  // res = HttpResponse 객체이고 웹 서버에서 웹브라우저(클라이언트)로 응답을 처리해주는 객체
  // 웹서버에서 웹브라우저(클라이언트)로 특정 정보를 전달하고 싶을 때 res 객체 사용
  // 주로 res를 이용해 서버상의 웹페이지(뷰), 데이터(json데이터) 등을 전달
  // res.render('views 폴더 내의 특정 뷰파일 지정', 뷰에 전달할 데이터) 메소드는 views 폴더 내에 있는 지정한 view 파일(.ejs)내의 html 내용을 웹브라우저로 전송

  res.render('company.ejs', {companyName:'넷플릭스', ceo:'김은비'});
});

// 회사 연락처 정보 제공 웹페이지 요청과 응답 처리 라우팅 메소드
// http://localhost:3000/contact
// 사용자 요청은 동일 주소 체계와 동일 요청 방식(get/post)과 일치하는 라우팅 메소드를 찾아서 
// 해당 메소드의 콜백 함수가 실행되어 응답이 전달
router.get('/contact', function(req, res){
  res.render('sample/contact', {
    email:'ceo@ms.co.kr', 
    telephone:'010-7640-7278', 
    address:'테헤란로 415 선릉역 9, 10번 출구'})
});

// 회사 제품 소개 웹페이지 요청과 응답 처리 라우팅 메소드
// http://localhost:3000/products/computer
router.get('/products/computer', function(req, res)
{
  // 단일 컴퓨터 정보 json 데이터
  const computer = {
  brand: 'Apple',
  productName: 'MacBook M2',
  price: '160',
  img: 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP858/mbp16-gray.png'
}
  res.render('product/computer', {computer});
});

// 회사 대표 인삿말 웹페이지 요청과 응답처리 라우팅 메소드
// 호출 주소: http://localhost:3000/welcome
// 호출 방식: get 방식으로 사용자가 요청해오면 router.get() 메소드로 수신해줘야한다
// 반환 형식: 웹페이지, 웹페이지+데이터, only 데이터(RESTFull서비스)
router.get('/welcome', function(req, res){
  
  res.render('welcome.ejs');
});


// 반드시 라우터 파일에서는 해당 라우터 객체를 외부로 exports를 통해 노출해줘야한다.
module.exports = router;
