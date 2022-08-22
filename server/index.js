const express = require("express");
const app = express();
const cors = require('cors');
const http = require("http");
const { Server } = require('socket.io');

const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', '*:3000'],
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket) => {
    console.log(`Client: ${socket.id} connected!`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
    });

    socket.on('leave_room',(data) => {  
        socket.leave(data);
        console.log(`Client: ${socket.id} left room: ${data}`);
    });


    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} is disconnected!`);
    })
});

server.listen(3001, () => {
    console.log("Listening on port 3001!");
});