import { Timer } from "./timer/timer.js";
import { Canvas } from "./canvas/canvas.js";
import { Model } from "./model/model.js";
import { Agent } from "./agent/agent.js";

import * as Utils from "./utils.js";
import * as Shapes from "./shapes.js";

Object.assign(window, { Timer, Canvas, Model, Agent, Shapes, Utils });

export { Timer, Canvas, Model, Agent, Shapes, Utils };
