import { Entity } from "./entity.js";
import { Arrow } from "../shapes/arrow.js";

import { Validator } from "../utils/validator.js";
import { Geometry } from "../utils/geometry.js";

export class Agent extends Entity {
  static #defaultColor = "white";
  static #defaultPenColor = "white";
  static #defaultPenWidth = 2;
  static #defaultShape = Arrow;

  #heading = 0;
  #size = 1;
  #penColor = Agent.#defaultPenColor;
  #penWidth = Agent.#defaultPenWidth;
  #penStrokes = [];
  #isPenDown = false;
  #shape = Agent.#defaultShape;
  #label = "";

  constructor(properties = {}) {
    super();

    const x = properties.x || 0;
    const y = properties.y || 0;

    super.moveTo(x, y);
    this.heading = properties.heading || 0;
    this.size = properties.size || 1;
    super.color = properties.color || Agent.#defaultColor;
    this.penColor = properties.penColor || Agent.#defaultPenColor;
    this.penWidth = properties.penWidth || Agent.#defaultPenWidth;
    this.shape = properties.shape || Agent.#defaultShape;
    this.label = properties.label || "";
  }

  get x() {
    return super.x;
  }

  set x(value) {
    const { x: fromX, y: fromY } = this;
    super.x = value;

    this.#addPenStroke({
      from: { x: fromX, y: fromY },
      to: { x: this.x, y: this.y },
    });
  }

  get y() {
    return super.y;
  }

  set y(value) {
    const { x: oldX, y: oldY } = this;
    super.y = value;

    this.#addPenStroke({
      from: { x: oldX, y: oldY },
      to: { x: this.x, y: this.y },
    });
  }

  moveTo(x, y) {
    const { x: fromX, y: fromY } = this;
    super.moveTo(x, y);

    this.#addPenStroke({
      from: { x: fromX, y: fromY },
      to: { x: this.x, y: this.y },
    });
  }

  get heading() {
    return this.#heading;
  }

  set heading(value) {
    Validator.validateNumber(value);

    this.#heading = value;
    this.model?.update();
  }

  get size() {
    return this.#size;
  }

  set size(value) {
    Validator.validatePositiveNumber(value);

    this.#size = value;
    this.model?.update();
  }

  get penColor() {
    return this.#penColor;
  }

  set penColor(value) {
    Validator.validateColor(value);

    this.#penColor = value;
    this.model?.update();
  }

  get penWidth() {
    return this.#penWidth;
  }

  set penWidth(value) {
    Validator.validatePositiveNumber(value);

    this.#penWidth = value;
    this.model?.update();
  }

  get isPenDown() {
    return this.#isPenDown;
  }

  get shape() {
    return this.#shape;
  }

  set shape(value) {
    Validator.validateShape(value);

    this.#shape = value;
    this.model?.update();
  }

  get label() {
    return this.#label;
  }

  set label(value) {
    this.#label = value;
    this.model?.update();
  }

  get penStrokes() {
    return this.#penStrokes;
  }

  forward(amount) {
    Validator.validateNumber(amount);

    const newX = this.x + Math.sin(this.#headingInRadians) * amount;
    const newY = this.y - Math.cos(this.#headingInRadians) * amount;

    this.moveTo(newX, newY);
  }

  back(amount) {
    Validator.validateNumber(amount);

    const { x: oldX, y: oldY } = this;

    const newX = this.x - Math.sin(this.#headingInRadians) * amount;
    const newY = this.y + Math.cos(this.#headingInRadians) * amount;

    this.#addPenStroke({
      from: { x: oldX, y: oldY },
      to: { x: newX, y: newY },
    });

    this.moveTo(newX, newY);
  }

  left(amount) {
    Validator.validateNumber(amount);

    this.heading = (this.heading - amount) % 360;
  }

  right(amount) {
    Validator.validateNumber(amount);

    this.heading = (this.heading + amount) % 360;
  }

  face(target) {
    Validator.validateEntity(target);

    const xDistance = target.x - this.x;
    const yDistance = target.y - this.y;

    this.heading = Math.atan(xDistance / yDistance);
  }

  putPenDown() {
    this.#isPenDown = true;
  }

  pickPenUp() {
    this.#isPenDown = false;
  }

  clearPenStrokes() {
    this.#penStrokes = [];
  }

  get #headingInRadians() {
    return Geometry.convertDegreesToRadians(this.#heading);
  }

  #addPenStroke({ from, to }) {
    if (!this.isPenDown) {
      return;
    }

    this.#penStrokes.push({
      from,
      to,
      color: this.#penColor,
      width: this.#penWidth,
    });
  }
}
