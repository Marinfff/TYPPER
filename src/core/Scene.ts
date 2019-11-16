class Scene {
  private scene: any;
  private objects: Array<any>;

  public constructor() {
    this.scene = document.getElementById('scene');
    this.objects = [];
  }

  public add(instance: any) {
    const canvas = document.createElement('canvas',);
    const context = canvas.getContext('2d');

    canvas.setAttribute('width', window.innerWidth.toString());
    canvas.setAttribute('height', window.innerHeight.toString());

    this.scene.append(canvas);

    this.objects.push({
      context,
      instance
    });
  }

  public render() {
    this.objects.forEach((item) => {
      item.instance.animate(item.context);
    })
  }
}

export default Scene
