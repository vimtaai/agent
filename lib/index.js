import { AgentCanvasElement } from "./elements/canvas-element.js";
import { AgentModelElement } from "./elements/model-element.js";

import { Timer } from "./classes/timer.js";
import { Canvas } from "./classes/canvas.js";
import { Model } from "./classes/model.js";
import { Agent } from "./classes/agent.js";

import * as Utils from "./utils.js";
import * as Shapes from "./shapes.js";

Object.assign(window, { Timer, Canvas, Model, Agent, Shapes, Utils });

AgentCanvasElement.registerElement();
AgentModelElement.registerElement();

export { Timer, Canvas, Model, Agent, Shapes, Utils };
