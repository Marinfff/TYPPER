import Hero from './components/Hero'

class App {
  private context: any;
  private document: any;
  private hero: Hero;

  public constructor(document: any, hero: Hero) {
    this.document = document;
    this.hero = hero;
    this.context = document.getElementById('canvas').getContext('2d');
    this.animateHero();
  }

  private async animateHero() {
    await this.hero.loadSprites();
    this.hero.animate(this.context);
    this.addListeners();
  }

  private addListeners() {
    this.document.addEventListener('keyup', (e: any) => {
      if (e.code == "Space") {
        this.hero.execute('jumpAttack');
        return;
      }
      if (e.code == "KeyW") {
        this.hero.execute('jump');
        return;
      }
      if (e.code == "KeyS") {
        this.hero.execute('slide');
        return;
      }
      if (e.code == "Escape") {
        this.hero.execute('dead');
        return;
      }
    })
  }
}

new App(document, new Hero(24));
