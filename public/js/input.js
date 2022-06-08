import { gameState, myId } from "./app.js";

var activeKeys = {};

document.addEventListener('keydown', (e) => {
    activeKeys[e.key] = e.key;
});

document.addEventListener('keyup', (e) => {
    delete activeKeys[e.key];
});

export function input(socket){
    for(const playerid in gameState.players){ 
        const player = gameState.players[playerid];
        if(player.id == myId){
            for (const key in activeKeys) {
                const element = activeKeys[key];
                switch (element.toLowerCase()) {
                    case 'a':
                        player.x -= player.speed;
                        break;
            
                    case 'd':
                        player.x += player.speed;
                        break;
            
                    case 'w':
                        player.y -= player.speed;
                        break;
            
                    case 's':
                        player.y += player.speed;
                        break;
                
                    default:
                        break;
                }
                
            }
            socket.emit('movePlayer', {
                    x:player.x,
                    y:player.y
                }
            );
        }
    }
    
}