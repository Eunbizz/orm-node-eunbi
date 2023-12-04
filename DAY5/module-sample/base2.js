
// base1모듈에서 제공해주는 각종 상수와 함수 참조
// 다른 모듈 / 설치된 노드패키지의 기능 사용(참조)하기 위해서는 require라는 예약어를 사용
const {odd, even, test} = require('./base1.js');


// 숫자를 매개변수로 받아서 해당 값이 홀수인지 짝수인지 체크
// 홀수이면 홀수입니다, 짝수이면 짝수입니다라는 문자열을 반환
// 모든 언어에서 %는 나머지값을 구할 때 사용
function checkOddOrEven(num){
    // num%2값은 죽어도 0 아니면 1값이 반환
    // 1 = true, 0 = false
    if (num%2){
        return odd;
    }
    return even;
}

// var num = 10;
// var result = checkOddOrEven(num);
// console.log(`${num}은 ${result}`);

// 모듈의 기능과 속성을 외부에 제공할 때는 {}객체로도 노출이 가능하고
// 단일 함수 형태도 바로 제공이 가능
module.exports = checkOddOrEven;