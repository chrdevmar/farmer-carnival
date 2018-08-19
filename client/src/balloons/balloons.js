import phaser from 'phaser';

export default function initBalloonDarts(){
  const score = 0;
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

function balloonClicked(pointer, balloon){
  console.log('clicked on a balloon', balloon.getData('value'));

  if(balloon.type === 'Sprite'){
    setTimeout(() => {
      balloon.setFrame(1);
    }, 100);
    setTimeout(() => {
      balloon.setFrame(2);
    }, 200);
    setTimeout(() => {
      balloon.destroy();
    }, 300);
    setTimeout(() => {
      console.log(this.manager.game)
      // this.manager.game.add.text(balloon.x, balloon.y, 'POP', { color: '#00ff00' });
    }, 400);
  }
}
