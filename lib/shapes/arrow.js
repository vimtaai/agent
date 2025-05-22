export class Arrow {
  static draw(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = color;

    canvas.beginPath();
    canvas.moveTo(0, 0.5);
    canvas.lineTo(-0.35, -0.35);
    canvas.lineTo(0, -0.2);
    canvas.lineTo(0.35, -0.35);
    canvas.lineTo(0, 0.5);
    canvas.closePath();

    canvas.fill();
    canvas.clip();
    canvas.stroke();
  }
}
