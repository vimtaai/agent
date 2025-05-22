import { convertDegreesToRadians } from "../utils/geometry.js";

export class Turtle {
  static drawPath(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = color;

    // Body
    canvas.moveTo(0.3, 0);
    canvas.ellipse(0, 0, 0.3, 0.4, 0, 0, convertDegreesToRadians(360));
  }

  static drawBackground(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = "limegreen";

    // Head
    canvas.arc(0, 0.4, 0.15, 0, convertDegreesToRadians(360));
    // Front Legs
    const frontLegAngle = convertDegreesToRadians(185);
    this.#drawLegPath(canvas, 0.25, 0.1, -frontLegAngle);
    this.#drawLegPath(canvas, -0.25, 0.1, frontLegAngle);
    // Back Legs
    const backLegAngle = convertDegreesToRadians(225);
    this.#drawLegPath(canvas, 0.2, -0.25, -backLegAngle);
    this.#drawLegPath(canvas, -0.2, -0.25, backLegAngle);
  }

  static #drawLegPath(canvas, x, y, angle) {
    canvas.moveTo(x, y);
    canvas.ellipse(x, y, 0.2, 0.15, angle, convertDegreesToRadians(180), 0);
    canvas.lineTo(x, y);
  }
}
