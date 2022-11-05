import { Validator } from "../utils/validator.js";

export class Field {
  static #defaultColor = "black";

  #x = 0;
  #y = 0;
  #color = Field.#defaultColor;

  #model = null;

  constructor(initialProperties) {
    const { x, y } = initialProperties;

    this.#x = x;
    this.#y = y;
  }

  // Public properties
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
  }
}
