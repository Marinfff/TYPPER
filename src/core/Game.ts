import Api from "../services/api";
import {BackgroundInterface} from "../components/Background";
import {HeroInterface} from "../components/Hero";
import {StoneInterface} from "../components/Stone";
import {SceneInterface} from "../views/Scene";
import {UserInterfaceInterface} from "../views/UI";

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
  public backSound: any;
  public loseSound: any;

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
    this.backSound = new Audio();
    this.loseSound = new Audio();
    this.background = background;
    this.stone = stone;
    this.scene = scene;
    this.userInterface = userInterface;
  };

  public async init() {
    await this.loadSound();
    await this.userInterface.confirmGameStart();
    this.userInterface.toggleLoader();
    await this.loadEnvironment();
    this.addListeners();
    this.initScene();
    this.userInterface.toggleLoader();
    this.animateScene();
  };


  private async loadEnvironment() {
    this.stone.setStone(await Api.loadStone());
    this.background.setBackground(await Api.loadBackground());
    this.hero.loadEnvironment(await Api.loadHero());
  }

  private initScene() {
    this.scene.add(this.background);
    this.scene.add(this.stone);
    this.scene.add(this.hero);
  }

  private async loadSound() {
    const sound = await Api.loadAudio();
    this.backSound.src = sound.main;
    this.loseSound.src = sound.lose;
    this.backSound.autoplay = true
  }

  private isGameEnd() {
    return (
      this.stone.getPosition() > this.hero.getPosition().start
      && this.stone.getPosition() < this.hero.getPosition().end
      && this.hero.getAction() !== 'jump'
    )
  }

  private upLevel() {
    this.background.upLevel();
    this.stone.upLevel();
  }

  private async gameEnd() {
    this.userInterface.showGameOver(this.score);
    this.saveRecord();
    await this.loseSound.play();
    await this.userInterface.confirmGameOver();
    window.location.reload();
  }

  private saveRecord () {
    localStorage.setItem('record', this.score.toString());
  }

  private animateScene() {
    this.scene.render();
    this.score += 1;

    if (this.isGameEnd()) {
      this.gameEnd();
      return;
    }

    if (this.score % 200 == 0) {
      this.upLevel()
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
