import { Model } from "https://vimtaai.github.io/agent/lib/index.js";

const STARTING_LENGTH = 15;
const LENGTH_FACTOR = 0.8;
const BRANCH_ANGLE = 30;
const MAX_LEVELS = 11;

const model = new Model({ width: 100, height: 100, scale: 5 });
const agent = new Agent();

model.addAgent(agent);

function reset() {
  model.clearDrawing();

  agent.size = 3;
  agent.putPenDown();
  agent.x = model.centerX;
  agent.y = model.height;
}

function drawTree(length, angle, levels) {
  if (levels === 0) {
    drawLeaf();
    return;
  }

  const redColorAmount = 255 - levels * 15;
  const greenColorAmount = redColorAmount / 2;

  agent.penColor = `rgb(${redColorAmount}, ${greenColorAmount}, 55)`;
  agent.penWidth = levels;
  agent.putPenDown();
  agent.forward(length);

  agent.left(angle);
  drawTree(length * LENGTH_FACTOR, angle, levels - 1);
  agent.right(angle);

  agent.right(angle);
  drawTree(length * LENGTH_FACTOR, angle, levels - 1);
  agent.left(angle);

  agent.pickPenUp();
  agent.back(length);
}

function drawLeaf() {
  agent.penColor = "green";
  agent.putPenDown();

  for (let i = 10; i >= 1; i -= 2) {
    agent.penWidth = i;
    agent.forward(0.5);
  }

  agent.pickPenUp();
  agent.back(2.5);
}

reset();

document.getElementById("setup").addEventListener("click", () => reset());
document.getElementById("start").addEventListener("click", () => drawTree(STARTING_LENGTH, BRANCH_ANGLE, MAX_LEVELS));

