

const {odd, even} = require('./base1');
const checkOddOrEven = require('./base2');

// 문자열 텍스트를 전달하면 문자열의 길이값을 2로 나눠서 나온 나머지 값이 홀짝인지 판단하는 함수
function checkStringOddorEven(str){
    if (str.length %2){
    return odd;
    }
    return even;
};

console.log('숫자에 대해 홀수짝수여부를 판단 ->', checkOddOrEven(5));
console.log('문자열 길이가 홀수인지 짝수인지 판단 ->', checkStringOddorEven('안녕하세요'));

