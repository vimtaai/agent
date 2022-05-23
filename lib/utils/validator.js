import { Agent } from "../agent/agent.js";

function validateNumber(value) {
  if (typeof value !== "number") {
    throw new Error("Parameter must be a number.");
  }
}

function validatePositiveNumber(value) {
  this.validateNumber(value);

  if (value <= 0) {
    throw new Error("Parameter must be positive.");
  }
}

function validateFunction(value) {
  if (typeof value !== "function") {
    throw new Error("Parameter must be a function.");
  }
}

function validateAgent(value) {
  const isAgent = value instanceof Agent;

  if (!isAgent) {
    throw new Error("Parameter must be an instance of Agent");
  }
}

export const Validator = {
  validateNumber,
  validatePositiveNumber,
  validateFunction,
  validateAgent,
};
