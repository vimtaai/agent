export class Canvas {
  //#region static fields
  static #canvasProperties = ["width", "height", "style"];
  //#endregion

  //#region private fields
  #parentElement;
  #canvasElement;
  #drawingContext;
  #isAutoSized;
  //#endregion

  constructor(width, height, parentElement = document.body) {
    this.#parentElement = parentElement;
    this.#canvasElement = document.createElement("canvas");
    this.#drawingContext = this.#canvasElement.getContext("2d");

    this.resize(width, height);

    this.#insertIntoDocument();
    this.#listenToWindowResize();

    return new Proxy(this, this.#canvasProxyHandler);
  }

  //#region public properties
  get isAutoSized() {
    return this.#isAutoSized;
  }
  //#endregion

  //#region public methods
  resize(width, height) {
    this.#isAutoSized = width === undefined || height === undefined;

    if (this.#isAutoSized) {
      this.#autoSize();
      return;
    }

    this.#canvasElement.width = width;
    this.#canvasElement.height = height;
  }

  clear() {
    const width = this.#canvasElement.width;
    const height = this.#canvasElement.height;

    this.#drawingContext.clearRect(0, 0, width, height);
  }
  //#endregion

  //#region private properties
  get #canvasProxyHandler() {
    return {
      get: this.#proxyGetFunction.bind(this),
      set: this.#proxySetFunction.bind(this),
    };
  }
  //#endregion

  //#region private methods
  #autoSize() {
    this.#canvasElement.width = window.innerWidth;
    this.#canvasElement.height = window.innerHeight;
  }

  #insertIntoDocument() {
    const scriptElement = this.#parentElement.querySelector("script");
    const hasScriptElement = scriptElement !== null;
    const position = hasScriptElement ? "beforebegin" : "beforeend";

    const referenceElement = hasScriptElement
      ? scriptElement
      : this.#parentElement;

    referenceElement.insertAdjacentElement(position, this.#canvasElement);
  }

  #listenToWindowResize() {
    window.addEventListener("resize", this.#onWindowResize.bind(this));
  }

  #onWindowResize() {
    if (!this.#isAutoSized) {
      return;
    }

    this.#canvasElement.width = window.innerWidth;
    this.#canvasElement.height = window.innerHeight;
  }

  #proxyGetFunction(target, property) {
    if (property in target) {
      return this.#wrapProxiedProperty(target, property);
    }

    if (Canvas.#canvasProperties.includes(property)) {
      return this.#wrapProxiedProperty(target.#canvasElement, property);
    }

    return this.#wrapProxiedProperty(target.#drawingContext, property);
  }

  #proxySetFunction(target, property, value) {
    if (property in target) {
      return (target[property] = value);
    }

    if (Canvas.#canvasProperties.includes(property)) {
      return (target.#canvasElement[property] = value);
    }

    return (target.#drawingContext[property] = value);
  }

  #wrapProxiedProperty(target, property) {
    if (typeof target[property] !== "function") {
      return target[property];
    }

    return (...args) => target[property].call(target, ...args);
  }
  //#endregion
}
