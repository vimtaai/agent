export function randomInteger(min, max) {
  const range = max - min + 1;

  return Math.floor(Math.random() * range) - min;
}

export function randomFloat(min, max) {
  const range = max - min + 1;

  return Math.random() * range - min;
}
