/* Helper Functions */

function computerPick() {
    let randomNumber = Math.floor(Math.random()*100)
    return randomNumber
}

function computerPlay() {
    let pick = ""
    let number = computerPick()

    if (number<=33) pick = "rock"
    else if (number<=66) pick = "paper"
    else pick = "scissors"

    /* console.log("This is the computer pick: " + pick) */
    return pick
}

function playerPick() {
    let pick = null
    while (true){
        pick = prompt("Rock, Paper or Scissors?")
        if (pick == null) {confirm(`We got a chicken...`);break}
        pick = pick.toLowerCase()

        if (pick == "rock" || pick == "paper" || pick == "scissors") break;
        else confirm("Pick again...")
    }
    return pick
}

function playerPlay() {
    let pick = playerPick()
    /* console.log("This is the player pick: " + pick) */
    return pick
}

function decideWinner(computer,player) {
    let winner = "draw"
    switch (true){
        case (computer == "rock" && player == "paper"): winner = "player"; break;
        case (computer == "rock" && player == "scissors"): winner = "computer"; break;
        case (computer == "paper" && player == "rock"): winner = "computer"; break;
        case (computer == "paper" && player == "scissors"): winner = "player"; break;
        case (computer == "scissors" && player == "rock"): winner = "player"; break;
        case (computer == "scissors" && player == "paper"): winner = "computer"; break;
        case (computer == player): break;
    }
    return winner
}

function announceResult(winner) {
    if (winner == "computer") console.log("The winner is Computer.")
    else if (winner == "player") console.log("The winner is Player")
    else console.log("Draw")
}

function playRound() {
    let player = playerPlay()
    let computer = computerPlay()
    let winner = decideWinner(computer,player)
    announceResult(winner)

    return winner
}

function game() {
    let computer = 0;
    let player = 0;
    let winner = ""

    while (computer < 5 && player < 5) {
        console.log("New Round")
        winner = playRound()
    
        if (winner == "player") player++
        else if (winner == "computer") computer++
        else continue

        console.log("Player: " + player)
        console.log("Computer: " + computer)
    }
    console.log("RESULTS: " + "Computer: " + computer + " Player: " + player)
}

console.log("Hello World!")
console.log("...")
console.log("Wanna play a game?")

game()

