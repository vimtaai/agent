export class CanvasLayer {
  name = "";
  level = 0;
  element = null;
  context = null;

  constructor(properties = { name: "", level: 0 }) {
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d", { willReadFrequently: true });
    this.name = properties.name;
    this.level = properties.level;
    this.element.dataset.name = this.name;
  }

  resize(width, height) {
    const image = this.context.getImageData(0, 0, this.width, this.height);
    this.element.width = width;
    this.element.height = height;
    this.context.putImageData(image, 0, 0);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  get width() {
    return this.element.width;
  }

  get height() {
    return this.element.height;
  }
}
