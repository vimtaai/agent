export class Arrow {
  static drawPath(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = color;

    canvas.moveTo(0, 0.5);
    canvas.lineTo(-0.35, -0.35);
    canvas.lineTo(0, -0.2);
    canvas.lineTo(0.35, -0.35);
    canvas.lineTo(0, 0.5);
  }
}
