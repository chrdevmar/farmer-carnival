let game;
let score;

export default function initCatchACow() {
  const element = document.getElementById('gamecanvas');
  const canvas = element.children[0];
  if(canvas){
    // const webgl = canvas.getContext('webgl');
    // webgl.deleteTexture(webglTexture);
    // console.log('webgl context', webgl)
    canvas.remove()
  }
  // init game
  game = document.getElementById('cow');
  game.style.display = 'block';
  // game.style.visibility = 'visible';
}
