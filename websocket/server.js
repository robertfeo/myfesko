const { createServer } = require('http');
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Store user details keyed by socket ID
const userDetails = {};

io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);

    socket.on('join', (user) => {
        // Store the user details on join
        userDetails[socket.id] = user;
        console.log(`${user.id} joined with email: ${user.email} at ${user.timestamp}`);
    });

    socket.on('message', (msg) => {
        // Attach the sender's details to the message
        const messageToSend = {
            sender: userDetails[socket.id] || { id: '', firstname: 'Unknown', lastname: '', image: null },
            text: msg.text,
            timestamp: msg.timestamp
        };
        io.emit('message', messageToSend); // This broadcasts the message to all clients
        console.log(`message from ${messageToSend.sender.email}:`, messageToSend);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        delete userDetails[socket.id]; // Clean up user details on disconnect
    });
});

httpServer.listen(3001, () => {
    console.log(`Websocket server is running on port 3001`);
});
