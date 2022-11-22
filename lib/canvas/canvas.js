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

  constructor(properties = {}) {
    this.#parentElement = properties.parentElement || document.body;
    this.#canvasElement = document.createElement("canvas");
    this.#drawingContext = this.#canvasElement.getContext("2d");

    const width = properties.width;
    const height = properties.height;

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
      this.#sizeToParentElement();
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
  #sizeToParentElement() {
    const { width, height } = this.#parentElement.getBoundingClientRect();

    this.#canvasElement.width = width;
    this.#canvasElement.height = height;
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

    this.#sizeToParentElement();
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
