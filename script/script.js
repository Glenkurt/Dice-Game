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

var button = document.getElementById("roll");
var rollResult = document.getElementById("rollResult");

function rollDice() {
  let rand = Math.floor(Math.random() * 6 + 1);
  console.log(rand);
  return (rollResult.innerHTML = rand);
}

button.addEventListener("click", rollDice);
