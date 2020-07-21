const socketIo = require('socket.io-client');
for(let i = 0;i<10000;i++){
    let socket = new socketIo('http://localhost:3000');
    console.log(i)
    socket.emit('chat message', 'hello');
}