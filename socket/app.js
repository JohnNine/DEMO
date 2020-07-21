const express = require("express");
const app = express();
app.use(express.static(__dirname));

const server = require("http").createServer(app);
const io = require("socket.io")(server);

// 用来保存对应的socket
let socketObj = {};
// 上来记录一个socket.id用来查找对应的用户
let mySocket = {};
// 创建一个数组用来保存最近的20条消息记录
let msgHistory = [];

const SYSTEM = "系统";

io.on("connection", (socket,req) => {
    // 这是所有连接到服务端的socket.id
    console.log(socket)
    mySocket[socket.id] = socket;
    console.log("id", socket.id);
    socket.emit("getId", socket.id);

    // 记录用户名，用来记录是不是第一次进入
    let username,
        rooms = [];
    // 监听客户端发过来的消息
    socket.on("message", msg => {
        let msgObj = {
            user: "ionantha",
            content: msg,
            id: socket.id,
            createAt: `${addZero(new Date().getHours())}:${addZero(
                new Date().getMinutes()
            )}:${addZero(new Date().getSeconds())}`
        };

        // 如果rooms数组有值，就代表有用户进入了房间
        if (rooms.length) {
            // 用来存储进入房间内的对应的socket.id
            let socketJson = {};

            rooms.forEach(room => {
                // 取得进入房间内所对应的所有sockets的hash值，它便是拿到的socket.id
                let roomSockets = io.sockets.adapter.rooms[room].sockets;
                Object.keys(roomSockets).forEach(socketId => {
                    console.log("socketId", socketId);
                    // 进行一个去重，在socketJson中只有对应唯一的socketId
                    if (!socketJson[socketId]) {
                        socketJson[socketId] = 1;
                    }
                });
            });

            // 遍历socketJson，在mySocket里找到对应的id，然后发送消息
            Object.keys(socketJson).forEach(socketId => {
                mySocket[socketId].emit("message", msgObj);
            });
        } else {
            // 把发送的消息push到msgHistory中
            // 真实情况是存到数据库里的
            msgHistory.push(msgObj);
        }
    });
    // 监听进入房间的事件
    socket.on("join", room => {
        // 判断一下用户是否进入了房间，如果没有才让其进到房间里
        if (username && rooms.indexOf(room) === -1) {
            console.log(username)
            // socket.join表示进入某个房间
            socket.join(room);
            rooms.push(room);
            // 这里发送个joined事件，让前端监听后，控制房间按钮
            socket.emit("joined", room);
            // 通知一下自己
            socket.send({
                user: SYSTEM,
                color,
                content: `你已加入到${room}`,
                createAt: `${addZero(new Date().getHours())}:${addZero(
          new Date().getMinutes()
        )}:${addZero(new Date().getSeconds())}`
            });
        }
    });
    // 监听离开房间的事件
    socket.on("leave", room => {
        // index为该房间在数组rooms中的索引，方便删除
        let index = rooms.indexOf(room);
        if (index !== -1) {
            socket.leave(room); // 离开该房间
            rooms.splice(index, 1); // 删掉该房间
            // 这里发送个leaved事件，让前端监听后，控制房间按钮
            socket.emit("leaved", room);
            // 通知一下自己
            socket.send({
                user: SYSTEM,
                color,
                content: `你已经离开${room}`,
                createAt: `${addZero(new Date().getHours())}:${addZero(
          new Date().getMinutes()
        )}:${addZero(new Date().getSeconds())}`
            });
        }
    });

    // 监听获取历史消息的事件
    socket.on("getHistory", () => {
        if (msgHistory.length) {
            let history = msgHistory.slice(msgHistory.length - 100);
            socket.emit("history", history);
        }
    });
});

// 时间补零
function addZero(n) {
    return n < 10 ? "0" + n : "" + n;
}

server.listen(4000);