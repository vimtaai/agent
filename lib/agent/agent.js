import { Validator } from "../utils/validator.js";
import { Arrow } from "../shapes/arrow.js";

export class Agent {
  static #defaultColor = "white";
  static #defaultPenColor = "white";
  static #defaultShape = Arrow;

  #x = 0;
  #y = 0;
  #heading = 0;
  #size = 1;
  #color = Agent.#defaultColor;
  #penColor = Agent.#defaultPenColor;
  #shape = Agent.#defaultShape;
  label = "";

  #model = null;

  constructor(initialProperties) {
    Object.assign(this, initialProperties);
    this.#updateModel();
  }

  // Public properties
  get x() {
    return this.#x;
  }

  set x(value) {
    Validator.validateNumber(value);

    this.#x = value;
    this.#updateModel();
  }

  get fieldX() {
    return Math.round(this.x);
  }

  get y() {
    return this.#y;
  }

  set y(value) {
    Validator.validateNumber(value);

    this.#y = value;
    this.#updateModel();
  }

  get fieldY() {
    return Math.round(this.y);
  }

  get heading() {
    return this.#heading;
  }

  set heading(value) {
    Validator.validateNumber(value);

    this.#heading = value;
    this.#updateModel();
  }

  get size() {
    return this.#size;
  }

  set size(value) {
    Validator.validatePositiveNumber(value);

    this.#size = value;
    this.#updateModel();
  }

  get color() {
    return this.#color;
  }

  set color(value) {
    Validator.validateColor(value);

    this.#color = value;
    this.#updateModel();
  }

  get penColor() {
    return this.#penColor;
  }

  set penColor(value) {
    Validator.validateColor(value);

    this.#penColor = value;
    this.#updateModel();
  }

  get shape() {
    return this.#shape;
  }

  set shape(value) {
    Validator.validateShape(value);

    this.#shape = value;
    this.#updateModel();
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    Validator.validateModel(value);

    this.#model = value;
    this.#updateModel();
  }

  // Public methods
  forward(amount) {
    Validator.validateNumber(amount);

    this.x += Math.cos(this.#headingInRad) * amount;
    this.y += Math.sin(this.#headingInRad) * amount;
  }

  back(amount) {
    Validator.validateNumber(amount);

    this.x -= Math.cos(this.#headingInRad) * amount;
    this.y -= Math.sin(this.#headingInRad) * amount;
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

  // Private properties
  get #headingInRad() {
    return (this.#heading / 180) * Math.PI;
  }

  // Private methods
  #updateModel() {
    if (!this.#model) {
      return;
    }

    this.#model.update();
  }
}
