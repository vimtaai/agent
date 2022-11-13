import { Entity } from "../entity/entity.js";
import { Arrow } from "../shapes/arrow.js";

import { Validator } from "../utils/validator.js";

export class Agent extends Entity {
  //#region static fields
  static #defaultColor = "white";
  static #defaultPenColor = "white";
  static #defaultShape = Arrow;
  //#endregion

  //#region private fields
  #heading = 0;
  #size = 1;
  #penColor = Agent.#defaultPenColor;
  #shape = Agent.#defaultShape;
  #label = "";
  //#endregion

  constructor({ x = 0, y = 0 } = {}) {
    Validator.validateNumber(x);
    Validator.validateNumber(y);

    super({ x, y, color: Agent.#defaultColor });
  }

  //#region public properties
  get heading() {
    return this.#heading;
  }

  set heading(value) {
    Validator.validateNumber(value);

    this.#heading = value;
    this.model?.update();
  }

  get size() {
    return this.#size;
  }

  set size(value) {
    Validator.validatePositiveNumber(value);

    this.#size = value;
    this.model?.update();
  }

  get penColor() {
    return this.#penColor;
  }

  set penColor(value) {
    Validator.validateColor(value);

    this.#penColor = value;
    this.model?.update();
  }

  get shape() {
    return this.#shape;
  }

  set shape(value) {
    Validator.validateShape(value);

    this.#shape = value;
    this.model?.update();
  }

  get label() {
    return this.#label;
  }

  set label(value) {
    this.#label = value;
    this.model?.update();
  }
  //#endregion

  //#region public methods
  forward(amount) {
    Validator.validateNumber(amount);

    this.x += Math.cos(this.#headingInRadians) * amount;
    this.y += Math.sin(this.#headingInRadians) * amount;
  }

  back(amount) {
    Validator.validateNumber(amount);

    this.x -= Math.cos(this.#headingInRadians) * amount;
    this.y -= Math.sin(this.#headingInRadians) * amount;
  }

  left(amount) {
    Validator.validateNumber(amount);

    this.heading = (this.heading - amount) % 360;
  }

  right(amount) {
    Validator.validateNumber(amount);

    this.heading = (this.heading - amount) % 360;
  }

  face(target) {
    Validator.validateFieldOrAgent(amount);

    const xDistance = target.x - this.x;
    const yDistance = target.y - this.y;

    this.heading = Math.atan(xDistance / yDistance);
  }
  //#endregion

  //#region private properties
  get #headingInRadians() {
    return (this.#heading / 180) * Math.PI;
  }
  //#endregion
}
