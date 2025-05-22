import { Field } from "../classes/field.js";
import { Random } from "../utils/random.js";
import { Geometry } from "../utils/geometry.js";
import { Validator } from "../utils/validator.js";
import { debounce } from "../helpers/debounce.js";

const Layers = {
  AGENT: "agent",
  DRAWING: "drawing",
  FIELD: "field",
  LABEL: "label",
};

export class AgentModelElement extends HTMLElement {
  static registerElement() {
    window.customElements.define("agent-model", AgentModelElement);
  }

  #canvas = null;

  #fields = [];
  #agents = [];

  #width = 50;
  #height = 50;
  #scale = 5;

  #wrapHorizontal = false;
  #wrapVertical = false;

  connectedCallback() {
    this.#createShadowRoot();
    this.#createCanvas();
    this.#createFields();
  }

  get width() {
    return this.#width;
  }

  set width(value) {
    Validator.validatePositiveNumber(value);

    this.#width = value;
    this.#canvas.resize(this.#realWidth, this.#realHeight);
    this.#createFields();

    this.update();
  }

  get height() {
    return this.#height;
  }

  set height(value) {
    Validator.validatePositiveNumber(value);

    this.#height = value;
    this.#canvas.resize(this.#realWidth, this.#realHeight);
    this.#createFields();

    this.update();
  }

  get scale() {
    return this.#scale;
  }

  set scale(value) {
    Validator.validatePositiveNumber(value);

    this.#scale = value;
    this.#canvas.resize(this.#realWidth, this.#realHeight);

    this.update();
  }

  resize(width, height, scale = undefined) {
    Validator.validatePositiveNumber(width);
    Validator.validatePositiveNumber(height);

    if (scale !== undefined) {
      Validator.validatePositiveNumber(scale);
      this.#scale = scale;
    }

    this.#width = width;
    this.#height = height;
    this.#canvas.resize(this.#realWidth, this.#realHeight);
    this.#createFields();

    this.update();
  }

  get wrapHorizontal() {
    return this.#wrapHorizontal;
  }

  set wrapHorizontal(value) {
    Validator.validateBoolean(value);

    this.#wrapHorizontal = true;
  }

  get wrapVertical() {
    return this.#wrapVertical;
  }

  set wrapVertical(value) {
    Validator.validateBoolean(value);

    this.#wrapVertical = true;
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

  addAgent(agent) {
    Validator.validateAgent(agent);

    agent.model = this;
    this.#agents.push(agent);

    return this;
  }

  removeAgent(agent) {
    Validator.validateAgent(agent);

    const agentIndex = this.#agents.indexOf(agent);

    agent.model = null;
    this.#agents.splice(agentIndex, 1);

    return this;
  }

  clearDrawing() {
    this.#canvas.clearLayer(Layers.DRAWING);
  }

  clearAgents() {
    for (const agent of this.#agents) {
      agent.model = null;
    }

    this.#agents = [];
  }

  get #realWidth() {
    return this.#width * this.#scale;
  }

  get #realHeight() {
    return this.#height * this.#scale;
  }

  update = debounce(() => {
    this.#canvas.clearLayer(Layers.FIELD);
    this.#canvas.clearLayer(Layers.AGENT);
    this.#canvas.clearLayer(Layers.LABEL);

    this.#canvas.selectLayer(Layers.FIELD);
    for (const field of this.#fields) {
      this.#drawField(field);
    }

    this.#canvas.selectLayer(Layers.DRAWING);
    for (const agent of this.#agents) {
      this.#drawAgentPath(agent);
    }

    this.#canvas.selectLayer(Layers.AGENT);
    for (const agent of this.#agents) {
      this.#drawAgent(agent);
    }

    this.#canvas.selectLayer(Layers.LABEL);
    for (const agent of this.#agents) {
      this.#drawAgentLabel(agent);
    }
  });

  #createShadowRoot() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <slot></slot>
    `;
  }

  #createCanvas() {
    this.#canvas = document.createElement("agent-canvas");
    this.#canvas.createLayer(Layers.FIELD);
    this.#canvas.createLayer(Layers.DRAWING);
    this.#canvas.createLayer(Layers.AGENT);
    this.#canvas.createLayer(Layers.LABEL);
    this.#canvas.resize(this.#realWidth, this.#realHeight);
    this.append(this.#canvas);
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

  #drawField(field) {
    this.#canvas.fillStyle = field.color;
    this.#canvas.fillRect(
      field.x * this.scale,
      field.y * this.scale,
      this.scale,
      this.scale
    );
  }

  #drawAgent(agent) {
    this.#canvas.save();
    this.#canvas.lineWidth = 1.5 / agent.size / this.#scale;
    this.#canvas.fillStyle = agent.color;
    this.#canvas.scale(this.#scale, this.#scale);
    this.#canvas.translate(agent.x, agent.y);
    this.#canvas.rotate(Geometry.convertDegreesToRadians(agent.heading));
    this.#canvas.scale(agent.size, agent.size);

    agent.shape.draw(this.#canvas.activeLayer.context, agent.color);

    this.#canvas.restore();
  }

  #drawAgentPath(agent) {
    this.#canvas.save();

    for (const { from, to, color, width } of agent.penStrokes) {
      this.#canvas.beginPath();
      this.#canvas.strokeStyle = color;
      this.#canvas.lineWidth = width;
      this.#canvas.moveTo(from.x * this.#scale, from.y * this.#scale);
      this.#canvas.lineTo(to.x * this.#scale, to.y * this.#scale);
      this.#canvas.stroke();
    }

    agent.clearPenStrokes();
    this.#canvas.restore();
  }

  #drawAgentLabel(agent) {
    if (!agent.label) {
      return;
    }

    const distanceFromAgent = 10;
    const labelX = agent.x * this.scale;
    const labelY = (agent.y - agent.size / 2) * this.scale - distanceFromAgent;

    this.#canvas.fillStyle = "white";
    this.#canvas.textAlign = "center";
    this.#canvas.font = "11px Arial";

    this.#canvas.fillText(agent.label, labelX, labelY);
  }
}
