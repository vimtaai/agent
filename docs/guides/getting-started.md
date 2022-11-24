---
title: Getting started
permalink: /guides/getting-started
parent: Guides
nav_order: 1
---

# Getting started

To start using Agent JS you just have to import the core classes of the library. Agent JS is currently hosted on [GitHub][github]. You can either directly import from there, or clone the Agent JS repository and import the necessary files locally.

Agent JS exports an [JavaScript Module][module] so you have to specify the `type="module"` attribute for your JavaScript script include.

```html
<!-- index.html -->
<script src="index.js" type="module"></script>
```

```js
// index.js
import { Model, Agent } from "https://vimtaai.github.io/agent/lib/index.js";
```

[github]: https://vimtaai.github.io/agent/lib
[module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## Single-agent drawing

To use Agent JS as a library for single-agent drawing (turtle graphics) you have to create a [Model][model] and add a single [Agent][agent] to it.

```js
const model = new Model({ width: 100, height: 100, scale: 5 });
const agent = new Agent();

model.addAgent(agent);
```

After adding the agent you can call it's method to make it move around the model. To see it's path you have to call the `.putPenDown()` method of the Agent.

#### Example
```js
function drawSquare() {
  for (let i = 0; i < 4; i++) {
    agent.forward(10);
    agent.left(90);
  }
}

agent.putPenDown();
drawSquare();
```

## Cellular automata

To create a cellular automaton you have to create a new [Model][model]. The Model automatically gets filled up with [Fields][field]. You can reference these fields with the `.fields` property of the Model. You can also use this property to iterate through all fields or filter for a subset of fields.

```js
const whiteFields = model.fields.filter(field => field.color === "white");
```

To create a simulation with Fields you have to create a new [Timer][timer]. After initializing your model, you can start the timer and make changes with the function specified for the Timer object.

```js
// Initialize model
function setup() { /* ... */ }

// Calculate next step
function step() { /* ... */ }

const timer = new Timer(step, 50);

setup();
timer.start();
```

[model]: {{ site.baseurl }}/api/model
[agent]: {{ site.baseurl }}/api/agent
[field]: {{ site.baseurl }}/api/field
[timer]: {{ site.baseurl }}/api/timer