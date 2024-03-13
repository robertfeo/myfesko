const { createServer } = require('http');
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);

    socket.on('join room', (user, room) => {

    });

    socket.on('private message', (msg, room) => {
        console.log(`Message: ${msg} in room: ${room}`);
    });

    socket.on('leave room', (room) => {

    });

    socket.on('disconnect', () => {

    });
});

httpServer.listen(3001, () => {
    console.log(`Websocket server is running on port 3001`);
});
