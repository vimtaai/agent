export class Square {
  static draw(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = color;

    canvas.beginPath();
    canvas.rect(-0.35, -0.35, 0.7, 0.7);
    canvas.closePath();

    canvas.fill();
    canvas.clip();
    canvas.stroke();
  }
}
