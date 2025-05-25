# Random Utilities

```js
import { Random } from "https://vimtaai.github.io/agent/lib/index.js"
Random.getRandomBoolean();
// -- OR --
import { getRandomBoolean } from "https://vimtaai.github.io/agent/lib/utils.js";
getRandomBoolean();
```

## Functions

### `getRandomBoolean([probability: number]): boolean`

Generates a random boolean value which is `true` with the given probability.

**Default**: `probability: 0.5`

### `getRandomInteger(min: number, max: number): number`

Generates a random integer number between the given values (both ends inclusive).

### `getRandomFloat(min: number, max: number): number`

Generates a random real number between the given values (both ends inclusive).

### `getRandomColor(): string`

Generates a random [CSS color][color] in the `rgb(r, g, b)` format.

### `getRandomHeading(): string`

Generates a random heading, a number between 0 (inclusive) and 360 (exclusive).

[color]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
