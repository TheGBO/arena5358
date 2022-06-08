function createPlayer(id, x, y, name, gameState){
    let player = {
        id:id,
        x:x,
        y:y,
        name:name,
        speed:5,
        health:100,
        size:35
    };

    gameState.players[id] = player;
}

function movePlayer(socket, position, gameState){
    let currentPlayer = gameState.players[socket.id];
    if(!currentPlayer) return;
    currentPlayer.x = position.x;
    currentPlayer.y = position.y;
    for (const key in gameState.scorePoints) {
        const element = gameState.scorePoints[key];

        let finalDistance = Math.hypot(currentPlayer.x - element.x, currentPlayer.y - element.y);

        if(finalDistance <= Math.sqrt(currentPlayer.size * element.size)){
            delete gameState.scorePoints[key];
            currentPlayer.size += element.size / 10;
        }
        
    }
}


module.exports = {
    createPlayer,
    movePlayer,
};