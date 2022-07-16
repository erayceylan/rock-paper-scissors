const game = { winner:"", over: false, playerChoice: "", computerChoice: "", player: 0, computer: 0};
const start = document.querySelector(".start");
const panel = document.querySelector(".panel");
const animals = document.querySelectorAll(".animals > *");
const scoreboard = document.querySelector(".scoreboard");
const newgame = document.querySelector(".newgame");
const audio = document.querySelector("audio");
const music = document.querySelector(".music");

music.addEventListener('click',playMusic);
newgame.addEventListener("click",newGame);

newGame();

function newGame() {
    gameStart();
    panel.innerHTML = 'Welcome to game of "Bee-Fish-Bear", press START to play...';
    start.addEventListener('click', playGame, {once: true});
}

function playGame() {
    roundStart();
    start.innerHTML = "next round"
    panel.innerHTML = "Pick your animal<br>...<br>";
    animals.forEach(animal => animal.addEventListener('click',playRound));

}

function playRound(e) {
    console.log("playRound")

    e.stopPropagation()

    if (game.playerChoice === "") {

        game.playerChoice = this.className;
        game.computerChoice = computerPlay();

        panel.innerHTML += `You chose ${game.playerChoice}<br>`;
        panel.innerHTML += `Computer chose ${game.computerChoice}<br>`;

        announceRoundResult(decideRoundWinner(game.computerChoice, game.playerChoice));
        updateScoreboard();

        animals.forEach(animal => animal.removeEventListener('click', playRound))
    }

    if (game.computer == 5 || game.player == 5) {
        
        if (game.computer == 5) {panel.innerHTML = "<br>COMPUTER WON!"; game.winner ="computer"}
        if (game.player == 5) {panel.innerHTML = "<br>YOU WON!"; game.winner = "player"}

        panel.style.fontSize = "36px"

        game.over = true

    }
    
    if (game.over) {
        start.innerHTML = "game over"
        start.addEventListener('click',gameOver, {once:true})
    }
    else {
        start.addEventListener('click',playGame, {once:true})
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

function roundStart() {
    game.playerChoice = "";
    game.computerChoice = "";
}

function gameStart() {
    start.innerHTML = "start";
    panel.innerHTML = "";
    panel.style.fontSize = "18px";
    scoreboard.style.visibility = "hidden";
    game.winner = ""
    game.over = false;
    game.playerChoice = "";
    game.computerChoice = "";
    game.player = 0;
    game.computer = 0;
}

function gameOver() {
    if (game.winner == "computer") panel.innerHTML = "<br>GG EZ"
    if (game.winner == "player") panel.innerHTML = "<br>GG WP"
}

function playMusic(e) {
    if (e.target.innerHTML == "music on") {
        audio.play()
        e.target.innerHTML = "music off"
    }
    else {
        audio.pause()
        e.target.innerHTML = "music on"
    }
}