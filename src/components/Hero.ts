class Hero {
  private sprites: any;
  private startPosition: any;
  private currentAction: any;
  private current: any;
  private previous: any;
  private width: any;
  private fps: any;
  private height: any;
  private currentFrame: any;

  public constructor() {
    this.width = 329;
    this.height = 346;
    this.currentAction = 'run';
    this.startPosition = 200;
    this.currentFrame = 0;
    this.fps = 30;
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
    this.current = this.sprites.run;
  }

  public position() {
    return {
      start: this.startPosition,
      end: this.startPosition + 150
    }
  }

  public action() {
    return this.currentAction
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
    if (this.currentAction !== 'jump') {
      this.currentFrame = 0;
      this.currentAction = 'jump';
      this.previous = this.current;
      this.current = this.sprites.jump;

      setTimeout(() => {
        this.currentFrame = 0;
        this.current = this.previous;
        this.currentAction = 'run';
      }, 1000 / this.fps * this.totalFrame());
    }
  }

  public animate(context: any) {
    context.clearRect(
      this.startPosition,
      window.innerHeight - 375,
      this.width,
      this.height,
    );
    context.drawImage(
      this.current,
      0,
      this.height * this.currentFrame,
      this.width,
      this.height,
      this.startPosition,
      window.innerHeight - 375,
      this.width,
      this.height
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
