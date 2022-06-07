function addScorePoint(gameState){

    const rndID = Math.floor(Math.random() * 999999)

    let scorePoint = {
        x: randomGameCoord().x,
        y: randomGameCoord().y,
        size: Math.floor(Math.random() * 10 ) + 5
    }

    gameState.scorePoints[rndID] = scorePoint;
}

function randomGameCoord(){
    return {
        x: randRange(-1000, 1000),
        y: randRange(-1000, 1000)
    }
}

function randRange(minimum, maximum){
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

module.exports = {addScorePoint}