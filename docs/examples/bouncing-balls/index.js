import { Model, Agent, Timer } from "https://vimtaai.github.io/agent/lib/index.js";
import { Random } from "https://vimtaai.github.io/agent/lib/utils.js";
import { Circle } from "https://vimtaai.github.io/agent/lib/shapes.js";

const NUMBER_OF_BALLS = 10;
const BASE_SPEED = 0.5;

const model = new Model({ width: 100, height: 100, scale: 5 });
const timer = new Timer(step, 16);

function setup() {
  model.clearDrawing();
  model.clearAgents();

  for (let i = 0; i < NUMBER_OF_BALLS; i++) {
    const agent = new Agent({ x: model.randomX, y: model.randomY });
    const color = Random.getRandomColor();

    agent.shape = Circle;
    agent.size = 2;
    agent.heading = Random.getRandomHeading();
    agent.color = color;
    agent.penColor = color;
    agent.putPenDown();

    model.addAgent(agent);
  }
}

function step() {
  for (const agent of model.agents) {
    agent.forward(BASE_SPEED);

    if (agent.x < 0) {
      agent.x = 0;
      agent.heading = 360 - agent.heading;
    }

    if (agent.x > model.width) {
      agent.x = model.width;
      agent.heading = 360 - agent.heading;
    }

    if (agent.y < 0) {
      agent.y = 0;
      agent.heading = 180 - agent.heading;
    }

    if (agent.y > model.height) {
      agent.y = model.height;
      agent.heading = 180 - agent.heading;
    }
  }
}

document.getElementById("setup").addEventListener("click", () => setup());
document.getElementById("start").addEventListener("click", () => timer.start());
document.getElementById("stop").addEventListener("click", () => timer.stop());
