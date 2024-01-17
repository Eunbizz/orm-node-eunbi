// 로컬 사용자 인증 전략 모듈 참조 - 직접 사용자 가입 및 로그인 구현
const local = require('./localStrategy');

// 해당 모듈에 패스포트 객체가 전달됨
// 회원 로그인하는 라우팅 메소드에서 전달되는 패스포트 객체를 전달받아 사용
module.exports = (passport) => {
  //로그인한 사용자의 기본정보만 req.session객체에 저장
  //req.login()메소드 호출시 자동 호출됨.
  // passport 객체에 로그인 사용자의 세션 정보를 세팅하는 함수
  // 사용자 로그인 완료 후 로그인한 사용자 정보를 세션에 담아주는 함수
  passport.serializeUser((user, done) => {
    //req.session 객체에 저장할 로그인 사용자의 기초 데이터 세팅
    //저장할 관리자 세션의 기본정보세팅
    // 로그인한 사용자 데이터 정보를 세션 영역에 바인딩해주는 역할
    done(null, user);
  });

  // 바인딩된 세션 데이터를 조회하는 역할
  //매 요청시마다 실행 : app.js내 passport.session()미들웨어에서 호출
  //필요한 경우 로그인한 관리자의 풀정보를 조회하여 사용할수 있는 기능제공
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // 로컬 사용자 전략에 패스포트 객체를 전달하여 실제 사용자 로그인 기능을 구현
  // 아이디/암호 체크하고 세션으로 저장할 데이터를 정의하는 기능 제공
  local(passport);
};