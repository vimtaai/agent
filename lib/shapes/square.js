export class Square {
  static get path() {
    const path = new Path2D();
    path.rect(-0.35, -0.35, 0.7, 0.7);
    return path;
  }
}
