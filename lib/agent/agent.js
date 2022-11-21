import { Entity } from "../entity/entity.js";
import { Arrow } from "../shapes/arrow.js";

import { Validator } from "../utils/validator.js";
import { Geometry } from "../utils/geometry.js";

export class Agent extends Entity {
  //#region static fields
  static #defaultColor = "white";
  static #defaultPenColor = "white";
  static #defaultPenWidth = 2;
  static #defaultShape = Arrow;
  //#endregion

  //#region private fields
  #heading = 0;
  #size = 1;
  #penColor = Agent.#defaultPenColor;
  #penWidth = Agent.#defaultPenWidth;
  #penStrokes = [];
  #isPenDown = false;
  #shape = Agent.#defaultShape;
  #label = "";
  //#endregion

  constructor(properties = {}) {
    super();

    super.x = properties.x || 0;
    super.y = properties.y || 0;
    this.heading = properties.heading || 0;
    this.size = properties.size || 1;
    super.color = properties.color || Agent.#defaultColor;
    this.penColor = properties.penColor || Agent.#defaultPenColor;
    this.penWidth = properties.penWidth || Agent.#defaultPenWidth;
    this.shape = properties.shape || Agent.#defaultShape;
    this.label = properties.label || "";
  }

  //#region public properties
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
  //#endregion

  //#region public methods
  forward(amount) {
    Validator.validateNumber(amount);

    const { x: fromX, y: fromY } = this;

    const toX = this.x + Math.sin(this.#headingInRadians) * amount;
    const toY = this.y - Math.cos(this.#headingInRadians) * amount;

    this.addPenStroke({
      from: { x: fromX, y: fromY },
      to: { x: toX, y: toY },
    });

    this.x = toX;
    this.y = toY;
  }

  back(amount) {
    Validator.validateNumber(amount);

    const { x: previousX, y: previousY } = this;

    const newX = this.x - Math.sin(this.#headingInRadians) * amount;
    const newY = this.y + Math.cos(this.#headingInRadians) * amount;

    this.addPenStroke({
      from: { x: previousX, y: previousY },
      to: { x: newX, y: newY },
    });

    this.x = newX;
    this.y = newY;
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
    Validator.validateEntity(amount);

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
  //#endregion

  //#region private properties
  get #headingInRadians() {
    return Geometry.convertDegreesToRadians(this.#heading);
  }
  //#endregion

  //#region private methods
  addPenStroke({ from, to }) {
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
  //#endregion
}
