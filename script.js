"use strict";

const score0Element = document.querySelector("#score--0");
const playerOElement = document.querySelector(".player--0")
const player1Element = document.querySelector(".player--1");
const score1Element = document.getElementById("score--1");
const currentScore0Element = document.getElementById("current--0");
const currentScore1Element = document.getElementById("current--1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores;
let currentScore;
let activePlayer;
let playing;

// Starting conditions
const init = () => {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;

    diceElement.classList.add("hidden");

    playerOElement.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    playerOElement.classList.add('player--active');
    player1Element.classList.remove('player--active');
}

init();


const switchPlayer = () => {
    // Switch to the next player
    document.getElementById(`current--${activePlayer}`).textContent = String(0);
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerOElement.classList.toggle("player--active");
    player1Element.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", () => {
    if (playing) {
        // 1. Generate random roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // 2. Display dice
        diceElement.classList.remove("hidden");
        diceElement.src = `dice-${dice}.png`;

        // 3. Check for rolled 1, if true switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", () => {
    if (playing) {
        // 1. Add current score to current active player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = String(scores[activePlayer]);

        // 2. Check if score is >= 100
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceElement.classList.add("hidden");
            // Finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", init);