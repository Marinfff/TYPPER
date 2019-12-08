import "./src/style/style.css"

import {UserInterface} from "./src/components/UI";

const userInterface = new UserInterface()

class Game {
  private backSound: any;
  private loseSound: any;
  private score: any;
  private fps: any;
  private canvas: any;
  private context: any;
  private userInterface: any;
  private letters: Array<any>;
  private target: any;

  constructor(userInterface: any) {
    this.target = new Image();
    this.letters = [];
    this.fps = 10;
    this.score = 0;
    this.userInterface = userInterface;
    this.backSound = new Audio();
    this.loseSound = new Audio();
    this.canvas = document.getElementById('canvas');
    this.canvas.setAttribute('width', window.innerWidth);
    this.canvas.setAttribute('height', window.innerHeight);
    this.context = this.canvas.getContext('2d');
  }

  async init() {
    this.target.src = (await import('./src/assets/images/target.png')).default
    await this.loadSound();
    await this.userInterface.confirmGameStart();
    this.userInterface.toggleLoader();
    this.addListeners();
    this.setLetters();
    this.render();
    this.userInterface.toggleLoader();
  }

  upLevel () {
      this.fps += 5;
      this.setLetters();
  }


  setLetters() {
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    console.log(letter)
    this.letters = letter.map((item) => {
      const coords = [this.getRandom(0, -500), this.getRandom(2000, 2500)];
      return {
        text: item,
        x: coords[this.getRandom(0, 1)],
        y: this.getRandom(-500, 1500)
      }
    })
  }

  private async gameEnd() {
    this.userInterface.showGameOver(this.score);
    await this.loseSound.play();

    try {
      await this.userInterface.confirmGameOver();
      this.setLetters();
      this.score = 0
      this.render();
      this.userInterface.hideEndModal();
    } catch {
      window.location.reload();
    }
  }

  private isGameEnd(x: any, y: any) {
    return (
      (window.innerWidth / 2 - 64 < x && window.innerWidth / 2 + 64 > x)
      && (window.innerHeight / 2 - 64 < y && window.innerHeight / 2 + 64 > y)
    )
  }

  getRandom(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private async loadSound() {
    this.backSound.src = (await import('./src/assets/sound/back.mp3')).default;
    this.loseSound.src = (await import('./src/assets/sound/win.mp3')).default;
  //  await this.backSound.play()
  }

  render() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.context.drawImage(this.target, window.innerWidth / 2 - 64, window.innerHeight / 2 - 64);

    if (!this.letters.length) {
      this.upLevel()
    }

    for (const item of this.letters) {
      this.context.font = "35px Comic Sans MS";
      this.context.fillStyle = "white";
      this.context.textAlign = "center";
      this.context.fillText(item.text, item.x, item.y);

      if (this.isGameEnd(item.x, item.y)) {
        this.gameEnd();
        return;
      }

      if (window.innerWidth / 2 < item.x) {
        item.x -= 10
      } else {
        item.x += 10
      }

      if (window.innerHeight / 2 < item.y) {
        item.y -= 5
      } else {
        item.y += 5
      }
    }

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.render();
      });
    }, 1000 / this.fps);
  }

  addListeners() {
    document.addEventListener('keypress', (e) => {
      const letterIndex = this.letters.findIndex((item) => item.text.includes(e.key))
      if (letterIndex !== -1) {
        this.letters.splice(letterIndex, 1)
        this.score += 1
      }
    })
  }
}

const game = new Game(userInterface);

game.init();

