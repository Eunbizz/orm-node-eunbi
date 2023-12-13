
# 웹페이지 요청과 응답 프로세스
## HTTP Request/Response


# 웹 데이터 요청과 응답 기술
### AJAX: 웹 브라우저 탑재 기술
- Asynchronous Javascript and Xml
- 웹브라우저에서 서버에게 데이터를 요청하거나 수신할 수 있는 기술
- 화면 껌벅거림 없이 자바스크립트 기반 순수 데이터만 호출하는 기술

### RESTful Service(Open API)

- REST(Representational State Transfer): 자원의 상태(정보=데이터)값만을 주고받는 기술
- 서버측에서 각종 데이터 처리 및 제공 기술
- Open API - 시스템간 통합(SI) 기술로 각광
- HTML이 아닌 데이터만 처리(JSON&XML)
- 모든 RESTAPI 라우터의 최상위 기본주소는 되도록 /api/~로 시작되게 해주면 좋음

# 요청 유형별 라우팅 메소드 정의

- 라우터 파일은 업무단위별로 구분하여 생성(회원, 주문 .. 
- Node Express 객체의 Router() 메소드를 통해 해당 업무별 사용자 요청과 응답을 처리하는 개별 라우팅 메소들 정의하고 콜백함수에 기능 구현

router.get('요청주소', 요청에 응답처리 콜백함수)
- 링크 또는 최초 웹페이지 요청 시

router.post('요청주소', 요청에 응답처리 콜백함수)
- 웹페이지 사용자 신규 등록/기존 데이터 수정 처리요청 또는 ajax post 방식으로 데이터 등록/수정 처리 요청 시

router.put('요청주소', 요청에 응답처리 콜백함수)

router.delete('요청주소', 요청에 응답처리 콜백함수)

# 사용자 요청 HttpRequest 객체 다루기

- 주로 사용자 요청정보가 담겨있는 웹브라우저에서 서버로 전달되는 각종 정보를 추출할 때 사용


URL(인터넷 주소 체계 또는 주소/링크주소)

URL을 통해 GET 방식으로 서버에 데이터를 전달하는 방법 2가지
1. 쿼리 스트링 방식으로 주소를 통해 서버로 데이터를 전달
기본주소?key=value&key=value&key=value
http://shop.naver.com/product?pid=1&price=500&stock=5

2. 파라미터 방식으로 URL 주소안에다가 직접 데이터를 넣어서 주소체계를 만들어 데이터를 전달하는 방식
http://shop.naver.com/product/100
