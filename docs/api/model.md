---
title: Model
permalink: /api/model
parent: API documentation
nav_order: 1
---

# Model Class

## Properties

| Name           |       Type       | Read-only | Description                                                            |
| -------------- | :--------------: | :-------: | ---------------------------------------------------------------------- |
| `width`        |     `number`     |           | The width of the model in [Fields][field]                              |
| `height`       |     `number`     |           | The height of the model in [Fields][field]                             |
| `scale`        |     `number`     |           | The zoom level of the model, the size of a field in pixels             |
| `fields`       |     `array`      |    yes    | The array of [Fields][field] of the model in row-major order           |
| `agents`       |     `array`      |    yes    | The array of [Agents][agent] of the model in the order they were added |
| `centerX`      |     `number`     |    yes    | The X coordinate of the center of the model                            |
| `centerY`      |     `number`     |    yes    | The Y coordinate of the center of the model                            |
| `center`       |     `object`     |    yes    | The coordinates of the center of the model in `{ x, y }` format        |
| `randomX`      |     `number`     |    yes    | A random X coordinate of the model                                     |
| `randomY`      |     `number`     |    yes    | A random Y coordinate of the model                                     |
| `randomFieldX` |     `number`     |    yes    | The X coordinate of a random [Field][field] of the model               |
| `randomFieldY` |     `number`     |    yes    | The Y coordinate of a random [Field][field] of the model               |
| `randomField`  | `[Field][field]` |    yes    | A random [Field][field] of the model                                   |
| `randomAgent`  | `[Agent][agent]` |    yes    | A random [Agent][agent] of the model                                   |

## Methods

[field]: /api/field
[agent]: /api/agent
