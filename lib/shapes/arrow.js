export class Arrow {
  static draw(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = color;

    canvas.beginPath();
    canvas.moveTo(0, -0.5);
    canvas.lineTo(0.4, 0.5);
    canvas.lineTo(0, 0.25);
    canvas.lineTo(-0.4, 0.5);
    canvas.lineTo(0, -0.5);
    canvas.closePath();

    canvas.fill();
    canvas.clip();
    canvas.stroke();
  }
}
