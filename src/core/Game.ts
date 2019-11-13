class Game {
  public scene: any;
  public hero: any;
  public back: any;
  public ground: any;
  public stone: any;
  public fps: any;

  public constructor(hero: any, back: any, ground: any, stone: any, scene: any) {
    this.fps = 30;
    this.hero = hero;
    this.back = back;
    this.ground = ground;
    this.stone = stone;
    this.scene = scene;
  };

  public async loadHero() {
    this.hero.setSprites({
      grind: await import('../assets/hero/grind.png'),
      idle: await import('../assets/hero/idle.png'),
      jump: await import('../assets/hero/jump.png'),
      run: await import('../assets/hero/run.png')
    })
  }

  public async loadGround() {
    this.ground.setGround(await import('../assets/ground/ground.png'))
  }

  public async loadStone() {
    this.stone.setStone(await import('../assets/ground/stone.png'))
  }

  public async loadBack() {
    this.back.setBackground(await import('../assets/background/forest.png'))
  }

  public async init() {
    await this.loadHero();
    await this.loadBack();
    await this.loadStone();
    await this.loadGround();
    this.addListeners();
    this.initScene();
    this.animateScene();
  };

  private initScene() {
    this.scene.add(this.back);
    this.scene.add(this.ground);
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
