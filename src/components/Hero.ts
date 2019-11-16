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
      jump: new Image(),
      run: new Image()
    };
  }

  public setSprites(sprites: any) {
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

  public run() {
    this.current = this.sprites.run;
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
      window.innerHeight - 450,
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
      window.innerHeight - 450,
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
