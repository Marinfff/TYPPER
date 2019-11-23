import {BackgroundInterface} from "../components/Background";
import {HeroInterface} from "../components/Hero";
import {SceneInterface} from "./Scene";
import {StoneInterface} from "../components/Stone";
import {UserInterfaceInterface} from "../components/navigation/UI";

interface GameInterface {
  init(): void
}

class Game implements GameInterface {
  public scene: SceneInterface;
  public userInterface: UserInterfaceInterface;
  public hero: HeroInterface;
  public background: BackgroundInterface;
  public stone: StoneInterface;
  public score: number;
  public fps: number;

  public constructor(
    hero: HeroInterface,
    background: BackgroundInterface,
    stone: StoneInterface,
    scene: SceneInterface,
    userInterface: UserInterfaceInterface
  ) {
    this.fps = 30;
    this.score = 0;
    this.hero = hero;
    this.background = background;
    this.stone = stone;
    this.scene = scene;
    this.userInterface = userInterface;
  };

  public async init() {
    await this.userInterface.confirmGameStart();
    this.userInterface.toggleLoader();
    await this.loadHero();
    await this.loadEnvironment();
    this.addListeners();
    this.userInterface.toggleLoader();
    this.initScene();
    this.animateScene();
  };

  private async loadHero() {
    this.hero.setSprites({
      jump: await import('../assets/hero/jump.png'),
      run: await import('../assets/hero/run.png')
    })
  }

  private async loadEnvironment() {
    this.stone.setStone(await import('../assets/ground/stone.png'));
    this.background.setBackground(await import('../assets/background/forest.png'));
  }

  private initScene() {
    this.scene.add(this.background);
    this.scene.add(this.stone);
    this.scene.add(this.hero);
  }

  private isFail() {
    return (
      this.stone.getPosition() > this.hero.getPosition().start
      && this.stone.getPosition() < this.hero.getPosition().end
      && this.hero.getAction() !== 'jump'
    )
  }

  private async gameEnd() {
    this.userInterface.showGameOver(this.score);
    await this.userInterface.confirmGameOver();
    window.location.reload();
  }

  private animateScene() {
    this.scene.render();
    this.score += 1;

    if (this.isFail()) {
      this.gameEnd();
      return;
    }

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.animateScene();
      });
    }, 1000 / this.fps);
  }

  private addListeners() {
    document.addEventListener('keypress', (e: any) => {
      if (e.code == "Space") {
        this.hero.jump();
      }
    });
    document.addEventListener('touchstart', () => {
      this.hero.jump();
    })
  }
}

export default Game
