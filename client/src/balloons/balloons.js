import phaser from 'phaser';
import { spend } from '../index';

let game;
let score;
let scoreText;
let balloonScoreText;
let balloonsRemainingText;
let balloonsRemaining;
let amountToDonate;

export default function initBalloonDarts(){
  score = 0;
  balloonsRemaining = 5;
  amountToDonate = 0;

  game = new phaser.Game({
    parent: 'gamecanvas',
    width: 800,
    height: 500,
    scene: {
      preload,
      create,
      update
    }
  })
}

function preload(){
  console.log('ballons preload function')
  this.load.image('background', './assets/carnival-sign-blank-800x500.png');
  this.load.spritesheet('red-balloon', './assets/balloon-red-spritesheet.png', {
    frameHeight:120, frameWidth:80, endFrame: 2
  });
  this.load.spritesheet('green-balloon', './assets/balloon-green-spritesheet.png', {
    frameHeight:120, frameWidth:80, endFrame: 2
  });
  this.load.spritesheet('blue-balloon', './assets/balloon-blue-spritesheet.png', {
    frameHeight:120, frameWidth:80, endFrame: 2
  });
  this.load.spritesheet('purple-balloon', './assets/balloon-purple-spritesheet.png', {
    frameHeight:120, frameWidth:80, endFrame: 2,
  });
  this.load.spritesheet('yellow-balloon', './assets/balloon-yellow-spritesheet.png', {
    frameHeight:120, frameWidth:80, endFrame: 2
  });
  this.input.mouse.capture = true;
  this.input.on('gameobjectdown', balloonClicked);

  this.anims.create({
    key: 'pop',
    frames: this.anims.generateFrameNumbers('red-balloon'),
    frameRate: 10,
    repeat: -1
  });
}

function create(){
  this.add.image(400, 250, 'background');
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#000' })
  balloonsRemainingText = this.add.text(450, 16, 'Balloons Remaining: 5', { fontSize: '24px', fill: '#000' })
  balloonScoreText = this.add.text(810, 0, '', { fontSize: '32px', fill: '#000' })
  // add balloons
  // top row
  this.add.sprite(160, 125, 'green-balloon');
  this.add.sprite(270, 127, 'blue-balloon');
  this.add.sprite(400, 115, 'yellow-balloon');
  this.add.sprite(520, 130, 'red-balloon');
  this.add.sprite(640, 115, 'purple-balloon');
  // middle row
  this.add.sprite(155, 240, 'blue-balloon');
  this.add.sprite(285, 245, 'red-balloon');
  this.add.sprite(400, 238, 'purple-balloon');
  this.add.sprite(520, 250, 'yellow-balloon');
  this.add.sprite(640, 243, 'green-balloon');
  // bottom row
  this.add.sprite(155, 360, 'yellow-balloon');
  this.add.sprite(285, 365, 'green-balloon');
  this.add.sprite(400, 358, 'purple-balloon');
  this.add.sprite(520, 370, 'red-balloon');
  this.add.sprite(640, 363, 'blue-balloon');
  // make all sprites interactive
  this.children.list.forEach(balloon => {
    balloon.setInteractive();
    balloon.setData({'value': Math.floor((Math.random() * 5) + 1)})
  })
}

function update(){

}

function generateFeedBack(){
  console.log('generating feedback for ', score)
  if(score > 0 && score < 10){
    amountToDonate = 5;
    return `terrible, you are donating $${amountToDonate}`;
  } else if (score >= 10 && score < 18){
    amountToDonate = 2;
    return `not bad, you are donating $${amountToDonate}`;
  } else if (score >= 18){
    amountToDonate = 1;
    return `very well done, you are donating $${amountToDonate}`;
  }
}

function balloonClicked(pointer, balloon){
  const balloonScore = balloon.getData('value')
  if(balloon.type === 'Sprite'){
    score += balloonScore;
    balloonsRemaining -= 1;
    balloonsRemainingText.setText('Balloons Remaining: ' + balloonsRemaining);
    scoreText.setText('Score: ' + score);
    setTimeout(() => {
      balloon.setFrame(1);
    }, 100);
    setTimeout(() => {
      balloon.setFrame(2);
    }, 200);
    setTimeout(() => {
      balloon.destroy();
      balloonScoreText.setText('+' + balloonScore);
      balloonScoreText.setX(balloon.x);
      balloonScoreText.setY(balloon.y);
      setTimeout(() => {
        balloonScoreText.setX(810)
        if(balloonsRemaining === 0){
          game.scene.keys.default.add.image(400, 250, 'background');
          game.scene.keys.default.add.text(120, 150, `You finished with a score of ${score}!`, { fontSize: '28px', fill: '#000' });
          game.scene.keys.default.add.text(120, 200, generateFeedBack(), { fontSize: '28px', fill: '#000' });
          game.scene.keys.default.add.text(120, 250, 'Click the \'Balloon Darts\' button to play again', { fontSize: '22px', fill: '#000' });
          spend(amountToDonate);
        }
      }, 500)
    }, 300);
  }
}
