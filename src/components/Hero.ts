export interface HeroInterface {
  loadEnvironment(data: any): void,

  jump(): void,

  animate(context: any): void,

  getAction(): string,

  getPosition(): {
    start: number,
    end: number
  },
}

export class Hero implements HeroInterface {
  private sprites: any;
  private currentFrame: number;
  private currentAction: string;
  private currentSprite: any;
  private previousSprite: any;
  private sound: any;
  private readonly startPosition: number;
  private readonly width: number;
  private readonly fps: number;
  private readonly height: number;


  public constructor() {
    this.width = 329;
    this.height = 346;
    this.fps = 30;
    this.startPosition = 200;
    this.currentFrame = 0;
    this.currentAction = 'run';
    this.sound = new Audio();
    this.sprites = {
      jump: new Image(),
      run: new Image()
    };
  }

  public loadEnvironment(data: any) {
    this.sprites.jump.src = data.sprites.jump;
    this.sprites.run.src = data.sprites.run;
    this.sound.src = data.audio;
    this.currentSprite = this.sprites.run;
  }

  public getPosition() {
    return {
      start: this.startPosition,
      end: this.startPosition + 150
    }
  }

  public getAction() {
    return this.currentAction
  }

  public jump() {
    if (this.currentAction !== 'jump') {
      this.currentFrame = 0;
      this.currentAction = 'jump';
      this.previousSprite = this.currentSprite;
      this.currentSprite = this.sprites.jump;
      this.sound.play();

      setTimeout(() => {
        this.currentFrame = 0;
        this.currentSprite = this.previousSprite;
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
      this.currentSprite,
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
    return this.currentSprite.height / this.height - 1
  }
}
