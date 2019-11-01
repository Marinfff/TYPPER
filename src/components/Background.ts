class Background {
  private background: any;

  public constructor() {
    this.background = new Image();
  }

  public setBackground(background: any) {
    this.background.src = background.default;
  }

  public animate(context: any) {
    context.drawImage(
      this.background,
      0,
      0
    );
    context.drawImage(
      this.background,
      0,
      0
    );
    context.drawImage(
      this.background,
      1024,
      0
    );
  }
}

export default Background

