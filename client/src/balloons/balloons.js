import phaser from 'phaser';

export default function initBalloonDarts(){
  const game = new phaser.Game({
    parent: 'gamecanvas',
    width: 600,
    height: 400,
    scene: {
      preload,
      create,
      update
    }
  })
}

function preload(){
  console.log('ballons preload function')
}

function create(){
  console.log('')
}

function update(){

}
