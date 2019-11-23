export interface StoneInterface {
  setStone(stone: any): void,

  getPosition(): number,

  upLevel(): void

  animate(context: any): void
}

export class Stone implements StoneInterface {
  private camera: number;
  private cameraSpeed: number;
  private readonly stone: HTMLImageElement;

  public constructor() {
    this.camera = 0;
    this.cameraSpeed = 30;
    this.stone = new Image();
  }

  public setStone(stone: any) {
    this.stone.src = stone;
  }

  public getPosition() {
    return window.innerWidth + this.camera
  }

  public upLevel() {
    this.cameraSpeed += 5
  }

  public animate(context: any) {
    context.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
    );
    context.drawImage(
      this.stone,
      window.innerWidth + this.camera,
      window.innerHeight - 210
    );

    this.camera -= this.cameraSpeed;

    if (this.camera < -window.innerWidth - 100) {
      this.camera = 0;
    }
  }
}

