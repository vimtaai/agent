export class Random {
  static getBoolean(probability = 0.5) {
    return Math.random() < probability;
  }

  static getInteger(min, max) {
    const range = max - min + 1;

    return Math.floor(Math.random() * range) + min;
  }

  static getFloat(min, max) {
    const range = max - min;
    const randomValue = Math.random();

    return Math.random() < 0.5
      ? randomValue * range + min
      : (1 - randomValue) * range + min;
  }
}
