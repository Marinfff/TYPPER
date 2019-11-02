class Game {
  public canvas: any;
  public hero: any;
  public back: any;
  public ground: any;
  public fps: any;

  public constructor(canvas: any, hero: any, back: any, ground: any) {
    this.canvas = canvas.getContext('2d');
    this.fps = 24;
    this.hero = hero;
    this.back = back;
    this.ground = ground;
  };

  public async init() {
    await this.loadHero();
    await this.loadBack();
    await this.loadGround();
    this.addListeners();
    this.animate();
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
    this.ground.setGround({
      left: await import('../assets/ground/left.png'),
      right: await import('../assets/ground/right.png'),
      mid: await import('../assets/ground/mid.png'),
    })
  }

  public async loadBack() {
    this.back.setBackground(await import('../assets/background/forest.png'))
  }

  private animate() {
    this.back.animate(this.canvas);
    this.ground.animate(this.canvas);
    this.hero.animate(this.canvas);

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.animate();
      });
    }, 1000 / this.fps);
  }

  private addListeners() {
    document.addEventListener('keydown', (e: any) => {
      if (e.code == "KeyD") {
        this.hero.run();
        return;
      }
    });
    document.addEventListener('keyup', (e: any) => {
      if (e.code == "Space") {
        this.hero.jump();
        return;
      }
      if (e.code == "KeyD") {
        this.hero.idle();
        return;
      }
    })
  }
}

export default Game
