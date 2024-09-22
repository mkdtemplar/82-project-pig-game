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

// Starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Rolling dice functionality
btnRoll.addEventListener("click", () => {
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
        // Switch to the next player
        document.getElementById(`current--${activePlayer}`).textContent = String(0);
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        playerOElement.classList.toggle("player--active");
        player1Element.classList.toggle("player--active");
    }
});

btnHold.addEventListener("click", () => {
    // 1. Add current score to current active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = String(scores[activePlayer]);
})