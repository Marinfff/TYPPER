class Hero {
  private sprites: any;
  private current: any;
  private previous: any;
  private width: any;
  private fps: any;
  private height: any;
  private currentFrame: any;

  public constructor() {
    this.width = 1316;
    this.height = 1384;
    this.currentFrame = 0;
    this.fps = 25;
    this.sprites = {
      grind: new Image(),
      idle: new Image(),
      jump: new Image(),
      run: new Image()
    };
  }

  public setSprites(sprites: any) {
    this.sprites.grind.src = sprites.grind.default;
    this.sprites.idle.src = sprites.idle.default;
    this.sprites.jump.src = sprites.jump.default;
    this.sprites.run.src = sprites.run.default;
    this.current = this.sprites.idle;
  }

  public idle() {
    this.currentFrame = 0;
    this.current = this.sprites.idle;
  }

  public run() {
    this.current = this.sprites.run;
  }

  public grind() {
    this.currentFrame = 0;
    this.current = this.sprites.grind;
  }

  public jump() {
    this.currentFrame = 0;
    this.previous = this.current;
    this.current = this.sprites.jump;

    setTimeout(() => {
      this.currentFrame = 0;
      this.current = this.previous;
    }, 1000 / this.fps * this.totalFrame());
  }

  public animate (context: any) {
    context.drawImage(
      this.current,
      0,
      this.height * this.currentFrame,
      this.width,
      this.height,
      200,
      595,
      this.width / 4,
      this.height / 4
    );

    if (this.currentFrame == this.totalFrame()) {
      this.currentFrame = 0;
    } else {
      this.currentFrame++;
    }
  }

  private totalFrame() {
    return this.current.height / this.height - 1
  }
}

export default Hero
