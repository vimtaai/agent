# Timer Class

```js
import { Timer } from "https://vimtaai.github.io/agent/lib/index.js";
```

## Constructor

### `new Timer(tickFunction: function, tickInterval: number)`

Creates a new `Timer` that can run the specified `tickFunction` every `tickInterval` seconds.

#### Example

```js
function step() { /* ... */ }

const timer = new Timer(step, 100);
```

## Properties

### `timer.tickFunction: function`

The function the `Timer` runs.

### `timer.tickInterval: number`

The interval in milliseconds to run the `tickFunction`.

**Default:** `100`

### `timer.tickCount: number` <span className="badge badge--primary">read-only</span>

The number of runs the `tickFunction` since the creation of the `Timer`.

### `timer.isRunning: boolean` <span className="badge badge--primary">read-only</span>

Tells whether the `Timer` is currently running or not.

## Methods

### `timer.tick()`

Runs the specified `tickFunction` once.

### `timer.resetTicks()`

Resets the `tickCount` to `0`.

### `timer.start()`

Starts the `Timer`.

### `timer.stop()`

Stops the `Timer`.

### `timer.toggle()`

Toggles the `Timer`. Stops if running, starts if not.
