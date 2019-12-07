// @ts-ignore
import mazeGenerator from 'amazejs';

export interface MazeInterface {
  render(): void,

  setSprite(sprite: any): Maze,

  generate(): Promise<any>,

  next(): Promise<any>
}

export class Maze implements MazeInterface {
  private sprite: HTMLImageElement;
  private maze: any;
  private canvas: any;
  private context: any;
  private width: number;
  private height: number;

  constructor() {
    this.sprite = new Image();
    this.width = 20;
    this.height = 20;
    this.canvas = document.getElementById('maze');
    this.context = this.canvas.getContext('2d');
    this.canvas.setAttribute('width', window.innerWidth);
    this.canvas.setAttribute('height', window.innerHeight)
  }

  async generate(): Promise<any> {
    this.maze = new mazeGenerator.Backtracker(this.width, this.height);
    await this.maze.generate();
    this.render();
  }

  async next(): Promise<any> {
    this.width += 3;
    this.height += 3;
    this.generate();
  }

  getCell (x: number, y: number) {
    return this.maze.get(x, y)
  }

  render(): void {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let row = 0;
    let column = 0;

    const width = this.width % 2 ? this.width : this.width - 1;
    const height = this.height % 2 ? this.height : this.height - 1;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (
          !this.maze.get(i, j)
          && !(i == 1 && j == 0)
          && !(i == width - 2 && j == height - 1)
        ) {
          this.context.drawImage(this.sprite, row, column)
        }
        row += 50;
      }
      column += 50;
      row = 0;
    }
  }

  setSprite(sprite: any): Maze {
    this.sprite.src = sprite.default;
    return this
  }
}
