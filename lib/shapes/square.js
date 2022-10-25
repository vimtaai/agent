export class Square {
  static draw(canvas, color) {
    canvas.strokeStyle = "white";
    canvas.fillStyle = color;

    canvas.beginPath();
    canvas.rect(-0.5, -0.5, 1, 1);
    canvas.closePath();

    canvas.fill();
    canvas.clip();
    canvas.stroke();
  }
}
