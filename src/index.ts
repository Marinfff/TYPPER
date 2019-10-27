const canvas = document.getElementById('canvas')

class App {
  private context: any;
  private sprite: HTMLImageElement;
  private width: number;
  private height: number;
  private currentFrame: number;
  private frames: number;

  public constructor(canvas: any) {
    this.context = canvas.getContext('2d');
    this.sprite = new Image();
    this.width = 1316;
    this.height = 1384;
    this.currentFrame = 0;
    this.frames = 5;
    this.loadSprite();
  }

  private async loadSprite() {
    this.sprite.src = (await import('./assets/sprite.png')).default;

    setInterval(() => {
      this.draw()
    }, 80);
  }

  private draw() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.drawImage(
      this.sprite,
      this.currentFrame > 2
        ? this.width * (this.currentFrame - 3)
        : this.width * this.currentFrame,
      this.currentFrame > 2
        ? this.height
        : 0,
      this.width,
      this.height,
      0,
      0,
      this.width / 4,
      this.height / 4
    );

    if (this.currentFrame == this.frames) {
      this.currentFrame = 0;
    } else {
      this.currentFrame++;
    }
  }
}

new App(canvas);
