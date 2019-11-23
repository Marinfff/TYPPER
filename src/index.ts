import Game from './core/Game'
import {Scene} from "./core/Scene";
import {Hero} from "./components/Hero";
import {Background} from "./components/Background";
import {Stone} from "./components/Stone";
import {UserInterface} from "./components/navigation/UI";

const game = new Game(
  new Hero(),
  new Background(),
  new Stone(),
  new Scene(),
  new UserInterface()
);

game.init()
  .then(() => {
    console.log('The game is running!')
  })
  .catch((error) => {
    throw error
  });
