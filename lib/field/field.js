import { Validator } from "../utils/validator.js";

export class Field {
  static #defaultColor = "black";

  x = 0;
  y = 0;
  color = Field.#defaultColor;

  #model = null;

  constructor(initialProperties) {
    Object.assign(this, initialProperties);
  }

  // Public properties
  get model() {
    return this.#model;
  }

  set model(value) {
    Validator.validateModel(value);

    this.#model = value;
  }
}
