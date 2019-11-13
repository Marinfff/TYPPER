class Ground {
  private ground: any;
  private camera: any;

  public constructor() {
    this.camera = 0;
    this.ground = new Image();
  }

  public setGround(ground: any) {
    this.ground.src = ground.default;
  }

  public animate(context: any) {
    for (let i = 0; i < 2800; i += 70) {
      context.drawImage(
        this.ground,
        i + this.camera,
        window.innerHeight - 105
      );
    }

    this.camera -= 20;

    if (this.camera < -window.innerWidth) {
      this.camera = 0;
      context.clearRect(
        -window.innerWidth - 100,
        window.innerHeight - 105,
        this.ground.width,
        this.ground.height
      );
    }
  }
}

export default Ground

