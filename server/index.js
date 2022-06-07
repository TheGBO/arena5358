const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000

const player = require('./player');
const game = require('./game');
const scorePoint = require('./scorePoint');

server.listen(port, () => {
    console.log(`Running game server on http://127.0.0.1:${port}`);
})

app.use(express.static(path.join(__dirname, '../public')));

setInterval(() => {
    if(Object.keys(game.gameState.players).length > 0){
        game.sendGameState(io);
        scorePoint.addScorePoint(game.gameState);
    }
}, Math.floor(Math.random() * 1250));

io.on('connection', (socket) => {
    socket.on('connectPlayer', (data) => {
        player.createPlayer(socket.id, 500, 500, data.name, game.gameState);
        socket.emit('connectPlayer', socket.id);
        game.sendGameState(io);
    });

    socket.on('movePlayer', (key) => {
        player.movePlayer(socket, key, game.gameState);
        game.sendGameState(io);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        delete game.gameState.players[socket.id];
        game.sendGameState(io);
    })
    console.log(`Got socket connection of id: ${socket.id}`);
});

