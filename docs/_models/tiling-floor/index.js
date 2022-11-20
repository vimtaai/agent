import { Model } from "https://vimtaai.github.io/agent/lib/index.js";

const TILE_SIZE = 5;

const model = new Model(100, 100, 5);
const agent = new Agent();

model.addAgent(agent);

function reset() {
  model.clearDrawing();

  agent.redColorAmount = 15;
  agent.size = 3;
  agent.penColor = `rgb(${agent.redColorAmount}, 0, 0)`;
  agent.putPenDown();
  agent.x = TILE_SIZE;
  agent.y = TILE_SIZE;
}

function drawTile() {
  agent.right(90);
  agent.forward(TILE_SIZE);
  agent.right(90);
  agent.forward(TILE_SIZE * 2);
  agent.right(90);
  agent.forward(TILE_SIZE);
  agent.right(90);
  agent.forward(TILE_SIZE * 2);
  agent.right(90);
}

function drawPattern() {
  for (let j = 0; j < 4; j++) {
    drawTile();
  }

  agent.x += TILE_SIZE * 3;
}

function drawRow() {
  for (let i = 0; i < 7; i++) {
    drawPattern();
  }

  agent.x = TILE_SIZE;
  agent.y += TILE_SIZE * 3;

  agent.redColorAmount += 40;
  agent.penColor = `rgb(${agent.redColorAmount}, 0, 0)`;
}

function drawBoard() {
  for (let i = 0; i < 7; i++) {
    drawRow();
  }
}

reset();

document.getElementById("setup").addEventListener("click", () => reset());
document.getElementById("start").addEventListener("click", () => drawBoard());

