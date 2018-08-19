import phaser from 'phaser';

import initBalloonDarts from './balloons/balloons';
import initBigWheel from './wheel/wheel';
import initCatchACow from './catch-a-cow';
import validateSession from './validateSession';
import axios from 'axios';

import jwt from 'jsonwebtoken';


const game = document.getElementsByTagName('canvas');
const cow = document.getElementById('cow');

export function balloonDarts() {
  if (game.length) {
    game[0].remove();
  }
  initBalloonDarts();
}

export function bigWheel() {
  if (game.length) {
    game[0].remove();
  }
  initBigWheel();
}

export function catchACow() {
  if (game.length) {
    game[0].remove();
  }
  initCatchACow();
}

export function spend(amount){
  return axios.post('http//localhost:8000/spend', {
    amount
  })
  .then(({token}) => {
    const balanceData = jwt.verify(token, 'farmercarnival');
    console.log('got the balance', balanceData);
    document.getElementById('#remainingBalance').innerText = balanceData.balance;
  })
  .catch((error) => {
    console.log('error spending', error)
  })
}

export function initSession() {

  const sessionStatus = validateSession();

  console.log('validation status', sessionStatus);
  if (sessionStatus.isValid === false) {
    document.getElementById("game-elements").style.display = "none";
    document.getElementById("page-container").style.display = "block";
  } else {
    console.log('showing the games')
    document.getElementById("game-elements").style.display = "block";
    document.getElementById("page-container").style.display = "none";
  }
}
