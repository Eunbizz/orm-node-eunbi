## ECMAScript 정의

- ECMAScript = Ecma International이 ECMA-262 기술 규격에 따라 정의하고 있는 표준화된 스크립트 프로그래밍 언어
    - Ecma 인터내셔널은 **정보 통신에 대한 표준을 제정하는 비영리 표준화 기구**
    - **ECMA-262는 **Ecma 인터내셔널에 의해 제정된 하나의 기술 규격의 이름**으로, **범용 목적의 스크립트 언어에 대한 명세****
- ES2015: 2015년 자바스크립트 문법에 큰 변화 발생
    - 새로운 기능들과 문법들이 대거 추가되며 객체지향 프로그래밍 언어로 변모

#### 1) Script 언어

- 스크립트 언어는 매우 빠르게 배우고 작성하기 위해 고안됨
- 짧은 소스 코드 파일이나 간단한 컴퓨터 프로그래밍 개발에 사용됨
- JavaScript, TypeScript 등 다양한 종류의 스크립트 언어 존재

#### 2) JavaScript 언어

- 객체 기반 스크립트 프로그래밍 언어
- ECMAScript 사양을 준수하는 범용 스크립트 언어
- 과거 (2010년 이전) 웹 브라우저 기반에서 웹페이지 HTML/CSS 제어 및 기능 구현 언어로 사용됨
- 최근엔 서버측 동적 웹 프로그래밍(Node.js) 및 다양한 분야에서 사용됨'
---

## ECMAScript 2015 Plus 주요 문법

## 1. 신규 변수, 상수 사용법
- 기존 변수선언 방식 var를 대체하는 새로운 변수 선언 방식제공 let 제공
- var 변수선언방식은 블록스코프 개념이 없어서 특정 블록안에서 선언된 변수값을 블록범위 밖에서 언제든지 변경이 가능해서 문제를 초래함.
- 블록스코프 내에서 선언된 let, const 값은 그 안에서만 사용 및 변경이 가능하다.

### var, let, const 차이점  

1. 중복 선언 가능 여부
    - var : 중복해서 선언(+초기화)가 가능하다.  
        이 경우, 마지막에 할당된 값이 변수에 저장된다.  
        기존에 선언해둔 변수의 존재를 까먹고, 값을 재할당하게 되는 등의 실수가 발생하기 쉽다.  
        
    - const, let : 중복 선언 불가능  
        이미 선언한 변수를 다시 선언할 경우, 에러가 발생한다.  
        var에 비해서 코드의 안정성을 높여줄 수 있는 방식  
        
2. 재할당 가능 여부
    - var, let : 값의 재할당이 가능한 변수다. 변수 선언 및 초기화 이후에 반복해서 다른 값을 재할당 할 수 있다.
    - const : 값의 재할당이 불가능한 상수다. const는 상수를 선언하는 키워드다. 처음에 선언 및 초기화하고 나면 다른 값을 재할당 할 수 없다.  
        **var, let과 달리 const 선언에서는 반드시 값을 선언과 동시에 정의해야 한다**
3. 변수 스코프 유효범위
    
    - 스코프란 유효한 참조 범위를 말한다. 예를 들어, 함수 내부에서 선언된 변수는 함수 내부에서만 참조가 가능하다.
    
    - var : 함수 레벨 스코프(function-level scope) var는 함수 내부에 선언된 변수만 지역변수로 한정하며, 나머지는 모두 전역변수로 간주한다.
    - let, const : 블록 레벨 스코프(block-level scope) let, const는 함수 내부는 물론, if문이나 for문 등의 코드 블럭{ ... } 에서 선언된 변수도 지역변수로 취급한다. 당연히 함수 내부에서 선언된 변수도 외부에서 참조할 수 없다.  
        var는 함수 내부에 선언된 변수만 지역 변수로 인정하는 함수 레벨 스코프이다.  
        let, const는 모든 블록 내부에서 선언된 변수까지 지역변수로 인정하는 블록 레벨 스코프이다.

***전통적인 자바스크립트 변수선언방식 var**

```
var userName = "이보람";
var age = 40;
var price = 5000;
// var isMale = false;  // 0 or 1, Boolean형
var isMale = true;  // 0 or 1, Boolean형

// 기본배송비
// 기본배송비는 한번 할당/설정해두면 변경되면 안된다.
var baseDelyFee = 3000;

console.log("기본배송비1:", baseDelyFee);

// 기본배송비 변경
baseDelyFee = 13000;

// 전통적인 var 변수선언 방식은 상수(한번 할당하면 변경 불가 변수)개념을 지원하지 않는다.
console.log("기본배송비2:", baseDelyFee);
```

**2015년도 자바스크립트 신규문법으로 추가된 상수**

```
const newBaseDelyFee = 5000;
console.log("상수로 표현하는 기본 배송비:", newBaseDelyFee);

// 상수로 선언된 배송비 값을 변경해보자.
// 상수값을 변경하려해서 에러 발생!!!
// newBaseDelyFee = 10000;

// 총 결제금액 초기값 할당
// let으로 선언된 변수는 초기할당이후 변수값 변경이 가능하다 = var
let totalPayPrice = 0;

console.log("총결제 금액:", totalPayPrice, "/ 상수기본 배송비:", newBaseDelyFee);

// let으로 선언된 변수값을 변경해보자
totalPayPrice= 1;
console.log("총결제 금액:",totalPayPrice);

// var 변수선언방식은 블록스코프 개념이 없어서
// 특정 블록안에서 선언된 변수값을 블록범위 밖에서 언제든지 변경이 가능했다.
// 이런 var 변수선언방식은 다양한 문제를 초래했다.

// 총 결제금액에 기본배송비를 추가함
// totalPayPrice = totalPayPrice + baseDelyFee;
totalPayPrice += baseDelyFee;

// 총 결제금액에 기본 상품가격을 추가함
totalPayPrice += price;

console.log("총 결제 금액 :",totalPayPrice)
```

---
## 2. 템플릿 문자열 문법 사용법
- 역 홑 따옴표(벡틱 문자열)으로 문자열 기반 탬플릿을 작성할 수 있다.
- 줄바꿈 기늠
- 벡틱 문자열 안에 변수 추가 가능

`string text` // 문자열 표현 `string text line 1 string text line 2` // 개행된 문자열 표현

var expression; `string text ${expression} string text` // 변수값 문자열 조합

function tag() { }; tag `string text ${expression} string text` // 함수 호출 아규먼트

***es6 이전의 표기법**
```
var a = 30;
var b = 3;
var c = "자바스크립트";
var str = "저는 " + (a+b) + "살이고 " + c + "를 배우고 있습니다.";

console.log(str)    // 저는33살이고 자바스크립트를 배우고 있습니다.
```

***템플릿 리터럴에서는 아래와 같이 $와 중괄호{}를 사용하여 표현식을 표기할 수 있습니다.**
```
let a1 = 30;
let b1 = 3;
let c1 = "자바스크립트";
let str1 = `저는 ${a1+b1}살이고 ${c1}를 배우고 있습니다.`;
console.log(str1);   // 저는33살이고 자바스크립트를 배우고 있습니다.
```
위 처럼 + 연산자로 문자열을 연결해주는 것보다 가독성이 더 좋다.

---
## 3. 자바스크립트 객체 정의 및 사용법

**클래스와 객체의 개념**
- 클래스 = 현실세계에 존재하는 실체들의 공통적인 속성과 기능을 일반화시킨 개념
- 객체 = 현실세계에 존재하는 실체
- 객체지향 프로그래밍은 일반화 시킨 개념인 클래스를 기반으로 프로그래밍하는 방식

```
var name = "이보람1";
var age = 33;

// 자바스크립트 언어는 class를 지원하지만
// 손쉽게 객체를 만드는 방법으로 {}를 이용해 객체를 바로 정의해서 사용할 수 있다.

var user = {
    // name: name,  // 객체의 속성명과 해당속성에 할당하는 변수명이 같으면 변수를 생략가능하다.
    name,
    age: age,
    address: "인천광역시 부평구",
    telephone: "010-2256-5222",
    teach:function() {
        return "learn node.js now"
    }
};

console.log("사용자 자바스크립트 객체 출력 :",user);

```

**SW를 개발하는 목적/이유**

- 개발을 하기 위해선 일반화란 개념이 필요하다
- 일반화시킨 개념인 클래스를 기반으로 프로그래밍을 하는 방식 = 객체지향 프로그래밍order order = new Order(); 클래스를 이용해 객체를 생성 클래스를 통해서 객체를 생성하는 행위 (인스턴스 생성)
- Order클래스를 통해서 새로운 실체인 order 객체를 생성

```
order.name = "",
order.grade = "vip",
order.address = "인천시 ...",
order.phone = "010-",
order.payment()
```
- 클래스(Class)(속성, 기능)를 이용해 객체를 생성하고
- 객체는(Object)속성 : 특성, 어트리뷰트(Attribute), 프로퍼티(Property)기능 : 메소드(Method), 함수(function)
---
## 4. 비구조화 할당 문법 사용법
- 배열이나 객체로부터 배열내 값이나 객체 속성들의 값을 빠르게 변수/상수에 할당 사용 가능
- 구조화 되지 않은 형식으로 배열내의 값들이나 객체내의 속성 및 함수를 일괄 선언 및 값으로 할당가능

```
// 전통적인 구조화된(일반적인) 배열과 객체에서의 값을 추출하는 방법

// 문자열 배열을 정의하고 값을 할당
const books = ['React', 'Vue', 'Angular', 'Svelt', 'Jquery'];

// 구조화된 배열 값을  추출하여 변수에 할당하는 전통적인 방법
var book1 = books[0];
var book2 = books[1];
```
### `Array Destructuring`

```
// 비구조화 할당 방식으로 상수를 선언하고 값을 할당
const [book4, book5] = ['JAVA', 'C#', 'Python', 'PHP', 'JavaScript'];

// 비구조화 할당하고 나머지 값들은 배열로 받기
const [book6, ...extrabooks] = ['자바', '닷넷', '파이썬', 'PHP', '노드'];

const [book7, book8, book9, book10, book11, book12='데이터베이스'] = ['자바', '닷넷', '파이썬', 'PHP', '노드'];
```

### `Object Destructuring`

```
// 객체의 비구조화 할당
const techTrend = {
	front: 'React',
    backend: 'Node.js',
    server: 'Linux'
};

// 구조화된(전통적인) 방식으로 객체의 속성 값 추출
var frontTech = techTrend.front;
var backendTech = techTrend.server;

// 비구조화된 방식으로 객체의 속성 값 추출
const {front, backend, server, getAuthor} = {
	front: 'React',
    backend: 'Node.js',
    server: 'Linux'
    getAuthor:function(){
    	return '김은비';
                }
```

---
## 5. 익명함수와 화살표 함수 사용법

```
// case1: 전통적인 자바스크립트 함수(기능) 정의 방식
// 함수의 사용 목적 = 코드의 재사용
// function 함수명(입력 파라미터=매개변수){처리 로직 구현 return 반환구문}

function fnPlus(a,b){
	let c = a+b;
    return c;
    };

var result = fnPlus(1,2);
console.log('전통적인 함수 정의:', result);


// 함수 정의 case2: 익명함수 = 함수 명 없이 함수 정의

var plus1 = function(a,b){
	return a+b;
    };
    
var result = plus1(1,2);


// 함수 정의 case3: 화살표 함수(화살표+익명함수): function 예약어 사용 안함

var plus2 = (a,b) =>{
	return a+b;
    };

// 함수 정의 case4: 화살표 함수의 return 구분까지도 없애보자

var plus3 = (a,b) => (a+b);
```
---
## 6. Enhanced Object Literals
- Makes declaration of object literals more concise and expressive.
### `Property Shorthand`

```
const a = 1, b = 2;
const obj = { a, b }; // a concise expression of var obj = { a: a, b: b };
console.log(obj); // { a: 1, b: 2 }

===============================================================

function createPoint(x, y) {
  return { x, y };
}

console.log(createPoint(10, 20)); // { x: 10, y: 20 }
```
### `Method Shorthand`
- Previously, defining methods in object literals required a function expression
- This shorthand syntax can make object literals that act as simple interfaces or controllers much cleaner

```
const calculator = {
  operand1: 5,
  operand2: 10,
  add() {
    return this.operand1 + this.operand2;
  },
  subtract() {
    return this.operand1 - this.operand2;
  }
};

console.log(calculator.add());      // 15
console.log(calculator.subtract()); // -5

```
---
## 7. Promises
- An object representing the eventual completion or failure of an asynchronous operation.
- Provides a cleaner, more robust way of handling asynchronous logic.
- It is to simplify asynchronous code, avoiding the pitfalls of callbacks, such as callback hell and pyramid of doom.
### 1. `Simulating Data Fetching`

```
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching data for user ${userId}...`);
    setTimeout(() => {
      // Simulating a successful server response
      const userData = {
        id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com'
      };
      resolve(userData);
    }, 2000); // 2-second delay to simulate server response time
  });
}

```

### 2. `Processing the Fetched Data`

```
function processUserData(userData) {
  return new Promise((resolve, reject) => {
    console.log('Processing user data...');
    setTimeout(() => {
      const processedData = {
        ...userData,
        name: userData.name.toUpperCase()
      };
      resolve(processedData);
    }, 1000); // 1-second delay to simulate processing time
  });
}
```

### 3. `Using the Functions with Promise Chaining`

```
fetchUserData(123)
  .then(userData => {
    return processUserData(userData);
  })
  .then(processedData => {
    console.log('Processed Data:', processedData);
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
```
- fetchUserData is called first. It logs a message, waits for 2 seconds, then resolves with mock user data.
- The then following fetchUserData takes the resolved user data and passes it to processUserData.
- processUserData then logs a message, waits for 1 second, and resolves with the modified user data (uppercase name).
- The second then logs the processed data.
- If any error occurs during these operations, the catch block will log the error.
---
## 8. Classes
- Syntactic sugar over JavaScript's existing prototype-based inheritance.
- Provides a clearer and more concise way to create objects and deal with inheritance.
### `Inheritance`

- The `extends` keyword is used in class declarations to create a class as a child of another class.
- The `super` keyword is used to call the constructor of the parent class and to access the parent's methods.

```
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call the parent class's constructor
    this.breed = breed;
  }

  speak() {
    super.speak(); // Call the parent class's method
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog('Rex', 'Golden Retriever');
dog.speak();
// Output:
// Rex makes a noise.
// Rex barks.

```

---
## 9. Modules
- Introduces native support for modules in JavaScript.
- Use export to expose modules, and import to bring them into other modules.
### `Exporting`

```
// In file math.js
export const add = (a, b) => a + b;
```
### `Importing`

```
// In another file
import { add } from './math.js';
console.log(add(2, 3)); // 5
```
