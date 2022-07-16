const game = { playerChoice: "", computerChoice: "", player: 0, computer: 0};
const panel = document.querySelector(".panel"); panel.innerHTML = "";
const scoreboard = document.querySelector(".scoreboard"); scoreboard.style.visibility = "hidden";
const winner = document.querySelector(".winner"); winner.style.visibility = "hidden";

newGame();



function newGame() {
    console.log("newGame");

    panel.innerHTML = 'Welcome to game of "Bee-Fish-Bear", press START to play...';
    const start = document.querySelector(".start");
    start.addEventListener('click', playGame, {once: true});
}

function playGame() {
    console.log("playGame");

    panel.innerHTML = "";
    playRound();

}

function playRound() {
    console.log("playRound")

    panel.innerHTML = "Pick your animal<br>...<br>";
    playerPlay();
}

function computerPick() {
    let randomNumber = Math.floor(Math.random()*100)
    return randomNumber
}

function computerPlay() {
    let pick = ""
    let number = computerPick()
    if (number<=33) pick = "bee"
    else if (number<=66) pick = "fish"
    else pick = "bear"
    return pick
}

function playerPlay() {
    console.log("playerPlay")

    const animals = document.querySelectorAll(".animals > *");
    animals.forEach(animal => animal.addEventListener('click',playerChoose,{once: true}));
}

function playerChoose(e) {
    e.stopPropagation()
    if (game.playerChoice === "") {
        let panel = document.querySelector(".panel")
        let animal = this.className;
        game.playerChoice = animal;

        game.computerChoice = computerPlay();

        panel.innerHTML += `You chose ${animal}<br>`;
        panel.innerHTML += `Computer chose ${game.computerChoice}<br>`;

        let resut = decideRoundWinner(game.computerChoice, game.playerChoice);
        announceRoundResult(resut);
        updateScoreboard();

    }
}

function decideRoundWinner(computer,player) {
    let winner = "draw"
    switch (true){
        case (computer == "bee" && player == "fish"): winner = "player"; break;
        case (computer == "bee" && player == "bear"): winner = "computer"; break;
        case (computer == "fish" && player == "bee"): winner = "computer"; break;
        case (computer == "fish" && player == "bear"): winner = "player"; break;
        case (computer == "bear" && player == "bee"): winner = "player"; break;
        case (computer == "bear" && player == "fish"): winner = "computer"; break;
        case (computer == player): break;
    }
    return winner
}

function announceRoundResult(winner) {
    if (winner == "computer") {
        game.computer++;
        panel.innerHTML += '...<br>Computer won this round<br>';
    }  
    else if (winner == "player") {
        game.player++;
        panel.innerHTML += '...<br>You won this round<br>';
    }
    else panel.innerHTML += '...<br>This round was a draw<br>'
}

function updateScoreboard() {
    scoreboard.style.visibility ="visible"
    scoreboard.innerHTML = `You:${game.player} Computer:${game.computer}`;
}