class Brick {
  private brick: any;

  public constructor() {
    this.brick = new Image();
  }

  public setBrick(brick: any) {
    this.brick.src = brick.default;
  }

  public animate(context: any) {
    for (let i = 0; i < 13300 ; i+= 70) {
      context.drawImage(
        this.brick,
        i,
        865
      );
    }
  }
}

export default Brick

