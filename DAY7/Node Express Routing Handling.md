## MVC Design Pattern

- 0101 -> 어셈블리 언어 -> 프로그래밍 언어(C, C++, sql..)
- 혼자 놀던 컴퓨터를 공용 인터넷망으로 연결 <- 인터넷 혁명
- 서버 컴퓨터와 일반 컴퓨터로 나뉨
- 서버 컴퓨터 = 항상 연결되어 있고 통신 조건이 되어 있는 구조
### Design Pattern(설계패턴)

- 개발하면서 닥치는 주요 문제점들의 해결책에 대한 설계방법들을 유형별로 정리해둔 것
- 소프트웨어 개발의 주요 목적은 현실세계의 다양한 문제점들을 해결하기 위한 수단
- s/w 개발 작업을 진행할 때 직면하는 크고 작은 문제들 중에서 대표적이고 유사한 문제점들에 대한 해결방법들에 대해 설계 정리 계승 한 것
- 서버기반에서 사용자가 데이터를 보낼 때 어떻게 처리할지 등 서버 기반에서의 백엔드 요구사항을 어떻게 처리할지 = MVC Pattern
- 해결방법들이 정리되어 이후 개발 세대들이 시행착오를 덜 겪고 유사한 문제를 빨리 해결할 수 있도록 돕는 용도
### MVC Design Pattern

- **서버 기반 웹 프로그래밍 구현 시** 가장 보편적으로 사용하는 설계 패턴
- 주로 웹 기반 사용자 요청에 대한 서버 측에서의 웹브라우저 같은 클라이언트들의 요청과 응답에 대한 처리(Controller)와 서버 측에서의 HTML(View 화면)에 대한 제어, DB서버와의 연동을 통한 클라이언트에서 전달된 데이터의 처리 및 저장된 데이터 처리(Model)에 대해 어떻게 설계하고 처리하는지 가이드

### MVC Design Pattern 구조

관심사의 분리(Seperation of Concerns, SoC)

**Controller**(node에서는 Route)
- 사용자의 요청과 응답을 처리
- 사용자가 처음으로 대면하는 영역
- 화면, 화면 이벤트 및 데이터 흐름제어
- 모델을 제어하고 상호작용하며 뷰에 전달(상품목록이 담긴 웹페이지 요청이 오면, 모델을 통해 상품 목록을 가져오고, 상품 목록을 뷰에 던져줘서 뷰 엔진 기술(ejs)이 동적으로 html을 만들어서 전달)
- 뷰를 선택하고 뷰에 모델을 전달
- 뷰를 직접적으로 제어하거나 관여하지는 않음

- 요청 유형 
	1. 웹 페이지에 대한 요청(로그인 화면 줘!)
	2. 웹 페이지에 데이터 담아서 요청(동적 웹페이지)
	- 애플 페이지라 한다면 DB에서 맥 상품 데이터를 가져와서 웹 페이지에 담음
	3. 순수한 데이터만 요청(RESTFul)
	- 템플릿이 이미 있고 상품 목록 데이터만 필요한 경우
- 웹페이지/데이터 요청: HttpRequest
- 웹페이지/데이터 응답: HttpResponse
	- 서버에서 클라이언트, 브라우저에 응답을 처리해주는 객체

**View**
- HTML 그릇
- HTML로 UI 표현
- Model 기반 View에 데이터 표현 가능
- view 엔진 기술 = ejs

**Model**
- 데이터에 대한 모든 처리
- 데이터 구조 표현 및 데이터를 담거나 옮김
- 비지니스 로직(BLL) 및 데이터 처리(DAL) 기능을 포함
- Model 상태를 Controller와 View에 notify 가능

## 클라이언트와 서버
- 크롬브라우저가 요청하면 서버 NginX가 응답한다
- 라이브서버를 하면 서버에 소스를 올려서 브라우저가 요청하여 보여줌
- 웹브라우저가 서버에 있는 노드 어플리케이션에 요청
- 서버는 요청에 대한 응답을 보냄

## 라우팅 프로세스

라우팅이란
- 웹 기반에서 웹 브라우저 같은 클라이언트의 요청(Request)에 대한 서버 측에서의 클라이언트 요청과 응답(Response)에 대한 처리 요청 방식(method)과 응답 및 처리 프로세스를 정의하는 작업

- 요청 내용: 웹페이지 요청이나 데이터 등록/수정/삭제/조회
- 요청 방식: GET/POST/PUT/DELETE/PATCH..
- 호출 주소: 도메인 이하 호출 주소
- 응답 방식: 동일 요청방식에 대해 서버측에서도 동일방식으로 요청을 받아줌
- 응답 결과: 웹페이지, 데이터, 파일, 이미지 등

## Frontend and Backend
### Client Side Technologies
JavaScript, CSS, HTML
Framework(Jquery, Vue.js, React.js, Angular.js)

### Server Side Technologies
Node.js, PHP, JAVA, C#, Python
Framework(express, spring, Jango...)

웹 프로그래밍의 주업무는 HTML, 데이터를 다루는 일
HTML과 데이터를 다루는 것은 클라이언트와 서버 양측에서 모두 가능
클라이언트에서 HTML과 데이터를 다루고 런타임 환경이 브라우저이면 프론트엔드 웹 개발자
서버에서 HTML과 데이터를 조작하고 서버가 런타임 환경이면 백엔드 웹 개발자

## 웹페이지 요청과 응답 프로세스

도메인 주소
DNS: 서버 컴퓨터의 IP 주소를 문자열로 된 도메인 주소 체계로 맵핑 관리해주는 것
DNS Server: 도메인 주소를 서비스하는 서버의 IP주소 제공

서버ip -> 도메인으로 변환 해서 진행해주는 DNS 서버

http://www.naver.com
통신규약://호스트명.도메인명/호출주소체계
호스트명+도메인주소 = 하나의 웹사이트를 서비스하는 주소


---
http://www.naver.com
통신프로토콜:// 호스트명(www).도메인명

HTTP = Hyper Text Transfer Protocol: HTML에 대한 요청과 응답을 주고받을 때 지켜야하는 약속, 인터넷 통신 규약

URL = Uniform Resource Locator (인터넷 주소, 링크 주소)

URI = Uniform Resource Identifier

https://www.naver.com/member/entry
통신프로토콜://특정 웹사이트(호스트).도메인조수(웹서버주소)/컨트롤러명(라우팅파일)/액션메소드(라우팅메소드)

- 실질적인 기능은 라우팅메소드에서 처리 

---
무신사 웹 구현

**로그인**
GET
https://www.musinsa.com/auth/login
- login 웹 페이지 요청 및 응답 처리

POST
https://www.musinsa.com/auth/login
- 사용자 로그인 정보 수신 및 로그인 처리 후 결과 응답 처리 

**회원가입**
GET 
https://www.musinsa.com/member/join
- 약관 동의
- 회원 약관 요청 및 응답 처리

GET 직접회원가입
https://www.musinsa.com/member/entry
- 직업 회원 메일 주소, 암호 입력 회원가입 웹페이지 요청 및 응답

POST 신규회원가입 정보 처리 요청
https://www.musinsa.com/member/entry
- 신규 가입 회원 정보 수신 및 가입 처리 후 결과 응답

**상품 목록**
상품 카테고리 별 상품 목록 표시
https://www.musinsa.com/categories/001005

**상품**
단일 상품 상세 정보 제공
https://www.musinsa.com/goods/2889435
