export function getBoolean(probability = 0.5) {
  return Math.random() < probability;
}

export function getInteger(min, max) {
  const range = max - min + 1;

  return Math.floor(Math.random() * range) + min;
}

export function getFloat(min, max) {
  const range = max - min;
  const randomValue = Math.random();

  return Math.random() < 0.5
    ? randomValue * range + min
    : (1 - randomValue) * range + min;
}

export function getColor() {
  const red = Random.getInteger(0, 255);
  const green = Random.getInteger(0, 255);
  const blue = Random.getInteger(0, 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

export const Random = {
  getBoolean,
  getInteger,
  getFloat,
  getColor
};
