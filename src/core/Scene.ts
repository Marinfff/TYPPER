class Scene {
  private canvas: any;
  private context: any;

  public constructor () {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.setAttribute()
  }

  private setAttribute () {
    this.canvas.setAttribute('width', window.innerWidth);
    this.canvas.setAttribute('height', window.innerHeight);
  }

  public draw(object: any) {
    object.animate(this.context)
  }
}

export default Scene
