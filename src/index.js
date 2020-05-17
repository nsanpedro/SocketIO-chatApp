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
    socket.broadcast.emit('message', 'New user joined the room');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('sendLocation', (position) => {
        io.emit('message', `https://google.com/maps?q=${position.latitude},${position.longitude}`);
    });

    socket.on('disconnect', () => {
        io.emit('message', 'Client has left room');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});