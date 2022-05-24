export class Field {
  static #defaultColor = "black";

  x = 0;
  y = 0;
  color = Field.#defaultColor;

  constructor(initialProperties) {
    Object.assign(this, initialProperties);
  }
}
