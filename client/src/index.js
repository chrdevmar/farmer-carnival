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
  initBalloonDarts();
}

export function bigWheel() {
  initBigWheel();
}

export function catchACow() {
  initCatchACow();
}

export function donate() {
  var donationAmount = Number(document.getElementById('donationAmount').value)
  axios.post('http://localhost:8000/commit', {
    "balance": donationAmount
  })
    .then(function (response) {
      window.localStorage.setItem('farmerToken', response.data)
      console.log(response.data);
      document.getElementById('donationButton').innerHTML = "Thank you for donating, your games will begin shortly..";
      setTimeout(() => {
        initSession();
      }, 1500)
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
    if(Number(balanceData.balance) < 1){
      console.log('ran out of balance');
      document.getElementById('out-of-balance').style.display = 'block';
      document.getElementById('game-elements').style.display = 'none';
      document.getElementById('gamecanvas').style.display = 'none';
      document.getElementById('cow').style.display = 'none';
    }
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
    document.getElementById("my-balance").style.display = "none";
    document.getElementById("page-container").style.display = "block";
    document.getElementById('donationButton').innerHTML = "Donate now";
    document.getElementById('out-of-balance').style.display = 'none';
  } else {
    document.getElementById("game-elements").style.display = "block";
    document.getElementById("out-of-balance").style.display = "none";
    document.getElementById("my-balance").style.position = "fixed";
    document.getElementById("my-balance").style.display = "initial";
    document.getElementById("page-container").style.display = "none";
    document.getElementById("gamecanvas").style.display = "block";
    document.getElementById("remainingBalance").innerText = sessionStatus.balance.balance
  }
}
