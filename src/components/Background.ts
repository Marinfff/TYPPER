export interface BackgroundInterface {
  setBackground(background: any): void,

  animate(context: any): void,

  upLevel(): void
}

export class Background implements BackgroundInterface {
  private camera: number;
  private cameraSpeed: number;
  private readonly background: HTMLImageElement;

  public constructor() {
    this.background = new Image();
    this.camera = 0;
    this.cameraSpeed = 30;
  }

  public setBackground(background: any) {
    this.background.src = background;
  }

  public upLevel() {
    this.cameraSpeed += 5
  }

  public animate(context: any) {
    context.drawImage(
      this.background,
      this.camera,
      0
    );
    context.drawImage(
      this.background,
      1024 + this.camera,
      0
    );
    context.drawImage(
      this.background,
      2048 + this.camera,
      0
    );

    this.camera -= this.cameraSpeed;

    if (this.camera < -1024) {
      this.camera = 0;
      context.clearRect(
        -1024,
        0,
        this.background.width,
        this.background.height
      );
    }
  }
}

