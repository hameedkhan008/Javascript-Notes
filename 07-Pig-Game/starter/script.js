'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');


const scores = [0, 0];
let currentScore = 0;
let activeplayer = 0;

const switchPlayer = function(){
   document.getElementById(`current--${activeplayer}`).textContent = 0;
    currentScore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function(){
   // 1. Generating a random dice roll
   const dice = Math.trunc(Math.random()*6)+1;

   // 2. Display dice
   diceEl.classList.remove('hidden');
   diceEl.src = `dice-${dice}.png`;

   // 3. Check for rolled 1: if true switch to next player

   if (dice !== 1){
    // Add dice to current score
     currentScore += dice; 
     document.getElementById(`current--${activeplayer}`).textContent = currentScore;
     //current0El.textContent =  currentScore; // Change Latter

   }
   else{
    // Switch to next player
    switchPlayer();
   }
});

btnHold.addEventListener('click' , function(){
   // 1. Add current score to actvie player's score
   scores[activeplayer] += currentScore;
   //scores[1] = scores[1] + currentScore;
   document.getElementById(`score--${activeplayer}`.textContent = scores[activeplayer]);

   // 2. Check if player's scoreis >=100
   //finish the game

   //Switch to next player
   switchPlayer();

})