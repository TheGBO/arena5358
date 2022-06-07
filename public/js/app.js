
import {input} from './input.js';
import {renderPlayers, drawBoard, renderScorePoints} from './renderer.js'

const socket = io();

const canvas = document.getElementById('canvas');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export var myId;
export var gameState = {};

socket.emit('connectPlayer', {
    name: window.prompt("enter Player Name")
});

socket.on('connectPlayer', (id) => {
    myId = id;
});

socket.on('gameState', (gs) => {
    gameState = gs;
});

function loop(){
    if(myId === null) return;

    ctx.fillStyle = "#23232e";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    input(socket);
    drawBoard(ctx);
    renderScorePoints(ctx);
    renderPlayers(ctx);
    requestAnimationFrame(loop);
}
loop();