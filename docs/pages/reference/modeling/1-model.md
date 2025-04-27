# Model Class

```js
import { Model } from "https://vimtaai.github.io/agent/lib/index.js";
```

## Constructor

### `new Model(properties: object)`

Creates a new Model, sets its initial properties from the given object, and inserts it into the document

#### Example

```js
const model = new Model({ width: 100, height: 100, scale: 5 });
```

:::important
When creating a new Model, it will be automatically inserted into the end of the document. If you want to insert your Model to another element, pass the reference to the desired parent element in `parentElement` field of the `properties` argument.
:::

## Properties

### `model.width: number`

The width of the Model in [Fields][field]  
**Default:** `100`

### `model.height: number`

The height of the Model in [Fields][field]  
**Default:** `100`

### `model.scale: number`

The zoom level of the Model, the size of [Fields][field] in pixels  
**Default:** `5`

### `model.fields: array` (read-only)

The array of [Fields][field] of the Model in row-major order

### `model.agents: array` (read-only)

The array of [Agents][agent] of the Model in the order they were added

### `model.centerX: number` (read-only)

The X coordinate of the center of the Model

### `model.centerY: number` (read-only)

The Y coordinate of the center of the Model

### `model.center: object` (read-only)

The coordinates of the center of the Model in `{ x, y }` format

### `model.randomX: number` (read-only)

A random X coordinate of the Model

### `model.randomY: number` (read-only)

A random Y coordinate of the Model

### `model.randomFieldX: number` (read-only)

The X coordinate of a random [Field][field] of the Model

### `model.randomFieldY: number` (read-only)

The Y coordinate of a random [Field][field] of the Model

### `model.randomField: Field` (read-only)

A random [Field][field] of the Model

### `model.randomAgent: Agent` (read-only)

A random [Agent][agent] of the Model

## Methods

### `model.update()`

Forces the Model to re-render

### `model.addAgent(agent: Agent)`

Adds an [Agent][agent] to the Model

### `model.removeAgent(agent: Agent)`

Removes an [Agent][agent] from the Model

### `model.clearDrawing()`

Clears all drawings from the Model

### `model.clearAgents()`

Removes all [Agents][agent] from the Model

[field]: /api/field
[agent]: /api/agent
