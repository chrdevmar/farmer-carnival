import phaser from 'phaser';

import initBalloonDarts from './balloons/balloons';
import initBigWheel from './wheel/wheel';
import initClowns from './clowns/clowns';

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
