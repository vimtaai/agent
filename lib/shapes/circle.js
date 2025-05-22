export class Circle {
  static drawPath(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = color;

    canvas.arc(0, 0, 0.5, 0, Math.PI * 2);
  }
}
