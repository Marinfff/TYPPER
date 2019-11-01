class Game {
  public canvas: any;
  public hero: any;
  public back: any;
  public brick: any;

  public constructor(canvas: any, hero: any, back: any, brick: any) {
    this.canvas = canvas.getContext('2d');
    this.hero = hero;
    this.back = back;
    this.brick = brick;
  };

  public async init() {
    await this.loadHero();
    await this.loadBack();
    await this.loadBrick();
    this.addListeners();
    this.animate();
  };

  private animate () {
    this.back.animate(this.canvas);
    this.brick.animate(this.canvas);
    this.hero.animate(this.canvas);

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.animate();
      });
    }, 1000 / 25);
  }

  private addListeners() {
    document.addEventListener('keydown', (e: any) => {
      if (e.code == "KeyD") {
        this.hero.run();
        return;
      }
    })
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

  public async loadHero() {
    await this.hero.setSprites({
      grind: await import('../assets/hero/grind.png'),
      idle: await import('../assets/hero/idle.png'),
      jump: await import('../assets/hero/jump.png'),
      run: await import('../assets/hero/run.png')
    })
  }

  public async loadBack() {
    await this.back.setBackground(await import('../assets/background/forest.png'))
  }
  public async loadBrick() {
    await this.brick.setBrick(await import('../assets/brick/grassMid.png'))
  }
}

export default Game
