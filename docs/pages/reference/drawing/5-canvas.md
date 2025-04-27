# Canvas Class

```js
import { Canvas } from "https://vimtaai.github.io/agent/lib/index.js";
```

## Constructor

### `new Canvas(properties: object)`

Creates a new Canvas, sets its initial properties from the given object, and inserts it into the document

#### Example

```js
const canvas = new Canvas({ width: 500, height: 500 });
```

:::important
When creating a new Canvas, it will be automatically inserted into the end of the document. If you want to insert your Canvas to another element, pass the reference to the desired parent element in `parentElement` field of the `properties` argument.
:::

## Properties

### `canvas.width: number`

The width of the Canvas in pixels
**Default:** `300`

### `canvas.height: number`

The height of the Canvas in pixels
**Default:** `200`

### `canvas.autoSize: boolean`

If `true`, the Canvas will automatically resize itself to fit its parent element
**Default:** `false`

## Methods

### `canvas.resize(width: number, height: number)`

Resizes the Canvas to the given dimensions in pixels, if called, it will automatically set the `autoSize` property to `false`

### `canvas.clear()`

Clears all drawings from the entire Canvas

:::important
For additional properties and methods of the Canvas, please refer to the documentation of the [CanvasRenderingContext2D][rendering-context] and [CanvasHTMLElement][canvas-element] classes.
:::

[rendering-context]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
[canvas-element]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
