import phaser from 'phaser';

import initBalloonDarts from './balloons/balloons';
import initBigWheel from './wheel/wheel';
import initClowns from './clowns/clowns';


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
