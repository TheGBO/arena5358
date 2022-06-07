var activeKeys = {};

document.addEventListener('keydown', (e) => {
    activeKeys[e.key] = e.key;
});

document.addEventListener('keyup', (e) => {
    delete activeKeys[e.key];
});

export function input(socket){
    for (const key in activeKeys) {
        const element = activeKeys[key];
        socket.emit('movePlayer', element);
    }
}