import { convertDegreesToRadians } from "../utils/geometry.js";

export class Turtle {
  static backgroundColor = "limegreen";

  static get path() {
    const path = new Path2D();

    // Body
    path.moveTo(0.3, 0);
    path.ellipse(0, 0, 0.3, 0.4, 0, 0, convertDegreesToRadians(360));

    return path;
  }

  static get background() {
    const path = new Path2D();

    // Head
    path.arc(0, 0.4, 0.15, 0, convertDegreesToRadians(360));
    // Front Legs
    const frontLegAngle = convertDegreesToRadians(185);
    this.#drawLegPath(path, 0.25, 0.1, -frontLegAngle);
    this.#drawLegPath(path, -0.25, 0.1, frontLegAngle);
    // Back Legs
    const backLegAngle = convertDegreesToRadians(225);
    this.#drawLegPath(path, 0.2, -0.25, -backLegAngle);
    this.#drawLegPath(path, -0.2, -0.25, backLegAngle);

    return path;
  }

  static #drawLegPath(path, x, y, angle) {
    path.moveTo(x, y);
    path.ellipse(x, y, 0.2, 0.15, angle, convertDegreesToRadians(180), 0);
    path.lineTo(x, y);
  }
}
