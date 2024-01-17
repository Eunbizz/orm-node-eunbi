//socket.io 팩키지 참조
const SocketIO = require("socket.io");


//socket.js모듈 기능정의
module.exports =(server)=>{
    const io = SocketIO(server,{path:"/socket.io"});

    io.on("connection",(socket)=>{
        // 클라이언트에서 메시지를 보내오면 수신하는 서버측 메시지 수신기
        socket.on("broadcast",function(msg){
            
            io.emit("receiveAll",msg);

        });
    });
}