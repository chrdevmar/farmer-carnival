import phaser from 'phaser';

export default function initClowns(){
  console.log('initClowns');
  const element = document.getElementById('gamecanvas');
  const canvas = element.children[0];
  if(canvas){
    const webgl = canvas.getContext('webgl');
    console.log('webgl context', webgl)
    canvas.remove()
  }
  const game = new phaser.Game({
    parent: 'gamecanvas',
    width: 600,
    height: 400,
  })
}
