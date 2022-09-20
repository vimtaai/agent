import { Validator } from "../utils/validator.js";

export class Timer {
  static #defaultInterval = 100;

  #tickFunction;
  #tickInterval;
  #tickCount;

  #id;
  #nextTickCallback;

  constructor(tickFunction, tickInterval = Timer.#defaultInterval) {
    this.tickFunction = tickFunction;
    this.tickInterval = tickInterval;

    this.#id = undefined;
    this.#tickCount = 0;
  }

  // Public properties
  get tickFunction() {
    return this.#tickFunction;
  }

  set tickFunction(value) {
    Validator.validateFunction(value);

    this.#tickFunction = value.bind(null);
    this.#updateNextTickCallback();
  }

  get tickInterval() {
    return this.#tickInterval;
  }

  set tickInterval(value) {
    Validator.validatePositiveNumber(value);

    this.#tickInterval = Math.round(value);
  }

  get tickCount() {
    return this.#tickCount;
  }

  get isRunning() {
    return this.#id !== undefined;
  }

  // Public methods
  tick() {
    this.#tickFunction(this.#tickInterval);
    this.#tickCount += 1;
  }

  resetTicks() {
    this.#tickCount = 0;
  }

  start() {
    if (this.isRunning) {
      return;
    }

    this.#requestNextTick();
  }

  stop() {
    if (!this.isRunning) {
      return;
    }

    clearInterval(this.#id);
    this.#id = undefined;
  }

  // Private methods
  #updateNextTickCallback() {
    this.#nextTickCallback = () => {
      if (!this.isRunning) {
        return;
      }

      this.tick();
      this.#requestNextTick();
    };
  }

  #requestNextTick() {
    this.#id = setTimeout(this.#nextTickCallback, this.#tickInterval);
  }
}
