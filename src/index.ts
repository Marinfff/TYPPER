import Game from './core/Game'
import Hero from "./components/Hero";
import Background from "./components/Background";
import Ground from "./components/Ground";

const canvas = document.getElementById('canvas');

if (canvas) {
  canvas.setAttribute("width", window.innerWidth.toString())
  canvas.setAttribute("height", window.innerHeight.toString())
}

const game = new Game(
  canvas,
  new Hero(),
  new Background(),
  new Ground()
);

game.init();
