import { insertIntoDocument } from "../helpers/insert.js";

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
    insertIntoDocument(canvasElement, parentElement);

    return canvasElement;
  }
}
