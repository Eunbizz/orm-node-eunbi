## Node.js
자바스크립 엔진으로 빌드된 자바스크립트 런타임
런타임: 특정 개발 언어로 만든 프로그램을 실행할 수 있는 환경
노드는 자바스크립트로 개발된 프로그램을 각종 컴퓨터에서 실행할 수 있게 런타임 환경 지원
이벤트 기반 개발 모델
가볍고 효율적인 백엔드 자바스크립트 기반 개발 프레임워크
자바스크립트 오픈소스 라이브러리 저장소 생태계 제공
## NPM(Node Package Manager)
패키지 저장소
npm을 통한 노드 패키지 저장소 오픈소스 로컬 관리
## package.json

## NPM 주요 명령어
- 신규 패키지 설치: npm install 패키지명 or npm i 패키지명
- package.json 파일: dependencies 영역 아래 설치된 패키지 이력이 기록 저장됨
- node-modules 폴더: 명령어에 의해 설치된 실제 노드 패키지 소스들의 물리적 파일 위치
- package-lock.json: 설치된 패키지들간의 의존/종속 관계 정보를 관리해줌(개발자가 건드는 경우는 거의 없음)
- package.json 파일만 있으면 npm install을 통해 프로젝트에서 사용한 모든 패키지들을 자동 복원 재설치 가능
### 싱글 스레드 기반 어플리케이션
cpu 작업 단위는 프로세스가 있고 process 안에 Thread 라는 단위가 있습니다.
node.js는 하나의 노드 어플리케이션이 싱글 스레드로 관리됨
## 설치하는 노드 패키지의 용도 2가지
1. 서비스를 위한 개발 용도 패키지
- 서비스를 위해 반드시 필요한 패키지
- npm i 패키지
- npm i -g 패키지
1. 개발할 때만 사용하는 패키지
- 개발용 패키지
- 개발 생산성/효율성 재고를 위한 패키지 설치
- npm i 패키지명 --save-dev
- -> devDependencies 추가됨
## 개발 컴퓨터 전역 공간에 전역 패키지 설치
npm install -global 패키지명
안될 경우 sudo
## ECMAScript
### Script 언어
- 스크립트 언어는 매우 빠르게 배우고 작성하기 위해 고안됨
- 짧은 소스 코드 파일이나 간단한 프로그래밍 개발에 사용
- JavaScript, ShellScript, 바닐라스크립트, TypeScript...
### JavaScript 언어
- 객체 기반 스크립트 프로그래밍 언어
- 과거 주로 웹 브라우저 기반의 HTML/CSS 제어 및 기능 구현 언어로 사용됨
- ECMAScript는 ECMA 인터내셔널의 ECMA-262 기술 규격에 정의된 자바 스크립트 언어 표준 스펙을 준수한 스크립트를 말함
- 2015년 자바스크립트 문법에 기존과 다른 큰 변화 발생
- 새로운 기능들과 문법들이 대거 추가되면서 객체지향 프로그래밍 언어로 변모
