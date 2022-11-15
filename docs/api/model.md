---
title: Model
permalink: /api/model
parent: API documentation
nav_order: 1
---

# Model Class

## Properties

### `width`

Type
: `number`
Description
: The width of the model in [Fields][field]

---

### `height`

Type
: `number`
Description
: The height of the model in [Fields][field]

---

### `scale`

Type
: `number`
Description
: The zoom level of the model, the size of a [Fields][field] in pixels

---

### `fields`

Type
: `array`
Readonly
: yes
Description
: The array of [Fields][field] of the model in row-major order

---

### `agents`

Type
: `array`
Readonly
: yes
Description
: The array of [Agents][agent] of the model in the order they were added

---

### `centerX`

Type
: `number`
Readonly
: yes
Description
: The X coordinate of the center of the model

---

### `centerY`

Type
: `number`
Readonly
: yes
Description
: The Y coordinate of the center of the model

---

### `center`

Type
: `object`
Readonly
: yes
Description
: The coordinates of the center of the model in `{ x, y }` format

---

### `randomX`

Type
: `number`
Readonly
: yes
Description
: A random X coordinate of the model

---

### `randomY`

Type
: `number`
Readonly
: yes
Description
: A random Y coordinate of the model

---

### `randomFieldX`

Type
: number`
Readonly
: yes
Description
: The X coordinate of a random [Field][field] of the model

---

### `randomFieldY`

Type
: number`
Readonly
: yes
Description
: The Y coordinate of a random [Field][field] of the model

---

### `randomField`

Type
: [Field][field]
Readonly
: yes
Description
: A random [Field][field] of the model

---

### `randomAgent`

Type
: [Agent][agent]
Readonly
: yes
Description
: A random [Agent][agent] of the model

## Methods

[field]: /api/field
[agent]: /api/agent
