import { Validator } from "../utils/validator.js";

export class Agent {
  static #defaultColor = "white";
  static #defaultPenColor = "white";
  static #defaultShape = "circle";

  x = 0;
  y = 0;
  heading = 0;
  size = 1;
  color = Agent.#defaultColor;
  penColor = Agent.#defaultPenColor;
  shape = Agent.#defaultShape;
  label = "";

  #model = null;

  constructor(initialProperties) {
    Object.assign(this, initialProperties);
  }

  // Public properties
  get fieldX() {
    return Math.round(this.x);
  }

  get fieldY() {
    return Math.round(this.y);
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
    this.x += Math.cos(this.#headingInRad) * amount;
    this.y += Math.sin(this.#headingInRad) * amount;
  }

  left(amount) {
    this.heading = (this.heading - amount) % 360;
  }

  right(amount) {
    this.heading = (this.heading - amount) % 360;
  }

  face(target) {
    const xDistance = target.x - this.x;
    const yDistance = target.y - this.y;

    this.heading = Math.atan(xDistance / yDistance);
  }

  // Private properties
  get #headingInRad() {
    return (this.heading / 180) * Math.PI;
  }
}
