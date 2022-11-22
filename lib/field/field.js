import { Entity } from "../entity/entity.js";

import { Validator } from "../utils/validator.js";

export class Field extends Entity {
  //#region static fields
  static #defaultColor = "black";
  //#endregion

  constructor(properties = {}) {
    super();

    super.x = properties.x;
    super.y = properties.y;
    super.color = properties.color || Field.#defaultColor;
  }

  //#region public properties
  get x() {
    return super.x;
  }

  set x(value) {
    return;
  }

  get y() {
    return super.y;
  }

  set y(value) {
    return;
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

      const fieldsInDistance = relativeCoordinatesInRadius.map(({ dx, dy }) =>
        this.model?.fieldAt(this.x + dx, this.y + dy)
      );

      return fieldsInDistance.filter(
        (neighbor) => Boolean(neighbor) && neighbor !== this
      );
    };
  }
  //#endregion
}
