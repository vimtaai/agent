export const shapes = ["circle", "square"];

export function drawShapeOnCanvas(shape, canvas) {
  if (!shapes.includes(shape)) {
    return;
  }

  const shapeDrawers = {
    circle: drawCircleOnCanvas,
    square: drawSquareOnCanvas,
  };

  shapeDrawers[shape].call(null, canvas);
}

function drawCircleOnCanvas(canvas) {
  canvas.beginPath();
  canvas.arc(0, 0, 0.5, 0, Math.PI * 2);
  canvas.fill();
  canvas.closePath();
}

function drawSquareOnCanvas(canvas) {
  canvas.beginPath();
  canvas.rect(-0.5, -0.5, 1, 1);
  canvas.fill();
  canvas.closePath();
}
