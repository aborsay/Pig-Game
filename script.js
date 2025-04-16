'use strict';

/**
 * create variable for the two players
 *
 * create roll dice function
 *  random roll
 *  display roll
 *  if 1 switch player fucntion
 *  else add dice roll to current score and add to score
 *  then switch player
 *
 * rest game fucntion
 *  set all scores to 0
 *  start with playr 1
 *
 * userbtnHolds
 * create new game function
 * create btnHold function
 */
let scores = [0, 0];
let currentScore = 0;

const player0Name = document.getElementById('name--0');
const player1Name = document.getElementById('name--1');

const player0Section = document.querySelector('.player.player--0');
const player1Section = document.querySelector('.player.player--1');

const btnRoll = document.querySelector('.btn.btn--roll');
const dice = document.querySelector('.dice');

const btnHold = document.querySelector('.btn.btn--hold');
const btnNew = document.querySelector('.btn.btn--new');

let activePlayer = 0;

const scoreGoal = 10;

console.log(`asdfa ${currentScore}`);
/**
 * This switches between which player is active
 */
const switchPlayer = function () {
  activePlayer = activePlayer === 1 ? 0 : 1;

  player0Name.classList.toggle('current-player');
  player1Name.classList.toggle('current-player');
  player0Section.classList.toggle('player--active');
  player1Section.classList.toggle('player--active');
};

/**
 * Displays the current players current score in the pink box
 */
const displayPlayerCurrentScore = function () {
  console.log(`current--${activePlayer}`);
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

/**
 * this adds to the current players total and displays their new
 * total below player name
 */
const addToPlayerTotal = function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
};

/**
 * This hides the roll and btnHold buttons and shows the new game
 * button after the end of the game
 */
const gameOver = function () {
  btnRoll.classList.add('hidden');
  btnHold.classList.add('hidden');
  btnNew.classList.remove('hidden');
};

/**
 * Shows the roll and btnHold button and hides the new game
 * button when a new game is started
 */
const gameStart = function () {
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  btnNew.classList.add('hidden');
};

/**
 * Listends for when the btnHold button is clicked and then is
 * a player has reach the goal winner is announced
 * Otherwise players are switched
 */
btnHold.addEventListener('click', function () {
  addToPlayerTotal();
  if (scores[activePlayer] >= scoreGoal) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    gameOver();
  } else {
    switchPlayer();
  }
});
/**
 * Listens for when new game is clicked and then clears all
 * scores and switches the player to opposite of last player that won
 */
btnNew.addEventListener('click', function () {
  clearAllPlayersScores();
  clearWinner();
  switchPlayer();
  gameStart();
});

const clearWinner = function () {
  player0Section.classList.remove('player--winner');
  player1Section.classList.remove('player--winner');
};

/**
 * set the value of the dice
 */
btnRoll.addEventListener('click', function () {
  const diceValue = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceValue}.png`;

  if (diceValue !== 1) {
    currentScore += Number(diceValue);
    displayPlayerCurrentScore();
  } else {
    switchPlayer();
    clearCurrentScore();
  }
});

/**
 * clears all of the players totals to 0
 */
const clearPlayersTotal = function () {
  scores = [0, 0];
  currentScore = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
};

/**
 * clears current and total scores of both players and hides
 * the new game button
 */
const clearAllPlayersScores = function () {
  btnNew.classList.add('hidden');
  clearCurrentScore();
  clearPlayersTotal();
};

/**
 * clears the current player score
 */
const clearCurrentScore = function () {
  currentScore = 0;
};

/**
 * sets activePlayer as current player and
 */
window.onload = () => {
  player0Name.classList.add('current-player');
  clearAllPlayersScores();
};
