export class Square {
  static drawPath(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = color;

    canvas.rect(-0.35, -0.35, 0.7, 0.7);
  }
}
