interface SpritesInterface {
  [value: string]: Array<HTMLImageElement>,
}

interface HeroInterface {
  loadSprites(): void,

  execute(action: string): void,

  animate(context: any): void,
}

class Hero implements HeroInterface {
  private sprites: SpritesInterface;
  private current: any;
  private totalFrame: number;
  private fps: number;
  private width: number;
  private height: number;
  private currentFrame: number;
  private frames: number;

  public constructor(fps: number) {
    this.fps = fps;
    this.current = [];
    this.width = 524;
    this.height = 565;
    this.currentFrame = 0;
    this.frames = 9;
    this.totalFrame = 10;
    this.sprites = {
      jump: [],
      dead: [],
      attack: [],
      idle: [],
      jumpAttack: [],
      run: [],
      slide: []
    };
  }

  private async completeSprite(sprite: string) {
    for await (const [index, item] of this.sprites[sprite].entries()) {
      item.src = (await import(`../assets/${sprite}/${index}.png`)).default
    }
  }

  public async loadSprites() {
    for await (const sprite of Object.keys(this.sprites)) {
      this.sprites[sprite] = [...new Array(this.totalFrame)];
      this.sprites[sprite] = this.sprites[sprite].map(() => new Image());
      await this.completeSprite(sprite);
    }
    this.current = this.sprites.run;
  }

  public execute(action: string) {
    this.currentFrame = 0;
    this.current = this.sprites[action];

    setTimeout(() => {
      this.currentFrame = 0;
      this.current = this.sprites.run;
    }, 500)
  }

  public animate(context: any) {
    context.clearRect(0, 0, this.width, this.height);
    context.drawImage(
      this.current[this.currentFrame],
      0,
      0,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    );

    if (this.currentFrame == this.frames) {
      this.currentFrame = 0;
    } else {
      this.currentFrame++;
    }

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.animate(context);
      });
    }, 1000 / this.fps);
  }
}

export default Hero
