import phaser from 'phaser';

export default function initClowns(){
  console.log('initClowns');
  const game = new phaser.Game({
    parent: 'gamecanvas',
    width: 600,
    height: 400,
  })
}
