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

var io = socketio.listen(server); // 소켓서버 생성 및 실행

io.sockets.on('connection', function(socket){
    console.log('connection 이벤트 발생 !!!');
    socket.on('sendMsg', function(data){
        console.log('sendMsg 이벤트 발생 :: ' + data);
        io.sockets.emit('outputMsg', data); // 클라이언트쪽에서 input text 입력받은 값
    });
});
