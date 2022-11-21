import { Model, Timer } from "https://vimtaai.github.io/agent/lib/index.js";
import { Random } from "https://vimtaai.github.io/agent/lib/utils.js";

const INITIAL_DENSITY = 0.25;

const model = new Model({ width: 100, height: 100, scale: 5 });
const timer = new Timer(step, 20);

function setup() {
  for (const field of model.fields) {
    field.isAlive = Random.getRandomBoolean(INITIAL_DENSITY);
    field.color = field.isAlive ? "white" : "black";
  }
}

function step() {
  for (const field of model.fields) {
    const aliveNeighborsCount = field.neighbors.filter((neighbor) => neighbor.isAlive).length;

    if (aliveNeighborsCount < 2 || aliveNeighborsCount > 3) {
      field.willLive = false;
    } else if (aliveNeighborsCount === 3) {
      field.willLive = true;
    } else {
      field.willLive = field.isAlive;
    }
  }

  for (const field of model.fields) {
    field.isAlive = field.willLive;
    field.color = field.isAlive ? "white" : "black";
  }
}

document.getElementById("setup").addEventListener("click", () => setup());
document.getElementById("start").addEventListener("click", () => timer.start());
document.getElementById("stop").addEventListener("click", () => timer.stop());
