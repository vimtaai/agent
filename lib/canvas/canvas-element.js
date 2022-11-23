export class AgentCanvas extends HTMLCanvasElement {
  //#region private fields
  #drawingContext = null;
  #isAutoSized = true;

  #onWindowResize = this.#adjustSizeToParentElement.bind(this);
  //#endregion

  constructor() {
    super();

    this.#drawingContext = this.getContext("2d");
    this.#proxyDrawingContext();
  }

  connectedCallback() {
    this.#subscribeToWindowResize();
  }

  disconnectedCallback() {
    this.#unsubscribeFromWindowResize();
  }

  //#region public properties
  get isAutoSized() {
    return this.#isAutoSized;
  }

  set isAutoSized(value) {
    this.#isAutoSized = Boolean(value);
    this.#adjustSizeToParentElement();
  }
  //#endregion

  //#region public methods
  resize(width, height) {
    this.#isAutoSized = false;

    this.width = width;
    this.height = height;
  }

  clear() {
    const width = this.width;
    const height = this.height;

    this.#drawingContext.clearRect(0, 0, width, height);
  }
  //#endregion

  //#region private methods
  #proxyDrawingContext() {
    for (const key in this.#drawingContext) {
      console.log(key);
      const property = this.#drawingContext[key];

      if (typeof property === "function") {
        this.#proxyDrawingContextMethod(key);
      } else {
        this.#proxyDrawingContextProperty(key);
      }
    }
  }

  #proxyDrawingContextProperty(propertyName) {
    Reflect.defineProperty(this, propertyName, {
      get() {
        return this.#drawingContext[propertyName];
      },
      set(value) {
        this.#drawingContext[propertyName] = value;
      },
    });
  }

  #proxyDrawingContextMethod(methodName) {
    Reflect.defineProperty(this, methodName, {
      value: this.#drawingContext[methodName].bind(this.#drawingContext),
    });
  }

  #adjustSizeToParentElement() {
    if (!this.#isAutoSized) {
      return;
    }

    const { width, height } = this.parentElement.getBoundingClientRect();

    this.width = width;
    this.height = height;
  }

  #subscribeToWindowResize() {
    window.addEventListener("resize", this.#onWindowResize);
  }

  #unsubscribeFromWindowResize() {
    window.removeEventListener("resize", this.#onWindowResize);
  }
  //#endregion
}

if (customElements.get("agent-canvas") === undefined) {
  customElements.define("agent-canvas", AgentCanvas, { extends: "canvas" });
}
