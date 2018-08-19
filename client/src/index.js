import phaser from 'phaser';

import initBalloonDarts from './balloons/balloons';
import initBigWheel from './wheel/wheel';
import initClowns from './clowns/clowns';
import validateSession from './validateSession';
import axios from 'axios';

import jwt from 'jsonwebtoken';

let game;

export function balloonDarts() {
  if(game){
    game.destroy()
    game = null;
  }
  initBalloonDarts();
}

export function bigWheel() {
  if(game){
    game.destroy()
    game = null;
  }
  initBigWheel();
}

export function clowns() {
  if(game){
    game.destroy()
    game = null;
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
    })
    .catch(function (error) {
      console.log(error);
    });
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
