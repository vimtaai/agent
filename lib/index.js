import { ModelElement } from "./model/model-element.js";
import { currentEnvironment, Environment } from "./utils/environment.js";

import { Timer } from "./timer/timer.js";
import { Canvas } from "./canvas/canvas.js";
import { Model } from "./model/model.js";
import { Agent } from "./agent/agent.js";

import * as Utils from "./utils.js";
import * as Shapes from "./shapes.js";

if (currentEnvironment === Environment.BROWSER) {
  Object.assign(window, { Timer, Canvas, Model, Agent, Shapes, Utils });

  if (customElements.get("agent-model") === undefined) {
    customElements.define("agent-model", ModelElement);
  }
}

export { Timer, Canvas, Model, Agent, Shapes, Utils };
