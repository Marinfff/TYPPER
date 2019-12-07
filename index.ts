import "./src/style/style.css"
import {Maze} from "./src/components/Maze";
import {Player} from "./src/components/Player";

const maze = new Maze();
const player = new Player();

class Game {
  private maze: any;
  private player: any;

  constructor(maze: any, player: any) {
    this.maze = maze;
    this.player = player;
  }

  async init() {
    this.maze.setSprite(await import('./src/assets/images/box.png'))
    await this.player.loadEnvironment({
      top: await import('./src/assets/images/player/top.png'),
      left: await import('./src/assets/images/player/left.png'),
      bottom: await import('./src/assets/images/player/bottom.png'),
      right: await import('./src/assets/images/player/right.png'),
    })
    await this.maze.generate();
    this.player.setMatrix(this.maze);
    this.addListeners()
  }

  addListeners() {
    document.addEventListener('keypress', (e) => {
      switch (e.code) {
        case 'KeyD':
          this.player.move('left');
          break;
        case 'KeyA':
          this.player.move('right');
          break;
        case 'KeyW':
          this.player.move('top');
          break;
        case 'KeyS':
          this.player.move('bottom');
          break;
      }
    });
    document.addEventListener('keyup', () => {
      this.player.stop()
    })
  }
}

const game = new Game(maze, player)

game.init();

