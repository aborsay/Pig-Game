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
 * userholds
 * create new game function
 * create hold function
 */

let player1CurrentScore = 0;
let player2CurrentScore = 0;
let player1TotalScore = 0;
let player2TotalScore = 0;

const player1Name = document.getElementById('name--0');
const player2Name = document.getElementById('name--1');

const currentDisplayScore1 = document.getElementById('current--0');
const currentDisplayScore2 = document.getElementById('current--1');

const totalDisplayScore1 = document.getElementById('score--0');
const totalDisplayScore2 = document.getElementById('score--1');

const player1Section = document.querySelector('.player.player--0');
const player2Section = document.querySelector('.player.player--1');

const diceRoll = document.querySelector('.btn.btn--roll');
const dice = document.querySelector('.dice');

const hold = document.querySelector('.btn.btn--hold');
const newGame = document.querySelector('.btn.btn--new');

let player1 = true;

const scoreGoal = 10;

currentDisplayScore1.textContent = 0;
currentDisplayScore2.textContent = 0;
totalDisplayScore1.textContent = 0;
totalDisplayScore2.textContent = 0;

/**
 *This returns the a random dice value
 */
const diceValue = () => Math.trunc(Math.random() * 6) + 1;

/**
 * This switches between which player is active
 */
const switchPlayer = function () {
  player1 = !player1;
  if (player1) {
    player1Name.classList.add('current-player');
    player2Name.classList.remove('current-player');
    player1Section.classList.add('player--active');
    if (player2Section.classList.contains('player--active'))
      player2Section.classList.remove('player--active');
  } else {
    player2Name.classList.add('current-player');
    player1Name.classList.remove('current-player');

    if (player1Section.classList.contains('player--active'))
      player1Section.classList.remove('player--active');
    player2Section.classList.add('player--active');
  }
};

/**
 * Adds the current dice score to the current players score
 * @param {*} score
 */
const addToPlayerScore = function (score) {
  if (player1) {
    player1CurrentScore += Number(score);
  } else {
    player2CurrentScore += Number(score);
  }
};

/**
 * Displays the current players current score in the pink box
 */
const displayPlayerCurrentScore = function () {
  currentDisplayScore1.textContent = player1CurrentScore;
  currentDisplayScore2.textContent = player2CurrentScore;
};

/**
 * this adds to the current players total and displays their new
 * total below player name
 */
const addToPlayerTotal = function () {
  if (player1) {
    player1TotalScore += player1CurrentScore;
    totalDisplayScore1.textContent = player1TotalScore;
  } else {
    player2TotalScore += player2CurrentScore;
    totalDisplayScore2.textContent = player2TotalScore;
  }
};

/**
 * This hides the roll and hold buttons and shows the new game
 * button after the end of the game
 */
const gameOver = function () {
  diceRoll.classList.add('hidden');
  hold.classList.add('hidden');
  newGame.classList.remove('hidden');
};

/**
 * Shows the roll and hold button and hides the new game
 * button when a new game is started
 */
const gameStart = function () {
  diceRoll.classList.remove('hidden');
  hold.classList.remove('hidden');
  newGame.classList.add('hidden');
};

/**
 * Listends for when the hold button is clicked and then is
 * a player has reach the goal winner is announced
 * Otherwise players are switched
 */
hold.addEventListener('click', function () {
  addToPlayerTotal();
  if (player1TotalScore >= scoreGoal || player2TotalScore >= scoreGoal) {
    if (player1) {
      player1Section.classList.add('player--winner');
    } else {
      player2Section.classList.add('player--winner');
    }
    gameOver();
  } else {
    switchPlayer();
  }
});

/**
 * Listens for when new game is clicked and then clears all
 * scores and switches the player to opposite of last player that won
 */
newGame.addEventListener('click', function () {
  clearAllPlayersScores();
  clearWinner();
  switchPlayer();
  gameStart();
});

const clearWinner = function () {
  if (player1Section.classList.contains('player--winner'))
    player1Section.classList.remove('player--winner');
  if (player2Section.classList.contains('player--winner'))
    player2Section.classList.remove('player--winner');
};
/**
 * set the value of the dice
 */
diceRoll.addEventListener('click', function () {
  switch (diceValue()) {
    case 1:
    default: {
      dice.src = 'dice-1.png';
      switchPlayer();
      clearCurrentScore();
      return;
    }
    case 2: {
      dice.src = 'dice-2.png';
      addToPlayerScore(2);
      break;
    }
    case 3: {
      dice.src = 'dice-3.png';
      addToPlayerScore(3);
      break;
    }
    case 4: {
      dice.src = 'dice-4.png';
      addToPlayerScore(4);
      break;
    }
    case 5: {
      dice.src = 'dice-5.png';
      addToPlayerScore(5);
      break;
    }
    case 6: {
      dice.src = 'dice-6.png';
      addToPlayerScore(6);
      break;
    }
  }

  displayPlayerCurrentScore();
});

/**
 * clears all of the players totals to 0
 */
const clearPlayersTotal = function () {
  player1TotalScore = player2TotalScore = 0;

  totalDisplayScore1.textContent = 0;
  totalDisplayScore2.textContent = 0;
};

/**
 * clears current and total scores of both players and hides
 * the new game button
 */
const clearAllPlayersScores = function () {
  newGame.classList.add('hidden');
  clearCurrentScore();
  clearPlayersTotal();
};

/**
 * clears the current player score
 */
const clearCurrentScore = function () {
  currentDisplayScore1.textContent = 0;
  currentDisplayScore2.textContent = 0;
  player1CurrentScore = player2CurrentScore = 0;
};

/**
 * sets player1 as current player and
 */
window.onload = () => {
  player1Name.classList.add('current-player');
  clearAllPlayersScores();
};
