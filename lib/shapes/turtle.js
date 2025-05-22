import { convertDegreesToRadians } from "../utils/geometry.js";

export class Turtle {
  static draw(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = "limegreen";

    // Head
    canvas.beginPath();
    canvas.arc(0, -0.4, 0.15, 0, convertDegreesToRadians(360));
    canvas.fill();
    canvas.stroke();

    // Front Legs
    const frontLegAngle = convertDegreesToRadians(5);
    this.#drawLeg(canvas, -0.25, -0.1, -frontLegAngle);
    this.#drawLeg(canvas, 0.25, -0.1, frontLegAngle);
    // Back Legs
    const backLegAngle = convertDegreesToRadians(45);
    this.#drawLeg(canvas, -0.2, 0.25, -backLegAngle);
    this.#drawLeg(canvas, 0.2, 0.25, backLegAngle);

    canvas.fillStyle = color;

    // Body
    canvas.beginPath();
    canvas.ellipse(0, 0, 0.3, 0.4, 0, 0, convertDegreesToRadians(360));
    canvas.fill();
    canvas.stroke();
  }

  static #drawLeg(canvas, x, y, angle) {
    canvas.beginPath();
    canvas.ellipse(x, y, 0.2, 0.15, angle, convertDegreesToRadians(180), 0);
    canvas.closePath();
    canvas.fill();
    canvas.stroke();
  }
}
