class Stone {
  private stone: any;
  private camera: any;

  public constructor() {
    this.camera = 0;
    this.stone = new Image();
  }

  public setStone(stone: any) {
    this.stone.src = stone.default;
  }

  public getPosition () {
    return window.innerWidth + this.camera
  }

  public animate(context: any) {
    context.clearRect(
      window.innerWidth + 30  + this.camera,
      window.innerHeight - 140,
      this.stone.width,
      this.stone.height,
    );
    context.drawImage(
      this.stone,
      window.innerWidth + this.camera,
      window.innerHeight - 140
    );

    this.camera -= 30;

    if (this.camera < -window.innerWidth - 100) {
      this.camera = 0;
    }
  }
}

export default Stone

