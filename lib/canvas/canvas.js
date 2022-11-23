export class Canvas {
  constructor(properties = {}) {
    const parentElement = properties.parentElement || document.body;
    const canvasElement = document.createElement("canvas", {
      is: "agent-canvas",
    });

    if (properties.width && properties.height) {
      canvasElement.resize(properties.width, properties.height);
    }

    canvasElement.isAutoSized = properties.isAutoSized || false;
    this.#insertIntoDocument(canvasElement, parentElement);

    return canvasElement;
  }

  //#region private methods
  #insertIntoDocument(canvasElement, parentElement) {
    const scriptElement = parentElement.querySelector("script");
    const hasScriptElement = scriptElement !== null;
    const position = hasScriptElement ? "beforebegin" : "beforeend";

    const referenceElement = hasScriptElement ? scriptElement : parentElement;

    referenceElement.insertAdjacentElement(position, canvasElement);
  }
  //#endregion
}
