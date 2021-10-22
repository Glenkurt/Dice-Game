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

// Rand
function rollDice() {
  return Math.floor(Math.random() * 6 + 1);
  //roundScore += rand;
  //console.log(roundScore);
  //return (rollResult.innerHTML = rand);
}

let p1 = true;
let p2 = false;
let activePlayer = p1 || p2;
let rand;
let score = 0;
let scoreP1 = 0;
let scoreP2 = 0;

//nextPlayer
function nextPlayer() {
  if (p1) {
    p2 = true;
    p1 = false;
    currentScoreP1.innerHTML = score;
  } else {
    p1 = true;
    currentScoreP2.innerHTML = score;
  }
}

//dice
function dice() {
  rand = rollDice();
  rollResult.innerHTML = rand;
  switch (rand) {
    case 1:
      console.log("Perdu !");
      score = 0;
      nextPlayer();
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
      scoreP1 = scoreP1 + score;
      score = 0;
      rand = 0;
      holdResultP1.innerHTML = scoreP1;
      // Victory condition is test if not next player is call
      scoreP1 >= 100 ? alert("Victory") : nextPlayer();

      break;

    case p2:
      scoreP2 = scoreP2 + score;
      score = 0;
      rand = 0;
      holdResultP2.innerHTML = scoreP2;
      // Victory condition is test if not next player is call
      scoreP2 >= 100 ? alert("Victory") : nextPlayer();

      break;
  }
});

/**
 * ! a voir
 */

/*
function roundScore() {
  let a = rollResult.value;
  switch (a) {
    default:
      roundScore += a;
      break;
  }
  console.log(a);
}
*/
/*
function hold() {
  let a = rollResult;
  console.log(a);
  return (holdResult.innerHTML = a);
}
//holdButton.addEventListener("click", hold);
*/

/*
function e() {
   console.log(roundScore);
  return (currentScore.innerHTML = roundScore);
}



! backup roll !
rollButton.addEventListener("click", () => {
  // roll the dice
  rand = rollDice();
  rollResult.innerHTML = rand;

  switch (activePlayer) {
    case p1:
      currentScoreP1.innerHTML = score;
      switch (rand) {
        case 1:
          console.log("Perdu !");
          score = 0;
          nextPlayer();
          break;
        default:
          score = score + rand;
          console.log(rand, score);
          break;
      }
      console.log(score);
      currentScoreP1.innerHTML = score;
  }
  // Display rand
});

! back up  hold!
// ! Hold Button
holdButton.addEventListener("click", () => {
  switch (activePlayer) {
    case p1:
      scoreP1 = scoreP1 + score;
      score = 0;
      rand = 0;
      holdResultP1.innerHTML = scoreP1;
      nextPlayer();

      break;

    case p2:
      scoreP2 = scoreP2 + score;
      score = 0;
      rand = 0;
      holdResultP2.innerHTML = scoreP2;
      nextPlayer();

      break;
  }
});
*/
