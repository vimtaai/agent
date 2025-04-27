import { Model, Agent, Timer } from "https://vimtaai.github.io/agent/lib/index.js";
import { Geometry } from "https://vimtaai.github.io/agent/lib/utils.js";
import { Circle } from "https://vimtaai.github.io/agent/lib/shapes.js";

const model = new Model({ width: 100, height: 100, scale: 5 });
const timer = new Timer(step, 16);

let sun;
let earth;
let moon;

class Planet extends Agent {
  constructor(properties = {}) {
    super(properties);

    this.centerX = properties.centerX || 0;
    this.centerY = properties.centerY || 0;
    this.angle = properties.angle || 0;
    this.distance = properties.distance || 0;
    this.speed = properties.speed || 0;
  }

  updatePosition() {
    const angleInRadians = Geometry.convertDegreesToRadians(this.angle);

    this.x = this.centerX + Math.sin(angleInRadians) * this.distance;
    this.y = this.centerY + Math.cos(angleInRadians) * this.distance;
  }
}

function setup() {
  model.clearDrawing();
  model.clearAgents();

  sun = new Agent({
    label: "Sun",
    x: model.centerX,
    y: model.centerY,
    size: 10,
    color: "yellow",
    shape: Circle
  });

  earth = new Planet({
    label: "Earth",
    centerX: model.centerX,
    centerY: model.centerY,
    size: 2,
    color: "royalblue",
    shape: Circle,
    distance: 30,
    speed: 1
  });
  earth.updatePosition();

  moon = new Planet({
    label: "Moon",
    centerX: earth.x,
    centerY: earth.y,
    size: 1,
    color: "lightgray",
    shape: Circle,
    distance: 3,
    speed: 5
  });
  moon.updatePosition();

  model.addAgent(sun);
  model.addAgent(earth);
  model.addAgent(moon);
}

function step() {
  earth.angle += earth.speed;
  earth.updatePosition();

  moon.centerX = earth.x;
  moon.centerY = earth.y;
  moon.angle += moon.speed;
  moon.updatePosition();
}

document.getElementById("setup").addEventListener("click", () => setup());
document.getElementById("start").addEventListener("click", () => timer.start());
document.getElementById("stop").addEventListener("click", () => timer.stop());
