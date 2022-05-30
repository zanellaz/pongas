const bottomBar = document.getElementById("bottomBar")
const topBar = document.getElementById("topBar")

let player1 = {
    positionX: 500
}
let player2 = {
    positionX: 500
}

function loadPositions() {
    bottomBar.style = "left: " + player1.positionX + "px;"
    topBar.style = "left: " + player2.positionX + "px;"
}
const goLeft = {
    player1()  { player1.positionX -= 10},
    player2() { player2.positionX -= 10}
}
const goRight = {
    player1()  { player1.positionX += 10},
    player2() { player2.positionX += 10}
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
document.addEventListener('keydown', isKeyDown)

function isKeyDown(keyDownEvent) {
    let keyPressed = keyDownEvent.key
    if (moves[keyPressed]) {
        loadPositions()
        moves[keyPressed]()
    }
}