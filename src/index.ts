import Game from './core/Game'
import {Scene} from "./views/Scene";
import {Hero} from "./components/Hero";
import {Background} from "./components/Background";
import {Stone} from "./components/Stone";
import {UserInterface} from "./views/UI";

interface ContainerInterface {
  init(): void
}

class GameContainer implements ContainerInterface {
  private game: Game;

  public constructor() {
    this.game = new Game(
      new Hero(),
      new Background(),
      new Stone(),
      new Scene(),
      new UserInterface()
    );
  }

  public init() {
    this.game
      .init()
      .then(() => {
        console.log('The game is running!')
      })
      .catch((error) => {
        throw error
      });
  }
}

export default new GameContainer()
