# Validator Utilities

```js
import { Validator } from "https://vimtaai.github.io/agent/lib/utils.js"
Validator.validateNumber(5);
// -- OR --
import { validateNumber } from "https://vimtaai.github.io/agent/lib/utils.js";
validateNumber(5);
```

Validator function can be used to validate the type and value of inputs. If the given value is invalid, validator functions will throw an [`Error`][error].

## Functions

### `validateBoolean(value: any)`

Validates if the given `value` is a boolean, throws an error if it is not.

### `validateNumber(value: any)`

Validates if the given `value` is a number, throws an error if it is not.

### `validatePositiveNumber(value: any)`

Validates if the given `value` is a positive number, throws an error if it is not.

### `validateArray(value: any)`

Validates if the given `value` is an array, throws an error if it is not.

### `validateFunction(value: any)`

Validates if the given `value` is a function, throws an error if it is not.

### `validateColor(value: any)`

Validates if the given `value` is a valid [CSS color][color], throws an error if it is not.

### `validateModel(value: any)`

Validates if the given `value` is a [`Model`][model], throws an error if it is not.

### `validateAgent(value: any)`

Validates if the given `value` is an [`Agent`][agent], throws an error if it is not.

### `validateField(value: any)`

Validates if the given `value` is a [`Field`][field], throws an error if it is not.

### `validateEntity(value: any)`

Validates if the given `value` is an `Entity` ([`Agent`][agent] or [`Field`][field]), throws an error if it is not.

### `validateShape(value: any)`

Validates if the given `value` is a [`Shape`][shape], throws an error if it is not.

[model]: /api/model
[agent]: /api/agent
[field]: /api/field
[shape]: /api/shape
[color]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
[error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
