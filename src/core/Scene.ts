export interface SceneInterface {
  add(instance: any): void,

  render(): void
}

export class Scene implements SceneInterface {
  private scene: any;
  private sceneObjects: Array<any>;

  public constructor() {
    this.scene = document.getElementById('scene');
    this.sceneObjects = [];
  }

  public add(instance: any) {
    const item = document.createElement('canvas');
    const context = item.getContext('2d');

    item.setAttribute('width', window.innerWidth.toString());
    item.setAttribute('height', window.innerHeight.toString());

    this.scene.append(item);

    this.sceneObjects.push({
      context,
      instance
    });
  }

  public render() {
    this.sceneObjects.forEach((item) => {
      item.instance.animate(item.context);
    })
  }
}
