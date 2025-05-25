import { Validator } from "../utils/validator.js";

export class Timer {
  static #defaultInterval = 100;

  #id;
  #tickFunction;
  #tickInterval;
  #tickCount;
  #nextTickCallback;

  #onVisibilityChange = this.#toggleByVisibility.bind(this);

  constructor(tickFunction, tickInterval = Timer.#defaultInterval) {
    this.tickFunction = tickFunction;
    this.tickInterval = tickInterval;

    this.#id = undefined;
    this.#tickCount = 0;
  }

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

  tick() {
    this.#tickFunction(this.#tickInterval);
    this.#tickCount += 1;
  }

  resetTicks() {
    this.#tickCount = 0;
  }

  start() {
    this.#start();
    window.addEventListener("visibilitychange", this.#onVisibilityChange);
  }

  stop() {
    this.#stop();
    window.removeEventListener("visibilitychange", this.#onVisibilityChange);
  }

  toggle() {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  #start() {
    if (this.isRunning) {
      return;
    }

    window.addEventListener("visibilitychange", this.#onVisibilityChange);
    this.#requestNextTick();
  }

  #stop() {
    if (!this.isRunning) {
      return;
    }

    clearInterval(this.#id);
    this.#id = undefined;
  }

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

  #toggleByVisibility() {
    console.log("visibility changed", document.visibilityState);
    if (document.visibilityState === "visible") {
      this.#start();
    } else {
      this.#stop();
    }
  }
}
