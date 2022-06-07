import { gameState, myId } from "./app.js";

export var camera = {x:canvas.width / 2,y:canvas.height / 2}

var pImage = new Image(10,10);
pImage.src = '../img/Player.png';

var scorePointImage = new Image(10,10);
scorePointImage.src = '../img/point.png';

export function renderPlayers(ctx){
    
    for(const playerid in gameState.players){ 
        const player = gameState.players[playerid];
        if(player.id == myId){
            camera.x = (canvas.width / 2) - player.x;
            camera.y = (canvas.height / 2) - player.y;
        }
    }
    for(const playerid in gameState.players){ 
        const player = gameState.players[playerid];
        ctx.fillStyle = "#ff0000"
        ctx.font = "15px Arial";
        ctx.drawImage(pImage, player.x + camera.x - player.size/2, player.y + camera.y - player.size /2, player.size, player.size);
        ctx.fillText(player.name, player.x + camera.x - player.size / 2, player.y + camera.y - player.size);
    }
}

export function renderScorePoints(ctx){
    for (const key in gameState.scorePoints) {
        const scrPnt = gameState.scorePoints[key];
        ctx.drawImage(scorePointImage, scrPnt.x + camera.x, scrPnt.y + camera.y, scrPnt.size, scrPnt.size)
    }
}

export function drawBoard(ctx){
    var gridSize = 30;    
    var x = -1000 + camera.x; 
    var y = -1000 + camera.y 
    var width = 2 * 1000;
    var height = 2 * 1000;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#30303e"
    ctx.beginPath();

    for(var i = 0; i * gridSize < height; i++){
       ctx.moveTo(x, i * gridSize + y);
       ctx.lineTo(x + width, i * gridSize + y);
    }
    
    for(var i = 0; i * gridSize < width; i++){  
       ctx.moveTo(i * gridSize + x,  y);
       ctx.lineTo(i * gridSize + x, y + height);
    }
    ctx.stroke();
}