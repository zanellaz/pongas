const bottomBar = document.getElementById("bottomBar")
const topBar = document.getElementById("topBar")
const gameScreen = document.getElementById("screen")
const bars = document.getElementsByClassName("bar")

gameScreen.width = 800
gameScreen.height = 600
bars.width = 250

bars[0].style = `width:${bars.width}px;`
bars[1].style = `width:${bars.width}px;`
gameScreen.style.width = `${gameScreen.width}px`
gameScreen.style.height = `${gameScreen.height}px`

let player1 = {
    positionX: 300
}

let player2 = {
    positionX: 300
}

function loadPositions() {
    bottomBar.style.left = `${player1.positionX}px`
    topBar.style.left = `${player2.positionX}px`
}

const goLeft = {
    player1() {
        if (player1.positionX > 0){
            player1.positionX -= 10
        }
    },
    player2() {
        if (player2.positionX > 0){
            player2.positionX -= 10
        }
    }
}
const goRight = {
    player1() {
        if (player1.positionX < gameScreen.width - bars.width){
            player1.positionX += 10
        }
    },
    player2() {
        if (player2.positionX < gameScreen.width - bars.width){
            player2.positionX += 10
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

document.addEventListener('keydown',(keyDownEvent) => {
    let keyPressed = keyDownEvent.key
    if (moves[keyPressed]) {
        moves[keyPressed]()
        loadPositions()
        // setInterval( () =>{
            
        // }, 10)
    }
})


