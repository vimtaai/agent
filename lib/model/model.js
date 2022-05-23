import { Canvas } from "../canvas/canvas.js";
import { Validator } from "../utils/validator.js";

export class Model {
  static #defaultPatchColor = "black";

  #width;
  #height;
  #scale;
  #patches;
  #agents;

  #canvas;

  constructor(width = 50, height = 50, scale = 1) {
    this.#createCanvas();

    this.width = width;
    this.height = height;
    this.scale = scale;

    this.#createPatches();
    this.#createAgents();
  }

  // Public attributes
  get width() {
    return this.#width;
  }

  set width(value) {
    Validator.validatePositiveNumber(value);

    this.#width = value;
    this.#updateCanvas();
  }

  get height() {
    return this.#height;
  }

  set height(value) {
    Validator.validatePositiveNumber(value);

    this.#height = value;
    this.#updateCanvas();
  }

  get scale() {
    return this.#scale;
  }

  set scale(value) {
    Validator.validatePositiveNumber(value);

    this.#scale = value;
    this.#updateCanvas();
  }

  get patches() {
    return this.#patches;
  }

  get agents() {
    return this.#agents;
  }

  // Public methods
  randomX() {
    return Math.floor(Math.random() * this.width);
  }

  randomY() {
    return Math.floor(Math.random() * this.height);
  }

  randomHeading() {
    return Math.floor(Math.random() * 360);
  }

  patchAt(x, y) {
    Validator.validateNumber(x);
    Validator.validateNumber(y);

    return this.#patches[y * width + x];
  }

  randomPatch() {
    const index = Math.floor(Math.random() * this.width * this.height);

    return this.#patches[index];
  }

  agentsAt(x, y) {
    Validator.validateNumber(x);
    Validator.validateNumber(y);

    return this.#agents.filter((agent) => agent.patch === this.patchAt(x, y));
  }

  randomAgent() {
    const index = Math.floor(Math.random() * this.#agents.length);

    return this.#agents[index];
  }

  addAgent(agent) {
    Validator.validateAgent(agent);

    this.#agents.push(agent);
    agent.model = this;
  }

  removeAgent(agent) {
    Validator.validateAgent(agent);

    this.#agents.filter((agent) => agent !== agent);
  }

  update() {
    this.#canvas.clear();

    for (const patch of this.#patches) {
      this.#canvas.fillStyle = patch.color;
      this.#canvas.fillRect(
        patch.x * this.scale,
        patch.y * this.scale,
        this.scale,
        this.scale
      );
    }

    for (const agent of this.#agents) {
      this.#canvas.beginPath();
      this.#canvas.fillStyle = agent.color;
      this.#canvas.arc(
        agent.x * this.#scale + 5,
        agent.y * this.#scale + 5,
        10,
        0,
        Math.PI * 2
      );
      this.#canvas.fill();
      this.#canvas.closePath();
    }
  }

  // Private methods
  get #realWidth() {
    return this.width * this.#scale;
  }

  get #realHeight() {
    return this.height * this.#scale;
  }

  #createCanvas() {
    this.#canvas = new Canvas(this.#realWidth, this.#realHeight);
  }

  #updateCanvas() {
    this.#canvas.resize(this.#realWidth, this.#realHeight);
  }

  #createPatches() {
    this.#patches = [];

    for (let i = 0; i < this.#width * this.#height; i++) {
      const x = i % this.#width;
      const y = Math.floor(i / this.#width);

      const newPatch = {
        x,
        y,
        color: Model.#defaultPatchColor,
      };

      this.#patches.push(newPatch);
    }
  }

  #createAgents() {
    this.#agents = [];
  }
}
