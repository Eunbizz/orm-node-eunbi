MySQL Client Tools

DB Client                  <---------> DB Server(MySQL, MariaDB, Oracle, MSSQL..)
MySQL workbrench <---------> MySQL Server
- Node Application <---------> MySQL
	- SQL 구문을 작성해서 DB 서버로 전송 -> MySQL에서 클라이언트에서 보낸 SQL 구문을 파싱, 구문 분석, 실행, 결과 반환
	-                                                          <-- SQL 실행결과를 클라이언트에 전송
	-                                     (등록한 경우 등록데이터, 수정한 경우 수정건수, 삭제한 경우 삭제건수, 조회한 경우 조회결과)
- Python App
- IOS/Android App

RDBMS
- Database(Schemas) : 하나의 작은 시스템당 하나의 DB, 또는 큰 시스템의 하나의 업무단위(ERP = 생산관리 DB, 인사 DB, 회계 DB, 영업관리 DB), 하나의 서버를 업무단위로 사용
- DB Objects
	- Tables: 실제 사용자 데이터가 저장되고 관리되는 객체
		- member, member_config, product, article, chat...
	- Views: 가상의 테이블, 실제 물리적으로 존재하지 않지만 여러 테이블 또는 특정 구조의 테이블 구조가 필요한 경우 가상의 테이블을 만들어서 테이블처럼 사용가능
		- 주로 여러개 흩어져있는 테이블간의 관계를 이용해 자주 사용하는 데이터 구조를 가상의 테이블로 만들어 사용
		- ex) uv_member_config로 member, member_config를 조인한 뷰
	- Procedures: stored Procedure는 자주 사용되는 장문의 SQL 쿼리(비지니스 로직이 SQL 구문 안에 담긴 경우)를 DB 서버에 저장해두고 사용하는 방법(비용 절감)
	- Functions: DB 함수, SQL 코드를 재사용하고 싶은 경우 DB 서버에 SQL 함수를 만들어서 SQL 코드를 재사용 가능
		- 단일값 함수와 목록형 함수 두 가지로 개발


### 전체 게시글 목록 조회 표시: 총 비용 100
Frontend(React.js) <-----5%-------> Backend(Node RESTful) <------70%------> DB Server(Database)
게시글 목록 표시 (10%) <------------> 게시글 목록 요청 -------> 게시글 목록 조회 SQL 작성 전송 -------> 게시글 테이블 조회 SQL 실행 조회 결과 반환(10%)

=> 데이터 핑퐁에 비용이 많이 듬(따라서 로직을 SQL 쿼리에 다 넣는 방법 사용)

### Table
- 데이터를 실제 저장하는 DB 객체
- 칼럼과 로우로 구성됨
- 칼럼 = 데이터 관리 항목이며 로우 각 항목으로 수성된 실제 데이터

컬럼 정의 및 데이터 유형
- 문자형
	- CHAR: 고정길이형 문자, 해당 길이만큼 사이즈를 사용, 실제 데이터가 안들어가도 데이터길이가 고정된 형태데이터 입력(성별(2), 생년월일(6)..)
	- VARCHAR: 가변길이형 문자(사용하지 않은 영역은 반환, 입력한 값만큼 사용
	- TEXT: 100자리 이상 긴 문자열
	- 알파벳 문자 하나를 저장하는 크기: 1Byte = 8bit
	- 유니코드 문자 하나: 2Byte = 16bit
- 숫자형
	- INT: 정수형
	- TINYINT: -127~128까지 정수형, 실수형(DECIMAL, DOUBLE)
- 날짜형
	- DATETIME: 날짜시간
	- DATE: 날짜
	- TIME: 시간
- 불린형
	- TINYINT(1)

## MySQL Workbench

1) RDBMS의 중요 목표
- 저장된 데이터에는 결함이 없어야하는 데이터 무결성 원칙을 수립해야함
- 각종 제약(Contraint Key) 조건을 이용해 데이터 무결성 유지
- 대표적인 제약조건에는 PrimaryKey, ForeignKey, Default, Null 체크, Unique 키..
	- PrimaryKey: 중복된 값을 받지 않음으로써 무결성 유지
	- ForeignKey: 왜래키
- 조회 성능 향상을 위한 제약 조건키: IndexKey
- PrimaryKey는 모든 테이블에 반드시 하나 이상 존재 

2) 컬럼 주요 키워드
- NULL & NOT NULL 차이
	- NULL: 널널하다. 즉, 데이터가 안들어와도 된다
	- NOT NULL: 반드시 데이터가 들어와야하는 컬럼
- AUTO_INCREMENT: 자동 숫자 증가 데이터 생성 (고유 번호는 PK를 지정하기 모호한 테이블인 경우 고유번호 컬럼을 만들게 됩니다. AI (Auto Increment) constraint(제약조건) 사용 컬럼 생성)
- UNSIGNED: 숫자형인 경우 음수는 무시하고 양수만 저장(음수값이 들어가면 안되는 컬럼)
- ZEROFILL: 숫자의 자릿수 고정 ex) INT(4) -> 0001

3) 주요 키
- PRIMARY KEY: 유일키(NonClusted Index Key)
- UNIQUE KEY: 유니크 키
- FOREIGN KEY: 참조 키
- INDEX KEY: 인덱스 키
	- Non Clusted
	- Clusted
	- 인덱스 분포도

---
하나의 시스템(웹시스템=정보관리시스템)을 개발하는 단계..
- 요구사항 접수 -> 요구사항 정의 -> 분석 -> 설계 -> 개발 -> 테스트 -> 배포 -> 운영관리
- -----------------모델링 단계----------------
- ------국제 표준 모델링언어 = UML(Unified Modeling Language=Diagram)------------<개발언어>
-  -------------모델링 전용 툴 사용------------<개발툴(vscode)>
- 기획-디자인-설계-개발-테스트-배포/운영관리
=> 워터폴 개발방법론: 한 단계 끝나면 다음 단계 끝나면 다음 단계 .. >> 프로젝트가 산으로 감..
=> 애자일 개발방법론: 핵심 기능들을 몇개 추리고 해당 기능 위주로 빠르게 분석/설계는 간단히 프로토타입 개발

시스템 개발 분야
- SI(System Integration): 정부, 대규모 프로젝트 등
- WebAgency
- Solution
- 서비스, 플랫폼

---
ERD Entity Relation Diagram
- UML 언어 중에 Data, Table에 대한 분석/설계 시 사용됨
- Entity(table) 관계를 그림으로 표시하는 것
---
관계형 데이터베이스가 데이터가 많아지면(row가 많아짐) 조회 속도가 떨어진다
- Table Full Scan을 통한 데이터 조회(모든 데이터를 조회해서 일치하는 결과를 반환)

**Table Full Scan 조회 비효율을 개선하기 위한 방법 = Index Key**

시스템 데이터 베이스: sys 
사용자 데이터 베이스: modu_chat

member --> userid, sido(index key), address
                     1, eddy   경기도 성남시
                     50, eddy2   경기도 성남시
                     100, eddy3   제주도
                     
                     
index key 컬럼에 데이터 인덱스 값이 시스템 데이터베이스에 인덱스 정보를 관리
경기도 1, 50
제주도 100
10개 시도의 모든 실제 데이터가 존재하는 물리적인 디스크의 위치를 기록(index)

## SQL(Structured Query Language)
- 구조화된 질의 언어
- 데이터 처리를 위한 언어
- SQL TYPE: DDL, DML, DCL
	- DDL(Data Definition Language): 데이터 정의어, 생성, 수정, 삭제 등의 전체의 골격을 결정
	- DML(Data Manipulation Language): 데이터 조작어, 레코드를 등록 조회 삭제 등
	- DCL(Data Control Language): 데이터 제어어, 접근하거나 권한을 주는 등의 역할

### C/R/U/D SQL
- CREATE: INSERT INTO 스키마명.테이블명 (컬럼1, 컬럼2) VALUES (값1, 값2);
- READ: SELECT * FROM 스키마명.테이블명
- UPDATE: UPDATE 스키마명.테이블명 SET 컬럼명='값'
- DELETE: DELETE 스키마명.테이블명
