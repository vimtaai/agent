export class Circle {
  static draw(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = color;

    canvas.beginPath();
    canvas.arc(0, 0, 0.5, 0, Math.PI * 2);
    canvas.closePath();

    canvas.fill();
    canvas.clip();
    canvas.stroke();
  }
}
