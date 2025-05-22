# Field Class

## Properties

### `field.x: number` (read-only)

The X coordinate of the Field

### `field.y: number` (read-only)

The Y coordinate of the Field

### `field.color: string`

The color of the Field, *must be a valid [CSS color][color]*

### `field.neighbors: array` (read-only)

The array of the up to 8 neighboring Fields

### `field.neighborsInRadius(radius: number): array` (read-only)

The array Fields within the given radius, `radius` must be positive

## Events

### `click`

Fires an `FieldEvent` when the Field is clicked

- `FieldEvent.target`: the `Field` object that was clicked
- `FieldEvent.field`: the `FieldEvent` that was clicked

[color]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
