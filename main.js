const bottomBar = document.getElementById("bottomBar")
const topBar = document.getElementById("topBar")
const gameScreen = document.getElementById("screen")
const ball = document.getElementById("ball")
const bars = document.getElementsByClassName("bar")
const player1score = document.getElementById("player1score")
const player2score = document.getElementById("player2score")

let gamePaused = true

gameScreen.width = 800
gameScreen.height = 600

bars.width = 250
bars.height = 10

ball.width = 10

topBar.style = `width:${bars.width}px; height: ${bars.height}px;`
bottomBar.style = `width:${bars.width}px; height: ${bars.height}px;`
gameScreen.style.width = `${gameScreen.width}px`
gameScreen.style.height = `${gameScreen.height}px`

function restartGame() {
    ballPosition.x = gameScreen.width/2 - ball.width,
    ballPosition.y = gameScreen.height/2 - 2*ball.width
    ballXvelocity = 0
    ballYvelocity = 0
}

let ballPosition = {
    x: gameScreen.width/2 - ball.width,
    y: gameScreen.height/2 - 2*ball.width
}

let player1 = {
    positionX: gameScreen.width/2 - bars.width/2,
    positionY: 540,
    points: 0
}

let player2 = {
    positionX: gameScreen.width/2 - bars.width/2,
    positionY: 30,
    points: 0
}

player1score.innerHTML = player1.points
player2score.innerHTML = player2.points

function loadPositions() {
    bottomBar.style.left = `${player1.positionX}px`
    topBar.style.left = `${player2.positionX}px`
}

const goLeft = {
    player1() {
        if (player1.positionX > 0){
            player1.positionX -= 4
        }
    },
    player2() {
        if (player2.positionX > 0){
            player2.positionX -= 4
        }
    }
}
const goRight = {
    player1() {
        if (player1.positionX < gameScreen.width - bars.width){
            player1.positionX += 4
        }
    },
    player2() {
        if (player2.positionX < gameScreen.width - bars.width){
            player2.positionX += 4
        }
    }
}

const keys = {
    a() {
        goLeft["player1"]()
    },
    d() {
        goRight["player1"]()
    },
    j() {
        goLeft["player2"]()
    },
    l() {
        goRight["player2"]()
    },
    r() {
        if (gamePaused == true) {
            restartBallvelocity()
        }
    }
}

let keyPressed = {}

document.addEventListener('keydown',(keyDownEvent) => {
    let keydown = keyDownEvent.key
    if (keys[keydown]) {
        keyPressed[keydown] = `${keydown}` 
    }
})

document.addEventListener('keyup',(keyUpEvent) => {
    let keyup = keyUpEvent.key
    delete keyPressed[keyup]
})

let ballXvelocity
let ballYvelocity

function restartBallvelocity() {
    ballXvelocity = Math.random() * 1 + 1
    ballYvelocity = Math.random() * 1 + 1

    if (Math.floor(Math.random() * 2) % 2 == 0) {
        ballXvelocity = ballXvelocity * -1
    }
    if (Math.floor(Math.random() * 2) % 2 == 0) {
        ballYvelocity = ballYvelocity * -1
    }
    gamePaused = false
}

restartGame()
// restartBallvelocity()


function randomizeBall(direction) {
    ballXvelocity = Math.floor(Math.random() * 3 + 2)
    ballYvelocity = Math.floor(Math.random() * 3 + 2)
    ballYvelocity = ballYvelocity * direction
    if (Math.floor(Math.random * 3) % 2 == 0) {
        ballXvelocity = ballXvelocity * -1
    }
}

function reduceBar() {
    if (bars.width > 50) {
        bars.width -= 4
        player1.positionX += 2
        player2.positionX += 2
        topBar.style.width = `${bars.width}px`
        bottomBar.style.width = `${bars.width}px`
    }
}

function pointed(player) {
    player.points += 1
    player1score.innerHTML = player1.points
    player2score.innerHTML = player2.points
    gamePaused = true
    restartGame()
}

setInterval( function runGame() {
    if (keys[keyPressed['a']]) {
        keys[keyPressed['a']]()
    }
    if (keys[keyPressed['d']]) {
        keys[keyPressed['d']]()
    }
    if (keys[keyPressed['j']]) {
        keys[keyPressed['j']]()
    }
    if (keys[keyPressed['l']]) {
        keys[keyPressed['l']]()
    }
    if (keys[keyPressed['r']]) {
        keys[keyPressed['r']]()
    }
    loadPositions()    
    if (ballPosition.x <= 0 || ballPosition.x >= gameScreen.width - 10){
        ballXvelocity = ballXvelocity * -1
    }
    if ((ballPosition.y >= player1.positionY && ballPosition.y <= player1.positionY+bars.height) && (ballPosition.x >= player1.positionX && ballPosition.x <= player1.positionX + bars.width)){
        randomizeBall(-1)
        reduceBar()
    }
    if ((ballPosition.y >= player2.positionY-bars.height && ballPosition.y <= player2.positionY) && ((ballPosition.x >= player2.positionX) && ballPosition.x <= player2.positionX + bars.width)){
        randomizeBall(1)
        reduceBar()
    }
    if (ballPosition.y <= 0) {
        pointed(player1)
    }
    if (ballPosition.y >= gameScreen.height-10) {
        pointed(player2)
    }
    ballPosition.x += ballXvelocity
    ballPosition.y += ballYvelocity
    ball.style = `left: ${ballPosition.x}px; top: ${ballPosition.y}px;`
}, 10)
