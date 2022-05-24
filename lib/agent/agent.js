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

  constructor(initialProperties) {
    Object.assign(this, initialProperties);
  }

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

  face(agent) {}

  get #headingInRad() {
    return (this.heading / 180) * Math.PI;
  }
}
