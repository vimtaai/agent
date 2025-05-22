import { Validator } from "../utils/validator.js";

export class AgentEvent extends Event {
  constructor(type, agent) {
    Validator.validateAgent(agent);

    super(type);
    this.agent = agent;
  }
}
