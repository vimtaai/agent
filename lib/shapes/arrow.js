export class Arrow {
  static get path() {
    const path = new Path2D();

    path.moveTo(0, 0.5);
    path.lineTo(-0.35, -0.35);
    path.lineTo(0, -0.2);
    path.lineTo(0.35, -0.35);
    path.lineTo(0, 0.5);

    return path;
  }
}
