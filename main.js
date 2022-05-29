const topBar = document.getElementById("topBar")
let barPositions = {
    positionX: 50, 
    positionY: 500
}

function loadPositions() {
    topBar.style = "left: " + barPositions.positionX + "px; top: " + barPositions.positionY + "px;"
}
const Action = {
    goLeft()  { barPositions.positionX -= 10
        console.log(barPositions.positionX);},
    goRight() { barPositions.positionX += 10
        console.log(barPositions.positionX);}
};
document.addEventListener('keypress', (event) => {
    let name = event.key
    if (name == "a"){
        Action.goLeft()
        loadPositions()
    }
    if (name == "d"){
        Action.goRight()
        loadPositions()
    }
})