import { currentEnvironment, Environment } from "./utils/environment.js";

import { Timer } from "./timer/timer.js";
import { Canvas } from "./canvas/canvas.js";
import { Model } from "./model/model.js";
import { Agent } from "./agent/agent.js";

import * as Shapes from "./shapes.js";

if (currentEnvironment === Environment.BROWSER) {
  Object.assign(window, { Timer, Canvas, Model, Agent, Shapes });
}

export { Timer, Canvas, Model, Agent, Shapes };
