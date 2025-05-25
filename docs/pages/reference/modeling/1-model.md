# Model Class

```js
import { Model } from "https://vimtaai.github.io/agent/lib/index.js";
```

The `Model` class represents a multi-agent model, or a simulation. A `Model` contains [`Field`][field] objects in a grid and  [`Agent`][agent] objects can be added to them. Updating the properties of `Field` and `Agent` object within a model with a [`Timer`][timer] object can be used to create a simulation.

## Constructor

### `new Model(properties: object)`

Creates a new `Model`, sets its initial properties from the given object, and inserts it into the document. You can specify the initial `width`, `height`, and `scale` properties of the model in the `properties` parameter, as well as the `parentElement` for the `Model` that defaults to `document.body`.

**Default for `properties`:** `{ width: 100, height: 100, scale: 5, parentElement: document.body }`

#### Example

```js
new Model();
new Model({ width: 100, height: 100, scale: 5 });
```

:::important
When creating a new `Model`, it will be automatically inserted into the end of the document. If you want to insert your Model to another element, pass the reference to the desired parent element in `parentElement` field of the `properties` argument.
:::

## Properties

### `model.width: number`

The width of the `Model` in [`Field`][field] units.

**Default:** `100`

### `model.height: number`

The height of the `Model` in [`Field`][field] units.

**Default:** `100`

### `model.scale: number`

The zoom level of the `Model`, the size of a [`Field`][field] in pixels.

**Default:** `5`

### `model.wrapHorizontal: boolean`

Whether the `Model` wraps horizontally.

**Default:** `false`

### `model.wrapVertical: boolean`

Whether the `Model` wraps vertically.

**Default:** `false`

### `model.fields: array` <span className="badge badge--primary">read-only</span>

The array of [`Field`][field] objects in the `Model` in row-major order.

### `model.agents: array` <span className="badge badge--primary">read-only</span>

The array of [`Agent`][agent] objects of the `Model` in the order they were added.

### `model.centerX: number` <span className="badge badge--primary">read-only</span>

The X coordinate of the center of the `Model`.

### `model.centerY: number` <span className="badge badge--primary">read-only</span>

The Y coordinate of the center of the `Model`.

### `model.center: object` <span className="badge badge--primary">read-only</span>

The coordinates of the center of the `Model` in `{ x, y }` format.

### `model.randomX: number` <span className="badge badge--primary">read-only</span>

A random X coordinate of the `Model`.

### `model.randomY: number` <span className="badge badge--primary">read-only</span>

A random Y coordinate of the `Model`.

### `model.randomFieldX: number` <span className="badge badge--primary">read-only</span>

The X coordinate of a random [`Field`][field] of the `Model`.

### `model.randomFieldY: number` <span className="badge badge--primary">read-only</span>

The Y coordinate of a random [`Field`][field] of the `Model`.

### `model.randomField: Field` <span className="badge badge--primary">read-only</span>

A random [`Field`][field] of the `Model`.

### `model.randomAgent: Agent` <span className="badge badge--primary">read-only</span>

A random [`Agent`][agent] of the `Model`.

## Methods

### `model.update()`

Forces the `Model` to re-render.

### `model.addAgent(agent: Agent)`

Adds an [`Agent`][agent] to the Model.

### `model.removeAgent(agent: Agent)`

Removes an [`Agent`][agent] from the Model.

### `model.clearDrawing()`

Clears all drawings from the Model.

### `model.clearAgents()`

Removes all [`Agent`][agent] objects from the Model.

## Events

### `agentclick`

Fires an `AgentEvent` when an [`Agent`][agent] is clicked.

- `AgentEvent.target`: the `Agent` object that was clicked.
- `AgentEvent.agent`: the `AgentEvent` that was clicked.

### `fieldclick`

Fires an `FieldEvent` when a Field is clicked.

- `FieldEvent.target`: the `Field` object that was clicked.
- `FieldEvent.field`: the `FieldEvent` that was clicked.

[field]: /reference/modeling/field
[agent]: /reference/modeling/agent
[timer]: /reference/modeling/timer
