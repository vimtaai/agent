export class Circle {
  static get path() {
    const path = new Path2D();
    path.arc(0, 0, 0.5, 0, Math.PI * 2);
    return path;
  }
}
