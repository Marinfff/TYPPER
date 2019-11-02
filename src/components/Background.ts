class Background {
  private background: any;
  private camera: any;

  public constructor() {
    this.background = new Image();
    this.camera = 0;
  }

  public setBackground(background: any) {
    this.background.src = background.default;
  }

  public animate(context: any) {
    context.clearRect(0, 0, this.background.width, this.background.height);
    context.drawImage(
      this.background,
      -1024 + this.camera,
      0
    );
    context.drawImage(
      this.background,
      this.camera,
      0
    );
    context.drawImage(
      this.background,
      this.camera + 1024,
      0
    );

    this.camera -= 15;

    if (this.camera < 0) {
      this.camera = 1024
    }
  }
}

export default Background

