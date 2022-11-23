import { AgentModel } from "./model/model-element.js";
import { AgentCanvas } from "./canvas/canvas-element.js";

import { Timer } from "./timer/timer.js";
import { Canvas } from "./canvas/canvas.js";
import { Model } from "./model/model.js";
import { Agent } from "./agent/agent.js";

import * as Utils from "./utils.js";
import * as Shapes from "./shapes.js";

Object.assign(window, { Timer, Canvas, Model, Agent, Shapes, Utils });

if (customElements.get("agent-canvas") === undefined) {
  customElements.define("agent-canvas", AgentCanvas, { extends: "canvas" });
}

if (customElements.get("agent-model") === undefined) {
  customElements.define("agent-model", AgentModel);
}

export { Timer, Canvas, Model, Agent, Shapes, Utils };
