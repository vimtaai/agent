# Agent Class

```js
import { Agent } from "https://vimtaai.github.io/agent/lib/index.js";
```

## Constructor

### `new Agent(properties: object)`

Creates a new Agent, and sets its initial properties from the given object

#### Example

```js
const agent = new Agent({ x: 10, y: 10 });
```

## Properties

### `agent.x: number`

The X coordinate of the Agent

**Default:** `0`

### `agent.fieldX: number` (read-only)

The X coordinate of the [Field][field] that the Agent is on

**Default:** `0`

### `agent.y: number`

The Y coordinate of the Agent

**Default:** `0`

### `agent.fieldY: number` (read-only)

The Y coordinate of the [Field][field] that the Agent is on

**Default:** `0`

### `agent.moveTo(x: number, y: number)`

Moves the Agent to the specified `x` and `y` coordinates  

### `agent.heading: number`

The heading the Agent is facing in degrees, 0 meaning "facing up"

**Default:** `0`

### `agent.size: number`

The size (scaling factor) of the Agent, *must be positive*

**Default:** `1`

### `agent.color: string`

The fill color of the Agent, *must be a valid [CSS color][color]*

**Default:** `"white"`

### `agent.penColor: string`

The color of the line the Agent uses to draw its path, *must be a valid [CSS color][color]*

**Default:** `"white"`

### `agent.penWidth: string`

The width of the line the Agent uses to draw its path, *must be positive*

**Default:** `2`

### `agent.isPenDown: boolean` (read-only)

Returns whether the Agent will draw its path when it moves

**Default:** `false`

### `agent.label: string`

The label that gets displayed above the Agent

**Default:** `""`

### `agent.shape: Shape`

Reference to the [Shape][shape] class that defines the shape of the Agent

**Default:** `Arrow`

### `agent.model: Model` (read-only)

Reference to the [Model][model] that contains the Agent, `null` otherwise

**Default:** `null`

### `agent.isOutOfModel: boolean` (read-only)

Returns wether the Agent is within the bounds of the Model

## Methods

### `agent.forward(amount: number)`

Moves the Agent forward with the given amount in the direction it is facing

### `agent.back(amount: number)`

Moves the Agent back with the given amount in the opposite direction it is facing

### `agent.left(amount: number)`

Turns the facing of the Agent left (counter-clockwise) with the given amount of degrees

### `agent.right(amount: number)`

Turns the facing of the Agent right (clockwise) with the given amount of degrees

### `agent.face(target: Agent | Field)`

Turns the facing of the Agent right (clockwise) with the given amount of degrees

### `agent.putPenDown()`

Puts the pen down, the Agent will draw its path when it moves

### `agent.pickPenUp()`

Picks the pen up, the Agent will no longer draw its path when it moves

## Events

### `click`

Fires an `AgentEvent` when the Agent is clicked

- `AgentEvent.target`: the `Agent` object that was clicked
- `AgentEvent.agent`: the `AgentEvent` that was clicked

[model]: /api/model
[field]: /api/field
[shape]: /api/shape
[color]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
