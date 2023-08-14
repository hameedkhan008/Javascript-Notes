'use strict';
/* console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent='🙂 Correct Number';
document.querySelector('.number').textContent='13';
document.querySelector('.score').textContent='10';
document.querySelector('.guess').value='23';
console.log(document.querySelector('.guess').value); */

let secretnumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
//document.querySelector('.number').textContent = secretnumber;

//Functionality for check button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '😊 No Number!';
  }

  //When player wins
  else if (guess === secretnumber) {
    document.querySelector('.message').textContent = '🥇 Correct Number!';
    document.querySelector('body').style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretnumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
  //When guess is wrong
  else if (guess !== secretnumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretnumber ? '📈 Too High!' : '📉 Too Low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '😔 You Lost The Game!';
      document.querySelector('body').style.backgroundColor = '#DC3545';
      document.querySelector('.score').textContent = 0;
    }
  }
  //When guess is too high
  // else if (guess > secretnumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = '🙂 Too High!';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '🙂 You Lost The Game!';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //     }

  //     //when guess is too low
  // else if (guess < secretnumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = '🙂 Too Low!';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '🙂 You Lost The Game!';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   }
});
//functionality for Again button
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretnumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
