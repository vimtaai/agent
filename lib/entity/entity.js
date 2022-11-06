import { Validator } from "../utils/validator.js";

export class Entity {
  //#region static fields
  static #defaultColor = "transparent";
  //#endregion

  //#region private fields
  #model = null;
  #x = 0;
  #y = 0;
  #color = Entity.#defaultColor;
  //#endregion

  constructor({ x, y, color }) {
    if (this.constructor.name === "Entity") {
      throw new TypeError("Entity is not instantiable");
    }

    this.#x = x;
    this.#y = y;
    this.#color = color;

    this.model?.update();
  }

  //#region public properties
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
  //#endregion
}
