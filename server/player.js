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

function movePlayer(socket, key, gameState){
    let currentPlayer = gameState.players[socket.id];
    if(currentPlayer === null) return;
    for (const key in gameState.scorePoints) {
        const element = gameState.scorePoints[key];

        let finalDistance = Math.hypot(currentPlayer.x - element.x, currentPlayer.y - element.y);

        if(finalDistance <= Math.sqrt(currentPlayer.size * element.size)){
            delete gameState.scorePoints[key];
            currentPlayer.size += element.size / 10;
        }
        
    }
    switch (key.toLowerCase()) {
        case 'a':
            currentPlayer.x -= currentPlayer.speed;
            break;

        case 'd':
            currentPlayer.x += currentPlayer.speed;
            break;

        case 'w':
            currentPlayer.y -= currentPlayer.speed;
            break;

        case 's':
            currentPlayer.y += currentPlayer.speed;
            break;
    
        default:
            break;
    }
}


module.exports = {
    createPlayer,
    movePlayer,
};