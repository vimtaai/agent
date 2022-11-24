---
title: Timer Class
permalink: /api/timer
parent: API Reference
nav_order: 4
layout: reference
---

# Timer Class

```js
import { Timer } from "https://vimtaai.github.io/agent/lib/index.js";
```

## Constructor

### **new Timer**(tickFunction: function, tickInterval: number)
Creates a new Timer that can run the specified `tickFunction` every `tickInterval` seconds.  

#### Example
```js
function step() { /* ... */ }

const timer = new Timer(step, 100);
```

## Properties

### timer.**tickFunction**: function
The function the timer runs

### timer.**tickInterval**: number
The interval in milliseconds to run the function  
**Default:** `100`

### timer.**tickCount**: number (read-only)
The number of function runs since the creation of the Timer

### timer.**isRunning**: boolean (read-only)
Tells whether the Timer is currently running or not

## Methods 

### timer.**tick**()
Runs the specified `tickFunction` once

### timer.**resetTicks**()
Resets the `tickCount` to `0`

### timer.**start**()
Starts the Timer

### timer.**stop**()
Stops the Timer