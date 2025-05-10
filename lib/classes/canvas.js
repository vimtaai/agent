import { AgentCanvasElement } from "../elements/canvas-element.js";
import { insertIntoDocument } from "../helpers/insert.js";

export class Canvas {
  constructor(properties = {}) {
    const parentElement = properties.parentElement || document.body;
    const canvasElement = new AgentCanvasElement();

    canvasElement.width = properties.width || 300;
    canvasElement.height = properties.height || 150;
    canvasElement.autoResize = properties.autoResize || false;

    insertIntoDocument(canvasElement, parentElement);

    return canvasElement;
  }
}
