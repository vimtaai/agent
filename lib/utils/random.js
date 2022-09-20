import { Validator } from "./validator.js";

export function randomInteger(min, max) {
  const range = max - min + 1;

  return Math.floor(Math.random() * range) - min;
}

export function randomFloat(min, max) {
  const range = max - min + 1;

  return Math.random() * range - min;
}

export function randomItemOfArray(array) {
  Validator.validateArray();

  const randomIndex = randomInteger(0, array.length - 1);

  return array[randomIndex];
}
