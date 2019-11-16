class Game {
  public scene: any;
  public ui: any;
  public hero: any;
  public back: any;
  public stone: any;
  public fps: any;

  public constructor(hero: any, back: any, stone: any, scene: any, ui: any) {
    this.fps = 30;
    this.hero = hero;
    this.back = back;
    this.stone = stone;
    this.scene = scene;
    this.ui = ui;
  };

  public async loadHero() {
    this.hero.setSprites({
      jump: await import('../assets/hero/jump.png'),
      run: await import('../assets/hero/run.png')
    })
  }

  public async loadEnvironment() {
    this.stone.setStone(await import('../assets/ground/stone.png'));
    this.back.setBackground(await import('../assets/background/forest.png'));
  }

  public async init() {
    await this.ui.userChoice();
    this.ui.showLoader();
    await this.loadHero();
    await this.loadEnvironment();
    this.addListeners();
    this.ui.hideLoader();
    this.initScene();
    this.animateScene();
  };

  private initScene() {
    this.scene.add(this.back);
    this.scene.add(this.stone);
    this.scene.add(this.hero);
  }

  private checkPosition() {
    if (
      this.stone.getPosition() > this.hero.position().start
      && this.stone.getPosition() < this.hero.position().end
      && this.hero.action() !== 'jump'
    ) {
      window.location.reload()
    }
  }

  private animateScene() {
    this.scene.render();
    this.checkPosition();

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
