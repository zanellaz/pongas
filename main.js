const bottomBar = document.getElementById("bottomBar")
const topBar = document.getElementById("topBar")
const gameScreen = document.getElementById("screen")
const ball = document.getElementById("ball")
const bars = document.getElementsByClassName("bar")

gameScreen.width = 800
gameScreen.height = 600
bars.width = 250
bars.height = 10

ball.width = 10

topBar.style = `width:${bars.width}px; height: ${bars.height}px;`
bottomBar.style = `width:${bars.width}px; height: ${bars.height}px;`
gameScreen.style.width = `${gameScreen.width}px`
gameScreen.style.height = `${gameScreen.height}px`

let ballPosition = {
    x: 500,
    y: 400
}

let player1 = {
    positionX: 300,
    positionY: 540
}

let player2 = {
    positionX: 300,
    positionY: 30
}

function loadPositions() {
    bottomBar.style.left = `${player1.positionX}px`
    topBar.style.left = `${player2.positionX}px`
}

const goLeft = {
    player1() {
        if (player1.positionX > 0){
            player1.positionX -= 5
        }
    },
    player2() {
        if (player2.positionX > 0){
            player2.positionX -= 5
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

const moves = {
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
    }
}

let keyPressed = {}

document.addEventListener('keydown',(keyDownEvent) => {
    let keydown = keyDownEvent.key
    if (moves[keydown]) {
        keyPressed[keydown] = `${keydown}` 
    }
})

document.addEventListener('keyup',(keyUpEvent) => {
    let keyup = keyUpEvent.key
    delete keyPressed[keyup]
})

let ballXvelocity = 2
let ballYvelocity = -2

function randomizeBall() {
    ballXvelocity = Math.random() * 4
    ballYvelocity = ballYvelocity * -1
    ballXvelocity = Math.random() * 4
    if (Math.floor(Math.random * 2) % 2 == 0) {
        ballXvelocity = ballXvelocity * -1
    }
}

function reduceBar() {
    bars.width -= 4
    console.log(bars.width);
    player1.positionX += 2
    player2.positionX += 2
    topBar.style.width = `${bars.width}px`
    bottomBar.style.width = `${bars.width}px`
}

setInterval( () => {
    if (moves[keyPressed['a']]) {
        moves[keyPressed['a']]()
    }
    if (moves[keyPressed['d']]) {
        moves[keyPressed['d']]()
    }
    if (moves[keyPressed['j']]) {
        moves[keyPressed['j']]()
    }
    if (moves[keyPressed['l']]) {
        moves[keyPressed['l']]()
    }
    loadPositions()
    ballPosition.x += ballXvelocity
    ballPosition.y += ballYvelocity
    ball.style = `left: ${ballPosition.x}px; top: ${ballPosition.y}px;`
    if (ballPosition.x <= 0 || ballPosition.x >= gameScreen.width - 10){
        ballXvelocity = ballXvelocity * -1
    }
    if (ballPosition.y == player1.positionY && (ballPosition.x >= player1.positionX && ballPosition.x <= player1.positionX + bars.width)){
        randomizeBall()
        reduceBar()
    }
    if (ballPosition.y == player2.positionY && (ballPosition.x >= player2.positionX && ballPosition.x <= player2.positionX + bars.width)){
        randomizeBall()
        reduceBar()
    }
}, 10)