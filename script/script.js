/**
 * ! Functions to develop => newGame() / roll() / hold(e) / nextPlayer() / activePlayer()
 * ? Variables needed : player1 / player2 / diceResult / currentScore / scrorePlayer1 / scorePlayer2 /
 *
 * * Rules : - activePlayer can roll dice until he diceResult = 1 or the player click on hold button (wich call hold function)
 * *         - player win when scorPlayer* >=  100
 * *         - every new round diceResult is reset to 0
 * *         - while diceResult || hold is not selected diceResult += currentScore
 *
 * Let's start Coding *
 */

//* * From DOM */

// button
let rollButton = document.getElementById("rollButton");
let holdButton = document.getElementById("holdButton");

let rollResult = document.getElementById("rollResult");

// currentScore P1 & P2
let currentScoreP1 = document.getElementById("currentScoreP1");
let currentScoreP2 = document.getElementById("currentScoreP2");

// Hold
let holdResultP1 = document.getElementById("holdResultP1");
let holdResultP2 = document.getElementById("holdResultP2");
let scoreUpdate = document.getElementById("scoreUpdate");

// text update
let roundPlayer = document.getElementById("roundPlayer");
let actionR = document.getElementById("actionR");

// Skin player active
let dawaSkin = document.querySelector(".player1-side");
let foggySkin = document.querySelector(".player2-side");

//* *? fin DOM*/

// ! Sounds */
let diceSound = new Audio("sounds/dicesound.mp3");
let holdSound = new Audio("sounds/holdSound.mp3");
let victorySound = new Audio("sounds/victorySound.mp3");
let looseSound = new Audio("sounds/looseSound.mp3");

// Rand
function rollDice() {
  return Math.floor(Math.random() * 6 + 1);
}

let p1 = true;
let p2 = false;
let activePlayer = p1 || p2;
let rand;
let score = 0;
let scoreP1 = 0;
let scoreP2 = 0;
let skin = "skin";

// ! nextPlayer
function nextPlayer() {
  if (p1) {
    p2 = true;
    p1 = false;
    currentScoreP1.innerHTML = score;
    roundPlayer.innerHTML = "C'est à Foggy de jouer !";
    currentClass = skin;
    // ajoute la classe skin au joueur actif
    dawaSkin.classList.remove(skin);
    foggySkin.classList.add(skin);
  } else {
    p1 = true;
    currentClass = skin;
    currentScoreP2.innerHTML = score;
    roundPlayer.innerHTML = "C'est à Dawa de jouer !";
    // ajoute la classe skin au joueur actif
    foggySkin.classList.remove(skin);
    dawaSkin.classList.add(skin);
  }
}

//diceSkin
function diceSkin() {
  switch (rand) {
    case 1:
      rollResult.innerHTML =
        '<img style="height:150px; width:150px " src="img/diceface/d1.jpg">';
      break;
    case 2:
      rollResult.innerHTML =
        '<img style="height:150px; width:150px " src="img/diceface/d2.jpg">';
      break;
    case 3:
      rollResult.innerHTML =
        '<img style="height:150px; width:150px " src="img/diceface/d3.jpg">';
      break;
    case 4:
      rollResult.innerHTML =
        '<img style="height:150px; width:150px " src="img/diceface/d4.jpg">';
      break;
    case 5:
      rollResult.innerHTML =
        '<img style="height:150px; width:150px " src="img/diceface/d5.jpg">';
      break;
    case 6:
      rollResult.innerHTML =
        '<img style="height:150px; width:150px " src="img/diceface/d6.jpg">';
      break;
  }
}
//dice
function dice() {
  rand = rollDice();
  diceSkin(rand);
  diceSound.play();

  // reset action feed
  actionR.innerHTML = "";
  switch (rand) {
    case 1:
      console.log("Perdu !");
      score = 0;
      looseSound.play();
      nextPlayer();
      // afficher perdu action feed
      actionR.innerHTML = "perdu";
      break;
    default:
      score = score + rand;
      console.log(rand, score);
      break;
  }
  console.log(score);
}

/* let activePlayer() => {
  p1 ? activePlayer(p1) : activePlayer(p2);
}
*/
//newGame
function newGame() {
  score = 0;
  activePlayer = p1;
  currentScoreP1.innerHTML = score;
  currentScoreP2.innerHTML = score;
  holdResultP2.innerHTML = score;
  holdResultP1.innerHTML = score;
}
//victory
function victory() {
  victorySound.play();
  alert("Victory");
  newGame();
}

// ! Rand Button
rollButton.addEventListener(
  "click",
  () => {
    // roll the dice
    rollDice();
    dice();
    switch (activePlayer) {
      case p1:
        currentScoreP1.innerHTML = score;

        break;
      case p2:
        currentScoreP2.innerHTML = score;

      default:
        break;
    }
  }
  // Display rand
);

// ! Hold Button
holdButton.addEventListener("click", () => {
  switch (activePlayer) {
    case p1:
      actionR.innerHTML = score + " ajouté au score de Dawa";
      scoreP1 = scoreP1 + score;
      score = 0;
      rand = 0;
      holdResultP1.innerHTML = scoreP1;

      // Victory condition is test if not next player is call
      scoreP1 >= 30 ? victory(p1) : holdSound.play() && nextPlayer();

      break;

    case p2:
      actionR.innerHTML = score + " ajouté au score de Foggy";
      scoreP2 = scoreP2 + score;
      score = 0;
      rand = 0;
      holdResultP2.innerHTML = scoreP2;
      // Victory condition is test if not next player is call
      scoreP2 >= 30 ? victory(p2) : holdSound.play() && nextPlayer();

      break;
  }
});
