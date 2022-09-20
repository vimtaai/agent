import { Validator } from "../utils/validator.js";

export class Agent {
  static #defaultColor = "white";
  static #defaultPenColor = "white";
  static #defaultShape = "circle";

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
  }

  // Public properties
  get x() {
    return this.#x;
  }

  set x(value) {
    Validator.validateNumber(value);

    this.#x = value;
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
  }

  get size() {
    return this.#size;
  }

  set size(value) {
    Validator.validatePositiveNumber(value);

    this.#size = value;
  }

  get color() {
    return this.#color;
  }

  set color(value) {
    Validator.validateColor(value);

    this.#color = value;
  }

  get penColor() {
    return this.#penColor;
  }

  set penColor(value) {
    Validator.validateColor(value);

    this.#penColor = value;
  }

  get shape() {
    return this.#shape;
  }

  set shape(value) {
    Validator.validateShape(value);

    this.#shape = value;
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    Validator.validateModel(value);

    this.#model = value;
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
    return (this.heading / 180) * Math.PI;
  }
}
