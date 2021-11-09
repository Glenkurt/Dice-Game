/**
 *
 * * Rules : - activePlayer can roll dice until he diceResult = 1 or the player click on hold button (wich call hold function)
 * *         - player win when scorPlayer* >=  100
 * *         - every new round diceResult is reset to 0
 * *         - while diceResult || hold is not selected diceResult += currentScore
 *
 * Let's start Coding *
 */

// ******************************************************************** //
//?                        Variable from Dom                           *//
// ******************************************************************** //

// button
let rollButton = document.getElementById("rollButton");
let holdButton = document.getElementById("holdButton");
let muteButton = document.getElementById("mute");
let gameButton = document.getElementById("gameButton");
// Mute Button update
let mutebtn = document.getElementById("mutebtn");

// currentScore P1 & P2
let currentScoreP1 = document.getElementById("currentScoreP1");
let currentScoreP2 = document.getElementById("currentScoreP2");

// Hold
let holdResultP1 = document.getElementById("holdResultP1");
let holdResultP2 = document.getElementById("holdResultP2");
let scoreUpdate = document.getElementById("scoreUpdate");

// Feed update
let roundPlayer = document.getElementById("roundPlayer");
let actionR = document.getElementById("actionR");

// Skin player active
let dawaSkin = document.querySelector(".player1-side");
let foggySkin = document.querySelector(".player2-side");

//Dice skin
let diceSkin = document.querySelector(".cube-face");

//* * fin DOM*/

// ******************************************************************** //
//?                     Sounds Variable                                *//
// ******************************************************************** //
let diceSound = new Audio("sounds/dicesound.mp3");
let holdSound = new Audio("sounds/holdSound.mp3");
let victorySound = new Audio("sounds/victorySound.mp3");
let looseSound = new Audio("sounds/looseSound.mp3");
let newGameSound = new Audio("sounds/newGame.mp3");
let audios = [diceSound, holdSound, victorySound, looseSound, newGameSound];
let mute = document.querySelector("#off");
let unMute = document.querySelector("#on");

// ******************************************************************** //
//?                     Program Variable                               *//
// ******************************************************************** //

let muteSound = "on";
let p1 = true;
let p2 = false;
let activePlayer = p1 || p2;
let rand;
let score = 0;
let scoreP1 = 0;
let scoreP2 = 0;
let skin = "skin";
let skin2 = "skin2";

// ******************************************************************** //
//*                         3D dice test                               *//
// ******************************************************************** //
//! test 3dé !!!!!!!!!!!!!!!!!!!!!!!!!!!!

let cube = document.querySelector(".cube");
let currentClass = "";
let previusClass = "";
let cubeFace1 = document.querySelector(".cube-face1");
let cubeFace2 = document.querySelector(".cube-face2");
let cubeFace3 = document.querySelector(".cube-face3");
let cubeFace4 = document.querySelector(".cube-face4");
let cubeFace5 = document.querySelector(".cube-face5");
let cubeFace6 = document.querySelector(".cube-face6");

const diceArray = [
  cubeFace1,
  cubeFace2,
  cubeFace3,
  cubeFace4,
  cubeFace5,
  cubeFace6,
];
let skinDice1 = ".style.background = green";
let skinDice2 = ".style.background = red";

function roll3dice() {
  rand = rollDice();
  let showClass = "show-" + rand;
  console.log("Nouveau rand " + rand);

  if (currentClass) {
    cube.classList.remove(currentClass);
    console.log("*******");
    console.log(
      "rand : " +
        rand +
        " showClass : " +
        showClass +
        " currentClass : " +
        currentClass +
        " previusClass : " +
        previusClass
    );
  }
  console.log(
    "rand : " +
      rand +
      " showClass : " +
      showClass +
      " currentClass : " +
      currentClass +
      " previusClass : " +
      previusClass
  );
  cube.classList.add(showClass);
  currentClass = showClass;
  previusClass = currentClass;
  console.log("*******");
  diceSound.play();
  console.log(
    "rand : " +
      rand +
      " showClass : " +
      showClass +
      " currentClass : " +
      currentClass +
      " previusClass : " +
      previusClass
  );
  console.log("-------------");
}

//! test 3dé !!!!!!!!!!!!!!!!!!!!!!!!!!!!

// ******************************************************************** //
//*                         Function                                   *//
// ******************************************************************** //

// ! rand
function rollDice() {
  return Math.floor(Math.random() * 6 + 1);
}
// ! /rand

// ! nextPlayer
function nextPlayer() {
  if (p1) {
    p2 = true;
    p1 = false;
    currentScoreP1.innerHTML = score;
    roundPlayer.innerHTML = "C'est à Foggy de jouer !";
    //currentClass = skin;
    // ajoute la classe skin au joueur actif
    dawaSkin.classList.remove(skin);
    foggySkin.classList.add(skin2);
    for (let i = 0; i < 6; i++) {
      diceArray[i].style.background = "#e09f3e";
    }
    //  diceSkin.style.background = "green";
  } else {
    p1 = true;
    //currentClass = skin;
    currentScoreP2.innerHTML = score;
    roundPlayer.innerHTML = "C'est à Dawa de jouer !";
    // ajoute la classe skin au joueur actif
    foggySkin.classList.remove(skin2);
    dawaSkin.classList.add(skin);
    for (let i = 0; i < 6; i++) {
      diceArray[i].style.background = "#335c67";
    }
  }
}
// ! /nextPlayer

// ! dice
function dice() {
  // ? call the roll3dice "BETA" function
  roll3dice();
  // reset action feed
  switch (rand) {
    case 1:
      console.log("Perdu !");
      score = 0;
      looseSound.play();
      nextPlayer();
      break;
    default:
      score = score + rand;
      console.log(rand, score);
      break;
  }
  console.log(score);
}
// ! /dice

// ! newGame
function newGame() {
  score = 0;
  scoreP1 = 0;
  scoreP2 = 0;
  currentScoreP1.innerHTML = score;
  currentScoreP2.innerHTML = score;
  holdResultP2.innerHTML = score;
  holdResultP1.innerHTML = score;
  actionR.innerHTML = "Let's go !";
  newGameSound.play();
  if ((activePlayer = p2)) {
    nextPlayer();
  }
}
// ! /newGame

// ! victory
function victory(joueur) {
  victorySound.play();
  actionR.innerHTML = " Félicitation" + " " + joueur + " gagne le match";
  score = 0;
  scoreP1 = 0;
  scoreP2 = 0;
  currentScoreP1.innerHTML = score;
  currentScoreP2.innerHTML = score;
  holdResultP2.innerHTML = score;
  holdResultP1.innerHTML = score;
  nextPlayer();
}
// ! /victory

// ******************************************************************** //
//*                         Action Call                                *//
// ******************************************************************** //

// ! rand Button
rollButton.addEventListener("click", () => {
  dice();
  if (rand === 1) {
    actionR.innerHTML = "Perdu";
  } else {
    switch (activePlayer) {
      case p1:
        currentScoreP1.innerHTML = score;

        actionR.innerHTML = "Dawa obtient un " + rand;

        break;
      case p2:
        currentScoreP2.innerHTML = score;
        actionR.innerHTML = "Foggy obtient un " + rand;

      default:
        break;
    }
  }
});
// ! rand Button

// ! Hold Button
holdButton.addEventListener("click", () => {
  switch (activePlayer) {
    case p1:
      actionR.innerHTML = score + " ajouté au score de Dawa";
      scoreP1 = scoreP1 + score;
      rand = 0;
      score = 0;
      holdResultP1.innerHTML = scoreP1;

      // Victory condition is test if not next player is call
      scoreP1 >= 100 ? victory("Dawa") : holdSound.play() && nextPlayer();

      break;

    case p2:
      actionR.innerHTML = score + " ajouté au score de Foggy";
      scoreP2 = scoreP2 + score;
      rand = 0;
      score = 0;
      holdResultP2.innerHTML = scoreP2;
      // Victory condition is test if not next player is call
      scoreP2 >= 100 ? victory("Foggy") : holdSound.play() && nextPlayer();

      break;
  }
});

// ! New Game
gameButton.addEventListener("click", () => {
  newGame();
});

// ! MUTE Button
muteButton.addEventListener("click", () => {
  if (muteSound === "on") {
    for (let audio of audios) {
      audio.muted = true;
      muteSound = "off";
      mute.style.display = "none";
      unMute.style.display = "block";
    }
  } else {
    for (let audio of audios) {
      audio.muted = false;
      muteSound = "on";
      mute.style.display = "block";
      unMute.style.display = "none";
    }
  }
});
