import "./src/style/style.css"
import {Maze} from "./src/components/Maze";
import {Player} from "./src/components/Player";
import {UserInterface} from "./src/components/UI";

const maze = new Maze();
const player = new Player();
const userInterface = new UserInterface();

class Game {
  private maze: any;
  private player: any;
  private backSound: any;
  private winSound: any;
  private userInterface: any;

  constructor(maze: any, player: any, userInterface: any) {
    this.maze = maze;
    this.player = player;
    this.userInterface = userInterface;
    this.backSound = new Audio();
    this.winSound = new Audio();
  }

  async init() {
    await this.loadSound();
    await this.userInterface.confirmGameStart();
    this.userInterface.toggleLoader();
    this.maze.setSprite(await import('./src/assets/images/box.png'))
    await this.player.loadEnvironment({
      top: await import('./src/assets/images/player/top.png'),
      left: await import('./src/assets/images/player/left.png'),
      bottom: await import('./src/assets/images/player/bottom.png'),
      right: await import('./src/assets/images/player/right.png'),
      audio: await import('./src/assets/sound/step.mp3'),
    });
    await this.maze.generate();
    this.player.setMatrix(this.maze);
    this.addListeners();
    this.userInterface.toggleLoader();
  }

  private async loadSound() {
    this.backSound.src = (await import('./src/assets/sound/back.mp3')).default;
    this.winSound.src = (await import('./src/assets/sound/win.mp3')).default;
   await this.backSound.play()
  }


  async upLevel() {
    await this.maze.next();
    this.player.reset();
    this.player.setMatrix(this.maze);
  }

  async checkEndLevel() {
    if (
      this.maze.getSize().width == this.player.getSquare().x + 3
      && this.maze.getSize().height == this.player.getSquare().y + 3
    ) {
      await this.winSound.play()
      this.userInterface.showGameOver();

      try {
        await this.userInterface.confirmGameOver();
        this.upLevel();
        this.userInterface.hideEndModal();
      } catch {
        window.location.reload();
      }
    }
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
      this.checkEndLevel();
      this.player.stop()
    })
  }
}

const game = new Game(maze, player, userInterface)

game.init();

