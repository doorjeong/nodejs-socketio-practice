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
var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
    console.log('socket.io 정상 접속 완료');
});
