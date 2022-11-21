export function getRandomBoolean(probability = 0.5) {
  return Math.random() < probability;
}

export function getRandomInteger(min, max) {
  const range = max - min + 1;

  return Math.floor(Math.random() * range) + min;
}

export function getRandomFloat(min, max) {
  const range = max - min;
  const randomValue = Math.random();

  return getRandomBoolean()
    ? randomValue * range + min
    : (1 - randomValue) * range + min;
}

export function getRandomColor() {
  const red = getRandomInteger(0, 255);
  const green = getRandomInteger(0, 255);
  const blue = getRandomInteger(0, 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

export const Random = {
  getRandomBoolean,
  getRandomInteger,
  getRandomFloat,
  getRandomColor,
};
