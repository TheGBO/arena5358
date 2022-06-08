var gameState = {
    players: {},
    scorePoints: {}
}

function sendGameState(io){
    io.emit('gameState', gameState);
}

function broadcastGameState(socket){
    socket.broadcast.emit('gameState', gameState);
}

module.exports = {
    gameState, 
    sendGameState,
    broadcastGameState
}