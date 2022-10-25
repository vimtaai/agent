export class Random {
  static getBoolean() {
    return Math.random() < 0.5;
  }

  static getInteger(min, max) {
    const range = max - min + 1;

    return Math.floor(Math.random() * range) - min;
  }

  static getFloat(min, max) {
    const range = max - min + 1;

    return Math.random() * range - min;
  }
}
