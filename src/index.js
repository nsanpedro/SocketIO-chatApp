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

let count = 0;

io.on('connection', (socket) => {
    console.log('New Connection detected');

    socket.emit('countUpdated', count);
    socket.on('increment', () => {
        count ++;
        socket.emit('countUpdated', count);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});