import phaser from 'phaser';

export default function initBigWheel(){
  console.log('initBigWheel');
  const game = new phaser.Game({
    parent: 'gamecanvas',
    width: 600,
    height: 400
  })
}
