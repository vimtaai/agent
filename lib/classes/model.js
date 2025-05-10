import { AgentModelElement } from "../elements/model-element.js";
import { insertIntoDocument } from "../helpers/insert.js";

export class Model {
  constructor(properties = {}) {
    const parentElement = properties.parentElement || document.body;
    const modelElement = new AgentModelElement();

    insertIntoDocument(modelElement, parentElement);

    modelElement.width = properties.width || 100;
    modelElement.height = properties.height || 100;
    modelElement.scale = properties.scale || 5;

    return modelElement;
  }
}
