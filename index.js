var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(); // 웹서버 생성
var io = socketio.listen(server); // 소켓서버 생성 및 실행

// 웹서버 실행
server.listen(3000, function(){
    console.log('Server Running');
});

// request 이벤트 발생시
server.on('request', function(request, response){
    fs.readFile('HTMLPage.html', function(error, data){
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);
    });
});

var roomName = null;
io.sockets.on('connection', function(socket){

    socket.on('join', function(data){
        roomName = data; // 클라이언트쪽에서 prompt로 사용자한테 입력받은 방이름
        socket.join(data);
        console.log("join된 방이름 : " + roomName);
    });

    socket.on('sendMsg', function(data){
        console.log('방이름:' + roomName + ' / 메시지: ' + data);
        io.sockets.in(roomName).emit('outputMsg', data); // 클라이언트쪽에서 input text 입력받은 값
    });
});
