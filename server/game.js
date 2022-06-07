var gameState = {
    players: {},
    scorePoints: {}
}

function sendGameState(io){
    io.emit('gameState', gameState);
}

module.exports = {
    gameState, 
    sendGameState
}