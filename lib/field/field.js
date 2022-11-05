import { Validator } from "../utils/validator.js";

export class Field {
  //#region static fields
  static #defaultColor = "black";
  //#endregion

  //#region private fields
  #model = null;
  #x = 0;
  #y = 0;
  #color = Field.#defaultColor;
  //#endregion

  constructor(initialProperties) {
    const { x, y } = initialProperties;

    this.#x = x;
    this.#y = y;
    this.#updateModel();
  }

  //#region public properties
  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get color() {
    return this.#color;
  }

  set color(value) {
    Validator.validateColor(value);

    this.#color = value;
    this.#updateModel();
  }

  get neighbors() {
    return this.neighborsInRadius(1);
  }

  get neighborsInRadius() {
    return function (radius) {
      Validator.validatePositiveNumber(radius);

      const distances = Array(2 * radius + 1)
        .fill()
        .map((_, index) => index - radius);

      const relativeCoordinatesInRadius = distances.flatMap((dx) =>
        distances.map((dy) => ({ dx, dy }))
      );

      const fieldInDistance = relativeCoordinatesInRadius.map(({ dx, dy }) =>
        this.model.fieldAt(this.x + dx, this.y + dy)
      );

      return fieldInDistance.filter(
        (neighbor) => Boolean(neighbor) && neighbor !== this
      );
    };
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    Validator.validateModel(value);

    this.#model = value;
    this.#updateModel();
  }
  //#endregion

  //#region private methods
  #updateModel() {
    if (!this.#model) {
      return;
    }

    this.#model.update();
  }
  //#endregion
}
