import Game from './core/Game'
import Scene from "./core/Scene";
import Hero from "./components/Hero";
import Background from "./components/Background";
import Ground from "./components/Ground";


const game = new Game(
  new Hero(),
  new Background(),
  new Ground(),
  new Scene()
);

game.init();
