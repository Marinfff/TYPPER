class Ground {
  private ground: any;
  private camera: any;

  public constructor() {
    this.camera = 0;
    this.ground = {
      left: new Image(),
      right: new Image(),
      mid: new Image(),
    };
  }

  public setGround(brick: any) {
    this.ground.left.src = brick.left.default;
    this.ground.right.src = brick.right.default;
    this.ground.mid.src = brick.mid.default;
  }

  public print(context: any, action: string, position: number) {
    context.drawImage(
      this.ground[action],
      position,
      window.innerHeight - 105
    );
  }

  public animate(context: any) {
    for (let i = 0; i < 4200; i += 70) {
      this.print(context, 'mid', i + this.camera)
    }

    this.camera -= 15;

    if (this.camera < -2100) {
      this.camera = 0
    }
  }
}

export default Ground

