import { Model } from "../model/model.js";
import { Agent } from "../agent/agent.js";

export function validateNumber(value) {
  if (typeof value !== "number") {
    throw new Error("Parameter must be a number.");
  }
}

export function validatePositiveNumber(value) {
  Validator.validateNumber(value);

  if (value <= 0) {
    throw new Error("Parameter must be positive.");
  }
}

export function validateArray(value) {
  if (!Array.isArray(value)) {
    throw new Error("Parameter must be an array.");
  }
}

export function validateFunction(value) {
  if (typeof value !== "function") {
    throw new Error("Parameter must be a function.");
  }
}

export function validateColor(value) {
  if (!CSS.supports("color", value)) {
    throw new Error("Parameter must be a valid color.");
  }
}

export function validateShape(value) {
  if (!"draw" in value || typeof value.draw !== "function") {
    throw new Error("Parameter must be a valid shape.");
  }
}

export function validateField(value) {
  if (!value instanceof Field) {
    throw new Error("Parameter must be an instance of Field.");
  }
}

export function validateAgent(value) {
  if (!value instanceof Agent) {
    throw new Error("Parameter must be an instance of Agent.");
  }
}

export function validateEntity(value) {
  if (!value instanceof Field && !value instanceof Agent) {
    throw new Error("Parameter must be an instance of Field or Agent.");
  }
}

export function validateModel(value) {
  if (!value instanceof Model && value !== null) {
    throw new Error("Parameter must be an instance of Model.");
  }
}

export const Validator = {
  validateNumber,
  validatePositiveNumber,
  validateArray,
  validateFunction,
  validateColor,
  validateShape,
  validateField,
  validateAgent,
  validateEntity,
  validateModel,
};
