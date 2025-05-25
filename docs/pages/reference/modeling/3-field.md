# Field Class

The `Field` class represents a single field within the model's grid. A `Field` is an `Entity` that cannot move and has fix coordinates within the [`Model`][model]. `Field` objects are automatically created when a `Model` is created or resized, they cannot be created manually.

## Properties

### `field.x: number` <span className="badge badge--primary">read-only</span>

The X coordinate of the `Field`.

### `field.y: number` <span className="badge badge--primary">read-only</span>

The Y coordinate of the `Field`.

### `field.color: string`

The color of the `Field`, *must be a valid [CSS color][color]*.

### `field.neighbors: array` <span className="badge badge--primary">read-only</span>

The array of the up to 8 neighboring `Field`s.

### `field.neighborsInRadius(radius: number): array` <span className="badge badge--primary">read-only</span>

The array `Field`s within the given radius, `radius` must be positive.

## Events

### `click`

Sends an `FieldEvent` when the Field is clicked.

- `FieldEvent.target`: the `Field` object that was clicked.
- `FieldEvent.field`: the `FieldEvent` that was clicked.

[color]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
[agent]: /reference/modeling/agent
[model]: /reference/modeling/model
