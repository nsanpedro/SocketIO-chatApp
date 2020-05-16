const express = require('express');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 8080;
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const publicDirectoryPath = path.join(__dirname, '../public');

const io = socketio(server);

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New Connection detected');

    socket.emit('message', 'welcome');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});