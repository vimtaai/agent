import { createProxy } from "../helpers/proxy.js";

export class Layer extends OffscreenCanvas {
  #drawingContext = null;
  #renderingContext = null;
  #isAutoRender = false;

  constructor(canvas, options = {}) {
    super(canvas.width, canvas.height);

    this.#drawingContext = this.getContext("2d");
    this.#renderingContext = canvas.getContext("2d");

    this.autoRender = options.autoRender;

    createProxy(this, this.#drawingContext);

    this.render();
  }

  get autoRender() {
    return this.#isAutoRender;
  }

  set autoRender(value) {
    this.#isAutoRender = Boolean(value);

    if (this.#isAutoRender) {
      this.render();
    }
  }

  resize(width, height) {
    super.width = width;
    super.height = height;
  }

  clear() {
    this.#drawingContext.clearRect(0, 0, this.width, this.height);
  }

  render() {
    this.#renderingContext.drawImage(this, 0, 0);

    if (this.#isAutoRender) {
      requestAnimationFrame(() => this.render());
    }
  }
}
