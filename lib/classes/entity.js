import { Validator } from "../utils/validator.js";
/** @import { AgentModelElement } from "../elements/model-element.js" */

export class Entity extends EventTarget {
  static #defaultColor = "transparent";

  /** @type {?AgentModelElement} */
  #model = null;
  #x = 0;
  #y = 0;
  #color = Entity.#defaultColor;

  constructor() {
    super();

    if (this.constructor.name === "Entity") {
      throw new TypeError("Entity is not instantiable");
    }
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    Validator.validateNumber(value);
    this.#x = value;
    this.model?.update();
  }

  get fieldX() {
    return Math.floor(this.#x);
  }

  get y() {
    return this.#y;
  }

  set y(value) {
    Validator.validateNumber(value);
    this.#y = value;
    this.model?.update();
  }

  moveTo(x, y) {
    Validator.validateNumber(x);
    Validator.validateNumber(y);

    this.#x = x;
    this.#y = y;

    this.model?.update();
  }

  get fieldY() {
    return Math.floor(this.#y);
  }

  get color() {
    return this.#color;
  }

  set color(value) {
    Validator.validateColor(value);

    this.#color = value;
    this.model?.update();
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    Validator.validateModel(value);

    this.#model = value;
    this.model?.update();
  }
}
