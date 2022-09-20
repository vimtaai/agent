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

  static validateFunction(value) {
    if (typeof value !== "function") {
      throw new Error("Parameter must be a function.");
    }
  }

  static validateAgent(value) {
    if (!value instanceof Agent) {
      throw new Error("Parameter must be an instance of Agent");
    }
  }

  static validateModel(value) {
    if (!value instanceof Model && value !== null) {
      throw new Error("Parameter must be an instance of Model");
    }
  }
}
