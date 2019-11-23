export interface BackgroundInterface {
  setBackground(background: any): void,

  animate(context: any): void
}

export class Background implements BackgroundInterface {
  private camera: number;
  private readonly background: HTMLImageElement;

  public constructor() {
    this.background = new Image();
    this.camera = 0;
  }

  public setBackground(background: any) {
    this.background.src = background;
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

    this.camera -= 24;

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

