import { currentEnvironment, Environment } from "./utils/environment.js";

import { Timer } from "./timer/timer.js";
import { Canvas } from "./canvas/canvas.js";
import { Model } from "./model/model.js";
import { Agent } from "./agent/agent.js";

if (currentEnvironment === Environment.BROWSER) {
  window.Timer = Timer;
  window.Canvas = Canvas;
  window.Model = Model;
  window.Agent = Agent;
}

export { Timer, Canvas, Model, Agent };
