var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(request, response){
    fs.readFile('HTMLPage.html', function(error, data){
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);
    });
}).listen(3000, function(){
    console.log('Server Running');
});

// 소켓 서버 생성 및 실행
var id = 0;
var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
    id = socket.id; // id 설정 :: 가장 최근 접속한 사용자의 id값이 들어감

    // 서버쪽 이벤트 정의
    socket.on('serverEvt', function(data){
        console.log('Client Send data: ', data);

        // 클리언트쪽 이벤트 발생
        io.sockets.to(id).emit('clientEvt', data);
    })
});
