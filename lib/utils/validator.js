import { Model } from "../model/model.js";
import { Agent } from "../agent/agent.js";

export class Validator {
  static validateNumber(value) {
    if (typeof value !== "number") {
      throw new Error("Parameter must be a number.");
    }
  }

  static validatePositiveNumber(value) {
    Validator.validateNumber(value);

    if (value <= 0) {
      throw new Error("Parameter must be positive.");
    }
  }

  static validateArray(value) {
    if (!Array.isArray(value)) {
      throw new Error("Parameter must be an array.");
    }
  }

  static validateFunction(value) {
    if (typeof value !== "function") {
      throw new Error("Parameter must be a function.");
    }
  }

  static validateColor(value) {
    if (!CSS.supports("color", value)) {
      throw new Error("Parameter must be a valid color.");
    }
  }

  static validateField(value) {
    if (!value instanceof Field) {
      throw new Error("Parameter must be an instance of Field.");
    }
  }

  static validateAgent(value) {
    if (!value instanceof Agent) {
      throw new Error("Parameter must be an instance of Agent.");
    }
  }

  static validateFieldOrAgent(value) {
    if (!value instanceof Field && !value instanceof Agent) {
      throw new Error("Parameter must be an instance of Field or Agent.");
    }
  }

  static validateModel(value) {
    if (!value instanceof Model && value !== null) {
      throw new Error("Parameter must be an instance of Model.");
    }
  }
}
