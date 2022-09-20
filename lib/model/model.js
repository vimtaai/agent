import { Canvas } from "../canvas/canvas.js";
import { Field } from "../field/field.js";
import { Validator } from "../utils/validator.js";
import { randomFloat, randomInteger } from "../utils/random.js";

export class Model {
  #width;
  #height;
  #scale;
  #fields;
  #agents;

  #canvas;

  constructor(width = 50, height = 50, scale = 1) {
    this.#createCanvas();

    this.width = width;
    this.height = height;
    this.scale = scale;

    this.#createFields();
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

  get fields() {
    return this.#fields;
  }

  get agents() {
    return this.#agents;
  }

  // Public methods
  randomX() {
    return randomFloat(0, this.width);
  }

  randomY() {
    return randomFloat(0, this.height);
  }

  randomFieldX() {
    return randomInteger(0, this.width);
  }

  randomFieldY() {
    return randomInteger(0, this.height);
  }

  randomHeading() {
    return randomFloat(0, 360);
  }

  fieldAt(x, y) {
    Validator.validateNumber(x);
    Validator.validateNumber(y);

    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return undefined;
    }

    return this.#fields[y * this.width + x];
  }

  randomField() {
    const x = randomInteger(0, this.width - 1);
    const y = randomInteger(0, this.height - 1);

    return this.fieldAt(x, y);
  }

  neighborsOf(x, y) {
    const distances = [-1, 0, 1];

    return distances
      .flatMap((dx) => distances.flatMap((dy) => this.fieldAt(x + dx, y + dy)))
      .filter(
        (field) => field !== undefined && (field.x !== x || field.y !== y)
      );
  }

  randomNeighborOf(x, y) {
    const neighbors = this.neighborsOf(x, y);
    const randomIndex = randomInteger(0, neighbors.length - 1);

    return neighbors[randomIndex];
  }

  neighborsOfField(field) {
    return this.neighborsOf(field.x, field.y);
  }

  randomNeighborOfField(field) {
    return this.randomNeighborOf(field.x, field.y);
  }

  agentsAt(x, y) {
    Validator.validateNumber(x);
    Validator.validateNumber(y);

    return this.#agents.filter(
      (agent) => agent.fieldX === x && agent.fieldY === y
    );
  }

  randomAgent() {
    const index = Math.floor(Math.random() * this.#agents.length);

    return this.#agents[index];
  }

  addAgent(agent) {
    Validator.validateAgent(agent);

    agent.model = this;
    this.#agents.push(agent);
  }

  removeAgent(agent) {
    Validator.validateAgent(agent);

    agent.model = null;
    this.#agents.filter((agent) => agent !== agent);
  }

  update() {
    this.#canvas.clear();

    for (const field of this.#fields) {
      this.#canvas.fillStyle = field.color;
      this.#canvas.fillRect(
        field.x * this.scale,
        field.y * this.scale,
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

  #createFields() {
    this.#fields = [];

    for (let i = 0; i < this.#width * this.#height; i++) {
      const x = i % this.#width;
      const y = Math.floor(i / this.#width);

      const newField = new Field({ x, y });
      newField.model = this;

      this.#fields.push(newField);
    }
  }

  #createAgents() {
    this.#agents = [];
  }
}
