export class ModelElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.#createModelStylesheet();
    this.#createCanvasSlot();
  }

  #createModelStylesheet() {
    const styleElement = document.createElement("style");

    styleElement.textContent = `
      :host {
        box-sizing: border-box;
        display: grid;
        grid-template: "canvas";
      }

      ::slotted(canvas) {
        grid-area: canvas;
      }
    `;

    this.shadowRoot.append(styleElement);
  }

  #createCanvasSlot() {
    const slotElement = document.createElement("slot");

    this.shadowRoot.append(slotElement);
  }
}

if (customElements.get("agent-model") === undefined) {
  customElements.define("agent-model", ModelElement);
}
