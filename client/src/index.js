import phaser from 'phaser';

import initBalloonDarts from './balloons/balloons';
import initBigWheel from './wheel/wheel';
import initClowns from './clowns/clowns';
import validateSession from './validateSession';
import axios from 'axios';

import jwt from 'jsonwebtoken';


const game = document.getElementsByTagName('canvas');

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

export function clowns() {
  if (game.length) {
    game[0].remove();
  }
  initClowns();
}



export function donate() {
  var donationAmount = document.getElementById('donationAmount').value
  axios.post('http://localhost:8000/commit', {
    "balance": donationAmount
  })
    .then(function (response) {
      window.localStorage.setItem('farmerToken', response.data)
      initSession();
      console.log(response.data);
      document.getElementById('donationButton').innerHTML = "Thank you for donating, your games will begin shortly..";
      document.getElementById('loading-icon').style.display = "visible";
      document.getElementById('loading-icon').style.color = "white";
      setTimeout(() => {
      }, 3000)
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function spend(amount){
  const token = window.localStorage.getItem('farmerToken');
  const currentToken = jwt.verify(token, 'farmercarnival');
  console.log('current token before spending is', currentToken);
  axios.post('http://localhost:8000/spend', {
    amount,
    token
  })
  .then(({data}) => {
    console.log('spend response', data)
    window.localStorage.setItem('farmerToken', data);
    const balanceData = jwt.verify(data, 'farmercarnival');
    console.log('got the balance', balanceData);
    document.getElementById('remainingBalance').innerText = balanceData.balance;
  })
  .catch((error) => {
    console.log('error spending', error)
  })
}

export function initSession() {

  const sessionStatus = validateSession();

  if (sessionStatus.isValid === false) {
    document.getElementById("game-elements").style.display = "none";
    document.getElementById("page-container").style.display = "block";
  } else {
    document.getElementById("game-elements").style.display = "block";
    document.getElementById("page-container").style.display = "none";
    document.getElementById("remainingBalance").innerText = sessionStatus.balance.balance
  }
}
