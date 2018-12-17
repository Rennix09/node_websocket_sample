const io = require('socket.io');
const http = require('http');

let server = http.createServer();
server.listen(8080);

// websocket需要传入一个http服务
let wsServer = io.listen(server);

wsServer.on('connection', sock => {

    console.log('an new client connected');

    // 浏览器发送消息到 send 里时，触发这个函数
    sock.on('send', msg => {
        console.log(`接收到了浏览器的消息: ${msg}`);
    });

    // 每隔三秒钟 向浏览器发送一条消息
    setInterval(() => {
        sock.emit('receive', new Date());
    }, 3000);

});