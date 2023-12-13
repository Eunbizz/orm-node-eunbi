
// 콜백 지옥
// 콜백 함수의 한계: 콜백 지옥 -> promise -> async/await 문법을 이용해
// 콜백함수의 콜백 지옥을 벗어나 자유롭게 비동기 프로그래밍 환경에서
// 순차/절차 기반 프로그래밍을 손쉽게 해보자


var fnHell= function(){

    console.log("로직1 완료");

    //2번쨰로직 구현함수
    setTimeout(function(){
        console.log("로직2 완료");

        //3번쨰로직 구현함수
        setTimeout(function(){
            console.log("로직3 완료");

            //4번쨰로직 구현함수
            setTimeout(function(){
                console.log("로직4 완료");

                setTimeout(function(){
                    console.log("로직5 완료");
                },1000);

            },1000);

        },1000);

    },1000);

}

var fnHeaven= function(){

    console.log("로직1 완료");

    //2번쨰로직 구현함수
    setTimeout(function(){
        console.log("로직2 완료");
    },1000);


    //3번쨰로직 구현함수
    setTimeout(function(){
        console.log("로직3 완료");
    },2000);

    //4번쨰로직 구현함수
    setTimeout(function(){
        console.log("로직4 완료");
    },3000);

    setTimeout(function(){
        console.log("로직5 완료");
    },4000);

}


fnHell();
fnHeaven();