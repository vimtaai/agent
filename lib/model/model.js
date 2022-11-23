import { Canvas } from "../canvas/canvas.js";
import { Field } from "../field/field.js";

import { Random } from "../utils/random.js";
import { Validator } from "../utils/validator.js";
import { Geometry } from "../utils/geometry.js";

import { debounce } from "../helpers/debounce.js";
import { insertIntoDocument } from "../helpers/insert.js";

export class Model {
  //#region private fields
  #rootElement = null;

  #fieldCanvas = null;
  #agentCanvas = null;
  #drawingCanvas = null;

  #fields = [];
  #agents = [];
  #width = 50;
  #height = 50;
  #scale = 5;
  //#endregion

  constructor(properties = {}) {
    this.width = properties.width || 100;
    this.height = properties.height || 100;
    this.scale = properties.scale || 5;

    this.#createCanvases();
  }

  //#region public properties
  get width() {
    return this.#width;
  }

  set width(value) {
    Validator.validatePositiveNumber(value);

    this.#width = value;
    this.#resizeCanvases();
  }

  get height() {
    return this.#height;
  }

  set height(value) {
    Validator.validatePositiveNumber(value);

    this.#height = value;
    this.#resizeCanvases();
  }

  get scale() {
    return this.#scale;
  }

  set scale(value) {
    Validator.validatePositiveNumber(value);

    this.#scale = value;
    this.#resizeCanvases();
  }

  get fields() {
    return this.#fields;
  }

  get agents() {
    return this.#agents;
  }

  get centerX() {
    return Math.floor(this.width / 2);
  }

  get centerY() {
    return Math.floor(this.height / 2);
  }

  get center() {
    return { x: this.centerX, y: this.centerY };
  }

  get randomX() {
    return Random.getRandomFloat(0, this.width);
  }

  get randomY() {
    return Random.getRandomFloat(0, this.height);
  }

  get randomFieldX() {
    return Random.getRandomInteger(0, this.width);
  }

  get randomFieldY() {
    return Random.getRandomInteger(0, this.height);
  }

  get randomHeading() {
    return Random.getRandomFloat(0, 360);
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
    const x = Random.getRandomInteger(0, this.width - 1);
    const y = Random.getRandomInteger(0, this.height - 1);

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
    const index = Random.getRandomInteger(0, this.#agents.length);

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

  clearDrawing() {
    this.#drawingCanvas.clear();
  }

  clearAgents() {
    for (const agent of this.#agents) {
      agent.model = null;
    }

    this.#agents = [];
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
  #createRootElement() {
    this.#rootElement = document.createElement("agent-model");
    insertIntoDocument(this.#rootElement, document.body);
  }

  #createCanvases() {
    this.#createRootElement();

    this.#fieldCanvas = new Canvas({
      width: this.#realWidth,
      height: this.#realHeight,
      parentElement: this.#rootElement,
    });

    this.#drawingCanvas = new Canvas({
      width: this.#realWidth,
      height: this.#realHeight,
      parentElement: this.#rootElement,
    });

    this.#agentCanvas = new Canvas({
      width: this.#realWidth,
      height: this.#realHeight,
      parentElement: this.#rootElement,
    });

    this.#createFields();
    this.update();
  }

  #resizeCanvases() {
    this.#fieldCanvas?.resize(this.#realWidth, this.#realHeight);
    this.#agentCanvas?.resize(this.#realWidth, this.#realHeight);
    this.#drawingCanvas?.resize(this.#realWidth, this.#realHeight);

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
    this.#fieldCanvas.clear();
    this.#agentCanvas.clear();

    for (const field of this.#fields) {
      this.#drawField(field);
    }

    for (const agent of this.#agents) {
      this.#agentCanvas.save();
      this.#drawAgentPath(agent);
      this.#drawAgent(agent);
      this.#agentCanvas.restore();
      this.#drawAgentLabel(agent);
    }
  }

  #drawField(field) {
    this.#fieldCanvas.fillStyle = field.color;
    this.#fieldCanvas.fillRect(
      field.x * this.scale,
      field.y * this.scale,
      this.scale,
      this.scale
    );
  }

  #drawAgent(agent) {
    this.#agentCanvas.lineWidth = 1 / this.#scale;
    this.#agentCanvas.fillStyle = agent.color;
    this.#agentCanvas.scale(this.#scale, this.#scale);
    this.#agentCanvas.translate(agent.x, agent.y);
    this.#agentCanvas.rotate(Geometry.convertDegreesToRadians(agent.heading));
    this.#agentCanvas.scale(agent.size, agent.size);

    agent.shape.draw(this.#agentCanvas, agent.color);
  }

  #drawAgentPath(agent) {
    for (const { from, to, color, width } of agent.penStrokes) {
      this.#drawingCanvas.beginPath();
      this.#drawingCanvas.strokeStyle = color;
      this.#drawingCanvas.lineWidth = width;
      this.#drawingCanvas.moveTo(from.x * this.#scale, from.y * this.#scale);
      this.#drawingCanvas.lineTo(to.x * this.#scale, to.y * this.#scale);
      this.#drawingCanvas.stroke();
    }

    agent.clearPenStrokes();
  }

  #drawAgentLabel(agent) {
    if (!agent.label) {
      return;
    }

    const labelX = agent.x * this.scale;
    const labelY = agent.y * this.scale - agent.size - 10;

    this.#agentCanvas.fillStyle = "white";
    this.#agentCanvas.textAlign = "center";
    this.#agentCanvas.font = "11px Arial";

    this.#agentCanvas.fillText(agent.label, labelX, labelY);
  }
  //#endregion
}
