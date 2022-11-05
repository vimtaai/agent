import { Validator } from "../utils/validator.js";

export class Timer {
  //#region static fields
  static #defaultInterval = 100;
  //#endregion

  //#region private fields
  #id;
  #tickFunction;
  #tickInterval;
  #tickCount;
  #nextTickCallback;
  //#endregion

  constructor(tickFunction, tickInterval = Timer.#defaultInterval) {
    this.tickFunction = tickFunction;
    this.tickInterval = tickInterval;

    this.#id = undefined;
    this.#tickCount = 0;
  }

  //#region public properties
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
  //#endregion

  //#region public methods
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
  //#endregion

  //#region private methods
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
  //#endregion
}
