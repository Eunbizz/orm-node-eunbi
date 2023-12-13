// console.log('최초 생성한 노드 백엔드 자바스크립트 모듈 파일입니다.')

// 설치된 오픈소스 노드 패키지를 참조
// node.js에서는 require('설치패키지명') 예약어를 통해 지정한 설치된 노드패키지를 참조
// moment 패키지는 자바스크립트 일자/시간정보를 개발자가 원하는 문자포맷으로 표현하는 기능

const moment = require('moment');

// dotenv 패키지 참고
// dotenv 패키지는 해당 프로젝트/노드 어플리케이션의 환경 설정 정보에 접근해서
// 전역 어플리케이션 환경 변수 정보를 추출
const env = require('dotenv');

// 프로젝트 루트에 있는 .env 환경설정파일에 정의된 각종 어플리케이션 환경변수를 메모리에 올림
env.config();

// 순수 자바스크립트 일시/시간 정보
console.log('순수자바스크립트 일시정보: ', Date.now());

//moment 패키지를 이용해 자바스크립트 일시 정보 출력
console.log('모멘트 패키지 일시정보: ', moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));

// .env 파일 내 특정 환경변수정보 추출
const companyName = process.env.COMPANY_NAME;
console.log('지정한 환경 변수 출력: ', companyName);

// 카멜식 코딩 변수 작성법

