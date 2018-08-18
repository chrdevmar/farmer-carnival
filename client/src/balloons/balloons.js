import phaser from 'phaser';

export default function initBalloonDarts(){
  const game = new phaser.Game({
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
  this.load.image('red-balloon', './assets/balloon-red-80x120.png');
  this.load.image('green-balloon', './assets/balloon-green-80x120.png');
  this.load.image('blue-balloon', './assets/balloon-blue-80x120.png');
  this.load.image('purple-balloon', './assets/balloon-purple-80x120.png');
  this.load.image('yellow-balloon', './assets/balloon-yellow-80x120.png');
}

function create(){
  this.add.image(400, 250, 'background');
  // add balloons
  // top row
  this.add.image(160, 125, 'green-balloon');
  this.add.image(270, 127, 'blue-balloon');
  this.add.image(400, 115, 'yellow-balloon');
  this.add.image(520, 130, 'red-balloon');
  this.add.image(640, 115, 'purple-balloon');
  // middle row
  this.add.image(155, 240, 'blue-balloon');
  this.add.image(285, 245, 'red-balloon');
  this.add.image(400, 238, 'purple-balloon');
  this.add.image(520, 250, 'yellow-balloon');
  this.add.image(640, 243, 'green-balloon');
  // bottom row
  this.add.image(155, 360, 'yellow-balloon');
  this.add.image(285, 365, 'green-balloon');
  this.add.image(400, 358, 'purple-balloon');
  this.add.image(520, 370, 'red-balloon');
  this.add.image(640, 363, 'blue-balloon');
}

function update(){

}
