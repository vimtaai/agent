import { Canvas } from "../canvas/canvas.js";
import { Field } from "../field/field.js";
import { Validator } from "../utils/validator.js";
import { Random } from "../utils/random.js";
import { Geometry } from "../utils/geometry.js";
import { debounce } from "../utils/debounce.js";

export class Model {
  //#region private fields
  #canvas = null;
  #fields = [];
  #agents = [];
  #width = 50;
  #height = 50;
  #scale = 1;
  //#endregion

  constructor(width = 50, height = 50, scale = 1) {
    this.#width = width;
    this.#height = height;
    this.#scale = scale;

    this.#createCanvas();
  }

  //#region public properties
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

  get randomX() {
    return Random.getFloat(0, this.width);
  }

  get randomY() {
    return Random.getFloat(0, this.height);
  }

  get randomFieldX() {
    return Random.getInteger(0, this.width);
  }

  get randomFieldY() {
    return Random.getInteger(0, this.height);
  }

  get randomHeading() {
    return Random.getFloat(0, 360);
  }

  get fieldAt() {
    return function (x, y) {
      Validator.validateNumber(x);
      Validator.validateNumber(y);

      if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
        return undefined;
      }

      return this.#fields[y * this.width + x];
    };
  }

  get randomField() {
    const x = Random.getInteger(0, this.width - 1);
    const y = Random.getInteger(0, this.height - 1);

    return this.fieldAt(x, y);
  }

  get agentsAt() {
    return function (x, y) {
      Validator.validateNumber(x);
      Validator.validateNumber(y);

      return this.#agents.filter(
        (agent) => agent.fieldX === x && agent.fieldY === y
      );
    };
  }

  get randomAgent() {
    const index = Random.getInteger(0, this.#agents.length);

    return this.#agents[index] || null;
  }
  //#endregion

  //#region public methods
  update = debounce(this.#update.bind(this));

  addAgent(agent) {
    Validator.validateAgent(agent);

    agent.model = this;
    this.#agents.push(agent);

    return this;
  }

  removeAgent(agent) {
    Validator.validateAgent(agent);

    agent.model = null;
    this.#agents.filter((agent) => agent !== agent);

    return this;
  }
  //#endregion

  //#region private properties
  get #realWidth() {
    return this.width * this.#scale;
  }

  get #realHeight() {
    return this.height * this.#scale;
  }
  //#endregion

  //#region private methods
  #createCanvas() {
    this.#canvas = new Canvas(this.#realWidth, this.#realHeight);
    this.#createFields();
    this.update();
  }

  #updateCanvas() {
    this.#canvas.resize(this.#realWidth, this.#realHeight);
    this.#createFields();
    this.update();
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

  #update() {
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
      this.#canvas.save();

      this.#canvas.lineWidth = 1 / this.#scale;
      this.#canvas.fillStyle = agent.color;
      this.#canvas.scale(this.#scale, this.#scale);
      this.#canvas.translate(agent.x, agent.y);
      this.#canvas.rotate(Geometry.convertDegreesToRadians(agent.heading));
      this.#canvas.scale(agent.size, agent.size);

      agent.shape.draw(this.#canvas, agent.color);

      this.#canvas.restore();
    }
  }
  //#endregion
}
